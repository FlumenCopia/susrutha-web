import Link from "next/link";
import { specialities } from "../../data/site";
import { SectionHeader } from "../common/SectionHeader";

export function SpecialitiesSection() {
  return (
    <section className="section" id="specialities">
      <SectionHeader
        eyebrow="Specialities"
        title="Care pathways organized by patient need"
        copy="The redesigned site should make treatments easier to understand by grouping them around conditions, outcomes, and doctor-led consultation."
      />
      <div className="card-grid">
        {specialities.map((item) => (
          <article className="service-card" key={item}>
            <span className="card-mark" />
            <h3>{item}</h3>
            <p>Clear condition-specific content, doctor guidance, therapy options, and appointment CTA.</p>
            <Link href="/treatments">Read more</Link>
          </article>
        ))}
      </div>
    </section>
  );
}
