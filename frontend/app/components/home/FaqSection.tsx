"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Phone, ArrowRight, CalendarDays } from "lucide-react";
import { getPublicFAQs } from "@/app/services/api";
import { DataLayerRibbon } from "../common/DataLayerRibbon";

type FAQItem = {
  question: string;
  answer: string;
};

function LotusIcon() {
  return (
    <svg viewBox="0 0 48 36" aria-hidden="true" focusable="false">
      <path d="M24 31C15 23 14 14 24 3c10 11 9 20 0 28Z" />
      <path d="M23 31C13 29 7 22 6 12c11 2 17 9 17 19Z" />
      <path d="M25 31c10-2 16-9 17-19-11 2-17 9-17 19Z" />
      <path d="M24 31c-8 1-15-2-20-9 9-2 16 1 20 9Z" />
      <path d="M24 31c8 1 15-2 20-9-9-2-16 1-20 9Z" />
    </svg>
  );
}

const initialFaqs: (FAQItem & { isBackendData?: boolean })[] = [
  {
    question: "Do I need a doctor consultation before starting Panchakarma?",
    answer: "Yes, all treatments and Panchakarma therapies at Susrutha are prescribed by certified BAMS Ayurvedic physicians following a thorough diagnostic assessment.",
  },
  {
    question: "What is the difference between Kattakada Hospital and Kowdiar Clinic?",
    answer: "Kattakada is our 40-bed full inpatient hospital campus offering inpatient stays and multi-day Panchakarma care. Kowdiar is our executive city outpatient clinic for consultations and daycare Kizhi/Abhyanga therapies.",
  },
  {
    question: "How do I book an appointment?",
    answer: "You can book directly via our online booking wizard, call our patient desk at +91 96566 56736, or visit either branch.",
  },
];

export function FaqSection() {
  const [faqList, setFaqList] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function loadFaqs() {
      try {
        setLoading(true);
        const data = await getPublicFAQs();
        if (Array.isArray(data) && data.length > 0) {
          const normalized = data.map((f: any) => ({
            question: f.question,
            answer: f.answer,
            isBackendData: true,
          }));
          setFaqList(normalized);
        } else {
          setFaqList(initialFaqs);
        }
      } catch (err) {
        console.error("Failed to load live FAQs:", err);
        setFaqList(initialFaqs);
      } finally {
        setLoading(false);
      }
    }
    loadFaqs();
  }, []);

  return (
    <section className="faq-section" aria-labelledby="faq-title">
      <div className="faq-heading-block">
        <span className="faq-tag">FAQs</span>
        <div className="flex items-center justify-center gap-2 mt-1">
          <h2 id="faq-title">Frequently Asked Questions</h2>
          <DataLayerRibbon
            type={faqList.some((f) => f.isBackendData) ? "backend" : "static"}
            label="FAQ API (CMS Sync)"
          />
        </div>
        <p>
          Everything you need to know about our consultations, inpatient facilities, and treatment methodology.
        </p>
      </div>

      <div className="faq-layout">
        <div className="faq-list">
          {faqList.map((item, i) => (
            <details
              key={`${item.question}-${i}`}
              className="faq-item"
              name="faq-accordion"
              open={i === 0}
            >
              <summary className="faq-summary">
                <span className="faq-number">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="faq-question-text">{item.question}</span>
                <span className="faq-indicator" aria-hidden="true" />
              </summary>
              <div className="faq-body">
                <p>{item.answer}</p>
              </div>
            </details>
          ))}
        </div>
      </div>

      <div className="faq-contact-bar">
        <div className="faq-contact-block">
          <span className="faq-contact-icon" aria-hidden="true">
            <LotusIcon />
          </span>
          <div>
            <h3>Still have questions?</h3>
            <p>Our wellness experts are here to help you.</p>
            <Link href="/contact-us" style={{ display: "inline-flex", alignItems: "center", gap: "4px" }}>
              Contact Us <ArrowRight size={14} strokeWidth={1.75} aria-hidden="true" />
            </Link>
          </div>
        </div>

        <div className="faq-contact-block faq-contact-expert">
          <span className="faq-contact-icon" aria-hidden="true">
            <Phone size={22} strokeWidth={1.75} />
          </span>
          <div>
            <h3>Speak with our experts</h3>
            <p>
              <a href="tel:+919447003191">+91 94470 03191</a>
              <span>|</span>
              <a href="mailto:info@susruthaayurveda.com">info@susruthaayurveda.com</a>
            </p>
          </div>
        </div>

        <Link className="faq-consult-card" href="/appointment">
          <span aria-hidden="true">
            <CalendarDays size={26} strokeWidth={1.75} />
          </span>
          <div>
            <h3>Book a Consultation</h3>
            <p>Take the first step towards a healthier, balanced life.</p>
          </div>
          <ArrowRight size={18} strokeWidth={1.75} aria-hidden="true" />
        </Link>
      </div>

      <div className="faq-footer-line" aria-hidden="true">
        <span />
        <LotusIcon />
        <p>Rooted in tradition. Committed to your wellness.</p>
        <span />
      </div>
    </section>
  );
}
