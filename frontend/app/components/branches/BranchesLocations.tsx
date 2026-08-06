"use client";

import { useEffect, useState } from "react";
import { BranchLocationCard } from "./BranchLocationCard";
import { BranchIcon } from "./BranchIcons";
import { branchRouteSteps } from "./branchesData";
import { getPublicBranches, getImageDisplayUrl } from "@/app/services/api";

export function BranchesLocations() {
  const [branchList, setBranchList] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function loadBranches() {
      try {
        setLoading(true);
        const data = await getPublicBranches();
        if (Array.isArray(data) && data.length > 0) {
          const normalized = data.map((b: any, idx: number) => {
            return {
              id: b.code ? b.code.toLowerCase() : `b-${idx}`,
              title: b.name || "Susrutha Branch",
              label: b.tagline || "Ayurvedic Centre",
              description: b.features ? b.features.join(' • ') : (b.overview || ""),
              location: typeof b.address === 'object' ? `${b.address.street || ''}, ${b.address.city || ''}` : (b.address || ""),
              hours: b.opdTimings || "8:00 AM - 7:00 PM",
              phone: (b.contact && b.contact.phone && b.contact.phone[0]) ? b.contact.phone[0] : "+91 9645 555 888",
              image: getImageDisplayUrl(b.coverImage || b.image),
              icon: "hospital",
              details: b.features && b.features.length > 0 ? b.features.slice(0, 4) : ["Consultations", "Panchakarma"],
              doctors: ["Specialist Vaidyas"],
              mapsHref: "https://maps.google.com",
            };
          });
          setBranchList(normalized);
        } else {
          setBranchList([]);
        }
      } catch (err) {
        console.error("Failed to load live branches:", err);
        setBranchList([]);
      } finally {
        setLoading(false);
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

      {!loading && branchList.length === 0 ? (
        <div style={{ padding: "40px 0", textAlign: "center", opacity: 0.7 }}>
          <p>No branch locations currently listed.</p>
        </div>
      ) : (
        <div className="branches-location-grid">
          {branchList.map((branch) => (
            <BranchLocationCard branch={branch} key={branch.id} />
          ))}
        </div>
      )}

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

