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
          {/* Top Banner Tag */}
          <div className="spotlight-top-tag-wrap">
            <span className="spotlight-top-tag">
              <span className="live-pulse-dot" />
              Official Cross-Continental Healthcare Alliance
            </span>
          </div>

          {/* Dual-Node Interactive Visual Bridge */}
          <div className="affiliations-spotlight-bridge">
            {/* Left Node: Susrutha Ayurveda */}
            <div className="bridge-node-premium left">
              <div className="bridge-node-top">
                <div className="bridge-icon-wrap-gold">
                  <i className="fa-solid fa-hospital" />
                </div>
                <span className="node-badge-gold">55+ Yrs Heritage</span>
              </div>
              <div className="bridge-node-info">
                <h4>Susrutha Ayurveda</h4>
                <p className="node-location">
                  <i className="fa-solid fa-location-dot" /> Kattakada &bull; Kowdiar, Kerala, India
                </p>
                <div className="node-tags-wrap">
                  <span className="node-tag">Vaidya Lineage</span>
                  <span className="node-tag">Ayurveda Gramam</span>
                  <span className="node-tag">Classical Panchakarma</span>
                </div>
              </div>
            </div>

            {/* Central Animated Synergy Hub */}
            <div className="bridge-center-synergy">
              <div className="synergy-pulse-ring">
                <div className="synergy-orb">
                  <i className="fa-solid fa-right-left" />
                </div>
              </div>
              <span className="synergy-label">Global Alliance</span>
              <span className="synergy-sublabel">USA &bull; India</span>
            </div>

            {/* Right Node: Dr. Satish Asotra */}
            <div className="bridge-node-premium right">
              <div className="bridge-node-top">
                <div className="bridge-icon-wrap-gold">
                  <i className="fa-solid fa-user-doctor" />
                </div>
                <span className="node-badge-gold">Ph.D. &bull; CAS Led</span>
              </div>
              <div className="bridge-node-info">
                <h4>Dr. Satish Asotra</h4>
                <p className="node-location">
                  <i className="fa-solid fa-location-dot" /> California, United States
                </p>
                <div className="node-tags-wrap">
                  <span className="node-tag">Biochemist &bull; Physiologist</span>
                  <span className="node-tag">Global Tele-Care</span>
                  <span className="node-tag">DrAsotra.com</span>
                </div>
              </div>
            </div>
          </div>

          {/* Spotlight Details Grid */}
          <div className="affiliations-spotlight-body">
            {/* Left Content Column */}
            <div className="spotlight-left-column">
              <div className="spotlight-prestige-badge">
                <i className="fa-solid fa-award" />
                <span>Where Tradition Meets Scientific Innovation</span>
              </div>

              <h2 className="spotlight-heading">
                Bridging Ancient Vedic Wisdom With Modern Physiological Science
              </h2>

              <p className="spotlight-lead">
                Rooted in the authentic teachings of venerated masters <strong>Sri. P. Krishna Pillai</strong>, <strong>Sri. P.K. Pillai</strong>, and the late <strong>Prof. Dr. Krishnankutty Nair</strong>, Susrutha Ayurveda represents over five decades of clinical dedication.
              </p>

              <p className="spotlight-desc">
                In strategic international collaboration with <strong>Dr. Satish Asotra (Ph.D., MBA, AHC, CAS)</strong>, we bridge this sacred healing heritage with North American medical science, physiology, and global holistic care.
              </p>

              {/* 3 Luxury Feature Cards */}
              <div className="spotlight-feature-cards">
                <div className="spotlight-feat-card">
                  <div className="feat-card-num">01</div>
                  <div className="feat-card-content">
                    <h5>Cross-Continental Healthcare Gateway</h5>
                    <p>
                      Direct telemedicine evaluations for US and global patients, followed by coordinated inpatient admission to Susrutha Ayurveda Gramam in Kerala.
                    </p>
                  </div>
                </div>

                <div className="spotlight-feat-card">
                  <div className="feat-card-num">02</div>
                  <div className="feat-card-content">
                    <h5>Integrative Biomedical Understanding</h5>
                    <p>
                      Harmonizing classical Kerala Rasayanas and treatments with modern cellular physiology and biochemical pathways for evidence-informed wellness.
                    </p>
                  </div>
                </div>

                <div className="spotlight-feat-card">
                  <div className="feat-card-num">03</div>
                  <div className="feat-card-content">
                    <h5>Academic &amp; Educational Discourse</h5>
                    <p>
                      Collaborative knowledge dissemination and workshops connected with networks including Hindu University of America &amp; California College of Ayurveda.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Executive Profile Card */}
            <div className="affiliations-practitioner-card">
              <div className="practitioner-verified-ribbon">
                <i className="fa-solid fa-shield-check" />
                <span>Verified Global Collaborator</span>
              </div>

              <div className="practitioner-header">
                <div className="practitioner-avatar-badge">
                  SA
                </div>
                <div className="practitioner-header-text">
                  <h3 className="practitioner-name">Dr. Satish Asotra</h3>
                  <div className="practitioner-title-role">
                    Physiologist &bull; Biochemist &bull; Ayurvedic Specialist
                  </div>
                  <div className="practitioner-geo">
                    <i className="fa-solid fa-location-pin" /> California, USA
                  </div>
                </div>
              </div>

              <div className="practitioner-creds-tags">
                <span className="cred-tag">Ph.D. Biochemistry</span>
                <span className="cred-tag">Medical Physiologist</span>
                <span className="cred-tag">MBA</span>
                <span className="cred-tag">CAS (Clinical Specialist)</span>
                <span className="cred-tag">AHC</span>
              </div>

              <div className="practitioner-metrics-row">
                <div className="practitioner-metric">
                  <strong>30+ Yrs</strong>
                  <span>Medical Sciences</span>
                </div>
                <div className="practitioner-metric">
                  <strong>Published</strong>
                  <span>Scientific Research</span>
                </div>
                <div className="practitioner-metric">
                  <strong>Global</strong>
                  <span>Clinical Reach</span>
                </div>
              </div>

              <blockquote className="practitioner-quote">
                &ldquo;Integrating Eastern Ayurvedic traditions with Western medical science to empower individuals with personalized, root-cause healing.&rdquo;
              </blockquote>

              <a
                href="https://www.drasotra.com/affiliations"
                target="_blank"
                rel="noopener noreferrer"
                className="practitioner-link-btn"
              >
                <span>Explore Dr. Asotra&apos;s Official Portal</span>
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
