import Link from "next/link";

export function BlogHero() {
  return (
    <section className="conditions-hero-serene" aria-labelledby="blog-title">
      <div
        className="conditions-hero-serene-bg"
        style={{ backgroundImage: `url('/images/banner_holistic_health.jpg')` }}
      />
      <div className="conditions-hero-serene-overlay" />

      <div className="conditions-hero-serene-content">
        {/* <nav className="conditions-hero-serene-nav" aria-label="Breadcrumb">
          <Link href="/">Home</Link>
          <span>/</span>
          <span>Blogs &amp; Articles</span>
        </nav> */}

        <div className="conditions-hero-serene-middle">
          <p className="conditions-hero-serene-quote">
            Ideas for a more balanced way to live, heal, and think. Clinical insights, hospital journeys, and classical Ayurvedic wisdom.
          </p>
        </div>

        <div className="conditions-hero-serene-bottom">
          <h1 id="blog-title" className="conditions-hero-serene-title">
            Blogs &amp; Insights
          </h1>
        </div>
      </div>
    </section>
  );
}
