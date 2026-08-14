import Image from "next/image";
import Link from "next/link";
import { PackagesIcon } from "./PackagesIcon";
import { packageHeroFeatures } from "./packagesData";

export function PackagesHero() {
  return (
    <section className="packages-hero">
      <Image
        className="packages-hero-bg"
        src="/images/about-purpose-still-life.webp"
        alt="Ayurvedic herbs, brass vessels, and therapy ingredients"
        fill
        priority
        sizes="100vw"
      />
      <div className="packages-hero-copy">
        <span className="packages-eyebrow">Packages</span>
        <h1>Twelve structured care programmes</h1>
        <p>
          From occupational Tekky care to 16-day hospital programmes and specialty ano-rectal pathways. Prices on
          enquiry - plans remain clinical.
        </p>
        <Link className="packages-button packages-button-light" href="/appointment">
          Enquire about a package
          <PackagesIcon name="arrow" />
        </Link>
      </div>
{/* 
      <aside className="packages-hero-note">
        <PackagesIcon name="lotus" />
        <strong>Rooted in tradition. Focused on your healing.</strong>
        <span aria-hidden="true" />
      </aside> */}

      <div className="packages-hero-features">
        {packageHeroFeatures.map((feature) => (
          <article key={feature.title}>
            <span>
              <PackagesIcon name={feature.icon} />
            </span>
            <div>
              <h2>{feature.title}</h2>
              <p>{feature.text}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
