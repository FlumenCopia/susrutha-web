import Image from "next/image";
import Link from "next/link";
import { EcosystemIcon } from "./EcosystemIcon";
import { ecosystemHighlights } from "./ecosystemData";

export function EcosystemHero() {
  return (
    <section className="ecosystem-hero">
      <div className="ecosystem-hero-orbit" aria-hidden="true" />
      <div className="ecosystem-hero-copy">
        <span className="ecosystem-eyebrow">Ecosystem</span>
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
        <Image
          src="/images/about-purpose-still-life.webp"
          alt="Ayurvedic mortar, herbs, oil, and therapy bundle"
          fill
          priority
          sizes="(max-width: 900px) 100vw, 50vw"
        />
        <span className="ecosystem-hero-seal">
          <EcosystemIcon name="integrated" />
          Integrated Care
        </span>
        <div className="ecosystem-hero-floating-card">
          <EcosystemIcon name="shield" />
          <p>Clinical verticals working together with one care philosophy.</p>
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
