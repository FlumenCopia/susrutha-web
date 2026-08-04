import React from "react";

export function DoctorsStatsBanner() {
  return (
    <section className="doctors-stats-section">
      <div className="doctors-stats-card">
        <div className="doctors-stat-item">
          <div className="doctors-stat-number">20+</div>
          <div className="doctors-stat-title">Years of Healing Heritage</div>
          <div className="doctors-stat-text">Serving patients across Kerala & internationally</div>
        </div>

        <div className="doctors-stat-item">
          <div className="doctors-stat-number">100%</div>
          <div className="doctors-stat-title">Classical Ayurveda</div>
          <div className="doctors-stat-text">Strict adherence to Ashtanga Hridaya protocols</div>
        </div>

        <div className="doctors-stat-item">
          <div className="doctors-stat-number">15,000+</div>
          <div className="doctors-stat-title">Panchakarma Therapies</div>
          <div className="doctors-stat-text">Physician-guided detoxification & rejuvenation</div>
        </div>

        <div className="doctors-stat-item">
          <div className="doctors-stat-number">4.9★</div>
          <div className="doctors-stat-title">Verified Reviews</div>
          <div className="doctors-stat-text">Trusted by thousands of satisfied families</div>
        </div>
      </div>
    </section>
  );
}
