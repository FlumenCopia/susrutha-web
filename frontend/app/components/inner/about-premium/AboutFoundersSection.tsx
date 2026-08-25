"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { getPublicDoctors, getImageDisplayUrl } from "@/app/services/api";
import "./about-founders.css";

export function AboutFoundersSection() {
  const [leaders, setLeaders] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const touchStartX = useRef<number | null>(null);

  useEffect(() => {
    async function loadBackendLeaders() {
      try {
        setLoading(true);
        const docs = await getPublicDoctors();
        if (Array.isArray(docs) && docs.length > 0) {
          // Filter out test-generated doctor records
          const cleanDocs = docs.filter(
            (d: any) => !d.name?.includes("Test") && !d.name?.match(/\d{5,}/)
          );

          // ONLY show featured doctors & core leadership in this section
          const featuredDocs = cleanDocs.filter(
            (d: any) => d.isFeatured === true || d.featured === true || d.isDirector === true || d.isFounder === true
          );

          // If no doctor has featured flag set, show only directors/founders (never all doctors)
          const directorsOnly = cleanDocs.filter((d: any) => d.isDirector || d.isFounder);
          const docsToUse = featuredDocs.length > 0 
            ? featuredDocs 
            : directorsOnly.length > 0 
              ? directorsOnly 
              : cleanDocs.slice(0, 3);

          // Sort by sortOrder first, then directors/founders, then experience
          const sorted = [...docsToUse].sort((a: any, b: any) => {
            if (a.sortOrder !== undefined && b.sortOrder !== undefined && a.sortOrder !== b.sortOrder) {
              return (a.sortOrder || 0) - (b.sortOrder || 0);
            }
            if (a.isDirector || a.isFounder) return -1;
            if (b.isDirector || b.isFounder) return 1;
            return (b.experienceYears || 0) - (a.experienceYears || 0);
          });

          const normalized = sorted.map((d: any) => {
            let img = getImageDisplayUrl(d.photo || d.photoUrl || d.image);
            if (!img) {
              const slug = (d.slug || "").toLowerCase();
              if (slug.includes("krishnakumar")) img = "/images/dr_krishnakumar.webp";
              else if (slug.includes("sreeja")) img = "/images/dr_sreeja_krishna.webp";
              else if (slug.includes("sasidharan")) img = "/images/dr_sasidharan.webp";
              else if (slug.includes("priyanka")) img = "/images/dr_priyanka.webp";
              else img = "/images/dr_krishnakumar.webp";
            }

            return {
              name: d.name,
              role: d.designation || d.title || "Senior Ayurvedic Physician",
              copy: `${d.experienceYears || 15}+ years of experience in ${d.specialties?.[0] || 'Panchakarma & Ayurveda care'}.`,
              image: img,
              href: `/doctors/${d.slug}`,
              isBackendData: true,
            };
          });

          setLeaders(normalized);
        } else {
          setLeaders([]);
        }
      } catch (err) {
        console.error("Failed to load leaders on About page:", err);
        setLeaders([]);
      } finally {
        setLoading(false);
      }
    }
    loadBackendLeaders();
  }, []);

  // Autoplay functionality - moves cards automatically every 4 seconds
  useEffect(() => {
    if (leaders.length <= 1 || isPaused) return;

    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % leaders.length);
    }, 1500);

    return () => clearInterval(timer);
  }, [leaders.length, isPaused]);

  const handlePrev = () => {
    if (leaders.length === 0) return;
    setActiveIndex((prev) => (prev - 1 + leaders.length) % leaders.length);
  };

  const handleNext = () => {
    if (leaders.length === 0) return;
    setActiveIndex((prev) => (prev + 1) % leaders.length);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diffX = touchStartX.current - touchEndX;
    if (Math.abs(diffX) > 40) {
      if (diffX > 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }
    touchStartX.current = null;
  };

  const getCardOffset = (index: number) => {
    const total = leaders.length;
    if (total === 0) return 0;
    let diff = index - activeIndex;

    // Circular wrapping calculation
    if (diff > total / 2) diff -= total;
    if (diff < -total / 2) diff += total;

    return diff;
  };

  return (
    <section className="af-section">
      <div className="af-container">
        <header className="af-header">
          <div className="af-header-left">
            <h2 className="af-title">OUR CORE LEADERSHIP</h2>
            <p className="af-subtext">
              Meet our senior Vaidyas, medical directors, and clinical specialists leading authentic Ayurvedic care.
            </p>
          </div>
        </header>

        {/* 3D Stacked Coverflow Carousel matching 70yy.in with Autoplay */}
        <div 
          className="af-carousel-stage"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={(e) => {
            setIsPaused(true);
            handleTouchStart(e);
          }}
          onTouchEnd={(e) => {
            handleTouchEnd(e);
            setTimeout(() => setIsPaused(false), 2000);
          }}
        >
          {/* Left Floating Navigation Arrow */}
          <button
            type="button"
            className="af-nav-btn af-nav-prev"
            onClick={handlePrev}
            aria-label="Previous doctor"
          >
            <ChevronLeft size={24} strokeWidth={2.2} />
          </button>

          {/* Cards Track */}
          <div className="af-carousel-track">
            {leaders.map((founder, idx) => {
              const offset = getCardOffset(idx);
              const isCenter = offset === 0;

              return (
                <div
                  key={founder.name}
                  className={`af-3d-card ${isCenter ? "af-card-active" : ""}`}
                  data-offset={offset}
                  onClick={() => {
                    if (!isCenter) {
                      setActiveIndex(idx);
                    }
                  }}
                >
                  <Link 
                    href={founder.href} 
                    className="af-card-inner" 
                    onClick={(e) => {
                      if (!isCenter) {
                        e.preventDefault();
                      }
                    }}
                  >
                    <Image
                      src={founder.image}
                      alt={founder.name}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1100px) 50vw, 360px"
                      className="af-card-img"
                      priority={isCenter}
                    />
                    <div className="af-card-overlay">
                      <div className="af-card-content">
                        <h3 className="af-card-name">{founder.name}</h3>
                        <p className="af-card-role">{founder.role}</p>
                        <p className="af-card-copy">{founder.copy}</p>
                      </div>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>

          {/* Right Floating Navigation Arrow */}
          <button
            type="button"
            className="af-nav-btn af-nav-next"
            onClick={handleNext}
            aria-label="Next doctor"
          >
            <ChevronRight size={24} strokeWidth={2.2} />
          </button>
        </div>

        {/* Carousel Indicators / Dots */}
        {leaders.length > 1 && (
          <div className="af-dots-container">
            {leaders.slice(0, 8).map((_, i) => (
              <button
                key={i}
                type="button"
                className={`af-dot ${i === activeIndex % Math.min(leaders.length, 8) ? "active" : ""}`}
                onClick={() => setActiveIndex(i)}
                aria-label={`Go to doctor ${i + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
