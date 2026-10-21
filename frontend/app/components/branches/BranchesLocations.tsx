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
          // Sort to put Main Hospital Campus (KTK) first, followed by Kowdiar (KWR)
          const sorted = [...data].sort((a: any, b: any) => (b.isMainBranch ? 1 : 0) - (a.isMainBranch ? 1 : 0));

          const normalized = sorted.map((b: any, idx: number) => {
            const branchCode = (b.code || "").toUpperCase();
            const isKowdiar = branchCode === "KWR" || (b.name && b.name.toLowerCase().includes("kowdiar"));
            const branchSlug = isKowdiar ? "kowdiar" : "kattakada";

            return {
              id: branchSlug,
              title: b.name || (isKowdiar ? "Susrutha Panchakarma Hospital OP Outlet" : "Susrutha Institute of Ayurvedic Sciences & Panchakarma Hospital"),
              label: b.tagline || (isKowdiar ? "Executive City Clinic & OP Outlet" : "Main Hospital & Inpatient Campus"),
              description: b.overview || b.tagline || (isKowdiar
                ? "Executive OPD consultation, daycare Panchakarma therapies, and medicine counter in the heart of Trivandrum."
                : "Flagship 40-bed inpatient hospital campus, research center, and Panchakarma suites."),
              location: typeof b.address === 'object' 
                ? `${b.address.street || ''}, ${b.address.city || ''}, Kerala ${b.address.pincode ? '- ' + b.address.pincode : ''}` 
                : (b.address || (isKowdiar 
                    ? "Ground Floor, Urbon Heights, Opposite Income Tax Office, Pipelane Road, Kowdiar, Trivandrum - 695003"
                    : "Opposite Christian College, Kattakada, Thiruvananthapuram, Kerala - 695572")),
              hours: b.opdTimings || (isKowdiar ? "09:00 AM - 07:00 PM (Mon - Sun)" : "24x7 Inpatient Care | OPD: 09:00 AM - 07:00 PM"),
              phone: (b.contact && b.contact.phone && b.contact.phone[0]) ? b.contact.phone[0] : (isKowdiar ? "+91 80754 33728" : "0471-2291027"),
              image: (b.coverImage || b.image) ? getImageDisplayUrl(b.coverImage || b.image) : (isKowdiar ? "/images/opt_spine_joint.jpg" : "/images/banner_welcome.webp"),
              icon: (isKowdiar ? "lotus" : "building") as BranchIconName,
              details: b.features && b.features.length > 0 
                ? b.features.slice(0, 4) 
                : (isKowdiar
                    ? ["Specialist OPD Consultation", "Daycare Panchakarma", "Nadi Pariksha", "Medicine Counter"]
                    : ["24x7 Inpatient Care", "NABH Accredited Suites", "Susrutha Pharmacy", "Clinical Research Unit"]),
              doctors: isKowdiar 
                ? ["Dr. Krishnakumar K.", "Dr. Sreeja Krishna S."]
                : ["Dr. Krishnakumar K.", "Dr. Sreeja Krishna S.", "Dr. Priyanka R."],
              mapsHref: b.mapsUrl || (isKowdiar
                ? "https://maps.google.com/?q=Susrutha+Panchakarma+Hospital+OP+Outlet+Kowdiar"
                : "https://maps.google.com/?q=Susrutha+Institute+of+Ayurvedic+Sciences+and+Panchakarma+Hospital+Kattakada"),
              isBackendData: true,
            };
          });
          setBranchList(normalized);
        } else {
          setBranchList([]);
        }
      } catch (err) {
        console.error("Failed to load branches from backend:", err);
        setBranchList([]);
      } finally {
        setLoading(false);
      }
    }
    loadMainBranchFromBackend();
  }, []);

  // Smooth scroll to anchor hash (e.g. #kattakada or #kowdiar) after branches load or hash changes
  useEffect(() => {
    const scrollToHash = () => {
      if (typeof window !== "undefined" && window.location.hash) {
        const targetId = window.location.hash.replace("#", "").toLowerCase();
        const el = document.getElementById(targetId);
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }
    };

    if (branchList.length > 0) {
      setTimeout(scrollToHash, 180);
    }

    window.addEventListener("hashchange", scrollToHash);
    return () => window.removeEventListener("hashchange", scrollToHash);
  }, [branchList]);

  return (
    <section className="branches-locations" id="branch-locations">
      <div className="branches-section-heading">
        <span>
          <i />
          Hospital & Clinic Locations
          <i />
        </span>
        <h2>Our Hospital & Clinic Campuses</h2>
        <p>Comprehensive 24x7 inpatient care, research-backed Panchakarma suites, and specialist consultations across our campuses.</p>
      </div>

      {!loading && branchList.length === 0 ? (
        <div style={{ padding: "40px 0", textAlign: "center", opacity: 0.7 }}>
          <p>Loading hospital locations from backend...</p>
        </div>
      ) : (
        <div className="branches-location-grid">
          {branchList.map((branch) => (
            <BranchLocationCard branch={branch} key={branch.id} />
          ))}
        </div>
      )}
    </section>
  );
}
