import Image from "next/image";
import { AyurVillageIcon } from "./AyurVillageIcon";
import { ayurVillageExperienceCards } from "./ayurVillageData";

const experienceImageSizes = "(max-width: 900px) 100vw, 46vw";

export function AyurVillageExperience() {
  return (
    <section className="ayur-village-experience">
      <div className="ayur-village-video-card">
        <Image
          src="/images/legacy-verandah.webp"
          alt="Ayurveda Gramam garden path and traditional cottage"
          fill
          sizes={experienceImageSizes}
        />
        <button type="button" aria-label="Play Ayurveda Village experience video">
          <AyurVillageIcon name="play" />
        </button>
        <strong>Experience Ayur Village</strong>
      </div>

      <div className="ayur-village-experience-copy">
        <span className="ayur-village-eyebrow">A Place That Heals</span>
        <h2>An experience of privacy, not performance</h2>
        <p>
          Four traditional Kerala cottages with private treatment rooms - a quiet healing retreat for rejuvenation
          programmes, international guests, and those seeking privacy beyond the hospital ward.
        </p>
        <div className="ayur-village-feature-grid">
          {ayurVillageExperienceCards.map((card) => (
            <article key={card.title}>
              <AyurVillageIcon name={card.icon} />
              <h3>{card.title}</h3>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
