"use client";

import Link from "next/link";
import "./affiliations.css";

const collaborationPillars = [
  {
    icon: "fa-solid fa-earth-americas",
    title: "Global Patient Care & Concierge",
    text: "Seamless care pathways for US, North American, and international seekers requiring preliminary Ayurvedic consultations, personalized health assessments, and guided inpatient admissions at Susrutha Ayurveda Village.",
    points: [
      "Remote video evaluations & lifestyle counsel",
      "Direct medical admission coordination in Kerala",
      "Comprehensive pre-arrival & post-treatment follow-up",
    ],
  },
  {
    icon: "fa-solid fa-dna",
    title: "Integrative Physiology & Science",
    text: "Bridging classical Kerala Ayurvedic formulations with modern biochemistry, cellular physiology, and medical sciences to deliver evidence-backed holistic care.",
    points: [
      "Biochemist & physiologist-guided assessments",
      "Mechanistic understanding of classical Rasayanas",
      "Root-cause protocols for chronic & metabolic balance",
    ],
  },
  {
    icon: "fa-solid fa-graduation-cap",
    title: "Academic Exchange & Outreach",
    text: "Educational mentorship, clinical discourse, and global workshops connecting Eastern clinical wisdom with academic networks including Hindu University of America & California College of Ayurveda.",
    points: [
      "Curated workshops & masterclasses for students",
      "Philosophical and clinical dialogue across continents",
      "Dissemination of authentic Panchakarma knowledge",
    ],
  },
  {
    icon: "fa-solid fa-spa",
    title: "Classical Kerala Panchakarma",
    text: "Facilitating transformative healing journeys for overseas individuals experiencing burnout, neuro-musculoskeletal disorders, and chronic degenerative imbalances.",
    points: [
      "Physician-supervised inpatient detox regimes",
      "Authentic medicated herbal oils and droni therapies",
      "Rejuvenating tranquil village environment in Kerala",
    ],
  },
];

const lineageTeachers = [
  {
    name: "Sri. P. Krishna Pillai & Sri. P.K. Pillai",
    role: "Foundational Ayurvedic Vaidyas & Lineage Masters",
  },
  {
    name: "Late Prof. Dr. Krishnankutty Nair",
    role: "Eminent Ayurvedic Luminary & Teacher",
  },
  {
    name: "Prof. Dr. Krishnakumar K.",
    role: "Chief Medical Officer & Hospital Director (MD Ayur, 24+ Yrs)",
  },
  {
    name: "Dr. Sreeja Krishna S.",
    role: "Senior Consultant Physician & Panchakarma Specialist",
  },
];

export function AffiliationsPage() {
  return (
    <div className="affiliations-page">
      {/* 1. Full-Screen Serene Hero Section */}
      <section className="conditions-hero-serene" aria-labelledby="affiliations-title">
        <div
          className="conditions-hero-serene-bg"
          style={{ backgroundImage: `url('/images/banner_holistic_health.jpg')` }}
        />
        <div className="conditions-hero-serene-overlay" />

        <div className="conditions-hero-serene-content">
          {/* <nav className="conditions-hero-serene-nav" aria-label="Breadcrumb">
            <Link href="/">HOME</Link>
            <span>/</span>
            <span>INTERNATIONAL COLLABORATION</span>
          </nav> */}

          <div className="conditions-hero-serene-middle-wrapper">
            <div className="conditions-hero-serene-middle">
              <p className="conditions-hero-serene-quote">
                Susrutha Ayurveda (Kerala, India) unites with <strong>Dr. Satish Asotra</strong> (California, USA) — bridging over five decades of classical Ayurvedic lineage with Western medical science, physiology, and global patient care.
              </p>
            </div>

            <div className="conditions-hero-serene-right-stats" aria-label="Affiliation statistics">
              <div className="conditions-hero-stat-card">
                <i className="fa-solid fa-earth-americas" />
                <div className="conditions-hero-stat-info">
                  <strong>USA &bull; IND</strong>
                  <span>Global Presence</span>
                </div>
              </div>

              <div className="conditions-hero-stat-card">
                <i className="fa-solid fa-microscope" />
                <div className="conditions-hero-stat-info">
                  <strong>30+ Yrs</strong>
                  <span>Medical Sciences</span>
                </div>
              </div>

              <div className="conditions-hero-stat-card">
                <i className="fa-solid fa-seedling" />
                <div className="conditions-hero-stat-info">
                  <strong>55+ Yrs</strong>
                  <span>Ayurvedic Heritage</span>
                </div>
              </div>
            </div>
          </div>

          <div className="conditions-hero-serene-bottom">
            <h1 id="affiliations-title" className="conditions-hero-serene-title">
              INTERNATIONAL AFFILIATIONS
            </h1>
          </div>
        </div>
      </section>

      {/* 2. Synergy Spotlight Section */}
      <section className="affiliations-section">
        <div className="affiliations-spotlight-card">
          {/* Visual Bridge */}
          <div className="affiliations-spotlight-bridge">
            <div className="bridge-node">
              <div className="bridge-icon-wrap">
                <i className="fa-solid fa-hospital" />
              </div>
              <div>
                <strong>Susrutha Ayurveda Hospital &amp; Gramam</strong>
                <span>Kerala, India &bull; 55+ Yrs Lineage</span>
              </div>
            </div>

            <div className="bridge-connector">
              <i className="fa-solid fa-arrows-left-right" />
              <span>International Alliance</span>
            </div>

            <div className="bridge-node">
              <div className="bridge-icon-wrap">
                <i className="fa-solid fa-user-doctor" />
              </div>
              <div>
                <strong>Dr. Satish Asotra Holistic Health</strong>
                <span>California, USA &bull; DrAsotra.com</span>
              </div>
            </div>
          </div>

          {/* Spotlight Details */}
          <div className="affiliations-spotlight-body">
            <div>
              <span className="spotlight-eyebrow">Where Tradition Meets Innovation</span>
              <h2 className="spotlight-heading">
                Bridging Ancient Vedic Wisdom With Modern Physiological Science
              </h2>
              <p className="spotlight-desc">
                Rooted in the authentic teachings of venerable masters Sri. P. Krishna Pillai, Sri. P.K. Pillai, and the late 
                Prof. Dr. Krishnankutty Nair, Susrutha Ayurveda has stood as a beacon of clinical excellence in South India.
              </p>
              <p className="spotlight-desc">
                Through our collaboration with <strong>Dr. Satish Asotra (Ph.D., MBA, AHC, CAS)</strong>, we bring this sacred healing 
                tradition to North America and the international community — harmonizing ancient diagnosis with biochemical insight 
                for global patients.
              </p>

              <ul className="spotlight-highlights-list">
                <li>
                  <i className="fa-solid fa-circle-check" />
                  <span><strong>Direct US-India Healthcare Gateway:</strong> Pre-treatment consultations and seamless hospital admissions in Kerala.</span>
                </li>
                <li>
                  <i className="fa-solid fa-circle-check" />
                  <span><strong>Evidence &amp; Clinical Quality:</strong> Protocol reviews blending clinical observation with physiological principles.</span>
                </li>
                <li>
                  <i className="fa-solid fa-circle-check" />
                  <span><strong>International Educational Outreach:</strong> Mentorship, webinars, and collaborative workshops for global learners.</span>
                </li>
              </ul>
            </div>

            {/* Dr. Asotra Profile Card */}
            <div className="affiliations-practitioner-card">
              <div className="practitioner-header">
                <div className="practitioner-avatar-badge">
                  SA
                </div>
                <div>
                  <h3 className="practitioner-name">Dr. Satish Asotra</h3>
                  <div className="practitioner-title-role">
                    Ayurvedic Health Practitioner &bull; Scientist
                  </div>
                </div>
              </div>

              <div className="practitioner-creds-tags">
                <span className="cred-tag">Ph.D. Biochemistry</span>
                <span className="cred-tag">Physiologist</span>
                <span className="cred-tag">MBA</span>
                <span className="cred-tag">CAS (Clinical Specialist)</span>
                <span className="cred-tag">AHC</span>
              </div>

              <p className="practitioner-bio">
                With over 30 years in healthcare, medical research, pharmaceutical leadership, and clinical Ayurveda, Dr. Asotra 
                champions self-healthcare and root-cause balance, connecting global seekers to Susrutha’s classical healing legacy.
              </p>

              <a
                href="https://www.drasotra.com/affiliations"
                target="_blank"
                rel="noopener noreferrer"
                className="practitioner-link-btn"
              >
                <span>View Official Affiliation at DrAsotra.com</span>
                <i className="fa-solid fa-arrow-up-right-from-square" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Four Core Pillars of the Partnership */}
      <section className="affiliations-pillars-section">
        <div className="section-header-center">
          <span className="section-eyebrow">Strategic Dimensions</span>
          <h2 className="section-title">Pillars of Our Global Collaboration</h2>
          <p className="section-subtitle">
            How our cross-continental alliance empowers international patients, researchers, and seekers of holistic longevity.
          </p>
        </div>

        <div className="pillars-grid">
          {collaborationPillars.map((p) => (
            <div key={p.title} className="pillar-card">
              <div className="pillar-card-icon">
                <i className={p.icon} />
              </div>
              <h3 className="pillar-card-title">{p.title}</h3>
              <p className="pillar-card-text">{p.text}</p>
              <ul className="pillar-card-points">
                {p.points.map((pt) => (
                  <li key={pt}>
                    <i className="fa-solid fa-check" />
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Lineage & Academic Heritage Section */}
      <section className="affiliations-heritage-section">
        <div className="heritage-inner">
          <div>
            <span className="heritage-badge">Lineage &amp; Philosophy</span>
            <h2 className="section-title">55+ Years of Classical Mastery</h2>
            <p className="heritage-card-desc">
              Ayurveda is not merely a medical system; it is the science of conscious living. Susrutha Ayurveda’s hospital and 
              Ayurveda Gramam were founded on uninterrupted authentic gurukula traditions passed through generations of dedicated physicians.
            </p>
            <p className="heritage-card-desc">
              Together with Dr. Satish Asotra and global educational institutions (including connections with Hindu University of America 
              and California College of Ayurveda networks), we preserve the purity of classical texts while translating their wisdom for modern global lifestyles.
            </p>
          </div>

          <div className="heritage-card-box">
            <h3 className="heritage-card-title">Esteemed Lineage &amp; Leadership</h3>
            <div className="heritage-teachers-list">
              {lineageTeachers.map((t) => (
                <div key={t.name} className="teacher-item">
                  <i className="fa-solid fa-leaf" style={{ color: "#c89b3c" }} />
                  <div>
                    <strong>{t.name}</strong>
                    <div><span>{t.role}</span></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 5. Official Verification Box */}
      <div className="affiliations-verification-wrap">
        <div className="verification-box">
          <div className="verification-left">
            <div className="verification-shield-icon">
              <i className="fa-solid fa-shield-halved" />
            </div>
            <div className="verification-text">
              <h3>Official International Partnership Verification</h3>
              <p>
                This collaboration is officially acknowledged and listed on Dr. Satish Asotra’s international platform at 
                <strong> www.drasotra.com/affiliations</strong>.
              </p>
            </div>
          </div>

          <a
            href="https://www.drasotra.com/affiliations"
            target="_blank"
            rel="noopener noreferrer"
            className="verification-btn"
          >
            <span>Visit DrAsotra.com Affiliations</span>
            <i className="fa-solid fa-arrow-up-right-from-square" />
          </a>
        </div>
      </div>

      {/* 6. Global Action / Booking CTA */}
      <section className="affiliations-cta-section">
        <div className="affiliations-cta-box">
          <span className="cta-tag">International Patient Desk</span>
          <h2 className="cta-title">Ready to Begin Your Healing Journey?</h2>
          <p className="cta-text">
            Whether you are seeking remote Ayurvedic counsel, collaborative medical referrals from the USA, or inpatient admission at 
            Susrutha Ayurveda Gramam in Kerala, our international desk is here to assist you.
          </p>

          <div className="cta-actions-group">
            <Link href="/appointment" className="cta-primary-btn">
              <i className="fa-solid fa-calendar-check" />
              <span>Book Appointment / Consultation</span>
            </Link>

            <a
              href="https://wa.me/919447003191?text=Hello%20Susrutha%20Ayurveda,%20I%20am%20inquiring%20about%20international%20consultations%20and%20affiliations"
              target="_blank"
              rel="noopener noreferrer"
              className="cta-secondary-btn"
            >
              <i className="fa-brands fa-whatsapp" style={{ color: "#25D366" }} />
              <span>WhatsApp International Desk</span>
            </a>

            <Link href="/international-patients" className="cta-secondary-btn">
              <i className="fa-solid fa-passport" />
              <span>International Patient Guide</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
