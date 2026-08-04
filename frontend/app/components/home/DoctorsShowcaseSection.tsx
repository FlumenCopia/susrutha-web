"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { DoctorBookingDrawer } from "./DoctorBookingDrawer";

type HomeDoctor = {
  slug: string;
  name: string;
  specialty: string;
  category: "Panchakarma" | "Spine & Joint" | "Women's Health" | "Lifestyle";
  qualification: string;
  experience: string;
  rating: string;
  summary: string;
  image: string;
  availability: string;
  tags: string[];
  isSpotlight?: boolean;
  quote?: string;
};

const homeDoctors: HomeDoctor[] = [
  {
    slug: "dr-krishnakumar-k",
    name: "Dr. Krishnakumar K.",
    specialty: "Senior Ayurveda Physician",
    category: "Panchakarma",
    qualification: "MD (Ayurveda) • 20+ Yrs Exp",
    experience: "20+ Years",
    rating: "4.98 ★",
    summary: "Renowned classical Panchakarma master, chronic illness diagnostic specialist, and spine care expert.",
    image: "/images/doctor-portrait.webp",
    availability: "Mon, Wed, Fri",
    tags: ["Panchakarma Master", "Spine Care", "Chronic Illness"],
    isSpotlight: true,
    quote: "True Ayurvedic healing does not merely suppress symptoms. It systematically roots out toxic metabolic waste (Ama) to restore your body's natural intelligence.",
  },
  {
    slug: "dr-nikhil-sharma",
    name: "Dr. Nikhil Sharma",
    specialty: "Founder & Chief Physician",
    category: "Panchakarma",
    qualification: "BAMS, Chief Physician",
    experience: "18+ Years",
    rating: "4.97 ★",
    summary: "Guiding classical Kerala Panchakarma therapies, detox planning, and patient-first hospital care.",
    image: "/images/founder-nikhil-sharma.webp",
    availability: "Mon, Wed, Fri",
    tags: ["Panchakarma", "Legacy Care", "Holistic Health"],
  },
  {
    slug: "dr-meera-iyer",
    name: "Dr. Meera Iyer",
    specialty: "Founder & Wellness Director",
    category: "Women's Health",
    qualification: "BAMS, Wellness Director",
    experience: "15+ Years",
    rating: "4.96 ★",
    summary: "Specialist in women's health, nutrition planning, preventive Ayurveda, and balanced lifestyle routines.",
    image: "/images/founder-meera-iyer.webp",
    availability: "Tue, Thu, Sat",
    tags: ["Women's Health", "Nutrition", "Preventive Wellness"],
  },
  {
    slug: "dr-arjun-das",
    name: "Dr. Arjun Das",
    specialty: "Founder & Research Director",
    category: "Lifestyle",
    qualification: "BAMS, Research Director",
    experience: "12+ Years",
    rating: "4.94 ★",
    summary: "Focusing on evidence-based Ayurvedic research protocols, clinical quality systems, and patient education.",
    image: "/images/founder-arjun-das.webp",
    availability: "Mon, Thu, Sat",
    tags: ["Evidence Ayurveda", "Research", "Protocol Care"],
  },
  {
    slug: "dr-sreeja-krishna-s",
    name: "Dr. Sreeja Krishna S.",
    specialty: "Chief Consultation Officer",
    category: "Lifestyle",
    qualification: "BAMS, MBA Hospital Mgmt",
    experience: "12+ Years",
    rating: "4.92 ★",
    summary: "Specialist in patient consultation planning, preventive health routines, and holistic care coordination.",
    image: "/images/doctor-sreeja.webp",
    availability: "Tue, Thu, Sat",
    tags: ["Preventive Care", "Routine Guidance", "Consultation"],
  },
  {
    slug: "dr-priyanka-r",
    name: "Dr. Priyanka R.",
    specialty: "Gynaecology & Obstetrics Specialist",
    category: "Women's Health",
    qualification: "BAMS, MS (Ayurveda)",
    experience: "10+ Years",
    rating: "4.95 ★",
    summary: "Dedicated physician for women's reproductive health, fertility preparation, antenatal and postnatal care.",
    image: "/images/doctor-priyanka.webp",
    availability: "Mon, Wed, Sat",
    tags: ["Women's Health", "Fertility Care", "Postnatal"],
  },
  {
    slug: "dr-rajesh-r",
    name: "Dr. Rajesh R.",
    specialty: "Panchakarma & Pain Specialist",
    category: "Spine & Joint",
    qualification: "BAMS, MD (Ayurveda)",
    experience: "14+ Years",
    rating: "4.90 ★",
    summary: "Focused physician for Kati Basti, lumbar spine rehabilitation, joint stiffness, and neuromuscular care.",
    image: "/images/doctor-rajesh.webp",
    availability: "On Appointment",
    tags: ["Spine Rehab", "Kati Basti", "Neuromuscular"],
  },
  {
    slug: "dr-anju-s",
    name: "Dr. Anju S.",
    specialty: "Lifestyle & Preventive Medicine",
    category: "Lifestyle",
    qualification: "BAMS",
    experience: "8+ Years",
    rating: "4.88 ★",
    summary: "Expert guidance for metabolic disorders, stress balance, digestion correction, and seasonal food routines.",
    image: "/images/doctor-anju.webp",
    availability: "Tue, Thu, Sat",
    tags: ["Metabolic Health", "Diet Correction", "Stress Balance"],
  },
];

const specialtyFilters = [
  "All Specialists",
  "Panchakarma Specialists",
  "Spine & Joint Care",
  "Women's Health",
  "Lifestyle Medicine",
] as const;

export function DoctorsShowcaseSection() {
  const [activeFilter, setActiveFilter] = useState<string>("All Specialists");
  const [bookingDrawerDoc, setBookingDrawerDoc] = useState<HomeDoctor | null>(null);
  const [isPlayingAudioQuote, setIsPlayingAudioQuote] = useState<boolean>(false);

  const spotlightDoctor = homeDoctors[0];

  const filteredDoctors = useMemo(() => {
    let list = homeDoctors.filter((d) => !d.isSpotlight);
    if (activeFilter === "Panchakarma Specialists") list = homeDoctors.filter((d) => d.category === "Panchakarma");
    if (activeFilter === "Spine & Joint Care") list = homeDoctors.filter((d) => d.category === "Spine & Joint");
    if (activeFilter === "Women's Health") list = homeDoctors.filter((d) => d.category === "Women's Health");
    if (activeFilter === "Lifestyle Medicine") list = homeDoctors.filter((d) => d.category === "Lifestyle");
    return list;
  }, [activeFilter]);

  return (
    <section className="home-doctors-section-creative" aria-labelledby="home-doctors-title">
      {/* Background Ambient Glow */}
      <div className="home-doctors-bg-glow" aria-hidden="true" />
      <div className="home-doctors-orb-1" aria-hidden="true" />

      <div className="home-doctors-container">
        {/* Section Header */}
        <div className="home-doctors-header-creative">
          <div className="home-doctors-eyebrow-chip">
            <span className="home-doctors-chip-dot" />
            <span>SUSRUTHA MEDICAL FACULTY</span>
          </div>

          <h2 id="home-doctors-title" className="home-doctors-title-creative">
            Healers Guided by <span className="home-doctors-gold-text">Lineage & Clinical Science</span>
          </h2>

          <p className="home-doctors-subtitle-creative">
            Click on any doctor to view their dedicated profile, qualifications, research, and clinical approach.
          </p>

          {/* Specialty Filter Pills */}
          <div className="home-doctors-filter-track" role="tablist" aria-label="Filter Doctors by Specialty">
            {specialtyFilters.map((filter) => {
              const isActive = activeFilter === filter;
              return (
                <button
                  key={filter}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  className={`home-doctors-filter-pill ${isActive ? "active" : ""}`}
                  onClick={() => setActiveFilter(filter)}
                >
                  <span>{filter}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Dual-Pane Spotlight & Team Gallery Showcase */}
        <div className="home-doctors-showcase-grid">
          {/* Left Column: Chief Physician Spotlight Showcase */}
          <div className="home-doctor-spotlight-card">
            <div className="home-spotlight-badge">
              <span className="home-spotlight-star">★</span>
              <span>CHIEF PHYSICIAN SPOTLIGHT</span>
            </div>

            {/* Clickable Image Linking to Dedicated Doctor Page */}
            <Link href={`/doctors/${spotlightDoctor.slug}`} className="home-spotlight-portrait-wrapper">
              <Image
                src={spotlightDoctor.image}
                alt={spotlightDoctor.name}
                width={460}
                height={500}
                className="home-spotlight-portrait-img"
              />
              <div className="home-spotlight-overlay" />
              
              <div className="home-spotlight-outcome-chip">
                <span className="home-spotlight-metric">98%</span>
                <span className="home-spotlight-metric-lbl">Positive Outcomes</span>
              </div>

              <div className="home-spotlight-rating-chip">{spotlightDoctor.rating}</div>
            </Link>

            <div className="home-spotlight-body">
              <span className="home-spotlight-specialty">{spotlightDoctor.specialty.toUpperCase()}</span>
              
              {/* Clickable Name Linking to Dedicated Doctor Page */}
              <h3 className="home-spotlight-name">
                <Link href={`/doctors/${spotlightDoctor.slug}`} className="home-doc-link-title">
                  {spotlightDoctor.name}
                </Link>
              </h3>
              <p className="home-spotlight-qual">{spotlightDoctor.qualification}</p>

              {spotlightDoctor.quote && (
                <blockquote className="home-spotlight-quote">
                  "{spotlightDoctor.quote}"
                </blockquote>
              )}

              <div className="home-spotlight-actions">
                <Link href={`/doctors/${spotlightDoctor.slug}`} className="home-spotlight-profile-btn">
                  <span>View Doctor Profile & Credentials</span>
                  <span aria-hidden="true">&rarr;</span>
                </Link>

                <div className="home-spotlight-btn-row">
                  <button
                    type="button"
                    className="home-spotlight-audio-btn"
                    onClick={() => setIsPlayingAudioQuote(!isPlayingAudioQuote)}
                  >
                    <span className="home-spotlight-audio-icon">
                      {isPlayingAudioQuote ? "⏸" : "▶"}
                    </span>
                    <span>{isPlayingAudioQuote ? "Pause" : "Welcome Note"}</span>
                  </button>

                  <button
                    type="button"
                    className="home-spotlight-book-btn"
                    onClick={() => setBookingDrawerDoc(spotlightDoctor)}
                  >
                    <span>Book OP Slot</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Physician Team Gallery Grid */}
          <div className="home-doctors-team-col">
            <div className="home-doctors-team-header">
              <h3 className="home-team-heading">Specialist Medical Team</h3>
              <Link href="/doctors" className="home-team-view-all">
                <span>View All 8 Doctors</span>
                <span aria-hidden="true">&rarr;</span>
              </Link>
            </div>

            <div className="home-doctors-team-grid">
              {filteredDoctors.map((doctor) => (
                <article className="home-doctor-team-card" key={doctor.slug}>
                  {/* Clickable Portrait Thumb Linking to Dedicated Doctor Page */}
                  <Link href={`/doctors/${doctor.slug}`} className="home-team-card-thumb">
                    <Image
                      src={doctor.image}
                      alt={doctor.name}
                      width={220}
                      height={240}
                      className="home-team-thumb-img"
                    />
                    <div className="home-team-thumb-overlay" />
                    <span className="home-team-rating">{doctor.rating}</span>
                  </Link>

                  <div className="home-team-card-content">
                    <span className="home-team-specialty">{doctor.specialty}</span>
                    
                    {/* Clickable Doctor Name */}
                    <h4 className="home-team-name">
                      <Link href={`/doctors/${doctor.slug}`} className="home-doc-link-title">
                        {doctor.name}
                      </Link>
                    </h4>
                    <p className="home-team-qual">{doctor.qualification}</p>

                    <div className="home-team-tags">
                      {doctor.tags.slice(0, 2).map((tag) => (
                        <span key={tag} className="home-team-tag">
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="home-team-card-foot">
                      {/* Subpage Link */}
                      <Link href={`/doctors/${doctor.slug}`} className="home-team-profile-link">
                        Profile &rarr;
                      </Link>

                      {/* Quick Booking Button */}
                      <button
                        type="button"
                        className="home-team-book-btn-sm"
                        onClick={() => setBookingDrawerDoc(doctor)}
                      >
                        Book OP
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>

        {/* Sleek Clinical Trust Metrics Strip */}
        <div className="home-doctors-trust-strip">
          <div className="home-doctors-trust-item">
            <span className="home-doctors-trust-number">15,000+</span>
            <span className="home-doctors-trust-label">Happy Patients Healed</span>
          </div>
          <div className="home-doctors-trust-divider" />
          <div className="home-doctors-trust-item">
            <span className="home-doctors-trust-number">20+ Years</span>
            <span className="home-doctors-trust-label">Clinical Legacy & Expertise</span>
          </div>
          <div className="home-doctors-trust-divider" />
          <div className="home-doctors-trust-item">
            <span className="home-doctors-trust-number">100%</span>
            <span className="home-doctors-trust-label">Physician-Guided Care</span>
          </div>
          <div className="home-doctors-trust-divider" />
          <div className="home-doctors-trust-item">
            <span className="home-doctors-trust-number">5 Departments</span>
            <span className="home-doctors-trust-label">Specialist Ayurveda Care</span>
          </div>
        </div>
      </div>

      {/* Interactive Quick-Book Consultation Drawer */}
      <DoctorBookingDrawer
        isOpen={!!bookingDrawerDoc}
        doctorName={bookingDrawerDoc?.name}
        specialty={bookingDrawerDoc?.specialty}
        onClose={() => setBookingDrawerDoc(null)}
      />
    </section>
  );
}
