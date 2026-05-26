"use client";

import { useEffect, useState } from "react";

/* ──────────────────────────────────────
   NAVIGATION
   Minimal, sticky nav with scroll-based styling
   ────────────────────────────────────── */

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Research", href: "#research" },
  { label: "Internship", href: "#internship" },
  { label: "Competition", href: "#competition" },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      // Determine active section
      const sections = navLinks.map((l) => l.href.replace("#", ""));
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 200) {
            setActiveSection(sections[i]);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        mounted ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-[20px]"
      }`}
      style={{
        background: scrolled ? "rgba(250, 249, 247, 0.85)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? "1px solid var(--line)" : "1px solid transparent",
        transition: "background 0.5s, backdrop-filter 0.5s, border-bottom 0.5s, opacity 1.2s ease-out, transform 1.2s ease-out",
      }}
    >
      <div className="section-container">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a
            href="#hero"
            className="text-sm font-medium tracking-wide transition-opacity hover:opacity-70"
            style={{ fontFamily: "var(--font-playfair)", color: "var(--ink)" }}
          >
            ATJM
          </a>

          {/* Links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="nav-link text-xs tracking-[0.1em] uppercase"
                style={{
                  fontFamily: "var(--font-inter)",
                  color:
                    activeSection === link.href.replace("#", "")
                      ? "var(--ink)"
                      : "var(--ink-light)",
                }}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2"
            onClick={() => {
              const menu = document.getElementById("mobile-menu");
              if (menu) menu.classList.toggle("hidden");
            }}
            aria-label="Toggle menu"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="var(--ink)" strokeWidth="1.5">
              <line x1="3" y1="6" x2="17" y2="6" />
              <line x1="3" y1="10" x2="17" y2="10" />
              <line x1="3" y1="14" x2="17" y2="14" />
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        <div id="mobile-menu" className="hidden md:hidden pb-4">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="block py-2 text-sm"
              style={{
                fontFamily: "var(--font-inter)",
                color: "var(--ink-light)",
              }}
              onClick={() => {
                const menu = document.getElementById("mobile-menu");
                if (menu) menu.classList.add("hidden");
              }}
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}
