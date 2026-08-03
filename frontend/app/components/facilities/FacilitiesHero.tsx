import Image from "next/image";
import Link from "next/link";
import { facilityHeroStats } from "./facilitiesData";
import { FacilitiesIcon } from "./FacilitiesIcon";

export function FacilitiesHero() {
  return (
    <section className="facilities-hero">
      <div className="facilities-hero-copy">
        <span className="facilities-eyebrow">Facilities</span>
        <h1>
          Hospital facilities.
          <em>Care made comfortable.</em>
        </h1>
        <p>Treatment rooms, inpatient spaces, yoga, physiotherapy, pharmacy, and patient amenities.</p>
        <div className="facilities-hero-badges">
          {["Panchakarma Rooms", "Inpatient Rooms", "Physiotherapy Unit", "Yoga Hall"].map((item) => (
            <span key={item}>
              <FacilitiesIcon name="shield" />
              {item}
            </span>
          ))}
        </div>
        <Link className="facilities-button" href="/contact-us">
          Ask about facilities
          <FacilitiesIcon name="arrow" />
        </Link>
      </div>

      <div className="facilities-hero-visual">
        <Image
          src="/images/ayurveda-hospital-garden.webp"
          alt="Susrutha Ayurveda hospital garden and care environment"
          fill
          priority
          sizes="(max-width: 900px) 100vw, 58vw"
        />
        <div className="facilities-stat-stack">
          {facilityHeroStats.map((stat) => (
            <article key={stat.label}>
              <FacilitiesIcon name={stat.icon} />
              <strong>{stat.value}</strong>
              <span>{stat.label}</span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
