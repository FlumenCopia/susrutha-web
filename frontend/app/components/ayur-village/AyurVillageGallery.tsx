import Image from "next/image";
import { AyurVillageIcon } from "./AyurVillageIcon";

const ayurVillageGallery = [
  { image: "/images/village_feature_heritage.jpg", alt: "Ayurveda Gramam garden pathway and heritage cottage" },
  { image: "/images/village_feature_nature.jpg", alt: "Traditional cottage inpatient deluxe suite" },
  { image: "/images/village_feature_treatment.jpg", alt: "Private Panchakarma treatment suite" },
  { image: "/images/banner_calm_retreat.jpg", alt: "Open air meditation & Yoga pavilion" },
];

const galleryImageSizes = "(max-width: 900px) 50vw, 24vw";

export function AyurVillageGallery() {
  return (
    <section className="ayur-village-gallery-section">
      <div className="ayur-village-gallery-head">
        <h2>Rooted in nature, designed for healing</h2>
        <p>Pair Ayur Village privacy with hospital clinical oversight. Package duration and therapy mix are physician-directed.</p>
      </div>

      <div className="ayur-village-gallery" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "20px" }}>
        {ayurVillageGallery.map((item) => (
          <article key={item.image} style={{ position: "relative", height: "260px", borderRadius: "20px", overflow: "hidden" }}>
            <Image src={item.image} alt={item.alt} fill sizes={galleryImageSizes} style={{ objectFit: "cover" }} />
          </article>
        ))}
      </div>
    </section>
  );
}
