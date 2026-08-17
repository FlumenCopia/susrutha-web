"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { getImageDisplayUrl } from "../../services/api";

type PackageDetailReferencePageProps = {
  pkg: {
    slug: string;
    title: string;
    subtitle?: string;
    overview?: string;
    durationDays?: number;
    durationOptions?: Array<{ days: number; price?: number; label?: string }>;
    inclusions?: string[];
    exclusions?: string[];
    highlights?: string[];
    targetAilments?: string[];
    dailySchedule?: Array<{ time?: string; activity: string }>;
    accommodationTypes?: string[];
    image?: string;
    price?: number;
    badge?: string;
  };
};

export function PackageDetailReferencePage({ pkg }: PackageDetailReferencePageProps) {
  const [selectedDuration, setSelectedDuration] = useState<number>(pkg.durationDays || 7);

  const rawImage = pkg.image || "/images/treatment-panchakarma.webp";
  const bannerImage = getImageDisplayUrl(rawImage);

  const durationOptions = Array.isArray(pkg.durationOptions) && pkg.durationOptions.length > 0
    ? pkg.durationOptions
    : pkg.durationDays
    ? [{ days: pkg.durationDays, price: pkg.price || 0, label: `${pkg.durationDays} Days Package` }]
    : [];

  const currentOption = durationOptions.find((d) => d.days === selectedDuration) || durationOptions[0] || { label: "Standard Care Package" };

  const highlights = Array.isArray(pkg.highlights) && pkg.highlights.length > 0 ? pkg.highlights : [];
  const inclusions = Array.isArray(pkg.inclusions) && pkg.inclusions.length > 0 ? pkg.inclusions : [];
  const exclusions = Array.isArray(pkg.exclusions) && pkg.exclusions.length > 0 ? pkg.exclusions : [];
  const dailySchedule = Array.isArray(pkg.dailySchedule) && pkg.dailySchedule.length > 0 ? pkg.dailySchedule : [];
  const accommodationTypes = Array.isArray(pkg.accommodationTypes) && pkg.accommodationTypes.length > 0 ? pkg.accommodationTypes : [];

  return (
    <div className="package-detail-luxury-wrapper">
      {/* Hero Header */}
      <section className="treatment-hero-luxury" aria-labelledby="package-detail-title">
        <div className="treatment-hero-ambient-glow" aria-hidden="true" />
        <div className="treatment-hero-container">
          <div className="treatment-hero-content">
            {/* <nav className="treatment-breadcrumb-nav" aria-label="Breadcrumb">
              <Link href="/">Home</Link>
              <span className="bc-sep">/</span>
              <Link href="/packages">Care Packages</Link>
              <span className="bc-sep">/</span>
              <span className="bc-current">{pkg.title}</span>
            </nav> */}

            <div className="treatment-eyebrow-badge">
              {/* <span className="badge-dot" /> */}
              <span>{pkg.badge || "Care Package"}</span>
            </div>

            <h1 id="package-detail-title" className="treatment-hero-heading">
              {pkg.title}
            </h1>

            {pkg.subtitle && <p className="treatment-hero-subheading">{pkg.subtitle}</p>}
            <p className="treatment-hero-description">{pkg.overview}</p>

            {/* Duration Options */}
            {durationOptions.length > 0 && (
              <div className="treatment-facts-bar" style={{ flexWrap: "wrap", gap: "12px" }}>
                {durationOptions.map((opt) => (
                  <button
                    key={opt.days}
                    onClick={() => setSelectedDuration(opt.days)}
                    style={{
                      padding: "8px 16px",
                      borderRadius: "20px",
                      border: selectedDuration === opt.days ? "2px solid #b8860b" : "1px solid #ddd",
                      backgroundColor: selectedDuration === opt.days ? "#fffdf5" : "#fff",
                      fontWeight: selectedDuration === opt.days ? "bold" : "normal",
                      cursor: "pointer",
                      fontSize: "13px",
                    }}
                  >
                    {opt.days} Days Care {opt.price ? `— ₹${opt.price.toLocaleString("en-IN")}` : ""}
                  </button>
                ))}
              </div>
            )}

            {/* Action Buttons */}
            <div className="treatment-hero-actions" style={{ marginTop: "24px" }}>
              <Link className="btn btn-primary treatment-btn-book" href={`/appointment?package=${encodeURIComponent(pkg.slug)}`}>
                <span>Book Package Enquiry</span>
                <i className="fa-solid fa-arrow-right" aria-hidden="true" style={{ marginLeft: "6px" }} />
              </Link>
              <Link className="btn btn-outline treatment-btn-enquire" href="/contact-us">
                <span>Talk to Admissions Advisor</span>
              </Link>
            </div>
          </div>

          {/* Visual Card */}
          <div className="treatment-hero-media">
            <div className="treatment-media-frame">
              <Image
                src={bannerImage}
                alt={pkg.title}
                fill
                priority
                sizes="(max-width: 900px) 100vw, 48vw"
                className="treatment-hero-img"
                style={{ objectFit: "cover", objectPosition: "center" }}
              />
              <div className="treatment-media-overlay" />
              <div className="treatment-floating-badge">
                <span className="floating-badge-icon"><i className="fa-solid fa-certificate" /></span>
                <div>
                  <strong>{currentOption.label || `${selectedDuration} Days Package`}</strong>
                  <span>Hospital Admission</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Body */}
      <div className="treatment-detail-body">
        {/* Key Highlights (Only rendered if CMS data exists) */}
        {highlights.length > 0 && (
          <section className="treatment-section-block">
            <div className="section-center-heading">
              <span className="section-eyebrow">PROGRAMME HIGHLIGHTS</span>
              <h2 className="section-title-luxury">What Makes This Package Special</h2>
            </div>
            <div className="benefits-card-grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))" }}>
              {highlights.map((h, i) => (
                <div key={i} className="overview-highlight-card" style={{ height: "100%" }}>
                  <div className="highlight-card-head">
                    <span className="highlight-icon">✨</span>
                    <h3>Pillar {i + 1}</h3>
                  </div>
                  <p style={{ fontSize: "14px", lineHeight: "1.6", color: "#4a5568" }}>{h}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Daily Schedule Protocol (Only rendered if CMS data exists) */}
        {dailySchedule.length > 0 && (
          <section className="treatment-section-block">
            <div className="section-center-heading">
              <span className="section-eyebrow">DAILY ROUTINE</span>
              <h2 className="section-title-luxury">Daily Schedule</h2>
            </div>
            <div className="process-timeline-track">
              {dailySchedule.map((item, idx) => (
                <article className="process-step-card" key={idx}>
                  <div className="process-step-header">
                    <span className="step-num">{String(idx + 1).padStart(2, "0")}</span>
                  </div>
                  {item.time && <span className="step-phase">{item.time}</span>}
                  <h3 className="step-title" style={{ fontSize: "15px" }}>{item.activity}</h3>
                </article>
              ))}
            </div>
          </section>
        )}

        {/* Inclusions & Exclusions Grid (Only rendered if CMS data exists) */}
        {(inclusions.length > 0 || exclusions.length > 0) && (
          <section className="treatment-section-block">
            <div className="expect-inclusions-grid">
              {inclusions.length > 0 && (
                <div className="include-light-card">
                  <div className="expect-card-head">
                    <span className="card-tag gold">INCLUSIONS</span>
                    <h2>Package Inclusions</h2>
                  </div>
                  <ul className="expect-check-list">
                    {inclusions.map((item, idx) => (
                      <li key={idx}>
                        <span className="check-icon gold">✓</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {exclusions.length > 0 && (
                <div className="expect-dark-card">
                  <div className="expect-card-head">
                    <span className="card-tag">EXCLUSIONS</span>
                    <h2>Exclusions & Optional Services</h2>
                  </div>
                  <ul className="expect-check-list">
                    {exclusions.map((item, idx) => (
                      <li key={idx}>
                        <span className="check-icon" style={{ color: "#ef4444" }}>✕</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </section>
        )}

        {/* Accommodation Options (Only rendered if CMS data exists) */}
        {accommodationTypes.length > 0 && (
          <section className="treatment-section-block">
            <div className="section-center-heading">
              <span className="section-eyebrow">STAY AMENITIES</span>
              <h2 className="section-title-luxury">Available Accommodation Tiers</h2>
            </div>
            <ul className="expect-check-list" style={{ maxWidth: "700px", margin: "0 auto" }}>
              {accommodationTypes.map((room, idx) => (
                <li key={idx} style={{ padding: "16px", backgroundColor: "#fff", borderRadius: "12px", border: "1px solid #e2e8f0", marginBottom: "8px" }}>
                  <span className="check-icon gold">🏡</span>
                  <strong style={{ color: "#1a202c" }}>{room}</strong>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* CTA Banner */}
        <section className="treatment-cta-luxury">
          <div className="cta-ambient-glow" aria-hidden="true" />
          <div className="cta-content-wrapper">
            <span className="cta-eyebrow">RESERVE YOUR STAY</span>
            <h2 className="cta-heading">Ready to Begin Your Healing Journey?</h2>
            <p className="cta-text">Contact our patient admissions team to select your preferred package duration, dates, and accommodation.</p>
            <div className="cta-action-group">
              <Link className="btn btn-primary cta-btn-gold" href={`/appointment?package=${encodeURIComponent(pkg.slug)}`}>
                <span>Book Package Enquiry</span>
                <span aria-hidden="true">&rarr;</span>
              </Link>
              <a href="tel:+919447003191" className="btn btn-outline cta-btn-phone">
                <span>Call Admissions: +91 94470 03191</span>
              </a>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
