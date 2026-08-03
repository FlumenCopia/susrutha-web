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
      <div>
        <span className="ayur-village-eyebrow">Ideal For</span>
        <h2>
          Who thrives at the <em>Gramam</em>
        </h2>
      </div>
      <div className="ayur-village-ideal-grid">
        {ayurVillageIdealFor.map((item) => (
          <article key={item.title}>
            <AyurVillageIcon name={item.icon} />
            <h3>{item.title}</h3>
          </article>
        ))}
      </div>
    </section>
  );
}
