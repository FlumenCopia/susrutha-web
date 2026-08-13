import Link from "next/link";
import "./about-hero.css";

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
          <path d="M18 42c18 0 29-11 30-30-19 1-30 12-30 30z" />
          <path d="M18 42c9-11 17-19 30-30" />
          <path d="M23 36l-11 11" />
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
  const imageSrc = "/images/about-susrutha-wellness.webp";

  return (
    <section className="about-hero-fullbleed">
      {/* Background Media Container - Image Only */}
      <div className="about-hero-media-wrapper">
        <img
          src={imageSrc}
          alt="Susrutha Ayurveda Hospital Wellness Care"
          className="about-hero-img active"
        />
      </div>

      {/* Dark Translucent Gradient Overlay */}
      <div className="about-hero-overlay-dark" />

      {/* Hero Main Content Container */}
      <div className="about-hero-content-container">


        <h1 className="about-hero-giant-heading">
          HEALING FOR
          <br />
          BODY &amp; SOUL
        </h1>

        <p className="about-hero-description">
          Multidisciplinary Ayurvedic &amp; Panchakarma excellence creating bespoke healing, rehabilitative, and wellness care for every individual.
        </p>


      </div>

      {/* Floating Bottom Glass Values Bar */}
      <div className="about-hero-values-floating">
        {aboutValues.map(([icon, title, copy]) => (
          <article className="about-hero-value-card" key={title}>
            <span className="about-hero-value-icon">
              <AboutValueIcon icon={icon} />
            </span>
            <div className="about-hero-value-text">
              <h3>{title}</h3>
              <p>{copy}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
