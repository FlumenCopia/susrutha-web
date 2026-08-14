import Link from "next/link";

export function FooterCta() {
  return (
    <section className="blog-premium-footer-cta-fluid" aria-labelledby="blog-footer-cta-title">
      <div
        className="blog-premium-footer-cta-bg"
        style={{ backgroundImage: `url('/images/banner_calm_retreat.jpg')` }}
      />
      <div className="blog-premium-footer-cta-overlay" />

      <div className="blog-premium-footer-cta-content">
        <span className="blog-premium-footer-cta-eyebrow">
          HEALING &amp; TRANQUILITY
        </span>
        <h2 id="blog-footer-cta-title" className="blog-premium-footer-cta-heading">
          A MOMENT OF CALM BEGINS HERE
        </h2>
        <p className="blog-premium-footer-cta-desc">
          Experience restorative Panchakarma, personalized physician guidance, and timeless Ayurvedic healing tailored for your well-being.
        </p>
        <div className="blog-premium-footer-cta-actions">
          <Link href="/appointment" className="blog-premium-footer-cta-btn">
            Book Consultation Now
          </Link>
        </div>
      </div>
    </section>
  );
}
