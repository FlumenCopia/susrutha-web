import Link from "next/link";

const facilityHeroStats: Array<{ value: string; label: string }> = [
  { value: "2", label: "Specialty Hospitals" },
  { value: "100%", label: "Physician Supervised" },
  { value: "24/7", label: "Nursing & Emergency Care" },
];

export function FacilitiesHero() {
  return (
    <section className="conditions-hero-serene" aria-labelledby="facilities-title">
      <div
        className="conditions-hero-serene-bg"
        style={{ backgroundImage: `url('/images/ayurveda-hospital-garden.webp')` }}
      />
      <div className="conditions-hero-serene-overlay" />

      <div className="conditions-hero-serene-content">
        {/* <nav className="conditions-hero-serene-nav" aria-label="Breadcrumb">
          <Link href="/">HOME</Link>
          <span>/</span>
          <span>FACILITIES</span>
        </nav> */}

        <div className="conditions-hero-serene-middle-wrapper">
          <div className="conditions-hero-serene-middle">
            <p className="conditions-hero-serene-quote">
              Treatment rooms, inpatient spaces, yoga, physiotherapy, pharmacy, and patient amenities designed for classical Kerala healing and absolute comfort.
            </p>
          </div>

          <div className="conditions-hero-serene-right-stats" aria-label="Facilities quick facts">
            {facilityHeroStats.map((stat) => (
              <div key={stat.label} className="conditions-hero-stat-card">
                <div className="conditions-hero-stat-info">
                  <strong>{stat.value}</strong>
                  <span>{stat.label}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="conditions-hero-serene-bottom">
          <h1 id="facilities-title" className="conditions-hero-serene-title">
            Facilities
          </h1>
        </div>
      </div>
    </section>
  );
}
