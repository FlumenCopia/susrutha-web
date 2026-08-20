"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Check, Calendar, ArrowRight, Sparkles, ShieldCheck } from "lucide-react";
import { getPublicPackages, getImageDisplayUrl } from "@/app/services/api";

export function AyurVillagePackagesSection() {
  const [packages, setPackages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadPackages() {
      try {
        setLoading(true);
        const data = await getPublicPackages();
        const items = Array.isArray(data) ? data : (data as any).items || [];
        if (items.length > 0) {
          setPackages(items);
        } else {
          setPackages([
            {
              _id: "p-detox",
              slug: "panchakarma-detox",
              title: "14-Day Panchakarma Rejuvenation Package",
              subtitle: "Full Body Detoxification & Metabolic Renewal",
              overview: "Classical 5-stage Panchakarma protocol under daily senior Vaidya supervision with organic Sattvic diet and private cottage stay.",
              durationOptions: [
                { days: 7, price: 18000, label: "7 Days Express Detox" },
                { days: 14, price: 34000, label: "14 Days Complete Rejuvenation" },
                { days: 21, price: 49000, label: "21 Days Deep Tissue Detox" },
              ],
              startingPrice: 18000,
              image: "/uploads/treatment-panchakarma.webp",
            },
            {
              _id: "p-spine",
              slug: "low-back-pain-care-package",
              title: "Spine, Lumbar & Joint Care Program",
              subtitle: "Targeted Kati Vasthi & Pain Relief",
              overview: "Specialized lumbar and joint care program combining Kati Vasthi, Elakizhi, and warm medicated oil pooling for chronic pain relief.",
              durationOptions: [
                { days: 7, price: 16000, label: "7 Days Intensive Care" },
                { days: 14, price: 29000, label: "14 Days Rehabilitation" },
              ],
              startingPrice: 16000,
              image: "/uploads/opt_spine_joint.jpg",
            },
            {
              _id: "p-postnatal",
              slug: "post-natal-care-package-op-ip",
              title: "Prasava Raksha Post-Natal Care",
              subtitle: "Mother & Newborn Ayurvedic Wellness",
              overview: "Traditional Kerala post-delivery care focused on maternal strength restoration, uterine recovery, lactation support, and baby massage.",
              durationOptions: [
                { days: 14, price: 32000, label: "14 Days Mother Care" },
                { days: 28, price: 62000, label: "28 Days Full Prasava Raksha" },
              ],
              startingPrice: 32000,
              image: "/uploads/dept_fertilization.webp",
            },
          ]);
        }
      } catch (err) {
        console.error("Failed to load Ayur Village packages:", err);
      } finally {
        setLoading(false);
      }
    }
    loadPackages();
  }, []);

  return (
    <section className="ayur-village-packages-section" style={{ padding: "80px 24px", background: "linear-gradient(180deg, #fdfaf5 0%, #f7f1e5 100%)" }}>
      <div style={{ maxWidth: "1240px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", maxWidth: "720px", margin: "0 auto 52px" }}>
          <span style={{ display: "inline-flex", alignItems: "center", gap: "6px", padding: "6px 16px", borderRadius: "999px", background: "rgba(181, 122, 37, 0.12)", color: "#9a651e", fontWeight: 800, fontSize: "12px", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "16px" }}>
            <Sparkles size={14} /> Gramam Residential Programs
          </span>
          <h2 style={{ fontSize: "36px", fontWeight: 800, color: "#1c2a23", fontFamily: "Playfair Display, Georgia, serif", marginBottom: "14px", lineHeight: "1.2" }}>
            Physician-Guided Care Packages
          </h2>
          <p style={{ fontSize: "16px", color: "#556655", lineHeight: "1.6" }}>
            Every stay at Susrutha Ayurveda Gramam is customized by our Chief Vaidyas, combining daily Panchakarma therapies, herbal medicine, and organic Pathya dining.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "28px" }}>
          {packages.slice(0, 6).map((pkg) => {
            const imageSrc = getImageDisplayUrl(pkg.coverImage || pkg.image || "/uploads/treatment-panchakarma.webp");
            const lowestPrice = pkg.startingPrice || (pkg.durationOptions?.[0]?.price) || null;

            return (
              <article
                key={pkg._id || pkg.slug}
                style={{
                  background: "#ffffff",
                  borderRadius: "24px",
                  overflow: "hidden",
                  border: "1px solid rgba(181, 122, 37, 0.2)",
                  boxShadow: "0 10px 30px rgba(0, 0, 0, 0.04)",
                  display: "flex",
                  flexDirection: "column",
                  transition: "transform 0.3s ease, boxShadow 0.3s ease",
                }}
              >
                <div style={{ position: "relative", height: "200px", width: "100%" }}>
                  <Image src={imageSrc} alt={pkg.title} fill sizes="(max-width: 768px) 100vw, 33vw" style={{ objectFit: "cover" }} />
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, transparent 40%, rgba(10, 25, 18, 0.75) 100%)" }} />
                  <span style={{ position: "absolute", top: "16px", left: "16px", padding: "4px 12px", borderRadius: "999px", background: "rgba(255, 255, 255, 0.92)", color: "#1c2a23", fontWeight: 800, fontSize: "11px", textTransform: "uppercase" }}>
                    {pkg.category || "Inpatient Care"}
                  </span>
                  {lowestPrice && (
                    <span style={{ position: "absolute", bottom: "16px", right: "16px", padding: "6px 14px", borderRadius: "999px", background: "#b57a25", color: "#ffffff", fontWeight: 800, fontSize: "13px" }}>
                      From ₹{lowestPrice.toLocaleString("en-IN")}
                    </span>
                  )}
                </div>

                <div style={{ padding: "24px", display: "flex", flexDirection: "column", flex: 1 }}>
                  <h3 style={{ fontSize: "20px", fontWeight: 700, color: "#1c2a23", marginBottom: "8px", lineHeight: "1.3" }}>
                    {pkg.title}
                  </h3>
                  <p style={{ fontSize: "14px", color: "#556655", lineHeight: "1.55", marginBottom: "20px", flex: 1 }}>
                    {pkg.overview?.slice(0, 120) || pkg.subtitle || pkg.meta || "Comprehensive residential Ayurvedic healing program under daily senior physician care."}
                  </p>

                  <div style={{ borderTop: "1px solid #f0e6d6", paddingTop: "16px", marginTop: "auto", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "13px", color: "#2d4d3a", fontWeight: 700 }}>
                      <ShieldCheck size={16} />
                      <span>Physician Directed</span>
                    </div>
                    <Link
                      href={`/appointment?package=${encodeURIComponent(pkg.slug || pkg._id)}&type=PACKAGE_BOOKING`}
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "6px",
                        padding: "10px 20px",
                        borderRadius: "999px",
                        background: "linear-gradient(135deg, #b57a25 0%, #9a651e 100%)",
                        color: "#ffffff",
                        fontWeight: 700,
                        fontSize: "13px",
                        textDecoration: "none",
                        boxShadow: "0 4px 12px rgba(181, 122, 37, 0.25)",
                      }}
                    >
                      <span>Book Stay</span>
                      <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
