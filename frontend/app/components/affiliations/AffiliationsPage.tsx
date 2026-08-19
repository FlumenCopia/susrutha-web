"use client";

import React from "react";
import Link from "next/link";
import { Globe2, Microscope, Sprout, ArrowRight } from "lucide-react";
import "./affiliations.css";

export function AffiliationsPage() {
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
          <div className="conditions-hero-serene-middle-wrapper">
            <div className="conditions-hero-serene-middle">
              <p className="conditions-hero-serene-quote">
                Susrutha Ayurveda (Kerala, India) unites with{" "}
                <a
                  href="https://www.drasotra.com/affiliations"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "inherit", textDecoration: "underline", textUnderlineOffset: "3px" }}
                >
                  <strong>Dr. Satish Asotra</strong>
                </a>{" "}
                (California, USA) — bridging over five decades of classical Ayurvedic lineage with Western medical science, physiology, and global patient care.
              </p>
            </div>

            <div className="conditions-hero-serene-right-stats" aria-label="Affiliation statistics">
              <div className="conditions-hero-stat-card">
                <Globe2 size={26} strokeWidth={1.75} />
                <div className="conditions-hero-stat-info">
                  <strong>USA &bull; IND</strong>
                  <span>Global Presence</span>
                </div>
              </div>

              <div className="conditions-hero-stat-card">
                <Microscope size={26} strokeWidth={1.75} />
                <div className="conditions-hero-stat-info">
                  <strong>30+ Yrs</strong>
                  <span>Medical Sciences</span>
                </div>
              </div>

              <div className="conditions-hero-stat-card">
                <Sprout size={26} strokeWidth={1.75} />
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
            {/* <div className="asotra-title-underline" /> */}
          </div>

          {/* Main Affiliation Card */}
          <div className="asotra-card">
            {/* Left: Logo Box (Clickable link) */}
            <a
              href="https://www.drasotra.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="asotra-logo-container"
              title="Visit Dr. Asotra Official Website"
            >
              <img
                src="/images/asotra.jpg"
                alt="Dr. Satish Asotra Logo"
                className="asotra-logo"
              />
            </a>

            {/* Right: Content Box */}
            <div className="asotra-content-container">
              <h3 className="asotra-card-title">
                <a
                  href="https://www.drasotra.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "inherit", textDecoration: "none" }}
                >
                  Asotra Healthcare Inc:
                  <br />
                  Connecting Mind, Body and Soul
                </a>
              </h3>

              <h4 className="asotra-card-subtitle">
                <a
                  href="https://www.drasotra.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "inherit", textDecoration: "none" }}
                >
                  Dr. Satish Asotra: Ayurvedic Practitioner- Beliefs and Passion
                </a>
              </h4>

              <p className="asotra-card-desc">
                Dr. Satish Asotra has over 30 years of experience in the field of Healthcare and Medical Sciences. Trained as a Physiologist and Biochemist, Dr. Asotra been involved with the Western Medical and Pharmaceutical drug development fields where he trained medical students, conducted research on developing new treatments for various diseases and developed medicines.
              </p>

              {/* Action Buttons */}
              <div className="asotra-btn-group">
                <a
                  href="/images/asotra.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="asotra-pill-btn"
                  title="View Dr. Asotra Profile Document (PDF)"
                  style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}
                >
                  <span>Read More</span>
                  <ArrowRight size={14} strokeWidth={1.75} />
                </a>

                <a
                  href="https://www.drasotra.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="asotra-pill-btn"
                  title="Visit www.drasotra.com"
                  style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}
                >
                  <span>Visit Website</span>
                  <ArrowRight size={14} strokeWidth={1.75} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
