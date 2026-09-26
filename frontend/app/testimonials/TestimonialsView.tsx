"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { getPublicTestimonials, getImageDisplayUrl } from "@/app/services/api";
import "./testimonials.css";

export interface TestimonialItem {
  id: string;
  patientName: string;
  patientLocation: string;
  treatmentReceived: string;
  rating: number;
  reviewText: string;
  patientPhoto?: string;
  videoUrl?: string;
  isFeatured?: boolean;
}

export function TestimonialsView() {
  const [testimonials, setTestimonials] = useState<TestimonialItem[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>("ALL");
  const [modalVideoUrl, setModalVideoUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function loadTestimonials() {
      try {
        setLoading(true);
        const data = await getPublicTestimonials();
        if (Array.isArray(data) && data.length > 0) {
          const mapped: TestimonialItem[] = data.map((item: any) => ({
            id: item._id || item.id || String(Math.random()),
            patientName: item.patientName || item.name || "Verified Patient",
            patientLocation: item.patientLocation || item.place || "Kerala, India",
            treatmentReceived: item.treatmentReceived || item.treatment || "Authentic Ayurvedic Care",
            rating: typeof item.rating === "number" ? item.rating : 5,
            reviewText: item.reviewText || item.copy || item.message || "",
            patientPhoto: item.patientPhoto ? getImageDisplayUrl(item.patientPhoto) : undefined,
            videoUrl: item.videoUrl ? getImageDisplayUrl(item.videoUrl) : undefined,
            isFeatured: Boolean(item.isFeatured),
          }));
          setTestimonials(mapped);
        }
      } catch (err) {
        console.error("Failed to fetch live testimonials:", err);
      } finally {
        setLoading(false);
      }
    }

    loadTestimonials();
  }, []);

  // Top video story for the featured spotlight
  const videoSpotlight = useMemo(() => {
    return testimonials.find((t) => Boolean(t.videoUrl)) || null;
  }, [testimonials]);

  // Categories
  const categories = [
    { id: "ALL", label: "All Reviews" },
    { id: "VIDEO", label: "Video Stories" },
    { id: "PANCHAKARMA", label: "Panchakarma Detox" },
    { id: "PAIN", label: "Spine & Pain Care" },
    { id: "SKIN", label: "Skin & Rejuvenation" },
  ];

  // Filtered reviews
  const filteredReviews = useMemo(() => {
    if (activeCategory === "ALL") return testimonials;
    if (activeCategory === "VIDEO") return testimonials.filter((t) => Boolean(t.videoUrl));
    if (activeCategory === "PANCHAKARMA")
      return testimonials.filter((t) =>
        t.treatmentReceived.toLowerCase().includes("panchakarma") ||
        t.reviewText.toLowerCase().includes("panchakarma")
      );
    if (activeCategory === "PAIN")
      return testimonials.filter((t) =>
        t.treatmentReceived.toLowerCase().includes("pain") ||
        t.treatmentReceived.toLowerCase().includes("spine") ||
        t.reviewText.toLowerCase().includes("pain")
      );
    if (activeCategory === "SKIN")
      return testimonials.filter((t) =>
        t.treatmentReceived.toLowerCase().includes("skin") ||
        t.treatmentReceived.toLowerCase().includes("psoriasis") ||
        t.treatmentReceived.toLowerCase().includes("rejuvenation")
      );
    return testimonials;
  }, [testimonials, activeCategory]);

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((part) => part[0])
      .filter(Boolean)
      .slice(0, 2)
      .join("")
      .toUpperCase();
  };

  return (
    <div className="testimonials-view">
      {/* 1. Classical Hero Section (Matches user's verified site layout) */}
      <section className="inner-hero">
        <div className="inner-breadcrumb" aria-label="Breadcrumb">
          <span>
            <Link href="/">Home</Link>
          </span>
          <span>
            <i aria-hidden="true">/</i>
            <Link href="/testimonials">Testimonials</Link>
          </span>
        </div>
        <span className="eyebrow">TESTIMONIALS</span>
        <h1>Patient Stories &amp; Experiences</h1>
        <p>
          Authentic recovery stories, genuine experiences, and video reviews from our patients
          across India and worldwide.
        </p>
      </section>

      {/* 2. Featured Video Story Spotlight */}
      {videoSpotlight && (
        <section className="testimonials-spotlight-section">
          <div className="testimonials-spotlight-container">
            <div className="spotlight-card">
              <div className="spotlight-media">
                <span className="spotlight-badge">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                    <polygon points="5 3 19 12 5 21 5 3" />
                  </svg>
                  Patient Video Story
                </span>
                <video
                  src={videoSpotlight.videoUrl}
                  poster={videoSpotlight.patientPhoto}
                  controls
                  playsInline
                  className="spotlight-video"
                />
              </div>

              <div className="spotlight-content">
                <span className="spotlight-eyebrow">
                  <i aria-hidden="true">&#9733;</i>
                  Featured Patient Experience
                </span>

                <div className="spotlight-stars" aria-label="5 out of 5 stars">
                  {"★".repeat(videoSpotlight.rating)}
                </div>

                <span className="spotlight-treatment">{videoSpotlight.treatmentReceived}</span>

                <blockquote className="spotlight-quote">
                  {videoSpotlight.reviewText}
                </blockquote>

                <div className="spotlight-patient">
                  {videoSpotlight.patientPhoto ? (
                    <img
                      src={videoSpotlight.patientPhoto}
                      alt={videoSpotlight.patientName}
                      className="spotlight-avatar"
                    />
                  ) : (
                    <div className="spotlight-avatar-initials">
                      {getInitials(videoSpotlight.patientName)}
                    </div>
                  )}
                  <div className="spotlight-patient-info">
                    <h3>{videoSpotlight.patientName}</h3>
                    <p>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M12 2a8 8 0 0 0-8 8c0 5.25 8 12 8 12s8-6.75 8-12a8 8 0 0 0-8-8z" />
                        <circle cx="12" cy="10" r="3" />
                      </svg>
                      {videoSpotlight.patientLocation}
                      <span className="verified-tag">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                        Verified Inpatient Care
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 3. Patient Reviews Grid Section */}
      <section className="testimonials-grid-section">
        <div className="testimonials-grid-header">
          <span className="eyebrow">HEALING EXPERIENCES</span>
          <h2>Real Words From Patients Across The Globe</h2>
          <p>
            Every journey at Susrutha begins with compassionate clinical diagnosis and classical
            Panchakarma treatment protocols under Vaidya supervision.
          </p>

          {/* Filter Pills */}
          <div className="testimonials-filter-bar" role="tablist">
            {categories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                role="tab"
                aria-selected={activeCategory === cat.id}
                className={`filter-pill ${activeCategory === cat.id ? "active" : ""}`}
                onClick={() => setActiveCategory(cat.id)}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Reviews Grid */}
        {loading ? (
          <div style={{ textAlign: "center", padding: "60px 20px", color: "#6a5b49" }}>
            <p style={{ fontSize: "16px" }}>Loading verified patient reviews...</p>
          </div>
        ) : filteredReviews.length === 0 ? (
          <div style={{ textAlign: "center", padding: "60px 20px", color: "#6a5b49" }}>
            <p style={{ fontSize: "16px" }}>No reviews found for this category.</p>
          </div>
        ) : (
          <div className="testimonials-grid">
            {filteredReviews.map((item) => (
              <article className="review-card" key={item.id}>
                <div>
                  <div className="card-top">
                    <div className="card-stars">
                      {"★".repeat(item.rating)}
                    </div>
                    <span className="verified-tag">
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      Verified
                    </span>
                  </div>

                  <div className="card-treatment">{item.treatmentReceived}</div>

                  <p className="card-text">
                    &ldquo;{item.reviewText}&rdquo;
                  </p>

                  {item.videoUrl && (
                    <button
                      type="button"
                      className="card-video-trigger"
                      onClick={() => setModalVideoUrl(item.videoUrl || null)}
                    >
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                        <polygon points="5 3 19 12 5 21 5 3" />
                      </svg>
                      Watch Patient Video
                    </button>
                  )}
                </div>

                <div className="card-author">
                  {item.patientPhoto ? (
                    <img src={item.patientPhoto} alt={item.patientName} className="card-avatar" />
                  ) : (
                    <div className="card-avatar-initials">
                      {getInitials(item.patientName)}
                    </div>
                  )}
                  <div className="card-author-info">
                    <h4>{item.patientName}</h4>
                    <p>{item.patientLocation}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* Trust Stats Row */}
        <div className="testimonials-stats-row">
          <div className="stat-box">
            <strong>40+ Years</strong>
            <span>Ayurvedic Clinical Heritage</span>
          </div>
          <div className="stat-box">
            <strong>25,000+</strong>
            <span>Patients Treated Successfully</span>
          </div>
          <div className="stat-box">
            <strong>98%</strong>
            <span>Positive Treatment Satisfaction</span>
          </div>
          <div className="stat-box">
            <strong>30+ Countries</strong>
            <span>International Patients Welcomed</span>
          </div>
        </div>
      </section>

      {/* 4. Consultation CTA Section */}
      <section className="inner-section inner-cta">
        <div>
          <span className="eyebrow">BEGIN YOUR STORY</span>
          <h2>Ready To Experience Authentic Ayurvedic Healing?</h2>
          <p>
            Schedule a comprehensive Vaidya consultation to determine the ideal Panchakarma, spine
            care, or wellness plan for your health condition.
          </p>
        </div>
        <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
          <Link className="btn btn-primary" href="/appointment">
            Book Appointment
          </Link>
          <Link
            className="btn btn-secondary"
            href="/contact-us"
            style={{
              padding: "14px 24px",
              border: "1px solid #d49e54",
              borderRadius: "4px",
              color: "#20312d",
              textDecoration: "none",
              fontWeight: 600,
            }}
          >
            Contact Patient Care
          </Link>
        </div>
      </section>

      {/* 5. Video Playback Modal */}
      {modalVideoUrl && (
        <div
          className="testimonials-modal-backdrop"
          onClick={() => setModalVideoUrl(null)}
        >
          <div
            className="testimonials-modal-container"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="testimonials-modal-close"
              onClick={() => setModalVideoUrl(null)}
              aria-label="Close video player"
            >
              ✕
            </button>
            <video
              src={modalVideoUrl}
              controls
              autoPlay
              playsInline
              className="testimonials-modal-video"
            />
          </div>
        </div>
      )}
    </div>
  );
}
