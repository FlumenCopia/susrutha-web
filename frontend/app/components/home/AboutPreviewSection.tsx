import Image from "next/image";
import Link from "next/link";

const aboutFeatures = [
  ["leaf", "Authentic Ayurveda", "Ancient wisdom, clinically validated treatments."],
  ["care", "Personalized Care", "Tailored treatment plans for every individual."],
  ["bowl", "Holistic Healing", "Healing the mind, body and soul together."],
  ["shield", "Safe & Natural", "100% natural therapies with no side effects."],
  ["doctor", "Compassionate Experts", "Experienced doctors who care for you."],
];

export function AboutPreviewSection() {
  return (
    <section className="about-susrutha-section" id="about-susrutha">
      <div className="about-susrutha-top">
        <div className="about-susrutha-copy">
          <span className="about-susrutha-eyebrow">
            <i aria-hidden="true" />
            About Susrutha
          </span>

          <h2>
            Your Wellness,
            <br />
            Our <em>Ancient Expertise</em>
          </h2>

          <div className="about-susrutha-divider" aria-hidden="true">
            <span />
            <i />
            <span />
          </div>

          <p>
            At Susrutha Ayurvedic Hospital, we blend timeless Ayurvedic wisdom with personalized
            care to restore balance, promote healing, and enhance your well-being naturally.
          </p>

          <div className="about-susrutha-actions">
            <Link className="about-susrutha-link" href="/about-us">
              Know More About Us
              <span aria-hidden="true">&rarr;</span>
            </Link>
            <Link className="about-susrutha-icon-link" href="/about-us" aria-label="Know more about Susrutha">
              &rarr;
            </Link>
          </div>
        </div>

        <div className="about-susrutha-image-wrap">
          <div className="about-susrutha-image">
            <Image
              src="/images/about-susrutha-wellness.png"
              alt="Warm Ayurvedic wellness courtyard at Susrutha"
              fill
              sizes="(max-width: 900px) 100vw, 52vw"
              priority={false}
            />
          </div>
        </div>
      </div>

      <div className="about-susrutha-botanical" aria-hidden="true" />

      <div className="about-susrutha-values">
        <div className="about-values-heading">
          <h3>Rooted in Tradition. Focused on You.</h3>
          <div aria-hidden="true">
            <span />
            <i />
            <span />
          </div>
        </div>

        <div className="about-values-grid">
          {aboutFeatures.map(([icon, title, copy]) => (
            <article className="about-value-card" data-icon={icon} key={title}>
              <span aria-hidden="true" />
              <h4>{title}</h4>
              <p>{copy}</p>
              <i aria-hidden="true" />
            </article>
          ))}
        </div>

        <div className="about-values-still" aria-hidden="true">
          <Image src="/images/home-hero-reference.png" alt="" fill sizes="360px" />
        </div>
      </div>
    </section>
  );
}
