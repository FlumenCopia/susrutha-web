"use client";

import { useEffect, useState } from "react";
import { facilityCards as fallbackFacilities } from "./facilitiesData";
import { FacilityCard } from "./FacilityCard";
import { FacilitiesIcon } from "./FacilitiesIcon";
import { getPublicInfrastructure, getImageDisplayUrl } from "@/app/services/api";

export function FacilitiesGrid() {
  const [facilitiesList, setFacilitiesList] = useState(fallbackFacilities);

  useEffect(() => {
    async function loadFacilities() {
      try {
        const data = await getPublicInfrastructure();
        if (Array.isArray(data) && data.length > 0) {
          const normalized = data.map((f: any, idx: number) => {
            const fb = fallbackFacilities[idx] || fallbackFacilities[0];
            return {
              title: f.title || fb.title,
              text: f.description || f.overview || fb.text,
              image: getImageDisplayUrl(f.image || f.coverImage || fb.image),
              icon: fb.icon as any,
              featured: idx === 0,
            };
          });
          setFacilitiesList(normalized as any);
        }
      } catch (err) {
        console.error("Failed to load live facilities:", err);
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
      <div className="facilities-card-row">
        {facilitiesList.map((facility) => (
          <FacilityCard facility={facility} key={facility.title} />
        ))}
      </div>
    </section>
  );
}
