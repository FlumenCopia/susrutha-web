import Image from "next/image";
import Link from "next/link";

const stats = [
  {
    value: "25+",
    label: "Years of Experience",
    icon: "leaf",
  },
  {
    value: "50K+",
    label: "Happy Patients",
    icon: "people",
  },
  {
    value: "20+",
    label: "Specialised Treatments",
    icon: "lotus",
  },
  {
    value: "10+",
    label: "Expert Doctors",
    icon: "doctor",
  },
];

function AboutIcon({ icon }: { icon: string }) {
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true" focusable="false">
      {icon === "leaf" ? (
        <>
          <path d="M12 32c15 0 23-8 24-23-15 1-24 9-24 24Z" />
          <path d="M12 32c7-9 13-15 24-23" />
          <path d="M16 28C9 27 5 32 4 39c8 1 14-2 17-9" />
        </>
      ) : null}
      {icon === "people" ? (
        <>
          <circle cx="24" cy="15" r="5" />
          <circle cx="12" cy="18" r="4" />
          <circle cx="36" cy="18" r="4" />
          <path d="M16 36c1-8 4-13 8-13s7 5 8 13" />
          <path d="M5 36c1-6 4-10 8-10 2 0 4 1 5 3" />
          <path d="M43 36c-1-6-4-10-8-10-2 0-4 1-5 3" />
        </>
      ) : null}
      {icon === "lotus" ? (
        <>
          <path d="M24 37c-9-7-10-16 0-28 10 12 9 21 0 28Z" />
          <path d="M23 37C12 35 6 28 6 17c11 2 18 9 17 20Z" />
          <path d="M25 37c11-2 17-9 17-20-11 2-18 9-17 20Z" />
          <path d="M24 37c-8 1-14-2-19-9 9-2 15 1 19 9Z" />
          <path d="M24 37c8 1 14-2 19-9-9-2-15 1-19 9Z" />
        </>
      ) : null}
      {icon === "doctor" ? (
        <>
          <circle cx="24" cy="14" r="6" />
          <path d="M12 42V30c0-6 5-10 12-10s12 4 12 10v12" />
          <path d="M18 25l6 8 6-8" />
          <path d="M24 33v7" />
          <path d="M20 37h8" />
        </>
      ) : null}
    </svg>
  );
}

export function HomeAboutFeatureSection() {
  return (
    <section className="home-about-feature-section" id="about-susrutha">
      <div className="home-about-feature-image-wrap">
        <div className="home-about-feature-outline" aria-hidden="true" />
        <div className="home-about-feature-image">
          <Image
            src="/images/about-susrutha-wellness.png"
            alt="Traditional Ayurvedic wellness courtyard at Susrutha"
            fill
            sizes="(max-width: 980px) 100vw, 46vw"
          />
        </div>
        <div className="home-about-feature-badge" aria-label="25 plus years of excellence">
          <strong>25+</strong>
          <span>
            Years of
            <br />
            Excellence
          </span>
          <i aria-hidden="true" />
        </div>
      </div>

      <div className="home-about-feature-content">
        <span className="home-about-feature-eyebrow">
          <i aria-hidden="true" />
          About Susrutha
        </span>

        <h2>
          Your Wellness,
          <br />
          Our <em>Ancient</em> Expertise
        </h2>

        <div className="home-about-feature-divider" aria-hidden="true">
          <span />
          <i />
          <span />
        </div>

        <p>
          At Susrutha Ayurvedic Hospital, we blend timeless Ayurvedic wisdom with personalised
          care to restore balance, promote healing, and enhance your well-being naturally.
        </p>

        <div className="home-about-feature-stats" aria-label="Susrutha care highlights">
          {stats.map((stat) => (
            <article key={stat.label}>
              <AboutIcon icon={stat.icon} />
              <strong>{stat.value}</strong>
              <span>{stat.label}</span>
            </article>
          ))}
        </div>

        <Link className="home-about-feature-link" href="/about-us">
          Know More About Us
          <span aria-hidden="true">&rarr;</span>
        </Link>
      </div>

      <div className="home-about-feature-botanical" aria-hidden="true" />
      <div className="home-about-feature-mortar" aria-hidden="true" />
    </section>
  );
}
