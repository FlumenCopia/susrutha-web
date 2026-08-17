"use client";

import { useEffect, useState } from "react";
import { FacilityCard } from "./FacilityCard";
import { FacilitiesIconName } from "./FacilitiesIcon";
import { getPublicInfrastructure, getImageDisplayUrl } from "@/app/services/api";

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

            return {
              title: f.title || f.name || "Facility",
              text: f.description || f.overview || f.summary || "",
              image: getImageDisplayUrl(f.image || f.coverImage || "/images/ayurveda-village-room.webp"),
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
      {!loading && facilitiesList.length === 0 ? (
        <div style={{ padding: "40px 0", textAlign: "center", opacity: 0.7 }}>
          <p>No facilities listed at this time.</p>
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
