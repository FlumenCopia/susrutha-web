import { internationalFaqsList, internationalStats } from "./internationalPatientsData";
import { InternationalPatientsIcon } from "./InternationalPatientsIcon";
import { InternationalStatCard } from "./InternationalStatCard";

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
