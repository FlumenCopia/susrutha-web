import Image from "next/image";
import Link from "next/link";
import { AyurVillageIcon } from "./AyurVillageIcon";
import { ayurVillageHeroFeatures } from "./ayurVillageData";

export function AyurVillageHero() {
  return (
    <section className="ayur-village-hero">
      <Image
        className="ayur-village-hero-bg"
        src="/images/ayurveda-village-path.webp"
        alt="Traditional Kerala Ayurveda Gramam cottages surrounded by greenery"
        fill
        priority
        sizes="100vw"
      />
      <div className="ayur-village-hero-copy">
        {/* <span className="ayur-village-eyebrow">Ayur Village</span> */}
        <h1>Susrutha Ayurveda Gramam</h1>
        <p>A traditional Kerala cottage with private treatment rooms - just 20 km from Trivandrum International Airport.</p>
        <Link className="ayur-village-button ayur-village-button-light" href="/appointment">
          Enquire for a stay
          <AyurVillageIcon name="arrow" />
        </Link>
      </div>
{/* 
      <div className="ayur-village-quote-card">
        <span>Healing Rooted in Tradition</span>
        <i aria-hidden="true">&ldquo;</i>
      </div> */}

      <div className="ayur-village-hero-features">
        {ayurVillageHeroFeatures.map((feature) => (
          <article key={feature.title}>
            <div className="ayur-village-thumb-icon">
              <Image
                src={feature.image}
                alt={feature.title}
                width={48}
                height={48}
                style={{ objectFit: "cover", width: "100%", height: "100%", borderRadius: "50%" }}
              />
            </div>
            <h2>{feature.title}</h2>
          </article>
        ))}
      </div>
    </section>
  );
}
