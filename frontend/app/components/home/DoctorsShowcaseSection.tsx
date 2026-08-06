"use client";

import { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { getImageDisplayUrl, getPublicDoctors } from "../../services/api";

// Map department slugs to display categories
const DEPT_TO_CATEGORY: Record<string, HomeDoctor["category"]> = {
  "panchakarma": "Panchakarma",
  "panchakarma-detox": "Panchakarma",
  "spine-joints": "Spine & Joint",
  "neck-back-joint": "Spine & Joint",
  "womens-health": "Women's Health",
  "prasooti-tantra": "Women's Health",
  "lifestyle-detox": "Lifestyle",
  "preventive-medicine": "Lifestyle",
  "kayachikitsa": "Panchakarma",
  "skin-hair": "Lifestyle",
  "rheumatology": "Spine & Joint",
  "neurology": "Spine & Joint",
};

function mapDeptToCategory(deptSlug?: string): HomeDoctor["category"] {
  if (!deptSlug) return "Panchakarma";
  // Try exact match first
  if (DEPT_TO_CATEGORY[deptSlug]) return DEPT_TO_CATEGORY[deptSlug];
  // Fuzzy match by keyword
  const s = deptSlug.toLowerCase();
  if (s.includes("women") || s.includes("prasooti") || s.includes("fertility")) return "Women's Health";
  if (s.includes("spine") || s.includes("joint") || s.includes("neuro") || s.includes("rheum")) return "Spine & Joint";
  if (s.includes("lifestyle") || s.includes("metabolic") || s.includes("preventive") || s.includes("skin")) return "Lifestyle";
  return "Panchakarma";
}

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

const specialtyFilters = [
  "All Specialists",
  "Panchakarma Specialists",
  "Spine & Joint Care",
  "Women's Health",
  "Lifestyle Medicine",
] as const;

export function DoctorsShowcaseSection() {
  const [doctorsList, setDoctorsList] = useState<HomeDoctor[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [activeFilter, setActiveFilter] = useState<string>("All Specialists");
  const [isPlayingAudioQuote, setIsPlayingAudioQuote] = useState<boolean>(false);

  useEffect(() => {
    async function loadLiveDoctors() {
      try {
        setLoading(true);
        const data = await getPublicDoctors();
        if (Array.isArray(data) && data.length > 0) {
          const normalized: HomeDoctor[] = data.map((d: any, idx: number) => ({
            slug: d.slug || `dr-${(d.name || "").toLowerCase().replace(/\s+/g, "-")}`,
            name: d.name || "Doctor",
            specialty: d.designation || d.title || "Ayurveda Specialist",
            category: mapDeptToCategory(d.departmentId?.slug || ""),
            qualification: `${d.qualifications || "BAMS"}${d.experienceYears ? " • " + d.experienceYears + "+ Yrs Exp" : ""}`,
            experience: d.experienceText || `${d.experienceYears || 15}+ Years`,
            rating: `${d.rating || 4.9} ★`,
            summary: d.bio || d.text || "Senior Ayurvedic Physician at Susrutha Ayurveda.",
            image: getImageDisplayUrl(d.photo || d.photoUrl || d.image),
            availability: d.availability?.length
              ? d.availability[0].days?.join(", ") || "By Appointment"
              : "By Appointment",
            tags: d.specialties || d.focusAreas || ["Panchakarma", "Ayurveda"],
            isSpotlight: idx === 0,
            quote: d.quote || "True Ayurvedic healing systematically roots out metabolic waste to restore natural intelligence.",
          }));
          setDoctorsList(normalized);
        } else {
          setDoctorsList([]);
        }
      } catch (err) {
        console.error("Failed to load homepage doctors:", err);
        setDoctorsList([]);
      } finally {
        setLoading(false);
      }
    }
    loadLiveDoctors();
  }, []);

  const spotlightDoctor = doctorsList[0] || null;

  const filteredDoctors = useMemo(() => {
    let list = doctorsList.filter((d) => !d.isSpotlight);
    if (activeFilter === "Panchakarma Specialists") list = doctorsList.filter((d) => d.category === "Panchakarma");
    if (activeFilter === "Spine & Joint Care") list = doctorsList.filter((d) => d.category === "Spine & Joint");
    if (activeFilter === "Women's Health") list = doctorsList.filter((d) => d.category === "Women's Health");
    if (activeFilter === "Lifestyle Medicine") list = doctorsList.filter((d) => d.category === "Lifestyle");
    return list;
  }, [activeFilter, doctorsList]);

  if (!spotlightDoctor) {
    return null;
  }

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
                src={getImageDisplayUrl(spotlightDoctor.image)}
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
                  &ldquo;{spotlightDoctor.quote}&rdquo;
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

                  <Link
                    href={`/appointment?doctor=${encodeURIComponent(spotlightDoctor.slug)}`}
                    className="home-spotlight-book-btn"
                  >
                    <span>Book OP Slot</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Physician Team Gallery Grid */}
          <div className="home-doctors-team-col">
            <div className="home-doctors-team-header">
              <h3 className="home-team-heading">Specialist Medical Team</h3>
              <Link href="/doctors" className="home-team-view-all">
                <span>View All {doctorsList.length} Doctors</span>
                <span aria-hidden="true">&rarr;</span>
              </Link>
            </div>

            <div className="home-doctors-team-grid">
              {filteredDoctors.map((doctor) => (
                <article className="home-doctor-team-card" key={doctor.slug}>
                  {/* Clickable Portrait Thumb Linking to Dedicated Doctor Page */}
                  <Link href={`/doctors/${doctor.slug}`} className="home-team-card-thumb">
                    <Image
                      src={getImageDisplayUrl(doctor.image)}
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
                      <Link
                        href={`/appointment?doctor=${encodeURIComponent(doctor.slug)}`}
                        className="home-team-book-btn-sm"
                      >
                        Book OP
                      </Link>
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
    </section>
  );
}
