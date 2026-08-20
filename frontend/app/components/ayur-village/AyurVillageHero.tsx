import Image from "next/image";
import Link from "next/link";
import { AyurVillageIcon } from "./AyurVillageIcon";
import { getImageDisplayUrl } from "@/app/services/api";

const ayurVillageHeroFeatures = [
  { icon: "lotus", title: "Authentic Gramam Setting", text: "Serene village environment dedicated to classical healing.", image: getImageDisplayUrl("/uploads/resort_room1.webp") },
  { icon: "leaf", title: "Sattvic Nutrition", text: "Fresh organic meals prepared strictly according to Vaidya recommendations.", image: getImageDisplayUrl("/uploads/ayur_nutri.webp") },
];

export function AyurVillageHero() {
  return (
    <section className="ayur-village-hero">
      <Image
        className="ayur-village-hero-bg"
        src={getImageDisplayUrl("/uploads/banner_welcome.webp")}
        alt="Traditional Kerala Ayurveda Gramam cottages surrounded by greenery"
        fill
        priority
        unoptimized
        sizes="100vw"
      />
      <div className="ayur-village-hero-copy">
        <h1>Susrutha Ayurveda Gramam</h1>
        <p>Traditional Kerala cottages with private treatment suites — just 20 km from Trivandrum International Airport.</p>
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
                unoptimized
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
