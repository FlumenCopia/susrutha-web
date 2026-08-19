import React from "react";
import { X, Search } from "lucide-react";

const quickSearchTags = [
  "Panchakarma",
  "Spine & Joints",
  "Women's Health",
  "Skin & Hair",
  "Detox & Wellness",
];

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
                  style={{ marginRight: 8, display: "inline-flex", alignItems: "center", gap: "4px" }}
                >
                  <X size={13} />
                  <span>Clear</span>
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
            <div className="doctors-hero-tags-list">
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
      </div>
    </section>
  );
}

