"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getPublicTreatments, getImageDisplayUrl } from "@/app/services/api";

const initialTreatments = [
  {
    slug: "panchakarma",
    title: "Panchakarma",
    text: "The ultimate detox therapy to cleanse toxins and restore balance.",
    time: "7 - 21 Days",
    image: "/images/treatment-panchakarma.webp",
    icon: "shower",
  },
  {
    slug: "abhyangam",
    title: "Abhyangam",
    text: "Therapeutic full-body oil massage for relaxation and nourishment.",
    time: "60 - 90 Mins",
    image: "/images/treatment-sirodhara.webp",
    icon: "spa",
  },
  {
    slug: "shirodhara",
    title: "Shirodhara",
    text: "Gentle oil therapy for the mind to relieve stress and anxiety.",
    time: "30 - 45 Mins",
    image: "/images/treatment-sirodhara.webp",
    icon: "water_drop",
  },
  {
    slug: "swedana",
    title: "Swedana",
    text: "Herbal steam therapy to detoxify and improve circulation.",
    time: "20 - 30 Mins",
    image: "/images/faq-ayurveda-still-life.webp",
    icon: "mode_fan",
  },
  {
    slug: "nasya",
    title: "Nasya",
    text: "Nasal therapy to clear sinuses and improve head & neck health.",
    time: "20 - 30 Mins",
    image: "/images/treatment-herbal-medicine.webp",
    icon: "eco",
  },
  {
    slug: "pizhichil",
    title: "Pizhichil",
    text: "Warm herbal oil bath therapy to relieve pain and rejuvenate.",
    time: "60 - 90 Mins",
    image: "/images/treatment-sirodhara.webp",
    icon: "sanitizer",
  },
  {
    slug: "udvarthanam",
    title: "Udvarthanam",
    text: "Herbal powder therapy to reduce fatigue and improve metabolism.",
    time: "45 - 60 Mins",
    image: "/images/treatment-njavarakizhi.webp",
    icon: "clean_hands",
  },
  {
    slug: "basti",
    title: "Basti",
    text: "Medicated enema therapy to balance Vata and cleanse the colon.",
    time: "30 - 45 Mins",
    image: "/images/faq-ayurveda-still-life.webp",
    icon: "eco",
  },
  {
    slug: "kati-basti",
    title: "Kati Basti",
    text: "Warm oil therapy for lower back pain and stiffness relief.",
    time: "30 - 45 Mins",
    image: "/images/treatment-kati-vasti.webp",
    icon: "healing",
  },
  {
    slug: "garshanam",
    title: "Garshanam",
    text: "Silk glove massage to improve lymphatic flow and skin health.",
    time: "30 - 45 Mins",
    image: "/images/treatment-kati-vasti.webp",
    icon: "self_improvement",
  },
];

export function AllTreatmentsSection() {
  const [treatmentsList, setTreatmentsList] = useState(initialTreatments);

  useEffect(() => {
    async function loadTreatments() {
      try {
        const data = await getPublicTreatments();
        if (Array.isArray(data) && data.length > 0) {
          const normalized = data.map((t: any) => ({
            slug: t.slug || `tr-${(t.title || t.name || '').toLowerCase().replace(/\s+/g, '-')}`,
            title: t.title || t.name,
            text: t.shortDescription || t.text || t.description || 'Ayurvedic therapeutic treatment.',
            time: t.durationMinutes ? `${t.durationMinutes} Mins` : '60 Mins',
            image: getImageDisplayUrl(t.coverImage || t.image),
            icon: "spa",
          }));
          setTreatmentsList(normalized);
        }
      } catch (err) {
        console.error("Failed to load treatments:", err);
      }
    }
    loadTreatments();
  }, []);

  return (
    <section className="all-treatments-section" aria-labelledby="all-treatments-title">
      <div className="all-treatments-head">
        <h2 id="all-treatments-title">All Treatments</h2>
        <p>
          Explore our complete range of Ayurvedic therapies designed for
          detoxification, rejuvenation, and total well-being.
        </p>
        <label className="all-treatments-sort">
          <span>View by</span>
          <select aria-label="Sort treatments">
            <option>Popularity</option>
            <option>Duration</option>
            <option>Name</option>
          </select>
        </label>
      </div>

      <div className="all-treatments-grid">
        {treatmentsList.map((treatment) => (
          <Link
            className="all-treatment-card"
            href={`/treatments/${treatment.slug}`}
            aria-label={`View ${treatment.title} treatment details`}
            key={treatment.title}
          >
            <div className="all-treatment-image">
              <Image
                src={treatment.image}
                alt={treatment.title}
                fill
                sizes="(max-width: 640px) 92vw, (max-width: 1100px) 44vw, 20vw"
              />
              <span className="all-treatment-icon" aria-hidden="true">
                <span className="material-symbols-outlined">{treatment.icon}</span>
              </span>
            </div>
            <div className="all-treatment-body">
              <h3>{treatment.title}</h3>
              <span className="all-treatment-rule" aria-hidden="true" />
              <p>{treatment.text}</p>
              <div className="all-treatment-time">
                <span className="material-symbols-outlined" style={{ fontSize: "16px", marginRight: "5px" }} aria-hidden="true">
                  schedule
                </span>
                {treatment.time}
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="treatment-journey-banner">
        <div className="journey-banner-copy">
          <span>Ready to Begin?</span>
          <h2>
            Begin Your Journey
            <br />
            to <em>Natural Healing</em>
          </h2>
          <p>
            Consult our expert doctors and get a personalized treatment plan
            tailored to your unique needs.
          </p>
        </div>
        <div className="journey-banner-features">
          <div>
            <span className="material-symbols-outlined" style={{ fontSize: "28px", color: "#bd7b31", display: "block", marginBottom: "8px" }} aria-hidden="true">
              clinical_notes
            </span>
            <strong>Expert Guidance</strong>
            <span>from Experienced Doctors</span>
          </div>
          <div>
            <span className="material-symbols-outlined" style={{ fontSize: "28px", color: "#bd7b31", display: "block", marginBottom: "8px" }} aria-hidden="true">
              edit_note
            </span>
            <strong>Personalised Plans</strong>
            <span>Tailored to Your Needs</span>
          </div>
          <div>
            <span className="material-symbols-outlined" style={{ fontSize: "28px", color: "#bd7b31", display: "block", marginBottom: "8px" }} aria-hidden="true">
              spa
            </span>
            <strong>Holistic Healing</strong>
            <span>for Body, Mind & Soul</span>
          </div>
        </div>
        <Link className="journey-banner-button" href="/appointment">
          Book Your Consultation
          <span aria-hidden="true">&rarr;</span>
        </Link>
        <div className="journey-banner-still" aria-hidden="true">
          <Image src="/images/faq-ayurveda-still-life.webp" alt="" fill sizes="(max-width: 900px) 100vw, 360px" />
        </div>
      </div>
    </section>
  );
}
