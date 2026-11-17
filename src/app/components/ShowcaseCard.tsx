"use client";

import { ProjectItem } from "../data/portfolioData";
import { ModalImageData } from "./ImageModal";

interface ShowcaseCardProps {
  item: ProjectItem;
  onOpenModal: (data: ModalImageData) => void;
  index: number;
}

export default function ShowcaseCard({
  item,
  onOpenModal,
  index,
}: ShowcaseCardProps) {
  const isAlt = index % 2 === 1;

  const handleImageClick = () => {
    if (item.image) {
      onOpenModal({
        title: item.title,
        subtitle: `${item.role} · ${item.organization}`,
        category: item.badge || item.category,
        description: item.description,
        image: item.image,
        imageCaption: item.imageCaption,
        tags: item.tags,
      });
    }
  };

  return (
    <div
      className="bg-white rounded-2xl border border-[var(--line)] shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden group"
    >
      <div
        className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 p-6 sm:p-8 md:p-10 items-center ${
          isAlt ? "lg:[direction:rtl]" : ""
        }`}
      >
        {/* Left / Main text side (7 cols) */}
        <div
          className={`lg:col-span-7 space-y-6 ${
            isAlt ? "lg:[direction:ltr]" : ""
          }`}
        >
          {/* Top badges & meta */}
          <div className="flex flex-wrap items-center gap-2.5">
            {item.badge && (
              <span
                className="text-[11px] font-semibold uppercase tracking-wider px-3 py-1 rounded-full"
                style={{
                  background:
                    item.category === "competition"
                      ? "var(--gold-light)"
                      : item.category === "research"
                      ? "var(--lavender-light)"
                      : "var(--blue-light)",
                  color: "var(--ink)",
                }}
              >
                {item.badge}
              </span>
            )}
            <span
              className="text-xs font-medium tracking-wide uppercase text-[var(--ink-light)] opacity-70"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              {item.period}
            </span>
          </div>

          {/* Title & Organization */}
          <div>
            <h3
              className="text-2xl sm:text-3xl font-bold mb-2 tracking-tight text-[var(--ink)]"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              {item.title}
            </h3>
            <p
              className="text-sm sm:text-base font-semibold text-[var(--ink)] opacity-90 flex items-center gap-2"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              <span>{item.role}</span>
              <span className="opacity-40">·</span>
              <span className="text-[var(--ink-light)]">{item.organization}</span>
            </p>
          </div>

          {/* Core description */}
          <p
            className="text-sm md:text-base leading-relaxed text-[var(--ink-light)]"
            style={{ fontFamily: "var(--font-inter)", textAlign: "justify" }}
          >
            {item.description}
          </p>

          {/* Bullets */}
          <div className="space-y-2.5 pt-1">
            {item.bullets.map((bullet, i) => (
              <div key={i} className="flex items-start gap-3">
                <span
                  className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0"
                  style={{
                    background:
                      item.category === "competition"
                        ? "var(--gold)"
                        : item.category === "research"
                        ? "var(--lavender)"
                        : "var(--blue)",
                  }}
                />
                <p
                  className="text-xs sm:text-sm leading-relaxed text-[var(--ink-light)]"
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  {bullet}
                </p>
              </div>
            ))}
          </div>

          {/* Metrics highlights */}
          {item.metrics && item.metrics.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-3 border-t border-[var(--line)]">
              {item.metrics.map((metric, i) => (
                <div
                  key={i}
                  className="p-2.5 rounded-xl bg-[var(--paper)] border border-[var(--line)] text-center"
                >
                  <p
                    className="text-[10px] uppercase tracking-wider text-[var(--ink-light)] opacity-70 mb-0.5"
                    style={{ fontFamily: "var(--font-inter)" }}
                  >
                    {metric.label}
                  </p>
                  <p
                    className="text-xs sm:text-sm font-bold text-[var(--ink)]"
                    style={{ fontFamily: "var(--font-inter)" }}
                  >
                    {metric.value}
                  </p>
                </div>
              ))}
            </div>
          )}

          {/* Tech tags */}
          <div className="flex flex-wrap gap-2 pt-2">
            {item.tags.map((tag, j) => (
              <span key={j} className="tag text-xs">
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Right / Visual Image Slot (5 cols) */}
        <div
          className={`lg:col-span-5 ${
            isAlt ? "lg:[direction:ltr]" : ""
          }`}
        >
          {item.image ? (
            <div
              onClick={handleImageClick}
              className="relative group/img cursor-pointer rounded-xl overflow-hidden border border-[var(--line)] bg-[var(--paper-warm)] shadow-sm hover:shadow-md transition-all duration-300"
            >
              {/* Image Frame */}
              <div className="relative aspect-[16/10] sm:aspect-[16/10] overflow-hidden bg-[#111]">
                <img
                  src={item.image}
                  alt={item.imageAlt || item.title}
                  className="w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-700 ease-out"
                />

                {/* Subtle overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover/img:opacity-100 transition-opacity duration-300" />

                {/* Zoom pill indicator */}
                <div className="absolute bottom-3 right-3 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-md shadow-md text-[11px] font-semibold text-[var(--ink)] flex items-center gap-1.5 opacity-90 group-hover/img:opacity-100 group-hover/img:translate-y-0 transition-all duration-300">
                  <svg
                    width="13"
                    height="13"
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
                  <span>Preview Showcase</span>
                </div>
              </div>

              {/* Caption */}
              {item.imageCaption && (
                <div className="px-4 py-2.5 bg-white border-t border-[var(--line)] flex items-center justify-between">
                  <p
                    className="text-[11px] sm:text-xs text-[var(--ink-light)] italic truncate"
                    style={{ fontFamily: "var(--font-inter)" }}
                  >
                    {item.imageCaption}
                  </p>
                  <span className="text-[10px] text-[var(--ink-light)] opacity-60 shrink-0 ml-2">
                    Click to enlarge ↗
                  </span>
                </div>
              )}
            </div>
          ) : (
            /* Developer Placeholder slot if user hasn't provided an image */
            <div className="border-2 border-dashed border-[var(--line)] rounded-xl p-8 flex flex-col items-center justify-center text-center bg-white/50 aspect-[16/10]">
              <div className="w-12 h-12 rounded-full bg-[var(--paper)] flex items-center justify-center text-[var(--ink-light)] mb-3 opacity-60">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                  <circle cx="8.5" cy="8.5" r="1.5" />
                  <polyline points="21 15 16 10 5 21" />
                </svg>
              </div>
              <p
                className="text-xs font-semibold text-[var(--ink)] mb-1"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                Showcase Image Slot
              </p>
              <p
                className="text-[11px] text-[var(--ink-light)] opacity-60 max-w-[200px]"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                Set <code className="bg-black/5 px-1 py-0.5 rounded">image</code> in <code className="bg-black/5 px-1 py-0.5 rounded">portfolioData.ts</code>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
