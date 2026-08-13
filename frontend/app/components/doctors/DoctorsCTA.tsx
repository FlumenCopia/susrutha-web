import React from "react";
import Link from "next/link";

export function DoctorsCTA() {
  return (
    <section className="doctors-cta-section">
      <div className="doctors-cta-card">
        <div className="doctors-cta-content">
          <span className="doctors-cta-eyebrow">Start Your Healing Journey</span>
          <h2 className="doctors-cta-title">
            Ready for a Personalized Ayurvedic Consultation?
          </h2>
          <p className="doctors-cta-text">
            Schedule an in-person consultation at our Kattakada Main Hospital or Kowdiar City OP, 
            or book a tele-Ayurveda video consultation from anywhere in the world.
          </p>
        </div>

        <Link href="/appointment" className="doctors-cta-btn">
          <i className="fa-solid fa-calendar-days" style={{ marginRight: "6px" }} />
          Book Consultation Now
          <i className="fa-solid fa-arrow-right" style={{ marginLeft: "6px" }} />
        </Link>
      </div>
    </section>
  );
}
