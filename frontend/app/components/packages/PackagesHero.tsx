import Image from "next/image";
import Link from "next/link";
import { UserCheck, Leaf, Hospital, ArrowRight } from "lucide-react";

const packageHeroFeatures = [
  {
    icon: <UserCheck size={22} strokeWidth={1.75} />,
    title: "Authentic Vaidya Care",
    text: "Physician-supervised Panchakarma therapies.",
  },
  {
    icon: <Leaf size={22} strokeWidth={1.75} />,
    title: "Pure Herbal Formulations",
    text: "Prepared from organic herbs sourced directly.",
  },
  {
    icon: <Hospital size={22} strokeWidth={1.75} />,
    title: "Specialty Hospital Stay",
    text: "Comfortable inpatient suites with Sattvic diet.",
  },
];

export function PackagesHero() {
  return (
    <section className="packages-hero">
      <Image
        className="packages-hero-bg"
        src="/images/about-purpose-still-life.webp"
        alt="Ayurvedic herbs, brass vessels, and therapy ingredients"
        fill
        priority
        unoptimized
        sizes="100vw"
      />
      <div className="packages-hero-copy">
        <h1 style={{ color: "#ffffff", textShadow: "0 3px 18px rgba(0, 0, 0, 0.85)" }}>
          Structured Care Programmes
        </h1>
        <p style={{ color: "rgba(255, 255, 255, 0.95)", textShadow: "0 2px 10px rgba(0, 0, 0, 0.85)" }}>
          From intensive inpatient hospital programmes to restorative wellness and specialty rejuvenation pathways.
        </p>
        <Link className="packages-button packages-button-light" href="/appointment">
          Enquire About a Package
          <ArrowRight size={16} strokeWidth={1.75} />
        </Link>
      </div>

      <div className="packages-hero-features">
        {packageHeroFeatures.map((feature) => (
          <article key={feature.title}>
            <span>
              {feature.icon}
            </span>
            <div>
              <h2 style={{ color: "#ffffff", textShadow: "0 2px 8px rgba(0, 0, 0, 0.85)" }}>{feature.title}</h2>
              <p style={{ color: "rgba(255, 255, 255, 0.9)" }}>{feature.text}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
