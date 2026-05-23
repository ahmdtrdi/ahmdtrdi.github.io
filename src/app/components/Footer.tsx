"use client";

import { useEffect, useRef, useState } from "react";

/* ──────────────────────────────────────
   FOOTER
   Minimal footer with marquee and chart motif
   ────────────────────────────────────── */

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);
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
    if (footerRef.current) observer.observe(footerRef.current);
    return () => observer.disconnect();
  }, []);

  const marqueeItems = [
    "Curiosity",
    "·",
    "Code",
    "·",
    "Data",
    "·",
    "Research",
    "·",
    "Build",
    "·",
    "Compete",
    "·",
    "Ship",
    "·",
    "Learn",
    "·",
    "Iterate",
    "·",
  ];

  return (
    <footer
      ref={footerRef}
      className="relative py-16 md:py-24 overflow-hidden"
      style={{ background: "var(--ink)", color: "var(--paper)" }}
    >
      {/* Marquee strip */}
      <div className="mb-12 overflow-hidden opacity-10">
        <div className="marquee-track">
          {[...Array(3)].map((_, rep) => (
            <div key={rep} className="flex gap-8 pr-8">
              {marqueeItems.map((item, i) => (
                <span
                  key={`${rep}-${i}`}
                  className="text-3xl md:text-5xl whitespace-nowrap"
                  style={{ fontFamily: "var(--font-playfair)" }}
                >
                  {item}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="section-container">
        <div
          className="grid grid-cols-1 md:grid-cols-3 gap-12 transition-all duration-1000 ease-out"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(30px)",
          }}
        >
          {/* Left */}
          <div>
            <h3
              className="text-2xl mb-4"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Ahmad Triadi
              <br />
              <span className="italic font-normal opacity-60">Julianto M</span>
            </h3>
            <p
              className="text-sm leading-relaxed opacity-50"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              Charting curiosity into code.
              <br />
              One project at a time.
            </p>
          </div>

          {/* Middle — Links */}
          <div>
            <p
              className="text-xs tracking-[0.2em] uppercase mb-4 opacity-40"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              Navigate
            </p>
            <div className="space-y-2">
              {["About", "Research", "Internship", "Competition"].map((label) => (
                <a
                  key={label}
                  href={`#${label.toLowerCase()}`}
                  className="block text-sm opacity-60 hover:opacity-100 transition-opacity"
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  {label}
                </a>
              ))}
            </div>
          </div>

          {/* Right — Contact */}
          <div>
            <p
              className="text-xs tracking-[0.2em] uppercase mb-4 opacity-40"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              Connect
            </p>
            <div className="space-y-2">
              {[
                { label: "Email", href: "mailto:triadim.works@gmail.com" },
                { label: "GitHub", href: "https://github.com/ahmdtrdi" },
                { label: "LinkedIn", href: "https://linkedin.com/in/triadim" },
              ].map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-sm opacity-60 hover:opacity-100 transition-opacity"
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  {link.label} ↗
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="mt-16 pt-6 flex flex-col md:flex-row items-center justify-between gap-4"
          style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}
        >
          <p
            className="text-xs opacity-30"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            © {new Date().getFullYear()} Ahmad Triadi Julianto M. All rights reserved.
          </p>
          <p
            className="text-xs opacity-30 italic"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            &ldquo;The best chart is the one you&apos;re still drawing.&rdquo;
          </p>
        </div>
      </div>

      {/* Decorative mini chart in footer */}
      <svg
        className="absolute bottom-0 left-0 w-full h-20 opacity-5"
        viewBox="0 0 100 20"
        preserveAspectRatio="none"
      >
        <path
          d="M 0,20 L 5,15 10,17 15,12 20,14 25,8 30,10 35,6 40,9 45,5 50,7 55,3 60,6 65,4 70,8 75,5 80,9 85,7 90,11 95,9 100,12 L 100,20 Z"
          fill="rgba(255,255,255,0.3)"
        />
      </svg>
    </footer>
  );
}
