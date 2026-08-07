"use client";

import { useEffect, useState } from "react";
import { FacilityCard } from "./FacilityCard";
import { FacilitiesIcon } from "./FacilitiesIcon";
import { getPublicInfrastructure, getImageDisplayUrl } from "@/app/services/api";

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
            return {
              title: f.title || f.name || "Facility",
              text: f.description || f.overview || f.summary || "",
              image: getImageDisplayUrl(f.image || f.coverImage || "/images/ayurveda-village-room.webp"),
              icon: "hospital",
              featured: idx === 0,
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
      <div className="facilities-section-head facilities-section-head-row">
        <div>
          <span className="facilities-eyebrow">Facilities That Support Classical Care</span>
          <h2>Care spaces planned around the patient journey</h2>
        </div>
        <div className="facilities-controls" aria-hidden="true">
          <button type="button" disabled>
            <FacilitiesIcon name="arrow" />
          </button>
          <button type="button" disabled>
            <FacilitiesIcon name="arrow" />
          </button>
        </div>
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

