"use client";

import { useEffect, useState } from "react";

/* ──────────────────────────────────────
   AREA CHART — Hero Section  
   Matching the reference mockup:
   - Stacked area bands (polygonal/sharp vertices)
   - Edge-to-edge, floating in the middle
   - Custom colored strokes separating the layers
   - Text labels placed inside the solid pastel bands
   - Dynamic wavy ripples for blue and purple layers to prevent messy flatness
   ────────────────────────────────────── */

/**
 * Straight line segments → SVG polyline path (just the top edge, no closing).
 */
function straightLinePath(pts: { x: number; y: number }[]): string {
  if (pts.length < 2) return "";
  let d = `M ${pts[0].x},${pts[0].y}`;
  for (let i = 1; i < pts.length; i++) {
    d += ` L ${pts[i].x},${pts[i].y}`;
  }
  return d;
}

/**
 * Build a filled region BETWEEN two curves (straight segments).
 * topPts = upper boundary, bottomPts = lower boundary.
 */
function bandPath(
  topPts: { x: number; y: number }[],
  bottomPts: { x: number; y: number }[] | null,
  bottomY: number
): string {
  if (topPts.length < 2) return "";

  // Top edge: left to right
  let d = straightLinePath(topPts);

  if (bottomPts && bottomPts.length >= 2) {
    // Line down to the rightmost bottom point
    const bReversed = [...bottomPts].reverse();
    d += ` L ${bReversed[0].x},${bReversed[0].y}`;
    // Bottom edge: right to left (reversed)
    for (let i = 1; i < bReversed.length; i++) {
      d += ` L ${bReversed[i].x},${bReversed[i].y}`;
    }
  } else {
    // Close to bottom of viewbox
    d += ` L ${topPts[topPts.length - 1].x},${bottomY}`;
    d += ` L ${topPts[0].x},${bottomY}`;
  }

  d += ` Z`;
  return d;
}

export default function HeroChart() {
  const [isVisible, setIsVisible] = useState(false);
  const [aspectRatio, setAspectRatio] = useState(1.8); // fallback desktop aspect ratio for SSR

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 300);
    return () => clearTimeout(timer);
  }, []);

  // Measure window sizes to calculate dynamic SVG aspect ratio
  useEffect(() => {
    if (typeof window === "undefined") return;
    const handleResize = () => {
      const width = window.innerWidth;
      // Chart height scales to a spectacular 90vh to cover the screen
      const height = Math.max(520, Math.min(window.innerHeight * 0.90, 1050));
      setAspectRatio(width / height);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const VH = 600;
  const totalViewBoxWidth = VH * aspectRatio;

  // Ultra-scale mountain: occupies 96% of standard screens for a massive silhouette
  const maxMountainWidth = VH * 2.5; // 1500 max width cap for 32:9 viewports
  const mountainWidth = Math.min(maxMountainWidth, totalViewBoxWidth * 0.96);
  const tailWidth = (totalViewBoxWidth - mountainWidth) / 2;

  const leftX = -tailWidth;
  const rightX = mountainWidth + tailWidth;

  // Dynamic X coordinate generation based on the custom-scaled mountainWidth
  const innerPcts = [0.17, 0.26, 0.35, 0.45, 0.54, 0.63, 0.72, 0.81, 0.90];
  const xCoords = [
    leftX,
    0,
    ...innerPcts.map(p => p * mountainWidth),
    mountainWidth,
    rightX
  ];

  // Y peaks are kept tall and steep to capture the premium silhouette
  const sweY = [280, 280, 255, 220, 200, 170, 60, 110, 220, 255, 240, 270, 270];
  
  // Web3 — second boundary (tapering down beautifully to the right)
  const web3Y = [295, 295, 260, 225, 205, 180, 230, 240, 250, 278, 265, 285, 285];
  
  // AI/ML — third boundary (pushed down on the left/center to make the peach layer very thick!)
  const aimlY = [305, 305, 300, 295, 270, 240, 265, 255, 280, 292, 280, 295, 295];
  
  // Quant — fourth boundary (updated to be a beautiful, wavy, multi-peak profile that removes flatness)
  const quantY = [315, 315, 320, 330, 350, 310, 335, 280, 300, 305, 305, 305, 305];
  
  // Quant bottom boundary — floats beautifully to shape the floating silhouette
  const quantBottomY = [335, 335, 335, 360, 400, 450, 540, 490, 320, 338, 325, 325, 325];

  const makePts = (ys: number[]) => xCoords.map((x, i) => ({ x, y: ys[i] }));

  const swePts = makePts(sweY);
  const web3Pts = makePts(web3Y);
  const aimlPts = makePts(aimlY);
  const quantPts = makePts(quantY);
  const quantBottomPts = makePts(quantBottomY);

  /* ── Crisp border lines to overlay on top ── */
  const boundaryLines = [
    { pts: swePts, color: "#ffd966" },
    { pts: web3Pts, color: "#f4b084" },
    { pts: aimlPts, color: "#b1a0c7" },
    { pts: quantPts, color: "#5b9bd5" },
    { pts: quantBottomPts, color: "#5b9bd5" },
  ];

  /* ── Solid filled layers rendered back to front ── */
  const layers = [
    {
      topPts: quantPts,
      bottomPts: quantBottomPts,
      fill: "#8db4e2",       // design bright sky blue
      label: "Quant",
      labelX: 0.54 * mountainWidth,
      labelY: 415,           // centered in the lower blue valley
    },
    {
      topPts: aimlPts,
      bottomPts: quantPts,
      fill: "#ccc0da",       // design bright lavender
      label: "AI/ML Engineer",
      labelX: 0.45 * mountainWidth,
      labelY: 275,           // centered in the lavender band
    },
    {
      topPts: web3Pts,
      bottomPts: aimlPts,
      fill: "#fcd5b4",       // design peach
      label: "Web3 Engineer",
      labelX: 0.29 * mountainWidth,
      labelY: 245,
    },
    {
      topPts: swePts,
      bottomPts: web3Pts,
      fill: "#ffe599",       // design pastel yellow
      label: "Software Engineer",
      labelX: 0.58 * mountainWidth,
      labelY: 155,
    },
  ];

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-end overflow-hidden"
      style={{ background: "var(--paper)" }}
    >
      {/* Title — upper left */}
      <div
        className="absolute z-20 transition-all duration-1000 ease-out"
        style={{
          top: "clamp(60px, 12vh, 140px)",
          left: "clamp(24px, 5vw, 80px)",
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? "translateY(0)" : "translateY(30px)",
        }}
      >
        <h1
          className="text-5xl sm:text-6xl md:text-7xl italic font-normal leading-[1.1] mb-2"
          style={{
            fontFamily: "var(--font-playfair), 'Times New Roman', Georgia, serif",
            color: "var(--ink)",
          }}
        >
          Portofolio
        </h1>
        <p
          className="text-sm sm:text-base md:text-lg font-medium"
          style={{
            fontFamily: "var(--font-inter), system-ui, sans-serif",
            color: "var(--ink)",
            letterSpacing: "0.15em",
          }}
        >
          BY AHMAD TRIADI JULIANTO M
        </p>
      </div>

      {/* Area Chart — full bleed without distortion */}
      <div
        className="w-full relative z-10 transition-all duration-[1.5s] ease-out"
        style={{
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? "translateY(0)" : "translateY(60px)",
          transitionDelay: "0.3s",
        }}
      >
        <svg
          viewBox={`${leftX} 0 ${totalViewBoxWidth} ${VH}`}
          preserveAspectRatio="none"
          className="w-full block"
          style={{ height: "clamp(520px, 90vh, 1050px)" }}
        >
          {/* 1. Filled Solid Layers */}
          {layers.map((layer, i) => (
            <path
              key={`fill-${i}`}
              d={bandPath(layer.topPts, layer.bottomPts, VH)}
              fill={layer.fill}
              style={{
                clipPath: isVisible ? "inset(0 0 0 0)" : "inset(0 100% 0 0)",
                transition: `clip-path 2s cubic-bezier(0.16, 1, 0.3, 1) ${i * 0.2}s`,
              }}
            />
          ))}

          {/* 2. Crisp Polygonal Border Lines */}
          {boundaryLines.map((line, i) => (
            <path
              key={`stroke-${i}`}
              d={straightLinePath(line.pts)}
              fill="none"
              stroke={line.color}
              strokeWidth={1.5}
              strokeLinecap="round"
              strokeLinejoin="miter"
              style={{
                clipPath: isVisible ? "inset(0 0 0 0)" : "inset(0 100% 0 0)",
                transition: `clip-path 2s cubic-bezier(0.16, 1, 0.3, 1) ${i * 0.2}s`,
              }}
            />
          ))}

          {/* 3. Labels inside areas */}
          {layers.map((layer, i) => (
            <text
              key={`label-${i}`}
              x={layer.labelX}
              y={layer.labelY}
              textAnchor="middle"
              dominantBaseline="middle"
              style={{
                fontSize: "20px",
                fontFamily: "var(--font-playfair), 'Times New Roman', Georgia, serif",
                fontWeight: 600,
                fill: "var(--ink)",
                opacity: isVisible ? 0.85 : 0,
                transition: `opacity 0.8s ease ${1.2 + i * 0.2}s`,
                pointerEvents: "none",
              }}
            >
              {layer.label}
            </text>
          ))}
        </svg>
      </div>
    </section>
  );
}
