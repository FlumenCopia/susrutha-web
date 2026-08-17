import Image from "next/image";
import Link from "next/link";
import { PackagesIcon } from "./PackagesIcon";

const packageCtaBenefits = [
  { icon: "lotus", title: "Personalized Assessment" },
  { icon: "leaf", title: "Holistic Recovery Plan" },
  { icon: "sprout", title: "Inpatient & Outpatient Options" },
];

export function PackagesCTA() {
  return (
    <section className="packages-cta">
      <Image src="/images/treatment-herbal-medicine.webp" alt="Ayurvedic herbs and mortar" fill sizes="100vw" />
      <div className="packages-cta-copy">
        <h2>Not sure which package is right for you?</h2>
        <p>Our experts will guide you to the most suitable care plan.</p>
      </div>

      <div className="packages-cta-benefits">
        {packageCtaBenefits.map((benefit) => (
          <article key={benefit.title}>
            <PackagesIcon name={benefit.icon} />
            <h3>{benefit.title}</h3>
          </article>
        ))}
      </div>

      <Link className="packages-button packages-button-light" href="/appointment">
        Talk to our experts
        <PackagesIcon name="arrow" />
      </Link>
    </section>
  );
}
