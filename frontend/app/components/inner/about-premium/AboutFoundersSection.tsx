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

          // ONLY show featured doctors in this section
          const featuredDocs = cleanDocs.filter(
            (d: any) => d.isFeatured === true || d.featured === true
          );

          const sourceDocs = featuredDocs.length > 0 
            ? featuredDocs 
            : cleanDocs.filter((d: any) => d.isDirector || d.isFounder);

          // Sort by sortOrder first, then directors/founders, then experience
          const sorted = [...sourceDocs].sort((a: any, b: any) => {
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

  const handleScroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const card = scrollRef.current.querySelector<HTMLElement>(".af-card");
      const cardWidth = card ? card.offsetWidth + 24 : 380;
      const scrollAmount = direction === "left" ? -cardWidth : cardWidth;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <section className="af-section">
      <div className="af-container">
        <header className="af-header">
          <div className="af-header-left">
            {/* <span className="af-eyebrow">OUR CORE LEADERSHIP</span> */}
            <h2 className="af-title">OUR CORE LEADERSHIP</h2>
            <p className="af-subtext">
              Meet our senior Vaidyas, medical directors, and clinical specialists leading authentic Ayurvedic care.
            </p>
          </div>

          <div className="af-header-right">
            <div className="af-scroll-controls" aria-label="Leadership scroll navigation">
              <button
                type="button"
                className="af-scroll-btn"
                onClick={() => handleScroll("left")}
                aria-label="Scroll left"
              >
                <ChevronLeft size={20} strokeWidth={2.2} />
              </button>
              <button
                type="button"
                className="af-scroll-btn"
                onClick={() => handleScroll("right")}
                aria-label="Scroll right"
              >
                <ChevronRight size={20} strokeWidth={2.2} />
              </button>
            </div>
          </div>
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
