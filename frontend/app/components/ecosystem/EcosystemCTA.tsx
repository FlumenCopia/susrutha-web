import Image from "next/image";
import Link from "next/link";
import { EcosystemIcon, type EcosystemIconName } from "./EcosystemIcon";

const ecosystemValues: Array<{ icon: EcosystemIconName; title: string }> = [
  { icon: "building", title: "Clinical Excellence" },
  { icon: "leaf", title: "Organic Botanical Formulations" },
  { icon: "school", title: "Research & Vaidya Education" },
];

export function EcosystemCTA() {
  return (
    <section className="ecosystem-cta">
      <Image src="/images/treatment-herbal-medicine.webp" alt="Ayurvedic herbs and mortar" fill sizes="100vw" />
      <div className="ecosystem-cta-copy">
        <h2>
          One vision.
          <br />
          <em>Many verticals.</em>
        </h2>
        <p>All working together for holistic health and well-being.</p>
      </div>

      <div className="ecosystem-values">
        {ecosystemValues.map((item) => (
          <article key={item.title}>
            <EcosystemIcon name={item.icon} />
            <h3>{item.title}</h3>
          </article>
        ))}
      </div>

      <aside className="ecosystem-question-card">
        <h2>Have questions about our ecosystem?</h2>
        <p>Our team is here to guide you.</p>
        <Link href="/contact-us">
          Talk to our team
          <EcosystemIcon name="headset" />
        </Link>
      </aside>
    </section>
  );
}
