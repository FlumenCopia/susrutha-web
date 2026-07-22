import Link from "next/link";

export function HeroBanner() {
  return (
    <section className="hero-section">
      <div className="hero-content">
        <span className="eyebrow">Healing the body. Calming the mind.</span>
        <h1>
          The Science of Authentic <span>Ayurveda</span>
        </h1>
        <p>
          Rooted in tradition, backed by research, and guided by experienced doctors for
          recovery, balance, and lifelong wellness.
        </p>
        <div className="hero-actions">
          <Link className="btn btn-primary" href="/appointment">
            Book Consultation
          </Link>
          <Link className="hero-video-link" href="/gallery">
            <span aria-hidden="true">Play</span>
            Watch Video
          </Link>
        </div>
        <div className="hero-patients" aria-label="Patient trust">
          <div className="avatar-stack" aria-hidden="true">
            <span />
            <span />
            <span />
            <span />
          </div>
          <p>
            <strong>50,000+</strong>
            Happy & Healthy Patients
          </p>
        </div>
      </div>

      <div className="hero-social" aria-label="Social links">
        <a href="#" aria-label="Facebook">f</a>
        <a href="#" aria-label="Instagram">ig</a>
        <a href="#" aria-label="YouTube">yt</a>
      </div>

      <div className="hero-card" aria-label="Hospital trust highlight">
        <span className="laurel" aria-hidden="true">(</span>
        <div>
          <strong>36+</strong>
          <p>Years of trust, care & excellence</p>
          <small>Since 1987</small>
        </div>
        <span className="laurel" aria-hidden="true">)</span>
      </div>
    </section>
  );
}
