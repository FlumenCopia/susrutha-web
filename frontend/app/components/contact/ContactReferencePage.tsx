"use client";

import { useState } from "react";
import Link from "next/link";
import { submitContactEnquiry } from "@/app/services/api";

function ContactIcon({ type }: { type: "phone" | "mail" | "pin" | "globe" | "leaf" | "clock" | "shield" }) {
  if (type === "phone") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M8 4 5.5 6.5c-.8.8-.4 4.8 3.6 8.8s8 4.4 8.8 3.6L20 16l-4-3-2 2c-1.4-.7-3.3-2.5-4-4l2-2-4-5Z" />
      </svg>
    );
  }
  if (type === "mail") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M4 6h16v12H4z" />
        <path d="m4 7 8 6 8-6" />
      </svg>
    );
  }
  if (type === "pin") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 21s7-6.2 7-12a7 7 0 0 0-14 0c0 5.8 7 12 7 12Z" />
        <circle cx="12" cy="9" r="2.5" />
      </svg>
    );
  }
  if (type === "leaf") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M20 4C11 4 6 9 6 17c8 0 13-5 14-13Z" />
        <path d="M6 17c3-4 6-6 10-8" />
      </svg>
    );
  }
  if (type === "clock") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="12" cy="12" r="8" />
        <path d="M12 7v5l3 2" />
      </svg>
    );
  }
  if (type === "shield") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 3 19 6v5c0 5-3 8-7 10-4-2-7-5-7-10V6l7-3Z" />
        <path d="m9 12 2 2 4-5" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="8" />
      <path d="M4 12h16" />
      <path d="M12 4c2 2.2 3 4.9 3 8s-1 5.8-3 8c-2-2.2-3-4.9-3-8s1-5.8 3-8Z" />
    </svg>
  );
}

const supportItems = [
  { faIcon: "fa-solid fa-leaf", title: "Personalized", text: "Support" },
  { faIcon: "fa-regular fa-clock", title: "Timely", text: "Response" },
  { faIcon: "fa-solid fa-shield-halved", title: "Confidential &", text: "Secure" },
];

const contactCards = [
  {
    icon: "pin" as const,
    title: "Our Address",
    primary: ["Door No. 47/881:1, Kanjikuzhi,", "Kottayam, Kerala – 686004, India"],
    secondary: ["Susrutha Ayurveda Hospital", "Panchakarma & Wellness Center"],
    link: null,
  },
  {
    icon: "phone" as const,
    title: "Call Us",
    primary: ["+91 481 350 1000", "+91 9387 510 100"],
    secondary: ["Mon – Sat: 8:00 AM – 7:00 PM", "Sunday: 9:00 AM – 1:00 PM"],
    link: "tel:+914813501000",
  },
  {
    icon: "mail" as const,
    title: "Email Us",
    primary: ["info@susruthaayurveda.com", "care@susruthaayurveda.com"],
    secondary: ["We respond within 24 hours"],
    link: "mailto:info@susruthaayurveda.com",
  },
  {
    icon: "globe" as const,
    title: "Website",
    primary: ["www.susruthaayurveda.com"],
    secondary: ["Explore treatments, programs", "and expert insights online."],
    link: "https://www.susruthaayurveda.com",
  },
];

export function ContactReferencePage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    service: "Tranquil Radiance Facial",
    date: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name) {
      alert("Please enter your name.");
      return;
    }
    setIsSubmitting(true);
    try {
      await submitContactEnquiry({
        name: formData.name,
        email: formData.email,
        phone: "N/A",
        subject: formData.service,
        message: `Date: ${formData.date} | ${formData.message}`,
      });
    } catch (err) {
      console.warn("Contact lead API error:", err);
    } finally {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }
  };

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
              {/* <nav className="contact-booking-breadcrumb" aria-label="Breadcrumb">
                <Link href="/">Home</Link>
                <span>/</span>
                <span>Contact</span>
              </nav> */}

              <h1 id="contact-booking-title" className="contact-booking-hero-h1">
                We&rsquo;re Here
                <span>to Help You</span>
              </h1>

              <p className="contact-booking-hero-desc">
                Have questions or need guidance? Our team is here for you. Reach out to us and experience compassionate care, every step of the way.
              </p>

              <div className="contact-booking-support-grid">
                {supportItems.map((item, idx) => (
                  <article key={idx} className="contact-booking-support-item">
                    <span className="contact-booking-support-icon">
                      <i className={item.faIcon} />
                    </span>
                    <p>
                      <strong>{item.title}</strong>
                      {item.text}
                    </p>
                  </article>
                ))}
              </div>
            </div>

            {/* Right Appointment Form */}
            <div className="contact-booking-form-wrap">
              <span className="contact-booking-eyebrow">Contact With Us</span>
              <h2 className="contact-booking-title">
                Book Appointment
              </h2>

              {isSubmitted ? (
                <div className="contact-booking-success">
                  <h3>Thank You!</h3>
                  <p>Your appointment request has been received. Our care coordinator will contact you shortly.</p>
                </div>
              ) : (
                <form className="contact-booking-form" onSubmit={handleSubmit}>
                  <div className="contact-booking-grid">
                    <div className="contact-booking-field">
                      <label htmlFor="booking-name">Your Name</label>
                      <input
                        id="booking-name"
                        type="text"
                        placeholder="Your Name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                      />
                    </div>

                    <div className="contact-booking-field">
                      <label htmlFor="booking-email">Email Address</label>
                      <input
                        id="booking-email"
                        type="email"
                        placeholder="Email Address"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                      />
                    </div>

                    <div className="contact-booking-field">
                      <label htmlFor="booking-service">Select Services</label>
                      <select
                        id="booking-service"
                        value={formData.service}
                        onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                      >
                        <option value="Tranquil Radiance Facial">Tranquil Radiance Facial</option>
                        <option value="Ayurvedic Consultation">Ayurvedic Consultation</option>
                        <option value="Panchakarma Detox">Panchakarma Detox</option>
                        <option value="Spine & Joint Care">Spine & Joint Care</option>
                        <option value="Rejuvenation Therapy">Rejuvenation Therapy</option>
                      </select>
                    </div>

                    <div className="contact-booking-field">
                      <label htmlFor="booking-date">Select Date</label>
                      <input
                        id="booking-date"
                        type="date"
                        value={formData.date}
                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      />
                    </div>

                    <div className="contact-booking-field wide">
                      <label htmlFor="booking-message">Write A Message</label>
                      <textarea
                        id="booking-message"
                        rows={2}
                        placeholder="Write A Message"
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="contact-booking-btn-wrap">
                    <button type="submit" className="contact-booking-submit-btn" disabled={isSubmitting}>
                      {isSubmitting ? "Submitting..." : "Book Now"}
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
            {contactCards.map((card) => (
              <article key={card.title}>
                <span className="contact-reference-info-icon">
                  <ContactIcon type={card.icon} />
                </span>
                <h3>{card.title}</h3>
                {card.primary.map((line) =>
                  card.link ? (
                    <a key={line} className="info-primary" href={card.link} style={{ display: "block", textDecoration: "none" }}>
                      {line}
                    </a>
                  ) : (
                    <p key={line} className="info-primary">{line}</p>
                  )
                )}
                <hr className="info-divider" />
                {card.secondary.map((line) => (
                  <p key={line} className="info-secondary">{line}</p>
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
