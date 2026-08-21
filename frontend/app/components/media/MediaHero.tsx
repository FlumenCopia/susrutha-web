import Link from "next/link";

export function MediaHero() {
  return (
    <section className="conditions-hero-serene" aria-labelledby="media-title">
      <div
        className="conditions-hero-serene-bg"
        style={{ backgroundImage: `url('/images/about-hero-ayurveda-still-life.webp')` }}
      />
      <div className="conditions-hero-serene-overlay" />

      <div className="conditions-hero-serene-content">
        {/* <nav className="conditions-hero-serene-nav" aria-label="Breadcrumb">
          <Link href="/">HOME</Link>
          <span>/</span>
          <span>MEDIA & GALLERY</span>
        </nav> */}

        <div className="conditions-hero-serene-middle-wrapper">
          <div className="conditions-hero-serene-middle">
            <p className="conditions-hero-serene-quote">
              Stories from our Ayurveda hospital, care spaces, and healing traditions — explore videos, photos, press notes, and events in a calm visual archive.
            </p>
          </div>

          <div className="conditions-hero-serene-right-stats" aria-label="Media quick facts">
            <div className="conditions-hero-stat-card">
              <div className="conditions-hero-stat-info">
                <strong>1986</strong>
                <span>Legacy</span>
              </div>
            </div>
            <div className="conditions-hero-stat-card">
              <div className="conditions-hero-stat-info">
                <strong>100+</strong>
                <span>Media Stories</span>
              </div>
            </div>
            <div className="conditions-hero-stat-card">
              <div className="conditions-hero-stat-info">
                <strong>Kerala</strong>
                <span>Tradition</span>
              </div>
            </div>
          </div>
        </div>

        <div className="conditions-hero-serene-bottom">
          <h1 id="media-title" className="conditions-hero-serene-title">
            Media &amp; Gallery
          </h1>
        </div>
      </div>
    </section>
  );
}
