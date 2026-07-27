import Image from "next/image";
import Link from "next/link";

const aboutValues = [
  ["compassion", "Compassion", "We care with empathy and understanding."],
  ["integrity", "Integrity", "Honest practices you can trust."],
  ["excellence", "Excellence", "Committed to the highest standard of care."],
  ["sustainability", "Sustainability", "Healing today for a healthier tomorrow."],
  ["holistic", "Holistic Approach", "Mind, body and spirit in perfect balance."],
];

function AboutValueIcon({ icon }: { icon: string }) {
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true" focusable="false">
      {icon === "compassion" ? (
        <>
          <path d="M20 33V20c0-4 5-4 5 0v12" />
          <path d="M44 33V20c0-4-5-4-5 0v12" />
          <path d="M22 31l-5-6c-3-3-7 1-4 5l9 12v10h8" />
          <path d="M42 31l5-6c3-3 7 1 4 5l-9 12v10h-8" />
          <path d="M32 24c-6-8-17 2 0 13 17-11 6-21 0-13z" />
        </>
      ) : null}
      {icon === "integrity" ? (
        <>
          <path d="M32 8c8 7 18 6 18 6v16c0 13-9 21-18 26-9-5-18-13-18-26V14s10 1 18-6z" />
          <path d="M22 32l7 7 15-16" />
        </>
      ) : null}
      {icon === "excellence" ? (
        <>
          <path d="M32 12l5 12 13 1-10 9 3 13-11-7-11 7 3-13-10-9 13-1 5-12z" />
          <path d="M26 52h12" />
        </>
      ) : null}
      {icon === "sustainability" ? (
        <>
          <path d="M18 42c18 0 28-10 29-28-18 1-28 11-28 29" />
          <path d="M18 42c8-10 16-17 29-28" />
          <path d="M23 34c-9-1-15 5-16 14 10 1 17-3 20-12" />
        </>
      ) : null}
      {icon === "holistic" ? (
        <>
          <path d="M32 9c10 10 12 21 0 34-12-13-10-24 0-34z" />
          <path d="M32 18c-12-3-22 4-23 17 13 2 22-4 23-17z" />
          <path d="M32 18c12-3 22 4 23 17-13 2-22-4-23-17z" />
          <path d="M18 49h28" />
        </>
      ) : null}
      {icon === "leaf" ? (
        <>
          <path d="M18 44c18 0 29-11 30-30-19 1-30 12-30 30z" />
          <path d="M18 44c9-11 17-19 30-30" />
          <path d="M23 36l-11 11" />
        </>
      ) : null}
    </svg>
  );
}

export function AboutHeroSection() {
  return (
    <section className="about-premium-hero">
      <div className="about-premium-hero-main">
        <div className="about-premium-hero-copy">
          <span>
            <i aria-hidden="true" />
            <AboutValueIcon icon="leaf" />
            About Us
            <i aria-hidden="true" />
          </span>
          <h1>
            Ancient Wisdom.
            <br />
            Timeless <em>Care</em>
          </h1>
          <div className="about-premium-hero-divider" aria-hidden="true">
            <b />
            <i />
            <b />
          </div>
          <p>
            At Susrutha Ayurvedic Hospital, we blend the timeless science of Ayurveda with personalized care to help you
            live a healthier, balanced life.
          </p>
          <Link href="#legacy">
            Our Story
            <span aria-hidden="true" />
          </Link>
        </div>
        <div className="about-premium-hero-image">
          <div className="about-premium-hero-botanical" aria-hidden="true" />
          <div className="about-premium-hero-badge" aria-hidden="true">
            <AboutValueIcon icon="leaf" />
          </div>
          <Image
            src="/images/home-hero-reference.png"
            alt="Ayurvedic herbs with marble mortar and brass vessels"
            width={1536}
            height={864}
            priority
          />
        </div>
      </div>

      <div className="about-premium-hero-values">
        {aboutValues.map(([icon, title, copy]) => (
          <article className="about-premium-hero-value" key={title}>
            <span>
              <AboutValueIcon icon={icon} />
            </span>
            <h3>{title}</h3>
            <i aria-hidden="true" />
            <p>{copy}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
