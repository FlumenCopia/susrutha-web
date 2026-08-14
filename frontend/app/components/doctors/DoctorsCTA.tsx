import React from "react";
import Link from "next/link";

export function DoctorsCTA() {
  return (
    <section className="doctors-cta-section">
      <div className="doctors-cta-banner">
        <div className="doctors-cta-overlay" />
        <div className="doctors-cta-content-wrap">
          <div className="doctors-cta-spacer" />
          <div className="doctors-cta-right-content">
            <span className="doctors-cta-eyebrow">Start Your Healing Journey</span>
            <h2 className="doctors-cta-heading">
              Ready for a Personalized Ayurvedic Consultation?
            </h2>
            <p className="doctors-cta-desc">
              Schedule an in-person consultation at our Kattakada Main Hospital or Kowdiar City OP, 
              or book a tele-Ayurveda video consultation from anywhere in the world.
            </p>
            <div className="doctors-cta-btn-wrap">
              <Link href="/appointment" className="doctors-cta-action-btn">
                Book Consultation Now
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
