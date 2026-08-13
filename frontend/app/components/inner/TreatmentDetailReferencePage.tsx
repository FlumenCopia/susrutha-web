"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

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
  };
};

const benefitCards = [
  {
    title: "Cellular Detoxification",
    text: "Deeply eliminates accumulated ama (metabolic toxins) from tissues and channels.",
    image: "/images/treatment-herbal-medicine.webp",
    icon: "🌿",
  },
  {
    title: "Dosha Harmony",
    text: "Restores optimal physiological balance across Vata, Pitta, and Kapha bio-energies.",
    image: "/images/treatment-sirodhara.webp",
    icon: "☯️",
  },
  {
    title: "Immune System Boost",
    text: "Rejuvenates Ojas (vital vigor), fortifying your body's natural defense mechanisms.",
    image: "/images/faq-ayurveda-still-life.webp",
    icon: "🛡️",
  },
  {
    title: "Enhanced Longevity",
    text: "Revitalizes organ function and cellular regeneration for sustained vitality.",
    image: "/images/treatment-panchakarma.webp",
    icon: "✨",
  },
];

const idealForItems = [
  { title: "Chronic Fatigue & Burnout", subtitle: "Low energy, mental brain fog, and systemic exhaustion", icon: "🔋" },
  { title: "Stress & Anxiety Imbalance", subtitle: "High cortisol levels, insomnia, and nervous system tension", icon: "🧘" },
  { title: "Digestive & Metabolic Disorders", subtitle: "Bloating, sluggish metabolism, hyperacidity, and IBS symptoms", icon: "🌱" },
  { title: "Skin & Allergic Manifestations", subtitle: "Eczema, psoriasis, acne, and systemic inflammation", icon: "🌸" },
  { title: "Joint & Musculoskeletal Stiffness", subtitle: "Arthritic pain, spinal stiffness, and neuromuscular aches", icon: "🦴" },
];

const journeySteps = [
  {
    step: "01",
    phase: "Purva Karma",
    title: "Preparation Phase",
    text: "Oleation (Snehana) and sweating (Swedana) to loosen deep-seated toxins and soften channels.",
    icon: "🫗",
  },
  {
    step: "02",
    phase: "Pradhana Karma",
    title: "Core Detoxification",
    text: "Physician-guided therapeutic cleansing techniques customized strictly to your body constitution.",
    icon: "🏺",
  },
  {
    step: "03",
    phase: "Paschat Karma",
    title: "Post-Detox Care",
    text: "Gradual restoration of digestive fire (Agni) through tailored nourishment and herbal formulations.",
    icon: "🍵",
  },
  {
    step: "04",
    phase: "Rasayana",
    title: "Cellular Rejuvenation",
    text: "Potent anti-aging therapies that rebuild tissues, enhance immunity, and restore vitality.",
    icon: "✨",
  },
  {
    step: "05",
    phase: "Pathya Apathya",
    title: "Lifestyle Protocol",
    text: "Personalized dietary directives, daily routines (Dinacharya), and preventative care guidelines.",
    icon: "📜",
  },
];

const expectItems = [
  "Comprehensive initial diagnostic consultation with senior Vaidyas",
  "Tailored herbal oils, decoctions, and classical Ayurvedic medicines",
  "Therapeutic treatments in private, tranquil treatment suites",
  "Daily physician monitoring and progress assessments",
  "Customized Sattvic diet planned by Ayurvedic nutritionists",
];

const includeItems = [
  "All daily Panchakarma / specialty therapy sessions",
  "Handcrafted herbal oils & therapeutic decoctions",
  "Organic Sattvic meals tailored to your dosha",
  "Daily guided Yoga & Pranayama sessions",
  "Post-treatment discharge consultation & prescription",
];

function slugLabel(slug: string) {
  return slug
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

export function TreatmentDetailReferencePage({ treatment }: TreatmentDetailReferencePageProps) {
  const [activeTab, setActiveTab] = useState("overview");

  const subtitle = treatment.slug === "panchakarma" ? "The Ultimate Ayurvedic Detox" : treatment.shortDescription || treatment.meta || "Authentic Ayurvedic Therapy";
  const duration = treatment.slug === "panchakarma" ? "7 - 21 Days" : treatment.durationMinutes ? `${treatment.durationMinutes} Mins` : "5 - 14 Days";
  const rawImage = treatment.coverImage || treatment.image || "/images/treatment-panchakarma.webp";
  const bannerImage = getImageDisplayUrl(rawImage);

  const navTabs = [
    { id: "overview", label: "Overview" },
    { id: "benefits", label: "Benefits" },
    { id: "who-is-it-for", label: "Who Is It For?" },
    { id: "treatment-process", label: "Treatment Process" },
    { id: "what-to-expect", label: "What to Expect" },
  ];

  return (
    <div className="treatment-detail-luxury-wrapper">
      {/* Hero Banner Header Section */}
      <section className="treatment-hero-luxury" aria-labelledby="treatment-detail-title">
        <div className="treatment-hero-ambient-glow" aria-hidden="true" />
        
        <div className="treatment-hero-container">
          <div className="treatment-hero-content">
            <nav className="treatment-breadcrumb-nav" aria-label="Breadcrumb">
              <Link href="/">Home</Link>
              <span className="bc-sep">/</span>
              <Link href="/treatments">Treatments</Link>
              <span className="bc-sep">/</span>
              <span className="bc-current">{treatment.title || slugLabel(treatment.slug)}</span>
            </nav>

            <div className="treatment-eyebrow-badge">
              <span className="badge-dot" />
              <span>HERITAGE KERALA AYURVEDIC THERAPY</span>
            </div>

            <h1 id="treatment-detail-title" className="treatment-hero-heading">
              {treatment.title}
            </h1>

            <p className="treatment-hero-subheading">{subtitle}</p>
            <p className="treatment-hero-description">{treatment.text}</p>

            {/* Quick Metrics Bar */}
            <div className="treatment-facts-bar">
              <div className="fact-item">
                <span className="fact-icon"><i className="fa-regular fa-clock" /></span>
                <div>
                  <span className="fact-label">Duration</span>
                  <strong className="fact-value">{duration}</strong>
                </div>
              </div>
              <div className="fact-divider" />
              <div className="fact-item">
                <span className="fact-icon"><i className="fa-solid fa-leaf" /></span>
                <div>
                  <span className="fact-label">Purity</span>
                  <strong className="fact-value">100% Herbal</strong>
                </div>
              </div>
              <div className="fact-divider" />
              <div className="fact-item">
                <span className="fact-icon"><i className="fa-solid fa-user-doctor" /></span>
                <div>
                  <span className="fact-label">Care</span>
                  <strong className="fact-value">Physician Led</strong>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="treatment-hero-actions">
              <Link className="btn btn-primary treatment-btn-book" href="/appointment">
                <span>Book Consultation</span>
                <i className="fa-solid fa-arrow-right" aria-hidden="true" style={{ marginLeft: "6px" }} />
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
              />
              <div className="treatment-media-overlay" />
              
              <div className="treatment-floating-badge">
                <span className="floating-badge-icon"><i className="fa-solid fa-scroll" /></span>
                <div>
                  <strong>Classical Protocol</strong>
                  <span>Authentic Kerala Lineage</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sticky Quick Nav Bar */}
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

      {/* Main Content Body */}
      <div className="treatment-detail-body">
        {/* Section 1: Overview */}
        <section className="treatment-section-block" id="overview">
          <div className="treatment-overview-grid">
            <div className="overview-text-col">
              <div className="section-eyebrow">OVERVIEW</div>
              <h2 className="section-title-luxury">
                Deep Cellular Detoxification & Total Restoration
              </h2>
              <p className="overview-paragraph">
                {treatment.title} is a cornerstone of classical Ayurveda, designed to purify the body at a fundamental cellular level. By gently eliminating accumulated Ama (metabolic toxins) and clearing blocked channels (Srotas), this therapeutic regimen reinstates constitutional equilibrium and invigorates overall vital energy.
              </p>
              
              <blockquote className="ayurveda-wisdom-quote">
                <p>&ldquo;When toxins are thoroughly eliminated from deep tissues, digestion is restored, mind becomes serene, and true biological rejuvenation unfolds.&rdquo;</p>
                <cite>— Classical Samhita Wisdom</cite>
              </blockquote>
            </div>

            <div className="overview-highlight-card">
              <div className="highlight-card-head">
                <span className="highlight-icon">🌱</span>
                <h3>Why Choose Susrutha Care?</h3>
              </div>
              <ul className="highlight-list">
                <li>
                  <strong>Senior Vaidya Oversight:</strong> Every treatment plan is personally calibrated by experienced Ayurvedic doctors.
                </li>
                <li>
                  <strong>Authentic Formulations:</strong> We utilize organic, freshly prepared herbal oils, kashayams, and lehyams.
                </li>
                <li>
                  <strong>Serene Healing Ambiance:</strong> Designed to provide deep mental rest and physical tranquility during therapy.
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 2: Benefits */}
        <section className="treatment-section-block" id="benefits">
          <div className="section-center-heading">
            <span className="section-eyebrow">THERAPEUTIC ADVANTAGES</span>
            <h2 className="section-title-luxury">Key Health & Wellness Benefits</h2>
            <p className="section-subtitle">Experience targeted physiological and mental rejuvenation through classical therapies</p>
          </div>

          <div className="benefits-card-grid">
            {benefitCards.map((card) => (
              <article className="benefit-card-luxury" key={card.title}>
                <div className="benefit-img-wrapper">
                  <Image
                    src={card.image}
                    alt={card.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 25vw"
                    className="benefit-img"
                  />
                  <div className="benefit-img-overlay" />
                </div>
                <div className="benefit-card-body">
                  <h3>{card.title}</h3>
                  <p>{card.text}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Section 3: Who Is It For */}
        <section className="treatment-section-block" id="who-is-it-for">
          <div className="ideal-candidates-panel">
            <div className="ideal-media-side">
              <Image
                src="/images/ayurveda-hero.webp"
                alt="Ayurvedic Wellness Candidate"
                fill
                sizes="(max-width: 900px) 100vw, 40vw"
                className="ideal-img"
              />
              <div className="ideal-media-overlay" />
              <div className="ideal-badge-float">
                <span>Personalized Consultation & Assessment</span>
              </div>
            </div>

            <div className="ideal-content-side">
              <span className="section-eyebrow">TARGET INDICATIONS</span>
              <h2 className="section-title-luxury">Who Can Benefit Most?</h2>
              <p className="ideal-lead">This therapeutic regimen is specifically recommended for individuals experiencing:</p>

              <div className="ideal-list-grid">
                {idealForItems.map((item) => (
                  <div className="ideal-item-card" key={item.title}>
                    <div>
                      <h4>{item.title}</h4>
                      <p>{item.subtitle}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Section 4: Treatment Process */}
        <section className="treatment-section-block" id="treatment-process">
          <div className="section-center-heading">
            <span className="section-eyebrow">THERAPEUTIC ROADMAP</span>
            <h2 className="section-title-luxury">A Structured 5-Step Healing Journey</h2>
            <p className="section-subtitle">A systematic, multi-phase protocol ensuring safety, efficacy, and lasting health benefits</p>
          </div>

          <div className="process-timeline-track">
            {journeySteps.map((stepItem) => (
              <article className="process-step-card" key={stepItem.step}>
                <div className="process-step-header">
                  <span className="step-num">{stepItem.step}</span>
                </div>
                <span className="step-phase">{stepItem.phase}</span>
                <h3 className="step-title">{stepItem.title}</h3>
                <p className="step-text">{stepItem.text}</p>
              </article>
            ))}
          </div>
        </section>

        {/* Section 5: What to Expect & Includes */}
        <section className="treatment-section-block" id="what-to-expect">
          <div className="expect-inclusions-grid">
            <div className="expect-dark-card">
              <div className="expect-card-head">
                <span className="card-tag">EXPECTATION</span>
                <h2>What To Expect During Stay</h2>
              </div>
              <ul className="expect-check-list">
                {expectItems.map((item) => (
                  <li key={item}>
                    <span className="check-icon">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="include-light-card">
              <div className="expect-card-head">
                <span className="card-tag gold">INCLUSIONS</span>
                <h2>What Your Program Includes</h2>
              </div>
              <ul className="expect-check-list">
                {includeItems.map((item) => (
                  <li key={item}>
                    <span className="check-icon gold">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Section 6: Consultation CTA Banner */}
        <section className="treatment-cta-luxury">
          <div className="cta-ambient-glow" aria-hidden="true" />
          <div className="cta-content-wrapper">
            <span className="cta-eyebrow">TAKE THE FIRST STEP</span>
            <h2 className="cta-heading">Ready to Begin Your Personalized Healing Journey?</h2>
            <p className="cta-text">
              Consult with our renowned Ayurvedic physicians to receive a customized treatment plan tailored to your specific health needs and body constitution.
            </p>
            <div className="cta-action-group">
              <Link className="btn btn-primary cta-btn-gold" href="/appointment">
                <span>Book Doctor Consultation</span>
                <span aria-hidden="true">&rarr;</span>
              </Link>
              <a href="tel:+919447003191" className="btn btn-outline cta-btn-phone">
                <span>
                  <i className="fa-solid fa-phone" aria-hidden="true" style={{ marginRight: "6px" }} />
                  Call +91 94470 03191
                </span>
              </a>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
