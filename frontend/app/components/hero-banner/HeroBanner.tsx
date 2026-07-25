import Link from "next/link";

export function HeroBanner() {
  return (
    <section className="hero-section">
      <div className="hero-content">
        <span className="eyebrow">Healing the body. Calming the mind.</span>
        <h1>
          The Science of
          <br />
          <span className="hero-title-line">
            Authentic <span>Ayurveda</span>
          </span>
        </h1>
        <p>
          Rooted in tradition. Backed by research.
          <br />
          Tailored for your wellness and longevity.
        </p>
        <div className="hero-actions">
          <Link className="btn btn-primary" href="/appointment">
            Book A Consultation
          </Link>
          <Link className="hero-video-link" href="/gallery">
            <span aria-hidden="true" />
            Watch Our Story
          </Link>
        </div>
      </div>
    </section>
  );
}
