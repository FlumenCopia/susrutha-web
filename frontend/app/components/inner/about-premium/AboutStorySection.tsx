import Image from "next/image";
import type { CSSProperties } from "react";

type StoryIconName = "doctor" | "lotus" | "mortar";

type StoryPillar = {
  title: string;
  copy: string;
  icon: StoryIconName;
};

const storyPillars: StoryPillar[] = [
  {
    title: "Rooted in Ayurveda",
    copy: "Our treatments are based on classical texts and time-tested practices.",
    icon: "mortar",
  },
  {
    title: "Personalized Care",
    copy: "Every individual is unique. So is our approach.",
    icon: "doctor",
  },
  {
    title: "Holistic Healing",
    copy: "We treat the root cause, not just the symptoms.",
    icon: "lotus",
  },
];

function StoryIcon({ name }: { name: StoryIconName }) {
  const common = {
    fill: "none",
    stroke: "currentColor",
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    strokeWidth: 1.6,
  };

  return (
    <svg viewBox="0 0 48 48" aria-hidden="true">
      {name === "mortar" ? (
        <>
          <path {...common} d="M13 21h22l-3 18H16l-3-18Z" />
          <path {...common} d="M18 21c-2-5 1-10 6-12 6 2 9 7 6 12" />
          <path {...common} d="M20 29h8M24 25v9M12 39h24" />
          <path {...common} d="m32 18 6-6M35 11l4 4" />
        </>
      ) : null}

      {name === "doctor" ? (
        <>
          <path {...common} d="M18 17a6 6 0 0 1 12 0v4a6 6 0 0 1-12 0v-4Z" />
          <path {...common} d="M11 40v-5c0-6 5-10 13-10s13 4 13 10v5" />
          <path {...common} d="M24 31v8M20 35h8" />
          <path {...common} d="M12 15c0-4 3-7 7-7M36 15c0-4-3-7-7-7" />
        </>
      ) : null}

      {name === "lotus" ? (
        <>
          <path {...common} d="M24 38c-8-6-8-16 0-28 8 12 8 22 0 28Z" />
          <path {...common} d="M24 36c-9 1-16-5-17-16 9 0 15 5 17 16ZM24 36c9 1 16-5 17-16-9 0-15 5-17 16Z" />
          <path {...common} d="M13 40h22" />
        </>
      ) : null}
    </svg>
  );
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
    <section className="about-story-section">
      <div className="about-story-image-wrap">
        <div className="about-story-image">
          <Image
            src="/images/about-story-lotus-courtyard.png"
            alt="Ayurvedic hospital courtyard with lotus emblem and healing plants"
            width={900}
            height={1200}
            sizes="(max-width: 900px) 100vw, 47vw"
          />
        </div>

        <div className="about-story-seal" aria-hidden="true">
          <CircularSealText className="about-story-seal-text about-story-seal-top" start={-72} end={72} text="ROOTED IN AYURVEDA" />
          <StoryIcon name="lotus" />
          <CircularSealText className="about-story-seal-text about-story-seal-bottom" start={108} end={252} text="FOCUSED ON YOU" />
        </div>
      </div>

      <div className="about-story-copy">
        <span>Our Story</span>
        <h2>
          Healing traditions,
          <br />
          built on <em>trust.</em>
        </h2>

        <div className="about-story-divider" aria-hidden="true">
          <i />
          <StoryIcon name="lotus" />
          <i />
        </div>

        <p>
          For over five decades, Susrutha Ayurvedic Hospital has been a trusted name in authentic Ayurvedic care. Our
          journey began with a simple vision - to bring the wisdom of Ayurveda to every home and help people heal
          naturally.
        </p>

        <div className="about-story-pillars">
          {storyPillars.map((pillar) => (
            <article key={pillar.title}>
              <div>
                <StoryIcon name={pillar.icon} />
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
