"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";

export function SignatureExperienceSection() {
  const treatments = [
    {
      title: "Shirodhara Bliss",
      desc: "A rhythmic pouring of herbal oils onto the forehead to calm the nervous system.",
      duration: "90 MINS",
      price: "$240",
      image: "/images/treatment-sirodhara.webp",
      href: "/treatments/shirodhara",
    },
    {
      title: "Panchakarma Detox",
      desc: "Five-fold purification therapy designed to deeply cleanse and rejuvenate the body.",
      duration: "7 DAYS",
      price: "FROM $3,500",
      image: "/images/treatment-panchakarma.webp",
      href: "/treatments/panchakarma",
    },
    {
      title: "Abhyanga Massage",
      desc: "Full body warm oil massage that improves circulation and boosts the immune system.",
      duration: "60 MINS",
      price: "$180",
      image: "/images/treatment-kati-vasti.webp",
      href: "/treatments/abhyangam",
    },
  ];

  return (
    <section className="sig-experience-section" aria-labelledby="sig-experience-heading">
      <div className="sig-experience-container">
        <div className="sig-experience-header">
          <div className="sig-experience-title-group">
            <span className="sig-experience-eyebrow">The Experience</span>
            <h2 id="sig-experience-heading">Signature Healing Rituals</h2>
          </div>
          <Link href="/treatments" className="sig-experience-all-btn">
            VIEW ALL TREATMENTS
          </Link>
        </div>

        <div className="sig-experience-grid">
          {treatments.map((t) => (
            <article className="sig-experience-card" key={t.title}>
              <Link href={t.href}>
                <div className="sig-experience-image-wrap">
                  <Image
                    src={t.image}
                    alt={t.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    style={{ objectFit: "cover" }}
                  />
                  <div className="sig-experience-overlay">
                    <span className="sig-experience-discover">
                      DISCOVER RITUAL
                      <span className="material-symbols-outlined" style={{ fontSize: "16px", marginLeft: "6px", verticalAlign: "middle" }}>
                        arrow_forward
                      </span>
                    </span>
                  </div>
                </div>
                <div className="sig-experience-card-body">
                  <h3>{t.title}</h3>
                  <p>{t.desc}</p>
                  {/* <div className="sig-experience-meta">
                    <span style={{ display: "inline-flex", alignItems: "center", gap: "4px" }}>
                      <span className="material-symbols-outlined" style={{ fontSize: "16px" }}>schedule</span>
                      {t.duration}
                    </span>
                    <span className="dot-sep">•</span>
                    <span style={{ display: "inline-flex", alignItems: "center", gap: "4px" }}>
                      <span className="material-symbols-outlined" style={{ fontSize: "16px" }}>payments</span>
                      {t.price}
                    </span>
                  </div> */}
                </div>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
