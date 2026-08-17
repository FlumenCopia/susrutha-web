"use client";

import { useState } from "react";

const bookingFaqs = [
  {
    question: "What should I bring to my first Ayurvedic consultation?",
    answer: "Please bring any previous medical reports, blood test results, current prescription list, and a list of specific health concerns you would like to address.",
  },
  {
    question: "Can I choose between In-Person and Online Video Consultation?",
    answer: "Yes, we offer both in-person consultations at our flagship Kovalam and Kattakada centres as well as tele-consultations for international and outstation patients.",
  },
  {
    question: "How long does an initial consultation take?",
    answer: "A comprehensive initial consultation takes 30 to 45 minutes, covering Nadi Pariksha (pulse diagnosis), body constitution analysis (Prakriti), and lifestyle history.",
  },
];

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
