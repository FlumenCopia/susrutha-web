import Image from "next/image";
import { AyurVillageIcon } from "./AyurVillageIcon";

const ayurVillageIdealFor = [
  { icon: "lotus", title: "Long-term Panchakarma Detox Patients", image: "/images/treatment-panchakarma.webp" },
  { icon: "leaf", title: "Post-illness Convalescence & Rejuvenation", image: "/images/ayurveda-village-path.webp" },
  { icon: "lotus", title: "Stress Recovery & Mindful Relaxation", image: "/images/hero-courtyard-ayurveda-v2.webp" },
];

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
