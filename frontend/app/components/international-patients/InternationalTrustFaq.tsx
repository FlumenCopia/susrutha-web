import { InternationalPatientsIcon, type InternationalPatientsIconName } from "./InternationalPatientsIcon";
import { InternationalStatCard } from "./InternationalStatCard";

const internationalFaqsList = [
  {
    q: "How do I get a Medical Visa for treatment at Susrutha?",
    a: "Our international patient coordinator will issue an official Medical Visa invitation letter upon reviewing your initial medical history and consultation.",
  },
  {
    q: "Are translators available for non-English speaking patients?",
    a: "Yes, we provide translation assistance for major international languages and full support in English, Malayalam, Hindi, and Tamil.",
  },
];

const internationalStats: Array<{ value: string; label: string; icon: InternationalPatientsIconName }> = [
  { value: "40+", label: "Countries Served", icon: "globe" },
  { value: "20 km", label: "From Trivandrum Airport", icon: "plane" },
  { value: "100%", label: "Physician Supervised", icon: "shield" },
];

export function InternationalTrustFaq() {
  return (
    <section className="international-info-grid">
      <article className="international-faq-card">
        <span className="international-eyebrow">FAQs For International Guests</span>
        <div className="international-faq-list">
          {internationalFaqsList.map((faq) => (
            <details key={faq.q}>
              <summary>
                {faq.q}
                <span aria-hidden="true">+</span>
              </summary>
              <p>{faq.a}</p>
            </details>
          ))}
        </div>
        <a href="/faq">
          View All FAQs
          <InternationalPatientsIcon name="arrow" />
        </a>
      </article>

      <article className="international-world-card">
        <span className="international-eyebrow">Trusted By Patients Worldwide</span>
        <div className="international-map" aria-hidden="true">
          <InternationalPatientsIcon name="plane" />
        </div>
        <div className="international-world-stats">
          {internationalStats.map((item) => (
            <InternationalStatCard icon={item.icon} value={item.value} label={item.label} key={item.label} />
          ))}
        </div>
      </article>
    </section>
  );
}
