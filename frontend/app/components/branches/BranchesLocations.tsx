"use client";

import { useEffect, useState } from "react";
import { BranchLocationCard } from "./BranchLocationCard";
import { BranchIcon } from "./BranchIcons";
import { branches as fallbackBranches, branchRouteSteps } from "./branchesData";
import { getPublicBranches, getImageDisplayUrl } from "@/app/services/api";

export function BranchesLocations() {
  const [branchList, setBranchList] = useState(fallbackBranches);

  useEffect(() => {
    async function loadBranches() {
      try {
        const data = await getPublicBranches();
        if (Array.isArray(data) && data.length > 0) {
          const normalized = data.map((b: any, idx: number) => {
            const fb = fallbackBranches[idx] || fallbackBranches[0];
            return {
              id: b.code ? b.code.toLowerCase() : fb.id,
              title: b.name || fb.title,
              label: b.tagline || fb.label,
              description: b.features ? b.features.join(' • ') : fb.description,
              location: typeof b.address === 'object' ? `${b.address.street}, ${b.address.city}` : (b.address || fb.location),
              hours: b.opdTimings || fb.hours,
              phone: (b.contact && b.contact.phone && b.contact.phone[0]) ? b.contact.phone[0] : fb.phone,
              image: getImageDisplayUrl(b.coverImage || fb.image),
              icon: fb.icon as any,
              details: b.features && b.features.length > 0 ? b.features.slice(0, 4) : fb.details,
              doctors: fb.doctors,
              mapsHref: fb.mapsHref,
            };
          });
          setBranchList(normalized as any);
        }
      } catch (err) {
        console.error("Failed to load live branches:", err);
      }
    }
    loadBranches();
  }, []);

  return (
    <section className="branches-locations" id="branch-locations">
      <div className="branches-section-heading">
        <span>
          <i />
          Our Locations
          <i />
        </span>
        <h2>Care Closer to You</h2>
        <p>Whether you need comprehensive inpatient care or convenient outpatient consultations, we are here for you.</p>
      </div>

      <div className="branches-location-grid">
        {branchList.map((branch) => (
          <BranchLocationCard branch={branch} key={branch.id} />
        ))}
      </div>

      <div className="branches-route-strip" aria-label="Branch care path">
        {branchRouteSteps.map((step) => (
          <span key={step.label}>
            <BranchIcon name={step.icon} />
            {step.label}
          </span>
        ))}
      </div>
    </section>
  );
}
