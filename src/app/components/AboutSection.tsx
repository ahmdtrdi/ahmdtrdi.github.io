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
      style={{ background: "var(--paper)" }}
    >
      {/* Decorative dots */}
      <div className="floating-dot" style={{ width: 14, height: 14, background: "var(--lavender-light)", top: "10%", right: "25%", animationDelay: "0.5s" }} />
      <div className="floating-dot" style={{ width: 10, height: 10, background: "var(--peach)", top: "30%", right: "15%", animationDelay: "1.5s" }} />
      <div className="floating-dot" style={{ width: 8, height: 8, background: "var(--blue-light)", bottom: "20%", right: "30%", animationDelay: "2s" }} />
      <div className="floating-dot" style={{ width: 6, height: 6, background: "var(--gold)", bottom: "35%", left: "60%", animationDelay: "0.8s" }} />

      <div className="section-container">
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
                My background in IT gave that{" "}
                <strong style={{ color: "var(--ink)", fontWeight: 700 }}>curiosity</strong> a direction,
                turning unconventional ideas into data-driven solutions and
                competition wins into proof that they actually work.
              </p>
            </div>

            {/* Contact Links */}
            <div className="mt-10 space-y-3">
              {[
                { icon: "✉", label: "triadim.works@gmail.com", href: "mailto:triadim.works@gmail.com" },
                { icon: "⌘", label: "github.com/ahmdtrdi", href: "https://github.com/ahmdtrdi" },
                { icon: "◆", label: "linkedin.com/in/triadim", href: "https://linkedin.com/in/triadim" },
              ].map((link, i) => (
                <a
                  key={i}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-sm transition-colors duration-300 hover:text-[var(--ink)] group"
                  style={{ color: "var(--ink-light)", fontFamily: "var(--font-inter)" }}
                >
                  <span className="text-xs opacity-50 group-hover:opacity-100 transition-opacity">{link.icon}</span>
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Right — Polaroid Cards */}
          <div
            className="relative h-[400px] md:h-[500px] transition-all duration-1000 ease-out"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "translateX(0)" : "translateX(40px)",
              transitionDelay: "0.3s",
            }}
          >
            {/* Card 1 — GPA */}
            <div
              className="absolute top-0 right-[15%] md:right-[20%] w-[180px] md:w-[200px] bg-white p-3 shadow-lg transition-transform duration-500 hover:-translate-y-2"
              style={{
                transform: `rotate(-3deg)`,
                borderRadius: 4,
                boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
              }}
            >
              <div
                className="w-full aspect-[4/3] rounded-sm mb-3 flex items-center justify-center"
                style={{ background: "linear-gradient(135deg, var(--paper-warm), var(--lavender-light))" }}
              >
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-bold" style={{ fontFamily: "var(--font-playfair)", color: "var(--ink)" }}>3.91</div>
                  <div className="text-xs mt-1" style={{ color: "var(--ink-light)" }}>/4.00</div>
                </div>
              </div>
              <p className="text-xs text-center" style={{ color: "var(--ink-light)", fontFamily: "var(--font-inter)" }}>
                B.CS GPA <strong style={{ color: "var(--ink)" }}>3.91/4.00</strong>
              </p>
            </div>

            {/* Card 2 — Competition */}
            <div
              className="absolute top-[25%] right-0 w-[170px] md:w-[190px] bg-white p-3 shadow-lg transition-transform duration-500 hover:-translate-y-2"
              style={{
                transform: "rotate(5deg)",
                borderRadius: 4,
                boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
              }}
            >
              <div
                className="w-full aspect-[4/3] rounded-sm mb-3 flex items-center justify-center"
                style={{ background: "linear-gradient(135deg, var(--gold-light), var(--peach-muted))" }}
              >
                <div className="text-center px-3">
                  <div className="text-lg md:text-xl font-bold" style={{ fontFamily: "var(--font-playfair)", color: "var(--ink)" }}>🏆</div>
                  <div className="text-xs mt-1 font-medium" style={{ color: "var(--ink)" }}>ITC National</div>
                </div>
              </div>
              <p className="text-xs text-center" style={{ color: "var(--ink-light)", fontFamily: "var(--font-inter)" }}>
                ITC National @ Tel-U
              </p>
            </div>

            {/* Card 3 — Internship */}
            <div
              className="absolute bottom-[5%] left-[5%] md:left-[10%] w-[180px] md:w-[200px] bg-white p-3 shadow-lg transition-transform duration-500 hover:-translate-y-2"
              style={{
                transform: "rotate(-2deg)",
                borderRadius: 4,
                boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
              }}
            >
              <div
                className="w-full aspect-[4/3] rounded-sm mb-3 flex items-center justify-center"
                style={{ background: "linear-gradient(135deg, var(--blue-light), var(--lavender-muted))" }}
              >
                <div className="text-center px-3">
                  <div className="text-lg md:text-xl" style={{ fontFamily: "var(--font-playfair)", color: "var(--ink)" }}>🧠</div>
                  <div className="text-xs mt-1 font-medium" style={{ color: "var(--ink)" }}>ML Intern</div>
                </div>
              </div>
              <p className="text-xs text-center" style={{ color: "var(--ink-light)", fontFamily: "var(--font-inter)" }}>
                ML Intern @BSG
              </p>
            </div>

            {/* Decorative tape marks */}
            <div
              className="absolute top-[-8px] right-[25%] md:right-[30%] w-[40px] h-[12px] rounded-sm"
              style={{ background: "var(--gold-light)", opacity: 0.7, transform: "rotate(-8deg)" }}
            />
            <div
              className="absolute top-[23%] right-[3%] w-[35px] h-[12px] rounded-sm"
              style={{ background: "var(--lavender-light)", opacity: 0.7, transform: "rotate(12deg)" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
