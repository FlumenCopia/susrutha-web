"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { getPublicTestimonials, getImageDisplayUrl, isVideoFile } from "@/app/services/api";
import { DataLayerRibbon } from "../common/DataLayerRibbon";

type TestimonialItem = {
  name: string;
  place: string;
  image: string;
  copy: string;
  treatment?: string;
  rating?: number;
  videoUrl?: string;
};

const stats = [
  ["people", "25K+", "Happy Patients", "Healed with care and compassion"],
  ["lotus", "98%", "Patient Satisfaction", "Trusted by thousands across India"],
  ["hands", "20+", "Years of Healing", "Rooted in ancient wisdom"],
  ["shield", "10+", "Specialized Therapies", "Holistic care for every individual"],
];

function getInitials(name?: string): string {
  if (!name || !name.trim()) return "P";
  const parts = name.trim().split(/\s+/);
  if (parts.length >= 2) {
    return `${parts[0].charAt(0)}${parts[1].charAt(0)}`.toUpperCase();
  }
  return parts[0].charAt(0).toUpperCase();
}

export function TestimonialsReferenceSection() {
  const [testimonialList, setTestimonialList] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  useEffect(() => {
    async function loadTestimonials() {
      try {
        setLoading(true);
        const data = await getPublicTestimonials();
        if (Array.isArray(data) && data.length > 0) {
          const normalized = data.map((t: any) => {
            const rawPhoto = t.patientPhoto || t.image || '';
            const rawVideo = t.videoUrl || '';
            const isPhotoActuallyVideo = isVideoFile(rawPhoto);
            const actualVideo = rawVideo || (isPhotoActuallyVideo ? rawPhoto : null);
            const actualPhoto = isPhotoActuallyVideo ? '' : rawPhoto;

            return {
              name: t.patientName || t.name,
              place: t.patientLocation || t.place || 'Kerala',
              image: actualPhoto ? getImageDisplayUrl(actualPhoto) : '',
              copy: t.reviewText || t.copy || t.message || '',
              treatment: t.treatmentReceived ? t.treatmentReceived.trim() : '',
              rating: t.rating || 5,
              videoUrl: actualVideo ? (actualVideo.startsWith('http') ? actualVideo : getImageDisplayUrl(actualVideo)) : null,
              isBackendData: true,
            };
          });
          setTestimonialList(normalized);
        } else {
          setTestimonialList([]);
        }
      } catch (err) {
        console.error("Failed to load live testimonials:", err);
        setTestimonialList([]);
      } finally {
        setLoading(false);
      }
    }
    loadTestimonials();
  }, []);


  if (!loading && testimonialList.length === 0) {
    return null;
  }

  let visibleTestimonials: any[] = [];
  if (testimonialList.length === 1) {
    visibleTestimonials = [{ ...testimonialList[0], position: "center" }];
  } else if (testimonialList.length === 2) {
    visibleTestimonials = testimonialList.map((t, idx) => ({
      ...t,
      position: idx === activeIndex ? "center" : idx === 0 ? "left" : "right",
    }));
  } else if (testimonialList.length >= 3) {
    visibleTestimonials = [-1, 0, 1].map((offset) => {
      const len = testimonialList.length;
      const index = (activeIndex + offset + len) % len;
      const item = testimonialList[index] || { name: "", place: "", image: "", copy: "" };
      return {
        ...item,
        position: offset === 0 ? "center" : offset < 0 ? "left" : "right",
      };
    });
  }

  const move = (direction: 1 | -1) => {
    const len = testimonialList.length || 1;
    setActiveIndex((current) => (current + direction + len) % len);
  };

  return (
    <section className="testimonials-reference-section" aria-labelledby="testimonials-reference-title">
      <div
        className="testimonials-reference-decor testimonials-reference-decor-left"
        aria-hidden="true"
        style={{
          position: "absolute",
          left: 0,
          top: "10px",
          width: "min(22vw, 290px)",
          height: "360px",
          pointerEvents: "none",
          overflow: "hidden",
          opacity: 0.42,
          mixBlendMode: "multiply",
          WebkitMaskImage: "radial-gradient(ellipse at 15% 35%, rgba(0, 0, 0, 1) 25%, transparent 75%)",
          maskImage: "radial-gradient(ellipse at 15% 35%, rgba(0, 0, 0, 1) 25%, transparent 75%)",
        }}
      >
        <Image
          src="/images/testimonials-left-corner.webp"
          alt=""
          fill
          sizes="290px"
          style={{ objectFit: "cover", objectPosition: "left top" }}
        />
      </div>
      <div
        className="testimonials-reference-decor testimonials-reference-decor-right"
        aria-hidden="true"
        style={{
          position: "absolute",
          right: 0,
          top: "10px",
          width: "min(22vw, 290px)",
          height: "360px",
          pointerEvents: "none",
          overflow: "hidden",
          opacity: 0.42,
          mixBlendMode: "multiply",
          transform: "scaleX(-1)",
          WebkitMaskImage: "radial-gradient(ellipse at 15% 35%, rgba(0, 0, 0, 1) 25%, transparent 75%)",
          maskImage: "radial-gradient(ellipse at 15% 35%, rgba(0, 0, 0, 1) 25%, transparent 75%)",
        }}
      >
        <Image
          src="/images/testimonials-left-corner.webp"
          alt=""
          fill
          sizes="290px"
          style={{ objectFit: "cover", objectPosition: "left top" }}
        />
      </div>

      <div className="testimonials-reference-inner">
        <div className="testimonials-reference-heading">
          <span className="testimonials-reference-eyebrow">
            <i aria-hidden="true" />
            Testimonials
          </span>
          <h2 id="testimonials-reference-title">
            Trusted by Thousands.
            <em>Healed Naturally.</em>
          </h2>
          <span className="testimonials-reference-divider" aria-hidden="true" />
          <p>
            Real stories from real people who experienced the transformative power of Ayurvedic
            healing.
          </p>
        </div>

        {/* Dynamic Showcase based on Review Count */}
        {testimonialList.length === 1 ? (
          /* 1 REVIEW: Featured Patient Story Card */
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
              marginTop: "32px",
            }}
          >
            <article
              className="testimonials-reference-card"
              data-position="center"
              style={{
                position: "relative",
                width: "100%",
                maxWidth: "620px",
                minHeight: "auto",
                padding: "40px 36px 36px",
                borderRadius: "24px",
                border: "1px solid rgba(212, 158, 84, 0.32)",
                background:
                  "radial-gradient(circle at 50% 0%, rgba(212, 158, 84, 0.12), transparent 75%), rgba(255, 255, 255, 0.94)",
                boxShadow: "0 22px 50px rgba(64, 43, 20, 0.11)",
                textAlign: "center",
                margin: "0 auto",
              }}
            >
              <span className="testimonials-reference-quote" aria-hidden="true" style={{ top: "24px", left: "28px" }}>
                &ldquo;
              </span>

              {/* Eyebrow badge */}
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  padding: "4px 14px",
                  borderRadius: "20px",
                  background: "rgba(212, 158, 84, 0.12)",
                  border: "1px solid rgba(212, 158, 84, 0.3)",
                  marginBottom: "18px",
                }}
              >
                <span
                  style={{
                    fontSize: "11px",
                    fontWeight: 800,
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                    color: "#a87534",
                  }}
                >
                  Featured Patient Experience
                </span>
              </div>

              {/* Avatar */}
              <div className="testimonials-reference-avatar" style={{ margin: "0 auto 18px", width: "92px", height: "92px" }}>
                {testimonialList[0].image ? (
                  <Image
                    src={testimonialList[0].image}
                    alt={testimonialList[0].name}
                    fill
                    sizes="92px"
                    style={{ objectFit: "cover" }}
                  />
                ) : (
                  <div
                    style={{
                      width: "100%",
                      height: "100%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      background: "linear-gradient(135deg, #d49e54 0%, #a87534 100%)",
                      color: "#ffffff",
                      fontSize: "36px",
                      fontWeight: 800,
                      textTransform: "uppercase",
                      userSelect: "none",
                    }}
                  >
                    {getInitials(testimonialList[0].name)}
                  </div>
                )}
              </div>

              {/* Stars */}
              <div className="testimonials-reference-stars" aria-label="5 star rating" style={{ marginBottom: "14px" }}>
                <span aria-hidden="true" style={{ color: "#d49e54", fontSize: "20px", letterSpacing: "3px" }}>
                  ★★★★★
                </span>
              </div>

              {/* Treatment */}
              {testimonialList[0].treatment && (
                <span
                  style={{
                    display: "inline-block",
                    fontSize: "12px",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.09em",
                    color: "#a87534",
                    marginBottom: "12px",
                  }}
                >
                  {testimonialList[0].treatment}
                </span>
              )}

              {/* Review Text */}
              <p
                style={{
                  fontSize: "17.5px",
                  lineHeight: 1.7,
                  color: "#27332e",
                  fontStyle: "italic",
                  maxWidth: "520px",
                  margin: "0 auto 20px",
                }}
              >
                &ldquo;{testimonialList[0].copy}&rdquo;
              </p>

              {/* Video Button */}
              {testimonialList[0].videoUrl && (
                <div style={{ marginBottom: "18px" }}>
                  <button
                    type="button"
                    onClick={() => setSelectedVideo(testimonialList[0].videoUrl)}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "8px",
                      padding: "8px 20px",
                      backgroundColor: "rgba(212, 158, 84, 0.16)",
                      border: "1.5px solid #d49e54",
                      borderRadius: "24px",
                      color: "#8b5e28",
                      fontSize: "13px",
                      fontWeight: 700,
                      cursor: "pointer",
                      transition: "all 0.2s ease",
                      boxShadow: "0 4px 14px rgba(212, 158, 84, 0.18)",
                    }}
                  >
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                      <polygon points="5 3 19 12 5 21 5 3" />
                    </svg>
                    Watch Video Story
                  </button>
                </div>
              )}

              <i aria-hidden="true" />
              <h3 style={{ fontSize: "22px", fontWeight: 700, margin: "0", color: "#1a2521", textTransform: "capitalize" }}>
                {testimonialList[0].name}
              </h3>
              <small style={{ fontSize: "13px", color: "#a87534", display: "block", marginTop: "4px" }}>
                {testimonialList[0].place}
              </small>
              <b aria-hidden="true" />
            </article>
          </div>
        ) : testimonialList.length === 2 ? (
          /* 2 REVIEWS: Balanced 2-Card Grid */
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(290px, 420px))",
              justifyContent: "center",
              gap: "32px",
              maxWidth: "880px",
              margin: "34px auto 0",
              width: "100%",
            }}
          >
            {testimonialList.map((testimonial, idx) => (
              <article
                key={`${testimonial.name}-${idx}`}
                className="testimonials-reference-card"
                data-position="center"
                style={{
                  position: "relative",
                  borderRadius: "22px",
                  border: "1px solid rgba(212, 158, 84, 0.25)",
                  background:
                    "radial-gradient(circle at 86% 78%, rgba(168, 117, 52, 0.1), transparent 25%), rgba(255, 255, 255, 0.88)",
                  boxShadow: "0 18px 44px rgba(64, 43, 20, 0.11)",
                  padding: "40px 32px 34px",
                  textAlign: "center",
                }}
              >
                <span className="testimonials-reference-quote" aria-hidden="true">
                  &ldquo;
                </span>
                <div className="testimonials-reference-avatar" style={{ margin: "0 auto 18px", width: "88px", height: "88px" }}>
                  {testimonial.image ? (
                    <Image
                      src={testimonial.image}
                      alt={testimonial.name}
                      fill
                      sizes="88px"
                      style={{ objectFit: "cover" }}
                    />
                  ) : (
                    <div
                      style={{
                        width: "100%",
                        height: "100%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        background: "linear-gradient(135deg, #d49e54 0%, #a87534 100%)",
                        color: "#ffffff",
                        fontSize: "32px",
                        fontWeight: 800,
                        textTransform: "uppercase",
                        userSelect: "none",
                      }}
                    >
                      {getInitials(testimonial.name)}
                    </div>
                  )}
                </div>
                <div className="testimonials-reference-stars" aria-label="5 star rating" style={{ marginBottom: "12px" }}>
                  <span aria-hidden="true" style={{ color: "#d49e54", fontSize: "18px" }}>
                    ★★★★★
                  </span>
                </div>
                {testimonial.treatment && (
                  <span
                    style={{
                      fontSize: "11px",
                      fontWeight: 700,
                      textTransform: "uppercase",
                      letterSpacing: "0.08em",
                      color: "#d49e54",
                      margin: "4px 0 10px",
                      display: "inline-block",
                    }}
                  >
                    {testimonial.treatment}
                  </span>
                )}
                <p style={{ fontStyle: "italic", minHeight: "56px", marginBottom: "16px" }}>&ldquo;{testimonial.copy}&rdquo;</p>
                {testimonial.videoUrl && (
                  <button
                    type="button"
                    onClick={() => setSelectedVideo(testimonial.videoUrl)}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "6px",
                      margin: "8px auto 14px",
                      padding: "6px 16px",
                      backgroundColor: "rgba(212, 158, 84, 0.16)",
                      border: "1px solid #d49e54",
                      borderRadius: "20px",
                      color: "#d49e54",
                      fontSize: "12px",
                      fontWeight: 600,
                      cursor: "pointer",
                      transition: "all 0.2s ease",
                    }}
                  >
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                      <polygon points="5 3 19 12 5 21 5 3" />
                    </svg>
                    Watch Video Story
                  </button>
                )}
                <i aria-hidden="true" />
                <h3>{testimonial.name}</h3>
                <small>{testimonial.place}</small>
                <b aria-hidden="true" />
              </article>
            ))}
          </div>
        ) : (
          /* 3+ REVIEWS: Interactive 3D Multi-card Carousel */
          <>
            <div className="testimonials-reference-stage">
              <button
                className="testimonials-reference-arrow testimonials-reference-arrow-prev"
                type="button"
                aria-label="Previous testimonial"
                onClick={() => move(-1)}
              >
                &larr;
              </button>

              <div className="testimonials-reference-cards">
                {visibleTestimonials.map((testimonial, idx) => {
                  return (
                    <article
                      className="testimonials-reference-card"
                      data-position={testimonial.position}
                      key={`${testimonial.name}-${testimonial.position}-${idx}`}
                    >
                      <span className="testimonials-reference-quote" aria-hidden="true">
                        &ldquo;
                      </span>
                      <div className="testimonials-reference-avatar">
                        {testimonial.image ? (
                          <Image
                            src={testimonial.image}
                            alt={testimonial.name}
                            fill
                            sizes="88px"
                            style={{ objectFit: "cover" }}
                          />
                        ) : (
                          <div
                            style={{
                              width: "100%",
                              height: "100%",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              background: "linear-gradient(135deg, #d49e54 0%, #a87534 100%)",
                              color: "#ffffff",
                              fontSize: "32px",
                              fontWeight: 800,
                              textTransform: "uppercase",
                              userSelect: "none",
                            }}
                          >
                            {getInitials(testimonial.name)}
                          </div>
                        )}
                      </div>
                      <div className="testimonials-reference-stars" aria-label="5 star rating">
                        <span aria-hidden="true">&#9733;&#9733;&#9733;&#9733;&#9733;</span>
                      </div>
                      {testimonial.treatment ? (
                        <span style={{ fontSize: "11px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "#d49e54", margin: "4px 0 8px", display: "inline-block" }}>
                          {testimonial.treatment}
                        </span>
                      ) : null}
                      <p>{testimonial.copy}</p>
                      {testimonial.videoUrl ? (
                        <button
                          type="button"
                          onClick={() => setSelectedVideo(testimonial.videoUrl)}
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "6px",
                            margin: "10px auto 0",
                            padding: "6px 14px",
                            backgroundColor: "rgba(212, 158, 84, 0.16)",
                            border: "1px solid #d49e54",
                            borderRadius: "20px",
                            color: "#d49e54",
                            fontSize: "12px",
                            fontWeight: 600,
                            cursor: "pointer",
                            transition: "all 0.2s ease",
                          }}
                        >
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                            <polygon points="5 3 19 12 5 21 5 3" />
                          </svg>
                          Watch Video Story
                        </button>
                      ) : null}
                      <i aria-hidden="true" />
                      <h3>{testimonial.name}</h3>
                      <small>{testimonial.place}</small>
                      <b aria-hidden="true" />
                    </article>
                  );
                })}
              </div>

              <button
                className="testimonials-reference-arrow testimonials-reference-arrow-next"
                type="button"
                aria-label="Next testimonial"
                onClick={() => move(1)}
              >
                &rarr;
              </button>
            </div>

            <div className="testimonials-reference-dots" aria-label="Testimonials">
              {testimonialList.map((testimonial, index) => (
                <button
                  type="button"
                  key={`${testimonial.name}-${index}`}
                  aria-label={`Show testimonial from ${testimonial.name}`}
                  aria-current={activeIndex === index ? "true" : undefined}
                  onClick={() => {
                    setActiveIndex(index);
                  }}
                />
              ))}
            </div>
          </>
        )}

        <div style={{ textAlign: "center", marginTop: "32px", marginBottom: "16px" }}>
          <Link
            href="/testimonials"
            className="btn btn-primary"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "12px 28px",
              fontSize: "14px",
              fontWeight: 600,
              textDecoration: "none",
            }}
          >
            <span>Explore All Patient Stories &amp; Video Reviews</span>
            <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>

        <div className="testimonials-reference-stats" aria-label="Patient care highlights">
          {stats.map(([icon, value, label, copy]) => (
            <div className="testimonials-reference-stat" data-icon={icon} key={label}>
              <span aria-hidden="true" />
              <div>
                <strong>{value}</strong>
                <p>{label}</p>
                <small>{copy}</small>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedVideo && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(0, 0, 0, 0.88)",
            zIndex: 999999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px",
            backdropFilter: "blur(6px)",
          }}
          onClick={() => setSelectedVideo(null)}
        >
          <div
            style={{
              position: "relative",
              maxWidth: "760px",
              width: "100%",
              maxHeight: "90vh",
              background: "#181818",
              borderRadius: "16px",
              overflow: "hidden",
              boxShadow: "0 25px 60px rgba(0, 0, 0, 0.8)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedVideo(null)}
              style={{
                position: "absolute",
                top: "14px",
                right: "14px",
                zIndex: 10,
                background: "rgba(0, 0, 0, 0.7)",
                border: "none",
                color: "#fff",
                width: "36px",
                height: "36px",
                borderRadius: "50%",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "18px",
              }}
              aria-label="Close video"
            >
              ✕
            </button>
            <video
              src={selectedVideo}
              controls
              autoPlay
              playsInline
              style={{ width: "100%", maxHeight: "80vh", display: "block", backgroundColor: "#000" }}
            />
          </div>
        </div>
      )}
    </section>
  );
}
