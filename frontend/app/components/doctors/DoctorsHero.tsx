import React from "react";
import { quickSearchTags } from "./doctorsData";

type DoctorsHeroProps = {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onTagClick: (tag: string) => void;
};

export function DoctorsHero({ searchQuery, onSearchChange, onTagClick }: DoctorsHeroProps) {
  return (
    <section className="doctors-hero">
      <div className="doctors-hero-container">
        <div className="doctors-hero-header">
          {/* <div className="doctors-hero-eyebrow">
            <i className="fa-solid fa-leaf icon" aria-hidden="true" style={{ marginRight: "6px" }} /> Susrutha Clinical Faculty
          </div> */}
          {/* <h1 className="doctors-hero-title">
            Consult Our Senior <span className="accent">Ayurvedic Physicians</span>
          </h1> */}
          {/* <p className="doctors-hero-description">
            Experience classical Panchakarma diagnosis, root-cause healing protocols, and personalized 
            wellness guidance from Kerala’s leading Vaidyas across Kattakada, Kowdiar, and Online Video Consultations.
          </p> */}

          {/* Quick Statistics Banner */}
          {/* <div className="doctors-hero-stats">
            <div className="doctors-hero-stat-card">
              <div className="doctors-hero-stat-icon"><i className="fa-solid fa-user-doctor" /></div>
              <div>
                <div className="doctors-hero-stat-val">15+ Senior</div>
                <div className="doctors-hero-stat-lbl">Specialist Vaidyas</div>
              </div>
            </div>
            <div className="doctors-hero-stat-card">
              <div className="doctors-hero-stat-icon"><i className="fa-solid fa-star" /></div>
              <div>
                <div className="doctors-hero-stat-val">4.9 / 5.0</div>
                <div className="doctors-hero-stat-lbl">Patient Trust Rating</div>
              </div>
            </div>
            <div className="doctors-hero-stat-card">
              <div className="doctors-hero-stat-icon"><i className="fa-solid fa-scroll" /></div>
              <div>
                <div className="doctors-hero-stat-val">100% Authentic</div>
                <div className="doctors-hero-stat-lbl">Classical Ayurveda</div>
              </div>
            </div>
            <div className="doctors-hero-stat-card">
              <div className="doctors-hero-stat-icon"><i className="fa-solid fa-users" /></div>
              <div>
                <div className="doctors-hero-stat-val">50,000+</div>
                <div className="doctors-hero-stat-lbl">Patients Healed</div>
              </div>
            </div>
          </div> */}

          {/* Live Search Input Bar */}
          <div className="doctors-hero-search">
            <div className="doctors-hero-search-input-wrap">
              <i className="fa-solid fa-magnifying-glass doctors-hero-search-icon" aria-hidden="true" />
              <input
                type="text"
                className="doctors-hero-search-input"
                placeholder="Search by doctor name, specialty (Panchakarma, Spine), qualification..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
              />
              {searchQuery ? (
                <button
                  type="button"
                  className="doctors-hero-tag-btn"
                  onClick={() => onSearchChange("")}
                  style={{ marginRight: 8 }}
                >
                  ✕ Clear
                </button>
              ) : null}
              <button type="button" className="doctors-hero-search-btn">
                Find Doctor
              </button>
            </div>
          </div>

          {/* Quick Filter Tags */}
          <div className="doctors-hero-tags">
            <span className="doctors-hero-tags-label">Popular Searches:</span>
            {quickSearchTags.map((tag) => (
              <button
                key={tag}
                type="button"
                className="doctors-hero-tag-btn"
                onClick={() => onTagClick(tag)}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

