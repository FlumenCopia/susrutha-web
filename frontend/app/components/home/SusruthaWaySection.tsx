"use client";

import React from "react";

export function SusruthaWaySection() {
  const pillars = [
    {
      iconClass: "fa-solid fa-notes-medical",
      title: "Evidence-Based",
      desc: "Blending ancient protocols with contemporary medical insights for measurable results.",
    },
    {
      iconClass: "fa-solid fa-seedling",
      title: "Pure Sourcing",
      desc: "All oils and herbs are ethically harvested from our private botanical gardens.",
    },
    {
      iconClass: "fa-solid fa-hotel",
      title: "Ultra-Luxury",
      desc: "Immersive retreats that offer world-class hospitality and profound tranquility.",
    },
    {
      iconClass: "fa-solid fa-award",
      title: "Master Lineage",
      desc: "Over 50 years of accumulated wisdom passed through three generations of healers.",
    },
  ];

  return (
    <section className="susrutha-way-section" aria-labelledby="susrutha-way-heading">
      <div className="susrutha-way-container">
        <div className="susrutha-way-grid">
          {/* Left Column: Heading & Introduction */}
          <div className="susrutha-way-left">
            <span className="susrutha-way-eyebrow">The Susrutha Way</span>
            <h2 id="susrutha-way-heading">Crafting an Ecosystem of Total Wellness</h2>
            <p>
              We prioritize vast whitespace to provide breathing room for your mind, reflecting the mental clarity associated with Ayurvedic healing.
            </p>
          </div>

          {/* Right Column: 2x2 Bento Grid Cards */}
          <div className="susrutha-way-right">
            {pillars.map((item) => (
              <div className="susrutha-way-bento-card" key={item.title}>
                <div className="susrutha-way-bento-icon">
                  <i className={item.iconClass} aria-hidden="true" />
                </div>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
