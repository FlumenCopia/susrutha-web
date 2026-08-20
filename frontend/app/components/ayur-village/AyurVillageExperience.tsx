import Image from "next/image";
import { AyurVillageIcon } from "./AyurVillageIcon";
import { getImageDisplayUrl } from "@/app/services/api";

const ayurVillageExperienceCards = [
  { icon: "lotus", title: "Private Treatment Suites", text: "Traditional wooden droni and herbal steam facilities.", image: getImageDisplayUrl("/uploads/facility_fac.webp") },
  { icon: "leaf", title: "Organic Sattvic Meals", text: "Freshly prepared meals matched to your body constitution.", image: getImageDisplayUrl("/uploads/ayur_nutri.webp") },
];

const experienceImageSizes = "(max-width: 900px) 100vw, 46vw";

export function AyurVillageExperience() {
  return (
    <section className="ayur-village-experience">
      <div className="ayur-village-video-card">
        <Image
          src={getImageDisplayUrl("/uploads/resort_room2.webp")}
          alt="Ayurveda Gramam garden path and traditional cottage"
          fill
          unoptimized
          sizes={experienceImageSizes}
        />
        <button type="button" aria-label="Play Ayurveda Village experience video">
          <AyurVillageIcon name="play" />
        </button>
        <strong>Experience Ayur Village</strong>
      </div>

      <div className="ayur-village-experience-copy">
        <h2>An experience of privacy, not performance</h2>
        <p>
          Four traditional Kerala cottages with private treatment rooms — a quiet healing retreat for rejuvenation
          programmes, international guests, and those seeking privacy beyond the hospital ward.
        </p>
        <div className="ayur-village-feature-grid">
          {ayurVillageExperienceCards.map((card) => (
            <article key={card.title}>
              <div className="ayur-village-thumb-icon">
                <Image
                  src={card.image}
                  alt={card.title}
                  width={48}
                  height={48}
                  unoptimized
                  style={{ objectFit: "cover", width: "100%", height: "100%", borderRadius: "50%" }}
                />
              </div>
              <h3>{card.title}</h3>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
