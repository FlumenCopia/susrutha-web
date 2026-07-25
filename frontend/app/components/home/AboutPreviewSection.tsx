import Image from "next/image";
import Link from "next/link";

const aboutStats = [
  ["25+", "Years of Experience"],
  ["50K+", "Happy Patients"],
  ["20+", "Specialised Treatments"],
  ["10+", "Expert Doctors"],
];

export function AboutPreviewSection() {
  return (
    <section className="about-susrutha-section" id="about-susrutha">
      <div className="about-susrutha-image-wrap">
        <div className="about-susrutha-image">
          <Image
            src="/images/about-susrutha-wellness.png"
            alt="Warm Ayurvedic wellness courtyard at Susrutha"
            fill
            sizes="(max-width: 900px) 100vw, 46vw"
            priority={false}
          />
        </div>

        <div className="about-experience-card" aria-label="25 plus years of excellence">
          <strong>25+</strong>
          <span>
            Years of
            <br />
            Excellence
          </span>
          <i aria-hidden="true" />
        </div>
      </div>

      <div className="about-susrutha-copy">
        <span className="about-susrutha-eyebrow">
          <i aria-hidden="true" />
          About Susrutha
        </span>

        <h2>
          Your Wellness,
          <br />
          Our Ancient Expertise
        </h2>

        <p>
          At Susrutha Ayurvedic Hospital, we blend timeless Ayurvedic wisdom with personalised
          care to restore balance, promote healing, and enhance your well-being naturally.
        </p>

        <div className="about-susrutha-stats" aria-label="Susrutha highlights">
          {aboutStats.map(([value, label]) => (
            <div key={label}>
              <strong>{value}</strong>
              <span>{label}</span>
            </div>
          ))}
        </div>

        <Link className="about-susrutha-link" href="/about-us">
          Know More About Us
          <span aria-hidden="true">&rarr;</span>
        </Link>
      </div>

      <div className="about-susrutha-botanical" aria-hidden="true" />
    </section>
  );
}
