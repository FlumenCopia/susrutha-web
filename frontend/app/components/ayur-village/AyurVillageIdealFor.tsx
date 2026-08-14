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
        {/* <span className="ayur-village-eyebrow">Ideal For</span> */}
        <h2>
          Who thrives at the <em>Gramam</em>
        </h2>
      </div>
      <div className="ayur-village-ideal-grid">
        {ayurVillageIdealFor.map((item) => (
          <article key={item.title}>
            <div className="ayur-village-thumb-icon">
              <Image
                src={item.image}
                alt={item.title}
                width={52}
                height={52}
                style={{ objectFit: "cover", width: "100%", height: "100%", borderRadius: "50%" }}
              />
            </div>
            <h3>{item.title}</h3>
          </article>
        ))}
      </div>
    </section>
  );
}
