"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { ConditionDetail } from "./ConditionDetailBanner";
import { getPublicDoctors, getPublicTreatments, getPublicPackages, getImageDisplayUrl } from "@/app/services/api";

type ConditionDetailCareSectionProps = {
  condition: ConditionDetail;
};

const TREATMENT_FALLBACK_IMAGES: Record<string, string> = {
  basti: "/images/treatment-kati-vasti.webp",
  vasti: "/images/treatment-kati-vasti.webp",
  dhara: "/images/treatment-sirodhara.webp",
  shiro: "/images/treatment-sirodhara.webp",
  kizhi: "/images/treatment-njavarakizhi.webp",
  herbal: "/images/treatment-herbal-medicine.webp",
  skin: "/images/banner_cupping_therapy.jpg",
  eczema: "/images/banner_cupping_therapy.jpg",
  psoriasis: "/images/banner_cupping_therapy.jpg",
  joint: "/images/opt_spine_joint.jpg",
  spine: "/images/opt_spine_joint.jpg",
  panchakarma: "/images/treatment-panchakarma.webp",
  default: "/images/treatment-panchakarma.webp",
};

function resolveTreatmentImage(tx: any): string {
  if (typeof tx === "object" && tx !== null) {
    const raw = tx.coverImage || tx.image || tx.photo || tx.photoUrl;
    if (raw) {
      const url = getImageDisplayUrl(raw);
      if (url) return url;
    }
  }
  const searchKey = (typeof tx === "object" ? `${tx.title || ""} ${tx.name || ""} ${tx.category || ""}` : String(tx)).toLowerCase();
  for (const key of Object.keys(TREATMENT_FALLBACK_IMAGES)) {
    if (searchKey.includes(key)) return TREATMENT_FALLBACK_IMAGES[key];
  }
  return TREATMENT_FALLBACK_IMAGES.default;
}

function resolvePackageImage(pkg: any): string {
  if (typeof pkg === "object" && pkg !== null) {
    const raw = pkg.coverImage || pkg.image || pkg.photo;
    if (raw) {
      const url = getImageDisplayUrl(raw);
      if (url) return url;
    }
  }
  return "/images/banner_calm_retreat.jpg";
}

export function ConditionDetailCareSection({ condition }: ConditionDetailCareSectionProps) {
  const [resolvedTreatments, setResolvedTreatments] = useState<any[]>([]);
  const [resolvedDoctors, setResolvedDoctors] = useState<any[]>([]);
  const [resolvedPackages, setResolvedPackages] = useState<any[]>([]);

  useEffect(() => {
    async function resolveCmsData() {
      const rawTx = (condition as any).recommendedTreatmentIds || (condition as any).recommendedTreatments || [];
      const rawDoc = (condition as any).specialistDoctorIds || (condition as any).specialistDoctors || [];
      const rawPkg = (condition as any).recommendedPackageIds || (condition as any).recommendedPackages || [];

      try {
        if (Array.isArray(rawTx) && rawTx.length > 0) {
          if (typeof rawTx[0] === "object" && rawTx[0] !== null) {
            setResolvedTreatments(rawTx);
          } else {
            const allTx = await getPublicTreatments();
            const items = Array.isArray(allTx) ? allTx : (allTx as any).items || [];
            const matched = items.filter((t: any) =>
              rawTx.includes(t._id) || rawTx.includes(t.id) || rawTx.includes(t.title) || rawTx.includes(t.slug)
            );
            setResolvedTreatments(matched.length > 0 ? matched : rawTx.map((id: string) => ({ title: id })));
          }
        } else {
          setResolvedTreatments([]);
        }

        if (Array.isArray(rawDoc) && rawDoc.length > 0) {
          if (typeof rawDoc[0] === "object" && rawDoc[0] !== null) {
            setResolvedDoctors(rawDoc);
          } else {
            const allDocs = await getPublicDoctors();
            const items = Array.isArray(allDocs) ? allDocs : (allDocs as any).items || [];
            const matched = items.filter((d: any) => rawDoc.includes(d._id) || rawDoc.includes(d.id) || rawDoc.includes(d.slug));
            setResolvedDoctors(matched);
          }
        } else {
          setResolvedDoctors([]);
        }

        if (Array.isArray(rawPkg) && rawPkg.length > 0) {
          if (typeof rawPkg[0] === "object" && rawPkg[0] !== null) {
            setResolvedPackages(rawPkg);
          } else {
            const allPkgs = await getPublicPackages();
            const items = Array.isArray(allPkgs) ? allPkgs : (allPkgs as any).items || [];
            const matched = items.filter((p: any) => rawPkg.includes(p._id) || rawPkg.includes(p.id) || rawPkg.includes(p.slug));
            setResolvedPackages(matched);
          }
        } else {
          setResolvedPackages([]);
        }
      } catch (err) {
        console.error("Error resolving CMS condition relations:", err);
      }
    }

    resolveCmsData();
  }, [condition]);

  const symptomsList = Array.isArray(condition.symptoms) && condition.symptoms.length > 0 ? condition.symptoms : [];
  const rootCauseText = (condition as any).ayurvedicRootCause || (condition as any).ayurvedicUnderstanding;
  const fullDesc = condition.fullDescription || condition.overview || condition.shortDescription;
  const rawReviewer = (condition as any).reviewerName || condition.reviewer;
  const reviewer = typeof rawReviewer === "string" && rawReviewer.trim().length > 0 ? rawReviewer.trim() : null;
  const faqs = (condition as any).faqs;

  return (
    <section className="condition-care-section" aria-labelledby="condition-care-title">
      {/* Top Section: Summary & Doctors */}
      <div
        className="condition-care-top-grid"
        style={{
          gridTemplateColumns: resolvedDoctors.length > 0 ? "repeat(2, minmax(0, 1fr))" : "1fr",
          gap: "24px",
          marginBottom: "48px",
        }}
      >
        {/* Clinical Summary Card */}
        <article className="condition-care-mini-card condition-care-glance-card" style={{ background: "linear-gradient(135deg, #ffffff 0%, #fffbf2 100%)", borderRadius: "24px", padding: "32px", border: "1px solid rgba(225, 215, 198, 0.8)", boxShadow: "0 10px 30px rgba(71, 50, 26, 0.05)" }}>
          <h2 style={{ fontSize: "13px", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.08em", color: "#b57a25", margin: "0 0 12px" }}>
            Clinical Summary
          </h2>
          <p style={{ fontSize: "15px", color: "#222", lineHeight: 1.7, margin: 0, fontWeight: 500 }}>
            {condition.shortDescription || condition.overview || "Comprehensive Ayurvedic care protocol."}
          </p>
          {reviewer && (
            <div style={{ marginTop: "20px", paddingTop: "14px", borderTop: "1px dashed #e8ded0", fontSize: "13px", color: "#6b5a3e", fontWeight: 600 }}>
              Medically reviewed by <em style={{ fontStyle: "normal", color: "#b57a25", fontWeight: 700 }}>{reviewer}</em>
            </div>
          )}
        </article>

        {/* Specialist Physicians Card */}
        {resolvedDoctors.length > 0 && (
          <article className="condition-care-mini-card condition-care-doctor-card" style={{ background: "linear-gradient(135deg, #ffffff 0%, #fffbf2 100%)", borderRadius: "24px", padding: "32px", border: "1px solid rgba(225, 215, 198, 0.8)", boxShadow: "0 10px 30px rgba(71, 50, 26, 0.05)" }}>
            <h2 style={{ fontSize: "13px", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.08em", color: "#b57a25", margin: "0 0 16px" }}>
              Specialist Physicians
            </h2>
            <div style={{ display: "grid", gap: "14px" }}>
              {resolvedDoctors.map((doc: any, idx: number) => {
                const docName = doc.name || doc.title || "Ayurvedic Specialist";
                const docImg = getImageDisplayUrl(doc.photo || doc.photoUrl || doc.image || "/images/dr_krishnakumar.webp");
                const docCred = doc.qualifications || doc.credential || doc.designation || "BAMS, MD (Ayurveda)";
                const docSlug = doc.slug || doc._id || "";

                return (
                  <Link
                    href={docSlug ? `/doctors/${docSlug}` : "/doctors"}
                    key={doc._id || docName + idx}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "16px",
                      padding: "12px 16px",
                      borderRadius: "16px",
                      background: "#ffffff",
                      border: "1px solid #f0e8dc",
                      textDecoration: "none",
                    }}
                  >
                    <Image
                      src={docImg}
                      alt={docName}
                      width={48}
                      height={48}
                      style={{ borderRadius: "50%", objectFit: "cover" }}
                    />
                    <div style={{ flex: 1 }}>
                      <strong style={{ display: "block", fontSize: "15px", fontWeight: 700, color: "#111" }}>{docName}</strong>
                      <span style={{ fontSize: "13px", color: "#666", fontWeight: 500 }}>{docCred}</span>
                    </div>
                    <span style={{ fontSize: "12px", fontWeight: 700, color: "#b57a25", background: "#fff8ec", padding: "6px 12px", borderRadius: "999px" }}>
                      Consult &rarr;
                    </span>
                  </Link>
                );
              })}
            </div>
          </article>
        )}
      </div>

      {/* Main Content Sections */}
      <div className="condition-care-main-grid">
        <div className="condition-care-copy" style={{ display: "grid", gap: "40px" }}>
          
          {/* Overview & Clinical Protocol */}
          {fullDesc && (
            <article className="condition-care-block">
              <span style={{ fontSize: "12px", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.08em", color: "#b57a25", display: "block", marginBottom: "8px" }}>
                CLINICAL PROTOCOL
              </span>
              <h2 id="condition-care-title" style={{ fontSize: "24px", fontWeight: 800, color: "#2c2214", margin: "0 0 16px" }}>
                Overview & Care Strategy
              </h2>
              <p style={{ fontSize: "15.5px", color: "#333", lineHeight: 1.8, whiteSpace: "pre-line", margin: 0 }}>
                {fullDesc}
              </p>
            </article>
          )}

          {/* Ayurvedic Understanding & Root Cause Callout */}
          {rootCauseText && (
            <article
              className="condition-care-block"
              style={{
                background: "linear-gradient(135deg, #fffcf7 0%, #fff7eb 100%)",
                borderRadius: "20px",
                padding: "28px 32px",
                borderLeft: "5px solid #b57a25",
                borderTop: "1px solid #f2ede4",
                borderRight: "1px solid #f2ede4",
                borderBottom: "1px solid #f2ede4",
                boxShadow: "0 6px 20px rgba(181, 122, 37, 0.05)",
              }}
            >
              <span style={{ fontSize: "12px", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.08em", color: "#b57a25", display: "block", marginBottom: "6px" }}>
                DOSHA PERSPECTIVE
              </span>
              <h2 style={{ fontSize: "20px", fontWeight: 800, color: "#2c2214", margin: "0 0 12px" }}>
                Ayurvedic Understanding & Root Cause
              </h2>
              <p style={{ fontSize: "15px", color: "#3a3022", lineHeight: 1.8, whiteSpace: "pre-line", margin: 0, fontWeight: 500 }}>
                {rootCauseText}
              </p>
            </article>
          )}

          {/* Key Symptoms Addressed */}
          {symptomsList.length > 0 && (
            <article className="condition-care-block">
              <span style={{ fontSize: "12px", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.08em", color: "#b57a25", display: "block", marginBottom: "8px" }}>
                SYMPTOMATIC FOCUS
              </span>
              <h2 style={{ fontSize: "24px", fontWeight: 800, color: "#2c2214", margin: "0 0 16px" }}>
                Key Symptoms Addressed
              </h2>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
                {symptomsList.map((symptom: string) => (
                  <span
                    key={symptom}
                    style={{
                      display: "inline-block",
                      padding: "8px 18px",
                      borderRadius: "999px",
                      background: "#ffffff",
                      border: "1.5px solid #e2d7c5",
                      color: "#2c2214",
                      fontSize: "14px",
                      fontWeight: 600,
                      boxShadow: "0 4px 12px rgba(0,0,0,0.02)",
                    }}
                  >
                    {symptom}
                  </span>
                ))}
              </div>
            </article>
          )}

          {/* Recommended Treatments Grid with Visual Cards & Images */}
          {resolvedTreatments.length > 0 && (
            <article className="condition-care-block">
              <span style={{ fontSize: "12px", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.08em", color: "#b57a25", display: "block", marginBottom: "8px" }}>
                RECOMMENDED THERAPIES
              </span>
              <h2 style={{ fontSize: "24px", fontWeight: 800, color: "#2c2214", margin: "0 0 8px" }}>
                Prescribed Treatments & Therapies
              </h2>
              <p style={{ fontSize: "14.5px", color: "#666", marginBottom: "24px" }}>
                Authentic Ayurvedic therapies prescribed for this condition based on clinical protocols:
              </p>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
                  gap: "24px",
                }}
              >
                {resolvedTreatments.map((tx: any, idx: number) => {
                  const txTitle = typeof tx === "string" ? tx : tx.title || tx.name || "Ayurvedic Therapy";
                  const txSlug = typeof tx === "object" ? tx.slug || tx._id : "";
                  const txCategory = typeof tx === "object" ? tx.category : "Ayurvedic Care";
                  const txDuration = typeof tx === "object" && tx.durationMinutes ? `${tx.durationMinutes} mins` : "";
                  const txDesc = typeof tx === "object" ? tx.shortDescription || "" : "";
                  const txImg = resolveTreatmentImage(tx);

                  return (
                    <div
                      key={idx}
                      style={{
                        borderRadius: "20px",
                        background: "#ffffff",
                        border: "1px solid rgba(225, 215, 198, 0.85)",
                        boxShadow: "0 10px 28px rgba(71, 50, 26, 0.06)",
                        overflow: "hidden",
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      <div style={{ position: "relative", width: "100%", height: "170px", background: "#f5efe6" }}>
                        <Image
                          src={txImg}
                          alt={txTitle}
                          fill
                          sizes="(max-width: 768px) 100vw, 360px"
                          style={{ objectFit: "cover" }}
                        />
                        <div
                          style={{
                            position: "absolute",
                            inset: 0,
                            background: "linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.65) 100%)",
                          }}
                        />
                        {txCategory && (
                          <span
                            style={{
                              position: "absolute",
                              top: "12px",
                              left: "12px",
                              fontSize: "11px",
                              fontWeight: 700,
                              textTransform: "uppercase",
                              letterSpacing: "0.05em",
                              color: "#ffffff",
                              background: "rgba(181, 122, 37, 0.9)",
                              padding: "4px 12px",
                              borderRadius: "999px",
                            }}
                          >
                            {txCategory}
                          </span>
                        )}
                        {txDuration && (
                          <span
                            style={{
                              position: "absolute",
                              bottom: "12px",
                              right: "12px",
                              fontSize: "11px",
                              fontWeight: 700,
                              color: "#ffffff",
                              background: "rgba(0, 0, 0, 0.65)",
                              padding: "4px 10px",
                              borderRadius: "999px",
                            }}
                          >
                            {txDuration}
                          </span>
                        )}
                      </div>

                      <div style={{ padding: "20px", display: "flex", flexDirection: "column", flex: 1, justifyContent: "space-between" }}>
                        <div>
                          <h3 style={{ fontSize: "17px", fontWeight: 800, color: "#1a140c", margin: "0 0 8px", lineHeight: 1.35 }}>
                            {txTitle}
                          </h3>
                          {txDesc && (
                            <p
                              style={{
                                fontSize: "13.5px",
                                color: "#554e44",
                                lineHeight: 1.6,
                                margin: 0,
                                display: "-webkit-box",
                                WebkitLineClamp: 2,
                                WebkitBoxOrient: "vertical",
                                overflow: "hidden",
                              }}
                            >
                              {txDesc}
                            </p>
                          )}
                        </div>

                        <div style={{ marginTop: "18px", paddingTop: "12px", borderTop: "1px solid #f2ede4" }}>
                          <Link
                            href={txSlug ? `/treatments/${txSlug}` : "/treatments"}
                            style={{
                              fontSize: "13.5px",
                              fontWeight: 700,
                              color: "#b57a25",
                              display: "inline-block",
                              textDecoration: "none",
                            }}
                          >
                            Explore Treatment &rarr;
                          </Link>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </article>
          )}

          {/* Recommended Packages Grid */}
          {resolvedPackages.length > 0 && (
            <article className="condition-care-block">
              <span style={{ fontSize: "12px", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.08em", color: "#b57a25", display: "block", marginBottom: "8px" }}>
                HOLISTIC PACKAGES
              </span>
              <h2 style={{ fontSize: "24px", fontWeight: 800, color: "#2c2214", margin: "0 0 16px" }}>
                Recommended Care Packages
              </h2>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "24px" }}>
                {resolvedPackages.map((pkg: any, idx: number) => {
                  const title = typeof pkg === "string" ? pkg : pkg.title || pkg.name;
                  const pkgSlug = typeof pkg === "object" ? pkg.slug || pkg._id : "";
                  const subtitle = typeof pkg === "object" ? pkg.subtitle || pkg.overview : "";
                  const pkgDays = typeof pkg === "object" ? pkg.durationDays : null;
                  const pkgImg = resolvePackageImage(pkg);

                  return (
                    <div
                      key={idx}
                      style={{
                        borderRadius: "20px",
                        background: "#ffffff",
                        border: "1px solid rgba(225, 215, 198, 0.85)",
                        boxShadow: "0 10px 28px rgba(71, 50, 26, 0.06)",
                        overflow: "hidden",
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      <div style={{ position: "relative", width: "100%", height: "160px", background: "#f5efe6" }}>
                        <Image src={pkgImg} alt={title} fill sizes="(max-width: 768px) 100vw, 360px" style={{ objectFit: "cover" }} />
                        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.65) 100%)" }} />
                        {pkgDays && (
                          <span style={{ position: "absolute", top: "12px", left: "12px", fontSize: "11px", fontWeight: 700, textTransform: "uppercase", color: "#fff", background: "#b57a25", padding: "4px 12px", borderRadius: "999px" }}>
                            {pkgDays} Days Protocol
                          </span>
                        )}
                      </div>
                      <div style={{ padding: "20px", display: "flex", flexDirection: "column", flex: 1, justifyContent: "space-between" }}>
                        <div>
                          <h3 style={{ fontSize: "17px", fontWeight: 800, color: "#111", margin: "0 0 6px" }}>{title}</h3>
                          {subtitle && <p style={{ fontSize: "13.5px", color: "#555", margin: 0, lineHeight: 1.5 }}>{subtitle}</p>}
                        </div>
                        <div style={{ marginTop: "16px", paddingTop: "12px", borderTop: "1px solid #f2ede4" }}>
                          <Link
                            href={pkgSlug ? `/packages/${pkgSlug}` : "/packages"}
                            style={{
                              fontSize: "13.5px",
                              fontWeight: 700,
                              color: "#b57a25",
                              display: "inline-block",
                              textDecoration: "none",
                            }}
                          >
                            Explore Package &rarr;
                          </Link>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </article>
          )}

          {/* FAQs from CMS */}
          {Array.isArray(faqs) && faqs.length > 0 && (
            <article className="condition-care-block">
              <span style={{ fontSize: "12px", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.08em", color: "#b57a25", display: "block", marginBottom: "8px" }}>
                QUESTIONS & ANSWERS
              </span>
              <h2 style={{ fontSize: "24px", fontWeight: 800, color: "#2c2214", margin: "0 0 20px" }}>
                Frequently Asked Questions
              </h2>
              <div style={{ display: "grid", gap: "16px" }}>
                {faqs.map((faq: any, idx: number) => (
                  <div key={idx} style={{ padding: "20px 24px", background: "#ffffff", borderRadius: "18px", border: "1px solid #e8e2d5", boxShadow: "0 4px 16px rgba(0,0,0,0.02)" }}>
                    <strong style={{ display: "block", fontSize: "16px", fontWeight: 700, color: "#1a140c", marginBottom: "8px" }}>
                      Q: {faq.question}
                    </strong>
                    <p style={{ fontSize: "14.5px", color: "#443e35", lineHeight: 1.6, margin: 0 }}>{faq.answer}</p>
                  </div>
                ))}
              </div>
            </article>
          )}

        </div>
      </div>
    </section>
  );
}
