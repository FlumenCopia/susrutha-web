import Image from "next/image";
import Link from "next/link";
import { AyurVillageIcon } from "./AyurVillageIcon";

const ayurVillageHeroFeatures = [
  { icon: "lotus", title: "Authentic Gramam Setting", text: "Serene village environment dedicated to classical healing.", image: "/images/village_feature_nature.jpg" },
  { icon: "leaf", title: "Sattvic Nutrition", text: "Fresh organic meals prepared strictly according to Vaidya recommendations.", image: "/images/about-purpose-mission-bowl.webp" },
];

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
        style={{ objectFit: "cover", objectPosition: "center" }}
      />
      <div className="ayur-village-hero-copy">
        <h1 className="ayur-village-hero-title" style={{ color: "#ffffff", textShadow: "0 3px 16px rgba(0, 0, 0, 0.85)" }}>
          Susrutha Ayurveda Gramam
        </h1>
        <p style={{ color: "rgba(255, 255, 255, 0.95)", textShadow: "0 2px 10px rgba(0, 0, 0, 0.85)" }}>
          Traditional Kerala cottages with private treatment suites — just 20 km from Trivandrum International Airport.
        </p>
        <Link className="ayur-village-button ayur-village-button-light" href="/appointment?package=rejuvenation-package&type=PACKAGE_BOOKING">
          Enquire for a Gramam Stay
          <AyurVillageIcon name="arrow" />
        </Link>
      </div>

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
            <h2 className="ayur-village-feature-title" style={{ color: "#ffffff", textShadow: "0 2px 8px rgba(0,0,0,0.8)" }}>
              {feature.title}
            </h2>
          </article>
        ))}
      </div>
    </section>
  );
}
