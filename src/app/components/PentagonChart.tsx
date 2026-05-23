"use client";

import { useEffect, useRef, useState } from "react";

/* ──────────────────────────────────────
   PENTAGON RADAR CHART
   Overlapping pentagon shapes for each section
   ────────────────────────────────────── */

interface PentagonChartProps {
  labels: string[];
  colors: {
    fill1: string;
    stroke1: string;
    fill2: string;
    stroke2: string;
    fill3: string;
    stroke3: string;
  };
  values?: number[];
}

function pentagonPoints(
  cx: number,
  cy: number,
  radius: number,
  rotation: number = 0
): string {
  const points: string[] = [];
  for (let i = 0; i < 5; i++) {
    const angle = (Math.PI * 2 * i) / 5 - Math.PI / 2 + rotation;
    const x = cx + radius * Math.cos(angle);
    const y = cy + radius * Math.sin(angle);
    points.push(`${x},${y}`);
  }
  return points.join(" ");
}

function getLabelPosition(
  cx: number,
  cy: number,
  radius: number,
  index: number,
  rotation: number
): { x: number; y: number } {
  const angle = (Math.PI * 2 * index) / 5 - Math.PI / 2 + rotation;
  return {
    x: cx + (radius + 14) * Math.cos(angle),
    y: cy + (radius + 14) * Math.sin(angle),
  };
}

export default function PentagonChart({ labels, colors }: PentagonChartProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    if (svgRef.current) observer.observe(svgRef.current);
    return () => observer.disconnect();
  }, []);

  const cx = 65;
  const cy = 58;

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 130 120"
      className="w-full max-w-[400px] mx-auto lg:mx-0"
      style={{ height: "auto", aspectRatio: "1" }}
    >
      {/* Pentagon 1 — largest, background */}
      <polygon
        points={pentagonPoints(cx + 5, cy - 5, 32, 0.3)}
        fill={colors.fill1}
        stroke={colors.stroke1}
        strokeWidth="0.5"
        style={{
          opacity: isVisible ? 0.5 : 0,
          transform: isVisible ? "scale(1)" : "scale(0.7)",
          transformOrigin: `${cx + 5}px ${cy - 5}px`,
          transition: "all 1s cubic-bezier(0.16, 1, 0.3, 1) 0.2s",
        }}
      />

      {/* Pentagon 2 — medium */}
      <polygon
        points={pentagonPoints(cx - 8, cy - 3, 28, -0.4)}
        fill={colors.fill2}
        stroke={colors.stroke2}
        strokeWidth="0.5"
        style={{
          opacity: isVisible ? 0.5 : 0,
          transform: isVisible ? "scale(1)" : "scale(0.7)",
          transformOrigin: `${cx - 8}px ${cy - 3}px`,
          transition: "all 1s cubic-bezier(0.16, 1, 0.3, 1) 0.5s",
        }}
      />

      {/* Pentagon 3 — inner, darkest */}
      <polygon
        points={pentagonPoints(cx, cy, 18, 0.1)}
        fill={colors.fill3}
        stroke={colors.stroke3}
        strokeWidth="0.5"
        style={{
          opacity: isVisible ? 0.6 : 0,
          transform: isVisible ? "scale(1)" : "scale(0.7)",
          transformOrigin: `${cx}px ${cy}px`,
          transition: "all 1s cubic-bezier(0.16, 1, 0.3, 1) 0.8s",
        }}
      />

      {/* Labels for pentagon 1 vertices */}
      {labels.map((label, i) => {
        const pos = getLabelPosition(cx + 5, cy - 5, 32, i, 0.3);
        return (
          <text
            key={i}
            x={pos.x}
            y={pos.y}
            textAnchor="middle"
            dominantBaseline="middle"
            style={{
              fontSize: "3.5px",
              fontFamily: "var(--font-playfair), 'Times New Roman', serif",
              fontStyle: "italic",
              fill: "var(--ink-light)",
              opacity: isVisible ? 1 : 0,
              transition: `opacity 0.6s ease ${1 + i * 0.15}s`,
            }}
          >
            {label}
          </text>
        );
      })}
    </svg>
  );
}
