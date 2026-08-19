"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Check, Clock, Leaf, UserCheck, CheckCircle2, Phone, ArrowRight } from "lucide-react";
import { getImageDisplayUrl } from "../../services/api";

type TreatmentDetailReferencePageProps = {
  treatment: {
    slug: string;
    title: string;
    meta?: string;
    text?: string;
    image?: string;
    coverImage?: string;
    shortDescription?: string;
    fullDescription?: string;
    durationMinutes?: number;
    benefits?: any[];
    indications?: any[];
    procedureSteps?: any[];
    expectations?: string[];
    aftercare?: string[];
    inclusions?: string[];
    preparation?: string[];
  };
};

function slugLabel(slug: string) {
  return slug
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

export function TreatmentDetailReferencePage({ treatment }: TreatmentDetailReferencePageProps) {
  const [activeTab, setActiveTab] = useState("overview");

  const subtitle = treatment.slug === "panchakarma" ? "The Ultimate Ayurvedic Detox" : treatment.shortDescription || treatment.meta || "";
  const duration = treatment.slug === "panchakarma" ? "7 - 21 Days" : treatment.durationMinutes ? `${treatment.durationMinutes} Mins` : "";
  const rawImage = treatment.coverImage || treatment.image || "/images/treatment-panchakarma.webp";
  const bannerImage = getImageDisplayUrl(rawImage);

  // Pure dynamic mapping from CMS data (No static dummy fallbacks)
  const benefitCards = Array.isArray(treatment.benefits) && treatment.benefits.length > 0
    ? treatment.benefits.map((b: any, idx: number) => {
        if (typeof b === 'string') {
          return {
            title: b,
            text: '',
            image: '/images/treatment-herbal-medicine.webp',
            icon: 'leaf',
          };
        }
        return {
          title: b.title || `Benefit ${idx + 1}`,
          text: b.text || b.description || '',
          image: b.image ? getImageDisplayUrl(b.image) : '/images/treatment-herbal-medicine.webp',
          icon: b.icon || 'leaf',
        };
      })
    : [];

  const idealForItems = Array.isArray(treatment.indications) && treatment.indications.length > 0
    ? treatment.indications.map((item: any) => {
        if (typeof item === 'string') {
          return { title: item, subtitle: 'Target indication for treatment', icon: 'leaf' };
        }
        return {
          title: item.title || String(item),
          subtitle: item.subtitle || 'Target indication for treatment',
          icon: item.icon || 'leaf',
        };
      })
    : [];

  const journeySteps = Array.isArray(treatment.procedureSteps) && treatment.procedureSteps.length > 0
    ? treatment.procedureSteps.map((stepItem: any, idx: number) => {
        const stepNum = String(idx + 1).padStart(2, '0');
        if (typeof stepItem === 'string') {
          return { step: stepNum, phase: `Phase ${idx + 1}`, title: `Step ${idx + 1}`, text: stepItem, icon: 'sparkles' };
        }
        return {
          step: stepItem.step || stepNum,
          phase: stepItem.phase || `Phase ${idx + 1}`,
          title: stepItem.title || stepItem.step || `Step ${idx + 1}`,
          text: stepItem.text || stepItem.detail || '',
          icon: stepItem.icon || 'sparkles',
        };
      })
    : [];

  const expectItems = Array.isArray(treatment.expectations) && treatment.expectations.length > 0
    ? treatment.expectations
    : Array.isArray(treatment.aftercare) && treatment.aftercare.length > 0
    ? treatment.aftercare
    : [];

  const includeItems = Array.isArray(treatment.inclusions) && treatment.inclusions.length > 0
    ? treatment.inclusions
    : Array.isArray(treatment.preparation) && treatment.preparation.length > 0
    ? treatment.preparation
    : [];

  const navTabs = [
    { id: "overview", label: "Overview" },
    ...(benefitCards.length > 0 ? [{ id: "benefits", label: "Benefits" }] : []),
    ...(idealForItems.length > 0 ? [{ id: "who-is-it-for", label: "Indications" }] : []),
    ...(journeySteps.length > 0 ? [{ id: "treatment-process", label: "Treatment Process" }] : []),
    ...(expectItems.length > 0 || includeItems.length > 0 ? [{ id: "what-to-expect", label: "Inclusions" }] : []),
  ];

  return (
    <div className="treatment-detail-luxury-wrapper">
      {/* Hero Banner Header Section */}
      <section className="treatment-hero-luxury" aria-labelledby="treatment-detail-title">
        <div className="treatment-hero-ambient-glow" aria-hidden="true" />
        
        <div className="treatment-hero-container">
          <div className="treatment-hero-content">
            <div className="treatment-eyebrow-badge">
              <span>AYURVEDIC THERAPY</span>
            </div>

            <h1 id="treatment-detail-title" className="treatment-hero-heading">
              {treatment.title}
            </h1>

            {subtitle && <p className="treatment-hero-subheading">{subtitle}</p>}
            <p className="treatment-hero-description">{treatment.fullDescription || treatment.text || treatment.shortDescription}</p>

            {/* Quick Metrics Bar */}
            <div className="treatment-facts-bar">
              {duration && (
                <div className="fact-item">
                  <span className="fact-icon"><Clock size={16} /></span>
                  <div>
                    <span className="fact-label">Duration</span>
                    <strong className="fact-value">{duration}</strong>
                  </div>
                </div>
              )}
              <div className="fact-item">
                <span className="fact-icon"><Leaf size={16} /></span>
                <div>
                  <span className="fact-label">Purity</span>
                  <strong className="fact-value">100% Herbal</strong>
                </div>
              </div>
              <div className="fact-item">
                <span className="fact-icon"><UserCheck size={16} /></span>
                <div>
                  <span className="fact-label">Care</span>
                  <strong className="fact-value">Physician Led</strong>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="treatment-hero-actions">
              <Link className="btn btn-primary treatment-btn-book" href="/appointment" style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
                <span>Book Consultation</span>
                <ArrowRight size={14} />
              </Link>
              <Link className="btn btn-outline treatment-btn-enquire" href="/contact-us">
                <span>Enquire Treatment</span>
              </Link>
            </div>
          </div>

          {/* Hero Visual Card */}
          <div className="treatment-hero-media">
            <div className="treatment-media-frame">
              <Image
                src={bannerImage}
                alt={treatment.title}
                fill
                priority
                sizes="(max-width: 900px) 100vw, 48vw"
                className="treatment-hero-img"
                style={{ objectFit: "cover", objectPosition: "center" }}
              />
              <div className="treatment-media-overlay" />
            </div>
          </div>
        </div>
      </section>

      {/* Sticky Quick Nav Bar */}
      {navTabs.length > 1 && (
        <nav className="treatment-sticky-tabs" aria-label="Treatment detail navigation">
          <div className="treatment-tabs-container">
            {navTabs.map((tab) => (
              <a
                key={tab.id}
                href={`#${tab.id}`}
                className={`treatment-tab-link ${activeTab === tab.id ? "active" : ""}`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </a>
            ))}
          </div>
        </nav>
      )}

      {/* Main Content Body */}
      <div className="treatment-detail-body">
        {/* Section 1: Overview */}
        <section className="treatment-section-block" id="overview">
          <div className="treatment-overview-grid">
            <div className="overview-text-col" style={{ maxWidth: "100%" }}>
              <div className="section-eyebrow">OVERVIEW</div>
              <h2 className="section-title-luxury">
                {treatment.title} Clinical Protocol
              </h2>
              <p className="overview-paragraph" style={{ whiteSpace: "pre-line" }}>
                {treatment.fullDescription || treatment.shortDescription}
              </p>
            </div>
          </div>
        </section>

        {/* Section 2: Benefits (Only rendered if CMS data exists) */}
        {benefitCards.length > 0 && (
          <section className="treatment-section-block" id="benefits">
            <div className="section-center-heading">
              <span className="section-eyebrow">THERAPEUTIC ADVANTAGES</span>
              <h2 className="section-title-luxury">Key Health & Wellness Benefits</h2>
            </div>

            <div className="benefits-card-grid">
              {benefitCards.map((card: any) => (
                <article className="benefit-card-luxury" key={card.title}>
                  <div className="benefit-card-body">
                    <h3>{card.title}</h3>
                    {card.text && <p>{card.text}</p>}
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}

        {/* Section 3: Indications (Only rendered if CMS data exists) */}
        {idealForItems.length > 0 && (
          <section className="treatment-section-block" id="who-is-it-for">
            <div className="ideal-candidates-panel">
              <div className="ideal-content-side">
                <span className="section-eyebrow">TARGET INDICATIONS</span>
                <h2 className="section-title-luxury">Who Can Benefit Most?</h2>
                <p className="ideal-lead">This therapeutic regimen is specifically recommended for:</p>

                <div className="ideal-list-grid">
                  {idealForItems.map((item: any) => (
                    <div className="ideal-item-card" key={item.title}>
                      <span className="ideal-item-icon">
                        <CheckCircle2 size={16} color="#c88922" />
                      </span>
                      <div className="ideal-item-text">
                        <h4>{item.title}</h4>
                        {item.subtitle && item.subtitle !== 'Target indication for treatment' && <p>{item.subtitle}</p>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Section 4: Treatment Process (Only rendered if CMS data exists) */}
        {journeySteps.length > 0 && (
          <section className="treatment-section-block" id="treatment-process">
            <div className="section-center-heading">
              <span className="section-eyebrow">THERAPEUTIC ROADMAP</span>
              <h2 className="section-title-luxury">Structured Procedure Steps</h2>
            </div>

            <div className="process-timeline-track">
              {journeySteps.map((stepItem: any) => (
                <article className="process-step-card" key={stepItem.step}>
                  <div className="process-step-header">
                    <span className="step-num">{stepItem.step}</span>
                  </div>
                  <span className="step-phase">{stepItem.phase}</span>
                  <h3 className="step-title">{stepItem.title}</h3>
                  {stepItem.text && <p className="step-text">{stepItem.text}</p>}
                </article>
              ))}
            </div>
          </section>
        )}

        {/* Section 5: What to Expect & Inclusions (Only rendered if CMS data exists) */}
        {(expectItems.length > 0 || includeItems.length > 0) && (
          <section className="treatment-section-block" id="what-to-expect">
            <div className="expect-inclusions-grid">
              {expectItems.length > 0 && (
                <div className="expect-dark-card">
                  <div className="expect-card-head">
                    <span className="card-tag">EXPECTATION & AFTERCARE</span>
                    <h2>Post-Care Guidelines</h2>
                  </div>
                  <ul className="expect-check-list">
                    {expectItems.map((item: string) => (
                      <li key={item}>
                        <span className="check-icon"><Check size={14} /></span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {includeItems.length > 0 && (
                <div className="include-light-card">
                  <div className="expect-card-head">
                    <span className="card-tag gold">INCLUSIONS & PREPARATION</span>
                    <h2>Preparation & Inclusions</h2>
                  </div>
                  <ul className="expect-check-list">
                    {includeItems.map((item: string) => (
                      <li key={item}>
                        <span className="check-icon gold"><Check size={14} /></span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </section>
        )}

        {/* Section 6: Consultation CTA Banner */}
        <section className="treatment-cta-luxury">
          <div className="cta-ambient-glow" aria-hidden="true" />
          <div className="cta-content-wrapper">
            <span className="cta-eyebrow">TAKE THE FIRST STEP</span>
            <h2 className="cta-heading">Ready to Begin Your Personalized Healing Journey?</h2>
            <p className="cta-text">
              Consult with our renowned Ayurvedic physicians to receive a customized treatment plan tailored to your specific health needs.
            </p>
            <div className="cta-action-group">
              <Link className="btn btn-primary cta-btn-gold" href="/appointment" style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
                <span>Book Doctor Consultation</span>
                <ArrowRight size={14} />
              </Link>
              <a href="tel:+919447003191" className="btn btn-outline cta-btn-phone" style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
                <Phone size={14} />
                <span>Call +91 94470 03191</span>
              </a>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
