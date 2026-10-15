"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { FacilityCard } from "./FacilityCard";
import { FacilitiesIcon, FacilitiesIconName } from "./FacilitiesIcon";
import { getPublicInfrastructure, getImageDisplayUrl } from "@/app/services/api";
import { SkeletonCard } from "@/app/components/common/SkeletonCard";

const categoryIconMap: Record<string, FacilitiesIconName> = {
  ROOMS: "room",
  PANCHAKARMA_SUITES: "lotus",
  OPERATING_THEATRE: "operation",
  PHYSIOTHERAPY: "physio",
  YOGA_HALL: "yoga",
  AYUR_VILLAGE: "leaf",
  RESEARCH_FACILITY: "building",
  OTHER: "building",
  accommodation: "room",
  "treatment-suites": "lotus",
  "yoga-meditation": "yoga",
};

const defaultFacilityPhotos = [
  "/images/kowdiar_gallery_01.webp",
  "/images/treatment-panchakarma.webp",
  "/images/kowdiar_gallery_03.webp",
  "/images/ayurveda-hospital-garden.webp",
  "/images/about-purpose-still-life.webp",
  "/images/treatment-kati-vasti.webp",
];

export function FacilitiesGrid() {
  const [facilitiesList, setFacilitiesList] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function loadFacilities() {
      try {
        setLoading(true);
        const data = await getPublicInfrastructure();
        if (Array.isArray(data) && data.length > 0) {
          const normalized = data.map((f: any, idx: number) => {
            const catKey = (f.category || "").toString();
            const mappedIcon = categoryIconMap[catKey] || categoryIconMap[catKey.toUpperCase()] || "building";

            const fallbackImg = defaultFacilityPhotos[idx % defaultFacilityPhotos.length];
            const rawImg = f.image || f.coverImage;
            const finalImage = rawImg ? getImageDisplayUrl(rawImg) : fallbackImg;

            return {
              title: f.title || f.name || "Facility",
              text: f.description || f.overview || f.summary || "",
              image: finalImage,
              icon: mappedIcon as FacilitiesIconName,
              featured: idx === 0,
              isBackendData: true,
            };
          });
          setFacilitiesList(normalized);
        } else {
          setFacilitiesList([]);
        }
      } catch (err) {
        console.error("Failed to load live facilities:", err);
        setFacilitiesList([]);
      } finally {
        setLoading(false);
      }
    }
    loadFacilities();
  }, []);

  return (
    <section className="facilities-grid-section">
      <div className="facilities-section-head">
        <span className="facilities-eyebrow">Facilities That Support Classical Care</span>
        <h2>Care spaces planned around the patient journey</h2>
      </div>
      {loading ? (
        <div className="facilities-card-row">
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
        </div>
      ) : facilitiesList.length === 0 ? (
        <div
          style={{
            maxWidth: "760px",
            margin: "20px auto 40px",
            padding: "48px 32px",
            background: "linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(250, 246, 240, 0.95) 100%)",
            border: "1px solid rgba(181, 122, 37, 0.25)",
            borderRadius: "24px",
            textAlign: "center",
            boxShadow: "0 12px 36px rgba(71, 50, 26, 0.06)",
          }}
        >
          <div
            style={{
              width: "56px",
              height: "56px",
              margin: "0 auto 20px",
              borderRadius: "50%",
              background: "rgba(181, 122, 37, 0.12)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#b57a25",
            }}
          >
            <FacilitiesIcon name="building" />
          </div>
          <span
            style={{
              fontSize: "12px",
              fontWeight: 800,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "#b57a25",
              display: "block",
              marginBottom: "10px",
            }}
          >
            Inpatient & Care Facilities
          </span>
          <h3
            style={{
              fontSize: "24px",
              fontWeight: 800,
              color: "#1a140c",
              margin: "0 0 14px",
              lineHeight: 1.3,
            }}
          >
            Need Guidance on Rooms or Inpatient Admission?
          </h3>
          <p
            style={{
              fontSize: "15px",
              color: "#5c5040",
              lineHeight: 1.6,
              maxWidth: "580px",
              margin: "0 auto 28px",
            }}
          >
            Our full campus photo archive and infrastructure specifications are being updated.
            For current room availability, private suite amenities, or treatment stay enquiries, our care team is available 24/7.
          </p>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "14px",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Link
              href="/contact-us"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                background: "linear-gradient(135deg, #d49e54 0%, #b57a25 100%)",
                color: "#ffffff",
                padding: "14px 28px",
                borderRadius: "999px",
                fontWeight: 700,
                fontSize: "15px",
                textDecoration: "none",
                boxShadow: "0 6px 20px rgba(181, 122, 37, 0.35)",
              }}
            >
              <span>Enquire About Facilities</span>
              <FacilitiesIcon name="arrow" />
            </Link>
            <a
              href="tel:+919656656736"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                background: "#ffffff",
                color: "#1a140c",
                padding: "13px 26px",
                borderRadius: "999px",
                fontWeight: 700,
                fontSize: "14.5px",
                textDecoration: "none",
                border: "1.5px solid rgba(181, 122, 37, 0.35)",
              }}
            >
              <span>Call Campus: +91 96566 56736</span>
            </a>
          </div>
        </div>
      ) : (
        <div className="facilities-card-row">
          {facilitiesList.map((facility) => (
            <FacilityCard facility={facility} key={facility.title} />
          ))}
        </div>
      )}
    </section>
  );
}
