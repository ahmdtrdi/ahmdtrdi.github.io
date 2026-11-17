"use client";

import { useEffect, useRef, useState } from "react";
import PentagonChart from "./PentagonChart";
import ShowcaseCard from "./ShowcaseCard";
import {
  internshipsData,
  researchData,
  competitionData,
  ProjectItem,
} from "../data/portfolioData";
import { ModalImageData } from "./ImageModal";

/* ──────────────────────────────────────
   CATEGORY SECTIONS
   Internship · Research Project · Competition
   Each with traits, radar chart and rich showcase cards
   ────────────────────────────────────── */

interface CategoryConfig {
  id: string;
  title: string;
  subtitle: string;
  traits: string[];
  description: string;
  chartColors: {
    fill1: string;
    stroke1: string;
    fill2: string;
    stroke2: string;
    fill3: string;
    stroke3: string;
  };
  items: ProjectItem[];
}

const categoriesConfig: CategoryConfig[] = [
  {
    id: "internship",
    title: "Internship",
    subtitle: "Where theory meets production reality",
    traits: ["Diligent", "Experience", "Clarity"],
    description:
      "From designing enterprise memory layers for AI agents and engineering real-time SSE protocols for 26 bank branches, to managing 1000+ data warehouse sources — each internship forged real-world engineering resilience.",
    chartColors: {
      fill1: "rgba(125, 161, 212, 0.25)",
      stroke1: "var(--blue)",
      fill2: "rgba(242, 208, 107, 0.2)",
      stroke2: "var(--gold)",
      fill3: "rgba(196, 180, 224, 0.35)",
      stroke3: "var(--lavender)",
    },
    items: internshipsData,
  },
  {
    id: "research",
    title: "Research Project",
    subtitle: "Where curiosity converts into empirical discovery",
    traits: ["Curiosity", "Creativity", "Programming"],
    description:
      "Tackling complex challenges through applied artificial intelligence: parameter-efficient LLM fine-tuning, association rule mining on anthropometric ergonomics, and multimodal cross-attention transformers for food freshness.",
    chartColors: {
      fill1: "rgba(196, 180, 224, 0.35)",
      stroke1: "var(--lavender)",
      fill2: "rgba(125, 161, 212, 0.2)",
      stroke2: "var(--blue)",
      fill3: "rgba(242, 208, 107, 0.25)",
      stroke3: "var(--gold)",
    },
    items: researchData,
  },
  {
    id: "competition",
    title: "Competition",
    subtitle: "Where rapid execution proves technical capability",
    traits: ["Collaborative", "Communication", "Dedication"],
    description:
      "National hackathon podium finishes, PIMNAS 38 bronze medal honors, and global Web3 hackathon recognitions. Forging production-ready prototypes under high-stakes, time-constrained environments.",
    chartColors: {
      fill1: "rgba(242, 208, 107, 0.3)",
      stroke1: "var(--gold)",
      fill2: "rgba(196, 180, 224, 0.25)",
      stroke2: "var(--lavender)",
      fill3: "rgba(125, 161, 212, 0.25)",
      stroke3: "var(--blue)",
    },
    items: competitionData,
  },
];

interface CategorySectionProps {
  data: CategoryConfig;
  index: number;
  onOpenModal: (data: ModalImageData) => void;
}

function CategorySection({ data, index, onOpenModal }: CategorySectionProps) {
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

  const isEven = index % 2 === 0;

  return (
    <section
      ref={sectionRef}
      id={data.id}
      className="relative py-24 md:py-32 overflow-hidden"
      style={{
        background: index % 2 === 1 ? "var(--paper-warm)" : "var(--paper)",
      }}
    >
      <div className="section-container">
        {/* Section Header with Pentagon Chart */}
        <div
          className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center mb-16 ${
            isEven ? "" : "lg:[direction:rtl]"
          }`}
        >
          {/* Header Text (8 cols) */}
          <div
            className={`lg:col-span-8 ${isEven ? "" : "lg:[direction:ltr]"}`}
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible
                ? "translateX(0)"
                : `translateX(${isEven ? "-30px" : "30px"})`,
              transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          >
            <div className="flex items-center gap-2 mb-3">
              <span
                className="w-2 h-2 rounded-full"
                style={{
                  background:
                    data.id === "competition"
                      ? "var(--gold)"
                      : data.id === "research"
                      ? "var(--lavender)"
                      : "var(--blue)",
                }}
              />
              <span
                className="text-xs tracking-[0.2em] uppercase font-semibold text-[var(--ink-light)]"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                {data.traits.join("  ·  ")}
              </span>
            </div>

            <h2
              className="text-4xl sm:text-5xl md:text-6xl mb-4 text-[var(--ink)]"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              {data.title}
            </h2>

            <p
              className="text-sm sm:text-base font-semibold uppercase tracking-wider mb-4 opacity-75 text-[var(--ink)]"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              {data.subtitle}
            </p>

            <p
              className="text-base sm:text-lg leading-relaxed text-[var(--ink-light)] max-w-2xl"
              style={{ fontFamily: "var(--font-inter)", textAlign: "justify" }}
            >
              {data.description}
            </p>
          </div>

          {/* Radar / Pentagon Chart Graphic (4 cols) */}
          <div
            className={`lg:col-span-4 flex justify-center ${
              isEven ? "" : "lg:[direction:ltr]"
            }`}
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible
                ? "scale(1)"
                : "scale(0.85)",
              transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.2s",
            }}
          >
            <div className="w-full max-w-[280px]">
              <PentagonChart labels={data.traits} colors={data.chartColors} />
            </div>
          </div>
        </div>

        {/* Project Cards Stack */}
        <div className="space-y-8">
          {data.items.map((item, i) => (
            <ShowcaseCard
              key={item.id}
              item={item}
              index={i}
              onOpenModal={onOpenModal}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

interface CategorySectionsProps {
  onOpenModal: (data: ModalImageData) => void;
}

export default function CategorySections({ onOpenModal }: CategorySectionsProps) {
  return (
    <>
      {categoriesConfig.map((cat, i) => (
        <div key={cat.id}>
          <CategorySection data={cat} index={i} onOpenModal={onOpenModal} />
          {i < categoriesConfig.length - 1 && (
            <div className="section-divider" />
          )}
        </div>
      ))}
    </>
  );
}
