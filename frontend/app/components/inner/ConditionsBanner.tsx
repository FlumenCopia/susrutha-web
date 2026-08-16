import Link from "next/link";

export function ConditionsBanner() {
  return (
    <section className="conditions-hero-serene" aria-labelledby="conditions-title">
      <div
        className="conditions-hero-serene-bg"
        style={{ backgroundImage: `url('/images/banner_conditions_serene.jpg')` }}
      />
      <div className="conditions-hero-serene-overlay" />

      <div className="conditions-hero-serene-content">
        {/* <nav className="conditions-hero-serene-nav" aria-label="Breadcrumb">
          <Link href="/">Home</Link>
          <span>/</span>
          <span>Conditions</span>
        </nav> */}

        <div className="conditions-hero-serene-middle">
          <p className="conditions-hero-serene-quote">
            Ayurvedic care for every condition. Personalized treatments to restore balance, revive health and enhance your well-being.
          </p>
        </div>

        <div className="conditions-hero-serene-bottom">
          <h1 id="conditions-title" className="conditions-hero-serene-title">
            CONDITIONS WE TREAT
          </h1>
        </div>
      </div>
    </section>
  );
}
