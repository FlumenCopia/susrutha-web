import Image from "next/image";
import Link from "next/link";
import type { DoctorDirectoryItem } from "../../data/architecture";
import { getImageDisplayUrl } from "../../services/api";

type DoctorProfilePageProps = {
  doctor: DoctorDirectoryItem;
};

type DoctorIconName = "award" | "calendar" | "doctor" | "leaf" | "medicine" | "shield" | "spine" | "target";

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
  const docName = doctor.title || (doctor as any).name || "Ayurvedic Physician";
  const image = typeof doctor.image === "string" && doctor.image.trim() !== ""
    ? getImageDisplayUrl(doctor.image)
    : (doctor as any).photoUrl ? getImageDisplayUrl((doctor as any).photoUrl) : (doctor as any).photo ? getImageDisplayUrl((doctor as any).photo) : "/images/doctor-portrait.webp";

  const focusAreas = Array.isArray(doctor.focusAreas) && doctor.focusAreas.length > 0
    ? doctor.focusAreas.map(f => typeof f === 'string' ? f : (f as any).title || String(f))
    : Array.isArray((doctor as any).specialties) && (doctor as any).specialties.length > 0
    ? (doctor as any).specialties
    : [];

  const languages = Array.isArray(doctor.languages) && doctor.languages.length > 0
    ? doctor.languages.join(", ")
    : Array.isArray((doctor as any).languagesSpoken) && (doctor as any).languagesSpoken.length > 0
    ? (doctor as any).languagesSpoken.join(", ")
    : typeof doctor.languages === 'string'
    ? doctor.languages
    : "";

  const education = Array.isArray((doctor as any).credentials) && (doctor as any).credentials.length > 0
    ? (doctor as any).credentials
    : Array.isArray(doctor.credentials) && doctor.credentials.length > 0
    ? doctor.credentials.map(c => typeof c === 'string' ? c : String(c))
    : (doctor as any).qualifications
    ? [(doctor as any).qualifications, (doctor as any).registrationNumber ? `Reg No: ${(doctor as any).registrationNumber}` : ''].filter(Boolean)
    : [];

  const experienceDisplay = (doctor as any).experienceText || ((doctor as any).experienceYears ? `${(doctor as any).experienceYears}+ Years` : doctor.experience ?? "");
  const rawAvailability = (doctor as any).availability;
  const availabilityText = typeof rawAvailability === 'string'
    ? rawAvailability
    : Array.isArray(rawAvailability) && rawAvailability.length > 0
    ? rawAvailability.map((a: any) => typeof a === 'string' ? a : `${a.days?.join?.(', ') || ''}`).join(', ')
    : "On Appointment";

  const associatedTreatments = Array.isArray((doctor as any).associatedTreatmentIds)
    ? (doctor as any).associatedTreatmentIds
    : [];

  return (
    <main className="doctor-detail-page">
      <section className="doctor-detail-hero">
        <div className="doctor-detail-shell">
          <div className="doctor-detail-hero-grid" style={{ position: "relative" }}>
            <div className="doctor-detail-copy">
              <span>{doctor.meta || (doctor as any).designation || "Ayurvedic Physician"}</span>
              <h1>{docName}</h1>
              {(doctor as any).qualifications && <p className="doctor-detail-meta">{(doctor as any).qualifications}</p>}
              <p>{doctor.text || (doctor as any).bio || (doctor as any).shortBio}</p>

              <div className="doctor-detail-stats" aria-label="Doctor highlights">
                {experienceDisplay && (
                  <article>
                    <DoctorIcon name="calendar" />
                    <strong>{experienceDisplay}</strong>
                    <span>Experience</span>
                  </article>
                )}
                <article>
                  <DoctorIcon name="leaf" />
                  <strong>100%</strong>
                  <span>Ayurvedic Care</span>
                </article>
              </div>

              <div className="doctor-detail-actions">
                <Link href={`/appointment?doctor=${encodeURIComponent((doctor as any).slug || (doctor as any)._id || docName)}`}>
                  Book Consultation Slot
                </Link>
              </div>
            </div>

            <div className="doctor-detail-photo-wrap">
              <div className="doctor-detail-photo">
                <Image
                  src={image}
                  alt={docName}
                  fill
                  priority
                  unoptimized
                  sizes="(max-width: 900px) 92vw, 430px"
                  style={{ objectFit: "cover", objectPosition: "center 20%" }}
                />
              </div>
              <div className="doctor-detail-photo-note">
                <DoctorIcon name="leaf" />
                <span>Personalized Ayurveda Care</span>
              </div>
            </div>

            <aside className="doctor-detail-glance" aria-label="At a glance">
              {focusAreas.length > 0 && (
                <article>
                  <DoctorIcon name="award" />
                  <div>
                    <span>Specialization</span>
                    <strong>{focusAreas.slice(0, 2).join(" & ")}</strong>
                  </div>
                </article>
              )}
              {languages && (
                <article>
                  <DoctorIcon name="doctor" />
                  <div>
                    <span>Languages</span>
                    <strong>{languages}</strong>
                  </div>
                </article>
              )}
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
        {focusAreas.length > 0 && (
          <section className="doctor-detail-block">
            <h2>Focus Areas & Specialties</h2>
            <div className="doctor-chip-list">
              {focusAreas.map((item: string) => (
                <span key={item}>{item}</span>
              ))}
            </div>
          </section>
        )}

        {doctor.quote && (
          <section className="doctor-philosophy-panel">
            <div>
              <span>Philosophy</span>
              <h2>&ldquo;{doctor.quote}&rdquo;</h2>
            </div>
          </section>
        )}

        {associatedTreatments.length > 0 && (
          <section className="doctor-detail-block">
            <div className="doctor-detail-title-center">
              <span />
              <h2>Associated Treatments</h2>
              <span />
            </div>
            <div className="doctor-treatment-grid">
              {associatedTreatments.map((tr: any) => (
                <article key={tr.title || tr.name}>
                  <div>
                    <h3>{tr.title || tr.name}</h3>
                    {tr.shortDescription && <p>{tr.shortDescription}</p>}
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}

        {education.length > 0 && (
          <section className="doctor-detail-block doctor-education-block">
            <div className="doctor-detail-title-center">
              <span />
              <h2>Education & Credentials</h2>
              <span />
            </div>
            <div className="doctor-education-grid">
              {education.map((item: string, index: number) => (
                <article key={item}>
                  <DoctorIcon name="award" />
                  <h3>{item}</h3>
                </article>
              ))}
            </div>
          </section>
        )}
      </section>

      <section className="doctor-appointment-banner">
        <Image src="/images/testimonial-lamp-flowers.webp" alt="" fill aria-hidden="true" sizes="100vw" />
        <div>
          <h2>Book an Appointment with {docName}</h2>
          <p>Choose a consultation slot and let our care team guide the right next step for your wellness journey.</p>
          <div className="doctor-banner-actions">
            <Link href={`/appointment?doctor=${encodeURIComponent((doctor as any).slug || (doctor as any)._id || docName)}`}>Book Appointment Now</Link>
            <Link href="/contact-us">Talk to Care Team</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
