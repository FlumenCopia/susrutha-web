import Image from "next/image";
import { InternationalPatientsIcon, type InternationalPatientsIconName } from "./InternationalPatientsIcon";

const internationalReasons: Array<{ icon: InternationalPatientsIconName; title: string }> = [
  { icon: "lotus", title: "Authentic Vaidya Supervision" },
  { icon: "globe", title: "Dedicated International Desk" },
  { icon: "plane", title: "Airport Transfers & Accommodation" },
];

export function InternationalCarePromise() {
  return (
    <section className="international-promise">
      <div className="international-promise-copy">
        <span className="international-eyebrow">Why Choose Susrutha</span>
        <h2>
          A sense of place.
          <br />
          A promise of care.
        </h2>
      </div>

      <div className="international-reason-list">
        {internationalReasons.map((reason) => (
          <article key={reason.title}>
            <InternationalPatientsIcon name={reason.icon} />
            <h3>{reason.title}</h3>
          </article>
        ))}
      </div>

      <div className="international-promise-visual">
        <Image src="/images/treatment-herbal-medicine.webp" alt="Ayurvedic mortar and herbs" fill sizes="280px" />
      </div>
    </section>
  );
}
