"use client";

import React, { useState } from "react";
import Link from "next/link";
import "./affiliations.css";

export function AffiliationsPage() {
  const [showFullBio, setShowFullBio] = useState(false);

  return (
    <div className="affiliations-page">
      {/* Full-Screen Serene Hero Section */}
      <section className="conditions-hero-serene" aria-labelledby="affiliations-title">
        <div
          className="conditions-hero-serene-bg"
          style={{ backgroundImage: `url('/images/banner_holistic_health.jpg')` }}
        />
        <div className="conditions-hero-serene-overlay" />

        <div className="conditions-hero-serene-content">
          <nav className="conditions-hero-serene-nav" aria-label="Breadcrumb">
            <Link href="/">HOME</Link>
            <span>/</span>
            <span>INTERNATIONAL COLLABORATION</span>
          </nav>

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

      {/* Affiliations with Susrutha Section */}
      <section className="asotra-affiliation-section" aria-labelledby="asotra-affiliation-heading">
        <div className="asotra-affiliation-container">
          {/* Centered Heading with Red Underline */}
          <div className="asotra-heading-wrapper">
            <h2 id="asotra-affiliation-heading" className="asotra-main-title">
              Affiliations with Susrutha
            </h2>
            <div className="asotra-title-underline" />
          </div>

          {/* Main Affiliation Card */}
          <div className="asotra-card">
            {/* Left: Logo Box */}
            <div className="asotra-logo-container">
              <img
                src="/images/asotra.jpg"
                alt="Dr. Satish Asotra Logo"
                className="asotra-logo"
              />
            </div>

            {/* Right: Content Box */}
            <div className="asotra-content-container">
              <h3 className="asotra-card-title">
                Asotra Healthcare Inc:
                <br />
                Connecting Mind, Body and Soul
              </h3>

              <h4 className="asotra-card-subtitle">
                Dr. Satish Asotra: Ayurvedic Practitioner- Beliefs and Passion
              </h4>

              <p className="asotra-card-desc">
                Dr. Satish Asotra has over 30 years of experience in the field of Healthcare and Medical Sciences. Trained as a Physiologist and Biochemist, Dr. Asotra been involved with the Western Medical and Pharmaceutical drug development fields where he trained medical students, conducted research on developing new treatments for various diseases and developed medicines.
              </p>

              {showFullBio && (
                <div className="asotra-expanded-bio">
                  <p>
                    Rooted in holistic self-healthcare, Dr. Asotra integrates the ancient wisdom of Kerala Ayurveda with Western scientific biochemistry and physiology. Through his collaboration with Susrutha Ayurveda Gramam and Hospital, he facilitates seamless telemedicine evaluations, clinical referrals, and structured inpatient Panchakarma programs in Kerala for patients across the United States and North America.
                  </p>
                  <p>
                    <strong>Credentials:</strong> Ph.D. in Biochemistry &bull; Trained Medical Physiologist &bull; MBA &bull; CAS (Clinical Ayurvedic Specialist) &bull; AHC (Ayurvedic Health Counselor).
                  </p>
                </div>
              )}

              {/* Action Buttons */}
              <div className="asotra-btn-group">
                <button
                  type="button"
                  className="asotra-pill-btn"
                  onClick={() => setShowFullBio(!showFullBio)}
                  aria-expanded={showFullBio}
                >
                  <span>{showFullBio ? "Read Less" : "Read More"}</span>
                  <i className={`fa-solid ${showFullBio ? "fa-arrow-up" : "fa-arrow-right"}`} />
                </button>

                <a
                  href="https://www.drasotra.com/affiliations"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="asotra-pill-btn"
                >
                  <span>Visit Website</span>
                  <i className="fa-solid fa-arrow-right" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
