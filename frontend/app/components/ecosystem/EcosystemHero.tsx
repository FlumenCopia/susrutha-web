import Link from "next/link";
import { EcosystemIcon } from "./EcosystemIcon";

export function EcosystemHero() {
  return (
    <section className="conditions-hero-serene" aria-labelledby="ecosystem-title">
      <div
        className="conditions-hero-serene-bg"
        style={{ backgroundImage: `url('/images/hero-courtyard-ayurveda-v2.webp')` }}
      />
      <div className="conditions-hero-serene-overlay" />

      <div className="conditions-hero-serene-content">
        <nav className="conditions-hero-serene-nav" aria-label="Breadcrumb">
          <Link href="/">HOME</Link>
          <span>/</span>
          <span>ECOSYSTEM</span>
        </nav>

        <div className="conditions-hero-serene-middle-wrapper">
          <div className="conditions-hero-serene-middle">
            <p className="conditions-hero-serene-quote">
              Pharma, diagnostics, nursing education, charitable work, corporate structure and remote consultation — clinical verticals working together with one care philosophy.
            </p>
          </div>

          <div className="conditions-hero-serene-right-stats" aria-label="Ecosystem quick facts">
            <div className="conditions-hero-stat-card">
              <EcosystemIcon name="integrated" />
              <div className="conditions-hero-stat-info">
                <strong>6</strong>
                <span>Verticals</span>
              </div>
            </div>
            <div className="conditions-hero-stat-card">
              <EcosystemIcon name="home" />
              <div className="conditions-hero-stat-info">
                <strong>30 km</strong>
                <span>Home reach</span>
              </div>
            </div>
            <div className="conditions-hero-stat-card">
              <EcosystemIcon name="leaf" />
              <div className="conditions-hero-stat-info">
                <strong>24x7</strong>
                <span>Care mindset</span>
              </div>
            </div>
          </div>
        </div>

        <div className="conditions-hero-serene-bottom">
          <h1 id="ecosystem-title" className="conditions-hero-serene-title">
            ECOSYSTEM
          </h1>
        </div>
      </div>
    </section>
  );
}
