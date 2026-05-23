"use client";

import { useEffect, useRef, useState } from "react";
import PentagonChart from "./PentagonChart";

/* ──────────────────────────────────────
   CATEGORY SECTIONS
   Research Project · Internship · Competition
   Each with pentagon chart and project cards
   ────────────────────────────────────── */

interface CategoryData {
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
  projects: {
    title: string;
    description: string;
    tags: string[];
    year: string;
  }[];
}

const categories: CategoryData[] = [
  {
    id: "research",
    title: "Research Project",
    subtitle: "Where questions become experiments",
    traits: ["Curiosity", "Creativity", "Programming"],
    description:
      "Research taught me that the best answers start with the bravest questions. Every project here began with a &ldquo;what if&rdquo; — and ended with data that told a story worth publishing.",
    chartColors: {
      fill1: "rgba(242, 208, 107, 0.25)",
      stroke1: "var(--gold)",
      fill2: "rgba(125, 161, 212, 0.2)",
      stroke2: "var(--blue)",
      fill3: "rgba(196, 180, 224, 0.35)",
      stroke3: "var(--lavender)",
    },
    projects: [
      {
        title: "Sentiment-Driven Market Prediction",
        description:
          "Built an NLP pipeline to gauge market sentiment from social media chatter, achieving 73% directional accuracy on next-day price movements.",
        tags: ["NLP", "Finance", "Python"],
        year: "2025",
      },
      {
        title: "Graph Neural Network for Drug Discovery",
        description:
          "Applied GNN architectures to molecular property prediction, reducing false-positive screening rates by 28% on benchmark datasets.",
        tags: ["GNN", "Bio-ML", "PyTorch"],
        year: "2024",
      },
    ],
  },
  {
    id: "internship",
    title: "Internship",
    subtitle: "Where theory meets the real world",
    traits: ["Diligent", "Experience", "Clarity"],
    description:
      "Internships shaped how I think under pressure. From machine learning pipelines to production deployments — each experience refined my craft and taught me what no classroom ever could.",
    chartColors: {
      fill1: "rgba(242, 208, 107, 0.25)",
      stroke1: "var(--gold)",
      fill2: "rgba(125, 161, 212, 0.2)",
      stroke2: "var(--blue)",
      fill3: "rgba(196, 180, 224, 0.35)",
      stroke3: "var(--lavender)",
    },
    projects: [
      {
        title: "ML Engineer Intern — BSG",
        description:
          "Developed and deployed machine learning models for production-grade recommendation systems, optimizing inference latency by 40% through model quantization.",
        tags: ["ML", "Python", "Production"],
        year: "2024",
      },
      {
        title: "Software Engineer Intern",
        description:
          "Contributed to full-stack application development, implementing REST APIs and data visualization dashboards used by 500+ daily active users.",
        tags: ["Full-Stack", "React", "Node.js"],
        year: "2023",
      },
    ],
  },
  {
    id: "competition",
    title: "Competition",
    subtitle: "Where pressure reveals potential",
    traits: ["Collaborative", "Communication", "Dedication"],
    description:
      "Competitions are where I thrive. Tight deadlines, unfamiliar problems, and the thrill of building something from zero — these experiences forged both my technical skills and my ability to lead under fire.",
    chartColors: {
      fill1: "rgba(242, 208, 107, 0.25)",
      stroke1: "var(--gold)",
      fill2: "rgba(125, 161, 212, 0.2)",
      stroke2: "var(--blue)",
      fill3: "rgba(196, 180, 224, 0.35)",
      stroke3: "var(--lavender)",
    },
    projects: [
      {
        title: "ITC National — Telkom University",
        description:
          "Led a team of three to the national finals, presenting an AI-powered solution for urban traffic optimization that earned recognition from industry judges.",
        tags: ["AI", "Leadership", "Presentation"],
        year: "2024",
      },
      {
        title: "Hackathon — Web3 GameFi Platform",
        description:
          "Built a decentralized card-battle game on Solana in 48 hours, integrating smart contracts with a real-time multiplayer backend.",
        tags: ["Web3", "Solana", "GameFi"],
        year: "2025",
      },
    ],
  },
];

function CategorySection({ data, index }: { data: CategoryData; index: number }) {
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
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const isEven = index % 2 === 0;

  return (
    <section
      ref={sectionRef}
      id={data.id}
      className="relative py-20 md:py-28 overflow-hidden"
      style={{ background: index % 2 === 1 ? "var(--paper-warm)" : "var(--paper)" }}
    >
      <div className="section-container">
        <div
          className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center ${
            isEven ? "" : "lg:[direction:rtl]"
          }`}
        >
          {/* Text Side */}
          <div
            className={isEven ? "" : "lg:[direction:ltr]"}
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible
                ? "translateX(0)"
                : `translateX(${isEven ? "-40px" : "40px"})`,
              transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          >
            <h2
              className="text-4xl sm:text-5xl md:text-6xl mb-3"
              style={{ color: "var(--ink)" }}
            >
              {data.title}
            </h2>
            <p
              className="text-sm tracking-[0.15em] uppercase mb-8"
              style={{ color: "var(--ink-light)", fontFamily: "var(--font-inter)" }}
            >
              {data.traits.join("  ·  ")}
            </p>
            <p
              className="text-base md:text-lg leading-relaxed mb-10"
              style={{
                color: "var(--ink-light)",
                fontFamily: "var(--font-inter)",
                maxWidth: 520,
                textAlign: "justify",
              }}
              dangerouslySetInnerHTML={{ __html: data.description }}
            />

            {/* Project Cards */}
            <div className="space-y-4">
              {data.projects.map((project, i) => (
                <div
                  key={i}
                  className="project-card"
                  style={{
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible ? "translateY(0)" : "translateY(20px)",
                    transition: `all 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${0.4 + i * 0.2}s`,
                  }}
                >
                  <div className="flex items-start justify-between mb-2">
                    <h3
                      className="text-lg font-semibold"
                      style={{ fontFamily: "var(--font-playfair)", color: "var(--ink)" }}
                    >
                      {project.title}
                    </h3>
                    <span
                      className="text-xs shrink-0 ml-3 mt-1"
                      style={{ color: "var(--ink-light)", fontFamily: "var(--font-inter)" }}
                    >
                      {project.year}
                    </span>
                  </div>
                  <p
                    className="text-sm leading-relaxed mb-3"
                    style={{ color: "var(--ink-light)", fontFamily: "var(--font-inter)" }}
                  >
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag, j) => (
                      <span key={j} className="tag">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Chart Side */}
          <div
            className={isEven ? "" : "lg:[direction:ltr]"}
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible
                ? "translateX(0)"
                : `translateX(${isEven ? "40px" : "-40px"})`,
              transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.3s",
            }}
          >
            <PentagonChart
              labels={data.traits}
              colors={data.chartColors}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default function CategorySections() {
  return (
    <>
      {categories.map((cat, i) => (
        <CategorySection key={cat.id} data={cat} index={i} />
      ))}
    </>
  );
}
