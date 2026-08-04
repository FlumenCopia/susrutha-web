"use client";

import Image from "next/image";
import Link from "next/link";

export function AppointmentHero() {
  return (
    <section className="apt-hero-luxury">
      {/* Ambient background mesh and gold light glows */}
      <div className="apt-hero-mesh-glow" aria-hidden="true" />
      <div className="apt-hero-radial-gold" aria-hidden="true" />
      <div className="apt-hero-pattern-dots" aria-hidden="true" />

      <div className="apt-hero-container-luxury">
        <div className="apt-hero-left">
          <nav className="apt-breadcrumb-luxury" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span className="bc-divider">✦</span>
            <span className="bc-active">Book Consultation</span>
          </nav>

          <div className="apt-luxury-chip">
            <span className="apt-pulse-beacon" />
            <span className="apt-chip-text">INSTANT DOCTOR SLOTS AVAILABLE TODAY</span>
          </div>

          <h1 className="apt-hero-headline">
            Experience Authentic <span className="apt-gold-text-glow">Kerala Ayurveda</span> Care
          </h1>

          <p className="apt-hero-subhead">
            Reserve your consultation with legendary Vaidyas. Comprehensive Nadi Pariksha (Pulse Diagnosis), personalized Panchakarma protocols, and herbal therapies tailored for your constitution.
          </p>

          {/* Quick Lineage Stats Cards */}
          <div className="apt-hero-metrics-bar">
            <div className="apt-metric-card">
              <span className="apt-metric-icon">📜</span>
              <div>
                <span className="apt-metric-value">35+ Years</span>
                <span className="apt-metric-label">Healing Lineage</span>
              </div>
            </div>
            <div className="apt-metric-sep" />
            <div className="apt-metric-card">
              <span className="apt-metric-icon">🌿</span>
              <div>
                <span className="apt-metric-value">100% Herbal</span>
                <span className="apt-metric-label">Classical Medicines</span>
              </div>
            </div>
            <div className="apt-metric-sep" />
            <div className="apt-metric-card">
              <span className="apt-metric-icon">⭐</span>
              <div>
                <span className="apt-metric-value">4.9 / 5.0</span>
                <span className="apt-metric-label">Patient Rating</span>
              </div>
            </div>
          </div>
        </div>

        {/* Hero Visual Spotlight */}
        <div className="apt-hero-right">
          <div className="apt-hero-visual-frame">
            <Image
              src="/images/doctor-krishnakumar.webp"
              alt="Chief Vaidya Consultation"
              fill
              priority
              sizes="(max-width: 900px) 100vw, 420px"
              className="apt-hero-doc-img"
            />
            <div className="apt-visual-overlay" />

            {/* Floating Live Consultation Badge */}
            <div className="apt-floating-doc-card">
              <div className="apt-doc-live-badge">
                <span className="live-dot" />
                <span>OPD Active</span>
              </div>
              <strong>Dr. Krishnakumar K. (MD)</strong>
              <span>Chief Ayurvedic Physician • 35+ Yrs</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
