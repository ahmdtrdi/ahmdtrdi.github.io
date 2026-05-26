"use client";

import { useEffect, useRef, useState } from "react";

/* ──────────────────────────────────────
   ABOUT SECTION — Who Am I
   Bio with decorative polaroid-style cards
   ────────────────────────────────────── */

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative py-24 md:py-32 overflow-hidden"
      style={{ background: "transparent" }}
    >
      {/* Decorative large bokeh bubbles behind cards (Canva style) */}
      <div className="floating-dot" style={{ width: 32, height: 32, background: "var(--lavender)", opacity: 0.35, top: "25%", right: "22%", animationDelay: "0.5s" }} />
      <div className="floating-dot" style={{ width: 24, height: 24, background: "var(--peach)", opacity: 0.3, top: "45%", right: "35%", animationDelay: "1.5s" }} />
      <div className="floating-dot" style={{ width: 36, height: 36, background: "var(--blue-light)", opacity: 0.3, bottom: "20%", right: "12%", animationDelay: "2.0s" }} />
      <div className="floating-dot" style={{ width: 20, height: 20, background: "var(--gold)", opacity: 0.25, top: "15%", right: "6%", animationDelay: "0.8s" }} />

      <div className="section-container relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left — Text */}
          <div
            className="transition-all duration-1000 ease-out"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "translateX(0)" : "translateX(-40px)",
            }}
          >
            <h2
              className="text-4xl sm:text-5xl md:text-6xl mb-8"
              style={{ color: "var(--ink)" }}
            >
              Who Am I
            </h2>

            <div
              className="text-base md:text-lg leading-relaxed space-y-5"
              style={{ color: "var(--ink-light)", fontFamily: "var(--font-inter)", textAlign: "justify" }}
            >
              <p>
                I&apos;m <strong style={{ color: "var(--ink)", fontWeight: 600 }}>Triadi</strong>, the kind of person who watches a film and
                walks away with three new questions, joins a competition to test an
                idea everyone else called odd, and genuinely believes that the best
                work happens when curious people work together.
              </p>
              <p>
                My background in CS gave that{" "}
                <strong style={{ color: "var(--ink)", fontWeight: 700 }}>curiosity</strong> a direction,
                turning unconventional ideas into data-driven solutions and
                competition wins into proof that they actually work.
              </p>
            </div>

            {/* Contact Links */}
            <div className="mt-10 space-y-3.5">
              {[
                { icon: "/email.png", label: "triadim.works@gmail.com", href: "mailto:triadim.works@gmail.com" },
                { icon: "/github.png", label: "github.com/ahmdtrdi", href: "https://github.com/ahmdtrdi" },
                { icon: "/linkedin-black.png", label: "linkedin.com/in/triadim", href: "https://linkedin.com/in/triadim" },
              ].map((link, i) => (
                <a
                  key={i}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3.5 text-sm transition-colors duration-300 hover:text-[var(--ink)] group"
                  style={{ color: "var(--ink-light)", fontFamily: "var(--font-inter)" }}
                >
                  <img
                    src={link.icon}
                    alt=""
                    className="w-[18px] h-[18px] object-contain opacity-55 group-hover:opacity-100 transition-opacity duration-300"
                  />
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Right — Polaroid Cards */}
          <div
            className="relative h-[480px] md:h-[550px] transition-all duration-1000 ease-out"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "translateX(0)" : "translateX(40px)",
              transitionDelay: "0.3s",
            }}
          >
            {/* Card 1 — GPA (Top-Left of the cluster) */}
            <div
              className="absolute top-[2%] left-[8%] sm:left-[12%] md:left-[15%] w-[150px] sm:w-[165px] md:w-[185px] bg-white p-2.5 pb-4 md:p-3 md:pb-5 shadow-lg transition-transform duration-500 hover:-translate-y-3 z-10"
              style={{
                transform: `rotate(-4deg)`,
                borderRadius: 4,
                boxShadow: "0 10px 30px rgba(0,0,0,0.06)",
              }}
            >
              {/* Sticky Tape centered at the top */}
              <div
                className="absolute top-[-8px] left-[50%] -translate-x-[50%] w-[38px] h-[11px] rounded-sm z-30"
                style={{ background: "var(--gold-light)", opacity: 0.8, transform: "rotate(-4deg)" }}
              />
              <img
                src="/formal-transparan.png"
                alt="B.CS GPA 3.92/4.00"
                className="w-full aspect-square object-cover rounded-sm mb-2 bg-white"
              />
              <p className="text-[10px] md:text-xs text-center font-medium" style={{ color: "var(--ink-light)", fontFamily: "var(--font-inter)", letterSpacing: "-0.01em" }}>
                B.CS GPA <strong style={{ color: "var(--ink)" }}>3.92/4.00</strong>
              </p>
            </div>

            {/* Card 2 — Competition (Middle-Right, overlaps margins slightly but does not cover text) */}
            <div
              className="absolute top-[28%] right-[1%] sm:right-[3%] md:right-[5%] w-[145px] sm:w-[160px] md:w-[180px] bg-white p-2.5 pb-4 md:p-3 md:pb-5 shadow-lg transition-transform duration-500 hover:-translate-y-3 z-20"
              style={{
                transform: "rotate(6deg)",
                borderRadius: 4,
                boxShadow: "0 12px 35px rgba(0,0,0,0.07)",
              }}
            >
              {/* Sticky Tape centered at the top */}
              <div
                className="absolute top-[-8px] left-[50%] -translate-x-[50%] w-[36px] h-[11px] rounded-sm z-30"
                style={{ background: "var(--lavender-light)", opacity: 0.8, transform: "rotate(6deg)" }}
              />
              <img
                src="/itc.jpg"
                alt="ITC National"
                className="w-full aspect-square object-cover rounded-sm mb-2"
              />
              <p className="text-[10px] md:text-xs text-center font-medium" style={{ color: "var(--ink-light)", fontFamily: "var(--font-inter)", letterSpacing: "-0.01em" }}>
                ITC National @ Tel-U
              </p>
            </div>

            {/* Card 3 — Internship (Bottom-Left, directly below Card 1 with zero overlap) */}
            <div
              className="absolute top-[55%] left-[8%] sm:left-[12%] md:left-[15%] w-[150px] sm:w-[165px] md:w-[185px] bg-white p-2.5 pb-4 md:p-3 md:pb-5 shadow-lg transition-transform duration-500 hover:-translate-y-3 z-10"
              style={{
                transform: "rotate(-3deg)",
                borderRadius: 4,
                boxShadow: "0 10px 30px rgba(0,0,0,0.06)",
              }}
            >
              {/* Sticky Tape centered at the top */}
              <div
                className="absolute top-[-8px] left-[50%] -translate-x-[50%] w-[38px] h-[11px] rounded-sm z-30"
                style={{ background: "var(--blue-light)", opacity: 0.8, transform: "rotate(-3deg)" }}
              />
              <img
                src="/intern.jpg"
                alt="ML Intern"
                className="w-full aspect-square object-cover rounded-sm mb-2"
              />
              <p className="text-[10px] md:text-xs text-center font-medium" style={{ color: "var(--ink-light)", fontFamily: "var(--font-inter)", letterSpacing: "-0.01em" }}>
                ML Intern @BSG
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
