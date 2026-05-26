"use client";

import { useEffect, useState, useMemo } from "react";

/* ──────────────────────────────────────
   PIXEL DITHER DIVIDER
   A gorgeous, retro-modern retro-digital pixel transition
   that seamlessly dissolves the Hero Chart bottom edge
   into the About Section paper background.
   ────────────────────────────────────── */

export default function PixelDitherDivider() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const pixels = useMemo(() => {
    // Deterministic layout generated once on client mount
    const cols = 140;
    const rows = 12;
    const colors = ["#8db4e2", "#ccc0da", "#fcd5b4", "#ffe599"]; // Matches our chart palette perfectly!
    
    const list = [];
    for (let c = 0; c < cols; c++) {
      for (let r = 0; r < rows; r++) {
        // Quadratic probability: row 0 is 100% filled, row 11 is almost empty (dissolving effect)
        const p = Math.pow((rows - r) / rows, 2.5);
        if (Math.random() < p) {
          // Select color: weigh heavily towards Quant Blue (#8db4e2) since it's the bottom-most chart layer
          let color = colors[0];
          const rand = Math.random();
          if (rand > 0.45) {
            // Mix in the other beautiful pastel tones of the chart
            color = colors[1 + Math.floor(Math.random() * (colors.length - 1))];
          }

          list.push({
            id: `${c}-${r}`,
            x: (c / cols) * 100, // Responsive percent positioning
            y: (r / rows) * 100, // Responsive percent positioning
            color,
            w: Math.random() > 0.5 ? 8 : 6, // Retro pixel sizes (6px or 8px)
            duration: 3 + Math.random() * 4, // Staggered floating animation durations
            delay: Math.random() * -4, // Pre-shifted negative delays so floating starts instantly
          });
        }
      }
    }
    return list;
  }, []);

  if (!mounted) {
    return <div className="h-[85px] w-full" style={{ background: "var(--paper)" }} />;
  }

  return (
    <div 
      className="w-full relative overflow-hidden select-none pointer-events-none" 
      style={{ 
        height: "85px", 
        background: "var(--paper)",
        marginTop: "-1px" // Micro overlap to seal any 1px gap with the chart SVG
      }}
    >
      {/* Inline styles for custom pixel float to prevent globals.css clutter */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes pixelFloat {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-6px); }
        }
        .dither-pixel {
          animation: pixelFloat var(--float-dur) ease-in-out infinite;
          animation-delay: var(--float-delay);
          will-change: transform;
        }
      `}} />

      {pixels.map((px) => (
        <div
          key={px.id}
          className="absolute dither-pixel"
          style={{
            left: `${px.x}%`,
            top: `${px.y}%`,
            width: `${px.w}px`,
            height: `${px.w}px`,
            backgroundColor: px.color,
            borderRadius: "1px", // Sharp digital square look
            opacity: 0.85,
            // Pass custom css variables for GPU compositor floating
            ["--float-dur" as any]: `${px.duration}s`,
            ["--float-delay" as any]: `${px.delay}s`,
          }}
        />
      ))}
    </div>
  );
}
