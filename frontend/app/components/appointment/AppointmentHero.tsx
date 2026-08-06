"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getPublicDoctors, getImageDisplayUrl } from "../../services/api";

interface ChiefDoctor {
  name: string;
  title: string;
  specialty: string;
  experience: string;
  rating: string;
  photoUrl: string;
  isAvailable: boolean;
}

const FALLBACK: ChiefDoctor = {
  name: "Dr. Krishnakumar K. (MD)",
  title: "Chief Ayurvedic Physician",
  specialty: "Panchakarma & Nadi Pariksha",
  experience: "35+ Yrs",
  rating: "4.98",
  photoUrl: "/images/dr_krishnakumar.webp",
  isAvailable: true,
};

function pickChiefDoctor(doctors: any[]): ChiefDoctor {
  if (!Array.isArray(doctors) || doctors.length === 0) return FALLBACK;

  // Priority: isChief > isFeatured > order/displayOrder
  const sorted = [...doctors].sort((a, b) => {
    if (a.isChief && !b.isChief) return -1;
    if (!a.isChief && b.isChief) return 1;
    if (a.isFeatured && !b.isFeatured) return -1;
    if (!a.isFeatured && b.isFeatured) return 1;
    return (a.order ?? a.displayOrder ?? 99) - (b.order ?? b.displayOrder ?? 99);
  });

  const doc = sorted[0];
  const rawPhoto = doc.photo || doc.photoUrl || doc.image || "";
  const photoUrl = rawPhoto ? getImageDisplayUrl(rawPhoto) : FALLBACK.photoUrl;

  return {
    name: doc.name || FALLBACK.name,
    title: doc.designation || doc.title || doc.role || FALLBACK.title,
    specialty: doc.specialty || doc.department || doc.specialization || FALLBACK.specialty,
    experience: doc.experience || doc.yearsOfExperience
      ? `${doc.experience || doc.yearsOfExperience}${typeof (doc.experience || doc.yearsOfExperience) === "number" ? "+ Yrs" : ""}`
      : FALLBACK.experience,
    rating: doc.rating ? String(doc.rating) : FALLBACK.rating,
    photoUrl,
    isAvailable: doc.isAvailable ?? doc.available ?? true,
  };
}

export function AppointmentHero() {
  const [chief, setChief] = useState<ChiefDoctor | null>(null);

  useEffect(() => {
    getPublicDoctors()
      .then((docs) => setChief(pickChiefDoctor(docs as any[])))
      .catch(() => setChief(FALLBACK));
  }, []);

  const doctor = chief ?? FALLBACK;

  return (
    <section className="apt-hero-luxury">
      {/* Ambient background mesh and gold light glows */}
      <div className="apt-hero-mesh-glow" aria-hidden="true" />
      <div className="apt-hero-radial-gold" aria-hidden="true" />
      <div className="apt-hero-pattern-dots" aria-hidden="true" />

      <div className="apt-hero-container-luxury">
        <div className="apt-hero-left">
          <nav className="apt-breadcrumb-luxury" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span className="bc-divider">✦</span>
            <span className="bc-active">Book Consultation</span>
          </nav>

          <div className="apt-luxury-chip">
            <span className="apt-pulse-beacon" />
            <span className="apt-chip-text">INSTANT DOCTOR SLOTS AVAILABLE TODAY</span>
          </div>

          <h1 className="apt-hero-headline">
            Experience Authentic{" "}
            <span className="apt-gold-text-glow">Kerala Ayurveda</span> Care
          </h1>

          <p className="apt-hero-subhead">
            Reserve your consultation with legendary Vaidyas. Comprehensive Nadi
            Pariksha (Pulse Diagnosis), personalized Panchakarma protocols, and
            herbal therapies tailored for your constitution.
          </p>

          {/* Quick Lineage Stats Cards */}
          <div className="apt-hero-metrics-bar">
            <div className="apt-metric-card">
              <span className="apt-metric-icon">📜</span>
              <div>
                <span className="apt-metric-value">35+ Years</span>
                <span className="apt-metric-label">Healing Lineage</span>
              </div>
            </div>
            <div className="apt-metric-sep" />
            <div className="apt-metric-card">
              <span className="apt-metric-icon">🌿</span>
              <div>
                <span className="apt-metric-value">100% Herbal</span>
                <span className="apt-metric-label">Classical Medicines</span>
              </div>
            </div>
            <div className="apt-metric-sep" />
            <div className="apt-metric-card">
              <span className="apt-metric-icon">⭐</span>
              <div>
                <span className="apt-metric-value">{doctor.rating} / 5.0</span>
                <span className="apt-metric-label">Patient Rating</span>
              </div>
            </div>
          </div>
        </div>

        {/* Hero Visual Spotlight — dynamic chief doctor */}
        <div className="apt-hero-right">
          <div className="apt-hero-visual-frame">
            {chief === null ? (
              /* Skeleton shimmer while loading */
              <div className="apt-hero-img-skeleton" aria-hidden="true" />
            ) : (
              <Image
                src={doctor.photoUrl}
                alt={doctor.name}
                fill
                priority
                sizes="(max-width: 900px) 100vw, 420px"
                className="apt-hero-doc-img"
              />
            )}
            <div className="apt-visual-overlay" />

            {/* Floating Live Consultation Badge */}
            <div className="apt-floating-doc-card">
              <div className="apt-doc-live-badge">
                <span
                  className="live-dot"
                  style={{ background: doctor.isAvailable ? "#2e7d32" : "#b0b0b0" }}
                />
                <span>{doctor.isAvailable ? "OPD Active" : "OPD Closed"}</span>
              </div>
              <strong>{doctor.name}</strong>
              <span>
                {doctor.title} • {doctor.experience}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
