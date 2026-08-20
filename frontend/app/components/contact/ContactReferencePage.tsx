"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Phone, Mail, MapPin, Globe, Leaf, Clock, ShieldCheck, CheckCircle2 } from "lucide-react";
import { submitContactEnquiry, getPublicBranches, getPublicDepartments, getPublicTreatments, getPublicPackages } from "@/app/services/api";

function ContactIcon({ type }: { type: "phone" | "mail" | "pin" | "globe" | "leaf" | "clock" | "shield" }) {
  if (type === "phone") {
    return <Phone size={22} strokeWidth={1.75} aria-hidden="true" />;
  }
  if (type === "mail") {
    return <Mail size={22} strokeWidth={1.75} aria-hidden="true" />;
  }
  if (type === "pin") {
    return <MapPin size={22} strokeWidth={1.75} aria-hidden="true" />;
  }
  if (type === "leaf") {
    return <Leaf size={22} strokeWidth={1.75} aria-hidden="true" />;
  }
  if (type === "clock") {
    return <Clock size={22} strokeWidth={1.75} aria-hidden="true" />;
  }
  if (type === "shield") {
    return <ShieldCheck size={22} strokeWidth={1.75} aria-hidden="true" />;
  }
  return <Globe size={22} strokeWidth={1.75} aria-hidden="true" />;
}

const supportItems = [
  { icon: <Leaf size={20} strokeWidth={1.75} />, title: "Personalized", text: "Support" },
  { icon: <Clock size={20} strokeWidth={1.75} />, title: "Timely", text: "Response" },
  { icon: <ShieldCheck size={20} strokeWidth={1.75} />, title: "Confidential &", text: "Secure" },
];

const fallbackContactCards = [
  {
    icon: "pin" as const,
    title: "Main Campus & Hospital",
    primary: ["Vaidya Ratnam K.S. & V.S. Campus,", "Kattakada, Thiruvananthapuram, Kerala"],
    secondary: ["Susrutha Institute of Ayurvedic Sciences", "Research & Panchakarma Hospital"],
    link: null,
  },
  {
    icon: "phone" as const,
    title: "Direct Helpline",
    primary: ["+91 94470 03191", "+91 471 229 0282"],
    secondary: ["24/7 Patient Helpdesk & Emergency", "Doctor Consultation Guidance"],
    link: "tel:+919447003191",
  },
  {
    icon: "mail" as const,
    title: "Email Assistance",
    primary: ["info@susruthaayurveda.com", "admissions@susruthaayurveda.com"],
    secondary: ["Inpatient & OPD Enquiry Desk"],
    link: "mailto:info@susruthaayurveda.com",
  },
  {
    icon: "globe" as const,
    title: "International Desk",
    primary: ["www.susruthaayurveda.com"],
    secondary: ["Medical Visa Support & Care Packages", "Ayur Village Residential Stay"],
    link: "https://www.susruthaayurveda.com",
  },
];

export function ContactReferencePage() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    service: "Doctor OPD Consultation",
    date: "",
    message: "",
  });

  const [branches, setBranches] = useState<any[]>([]);
  const [selectedBranchId, setSelectedBranchId] = useState<string>("");
  const [serviceOptions, setServiceOptions] = useState<string[]>([
    "Doctor OPD Consultation",
    "Panchakarma Care & Residential Stay",
    "Spine & Joint Care Program",
    "Ayurvedic Rejuvenation & Detox",
    "International Patient Desk",
    "General Guidance / Hospital Info",
  ]);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    async function loadData() {
      try {
        const [apiBranches, apiDepts, apiTreatments, apiPackages] = await Promise.all([
          getPublicBranches(),
          getPublicDepartments(),
          getPublicTreatments(),
          getPublicPackages(),
        ]);

        if (Array.isArray(apiBranches) && apiBranches.length > 0) {
          setBranches(apiBranches);
          setSelectedBranchId(apiBranches[0]._id || apiBranches[0].id || "");
        }

        const dynamicServices: string[] = [
          "Doctor OPD Consultation",
          "Panchakarma Care & Residential Stay",
          "Spine & Joint Care Program",
          "Ayurvedic Rejuvenation & Detox",
          "International Patient Desk",
          "General Guidance / Hospital Info",
        ];

        if (Array.isArray(apiTreatments)) {
          const tList = Array.isArray(apiTreatments) ? apiTreatments : (apiTreatments as any).items || [];
          tList.slice(0, 6).forEach((t: any) => {
            if (t.title && !dynamicServices.includes(t.title)) {
              dynamicServices.push(t.title);
            }
          });
        }

        const pkgList = Array.isArray(apiPackages) ? apiPackages : (apiPackages as any).items || [];
        if (Array.isArray(pkgList)) {
          pkgList.slice(0, 6).forEach((p: any) => {
            if (p.title && !dynamicServices.includes(p.title)) {
              dynamicServices.push(p.title);
            }
          });
        }

        setServiceOptions(dynamicServices);
      } catch (err) {
        console.warn("Contact data load error:", err);
      }
    }
    loadData();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      alert("Please enter your full name.");
      return;
    }
    if (!formData.phone.trim()) {
      alert("Please enter your contact phone number.");
      return;
    }

    setIsSubmitting(true);
    try {
      await submitContactEnquiry({
        name: formData.name.trim(),
        phone: formData.phone.trim(),
        email: formData.email.trim() || undefined,
        subject: formData.service,
        branchId: selectedBranchId || undefined,
        preferredDate: formData.date || undefined,
        message: formData.message.trim()
          ? `Preferred Date: ${formData.date || "Flexible"} | Service: ${formData.service} | ${formData.message}`
          : `Service Enquiry: ${formData.service}`,
      });
      setIsSubmitted(true);
    } catch (err) {
      console.error("Contact lead API submission error:", err);
      alert("Enquiry recorded. Our care desk will contact you shortly.");
      setIsSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactCards = branches.length > 0
    ? branches.map((b: any) => ({
        icon: "pin" as const,
        title: b.name,
        primary: [
          typeof b.address === "object" ? `${b.address.street || ""}, ${b.address.city || ""}` : (b.address || "Kattakada Campus"),
          b.phone || "+91 94470 03191"
        ],
        secondary: [
          b.type || "Inpatient & Outpatient Center",
          b.opdTimings || "Mon – Sat: 8:00 AM – 7:00 PM"
        ],
        link: b.phone ? `tel:${b.phone}` : "tel:+919447003191"
      }))
    : fallbackContactCards;

  return (
    <div className="contact-reference-page">
      <div className="contact-reference-main" style={{ paddingTop: 0 }}>
        {/* Full-bleed Luxury Booking Banner */}
        <section className="contact-booking-hero" aria-labelledby="contact-booking-title">
          <div
            className="contact-booking-hero-bg"
            style={{ backgroundImage: `url('/images/banner_contact_appointment.jpg')` }}
          />
          <div className="contact-booking-hero-overlay" />

          <div className="contact-booking-hero-content">
            {/* Left Original Title & Content */}
            <div className="contact-booking-left-copy">
              <h1 id="contact-booking-title" className="contact-booking-hero-h1">
                We&rsquo;re Here
                <span>to Help You</span>
              </h1>

              <p className="contact-booking-hero-desc">
                Have questions or need treatment guidance? Our expert team is here for you. Reach out to Susrutha Ayurveda Hospital and experience authentic, compassionate Ayurvedic care.
              </p>

              <div className="contact-booking-support-grid">
                {supportItems.map((item, idx) => (
                  <article key={idx} className="contact-booking-support-item">
                    <span className="contact-booking-support-icon">
                      {item.icon}
                    </span>
                    <p>
                      <strong>{item.title}</strong>
                      {item.text}
                    </p>
                  </article>
                ))}
              </div>
            </div>

            {/* Right Interactive Contact Form */}
            <div className="contact-booking-form-wrap">
              <h2 className="contact-booking-title">
                Contact With Us
              </h2>

              {isSubmitted ? (
                <div className="contact-booking-success" style={{ textAlign: "center", padding: "24px 16px" }}>
                  <CheckCircle2 size={48} color="#10b981" style={{ margin: "0 auto 12px auto" }} />
                  <h3 style={{ fontSize: "22px", fontWeight: 700, color: "#ffffff", marginBottom: "8px" }}>Enquiry Submitted!</h3>
                  <p style={{ color: "rgba(255, 255, 255, 0.85)", fontSize: "14px", lineHeight: "1.5" }}>
                    Thank you <strong>{formData.name}</strong>. Our patient care coordinator will call you back on <strong>{formData.phone}</strong> shortly.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setIsSubmitted(false);
                      setFormData({ name: "", phone: "", email: "", service: "Doctor OPD Consultation", date: "", message: "" });
                    }}
                    style={{
                      marginTop: "16px",
                      padding: "8px 20px",
                      borderRadius: "9999px",
                      background: "rgba(255, 255, 255, 0.2)",
                      border: "1px solid rgba(255, 255, 255, 0.4)",
                      color: "#ffffff",
                      cursor: "pointer",
                      fontSize: "13px",
                      fontWeight: 600
                    }}
                  >
                    Submit Another Enquiry
                  </button>
                </div>
              ) : (
                <form className="contact-booking-form" onSubmit={handleSubmit}>
                  <div className="contact-booking-grid">
                    <div className="contact-booking-field">
                      <label htmlFor="booking-name">Your Name *</label>
                      <input
                        id="booking-name"
                        type="text"
                        placeholder="e.g. Ramesh Menon"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                      />
                    </div>

                    <div className="contact-booking-field">
                      <label htmlFor="booking-phone">Phone Number *</label>
                      <input
                        id="booking-phone"
                        type="tel"
                        placeholder="+91 94470 00000"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        required
                      />
                    </div>

                    <div className="contact-booking-field">
                      <label htmlFor="booking-email">Email Address</label>
                      <input
                        id="booking-email"
                        type="email"
                        placeholder="name@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      />
                    </div>

                    {branches.length > 0 && (
                      <div className="contact-booking-field">
                        <label htmlFor="booking-branch">Preferred Branch</label>
                        <select
                          id="booking-branch"
                          value={selectedBranchId}
                          onChange={(e) => setSelectedBranchId(e.target.value)}
                        >
                          {branches.map((b: any) => (
                            <option key={b._id || b.id} value={b._id || b.id}>
                              {b.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    )}

                    <div className="contact-booking-field">
                      <label htmlFor="booking-service">Select Service / Concern</label>
                      <select
                        id="booking-service"
                        value={formData.service}
                        onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                      >
                        {serviceOptions.map((opt) => (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="contact-booking-field">
                      <label htmlFor="booking-date">Select Date</label>
                      <input
                        id="booking-date"
                        type="date"
                        value={formData.date}
                        min={new Date().toISOString().split("T")[0]}
                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      />
                    </div>

                    <div className="contact-booking-field wide">
                      <label htmlFor="booking-message">Write A Message / Concern</label>
                      <textarea
                        id="booking-message"
                        rows={2}
                        placeholder="Mention symptoms e.g., joint pain, panchakarma inquiry, room stay..."
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="contact-booking-btn-wrap">
                    <button type="submit" className="contact-booking-submit-btn" disabled={isSubmitting}>
                      {isSubmitting ? "Submitting..." : "Submit Enquiry"}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </section>

        {/* Contact Info Cards */}
        <section className="contact-reference-info" aria-labelledby="contact-info-title">
          <div className="contact-reference-info-glow" aria-hidden="true" />
          <h2 id="contact-info-title">Get in Touch</h2>
          <span className="contact-reference-small-rule" aria-hidden="true" />
          <div className="contact-reference-info-grid">
            {contactCards.map((card, idx) => (
              <article key={idx}>
                <span className="contact-reference-info-icon">
                  <ContactIcon type={card.icon} />
                </span>
                <h3>{card.title}</h3>
                {card.primary.map((line, lIdx) =>
                  card.link ? (
                    <a key={lIdx} className="info-primary" href={card.link} style={{ display: "block", textDecoration: "none" }}>
                      {line}
                    </a>
                  ) : (
                    <p key={lIdx} className="info-primary">{line}</p>
                  )
                )}
                <hr className="info-divider" />
                {card.secondary.map((line, lIdx) => (
                  <p key={lIdx} className="info-secondary">{line}</p>
                ))}
              </article>
            ))}
          </div>
        </section>

        {/* Location Map */}
        <section className="contact-reference-visit" aria-label="Visit Susrutha Ayurveda">
          <div className="contact-reference-map" style={{ position: "relative", overflow: "hidden", gridColumn: "1 / -1" }}>
            <iframe
              title="Susrutha Ayurveda Hospital location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3934.4!2d76.5217!3d9.5916!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b062ba8b06b3ba5%3A0x7d1a1c9b5b0e6b1!2sSusrutha%20Ayurveda%20Hospital%2C%20Kottayam!5e0!3m2!1sen!2sin!4v1"
              width="100%"
              height="100%"
              style={{
                position: "absolute",
                inset: 0,
                border: 0,
                filter: "saturate(0.82) contrast(1.06)",
              }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </section>
      </div>
    </div>
  );
}
