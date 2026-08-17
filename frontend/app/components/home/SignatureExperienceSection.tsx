"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { getPublicTreatments, getImageDisplayUrl } from "@/app/services/api";

type RitualItem = {
  title: string;
  desc: string;
  duration: string;
  image: string;
  href: string;
  isBackendData?: boolean;
};

const initialRituals: RitualItem[] = [
  {
    title: "Shirodhara Bliss",
    desc: "A rhythmic pouring of herbal oils onto the forehead to calm the nervous system.",
    duration: "90 MINS",
    image: "/images/treatment-sirodhara.webp",
    href: "/treatments/shirodhara",
    isBackendData: false,
  },
  {
    title: "Panchakarma Detox",
    desc: "Five-fold purification therapy designed to deeply cleanse and rejuvenate the body.",
    duration: "7 DAYS",
    image: "/images/treatment-panchakarma.webp",
    href: "/treatments/panchakarma",
    isBackendData: false,
  },
  {
    title: "Abhyanga Massage",
    desc: "Full body warm oil massage that improves circulation and boosts the immune system.",
    duration: "60 MINS",
    image: "/images/treatment-kati-vasti.webp",
    href: "/treatments/abhyangam",
    isBackendData: false,
  },
];

export function SignatureExperienceSection() {
  const [treatments, setTreatments] = useState<RitualItem[]>(initialRituals);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function loadSignatureTreatments() {
      try {
        setLoading(true);
        const res = await getPublicTreatments({ limit: 3, sort: "popular" });
        const items = Array.isArray(res) ? res : (res as any).items || [];
        if (items.length > 0) {
          const normalized: RitualItem[] = items.slice(0, 3).map((t: any) => ({
            title: t.title || t.name,
            desc: t.shortDescription || t.text || t.description || "Authentic Ayurvedic healing ritual.",
            duration: t.durationMinutes ? `${t.durationMinutes} MINS` : "60 MINS",
            image: getImageDisplayUrl(t.coverImage || t.image),
            href: `/treatments/${t.slug || t._id}`,
            isBackendData: true,
          }));
          setTreatments(normalized);
        } else {
          setTreatments(initialRituals);
        }
      } catch (err) {
        console.error("Failed to load live signature treatments:", err);
        setTreatments(initialRituals);
      } finally {
        setLoading(false);
      }
    }
    loadSignatureTreatments();
  }, []);

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
          {treatments.map((t) => {
            return (
              <article
                className="sig-experience-card"
                key={t.title}
                style={{ position: "relative" }}
              >
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
                        <span
                          className="material-symbols-outlined"
                          style={{ fontSize: "16px", marginLeft: "6px", verticalAlign: "middle" }}
                        >
                          arrow_forward
                        </span>
                      </span>
                    </div>
                  </div>
                  <div className="sig-experience-card-body">
                    <h3>{t.title}</h3>
                    <p>{t.desc}</p>
                  </div>
                </Link>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
