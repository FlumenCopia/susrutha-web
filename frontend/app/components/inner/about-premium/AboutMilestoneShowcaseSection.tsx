"use client";

import Image from "next/image";
import { useMemo, useState } from "react";

type ShowcaseIconName = "cap" | "foundation" | "leaf" | "lotus" | "medical" | "partnership";

type ShowcaseMilestone = {
  year: string;
  title: string;
  copy: string;
  icon: ShowcaseIconName;
  image?: string;
  muted?: boolean;
};

const showcaseMilestones: ShowcaseMilestone[] = [
  {
    year: "2008",
    title: "Foundation",
    copy: "Established our own GMP-certified pharmaceutical unit.",
    icon: "foundation",
  },
  {
    year: "2010",
    title: "Ayurveda Village",
    copy: "Gramam cottages opened for holistic living experience.",
    icon: "leaf",
    image: "/images/ayurveda-hospital-garden.webp",
  },
  {
    year: "2012",
    title: "Partnership",
    copy: "Registered partnership firm strengthening our mission.",
    icon: "partnership",
    image: "/images/about-purpose-still-life.webp",
  },
  {
    year: "2013",
    title: "Nursing School",
    copy: "Ayurveda nursing education initiated.",
    icon: "cap",
    image: "/images/about-hero-ayurveda-still-life.webp",
    muted: true,
  },
  {
    year: "2015",
    title: "Medical Centre",
    copy: "Advanced diagnostic and treatment facilities introduced.",
    icon: "medical",
  },
  {
    year: "2020",
    title: "Wellness Care",
    copy: "Personalized wellness programmes expanded for families.",
    icon: "lotus",
    image: "/images/about-purpose-vision-plant.webp",
  },
  {
    year: "Today",
    title: "Continuing the Legacy",
    copy: "Carrying Ayurveda forward with the same purpose: your well-being.",
    icon: "leaf",
    image: "/images/about-purpose-mission-bowl.webp",
  },
];

function ShowcaseIcon({ name }: { name: ShowcaseIconName }) {
  const common = {
    fill: "none",
    stroke: "currentColor",
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    strokeWidth: 1.7,
  };

  return (
    <svg viewBox="0 0 48 48" aria-hidden="true">
      {name === "foundation" ? (
        <>
          <path {...common} d="M14 18h20l-2 22H16l-2-22Z" />
          <path {...common} d="M18 18c-2-5 1-9 6-10 5 1 8 5 6 10" />
          <path {...common} d="M20 28h8M24 24v8M13 40h22" />
          <path {...common} d="M32 14h5v7" />
        </>
      ) : null}

      {name === "leaf" ? (
        <>
          <path {...common} d="M24 39V20" />
          <path {...common} d="M24 29C15 29 9 23 8 14c9 0 16 6 16 15ZM24 32c8 0 14-5 16-13-9 0-16 5-16 13Z" />
          <path {...common} d="M15 23c3 1 6 3 9 6M35 24c-4 1-7 4-11 8" />
        </>
      ) : null}

      {name === "partnership" ? (
        <>
          <path {...common} d="m18 25-5-5a5 5 0 0 1 7-7l4 4" />
          <path {...common} d="m30 25 5-5a5 5 0 0 0-7-7l-4 4" />
          <path {...common} d="m16 23 12 12a5 5 0 0 0 7-7L23 16" />
          <path {...common} d="m20 28-4 4M25 33l-3 3M30 20l-5 5" />
        </>
      ) : null}

      {name === "cap" ? (
        <>
          <path {...common} d="M6 18 24 9l18 9-18 9L6 18Z" />
          <path {...common} d="M14 23v9c5 5 15 5 20 0v-9" />
          <path {...common} d="M38 20v12" />
        </>
      ) : null}

      {name === "medical" ? (
        <>
          <path {...common} d="M18 18a6 6 0 0 1 12 0v3a6 6 0 0 1-12 0v-3Z" />
          <path {...common} d="M11 40v-5c0-6 5-10 13-10s13 4 13 10v5" />
          <path {...common} d="M24 33h8M28 29v8" />
          <path {...common} d="M10 16c0-5 4-8 8-8" />
        </>
      ) : null}

      {name === "lotus" ? (
        <>
          <path {...common} d="M24 38c-8-6-8-16 0-28 8 12 8 22 0 28Z" />
          <path {...common} d="M24 36c-9 1-16-5-17-16 9 0 15 5 17 16ZM24 36c9 1 16-5 17-16-9 0-15 5-17 16Z" />
          <path {...common} d="M13 39h22" />
        </>
      ) : null}
    </svg>
  );
}

export function AboutMilestoneShowcaseSection() {
  const [activeIndex, setActiveIndex] = useState(2);
  const visibleMilestones = useMemo(() => {
    const total = showcaseMilestones.length;
    return [-2, -1, 0, 1, 2].map((offset) => {
      const index = (activeIndex + offset + total) % total;
      return {
        ...showcaseMilestones[index],
        index,
        offset,
      };
    });
  }, [activeIndex]);

  const move = (direction: "next" | "previous") => {
    setActiveIndex((current) =>
      direction === "next"
        ? (current + 1) % showcaseMilestones.length
        : (current - 1 + showcaseMilestones.length) % showcaseMilestones.length,
    );
  };

  return (
    <section className="about-milestone-showcase">
      <div className="milestone-showcase-hero">
        <div className="milestone-showcase-copy">
          <span>Our Journey</span>
          <h2>
            Milestones that
            <br />
            shaped our path
            <br />
            <em>through time.</em>
          </h2>
          <p>Every milestone reflects our unwavering commitment to authentic Ayurveda and holistic healing.</p>
        </div>
        <div className="milestone-showcase-image">
          <Image
            src="/images/about-purpose-still-life.webp"
            alt="Ayurvedic mortar and herbs"
            width={900}
            height={520}
            sizes="(max-width: 900px) 100vw, 46vw"
          />
        </div>
      </div>

      <div className="milestone-showcase-track-head">
        <div>
          <strong>1970</strong>
          <span>The Beginning</span>
        </div>
        <div className="milestone-showcase-line" aria-hidden="true">
          <i />
          <i />
          <span>
            <ShowcaseIcon name="lotus" />
          </span>
          <i />
        </div>
        <div>
          <strong>TODAY</strong>
          <span>Continuing the Legacy</span>
        </div>
        <div className="milestone-showcase-actions">
          <button type="button" aria-label="Previous showcase milestone" onClick={() => move("previous")}>
            <span aria-hidden="true" />
          </button>
          <button type="button" aria-label="Next showcase milestone" onClick={() => move("next")}>
            <span aria-hidden="true" />
          </button>
        </div>
      </div>

      <div className="milestone-showcase-cards" aria-label="Milestone showcase cards">
        {visibleMilestones.map((item) => (
          <button
            className={`milestone-showcase-card offset-${item.offset} ${item.offset === 0 ? "is-active" : ""}`}
            data-muted={item.muted ? "true" : undefined}
            type="button"
            key={`${item.year}-${item.offset}`}
            aria-pressed={item.offset === 0}
            onClick={() => setActiveIndex(item.index)}
          >
            <div className="milestone-showcase-icon">
              <ShowcaseIcon name={item.icon} />
            </div>
            <strong>{item.year}</strong>
            <h3>{item.title}</h3>
            <i aria-hidden="true" />
            <p>{item.copy}</p>
            {item.image ? (
              <Image
                src={item.image}
                alt=""
                width={420}
                height={260}
                sizes="(max-width: 760px) 100vw, 24vw"
                aria-hidden="true"
              />
            ) : null}
          </button>
        ))}
      </div>

      <div className="milestone-showcase-dots" aria-label="Choose milestone">
        {showcaseMilestones.map((item, index) => (
          <button
            type="button"
            key={item.year}
            aria-label={`Show ${item.year} ${item.title}`}
            aria-pressed={activeIndex === index}
            onClick={() => setActiveIndex(index)}
          />
        ))}
      </div>

      <blockquote>
        <span aria-hidden="true">&quot;</span>
        From our roots in tradition to our vision for the future,
        <br />
        we continue to evolve with the same purpose: your well-being.
        <span aria-hidden="true">&quot;</span>
      </blockquote>
    </section>
  );
}
