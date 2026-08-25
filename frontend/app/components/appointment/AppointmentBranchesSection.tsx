"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { MapPin, Clock, Check, Phone, ArrowRight } from "lucide-react";
import { getPublicBranches, getImageDisplayUrl } from "@/app/services/api";

export function AppointmentBranchesSection() {
  const [mainBranch, setMainBranch] = useState<any>(null);

  useEffect(() => {
    async function loadMainBranch() {
      try {
        const data = await getPublicBranches();
        if (Array.isArray(data) && data.length > 0) {
          const main = data.find(
            (b: any) => b.isMainBranch === true || b.code === "KTK" || (b.type && b.type.includes("INPATIENT"))
          ) || data[0];

          setMainBranch({
            id: main.code || "ktk",
            name: main.name || "Susrutha Institute of Ayurvedic Sciences & Panchakarma Hospital",
            type: "Main Inpatient Hospital & Research Center",
            address: typeof main.address === "object"
              ? `${main.address.street || ''}, ${main.address.city || ''}, Kerala - ${main.address.pincode || '695572'}`
              : (main.address || "Opposite Christian College, Kattakada, Thiruvananthapuram, Kerala 695572"),
            timing: main.opdTimings || "24x7 Inpatient | OPD: Mon - Sat (8:00 AM - 7:00 PM)",
            phone: (main.contact?.phone?.[0]) || "0471-2291027",
            image: (main.coverImage || main.image) ? getImageDisplayUrl(main.coverImage || main.image) : "/images/kattakada-hero-landscape.webp",
            features: main.features?.length ? main.features.slice(0, 3) : ["40 Inpatient Beds", "Panchakarma Suites", "Research Unit"],
          });
        }
      } catch (err) {
        console.error("Failed to load main branch for appointment section:", err);
      }
    }
    loadMainBranch();
  }, []);

  if (!mainBranch) return null;

  return (
    <section className="apt-branches-luxury">
      <div className="apt-branches-container-luxury">
        <div className="apt-section-header text-center">
          <span className="apt-eyebrow-badge-gold">MAIN HOSPITAL CAMPUS</span>
          <h2 className="apt-section-title-luxury">Our Flagship Susrutha Hospital</h2>
          <p className="apt-section-subhead-luxury">State-of-the-art diagnostic suites, Panchakarma treatment rooms, and 24x7 inpatient suites</p>
        </div>

        <div className="apt-branches-grid-deluxe" style={{ display: "flex", justifyContent: "center" }}>
          <article className="apt-branch-card-deluxe" style={{ maxWidth: "680px", width: "100%" }}>
            <div className="branch-card-media-deluxe">
              <Image src={mainBranch.image} alt={mainBranch.name} fill sizes="(max-width: 768px) 100vw, 50vw" className="branch-media-img" />
              <div className="branch-media-gradient" />
              <span className="branch-type-pill">{mainBranch.type}</span>
            </div>

            <div className="branch-card-body-deluxe">
              <h3>{mainBranch.name}</h3>
              <p className="branch-addr-text">
                <MapPin size={15} strokeWidth={1.5} className="inline-icon" style={{ display: "inline-block", verticalAlign: "-2px", marginRight: "6px", color: "var(--gold, #d97706)" }} />
                {mainBranch.address}
              </p>
              <p className="branch-timing-text">
                <Clock size={15} strokeWidth={1.5} className="inline-icon" style={{ display: "inline-block", verticalAlign: "-2px", marginRight: "6px", color: "var(--gold, #d97706)" }} />
                {mainBranch.timing}
              </p>

              <div className="branch-features-wrap">
                {mainBranch.features.map((feat: string) => (
                  <span key={feat} className="branch-feat-chip">
                    <Check size={12} strokeWidth={1.75} style={{ display: "inline-block", verticalAlign: "-1px", marginRight: "4px" }} />
                    {feat}
                  </span>
                ))}
              </div>

              <div className="branch-card-actions-row">
                <a href={`tel:${mainBranch.phone.replaceAll(" ", "")}`} className="branch-call-btn">
                  <Phone size={14} strokeWidth={1.5} style={{ display: "inline-block", verticalAlign: "-2px", marginRight: "6px" }} />
                  {mainBranch.phone}
                </a>
                <Link href="/branches/kattakada" className="branch-explore-link">
                  Explore Hospital <ArrowRight size={13} strokeWidth={1.5} style={{ display: "inline-block", verticalAlign: "-1px", marginLeft: "4px" }} />
                </Link>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
