"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getPublicFAQs } from "@/app/services/api";

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

export function FaqSection() {
  const [faqList, setFaqList] = useState<FAQItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function loadFaqs() {
      try {
        setLoading(true);
        const data = await getPublicFAQs();
        if (Array.isArray(data) && data.length > 0) {
          const normalized: FAQItem[] = data.map((f: any) => ({
            question: f.question,
            answer: f.answer,
          }));
          setFaqList(normalized);
        } else {
          setFaqList([]);
        }
      } catch (err) {
        console.error("Failed to load live FAQs:", err);
        setFaqList([]);
      } finally {
        setLoading(false);
      }
    }
    loadFaqs();
  }, []);

  if (!loading && faqList.length === 0) {
    return null;
  }

  return (
    <section className="faq-section" aria-labelledby="home-faq-title">
      <div className="faq-layout">
        <div className="faq-intro">
          <div className="faq-eyebrow">
            <span>FAQ</span>
            <i />
            <LotusIcon />
            <i />
          </div>
          <h2 id="home-faq-title">
            Answers to Your Wellness <span>Questions</span>
          </h2>
          <div className="faq-title-ornament" aria-hidden="true">
            <span />
            <i />
            <span />
          </div>
          <p>
            We believe in clarity, transparency, and empowering you to make informed decisions
            about your health.
          </p>
        </div>

        <div className="faq-list">
          {faqList.map((faq, index) => (
            <details className="faq-item" key={faq.question} open={index === 0}>
              <summary>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <strong>{faq.question}</strong>
                <i aria-hidden="true" />
              </summary>
              <div className="faq-answer">
                <div className="faq-answer-ornament" aria-hidden="true">
                  <span />
                  <LotusIcon />
                  <span />
                </div>
                <p>{faq.answer}</p>
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
            <Link href="/contact-us">
              Contact Us <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        </div>

        <div className="faq-contact-block faq-contact-expert">
          <span className="faq-contact-icon" aria-hidden="true">
            <i className="fa-solid fa-phone" />
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
            <svg viewBox="0 0 28 28" focusable="false">
              <path d="M8 5v4M20 5v4M6 10h16M7 7h14v15H7z" />
              <path d="M10 14h2M16 14h2M10 18h2M16 18h2" />
            </svg>
          </span>
          <div>
            <h3>Book a Consultation</h3>
            <p>Take the first step towards a healthier, balanced life.</p>
          </div>
          <i aria-hidden="true">&rarr;</i>
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
