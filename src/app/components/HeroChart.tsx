"use client";

import { useEffect, useState, useMemo } from "react";

/* ──────────────────────────────────────
   AREA CHART — Hero Section
   Stacked area chart with echo/ripple contour lines
   radiating outward from the chart silhouette.
   ────────────────────────────────────── */

// ── Types ──
type Point = { x: number; y: number };

// ── SVG Path Utilities ──

/** Convert points to an open SVG polyline path (no closing Z) */
function polylinePath(pts: Point[]): string {
  if (pts.length < 2) return "";
  return pts.reduce(
    (d, p, i) => d + (i === 0 ? `M ${p.x},${p.y}` : ` L ${p.x},${p.y}`),
    ""
  );
}

/** Create a closed fill region between top and bottom curves */
function fillBandPath(
  top: Point[],
  bottom: Point[] | null,
  fallbackY: number
): string {
  if (top.length < 2) return "";
  const d = polylinePath(top);
  if (bottom && bottom.length >= 2) {
    const rev = [...bottom].reverse();
    return `${d} L ${rev.map((p) => `${p.x},${p.y}`).join(" L ")} Z`;
  }
  return `${d} L ${top[top.length - 1].x},${fallbackY} L ${top[0].x},${fallbackY} Z`;
}

/** Create a closed outline from top + bottom curves */
function closedOutlinePath(top: Point[], bottom: Point[]): string {
  if (top.length < 2) return "";
  const rev = [...bottom].reverse();
  return `${polylinePath(top)} L ${rev.map((p) => `${p.x},${p.y}`).join(" L ")} Z`;
}

/** Catmull-Rom Spline Interpolation for ultra-smooth curves and organic ripple shapes */
function interpolateSpline(points: Point[], numOutputPoints: number): Point[] {
  if (points.length < 2) return points;
  
  const result: Point[] = [];
  const n = points.length - 1;
  
  for (let i = 0; i < numOutputPoints; i++) {
    const t = i / (numOutputPoints - 1);
    const rawIndex = t * n;
    const idx = Math.min(n - 1, Math.floor(rawIndex));
    const localT = rawIndex - idx;
    
    const p0 = points[Math.max(0, idx - 1)];
    const p1 = points[idx];
    const p2 = points[idx + 1];
    const p3 = points[Math.min(n, idx + 2)];
    
    const t2 = localT * localT;
    const t3 = t2 * localT;
    
    const x = 0.5 * (
      (2 * p1.x) +
      (-p0.x + p2.x) * localT +
      (2 * p0.x - 5 * p1.x + 4 * p2.x - p3.x) * t2 +
      (-p0.x + 3 * p1.x - 3 * p2.x + p3.x) * t3
    );
    const y = 0.5 * (
      (2 * p1.y) +
      (-p0.y + p2.y) * localT +
      (2 * p0.y - 5 * p1.y + 4 * p2.y - p3.y) * t2 +
      (-p0.y + 3 * p1.y - 3 * p2.y + p3.y) * t3
    );
    
    result.push({ x, y });
  }
  
  return result;
}

/** Offset points radially outward from a centroid */
function offsetFromCenter(
  pts: Point[],
  cx: number,
  cy: number,
  amount: number
): Point[] {
  return pts.map(({ x, y }) => {
    const dx = x - cx;
    const dy = y - cy;
    const dist = Math.hypot(dx, dy);
    if (dist === 0) return { x, y };
    const s = (dist + amount) / dist;
    return { x: cx + dx * s, y: cy + dy * s };
  });
}

// ── Static Chart Configuration ──

const VH = 600;

/** Y-coordinate data for each curve boundary */
const CURVE_Y: Record<string, readonly number[]> = {
  swe:         [280, 280, 255, 220, 200, 170,  60, 110, 220, 255, 240, 270, 270],
  web3:        [295, 295, 260, 225, 205, 180, 230, 240, 250, 278, 265, 285, 285],
  aiml:        [305, 305, 300, 295, 270, 240, 265, 255, 280, 292, 280, 295, 295],
  quant:       [315, 315, 320, 330, 350, 310, 335, 280, 300, 305, 305, 305, 305],
  quantBottom: [335, 335, 335, 360, 400, 450, 540, 490, 320, 338, 325, 325, 325],
};

const X_INNER_PCTS = [0.17, 0.26, 0.35, 0.45, 0.54, 0.63, 0.72, 0.81, 0.90];

/** Chart layers — rendered in array order (first = bottom in SVG, last = top) */
const LAYERS = [
  { top: "quant", bottom: "quantBottom", fill: "#8db4e2", label: "Quant",             labelPct: 0.54, labelY: 415 },
  { top: "aiml",  bottom: "quant",       fill: "#ccc0da", label: "AI/ML Engineer",    labelPct: 0.46, labelY: 277 },
  { top: "web3",  bottom: "aiml",        fill: "#fcd5b4", label: "Web3 Engineer",     labelPct: 0.28, labelY: 258 },
  { top: "swe",   bottom: "web3",        fill: "#ffe599", label: "Software Engineer", labelPct: 0.58, labelY: 155 },
];

/** Boundary stroke lines (rendered after fills for crisp edges) */
const BOUNDARY_STROKES = [
  { curve: "swe",         color: "#ffd966" },
  { curve: "web3",        color: "#f4b084" },
  { curve: "aiml",        color: "#b1a0c7" },
  { curve: "quant",       color: "#5b9bd5" },
  { curve: "quantBottom", color: "#5b9bd5" },
];

/** Echo/ripple tuning parameters */
const ECHO = {
  count: 10,
  baseOffset: 14,
  growth: 1.2,        // spacing factor
  opacityStart: 0.22, // Soft, premium, non-distracting visibility
  opacityDecay: 0.018, // Smooth gradual decay over distance
  delayStep: 1.0,     // 10.0s / 10 waves = 1.0s stagger
  baseDuration: 10.0, // Majestic 10 seconds per wave (calm and majestic!)
} as const;

// ── Component ──

export default function HeroChart() {
  const [mounted, setMounted] = useState(false);
  const [aspectRatio, setAspectRatio] = useState(1.8);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    const timer = setTimeout(() => {
      setAnimate(true);
    }, 150);
    
    // Set initial aspect ratio immediately on client mount
    const h = Math.max(520, Math.min(window.innerHeight * 0.9, 1050));
    setAspectRatio(window.innerWidth / h);
    
    let lastWidth = window.innerWidth;
    
    const onResize = () => {
      const currentWidth = window.innerWidth;
      // Only recalculate when the width changes (prevents mobile scroll height loops)
      if (currentWidth !== lastWidth) {
        lastWidth = currentWidth;
        const currentHeight = Math.max(520, Math.min(window.innerHeight * 0.9, 1050));
        setAspectRatio(currentWidth / currentHeight);
      }
    };
    
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
      clearTimeout(timer);
    };
  }, []);

  const geo = useMemo(() => {
    const totalW = VH * aspectRatio; 
    const mtnW = Math.min(VH * 2.5, totalW * 0.96); 
    const tail = (totalW - mtnW) / 2; 
    const lx = -tail; 

    // X coordinates shared by all curves
    const xs = [lx, 0, ...X_INNER_PCTS.map((p) => p * mtnW), mtnW, mtnW + tail];

    // Build raw point arrays for each curve from Y data
    const rawCurves: Record<string, Point[]> = {};
    for (const [name, ys] of Object.entries(CURVE_Y)) {
      rawCurves[name] = xs.map((x, i) => ({ x, y: ys[i] }));
    }

    // Interpolate points smoothly using Catmull-Rom splines (80 subdivisions for ultra-smooth curves)
    const curves: Record<string, Point[]> = {};
    for (const [name, pts] of Object.entries(rawCurves)) {
      curves[name] = interpolateSpline(pts, 80);
    }

    // Centroid of the full chart silhouette (for radial echo offset)
    const envelope = [...curves.swe, ...curves.quantBottom];
    const cx =
      (Math.min(...envelope.map((p) => p.x)) +
        Math.max(...envelope.map((p) => p.x))) /
      2;
    const cy =
      (Math.min(...envelope.map((p) => p.y)) +
        Math.max(...envelope.map((p) => p.y))) /
      2;

    // Generate 10 progressive organic offset wave paths statically (perfectly parallel, neat, and stable)
    const echoes = Array.from({ length: ECHO.count }, (_, i) => {
      let cumOffset = 0;
      for (let j = 0; j <= i; j++) {
        cumOffset += ECHO.baseOffset * Math.pow(ECHO.growth, j);
      }

      // Generate base offset points from smooth curves
      const outerSwe = offsetFromCenter(curves.swe, cx, cy, cumOffset);
      const outerQuant = offsetFromCenter(curves.quantBottom, cx, cy, cumOffset);

      return {
        path: closedOutlinePath(outerSwe, outerQuant),
        opacity: Math.max(0.02, ECHO.opacityStart - i * ECHO.opacityDecay),
        delay: (i * ECHO.delayStep) - ECHO.baseDuration, // Subtract baseDuration so all waves are negative (already active) and propagate outward!
        duration: ECHO.baseDuration,
      };
    });

    // Generate dithered pixels dissolving the bottom-most curve (quantBottom)
    const ditherPixels = [];
    const cols = curves.quantBottom.length; // 80 columns
    const rows = 8; // Tighter vertical depth to look light and airy
    const colors = ["#8db4e2", "#ccc0da", "#fcd5b4", "#ffe599"]; // Quant Blue, AI/ML Lavender, Web3 Peach, SWE Gold
    
    for (let c = 0; c < cols; c += 2) { // Sample every 2nd column for a clean, non-cluttered layout
      const pt = curves.quantBottom[c];
      for (let r = 0; r < rows; r++) {
        // Quadratic decay of probability: r = 0 is 100% filled, r = 7 is almost empty
        const p = Math.pow((rows - r) / rows, 2.0);
        if (Math.random() < p) {
          // Select color using weighted probabilities: 45% Quant Blue, 25% Lavender, 18% Peach, 12% Gold
          let color = colors[0];
          const rand = Math.random();
          if (rand > 0.45 && rand <= 0.70) {
            color = colors[1];
          } else if (rand > 0.70 && rand <= 0.88) {
            color = colors[2];
          } else if (rand > 0.88) {
            color = colors[3];
          }

          // Size of the pixel in SVG coordinate units
          const w = 4.0 + Math.random() * 3.0; 
          
          // Random offset below the curve with a generous 18px buffer to push pixels further away from the solid chart
          const verticalSpacing = 10;
          const yOffset = 18 + r * verticalSpacing + Math.random() * 4;
          
          ditherPixels.push({
            id: `px-${c}-${r}`,
            x: pt.x - w / 2,
            y: pt.y + yOffset,
            w,
            color,
            duration: 4 + Math.random() * 4,
            delay: Math.random() * -4,
          });
        }
      }
    }

    return { totalW, mtnW, lx, curves, echoes, ditherPixels };
  }, [aspectRatio]);

  const svgFontSize = useMemo(() => {
    if (aspectRatio >= 1.5) return "20px";
    if (aspectRatio >= 0.9) return "14px";
    return "10px"; // Tiny and cute on mobile to prevent overlaps!
  }, [aspectRatio]);

  // Server-side / Hydration placeholder container with exact same height to prevent hydration mismatch
  if (!mounted) {
    return (
      <section
        id="hero"
        className="relative flex flex-col justify-end"
        style={{ minHeight: "100vh", background: "var(--paper)", overflow: "visible" }}
      />
    );
  }

  return (
    <section
      id="hero"
      className="relative flex flex-col justify-end"
      style={{ minHeight: "100vh", background: "var(--paper)", overflow: "visible" }}
    >
      {/* Inline styles for custom pixel float and entrance transitions to prevent globals.css clutter */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes pixelFloat {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
        .dither-pixel {
          animation: pixelFloat var(--float-dur) ease-in-out infinite;
          animation-delay: var(--float-delay);
          will-change: transform;
        }
        .chart-layer-path {
          transition: opacity 1.5s cubic-bezier(0.16, 1, 0.3, 1), transform 1.5s cubic-bezier(0.16, 1, 0.3, 1);
          transform-origin: bottom;
        }
      `}} />

      {/* Title — upper left (Cascading Entrance, 100% stable) */}
      <div
        className={`absolute z-20 select-none pointer-events-none transition-all duration-[1200ms] ease-out ${
          animate ? "opacity-100 translate-y-0" : "opacity-0 translate-y-[30px]"
        }`}
        style={{
          top: "clamp(60px, 12vh, 140px)",
          left: "clamp(24px, 5vw, 80px)",
          transitionDelay: "0.2s"
        }}
      >
        <h1
          className="text-5xl sm:text-6xl md:text-7xl italic font-normal leading-[1.1] mb-2"
          style={{
            fontFamily:
              "var(--font-playfair), 'Times New Roman', Georgia, serif",
            color: "#1a1a1a",
          }}
        >
          Portofolio
        </h1>
        <p
          className="text-[10px] sm:text-sm md:text-base font-medium text-[#1a1a1a]"
          style={{
            fontFamily: "var(--font-inter), system-ui, sans-serif",
            letterSpacing: "0.15em",
          }}
        >
          BY AHMAD TRIADI JULIANTO M
        </p>
      </div>

      {/* Area Chart — full bleed (Cascading Entrance Reveal, 100% stable) */}
      <div className="w-full relative z-10 block" style={{ overflow: "visible" }}>
        <svg
          viewBox={`${geo.lx} 0 ${geo.totalW} ${VH}`}
          preserveAspectRatio="none"
          className="w-full block"
          style={{ height: "clamp(520px, 90vh, 1050px)", overflow: "visible" }}
        >
          {/* Echo contour lines — behind chart, continuous wave propagation */}
          <g>
            {geo.echoes.map((echo, i) => (
              <path
                key={`echo-${i}`}
                d={echo.path}
                fill="none"
                stroke="#1a1a1a"
                strokeLinejoin="round"
                className="echo-line"
                style={
                  {
                    "--echo-opacity": echo.opacity,
                    "--echo-delay": `${echo.delay}s`,
                    "--echo-duration": `${echo.duration}s`,
                    transition: "opacity 1.8s ease-out",
                    transitionDelay: "0.6s",
                    opacity: animate ? undefined : 0,
                  } as React.CSSProperties
                }
              />
            ))}
          </g>

          {/* Filled area layers (back-to-front: quant → swe) */}
          {LAYERS.map((layer, index) => (
            <path
              key={`fill-${layer.top}`}
              d={fillBandPath(
                geo.curves[layer.top],
                geo.curves[layer.bottom],
                VH
              )}
              fill={layer.fill}
              className="chart-layer-path"
              style={{
                transitionDelay: `${index * 0.15}s`,
                opacity: animate ? 1 : 0,
                transform: animate ? "translateY(0)" : "translateY(60px)",
              }}
            />
          ))}

          {/* Boundary stroke lines */}
          {BOUNDARY_STROKES.map((b) => {
            // Stagger strokes in sync with fills (swe = 3, web3 = 2, aiml = 1, quant = 0)
            let delayIndex = 0;
            if (b.curve === "swe") delayIndex = 3;
            else if (b.curve === "web3") delayIndex = 2;
            else if (b.curve === "aiml") delayIndex = 1;
            
            return (
              <path
                key={`stroke-${b.curve}`}
                d={polylinePath(geo.curves[b.curve])}
                fill="none"
                stroke={b.color}
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeLinejoin="miter"
                className="chart-layer-path"
                style={{
                  transitionDelay: `${delayIndex * 0.15}s`,
                  opacity: animate ? 1 : 0,
                  transform: animate ? "translateY(0)" : "translateY(60px)",
                }}
              />
            );
          })}

          {/* Labels inside areas (Fade in gently after mountain rise) */}
          {LAYERS.map((layer, index) => (
            <text
              key={`label-${layer.top}`}
              x={layer.labelPct * geo.mtnW}
              y={layer.labelY}
              textAnchor="middle"
              dominantBaseline="middle"
              fill="#1a1a1a"
              style={{
                fontSize: svgFontSize,
                fontFamily:
                  "var(--font-playfair), 'Times New Roman', Georgia, serif",
                fontWeight: 600,
                pointerEvents: "none",
                transition: "opacity 1.0s ease-out",
                transitionDelay: `${0.8 + index * 0.08}s`,
                opacity: animate ? 0.85 : 0,
              }}
            >
              {layer.label}
            </text>
          ))}

          {/* Dithered pixels dissolving the bottom curve */}
          <g>
            {geo.ditherPixels.map((px) => (
              <rect
                key={px.id}
                x={px.x}
                y={px.y}
                width={px.w}
                height={px.w}
                fill={px.color}
                rx={0.8}
                className="dither-pixel"
                style={{
                  ["--float-dur" as any]: `${px.duration}s`,
                  ["--float-delay" as any]: `${px.delay}s`,
                  transition: "opacity 1.2s ease-out",
                  transitionDelay: "0.9s",
                  opacity: animate ? 0.85 : 0,
                }}
              />
            ))}
          </g>
        </svg>
      </div>
    </section>
  );
}
