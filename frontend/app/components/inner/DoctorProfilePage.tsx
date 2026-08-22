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
      {/* 1. Executive Doctor Hero Section (2-Column Grid) */}
      <section className="doctor-detail-hero">
        <div className="doctor-detail-shell">
          <div className="doctor-detail-hero-grid" style={{ position: "relative" }}>
            {/* Left Column: Doctor Profile & Credentials */}
            <div className="doctor-detail-copy">
              <span>{doctor.meta || (doctor as any).designation || "Ayurvedic Physician"}</span>
              <h1>{docName}</h1>
              {(doctor as any).qualifications && (
                <div className="doctor-detail-meta">{(doctor as any).qualifications}</div>
              )}
              <p style={{ marginTop: "14px", fontSize: "16.5px", lineHeight: 1.8, color: "#3a342b" }}>
                {doctor.text || (doctor as any).bio || (doctor as any).shortBio}
              </p>

              {/* Key Metrics Row */}
              <div className="doctor-detail-stats" aria-label="Doctor highlights">
                {experienceDisplay && (
                  <article>
                    <DoctorIcon name="calendar" />
                    <strong>{experienceDisplay}</strong>
                    <span>Experience</span>
                  </article>
                )}
                {languages && (
                  <article>
                    <DoctorIcon name="doctor" />
                    <strong>{languages}</strong>
                    <span>Languages</span>
                  </article>
                )}
                <article>
                  <DoctorIcon name="leaf" />
                  <strong>{availabilityText}</strong>
                  <span>Campuses</span>
                </article>
              </div>

              {/* Consultation Action Buttons */}
              <div className="doctor-detail-actions">
                <Link href={`/appointment?doctor=${encodeURIComponent((doctor as any).slug || (doctor as any)._id || docName)}`}>
                  Book Consultation Slot &rarr;
                </Link>
                <a href="tel:+919656656736">
                  Call Campus: +91 96566 56736
                </a>
              </div>
            </div>

            {/* Right Column: Doctor Portrait Photo */}
            <div className="doctor-detail-photo-wrap">
              <div className="doctor-detail-photo">
                <Image
                  src={image}
                  alt={docName}
                  fill
                  priority
                  unoptimized
                  sizes="(max-width: 900px) 92vw, 420px"
                  style={{ objectFit: "cover", objectPosition: "center 20%" }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Consolidated Clinical Details Section */}
      <section className="doctor-detail-main" style={{ padding: "60px 0", width: "min(100%, 1240px)", margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))", gap: "32px", alignItems: "stretch" }}>
          {/* Left Column: Specialties & Focus Areas */}
          {focusAreas.length > 0 && (
            <div style={{ background: "#ffffff", padding: "36px 32px", borderRadius: "24px", border: "1px solid #ebdccb", boxShadow: "0 12px 30px rgba(71, 50, 26, 0.05)", display: "flex", flexDirection: "column", justifyContent: "center" }}>
              <span style={{ fontSize: "12px", fontWeight: 900, color: "#b57a25", letterSpacing: "0.14em", textTransform: "uppercase", display: "block", marginBottom: "8px" }}>CLINICAL EXPERTISE</span>
              <h2 style={{ fontSize: "26px", fontWeight: 800, color: "#1a140c", margin: "0 0 24px" }}>Specialties & Focus Areas</h2>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
                {focusAreas.map((area: string) => (
                  <span
                    key={area}
                    style={{
                      background: "rgba(181, 122, 37, 0.08)",
                      border: "1px solid rgba(181, 122, 37, 0.25)",
                      color: "#1a140c",
                      fontSize: "14.5px",
                      fontWeight: 700,
                      padding: "8px 18px",
                      borderRadius: "999px",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#b57a25" }} />
                    {area}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Right Column: Medical Philosophy */}
          {doctor.quote && (
            <div style={{ background: "linear-gradient(135deg, #2c2214 0%, #1a140c 100%)", padding: "36px 32px", borderRadius: "24px", color: "#ffffff", boxShadow: "0 14px 36px rgba(44, 34, 20, 0.16)", display: "flex", flexDirection: "column", justifyContent: "center" }}>
              <span style={{ fontSize: "12px", fontWeight: 800, textTransform: "uppercase", color: "#d49e54", letterSpacing: "0.12em", display: "block", marginBottom: "12px" }}>
                MEDICAL PHILOSOPHY
              </span>
              <h2 style={{ fontSize: "22px", fontWeight: 700, lineHeight: 1.5, color: "#ffffff", margin: "0 0 16px" }}>
                &ldquo;{doctor.quote}&rdquo;
              </h2>
              <span style={{ fontSize: "13.5px", color: "#d49e54", fontWeight: 800, letterSpacing: "0.05em" }}>— {docName}</span>
            </div>
          )}
        </div>
      </section>

      {/* 3. Bottom Consultation CTA Banner */}
      <section
        style={{
          position: "relative",
          borderRadius: "28px",
          padding: "64px 36px",
          color: "#ffffff",
          textAlign: "center",
          overflow: "hidden",
          margin: "0 auto 60px",
          width: "min(100%, 1240px)",
          boxShadow: "0 20px 50px rgba(0, 0, 0, 0.25)",
        }}
      >
        <Image
          src="/images/banner_calm_retreat.jpg"
          alt="Book Doctor Consultation"
          fill
          sizes="100vw"
          style={{ objectFit: "cover", objectPosition: "center" }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(180deg, rgba(10, 6, 2, 0.80) 0%, rgba(10, 6, 2, 0.88) 100%)",
            backdropFilter: "blur(3px)",
          }}
        />

        <div style={{ position: "relative", zIndex: 2, maxWidth: "720px", margin: "0 auto" }}>
          <span
            style={{
              fontSize: "12px",
              fontWeight: 900,
              textTransform: "uppercase",
              color: "#f59e0b",
              letterSpacing: "0.12em",
              display: "inline-block",
              marginBottom: "14px",
              background: "rgba(0, 0, 0, 0.6)",
              border: "1px solid #f59e0b",
              padding: "6px 18px",
              borderRadius: "999px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
            }}
          >
            PHYSICIAN CONSULTATION
          </span>

          <h2
            className="doctor-appointment-cta-title"
            style={{
              fontSize: "clamp(28px, 4vw, 42px)",
              fontWeight: 900,
              margin: "12px 0 18px",
              color: "#ffffff",
              lineHeight: 1.2,
              textShadow: "0 4px 16px rgba(0,0,0,0.8)",
            }}
          >
            Book an Appointment with {docName}
          </h2>

          <p className="doctor-appointment-cta-text">
            Choose a consultation slot and let our expert Vaidyas guide the right diagnosis and treatment plan for your health.
          </p>

          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "16px" }}>
            <Link
              href={`/appointment?doctor=${encodeURIComponent((doctor as any).slug || (doctor as any)._id || docName)}`}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "16px 36px",
                borderRadius: "999px",
                background: "linear-gradient(135deg, #d49e54 0%, #b57a25 100%)",
                color: "#ffffff",
                fontWeight: 800,
                fontSize: "15px",
                textDecoration: "none",
                boxShadow: "0 8px 24px rgba(212, 158, 84, 0.4)",
              }}
            >
              <span>Book Appointment Now</span>
              <span aria-hidden="true">&rarr;</span>
            </Link>
            <Link
              href="/contact-us"
              style={{
                display: "inline-flex",
                alignItems: "center",
                padding: "16px 32px",
                borderRadius: "999px",
                background: "rgba(255, 255, 255, 0.12)",
                border: "1.5px solid rgba(255, 255, 255, 0.3)",
                color: "#ffffff",
                fontWeight: 700,
                fontSize: "15px",
                textDecoration: "none",
                backdropFilter: "blur(6px)",
              }}
            >
              <span>Talk to Care Team</span>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
