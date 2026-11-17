"use client";

import { useEffect } from "react";

export interface ModalImageData {
  title: string;
  subtitle?: string;
  category?: string;
  description?: string;
  image: string;
  imageCaption?: string;
  tags?: string[];
}

interface ImageModalProps {
  data: ModalImageData | null;
  onClose: () => void;
}

export default function ImageModal({ data, onClose }: ImageModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (data) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [data, onClose]);

  if (!data) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={data.title}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 animate-fadeIn"
      style={{
        background: "rgba(20, 20, 22, 0.85)",
        backdropFilter: "blur(12px)",
      }}
      onClick={onClose}
    >
      <div
        className="relative max-w-5xl w-full bg-[var(--paper)] rounded-2xl overflow-hidden shadow-2xl border border-[var(--line)] max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--line)] bg-white/70 backdrop-blur-md">
          <div className="flex items-center gap-3">
            {data.category && (
              <span className="text-[11px] font-semibold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[var(--gold-light)] text-[var(--ink)]">
                {data.category}
              </span>
            )}
            <h3
              className="text-base sm:text-lg font-bold truncate max-w-md sm:max-w-xl text-[var(--ink)]"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              {data.title}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-black/5 text-[var(--ink)] transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Content & Image view */}
        <div className="overflow-y-auto p-4 sm:p-6 space-y-4">
          <div className="relative rounded-xl overflow-hidden bg-[#0d0d0f] flex items-center justify-center min-h-[300px] max-h-[65vh]">
            <img
              src={data.image}
              alt={data.title}
              className="w-full h-full object-contain max-h-[62vh]"
            />
          </div>

          {/* Details below image */}
          <div className="space-y-3 pt-2">
            {data.imageCaption && (
              <p
                className="text-xs sm:text-sm font-medium italic text-[var(--ink-light)]"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                📸 {data.imageCaption}
              </p>
            )}

            {data.subtitle && (
              <p
                className="text-xs sm:text-sm font-semibold tracking-wide uppercase text-[var(--ink)]"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                {data.subtitle}
              </p>
            )}

            {data.description && (
              <p
                className="text-sm leading-relaxed text-[var(--ink-light)]"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                {data.description}
              </p>
            )}

            {data.tags && data.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 pt-2">
                {data.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="text-xs px-2.5 py-1 rounded-md border border-[var(--line)] bg-white/80 text-[var(--ink-light)]"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
