import Image from "next/image";
import { AyurVillageIcon } from "./AyurVillageIcon";
import { ayurVillageGallery, ayurVillageStats } from "./ayurVillageData";

const galleryImageSizes = "(max-width: 900px) 50vw, 24vw";

export function AyurVillageGallery() {
  return (
    <section className="ayur-village-gallery-section">
      <div className="ayur-village-gallery-head">
        <span className="ayur-village-eyebrow">The Setting</span>
        <h2>Rooted in nature, designed for healing</h2>
        <p>Pair Ayur Village privacy with hospital clinical oversight. Package duration and therapy mix are physician-directed.</p>
      </div>

      <div className="ayur-village-gallery">
        {ayurVillageGallery.map((item) => (
          <article key={item.image}>
            <Image src={item.image} alt={item.alt} fill sizes={galleryImageSizes} />
          </article>
        ))}
      </div>
{/* 
      <div className="ayur-village-stats">
        {ayurVillageStats.map((stat) => (
          <article key={stat.label}>
            <div className="ayur-village-thumb-icon">
              <Image
                src={stat.image}
                alt={stat.label}
                width={48}
                height={48}
                style={{ objectFit: "cover", width: "100%", height: "100%", borderRadius: "50%" }}
              />
            </div>
            <div>
              <strong>{stat.value}</strong>
              <p>{stat.label}</p>
            </div>
          </article>
        ))}
      </div> */}
    </section>
  );
}
