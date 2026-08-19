"use client";

import Link from "next/link";
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
    </div>
  );
}
