import Image from "next/image";
import Link from "next/link";
import type { DoctorDirectoryItem } from "../../data/architecture";

type DoctorProfilePageProps = {
  doctor: DoctorDirectoryItem;
};

type DoctorIconName = "award" | "calendar" | "doctor" | "leaf" | "medicine" | "shield" | "spine" | "target";

const signatureTreatments = [
  { title: "Panchakarma", meta: "Core Hospital Therapy", image: "/images/treatment-panchakarma.webp", icon: "medicine" },
  { title: "Abhyanga", meta: "External Therapy", image: "/images/treatment-herbal-medicine.webp", icon: "leaf" },
  { title: "Kizhi (Herbal Bolus Fomentation)", meta: "External Therapy", image: "/images/treatment-njavarakizhi.webp", icon: "award" },
  { title: "Vasti (Medicated Enema Therapy)", meta: "Panchakarma Procedure", image: "/images/treatment-kati-vasti.webp", icon: "medicine" },
] satisfies { title: string; meta: string; image: string; icon: DoctorIconName }[];

const articleCards = [
  {
    title: "Understanding Panchakarma as Hospital Care",
    category: "Panchakarma",
    meta: "May 12, 2024 - 6 min read",
    image: "/images/about-purpose-still-life.webp",
  },
  {
    title: "Ayurvedic Approach to Chronic Back Pain",
    category: "Spine Care",
    meta: "Apr 28, 2024 - 5 min read",
    image: "/images/treatment-kati-vasti.webp",
  },
  {
    title: "Dinacharya: Daily Routine for Better Health",
    category: "Lifestyle",
    meta: "Apr 10, 2024 - 4 min read",
    image: "/images/treatment-herbal-medicine.webp",
  },
];

const defaultConditions = ["Spine & Joints", "Neuro Rehab", "Rheumatology", "Preventive Care", "General Medicine"];
const journeyStages = [
  { title: "Listen", text: "Symptoms, lifestyle, food habits, sleep, digestion, and medical history are reviewed with care." },
  { title: "Diagnose", text: "The clinical picture is mapped with Ayurvedic assessment and practical treatment priorities." },
  { title: "Treat", text: "Therapies, medicines, diet, and daily routines are planned around the patient condition." },
  { title: "Restore", text: "Progress reviews help refine the plan and support long-term balance after treatment." },
];

function DoctorIcon({ name }: { name: DoctorIconName }) {
  const common = {
    fill: "none",
    stroke: "currentColor",
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    strokeWidth: 1.75,
  };

  return (
    <svg viewBox="0 0 48 48" aria-hidden="true">
      {name === "leaf" ? (
        <>
          <path {...common} d="M24 40V17" />
          <path {...common} d="M24 29C15 29 9 22 8 12c10 0 16 7 16 17Z" />
          <path {...common} d="M24 33c8 0 14-5 16-14-9 0-16 6-16 14Z" />
        </>
      ) : null}
      {name === "calendar" ? (
        <>
          <rect {...common} x="10" y="12" width="28" height="28" rx="4" />
          <path {...common} d="M16 8v8M32 8v8M10 21h28M17 30h5M27 30h5" />
        </>
      ) : null}
      {name === "award" ? (
        <>
          <path {...common} d="M24 8 28 17l10 1-7 7 2 10-9-5-9 5 2-10-7-7 10-1 4-9Z" />
          <path {...common} d="M17 33 14 43l10-5 10 5-3-10" />
        </>
      ) : null}
      {name === "doctor" ? (
        <>
          <circle {...common} cx="24" cy="15" r="7" />
          <path {...common} d="M12 40c2-10 6-15 12-15s10 5 12 15M24 28v10M19 33h10" />
        </>
      ) : null}
      {name === "medicine" ? (
        <>
          <path {...common} d="M13 24h22c-1 10-5 15-11 15s-10-5-11-15Z" />
          <path {...common} d="M18 20 30 8M27 12l7 5M15 24c4 3 14 3 18 0" />
        </>
      ) : null}
      {name === "shield" ? (
        <>
          <path {...common} d="M24 6 38 12v11c0 9-6 16-14 19-8-3-14-10-14-19V12l14-6Z" />
          <path {...common} d="m17 24 5 5 10-11" />
        </>
      ) : null}
      {name === "spine" ? (
        <>
          <path {...common} d="M24 7c-5 4-5 8 0 12-5 4-5 8 0 12-5 3-5 7 0 10" />
          <path {...common} d="M18 10h12M18 20h12M18 30h12M18 39h12" />
        </>
      ) : null}
      {name === "target" ? (
        <>
          <circle {...common} cx="22" cy="26" r="13" />
          <circle {...common} cx="22" cy="26" r="7" />
          <path {...common} d="M22 26 38 10M32 10h6v6" />
        </>
      ) : null}
    </svg>
  );
}

export function DoctorProfilePage({ doctor }: DoctorProfilePageProps) {
  const image = typeof doctor.image === 'string' ? doctor.image : (doctor as any).photoUrl || "/images/doctor-portrait.webp";
  const focusAreas = Array.isArray(doctor.focusAreas)
    ? doctor.focusAreas.map(f => typeof f === 'string' ? f : (f as any).title || String(f))
    : ["Panchakarma hospital protocols", "Chronic musculoskeletal conditions", "Integrative inpatient Ayurveda", "Research-oriented clinical practice"];
  const pillars = Array.isArray(doctor.approach)
    ? doctor.approach.map(a => typeof a === 'string' ? a : String(a)).slice(0, 3)
    : ["Research-driven Ayurveda", "Panchakarma authority", "Classical Ayurveda + modern hospital practice"];
  const languages = Array.isArray(doctor.languages)
    ? doctor.languages.join(", ")
    : typeof doctor.languages === 'string'
    ? doctor.languages
    : "Malayalam, English, Hindi";
  const conditions = Array.isArray(doctor.focusAreas)
    ? [...focusAreas, ...defaultConditions].slice(0, 5)
    : defaultConditions;
  const education = Array.isArray(doctor.credentials)
    ? doctor.credentials.map(c => typeof c === 'string' ? c : String(c))
    : ["BAMS", "MD (Ayurveda)", "Reg. No. 12345/2006", "Certified Panchakarma Practitioner"];

  const rawAvailability = (doctor as any).availability;
  const availabilityText = typeof rawAvailability === 'string'
    ? rawAvailability
    : Array.isArray(rawAvailability)
    ? rawAvailability.map((a: any) => typeof a === 'string' ? a : `${a.days || ''} (${a.timeSlots || ''})`).join(', ')
    : "Kattakada & Kowdiar (On Appointment)";

  return (
    <main className="doctor-detail-page">
      <section className="doctor-detail-hero">
        <div className="doctor-detail-shell">
          <div className="doctor-detail-breadcrumb" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span>/</span>
            <Link href="/doctors">Doctors</Link>
            <span>/</span>
            <Link href={`/doctors/${doctor.slug}`}>{doctor.title || (doctor as any).name}</Link>
          </div>

          <div className="doctor-detail-hero-grid">
          <div className="doctor-detail-copy">
            <span>Ayurvedic Physician</span>
            <h1>{doctor.title || (doctor as any).name}</h1>
            <p className="doctor-detail-meta">{doctor.meta || (doctor as any).qualification}</p>
            <p>{doctor.text || (doctor as any).bio}</p>

              <div className="doctor-detail-stats" aria-label="Doctor highlights">
                <article>
                  <DoctorIcon name="calendar" />
                  <strong>{doctor.experience ?? "18+ Years"}</strong>
                  <span>Years Experience</span>
                </article>
                <article>
                  <DoctorIcon name="doctor" />
                  <strong>{doctor.patients ?? "5000+"}</strong>
                  <span>Patients Treated</span>
                </article>
                <article>
                  <DoctorIcon name="leaf" />
                  <strong>100%</strong>
                  <span>Ayurvedic Care</span>
                </article>
              </div>

              <div className="doctor-detail-actions">
                <Link href={`/appointment?doctor=${encodeURIComponent((doctor as any).slug || (doctor as any)._id || doctor.title)}`}>
                  Book Consultation Slot
                </Link>
                <Link href={`/appointment?doctor=${encodeURIComponent((doctor as any).slug || (doctor as any)._id || doctor.title)}&mode=video`}>
                  Consult Online (Video)
                </Link>
              </div>
          </div>

          <div className="doctor-detail-photo-wrap">
            <div className="doctor-detail-photo">
              <Image src={image} alt={doctor.title || (doctor as any).name || 'Doctor'} fill priority sizes="(max-width: 900px) 92vw, 430px" />
            </div>
            <div className="doctor-detail-photo-note">
              <DoctorIcon name="leaf" />
              <span>Personalized Ayurveda Care</span>
            </div>
          </div>

            <aside className="doctor-detail-glance" aria-label="At a glance">
              <article>
                <DoctorIcon name="award" />
                <div>
                  <span>Specialization</span>
                  <strong>{focusAreas.slice(0, 2).join(" & ")}</strong>
                </div>
              </article>
              <article>
                <DoctorIcon name="medicine" />
                <div>
                  <span>Department</span>
                  <strong>Ayurveda Medicine</strong>
                </div>
              </article>
              <article>
                <DoctorIcon name="doctor" />
                <div>
                  <span>Languages</span>
                  <strong>{languages}</strong>
                </div>
              </article>
              <article>
                <DoctorIcon name="calendar" />
                <div>
                  <span>Availability</span>
                  <strong>{availabilityText}</strong>
                </div>
              </article>
            </aside>
          </div>
        </div>
      </section>

      <section className="doctor-detail-main">
        <div className="doctor-detail-top-row">
          <aside className="doctor-detail-side">
            {["Content pending verification: publications/research", "Content pending verification: awards", "Content pending verification: signature video"].map((item) => (
              <div key={item}>{item}</div>
            ))}
          </aside>

          <section className="doctor-detail-block">
            <h2>Focus Areas & Protocols</h2>
            <div className="doctor-chip-list">
              {focusAreas.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
            <h3>Pillars</h3>
            <ul>
              {pillars.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
        </div>

        <section className="doctor-philosophy-panel">
          <div>
            <span>Philosophy</span>
            <h2>{doctor.quote ?? "Classical Ayurveda becomes powerful when it is personal, clear, and carefully guided."}</h2>
          </div>
          <p>
            Clinical decisions begin with a detailed understanding of constitution, disease stage, lifestyle, digestion,
            and recovery goals. Each plan is shaped to feel practical, supervised, and easy for the patient to follow.
          </p>
        </section>

          <section className="doctor-detail-block">
            <div className="doctor-detail-title-center">
              <span />
            <h2>Signature treatments</h2>
            <span />
          </div>
          <div className="doctor-treatment-grid">
            {signatureTreatments.map((item) => (
              <article key={item.title}>
                <Image src={item.image} alt="" width={78} height={78} aria-hidden="true" />
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.meta}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="doctor-detail-block">
          <div className="doctor-detail-title-center">
            <span />
            <h2>Conditions & pathways led</h2>
            <span />
          </div>
          <div className="doctor-condition-grid">
            {conditions.map((item, index) => (
              <article key={item}>
                <DoctorIcon name={index === 0 ? "spine" : index === 1 ? "target" : "shield"} />
                <span>{item}</span>
              </article>
            ))}
            </div>
          </section>

        <section className="doctor-journey-section">
          <div className="doctor-creative-head">
            <span>Healing Journey</span>
            <h2>A Guided Path from Consultation to Recovery</h2>
            <p>
              The care journey is designed to feel clear, personal, and supervised from the first consultation through
              follow-up.
            </p>
          </div>
          <div className="doctor-journey-grid">
            {journeyStages.map((item, index) => (
              <article key={item.title}>
                <strong>{String(index + 1).padStart(2, "0")}</strong>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="doctor-experience-section">
          <div className="doctor-experience-copy">
            <span>Care Experience</span>
            <h2>What Patients Can Expect</h2>
            <p>
              Consultations are structured for clarity, comfort, and continuity. Each recommendation is explained in
              practical language so patients understand the purpose behind every therapy and lifestyle step.
            </p>
          </div>
          <div className="doctor-experience-grid">
            {[
              ["Personalized Plan", "Treatment is adapted to constitution, concern, age, strength, and recovery goals."],
              ["Therapy Supervision", "Classical therapies are coordinated with review points and clinical guidance."],
              ["Diet & Routine", "Simple food, sleep, activity, and daily rhythm suggestions support lasting results."],
              ["Follow-up Support", "Progress checks help adjust the plan after treatment and during recovery."],
            ].map(([title, text], index) => (
              <article key={title}>
                <DoctorIcon name={index === 0 ? "target" : index === 1 ? "medicine" : index === 2 ? "leaf" : "calendar"} />
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="doctor-articles-faq">
          <article className="doctor-article-panel">
            <div className="doctor-panel-head">
              <h2>Articles by {doctor.title}</h2>
              <Link href="/blogs">View all articles -&gt;</Link>
            </div>
            <div className="doctor-article-grid">
              {articleCards.map((item) => (
                <Link href="/blogs" key={item.title}>
                  <Image src={item.image} alt="" width={220} height={160} aria-hidden="true" />
                  <span>{item.category}</span>
                  <h3>{item.title}</h3>
                  <p>{item.meta}</p>
                </Link>
              ))}
            </div>
          </article>

          <article className="doctor-faq-panel">
            <h2>FAQ</h2>
            {[
              ["How is availability confirmed?", "On appointment. Online requests are confirmed by the hospital team against the live roster before you travel."],
              ["Can I request this doctor for a package stay?", "Yes. Add the doctor preference in the appointment form and the care team will guide availability."],
              ["Do you provide video consultation?", "The team can confirm remote consultation options based on the concern and doctor schedule."],
            ].map(([question, answer]) => (
              <details key={question}>
                <summary>{question}</summary>
                <p>{answer}</p>
              </details>
            ))}
          </article>
        </section>

        <section className="doctor-detail-block doctor-education-block">
          <div className="doctor-detail-title-center">
            <span />
            <h2>Education & Credentials</h2>
            <span />
          </div>
          <div className="doctor-education-grid">
            {education.slice(0, 4).map((item, index) => (
              <article key={item}>
                <DoctorIcon name={index === 0 ? "award" : index === 1 ? "medicine" : index === 2 ? "shield" : "calendar"} />
                <h3>{item}</h3>
                <p>{index === 0 ? "Clinical qualification" : index === 1 ? "Ayurvedic medical training" : index === 2 ? "Registered clinical practice" : "Advanced care credential"}</p>
              </article>
            ))}
          </div>
        </section>
      </section>

      <section className="doctor-appointment-banner">
        <Image src="/images/testimonial-lamp-flowers.webp" alt="" fill aria-hidden="true" sizes="100vw" />
        <div>
          <span>Ready to begin your healing journey?</span>
          <h2>Book an Appointment with {doctor.title}</h2>
          <p>Choose a consultation slot and let our care team guide the right next step for your wellness journey.</p>
          <div className="doctor-banner-actions">
            <Link href="/appointment">Book Appointment Now</Link>
            <Link href="/contact-us">Talk to Care Team</Link>
          </div>
          <ul aria-label="Appointment highlights">
            <li>Personalized guidance</li>
            <li>Doctor-led care</li>
            <li>Hospital support</li>
          </ul>
        </div>
      </section>
    </main>
  );
}
