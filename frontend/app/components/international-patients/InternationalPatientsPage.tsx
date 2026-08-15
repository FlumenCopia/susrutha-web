"use client";

import Image from "next/image";
import Link from "next/link";
import {
  internationalFacilities,
  internationalFaqsList,
  internationalPrograms,
  internationalStats,
  internationalSupportItems,
} from "./internationalPatientsData";
import { InternationalPatientsIcon } from "./InternationalPatientsIcon";

export function InternationalPatientsPage() {
  return (
    <div className="international-page">
      <section className="conditions-hero-serene" aria-labelledby="international-patients-title">
        <div
          className="conditions-hero-serene-bg"
          style={{ backgroundImage: `url('/images/ayurveda-village-path.webp')` }}
        />
        <div className="conditions-hero-serene-overlay" />

        <div className="conditions-hero-serene-content">
          <nav className="conditions-hero-serene-nav" aria-label="Breadcrumb">
            <Link href="/">HOME</Link>
            <span>/</span>
            <span>INTERNATIONAL PATIENTS</span>
          </nav>

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
              INTERNATIONAL PATIENTS
            </h1>
          </div>
        </div>
      </section>





























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
            {/* <span className="international-eyebrow">Programs Designed For You</span> */}
            <h2>Programs often chosen by travellers</h2>
            <Link href="/packages">
              View all programs
              <InternationalPatientsIcon name="arrow" />
            </Link>
          </div>

          <div className="international-program-grid">
            {internationalPrograms.map((program) => (
              <article className="international-program-card" key={program.title}>
                <div className="international-program-image">
                  <Image src={program.image} alt={program.title} fill sizes="(max-width: 760px) 100vw, 25vw" />
                </div>
                <h3>{program.title}</h3>
                <p>{program.text}</p>
                <Link href="/packages" aria-label={`Explore ${program.title}`}>
                  <span>Explore Program</span>
                  <InternationalPatientsIcon name="arrow" />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

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
            <h2>Plan Your Treatment Journey</h2>
            <form onSubmit={(e) => e.preventDefault()}>
              <div className="international-form-grid">
                <label className="international-form-field">
                  <span>Full Name</span>
                  <input type="text" name="name" placeholder="Enter your full name" required />
                </label>

                <label className="international-form-field">
                  <span>Email Address</span>
                  <input type="email" name="email" placeholder="Enter your email" required />
                </label>

                <label className="international-form-field">
                  <span>Country</span>
                  <select name="country" defaultValue="">
                    <option value="" disabled>Select your country</option>
                    <option>India</option>
                    <option>United Arab Emirates</option>
                    <option>United States</option>
                    <option>United Kingdom</option>
                    <option>Singapore</option>
                    <option>Germany</option>
                    <option>Australia</option>
                    <option>Other</option>
                  </select>
                </label>

                <label className="international-form-field">
                  <span>Phone / WhatsApp</span>
                  <input type="tel" name="phone" placeholder="+91 Phone / WhatsApp" required />
                </label>

                <label className="international-form-field international-form-full">
                  <span>Preferred Arrival Date</span>
                  <input type="date" name="arrival" />
                </label>

                <label className="international-form-field international-form-full">
                  <span>Medical Condition / Requirements</span>
                  <textarea name="requirements" rows={4} placeholder="Briefly describe your health condition or treatment preferences" />
                </label>
              </div>

              <button type="submit" className="international-form-submit-btn">
                Submit Enquiry
                <InternationalPatientsIcon name="plane" />
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
