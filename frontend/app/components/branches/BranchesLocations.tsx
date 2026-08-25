"use client";

import { useEffect, useState } from "react";
import { BranchLocationCard } from "./BranchLocationCard";
import { type BranchIconName } from "./BranchIcons";
import { getPublicBranches, getImageDisplayUrl } from "@/app/services/api";

export function BranchesLocations() {
  const [branchList, setBranchList] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function loadMainBranchFromBackend() {
      try {
        setLoading(true);
        const data = await getPublicBranches();
        if (Array.isArray(data) && data.length > 0) {
          // STRICTLY filter to show ONLY the Main Branch from the backend
          const mainBranchData = data.filter(
            (b: any) => b.isMainBranch === true || b.code === "KTK" || (b.type && b.type.includes("INPATIENT"))
          );

          const source = mainBranchData.length > 0 ? mainBranchData : [data[0]];

          const normalized = source.map((b: any, idx: number) => {
            return {
              id: b.code ? b.code.toLowerCase() : `main-b-${idx}`,
              title: b.name || "Susrutha Institute of Ayurvedic Sciences & Panchakarma Hospital",
              label: b.tagline || "Main Hospital & Inpatient Campus",
              description: b.overview || b.tagline || "Flagship 40-bed inpatient hospital campus, research center, and Panchakarma suites.",
              location: typeof b.address === 'object' 
                ? `${b.address.street || ''}, ${b.address.city || ''}, Kerala ${b.address.pincode ? '- ' + b.address.pincode : ''}` 
                : (b.address || "Opposite Christian College, Kattakada, Thiruvananthapuram, Kerala - 695572"),
              hours: b.opdTimings || "24x7 Inpatient Care | OPD: 09:00 AM - 07:00 PM",
              phone: (b.contact && b.contact.phone && b.contact.phone[0]) ? b.contact.phone[0] : "0471-2291027",
              image: (b.coverImage || b.image) ? getImageDisplayUrl(b.coverImage || b.image) : "/images/banner_welcome.webp",
              icon: "building" as BranchIconName,
              details: b.features && b.features.length > 0 
                ? b.features.slice(0, 4) 
                : ["24x7 Inpatient Care", "NABH Accredited Suites", "Susrutha Pharmacy", "Clinical Research Unit"],
              doctors: ["Dr. Krishnakumar K.", "Dr. Sreeja Krishna S.", "Dr. Priyanka R."],
              mapsHref: b.mapsUrl || "https://maps.google.com/?q=Susrutha+Institute+of+Ayurvedic+Sciences+and+Panchakarma+Hospital+Kattakada",
              isBackendData: true,
            };
          });
          setBranchList(normalized);
        } else {
          setBranchList([]);
        }
      } catch (err) {
        console.error("Failed to load main branch from backend:", err);
        setBranchList([]);
      } finally {
        setLoading(false);
      }
    }
    loadMainBranchFromBackend();
  }, []);

  return (
    <section className="branches-locations" id="branch-locations">
      <div className="branches-section-heading">
        <span>
          <i />
          Main Hospital Campus
          <i />
        </span>
        <h2>Our Flagship Main Branch</h2>
        <p>Comprehensive 24x7 inpatient care, research-backed Panchakarma suites, and specialist consultations.</p>
      </div>

      {!loading && branchList.length === 0 ? (
        <div style={{ padding: "40px 0", textAlign: "center", opacity: 0.7 }}>
          <p>Loading main hospital location from backend...</p>
        </div>
      ) : (
        <div className="branches-location-grid" style={{ display: "flex", justifyContent: "center" }}>
          {branchList.map((branch) => (
            <BranchLocationCard branch={branch} key={branch.id} />
          ))}
        </div>
      )}
    </section>
  );
}
