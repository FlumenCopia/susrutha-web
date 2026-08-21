"use client";

import React from "react";

export function PathToWholenessSection() {
  const steps = [
    {
      step: "STEP 01",
      title: "Consultation",
      desc: "A deep diagnostic exploration of your Prakriti (constitution) and current imbalances.",
      icon: "spa",
    },
    {
      step: "STEP 02",
      title: "Diagnosis",
      desc: "Scientific pulse-reading and observation to map out your personalized healing roadmap.",
      icon: "psychology",
    },
    {
      step: "STEP 03",
      title: "Treatment",
      desc: "A series of synchronized therapies including Shirodhara, Abhyanga, and herbal purification.",
      icon: "fluid_med",
    },
    {
      step: "STEP 04",
      title: "Recovery",
      desc: "Sustainable lifestyle and dietary integration for lifelong vitality and harmony.",
      icon: "self_improvement",
    },
  ];

  return (
    <section className="path-wholeness-section" aria-labelledby="path-wholeness-heading">
      <div className="path-wholeness-container">
        <div className="path-wholeness-header">
          <h2 id="path-wholeness-heading">The Path to Wholeness</h2>
        </div>

        <div className="path-wholeness-timeline">
          <div className="path-wholeness-line" aria-hidden="true" />
          <div className="path-wholeness-grid">
            {steps.map((s) => (
              <div className="path-wholeness-card" key={s.step}>
                <div className="path-wholeness-icon-box">
                  <span className="material-symbols-outlined">{s.icon}</span>
                </div>
                <span className="path-wholeness-step-tag">{s.step}</span>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
