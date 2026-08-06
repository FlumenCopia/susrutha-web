import Image from "next/image";
import Link from "next/link";
import { EcosystemIcon } from "./EcosystemIcon";
import { ecosystemHighlights } from "./ecosystemData";

export function EcosystemHero() {
  return (
    <section className="ecosystem-hero">
      <div className="ecosystem-hero-orbit" aria-hidden="true" />
      
      <div className="ecosystem-hero-copy">
        <span className="ecosystem-eyebrow">
          <span className="ecosystem-eyebrow-dot" aria-hidden="true" />
          Ecosystem
        </span>
        <h1>
          Verticals beyond <em>a single hospital door</em>
        </h1>
        <p>
          Pharma, diagnostics, nursing education, charitable work, corporate structure and remote consultation - each
          with its own page.
        </p>
        <Link className="ecosystem-button" href="#ecosystem-verticals">
          Explore our ecosystem
          <EcosystemIcon name="arrow" />
        </Link>
        <div className="ecosystem-hero-mini-stats" aria-label="Ecosystem quick facts">
          <span>
            <strong>6</strong>
            Verticals
          </span>
          <span>
            <strong>30 km</strong>
            Home reach
          </span>
          <span>
            <strong>24x7</strong>
            Care mindset
          </span>
        </div>
      </div>

      <div className="ecosystem-hero-visual">
        <div className="ecosystem-visual-backdrop" aria-hidden="true" />

        {/* Main luxury arch image frame */}
        <div className="ecosystem-main-image-frame">
          <Image
            src="/images/about-susrutha-wellness.webp"
            alt="Authentic Ayurvedic wellness courtyard at Susrutha Hospital"
            fill
            priority
            sizes="(max-width: 900px) 100vw, 50vw"
            className="ecosystem-img-primary"
          />
          <div className="ecosystem-image-overlay" />
        </div>

        {/* Secondary floating thumbnail card */}
        <div className="ecosystem-secondary-thumb">
          <Image
            src="/images/treatment-panchakarma.webp"
            alt="Panchakarma Ayurvedic therapy"
            fill
            sizes="160px"
            className="ecosystem-img-secondary"
          />
          <span className="ecosystem-thumb-badge">
            <EcosystemIcon name="leaf" />
            Pure Healing
          </span>
        </div>

        {/* Top heritage floating badge */}
        <div className="ecosystem-top-badge">
          <span className="ecosystem-badge-dot" aria-hidden="true" />
          50+ Years Legacy of Care
        </div>

        {/* Floating Integrated Care seal */}
        <span className="ecosystem-hero-seal">
          <EcosystemIcon name="integrated" />
          Integrated Care
        </span>

        {/* Floating philosophy info card */}
        <div className="ecosystem-hero-floating-card">
          <span className="ecosystem-card-icon-wrap">
            <EcosystemIcon name="shield" />
          </span>
          <div>
            <h4>Clinical Synergy</h4>
            <p>Clinical verticals working together with one care philosophy.</p>
          </div>
        </div>
      </div>

      <div className="ecosystem-hero-highlights">
        {ecosystemHighlights.map((item) => (
          <article key={item.title}>
            <span>
              <EcosystemIcon name={item.icon} />
            </span>
            <div>
              <h2>{item.title}</h2>
              <p>{item.text}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

