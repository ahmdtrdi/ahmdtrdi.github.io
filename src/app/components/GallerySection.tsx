"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import { galleryData, GalleryItem } from "../data/portfolioData";
import { ModalImageData } from "./ImageModal";

interface GallerySectionProps {
  onOpenModal: (data: ModalImageData) => void;
}

type FilterCategory = "all" | "certificate" | "competition" | "architecture" | "moment";

export default function GallerySection({ onOpenModal }: GallerySectionProps) {
  const [activeFilter, setActiveFilter] = useState<FilterCategory>("all");
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
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const filters: { id: FilterCategory; label: string; count: number }[] = useMemo(() => {
    return [
      { id: "all", label: "All Showcase", count: galleryData.length },
      {
        id: "certificate",
        label: "Certificates & Honors",
        count: galleryData.filter((i) => i.category === "certificate").length,
      },
      {
        id: "competition",
        label: "Awards & Hackathons",
        count: galleryData.filter((i) => i.category === "competition").length,
      },
      {
        id: "architecture",
        label: "Architecture & Systems",
        count: galleryData.filter((i) => i.category === "architecture").length,
      },
      {
        id: "moment",
        label: "On-Site & Moments",
        count: galleryData.filter((i) => i.category === "moment").length,
      },
    ];
  }, []);

  const filteredItems = useMemo(() => {
    if (activeFilter === "all") return galleryData;
    return galleryData.filter((item) => item.category === activeFilter);
  }, [activeFilter]);

  const handleCardClick = (item: GalleryItem) => {
    onOpenModal({
      title: item.title,
      subtitle: `${item.issuerOrEvent} · ${item.year}`,
      category: item.categoryLabel,
      description: item.description,
      image: item.image,
      imageCaption: `${item.title} — ${item.issuerOrEvent}`,
      tags: item.tags,
    });
  };

  return (
    <section
      ref={sectionRef}
      id="gallery"
      className="relative py-24 md:py-32 overflow-hidden"
      style={{ background: "var(--paper-warm)" }}
    >
      <div className="section-container relative z-10">
        {/* Section Header */}
        <div
          className="text-center max-w-3xl mx-auto mb-14 transition-all duration-1000 ease-out"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(30px)",
          }}
        >
          <p
            className="text-xs font-semibold tracking-[0.2em] uppercase mb-3 text-[var(--ink-light)]"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            Proof & Documentation
          </p>
          <h2
            className="text-4xl sm:text-5xl md:text-6xl mb-6 text-[var(--ink)]"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Showcase & Gallery
          </h2>
          <p
            className="text-base sm:text-lg leading-relaxed text-[var(--ink-light)]"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            A curated archive of verified certifications, national podium achievements,
            system architecture artifacts, and milestone moments.
          </p>
        </div>

        {/* Filter Pills */}
        <div
          className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-12 transition-all duration-1000 ease-out"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(20px)",
            transitionDelay: "0.2s",
          }}
        >
          {filters.map((f) => (
            <button
              key={f.id}
              onClick={() => setActiveFilter(f.id)}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-medium tracking-wide transition-all duration-300 cursor-pointer flex items-center gap-2 ${
                activeFilter === f.id
                  ? "bg-[var(--ink)] text-white shadow-md scale-105"
                  : "bg-white text-[var(--ink-light)] border border-[var(--line)] hover:border-[var(--ink)] hover:text-[var(--ink)]"
              }`}
              style={{ fontFamily: "var(--font-inter)" }}
            >
              <span>{f.label}</span>
              <span
                className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                  activeFilter === f.id
                    ? "bg-white/20 text-white"
                    : "bg-[var(--paper)] text-[var(--ink-light)]"
                }`}
              >
                {f.count}
              </span>
            </button>
          ))}
        </div>

        {/* Gallery Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredItems.map((item, index) => (
            <div
              key={item.id}
              onClick={() => handleCardClick(item)}
              className="bg-white rounded-2xl border border-[var(--line)] shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden cursor-pointer group flex flex-col"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? "translateY(0)" : "translateY(25px)",
                transition: `all 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${
                  0.1 + (index % 6) * 0.08
                }s`,
              }}
            >
              {/* Image Frame */}
              <div className="relative aspect-[16/10] overflow-hidden bg-[#16161a]">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Badge top left */}
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-md text-[10px] font-semibold text-[var(--ink)] uppercase tracking-wider shadow-sm">
                  {item.categoryLabel}
                </div>

                {/* Year top right */}
                <div className="absolute top-3 right-3 px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-md text-[10px] font-medium text-white/90">
                  {item.year}
                </div>

                {/* Zoom Icon indicator */}
                <div className="absolute bottom-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-[var(--ink)] shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                  >
                    <circle cx="11" cy="11" r="8" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                    <line x1="11" y1="8" x2="11" y2="14" />
                    <line x1="8" y1="11" x2="14" y2="11" />
                  </svg>
                </div>
              </div>

              {/* Card Meta Content */}
              <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <p
                    className="text-xs font-semibold text-[var(--ink)] opacity-60 mb-1"
                    style={{ fontFamily: "var(--font-inter)" }}
                  >
                    {item.issuerOrEvent}
                  </p>
                  <h3
                    className="text-base sm:text-lg font-bold text-[var(--ink)] group-hover:text-[var(--ink)] transition-colors line-clamp-2"
                    style={{ fontFamily: "var(--font-playfair)" }}
                  >
                    {item.title}
                  </h3>
                  <p
                    className="text-xs text-[var(--ink-light)] mt-2 line-clamp-2 leading-relaxed"
                    style={{ fontFamily: "var(--font-inter)" }}
                  >
                    {item.description}
                  </p>
                </div>

                {/* Tags */}
                {item.tags && item.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 pt-2 border-t border-[var(--line)]">
                    {item.tags.slice(0, 3).map((tag, j) => (
                      <span
                        key={j}
                        className="text-[10px] px-2 py-0.5 rounded-md bg-[var(--paper)] text-[var(--ink-light)] border border-[var(--line)]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
