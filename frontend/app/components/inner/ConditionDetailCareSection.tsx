import Image from "next/image";
import Link from "next/link";
import type { ConditionDetail } from "../../data/conditions";

type ConditionDetailCareSectionProps = {
  condition: ConditionDetail;
};

const careSeekers = [
  "Desk and IT professionals with occupational strain",
  "People with chronic degenerative joint or spine complaints",
  "Patients seeking non-surgical supportive care pathways",
  "Those recovering from flare-ups needing structured rehab",
];

const relevantDoctors = [
  {
    name: "Dr. Krishnakumar K.",
    credential: "BAMS, MD (Ayurveda)",
    image: "/images/doctor-portrait.webp",
  },
  {
    name: "Dr. M. K. Saidhaharan",
    credential: "BAMS, MD (Ayurveda)",
    image: "/images/doctor-rahul-kumar.webp",
  },
];

const relatedPackages = [
  "Low Back Pain Care",
  "Neck Pain Care",
  "7-Day Ayurveda Care",
  "15-Day Ayurveda Care",
  "Takly (Occupational Disorder Care)",
];

const featureItems = [
  { label: "Natural", icon: "leaf" },
  { label: "Holistic Approach", icon: "lotus" },
  { label: "Safe & Side-effect Free", icon: "shield" },
  { label: "Sustainable Results", icon: "person" },
];

const symptoms = [
  "Persistent neck or low-back stiffness",
  "Radiating pain to arms or legs",
  "Joint crepitus, swelling or reduced range",
  "Postural fatigue in desk professionals",
  "Sleep disruption due to musculoskeletal pain",
];

function CareIcon({ name }: { name: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      {name === "person" ? (
        <>
          <path d="M12 11a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z" />
          <path d="M5 20a7 7 0 0 1 14 0" />
        </>
      ) : name === "stethoscope" ? (
        <>
          <path d="M6 4v5a4 4 0 0 0 8 0V4" />
          <path d="M14 9v3a4 4 0 0 0 8 0v-1" />
          <path d="M20 10a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" />
        </>
      ) : name === "home" ? (
        <>
          <path d="M4 11.5 12 5l8 6.5" />
          <path d="M6.5 10.5V19h11v-8.5" />
          <path d="M10 19v-5h4v5" />
        </>
      ) : name === "shield" ? (
        <>
          <path d="M12 3 19 6v5c0 4.5-2.8 8-7 10-4.2-2-7-5.5-7-10V6l7-3Z" />
          <path d="m9 12 2 2 4-5" />
        </>
      ) : name === "lotus" ? (
        <>
          <path d="M12 19c-4-3.5-4.5-8.2 0-14 4.5 5.8 4 10.5 0 14Z" />
          <path d="M12 19c-5 .2-8.5-2.3-10-7 5.5-.8 9 1.5 10 7Z" />
          <path d="M12 19c5 .2 8.5-2.3 10-7-5.5-.8-9 1.5-10 7Z" />
        </>
      ) : (
        <>
          <path d="M12 21C7 17 6 11 12 3c6 8 5 14 0 18Z" />
          <path d="M12 21c-5 0-8-3-10-8 6-1 10 2 10 8Z" />
          <path d="M12 21c5 0 8-3 10-8-6-1-10 2-10 8Z" />
        </>
      )}
    </svg>
  );
}

export function ConditionDetailCareSection({ condition }: ConditionDetailCareSectionProps) {
  return (
    <section className="condition-care-section" aria-labelledby="condition-care-title">
      <div className="condition-care-top-grid">
        <article className="condition-care-mini-card condition-care-glance-card">
          <CareIcon name="leaf" />
          <h2>At a Glance</h2>
          <p>
            Susrutha Ayurveda treats neck, back and joint problems through Ayurvedic assessment, local therapies,
            Panchakarma where indicated, and physiotherapy support for posture- and lifestyle-related degeneration.
          </p>
          <i aria-hidden="true" />
          <p>
            Medically reviewed by <em>{condition.reviewer}</em>
          </p>
        </article>

        <article className="condition-care-mini-card">
          <CareIcon name="person" />
          <h2>Who Often Seeks Care</h2>
          <ul className="condition-care-list">
            {careSeekers.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>

        <article className="condition-care-mini-card condition-care-doctor-card">
          <CareIcon name="stethoscope" />
          <h2>Relevant Doctors</h2>
          {relevantDoctors.map((doctor) => (
            <div className="condition-care-doctor" key={doctor.name}>
              <Image src={doctor.image} alt="" width={52} height={52} />
              <div>
                <strong>{doctor.name}</strong>
                <span>{doctor.credential}</span>
              </div>
            </div>
          ))}
        </article>

        <article className="condition-care-mini-card">
          <CareIcon name="home" />
          <h2>Related Packages</h2>
          <ul className="condition-package-list">
            {relatedPackages.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>

        <article className="condition-care-consult-card">
          <span>Need help getting started?</span>
          <i aria-hidden="true" />
          <p>Our care team is here to understand and guide you on the right path.</p>
          <Link href="/appointment">Request Consultation &rarr;</Link>
        </article>
      </div>

      <div className="condition-care-main-grid">
        <div className="condition-care-copy">
          <article className="condition-care-block">
            <div className="condition-care-heading">
              <CareIcon name="leaf" />
              <h2 id="condition-care-title">Overview</h2>
            </div>
            <p>
              Chronic neck pain, low-back pain and joint stiffness are among the most common reasons patients seek
              Kerala Ayurveda. At Susrutha, care begins with understanding whether the picture is Vata-dominant
              degeneration, inflammatory aggravation, occupational strain or post-injury residue, then matching therapies
              accordingly.
            </p>
          </article>

          <article className="condition-care-block">
            <div className="condition-care-heading">
              <CareIcon name="leaf" />
              <h2>Ayurvedic Understanding</h2>
            </div>
            <p>
              Ayurveda often frames these conditions through Vata imbalance affecting Asthi (bone), Maja
              (marrow/nervous tissue) and Sandhi (joints), frequently worsened by irregular routine, excess sitting,
              cold exposure and depleted tissues. Treatment aims to reduce Ama where present, nourish depleted
              structures, and restore movement without aggressive force.
            </p>
          </article>

          <article className="condition-care-block">
            <div className="condition-care-heading">
              <CareIcon name="leaf" />
              <h2>Symptoms Often Discussed</h2>
            </div>
            <div className="condition-symptom-list">
              {symptoms.map((symptom, index) => (
                <span key={symptom}>
                  <CareIcon name={index % 2 === 0 ? "person" : "leaf"} />
                  {symptom}
                </span>
              ))}
            </div>
          </article>
        </div>

        <aside className="condition-care-image-card" aria-label={`${condition.title} care highlight`}>
          <Image src="/images/doctors-ayurveda-mortar-hero.webp" alt="" fill sizes="(max-width: 900px) 100vw, 420px" />
          <div className="condition-care-image-overlay">
            <b aria-hidden="true">&ldquo;</b>
            <h2>Healing that addresses the root, not just the symptoms.</h2>
            <div>
              {featureItems.map((item) => (
                <span key={item.label}>
                  <CareIcon name={item.icon} />
                  {item.label}
                </span>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}
