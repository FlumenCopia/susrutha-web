"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { InternationalPatientsIcon, type InternationalPatientsIconName } from "./InternationalPatientsIcon";
import { getPublicPackages, getImageDisplayUrl, submitContactEnquiry } from "@/app/services/api";

const internationalFacilities = [
  { title: "Inpatient Suites", subtitle: "Private air-conditioned rooms", text: "Comfortable private suites with attendant beds and attached washrooms.", image: "/images/kowdiar_gallery_01.webp" },
  { title: "Panchakarma Units", subtitle: "Traditional wooden therapy tables", text: "Dedicated Panchakarma therapy suites with traditional wooden droni.", image: "/images/treatment-panchakarma.webp" },
];

const internationalFaqsList = [
  { q: "How do I apply for a Medical Visa?", a: "We provide official medical invitation letters upon initial consultation." },
  { q: "Are airport transfers included?", a: "Direct pick-up from Trivandrum International Airport (TRV) is arranged." },
];

const internationalPrograms: Array<{ title: string; text: string; image: string; icon?: InternationalPatientsIconName }> = [
  { title: "14-Day Panchakarma Rejuvenation", text: "Comprehensive body detox and rejuvenation.", image: "/images/treatment-panchakarma.webp" },
  { title: "Spine & Joint Rehabilitation", text: "Targeted Kati Vasthi and pain care.", image: "/images/treatment-kati-vasti.webp" },
];

const internationalStats: Array<{ value: string; label: string; icon: InternationalPatientsIconName }> = [
  { value: "40+", label: "Countries Served", icon: "globe" },
  { value: "20 km", label: "From Airport", icon: "plane" },
  { value: "100%", label: "Physician Supervised", icon: "shield" },
];

const internationalSupportItems: Array<{ title: string; icon: InternationalPatientsIconName }> = [
  { title: "Visa Assistance", icon: "globe" },
  { title: "Airport Transfers", icon: "plane" },
];

export function InternationalPatientsPage() {
  const [packages, setPackages] = useState<any[]>(internationalPrograms);
  const [loadingPackages, setLoadingPackages] = useState(true);

  // International Patient Enquiry Form State
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    country: "",
    phone: "",
    arrival: "",
    requirements: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  useEffect(() => {
    async function loadCmsPackages() {
      try {
        setLoadingPackages(true);
        const data = await getPublicPackages();
        const items = Array.isArray(data) ? data : (data as any)?.items || [];
        if (items.length > 0) {
          const mapped = items.slice(0, 4).map((p: any) => ({
            title: p.title || p.name || "Ayurvedic Treatment Package",
            text: p.subtitle || p.overview || p.tagline || (p.durationOptions && p.durationOptions[0]?.label) || "Authentic residential healing and care program.",
            image: (p.image || p.coverImage) ? getImageDisplayUrl(p.image || p.coverImage) : "/images/treatment-panchakarma.webp",
            href: p.slug ? `/packages/${p.slug}` : `/packages`,
          }));
          setPackages(mapped);
        }
      } catch (err) {
        console.error("Failed to load packages from CMS:", err);
      } finally {
        setLoadingPackages(false);
      }
    }
    loadCmsPackages();
  }, []);

  return (
    <div className="international-page">
      {/* Hero Section */}
      <section className="conditions-hero-serene" aria-labelledby="international-patients-title">
        <div
          className="conditions-hero-serene-bg"
          style={{ backgroundImage: `url('/images/ayurveda-village-path.webp')` }}
        />
        <div className="conditions-hero-serene-overlay" />

        <div className="conditions-hero-serene-content">
          <div className="conditions-hero-serene-middle-wrapper">
            <div className="conditions-hero-serene-middle">
              <p className="conditions-hero-serene-quote">
                At Susrutha Ayurveda Gramam, we welcome patients from around the world to experience authentic Kerala
                Ayurveda with personalized care, modern facilities, and a tranquil healing environment.
              </p>
            </div>

            <div className="conditions-hero-serene-right-stats" aria-label="International patient statistics">
              {internationalStats.map((item) => (
                <div className="conditions-hero-stat-card" key={item.label}>
                  <InternationalPatientsIcon name={item.icon} />
                  <div className="conditions-hero-stat-info">
                    <strong>{item.value}</strong>
                    <span>{item.label}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="conditions-hero-serene-bottom">
            <h1 id="international-patients-title" className="conditions-hero-serene-title">
              International Patients
            </h1>
          </div>
        </div>
      </section>

      {/* Core USP & Enquiry Form - Positioned near the top for international visitors */}
      <section className="international-enquiry-section" id="international-enquiry">
        <div className="international-enquiry-grid">
          <div className="international-support-box">
            <div>
              <h2 className="international-support-title">We are with you at every step</h2>
            </div>

            <div className="international-support-items-grid">
              {internationalSupportItems.map((item) => (
                <div className="international-support-card-item" key={item.title}>
                  <InternationalPatientsIcon name={item.icon} />
                  <h3>{item.title}</h3>
                </div>
              ))}
            </div>

            <div className="international-direct-help-card">
              <h3>Need assistance planning your journey?</h3>
              <p>Our dedicated international care coordinator will assist you with medical advice, stay details, and visa documents.</p>

              <div className="international-direct-contact-list">
                <div className="international-contact-row">
                  <InternationalPatientsIcon name="phone" />
                  <span>+91 98460 56736</span>
                </div>
                <div className="international-contact-row">
                  <InternationalPatientsIcon name="mail" />
                  <span>international@susruthaayurveda.com</span>
                </div>
                <div className="international-contact-row">
                  <InternationalPatientsIcon name="chat" />
                  <span>WhatsApp Support Available 24/7</span>
                </div>
              </div>
            </div>
          </div>

          <div className="international-enquiry-form-card">
            <div style={{ marginBottom: "1.25rem" }}>
              <span style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.35rem",
                padding: "0.25rem 0.65rem",
                borderRadius: "9999px",
                fontSize: "0.75rem",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.05em",
                backgroundColor: "#ecfdf5",
                color: "#065f46",
                border: "1px solid #a7f3d0",
                marginBottom: "0.5rem"
              }}>
                🌍 International Care Desk
              </span>
              <h2 style={{ margin: "0.25rem 0 0.5rem", fontSize: "1.875rem", fontWeight: 700, color: "#061d13" }}>
                International Patient Journey & Treatment Enquiry
              </h2>
              <p style={{ margin: 0, fontSize: "0.875rem", color: "#64748b" }}>
                Connect directly with our Overseas Patient Coordinator for treatment planning, medical visas, accommodation, and airport transfers.
              </p>
            </div>

            {submitted ? (
              <div style={{
                padding: "2.5rem 1.5rem",
                textAlign: "center",
                backgroundColor: "#f0fdf4",
                borderRadius: "1rem",
                border: "1px solid #bbf7d0",
                color: "#166534"
              }}>
                <div style={{
                  width: "3.5rem",
                  height: "3.5rem",
                  margin: "0 auto 1rem",
                  borderRadius: "50%",
                  backgroundColor: "#16a34a",
                  color: "#ffffff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "1.75rem",
                  boxShadow: "0 4px 12px rgba(22, 163, 74, 0.25)"
                }}>
                  ✓
                </div>
                <h3 style={{ fontSize: "1.35rem", fontWeight: 700, margin: "0 0 0.5rem", color: "#14532d" }}>
                  Enquiry Received Successfully!
                </h3>
                <p style={{ fontSize: "0.925rem", lineHeight: 1.6, color: "#166534", margin: "0 auto 1.75rem", maxWidth: "460px" }}>
                  Thank you for contacting Susrutha Ayurveda. Your international enquiry has been registered with our Overseas Care Desk. A dedicated coordinator will reach out via WhatsApp / Email with doctors&apos; advice, treatment estimate, and visa documentation.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSubmitted(false);
                    setSubmitError(null);
                  }}
                  className="international-form-submit-btn"
                  style={{ display: "inline-flex", width: "auto", margin: "0 auto", padding: "0.75rem 2rem" }}
                >
                  Submit Another Enquiry
                </button>
              </div>
            ) : (
              <form onSubmit={async (e) => {
                e.preventDefault();
                if (!formData.name.trim() || !formData.phone.trim()) {
                  setSubmitError("Please provide your name and phone / WhatsApp number.");
                  return;
                }

                try {
                  setSubmitting(true);
                  setSubmitError(null);

                  const countrySelected = formData.country.trim() || "Overseas";
                  const formattedMessage = [
                    `[Form: International Patient Enquiry]`,
                    `Country of Residence: ${countrySelected}`,
                    formData.arrival ? `Preferred Arrival Date: ${formData.arrival}` : null,
                    formData.requirements.trim() ? `Medical Requirements & Details:\n${formData.requirements.trim()}` : null,
                  ].filter(Boolean).join("\n\n");

                  const res = await submitContactEnquiry({
                    name: formData.name.trim(),
                    phone: formData.phone.trim(),
                    email: formData.email.trim() || undefined,
                    subject: `🌍 International Patient Enquiry - ${countrySelected}`,
                    message: formattedMessage,
                    leadType: "INTERNATIONAL_PATIENT",
                    preferredDate: formData.arrival || undefined,
                  });

                  if (res && (res.success || res.status === "success" || res.data?.id)) {
                    setSubmitted(true);
                    setFormData({
                      name: "",
                      email: "",
                      country: "",
                      phone: "",
                      arrival: "",
                      requirements: "",
                    });
                  } else {
                    setSubmitError(res?.message || "Could not submit your enquiry. Please verify details or message us on WhatsApp.");
                  }
                } catch (err: any) {
                  console.error("Enquiry submission error:", err);
                  setSubmitError("Network connection error. Please try again or reach our International Desk on WhatsApp.");
                } finally {
                  setSubmitting(false);
                }
              }}>
                {submitError && (
                  <div style={{
                    padding: "0.75rem 1rem",
                    marginBottom: "1.25rem",
                    borderRadius: "0.5rem",
                    backgroundColor: "#fef2f2",
                    border: "1px solid #fecaca",
                    color: "#991b1b",
                    fontSize: "0.875rem"
                  }}>
                    ⚠️ {submitError}
                  </div>
                )}

                <div className="international-form-grid">
                  <label className="international-form-field">
                    <span>Full Name *</span>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={(e) => {
                        setFormData({ ...formData, name: e.target.value });
                        if (submitError) setSubmitError(null);
                      }}
                      placeholder="Enter your full name"
                      required
                    />
                  </label>

                  <label className="international-form-field">
                    <span>Email Address</span>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={(e) => {
                        setFormData({ ...formData, email: e.target.value });
                        if (submitError) setSubmitError(null);
                      }}
                      placeholder="Enter your email"
                    />
                  </label>

                  <label className="international-form-field">
                    <span>Country of Residence *</span>
                    <select
                      name="country"
                      value={formData.country}
                      onChange={(e) => {
                        setFormData({ ...formData, country: e.target.value });
                        if (submitError) setSubmitError(null);
                      }}
                      required
                    >
                      <option value="" disabled>Select your country</option>
                      <option value="United Arab Emirates">United Arab Emirates</option>
                      <option value="Saudi Arabia">Saudi Arabia</option>
                      <option value="Qatar">Qatar</option>
                      <option value="Kuwait">Kuwait</option>
                      <option value="Oman">Oman</option>
                      <option value="Bahrain">Bahrain</option>
                      <option value="United Kingdom">United Kingdom</option>
                      <option value="United States">United States</option>
                      <option value="Germany">Germany</option>
                      <option value="Australia">Australia</option>
                      <option value="Singapore">Singapore</option>
                      <option value="Malaysia">Malaysia</option>
                      <option value="Canada">Canada</option>
                      <option value="India">India (Non-Resident / Overseas Visitor)</option>
                      <option value="Other">Other Country</option>
                    </select>
                  </label>

                  <label className="international-form-field">
                    <span>Phone / WhatsApp *</span>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={(e) => {
                        setFormData({ ...formData, phone: e.target.value });
                        if (submitError) setSubmitError(null);
                      }}
                      placeholder="Enter phone number"
                      required
                    />
                  </label>

                  <label className="international-form-field international-form-full">
                    <span>Preferred Arrival Date</span>
                    <input
                      type="date"
                      name="arrival"
                      value={formData.arrival}
                      onChange={(e) => {
                        setFormData({ ...formData, arrival: e.target.value });
                        if (submitError) setSubmitError(null);
                      }}
                    />
                  </label>

                  <label className="international-form-field international-form-full">
                    <span>Medical Condition / Treatment Requirements</span>
                    <textarea
                      name="requirements"
                      rows={4}
                      value={formData.requirements}
                      onChange={(e) => {
                        setFormData({ ...formData, requirements: e.target.value });
                        if (submitError) setSubmitError(null);
                      }}
                      placeholder="Briefly describe your health condition, desired stay duration, or treatment preferences (e.g. Spine & joint rehabilitation, Panchakarma rejuvenation, stress relief)"
                    />
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="international-form-submit-btn"
                  style={{ opacity: submitting ? 0.75 : 1, cursor: submitting ? "not-allowed" : "pointer" }}
                >
                  {submitting ? "Submitting Journey Request..." : "Submit Enquiry"}
                  <InternationalPatientsIcon name="plane" />
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Programs Chosen by Travellers */}
      <section className="international-programs-banner">
        <Image
          src="/images/banner_calm_retreat.jpg"
          alt="Peaceful Kerala Ayurveda retreat environment"
          fill
          priority
          sizes="100vw"
          className="international-programs-bg"
        />
        <div className="international-programs-overlay" />

        <div className="international-programs-content">
          <div className="international-programs-intro">
            <h2>Programs often chosen by travellers</h2>
            <Link href="/packages">
              View all programs
              <InternationalPatientsIcon name="arrow" />
            </Link>
          </div>

          <div className="international-program-grid">
            {packages.map((program) => (
              <article className="international-program-card" key={program.title}>
                <div className="international-program-image">
                  <Image src={program.image} alt={program.title} fill sizes="(max-width: 760px) 100vw, 25vw" />
                </div>
                <h3>{program.title}</h3>
                <p>{program.text}</p>
                <Link href={program.href || "/packages"} aria-label={`Explore ${program.title}`}>
                  <span>Explore Program</span>
                  <InternationalPatientsIcon name="arrow" />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Facilities Preview */}
      <section className="international-facilities" aria-labelledby="international-facilities-title">
        <div className="international-strip-head">
          <h2 id="international-facilities-title">Facilities that support classical care</h2>
        </div>

        <div className="international-facility-grid">
          {internationalFacilities.map((facility) => {
            const isPopular = "popular" in facility && facility.popular;

            return (
              <article className="international-facility-card" data-popular={isPopular ? "true" : undefined} key={facility.title}>
                <h3>{facility.title}</h3>
                {isPopular ? <b>Popular</b> : null}
                <p>{facility.text}</p>
                <div className="international-facility-image">
                  <Image src={facility.image} alt={facility.title} fill sizes="(max-width: 760px) 100vw, 16vw" />
                </div>
                <Link href="/facilities">
                  Explore
                  <InternationalPatientsIcon name="arrow" />
                </Link>
              </article>
            );
          })}
        </div>
      </section>

      {/* Welcome Video Banner */}
      <section className="international-welcome-banner" aria-labelledby="international-welcome-title">
        <video
          autoPlay
          loop
          muted
          playsInline
          poster="/images/about-susrutha-wellness.webp"
          className="international-welcome-bg"
        >
          <source src="/bannervideo.mp4" type="video/mp4" />
        </video>
        <div className="international-welcome-overlay" />

        <div className="international-welcome-content">
          <h2 id="international-welcome-title" className="international-welcome-title">
            We welcome you
          </h2>
          <p className="international-welcome-desc">
            Patients from around the world trust Susrutha Gramam for safe, effective and compassionate care.
          </p>

          <div className="international-welcome-stats-row">
            {internationalStats.map((item) => (
              <div className="international-welcome-stat-card" key={item.label}>
                <span className="international-welcome-stat-icon">
                  <InternationalPatientsIcon name={item.icon} />
                </span>
                <div className="international-welcome-stat-info">
                  <strong>{item.value}</strong>
                  <span>{item.label}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="international-faq-section" aria-labelledby="faq-section-title">
        <div className="international-faq-container">
          <h2 id="faq-section-title" className="international-faq-main-title">
            Frequently Asked Questions
          </h2>

          <div className="international-faq-accordion-list">
            {internationalFaqsList.map((item) => (
              <details className="international-faq-item" key={item.q}>
                <summary className="international-faq-summary">
                  <span className="international-faq-question">{item.q}</span>
                  <span className="international-faq-toggle-icon" aria-hidden="true" />
                </summary>
                <p className="international-faq-answer">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
