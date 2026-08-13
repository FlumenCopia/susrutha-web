import Image from "next/image";
import Link from "next/link";

const treatmentCategories = [
  { label: "All Treatments", icon: "apps", active: true },
  { label: "Panchakarma", icon: "shower" },
  { label: "Detox & Cleansing", icon: "eco" },
  { label: "Women's Health", icon: "female" },
  { label: "Pain Management", icon: "healing" },
  { label: "Wellness", icon: "spa" },
  { label: "Lifestyle Disorders", icon: "vital_signs" },
];

export function TreatmentsBannerSection() {
  return (
    <section className="treatment-reference-page" aria-labelledby="treatment-reference-title">
      <div className="treatment-reference-hero">
        <div className="treatment-hero-copy">
          <nav className="treatment-breadcrumb" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span aria-hidden="true">&rsaquo;</span>
            <span>Treatments</span>
          </nav>

          <h1 id="treatment-reference-title">
            <span className="treatment-title-line">Ancient Wisdom.</span>
            <span className="treatment-title-line">
              <em>Healing</em> for Today.
            </span>
          </h1>

          <p>
            Explore our authentic Ayurvedic therapies crafted to detoxify,
            rejuvenate and restore balance to your body, mind and soul.
          </p>

          <Link className="treatment-hero-cta" href="#treatment-categories">
            Explore Treatments
            <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>

        <div className="treatment-hero-visual" aria-hidden="true">
          <Image
            src="/images/treatment-sirodhara.webp"
            alt=""
            fill
            priority
            sizes="(max-width: 900px) 100vw, 58vw"
          />
        </div>
      </div>

      <div className="treatment-category-shell" id="treatment-categories">
        <div className="treatment-category-track" role="list" aria-label="Treatment categories">
          {treatmentCategories.map((category) => (
            <button
              className="treatment-category-pill"
              data-active={category.active ? "true" : undefined}
              type="button"
              role="listitem"
              key={category.label}
            >
              <span className="treatment-category-icon" aria-hidden="true">
                <span className="material-symbols-outlined">{category.icon}</span>
              </span>
              {category.label}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
