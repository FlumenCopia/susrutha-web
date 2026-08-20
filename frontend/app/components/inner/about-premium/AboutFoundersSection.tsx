"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { getPublicDoctors, getImageDisplayUrl } from "@/app/services/api";
import "./about-founders.css";

export function AboutFoundersSection() {
  const [leaders, setLeaders] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const scrollRef = useRef<HTMLDivElement>(null);

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
          const sourceDocs = cleanDocs.length > 0 ? cleanDocs : docs;

          // Sort directors/founders or senior doctors first
          const sorted = [...sourceDocs].sort((a: any, b: any) => {
            if (a.isDirector || a.isFounder) return -1;
            if (b.isDirector || b.isFounder) return 1;
            return (b.experienceYears || 0) - (a.experienceYears || 0);
          });

          const normalized = sorted.map((d: any) => ({
            name: d.name,
            role: d.designation || d.title || "Senior Ayurvedic Physician",
            copy: `${d.experienceYears || 15}+ years of experience in ${d.specialties?.[0] || 'Panchakarma & Ayurveda care'}.`,
            image: getImageDisplayUrl(d.photo || d.photoUrl || d.image),
            href: `/doctors/${d.slug}`,
            isBackendData: true,
          }));

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

  const handleScroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = direction === "left" ? -340 : 340;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <section className="af-section">
      <div className="af-container">
        <header className="af-header">
          <span className="af-eyebrow">OUR CORE LEADERSHIP</span>
          <h2 className="af-title">Rooted in Ayurveda. Driven by Purpose.</h2>
          <p className="af-subtext">
            Meet our senior Vaidyas, medical directors, and clinical specialists leading authentic Ayurvedic care.
          </p>

          {leaders.length > 4 && (
            <div className="af-scroll-controls" aria-label="Leadership scroll navigation">
              <button
                type="button"
                className="af-scroll-btn"
                onClick={() => handleScroll("left")}
                aria-label="Scroll left"
              >
                ‹
              </button>
              <button
                type="button"
                className="af-scroll-btn"
                onClick={() => handleScroll("right")}
                aria-label="Scroll right"
              >
                ›
              </button>
            </div>
          )}
        </header>

        <div className="af-grid" ref={scrollRef}>
          {leaders.map((founder) => (
            <Link href={founder.href} className="af-card" key={founder.name}>
              <Image
                src={founder.image}
                alt={founder.name}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1100px) 50vw, 300px"
                className="af-card-img"
              />
              <div className="af-card-overlay">
                <div className="af-card-content">
                  <h3 className="af-card-name">{founder.name}</h3>
                  <p className="af-card-role">{founder.role}</p>
                  <p className="af-card-copy">{founder.copy}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* <div className="af-footer-cta">
          <Link href="/doctors" className="af-view-all-btn">
            <span>View All Doctors & Specialists</span>
            <span aria-hidden="true">&rarr;</span>
          </Link>
        </div> */}
      </div>
    </section>
  );
}
