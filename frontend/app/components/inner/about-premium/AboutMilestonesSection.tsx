"use client";

import { useMemo, useState, useRef } from "react";

type JourneyIconName =
  | "doctor"
  | "doctorLotus"
  | "hand"
  | "lotus"
  | "mortar"
  | "people"
  | "sprout"
  | "village";

type Milestone = {
  year: string;
  title: string;
  copy: string;
  icon: JourneyIconName;
};

const milestones: Milestone[] = [
  {
    year: "1970",
    title: "The Beginning",
    copy: "Founded with a vision to revive authentic Ayurveda.",
    icon: "sprout",
  },
  {
    year: "1985",
    title: "Growing Roots",
    copy: "Expanded our healing care and built trust in the community.",
    icon: "hand",
  },
  {
    year: "2008",
    title: "GMP Certified",
    copy: "Established our own GMP-certified pharmaceutical unit.",
    icon: "mortar",
  },
  {
    year: "2015",
    title: "Ayurveda Village",
    copy: "Opened Gramam Ayurveda Village for holistic living.",
    icon: "village",
  },
  {
    year: "Today",
    title: "Continuing the Legacy",
    copy: "Continuing our mission of holistic healing with modern care.",
    icon: "lotus",
  },
];

function JourneyIcon({ name }: { name: JourneyIconName }) {
  const common = {
    fill: "none",
    stroke: "currentColor",
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    strokeWidth: 1.7,
  };

  return (
    <svg viewBox="0 0 48 48" aria-hidden="true">
      {name === "sprout" ? (
        <>
          <path {...common} d="M15 36h18M18 36h12l2-13H16l2 13Z" />
          <path {...common} d="M24 23V10M24 17c-6-5-10-4-13-1 2 6 8 7 13 7M24 17c6-5 10-4 13-1-2 6-8 7-13 7" />
          <path {...common} d="M24 13c-3-4-3-8 0-11 3 3 3 7 0 11Z" />
        </>
      ) : null}

      {name === "hand" ? (
        <>
          <path {...common} d="M13 28h7l7-7a4 4 0 0 1 6 5l-8 9H13V28Z" />
          <path {...common} d="M5 25h8v14H5z" />
          <path {...common} d="M25 18c-6-5-10-4-13-1 2 6 8 7 13 7M25 18c5-4 9-3 11-1-2 5-7 6-11 7" />
          <path {...common} d="M25 22V9" />
        </>
      ) : null}

      {name === "mortar" ? (
        <>
          <path {...common} d="M12 21h24l-3 15H15l-3-15Z" />
          <path {...common} d="M17 36h14M17 26h14" />
          <path {...common} d="M29 19 39 9a4 4 0 0 1 0 6L30 24" />
          <path {...common} d="M20 20c-5-4-8-4-11-2 2 5 6 7 11 7M22 18c1-6 4-9 8-10 2 5 0 9-5 12" />
        </>
      ) : null}

      {name === "village" ? (
        <>
          <path {...common} d="M9 23 24 11l15 12M13 22v15h22V22" />
          <path {...common} d="M19 37V25h10v12M15 17h18" />
          <path {...common} d="M34 36c5-3 7-7 7-12-6 1-10 5-10 12M34 36c-4-3-5-7-4-11 5 1 8 5 8 11" />
          <path {...common} d="M30 37h13" />
        </>
      ) : null}

      {name === "lotus" ? (
        <>
          <path {...common} d="M24 38c-8-6-8-16 0-28 8 12 8 22 0 28Z" />
          <path {...common} d="M24 36c-9 1-16-5-17-16 9 0 15 5 17 16ZM24 36c9 1 16-5 17-16-9 0-15 5-17 16Z" />
          <path {...common} d="M13 39h22" />
        </>
      ) : null}

      {name === "doctor" || name === "doctorLotus" ? (
        <>
          <path {...common} d="M18 18a6 6 0 0 1 12 0v3a6 6 0 0 1-12 0v-3Z" />
          <path {...common} d="M13 40v-5c0-6 5-10 11-10s11 4 11 10v5" />
          <path {...common} d="M19 28v7M29 28v7M24 34h5M26.5 31.5v5" />
          {name === "doctorLotus" ? (
            <path {...common} d="M35 31c4-3 6-3 8-1-1 4-4 6-8 6 0-4 1-7 4-10" />
          ) : null}
        </>
      ) : null}

      {name === "people" ? (
        <>
          <path {...common} d="M19 21a6 6 0 1 0 0-12 6 6 0 0 0 0 12ZM29 21a6 6 0 1 0 0-12 6 6 0 0 0 0 12Z" />
          <path {...common} d="M8 39v-5c0-6 5-10 11-10s11 4 11 10v5" />
          <path {...common} d="M25 26c2-1 4-2 7-2 6 0 11 4 11 10v5" />
        </>
      ) : null}
    </svg>
  );
}

export function AboutMilestonesSection() {
  const initialMilestone = milestones.findIndex((item) => item.year === "2008");
  const [activeIndex, setActiveIndex] = useState(initialMilestone >= 0 ? initialMilestone : 0);

  const activeMilestone = milestones[activeIndex];

  const orderedMilestones = useMemo(
    () =>
      milestones.map((item, index) => {
        let relativePos = index - activeIndex;
        if (relativePos < -2) relativePos += milestones.length;
        if (relativePos > 2) relativePos -= milestones.length;

        return {
          ...item,
          index,
          relativePos,
          order: relativePos + 2,
          isActive: index === activeIndex,
        };
      }),
    [activeIndex],
  );

  const moveMilestone = (direction: "next" | "previous") => {
    setActiveIndex((current) =>
      direction === "next"
        ? (current + 1) % milestones.length
        : (current - 1 + milestones.length) % milestones.length,
    );
  };

  const touchStartX = useRef<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;

    if (Math.abs(diff) > 40) {
      if (diff > 0) {
        moveMilestone("next");
      } else {
        moveMilestone("previous");
      }
    }
    touchStartX.current = null;
  };

  return (
    <section className="about-premium-milestones" id="journey">
      <button
        className="journey-arrow journey-arrow-left"
        type="button"
        aria-label="Previous milestone"
        onClick={() => moveMilestone("previous")}
      >
        <span aria-hidden="true" />
      </button>
      <button
        className="journey-arrow journey-arrow-right"
        type="button"
        aria-label="Next milestone"
        onClick={() => moveMilestone("next")}
      >
        <span aria-hidden="true" />
      </button>

      <div className="journey-heading">
        <span>Our Journey</span>
        <div aria-hidden="true">
          <i />
          <JourneyIcon name="lotus" />
          <i />
        </div>
        <h2>
          Milestones That
          <br />
          Shaped <em>Our Path</em>
        </h2>
        <p>
          Every milestone reflects our commitment to preserving ancient wisdom while embracing innovation for holistic
          well-being.
        </p>
      </div>

      <p className="journey-active-status" aria-live="polite">
        {activeMilestone.year}: {activeMilestone.title}
      </p>

      <div
        className="journey-timeline"
        aria-label="Susrutha Ayurveda journey milestones"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* <svg className="journey-wave" viewBox="0 0 1280 110" preserveAspectRatio="none" aria-hidden="true">
          <path d="M0 57 C155 51 204 66 320 57 C458 47 510 60 640 57 C772 54 792 37 873 17 C974 -8 1014 96 1110 72 C1182 54 1204 59 1280 36" />
        </svg> */}

        {orderedMilestones.map((item) => (
          <button
            className={item.isActive ? "journey-card is-featured" : "journey-card"}
            type="button"
            aria-pressed={item.isActive}
            aria-label={`Show ${item.year}, ${item.title}`}
            key={item.year}
            onClick={() => setActiveIndex(item.index)}
            style={{ order: item.order }}
          >
            <div className="journey-icon">
              <JourneyIcon name={item.icon} />
            </div>
            <div className="journey-card-copy">
              <strong>{item.year}</strong>
              <h3>{item.title}</h3>
              <i aria-hidden="true" />
              <p>{item.copy}</p>
            </div>
          </button>
        ))}
      </div>
    </section>
  );
}
