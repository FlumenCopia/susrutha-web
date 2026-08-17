import Link from "next/link";
import { BranchIcon } from "./BranchIcons";

export function BranchesHero() {
  return (
    <section className="conditions-hero-serene" aria-labelledby="branches-title">
      <div
        className="conditions-hero-serene-bg"
        style={{ backgroundImage: `url('/images/ayurveda-hospital-garden.webp')` }}
      />
      <div className="conditions-hero-serene-overlay" />

      <div className="conditions-hero-serene-content">
        <div className="conditions-hero-serene-middle-wrapper">
          <div className="conditions-hero-serene-middle">
            <p className="conditions-hero-serene-quote">
              Two premier Ayurvedic healing destinations across Thiruvananthapuram — full inpatient hospital infrastructure at Kattakada and city outpatient wellness convenience at Kowdiar.
            </p>
          </div>

          <div className="conditions-hero-serene-right-stats" aria-label="Branches overview statistics">
            <div className="conditions-hero-stat-card">
              <BranchIcon name="building" />
              <div className="conditions-hero-stat-info">
                <strong>2</strong>
                <span>Premier Locations</span>
              </div>
            </div>
            <div className="conditions-hero-stat-card">
              <BranchIcon name="calendar" />
              <div className="conditions-hero-stat-info">
                <strong>24/7</strong>
                <span>Inpatient Care</span>
              </div>
            </div>
            <div className="conditions-hero-stat-card">
              <BranchIcon name="leaf" />
              <div className="conditions-hero-stat-info">
                <strong>100%</strong>
                <span>Authentic Ayurveda</span>
              </div>
            </div>
          </div>
        </div>

        <div className="conditions-hero-serene-bottom">
          <h1 id="branches-title" className="conditions-hero-serene-title">
            OUR BRANCHES &amp; CLINICS
          </h1>
        </div>
      </div>
    </section>
  );
}
