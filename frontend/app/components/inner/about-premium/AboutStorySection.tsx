import Image from "next/image";
import type { CSSProperties } from "react";

type StoryPillar = {
  title: string;
  copy: string;
  iconName: "mortar" | "doctor" | "lotus";
};

const storyPillars: StoryPillar[] = [
  {
    title: "Rooted in Ayurveda",
    copy: "Our treatments are based on classical texts and time-tested practices.",
    iconName: "mortar",
  },
  {
    title: "Personalized Care",
    copy: "Every individual is unique. So is our approach.",
    iconName: "doctor",
  },
  {
    title: "Holistic Healing",
    copy: "We treat the root cause, not just the symptoms.",
    iconName: "lotus",
  },
];

function ThinLineIcon({ name }: { name: string }) {
  const common = {
    fill: "none",
    stroke: "var(--color-gold, #c89b3c)",
    strokeWidth: 1.3,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  if (name === "mortar") {
    return (
      <svg viewBox="0 0 48 48" aria-hidden="true" style={{ width: "26px", height: "26px" }}>
        <path {...common} d="M12 22h24l-3 17H15l-3-17Z" />
        <path {...common} d="M18 22c-2-5 1-10 6-12 6 2 9 7 6 12" />
        <path {...common} d="M20 30h8M24 26v8M11 39h26" />
        <path {...common} d="m33 18 6-6M36 11l4 4" />
      </svg>
    );
  }

  if (name === "doctor") {
    return (
      <svg viewBox="0 0 48 48" aria-hidden="true" style={{ width: "26px", height: "26px" }}>
        <circle cx="24" cy="14" r="6" {...common} />
        <path {...common} d="M11 40v-4c0-6 6-10 13-10s13 4 13 10v4" />
        <path {...common} d="M24 30v7M20 33.5h8" />
      </svg>
    );
  }

  if (name === "lotus") {
    return (
      <svg viewBox="0 0 48 48" aria-hidden="true" style={{ width: "26px", height: "26px" }}>
        <path {...common} d="M24 38c-8-6-8-16 0-28 8 12 8 22 0 28Z" />
        <path {...common} d="M24 36c-9 1-16-5-17-16 9 0 15 5 17 16ZM24 36c9 1 16-5 17-16-9 0-15 5-17 16Z" />
        <path {...common} d="M13 40h22" />
      </svg>
    );
  }

  return null;
}

function CircularSealText({
  className,
  end,
  start,
  text,
}: {
  className: string;
  end: number;
  start: number;
  text: string;
}) {
  const letters = text.split("");
  const spread = end - start;

  return (
    <span className={className}>
      {letters.map((letter, index) => {
        const angle = start + (spread / Math.max(letters.length - 1, 1)) * index;

        return (
          <i key={`${letter}-${index}`} style={{ "--angle": `${angle}deg` } as CSSProperties}>
            {letter === " " ? "\u00a0" : letter}
          </i>
        );
      })}
    </span>
  );
}

export function AboutStorySection() {
  return (
    <section className="about-story-section" id="story">
      <div className="about-story-image-wrap">
        <div className="about-story-image">
          <Image
            src="/images/about-story-lotus-courtyard.webp"
            alt="Ayurvedic hospital courtyard with lotus emblem and healing plants"
            width={900}
            height={1200}
            sizes="(max-width: 900px) 100vw, 47vw"
          />
        </div>

        {/* <div className="about-story-seal" aria-hidden="true">
          <CircularSealText className="about-story-seal-text about-story-seal-top" start={-72} end={72} text="ROOTED IN AYURVEDA" />
          <ThinLineIcon name="lotus" />
          <CircularSealText className="about-story-seal-text about-story-seal-bottom" start={108} end={252} text="FOCUSED ON YOU" />
        </div> */}
      </div>

      <div className="about-story-copy">
        <span>Our Story</span>
        <h2>
          Healing traditions,
          <br />
          built on <em>trust.</em>
        </h2>

  

        <p>
          For over five decades, Susrutha Ayurvedic Hospital has been a trusted name in authentic Ayurvedic care. Our
          journey began with a simple vision - to bring the wisdom of Ayurveda to every home and help people heal
          naturally.
        </p>

        <div className="about-story-pillars">
          {storyPillars.map((pillar) => (
            <article key={pillar.title}>
              <div>
                <ThinLineIcon name={pillar.iconName} />
              </div>
              <section>
                <h3>{pillar.title}</h3>
                <p>{pillar.copy}</p>
              </section>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
