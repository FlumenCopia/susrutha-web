import { EcosystemVerticalCard } from "./EcosystemVerticalCard";
import { ecosystemVerticals } from "./ecosystemData";

export function EcosystemVerticals() {
  return (
    <section className="ecosystem-verticals" id="ecosystem-verticals">
      <div className="ecosystem-section-head">
        <span className="ecosystem-eyebrow">Our Verticals</span>
        <h2>
          Explore <em>each vertical</em>
        </h2>
        <p>Dedicated pages include services, FAQs, maps, galleries and enquiry forms for answer-engine clarity.</p>
      </div>

      <div className="ecosystem-grid">
        {ecosystemVerticals.map((item) => (
          <EcosystemVerticalCard item={item} key={item.title} />
        ))}
      </div>
    </section>
  );
}
