"use client";

import React, { useEffect, useState } from "react";
import { BranchIcon } from "./BranchIcons";

function RunningNumber({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number | null = null;
    const duration = 1500;

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(easeProgress * target));

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        setCount(target);
      }
    };

    const animId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animId);
  }, [target]);

  return (
    <span>
      {count}
      {suffix}
    </span>
  );
}

export function BranchesHero() {
  return (
    <section className="conditions-hero-serene" aria-labelledby="branches-title">
      <div
        className="conditions-hero-serene-bg"
        style={{ backgroundImage: `url('/images/ayurveda-hospital-garden.webp')` }}
      />
      <div className="conditions-hero-serene-overlay" />

      <div className="conditions-hero-serene-content">
        <div className="conditions-hero-serene-middle-wrapper">
          <div className="conditions-hero-serene-middle">
            <p className="conditions-hero-serene-quote">
              Two premier Ayurvedic healing destinations across Thiruvananthapuram — full inpatient hospital infrastructure at Kattakada and city outpatient wellness convenience at Kowdiar.
            </p>
          </div>

          <div className="conditions-hero-serene-right-stats" aria-label="Branches overview statistics">
            <div className="conditions-hero-stat-card">
              <BranchIcon name="building" />
              <div className="conditions-hero-stat-info">
                <strong>
                  <RunningNumber target={2} />
                </strong>
                <span>Premier Locations</span>
              </div>
            </div>
            <div className="conditions-hero-stat-card">
              <BranchIcon name="calendar" />
              <div className="conditions-hero-stat-info">
                <strong>
                  <RunningNumber target={24} suffix="/7" />
                </strong>
                <span>Inpatient Care</span>
              </div>
            </div>
            <div className="conditions-hero-stat-card">
              <BranchIcon name="leaf" />
              <div className="conditions-hero-stat-info">
                <strong>
                  <RunningNumber target={100} suffix="%" />
                </strong>
                <span>Authentic Ayurveda</span>
              </div>
            </div>
          </div>
        </div>

        <div className="conditions-hero-serene-bottom">
          <h1 id="branches-title" className="conditions-hero-serene-title">
            OUR BRANCHES &amp; CLINICS
          </h1>
        </div>
      </div>
    </section>
  );
}
