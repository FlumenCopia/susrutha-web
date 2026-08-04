"use client";

import { useState } from "react";
import { bookingFaqs } from "./appointmentData";

export function AppointmentFaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="apt-faq-luxury">
      <div className="apt-faq-container-luxury">
        <div className="apt-section-header text-center">
          <span className="apt-eyebrow-badge-gold">BOOKING ASSISTANCE & FAQ</span>
          <h2 className="apt-section-title-luxury">Frequently Asked Booking Questions</h2>
          <p className="apt-section-subhead-luxury">Everything you need to know about preparing for your Ayurvedic consultation</p>
        </div>

        <div className="apt-faq-accordion-luxury">
          {bookingFaqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div key={faq.question} className={`apt-faq-card-luxury ${isOpen ? "open" : ""}`}>
                <button
                  type="button"
                  className="apt-faq-trigger"
                  onClick={() => toggleFaq(index)}
                  aria-expanded={isOpen}
                >
                  <div className="faq-title-left">
                    <span className="faq-q-badge">Q</span>
                    <span>{faq.question}</span>
                  </div>
                  <span className="faq-icon-toggle">{isOpen ? "−" : "+"}</span>
                </button>

                {isOpen && (
                  <div className="apt-faq-content-body">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
