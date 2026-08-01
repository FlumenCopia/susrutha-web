import Link from "next/link";

const heroFeatures = [
  ["Authentic Ayurveda", "Rooted in tradition, guided by science."],
  ["Expert Practitioners", "Experienced doctors for holistic healing."],
  ["Personalized Care", "Tailored treatments for you."],
  ["Natural & Safe", "100% natural therapies with lasting results."],
  ["Holistic Wellness", "Healing mind, body and soul together."],
];

export function HeroBanner() {
  return (
    <section className="hero-section">
      <div className="hero-inner">
        <div className="hero-content">
          <h1>
            Ancient Wisdom.
            <br />
            <span>Modern Healing.</span>
            <br />
            Timeless Wellness.
          </h1>
          <div className="hero-title-divider" aria-hidden="true">
            <i />
            <span />
          </div>
          <p>
            Experience the perfect blend of ancient Ayurvedic wisdom and modern care for a healthier, balanced life.
          </p>
          <div className="hero-actions">
            <Link className="btn btn-primary" href="/appointment">
              Book Appointment
            </Link>
            <Link className="hero-explore-link" href="/treatments">
              Explore Treatments
              <span aria-hidden="true">&rsaquo;</span>
            </Link>
          </div>
        </div>

        <div className="hero-visual" aria-hidden="true">
          <span className="hero-botanical-line" />
          <span className="hero-glow-ring" />
          <span className="hero-still-life" />
          <div className="hero-quick-actions">
            <span>
              <i />
              Free Consultation
            </span>
            <span>
              <i />
              360 Virtual Tour
            </span>
          </div>
        </div>
      </div>

      <div className="hero-feature-strip" aria-label="Susrutha Ayurveda highlights">
        {heroFeatures.map(([title, text]) => (
          <div className="hero-feature" key={title}>
            <span className="hero-feature-icon" aria-hidden="true" />
            <div>
              <strong>{title}</strong>
              <p>{text}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
