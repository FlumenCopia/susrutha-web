import Image from "next/image";
import Link from "next/link";
import { internationalHeroFeatures, internationalStats } from "./internationalPatientsData";
import { InternationalPatientsIcon } from "./InternationalPatientsIcon";
import { InternationalStatCard } from "./InternationalStatCard";

export function InternationalHero() {
  return (
    <section className="international-hero">
      <div className="international-leaf-trace" aria-hidden="true" />
      <div className="international-flight-line" aria-hidden="true">
        <InternationalPatientsIcon name="plane" />
      </div>

      <div className="international-hero-copy">
        <span className="international-eyebrow">International Patients</span>
        <h1>
          Rooted in wisdom.
          <em>Caring beyond borders.</em>
        </h1>
        <p>
          At Susrutha Ayurveda Gramam, we combine ancient healing traditions with modern care to offer a personalised
          and seamless experience for patients from around the world.
        </p>

        <div className="international-hero-features">
          {internationalHeroFeatures.map((item) => (
            <article key={item.title}>
              <span>
                <InternationalPatientsIcon name={item.icon} />
              </span>
              <h2>{item.title}</h2>
            </article>
          ))}
        </div>

        <Link className="international-button" href="#international-enquiry">
          Enquire for your journey
          <span>
            <InternationalPatientsIcon name="plane" />
          </span>
        </Link>
      </div>

      <div className="international-hero-visual">
        <Image
          src="/images/ayurveda-village-path.webp"
          alt="Traditional Kerala Ayurveda Gramam cottages in a peaceful garden"
          fill
          priority
          sizes="(max-width: 900px) 100vw, 58vw"
        />
        <div className="international-stat-stack" aria-label="International patient statistics">
          {internationalStats.map((item) => (
            <InternationalStatCard icon={item.icon} value={item.value} label={item.label} key={item.label} />
          ))}
        </div>
      </div>
    </section>
  );
}
