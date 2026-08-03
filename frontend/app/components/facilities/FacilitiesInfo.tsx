import Link from "next/link";
import { facilityFaqs, facilityHeroStats } from "./facilitiesData";
import { FacilitiesIcon } from "./FacilitiesIcon";

export function FacilitiesInfo() {
  return (
    <section className="facilities-info">
      <article className="facilities-faq-card">
        <span className="facilities-eyebrow">Frequently Asked Questions</span>
        <div>
          {facilityFaqs.map((question) => (
            <details key={question}>
              <summary>
                {question}
                <span aria-hidden="true">+</span>
              </summary>
              <p>The team can guide you based on room availability, treatment duration, and branch options.</p>
            </details>
          ))}
        </div>
        <Link href="/faq">
          View all FAQs
          <FacilitiesIcon name="arrow" />
        </Link>
      </article>

      <article className="facilities-trust-card">
        <span className="facilities-eyebrow">Patient-Ready Care Environment</span>
        <h2>Facilities pages help patients understand the care environment.</h2>
        <p>Patients can review the setting before they book a consultation or inpatient programme.</p>
        <div>
          {facilityHeroStats.map((stat) => (
            <span key={stat.label}>
              <FacilitiesIcon name={stat.icon} />
              <strong>{stat.value}</strong>
              {stat.label}
            </span>
          ))}
        </div>
      </article>
    </section>
  );
}
