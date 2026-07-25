import Image from "next/image";
import Link from "next/link";

const wellnessPrograms = [
  "Stress Management",
  "Detox & Rejuvenation",
  "Weight Management",
  "Women's Wellness",
  "Lifestyle & Longevity",
];

export function AyurvedaVillageSection() {
  return (
    <section className="ayurveda-village-section" aria-labelledby="ayurveda-village-title">
      <div className="village-copy-panel">
        <span className="village-eyebrow">Ayurveda Village Experience</span>
        <h2 id="ayurveda-village-title">
          A serene environment designed for healing, reflection and renewal.
        </h2>
        <p>Experience the perfect blend of nature, tradition and personalized care.</p>
        <Link className="village-link" href="/branches/ayurveda-village">
          Explore Ayurveda Village
          <span aria-hidden="true">&rarr;</span>
        </Link>
      </div>

      <div className="village-image-panel">
        <Image
          src="/images/ayurveda-village-path.png"
          alt="Ayurveda village pathway with traditional cottages"
          fill
          sizes="(max-width: 800px) 100vw, 34vw"
        />
      </div>

      <div className="village-program-panel">
        <span className="village-program-eyebrow">Wellness Programs</span>
        <h3>Curated programs for every stage of life.</h3>
        <ul>
          {wellnessPrograms.map((program) => (
            <li key={program}>{program}</li>
          ))}
        </ul>
        <Link className="village-program-link" href="/treatments">
          View All Programs
          <span aria-hidden="true">&rarr;</span>
        </Link>
      </div>
    </section>
  );
}
