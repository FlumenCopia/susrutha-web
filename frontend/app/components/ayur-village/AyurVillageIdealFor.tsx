import Image from "next/image";
import { AyurVillageIcon } from "./AyurVillageIcon";
import { ayurVillageIdealFor } from "./ayurVillageData";

export function AyurVillageIdealFor() {
  return (
    <section className="ayur-village-ideal">
      <Image
        src="/images/about-purpose-still-life.webp"
        alt="Ayurvedic therapy vessels and herbs"
        fill
        sizes="100vw"
      />
      <div className="ayur-village-ideal-head">
        <span className="ayur-village-eyebrow">Ideal For</span>
        <h2>
          Who Thrives at the <em>Gramam</em>
        </h2>
        <p>
          Tailored Ayurvedic sanctuary experiences for those seeking deep healing, total privacy, and ultimate rejuvenation.
        </p>
      </div>

      <div className="ayur-village-ideal-grid">
        {ayurVillageIdealFor.map((item) => (
          <article key={item.title} className="ayur-village-ideal-card">
            <div className="ayur-village-ideal-top-bar" aria-hidden="true" />
            <div className="ayur-village-ideal-card-header">
              <div className="ayur-village-ideal-icon">
                <AyurVillageIcon name={item.icon} />
              </div>
              <span className="ayur-village-ideal-tag">{item.tag}</span>
            </div>
            <h3>{item.title}</h3>
            <p>{item.desc}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
