import Image from "next/image";
import { AyurVillageIcon } from "./AyurVillageIcon";
import { getImageDisplayUrl } from "@/app/services/api";

const ayurVillageIdealFor = [
  { icon: "lotus", title: "Long-term Panchakarma Detox Patients", image: getImageDisplayUrl("/uploads/treatment-panchakarma.webp") },
  { icon: "leaf", title: "Post-illness Convalescence & Rejuvenation", image: getImageDisplayUrl("/uploads/resort_room1.webp") },
  { icon: "lotus", title: "Stress Recovery & Mindful Relaxation", image: getImageDisplayUrl("/uploads/facility_yoga.webp") },
];

export function AyurVillageIdealFor() {
  return (
    <section className="ayur-village-ideal">
      <Image
        src={getImageDisplayUrl("/uploads/pub_asotra.webp")}
        alt="Ayurvedic therapy vessels and serene retreat"
        fill
        unoptimized
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
                unoptimized
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
