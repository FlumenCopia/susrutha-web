import Image from "next/image";
import Link from "next/link";
import { UserCheck, Activity, Hospital, ArrowRight } from "lucide-react";

const packageCtaBenefits = [
  { icon: <UserCheck size={24} strokeWidth={1.75} />, title: "Personalized Assessment" },
  { icon: <Activity size={24} strokeWidth={1.75} />, title: "Holistic Recovery Plan" },
  { icon: <Hospital size={24} strokeWidth={1.75} />, title: "Inpatient & Outpatient Options" },
];

export function PackagesCTA() {
  return (
    <section className="packages-cta">
      <Image src="/images/treatment-herbal-medicine.webp" alt="Ayurvedic herbs and mortar" fill sizes="100vw" />
      <div className="packages-cta-copy">
        <h2>Not Sure Which Package Is Right for You?</h2>
        <p>Our experts will guide you to the most suitable care plan.</p>
      </div>

      <div className="packages-cta-benefits">
        {packageCtaBenefits.map((benefit) => (
          <article key={benefit.title}>
            <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
              {benefit.icon}
            </span>
            <h3>{benefit.title}</h3>
          </article>
        ))}
      </div>

      <Link className="packages-button packages-button-light" href="/appointment">
        Talk to Our Experts
        <ArrowRight size={16} strokeWidth={1.75} />
      </Link>
    </section>
  );
}
