"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { getPublicDoctors, getPublicBranches, getImageDisplayUrl } from "../../services/api";

type TreatmentDetailReferencePageProps = {
  treatment: {
    slug: string;
    title: string;
    category?: string;
    meta?: string;
    text?: string;
    image?: string;
    coverImage?: string;
    shortDescription?: string;
    fullDescription?: string;
    durationMinutes?: number;
    recommendedDays?: number;
    benefits?: any[];
    indications?: any[];
    procedureSteps?: any[];
    expectations?: string[];
    aftercare?: string[];
    inclusions?: string[];
    preparation?: string[];
    faqs?: any[];
    doctorIds?: any[];
    doctors?: any[];
    assignedBranchIds?: any[];
    branches?: any[];
  };
};

const BENEFIT_IMAGE_POOL = [
  "/images/opt_spine_joint.jpg",
  "/images/treatment-herbal-medicine.webp",
  "/images/banner_holistic_health.jpg",
  "/images/treatment-kati-vasti.webp",
  "/images/treatment-sirodhara.webp",
  "/images/treatment-njavarakizhi.webp",
];

function getTreatmentDisplayImage(tx: any): string {
  if (tx.coverImage || tx.image || tx.photo || tx.photoUrl) {
    const url = getImageDisplayUrl(tx.coverImage || tx.image || tx.photo || tx.photoUrl);
    if (url) return url;
  }
  const slugKey = `${tx.slug || ""} ${tx.title || ""}`.toLowerCase();
  if (slugKey.includes("janu") || slugKey.includes("knee") || slugKey.includes("joint")) return "/images/opt_spine_joint.jpg";
  if (slugKey.includes("kati") || slugKey.includes("basti") || slugKey.includes("vasthi")) return "/images/treatment-kati-vasti.webp";
  if (slugKey.includes("dhara") || slugKey.includes("shiro") || slugKey.includes("takra") || slugKey.includes("ksheera") || slugKey.includes("amla")) return "/images/treatment-sirodhara.webp";
  if (slugKey.includes("kizhi") || slugKey.includes("elakizhi") || slugKey.includes("bundle") || slugKey.includes("njavara")) return "/images/treatment-njavarakizhi.webp";
  if (slugKey.includes("herbal") || slugKey.includes("shamana")) return "/images/treatment-herbal-medicine.webp";
  if (slugKey.includes("skin") || slugKey.includes("eczema") || slugKey.includes("cupping") || slugKey.includes("psoriasis")) return "/images/banner_cupping_therapy.jpg";
  return "/images/treatment-panchakarma.webp";
}

function cleanTitle(str: any): string {
  if (!str) return "";
  return String(str)
    .replace(/^['"‘“`\s]+|['"’”`\s]+$/g, "")
    .trim();
}

export function TreatmentDetailReferencePage({ treatment }: TreatmentDetailReferencePageProps) {
  const [activeTab, setActiveTab] = useState("overview");
  const [resolvedDoctors, setResolvedDoctors] = useState<any[]>([]);
  const [resolvedBranches, setResolvedBranches] = useState<any[]>([]);

  useEffect(() => {
    async function resolveRelations() {
      const rawDoc = (treatment as any).doctorIds || (treatment as any).doctors || [];
      const rawBranch = (treatment as any).assignedBranchIds || (treatment as any).branches || [];

      try {
        if (Array.isArray(rawDoc) && rawDoc.length > 0) {
          if (typeof rawDoc[0] === 'object' && rawDoc[0] !== null) {
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

        if (Array.isArray(rawBranch) && rawBranch.length > 0) {
          if (typeof rawBranch[0] === 'object' && rawBranch[0] !== null) {
            setResolvedBranches(rawBranch);
          } else {
            const allBranches = await getPublicBranches();
            const items = Array.isArray(allBranches) ? allBranches : (allBranches as any).items || [];
            const matched = items.filter((b: any) => rawBranch.includes(b._id) || rawBranch.includes(b.id) || rawBranch.includes(b.code));
            setResolvedBranches(matched);
          }
        } else {
          setResolvedBranches([]);
        }
      } catch (err) {
        console.error("Error resolving treatment relations:", err);
      }
    }

    resolveRelations();
  }, [treatment]);

  const categoryName = treatment.category || "AYURVEDIC THERAPY";
  const subtitle = treatment.slug === "panchakarma" ? "The Ultimate Ayurvedic Detox" : treatment.shortDescription || treatment.meta || "";
  const duration = treatment.slug === "panchakarma" ? "7 - 21 Days" : treatment.durationMinutes ? `${treatment.durationMinutes} Mins` : "45 - 60 Mins";
  const recommendedDays = treatment.recommendedDays ? `${treatment.recommendedDays} Days` : null;
  const bannerImage = getTreatmentDisplayImage(treatment);

  const benefitCards = Array.isArray(treatment.benefits) && treatment.benefits.length > 0
    ? treatment.benefits.map((b: any, idx: number) => {
        const poolImg = BENEFIT_IMAGE_POOL[idx % BENEFIT_IMAGE_POOL.length];
        if (typeof b === "string") {
          return {
            title: cleanTitle(b),
            text: "Targeted therapeutic benefit for long-term health and cellular vitality.",
            image: poolImg,
          };
        }
        return {
          title: cleanTitle(b.title || `Benefit ${idx + 1}`),
          text: b.text || b.description || "Targeted therapeutic benefit for long-term health and cellular vitality.",
          image: b.image ? getImageDisplayUrl(b.image) : poolImg,
        };
      })
    : [];

  const idealForItems = Array.isArray(treatment.indications) && treatment.indications.length > 0
    ? treatment.indications.map((item: any) => {
        if (typeof item === "string") {
          return { title: cleanTitle(item), subtitle: "Physician-indicated for this clinical condition" };
        }
        return {
          title: cleanTitle(item.title || String(item)),
          subtitle: item.subtitle || "Physician-indicated for this clinical condition",
        };
      })
    : [];

  const journeySteps = Array.isArray(treatment.procedureSteps) && treatment.procedureSteps.length > 0
    ? treatment.procedureSteps.map((stepItem: any, idx: number) => {
        const stepNum = String(idx + 1).padStart(2, "0");
        if (typeof stepItem === "string") {
          return { step: stepNum, phase: `Phase ${idx + 1}`, title: cleanTitle(stepItem), text: "Guided by certified Ayurvedic therapists." };
        }
        return {
          step: stepItem.step || stepNum,
          phase: stepItem.phase || `Phase ${idx + 1}`,
          title: cleanTitle(stepItem.title || stepItem.step || `Step ${idx + 1}`),
          text: stepItem.text || stepItem.detail || "Guided by certified Ayurvedic therapists.",
        };
      })
    : [];

  const expectItems = Array.isArray(treatment.expectations) && treatment.expectations.length > 0
    ? treatment.expectations.map((item) => cleanTitle(item))
    : Array.isArray(treatment.aftercare) && treatment.aftercare.length > 0
    ? treatment.aftercare.map((item) => cleanTitle(item))
    : [];

  const includeItems = Array.isArray(treatment.inclusions) && treatment.inclusions.length > 0
    ? treatment.inclusions.map((item) => cleanTitle(item))
    : Array.isArray(treatment.preparation) && treatment.preparation.length > 0
    ? treatment.preparation.map((item) => cleanTitle(item))
    : [];

  const faqsList = Array.isArray((treatment as any).faqs) && (treatment as any).faqs.length > 0
    ? (treatment as any).faqs.map((f: any) => ({
        question: f.question || f.q || "",
        answer: f.answer || f.a || "",
      })).filter((f: any) => f.question && f.answer)
    : [];

  const navTabs = [
    { id: "overview", label: "Overview" },
    ...(benefitCards.length > 0 ? [{ id: "benefits", label: "Benefits" }] : []),
    ...(idealForItems.length > 0 ? [{ id: "who-is-it-for", label: "Indications" }] : []),
    ...(journeySteps.length > 0 ? [{ id: "treatment-process", label: "Procedure Steps" }] : []),
    ...(expectItems.length > 0 || includeItems.length > 0 ? [{ id: "what-to-expect", label: "Inclusions & Aftercare" }] : []),
    ...(resolvedDoctors.length > 0 ? [{ id: "consulting-doctors", label: "Consulting Doctors" }] : []),
    ...(resolvedBranches.length > 0 ? [{ id: "hospital-branches", label: "Locations" }] : []),
    ...(faqsList.length > 0 ? [{ id: "faqs", label: "FAQs" }] : []),
  ];

  const handleTabClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    setActiveTab(targetId);
    setTimeout(() => {
      const element = document.getElementById(targetId);
      if (element) {
        const yOffset = -140;
        const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: "smooth" });
      }
    }, 50);
  };

  const isOverview = activeTab === "overview" || activeTab === "all";

  return (
    <div className="treatment-detail-luxury-wrapper" style={{ background: "#fffaf4", minHeight: "100vh" }}>
      
      {/* High-Contrast Hero Banner Section matching Condition Detail Banner */}
      <section className="condition-detail-banner" aria-labelledby="treatment-detail-title">
        <div className="condition-detail-container">
          <div className="condition-detail-copy">
            <div className="condition-detail-eyebrow">
              <span>{categoryName.toUpperCase()}</span>
            </div>

            <h1 id="treatment-detail-title" style={{ fontSize: "clamp(32px, 3.5vw, 48px)", fontWeight: 800, color: "#1a221f", margin: "0 0 16px" }}>
              {treatment.title}
            </h1>

            {subtitle && <p style={{ fontSize: "17px", fontWeight: 700, color: "#b57a25", margin: "0 0 14px", lineHeight: 1.4 }}>{subtitle}</p>}
            
            <p className="condition-detail-summary" style={{ fontSize: "16px", color: "#4a524e", lineHeight: 1.7, margin: "0 0 24px" }}>
              {treatment.fullDescription || treatment.text || treatment.shortDescription}
            </p>

            {/* Quick Metrics Bar */}
            <div style={{ display: "inline-flex", gap: "20px", background: "#ffffff", padding: "14px 24px", borderRadius: "16px", border: "1px solid #ebdccb", boxShadow: "0 6px 20px rgba(71, 50, 26, 0.05)", margin: "0 0 28px", flexWrap: "wrap" }}>
              <div>
                <span style={{ display: "block", fontSize: "11px", textTransform: "uppercase", color: "#777", fontWeight: 700 }}>Duration</span>
                <strong style={{ fontSize: "14px", color: "#111" }}>{duration}</strong>
              </div>

              {recommendedDays && (
                <>
                  <div style={{ width: "1px", height: "32px", background: "#eee4d6" }} />
                  <div>
                    <span style={{ display: "block", fontSize: "11px", textTransform: "uppercase", color: "#777", fontWeight: 700 }}>Protocol</span>
                    <strong style={{ fontSize: "14px", color: "#111" }}>{recommendedDays}</strong>
                  </div>
                </>
              )}

              <div style={{ width: "1px", height: "32px", background: "#eee4d6" }} />

              <div>
                <span style={{ display: "block", fontSize: "11px", textTransform: "uppercase", color: "#777", fontWeight: 700 }}>Care</span>
                <strong style={{ fontSize: "14px", color: "#111" }}>Physician Led</strong>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="condition-detail-actions" style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
              <Link className="condition-detail-primary" href={`/appointment?treatment=${treatment.slug}&type=SINGLE_TREATMENT`} style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "14px 32px", borderRadius: "999px", background: "linear-gradient(135deg, #b57a25 0%, #9a651e 100%)", color: "#ffffff", fontWeight: 700, fontSize: "15px", textDecoration: "none" }}>
                <span>Reserve Therapy Session</span>
                <span aria-hidden="true">&rarr;</span>
              </Link>
              <Link className="condition-detail-secondary" href="/contact-us" style={{ display: "inline-flex", alignItems: "center", padding: "14px 28px", borderRadius: "999px", background: "#ffffff", border: "1.5px solid #d8c8b4", color: "#2c2214", fontWeight: 700, fontSize: "15px", textDecoration: "none" }}>
                <span>Enquire Procedure</span>
              </Link>
            </div>
          </div>

          {/* Dedicated Right Visual Image Frame */}
          <div className="condition-detail-visual" aria-hidden="true">
            <div className="condition-detail-media-frame">
              <Image
                src={bannerImage}
                alt={treatment.title}
                fill
                priority
                sizes="(max-width: 980px) 100vw, 48vw"
                style={{ objectFit: "cover", objectPosition: "center" }}
              />
              <div className="condition-detail-media-overlay" />
              <div className="condition-detail-badge">
                <span>Authentic Kerala Protocol</span>
                <em>Physician Prescribed</em>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sticky Navigation Tabs */}
      {navTabs.length > 1 && (
        <nav style={{ position: "sticky", top: 0, zIndex: 40, background: "#ffffff", borderBottom: "1px solid #ebdccb", boxShadow: "0 4px 14px rgba(0,0,0,0.03)" }}>
          <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 24px", display: "flex", gap: "24px", overflowX: "auto" }}>
            {navTabs.map((tab) => (
              <a
                key={tab.id}
                href={`#${tab.id}`}
                onClick={(e) => handleTabClick(e, tab.id)}
                style={{
                  padding: "16px 0",
                  fontSize: "14px",
                  fontWeight: 700,
                  color: activeTab === tab.id ? "#b57a25" : "#666",
                  borderBottom: activeTab === tab.id ? "3px solid #b57a25" : "3px solid transparent",
                  textDecoration: "none",
                  whiteSpace: "nowrap",
                }}
              >
                {tab.label}
              </a>
            ))}
          </div>
        </nav>
      )}

      {/* Main Content Body */}
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "48px 24px 64px", display: "grid", gap: "48px" }}>
        
        {/* Section 1: Overview */}
        {(isOverview || activeTab === "overview") && (
          <section id="overview" style={{ background: "#ffffff", padding: "36px", borderRadius: "24px", border: "1px solid #ebdccb", boxShadow: "0 8px 24px rgba(71, 50, 26, 0.04)" }}>
            <span style={{ fontSize: "12px", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.08em", color: "#b57a25", display: "block", marginBottom: "8px" }}>
              CLINICAL OVERVIEW
            </span>
            <h2 style={{ fontSize: "24px", fontWeight: 800, color: "#1a140c", margin: "0 0 16px" }}>
              {treatment.title} Protocol
            </h2>
            <p style={{ fontSize: "16px", color: "#3a3227", lineHeight: 1.8, whiteSpace: "pre-line", margin: 0 }}>
              {treatment.fullDescription || treatment.shortDescription}
            </p>
          </section>
        )}

        {/* Section 2: Therapeutic Benefits Grid with Rich Images */}
        {benefitCards.length > 0 && (isOverview || activeTab === "benefits") && (
          <section id="benefits">
            <span style={{ fontSize: "12px", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.08em", color: "#b57a25", display: "block", marginBottom: "8px" }}>
              THERAPEUTIC ADVANTAGES
            </span>
            <h2 style={{ fontSize: "24px", fontWeight: 800, color: "#1a140c", margin: "0 0 20px" }}>
              Key Health & Wellness Benefits
            </h2>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "24px" }}>
              {benefitCards.map((card: any, idx: number) => (
                <article
                  key={idx}
                  style={{
                    background: "#ffffff",
                    borderRadius: "20px",
                    border: "1px solid #ebdccb",
                    boxShadow: "0 10px 28px rgba(71, 50, 26, 0.05)",
                    overflow: "hidden",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <div style={{ position: "relative", width: "100%", height: "160px", background: "#f5efe6" }}>
                    <Image src={card.image} alt={card.title} fill sizes="(max-width: 768px) 100vw, 360px" style={{ objectFit: "cover" }} />
                    <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(0,0,0,0) 40%, rgba(0,0,0,0.6) 100%)" }} />
                    <span style={{ position: "absolute", top: "12px", left: "12px", fontSize: "11px", fontWeight: 800, textTransform: "uppercase", color: "#ffffff", background: "rgba(181, 122, 37, 0.9)", padding: "4px 12px", borderRadius: "999px" }}>
                      Benefit 0{idx + 1}
                    </span>
                  </div>

                  <div style={{ padding: "20px", flex: 1 }}>
                    <h3 style={{ fontSize: "17px", fontWeight: 800, color: "#1a140c", margin: "0 0 8px", lineHeight: 1.35 }}>
                      {card.title}
                    </h3>
                    {card.text && <p style={{ fontSize: "14px", color: "#554e44", lineHeight: 1.6, margin: 0 }}>{card.text}</p>}
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}

        {/* Section 3: Target Indications */}
        {idealForItems.length > 0 && (isOverview || activeTab === "who-is-it-for") && (
          <section id="who-is-it-for">
            <div style={{ background: "linear-gradient(135deg, #fffcf7 0%, #fff7eb 100%)", padding: "36px", borderRadius: "24px", border: "1px solid #ebdccb", borderLeft: "6px solid #b57a25", boxShadow: "0 8px 24px rgba(181, 122, 37, 0.05)" }}>
              <span style={{ fontSize: "12px", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.08em", color: "#b57a25", display: "block", marginBottom: "8px" }}>
                TARGET INDICATIONS
              </span>
              <h2 style={{ fontSize: "24px", fontWeight: 800, color: "#1a140c", margin: "0 0 20px" }}>
                Who Can Benefit Most?
              </h2>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "16px" }}>
                {idealForItems.map((item: any, idx: number) => (
                  <div key={idx} style={{ background: "#ffffff", padding: "16px 20px", borderRadius: "16px", border: "1px solid #e8ded0" }}>
                    <h4 style={{ fontSize: "15px", fontWeight: 700, color: "#111", margin: "0 0 4px" }}>{item.title}</h4>
                    {item.subtitle && item.subtitle !== "Physician-indicated for this clinical condition" && (
                      <p style={{ fontSize: "13px", color: "#666", margin: 0 }}>{item.subtitle}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Section 4: Procedure Steps Timeline */}
        {journeySteps.length > 0 && (isOverview || activeTab === "treatment-process") && (
          <section id="treatment-process">
            <span style={{ fontSize: "12px", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.08em", color: "#b57a25", display: "block", marginBottom: "8px" }}>
              THERAPEUTIC ROADMAP
            </span>
            <h2 style={{ fontSize: "24px", fontWeight: 800, color: "#1a140c", margin: "0 0 20px" }}>
              Structured Procedure Steps
            </h2>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "20px" }}>
              {journeySteps.map((stepItem: any, idx: number) => (
                <article key={idx} style={{ background: "#ffffff", padding: "24px", borderRadius: "20px", border: "1px solid #ebdccb", boxShadow: "0 8px 20px rgba(0,0,0,0.03)" }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "12px" }}>
                    <span style={{ fontSize: "28px", fontWeight: 900, color: "#b57a25" }}>{stepItem.step}</span>
                    <span style={{ fontSize: "11px", fontWeight: 700, textTransform: "uppercase", background: "#fff6e5", color: "#b57a25", padding: "4px 10px", borderRadius: "999px" }}>
                      {stepItem.phase}
                    </span>
                  </div>
                  <h3 style={{ fontSize: "17px", fontWeight: 800, color: "#111", margin: "0 0 8px" }}>{stepItem.title}</h3>
                  {stepItem.text && <p style={{ fontSize: "14px", color: "#555", lineHeight: 1.6, margin: 0 }}>{stepItem.text}</p>}
                </article>
              ))}
            </div>
          </section>
        )}

        {/* Section 5: Expectations & Inclusions */}
        {(expectItems.length > 0 || includeItems.length > 0) && (isOverview || activeTab === "what-to-expect") && (
          <section id="what-to-expect" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "24px" }}>
            {expectItems.length > 0 && (
              <div style={{ background: "#1c160e", color: "#ffffff", padding: "32px", borderRadius: "24px" }}>
                <span style={{ fontSize: "11px", fontWeight: 800, textTransform: "uppercase", color: "#d49e54", letterSpacing: "0.08em" }}>
                  AFTERCARE & GUIDELINES
                </span>
                <h2 style={{ fontSize: "22px", fontWeight: 800, color: "#ffffff", margin: "8px 0 20px" }}>
                  Post-Treatment Guidelines
                </h2>
                <div style={{ display: "grid", gap: "12px" }}>
                  {expectItems.map((item: string, idx: number) => (
                    <div key={idx} style={{ padding: "8px 0", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
                      <span style={{ fontSize: "14.5px", color: "#e8ded0", lineHeight: 1.5 }}>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {includeItems.length > 0 && (
              <div style={{ background: "#ffffff", padding: "32px", borderRadius: "24px", border: "1px solid #ebdccb" }}>
                <span style={{ fontSize: "11px", fontWeight: 800, textTransform: "uppercase", color: "#b57a25", letterSpacing: "0.08em" }}>
                  PREPARATION & INCLUSIONS
                </span>
                <h2 style={{ fontSize: "22px", fontWeight: 800, color: "#111", margin: "8px 0 20px" }}>
                  What Is Included
                </h2>
                <div style={{ display: "grid", gap: "12px" }}>
                  {includeItems.map((item: string, idx: number) => (
                    <div key={idx} style={{ padding: "8px 0", borderBottom: "1px solid #f0e8dc" }}>
                      <span style={{ fontSize: "14.5px", color: "#444", lineHeight: 1.5 }}>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </section>
        )}

        {/* Section 6: Consulting Doctors Assigned in CMS */}
        {resolvedDoctors.length > 0 && (
          <section id="consulting-doctors">
            <span style={{ fontSize: "12px", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.08em", color: "#b57a25", display: "block", marginBottom: "8px" }}>
              MEDICAL TEAM
            </span>
            <h2 style={{ fontSize: "24px", fontWeight: 800, color: "#1a140c", margin: "0 0 20px" }}>
              Consulting Physicians for this Therapy
            </h2>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "20px" }}>
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
                      padding: "18px",
                      borderRadius: "20px",
                      background: "#ffffff",
                      border: "1px solid #ebdccb",
                      boxShadow: "0 8px 20px rgba(0,0,0,0.03)",
                      textDecoration: "none",
                    }}
                  >
                    <Image src={docImg} alt={docName} width={60} height={60} style={{ borderRadius: "50%", objectFit: "cover", border: "2px solid #b57a25" }} />
                    <div style={{ flex: 1 }}>
                      <strong style={{ display: "block", fontSize: "16px", fontWeight: 800, color: "#111" }}>{docName}</strong>
                      <span style={{ fontSize: "13px", color: "#666", display: "block", marginTop: "2px" }}>{docCred}</span>
                      <span style={{ fontSize: "12px", fontWeight: 700, color: "#b57a25", display: "inline-block", marginTop: "6px" }}>Book Appointment &rarr;</span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>
        )}

        {/* Section 7: Hospital Branches Assigned in CMS */}
        {resolvedBranches.length > 0 && (
          <section id="hospital-branches">
            <span style={{ fontSize: "12px", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.08em", color: "#b57a25", display: "block", marginBottom: "8px" }}>
              LOCATIONS & CAMPUSES
            </span>
            <h2 style={{ fontSize: "24px", fontWeight: 800, color: "#1a140c", margin: "0 0 20px" }}>
              Available Hospital Campus Locations
            </h2>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "20px" }}>
              {resolvedBranches.map((b: any, idx: number) => {
                const bName = b.name || "Susrutha Hospital Campus";
                const bCode = b.code || "";
                const street = b.address?.street || "";
                const city = b.address?.city || "Thiruvananthapuram";

                return (
                  <div key={idx} style={{ background: "#ffffff", padding: "24px", borderRadius: "20px", border: "1px solid #ebdccb", boxShadow: "0 8px 20px rgba(0,0,0,0.03)" }}>
                    {bCode && <span style={{ fontSize: "11px", fontWeight: 800, textTransform: "uppercase", background: "#fff6e5", color: "#b57a25", padding: "4px 10px", borderRadius: "999px", marginBottom: "8px", display: "inline-block" }}>{bCode} Campus</span>}
                    <h3 style={{ fontSize: "17px", fontWeight: 800, color: "#111", margin: "4px 0 8px" }}>{bName}</h3>
                    <p style={{ fontSize: "13.5px", color: "#555", margin: "0 0 16px" }}>
                      {street ? `${street}, ${city}` : city}
                    </p>
                    <Link
                      href="/appointment"
                      style={{
                        display: "inline-block",
                        fontSize: "13px",
                        fontWeight: 700,
                        color: "#b57a25",
                        textDecoration: "none",
                      }}
                    >
                      Book OPD at this Branch &rarr;
                    </Link>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* Section 8: Frequently Asked Questions (FAQs from CMS) */}
        {faqsList.length > 0 && (
          <section id="faqs">
            <span style={{ fontSize: "12px", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.08em", color: "#b57a25", display: "block", marginBottom: "8px" }}>
              QUESTIONS & ANSWERS
            </span>
            <h2 style={{ fontSize: "24px", fontWeight: 800, color: "#1a140c", margin: "0 0 20px" }}>
              Frequently Asked Questions
            </h2>

            <div style={{ display: "grid", gap: "16px" }}>
              {faqsList.map((faq: any, idx: number) => (
                <div key={idx} style={{ background: "#ffffff", padding: "20px 24px", borderRadius: "18px", border: "1px solid #ebdccb", boxShadow: "0 4px 14px rgba(0,0,0,0.02)" }}>
                  <strong style={{ display: "block", fontSize: "16px", fontWeight: 800, color: "#1a140c", marginBottom: "8px" }}>
                    Q: {faq.question}
                  </strong>
                  <p style={{ fontSize: "14.5px", color: "#443e35", lineHeight: 1.6, margin: 0 }}>{faq.answer}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Section 9: Consultation CTA Banner with Full Background Image */}
        <section
          className="treatment-detail-cta-banner"
          style={{
            position: "relative",
            borderRadius: "28px",
            padding: "64px 36px",
            color: "#ffffff",
            textAlign: "center",
            overflow: "hidden",
            boxShadow: "0 20px 50px rgba(0, 0, 0, 0.25)",
          }}
        >
          <Image
            src="/images/banner_calm_retreat.jpg"
            alt="Ayurvedic Healing Journey"
            fill
            sizes="100vw"
            style={{ objectFit: "cover", objectPosition: "center" }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(180deg, rgba(10, 6, 2, 0.80) 0%, rgba(10, 6, 2, 0.88) 100%)",
              backdropFilter: "blur(3px)",
            }}
          />

          <div style={{ position: "relative", zIndex: 2, maxWidth: "720px", margin: "0 auto" }}>
            <span
              style={{
                fontSize: "12px",
                fontWeight: 900,
                textTransform: "uppercase",
                color: "#f59e0b",
                letterSpacing: "0.12em",
                display: "inline-block",
                marginBottom: "14px",
                background: "rgba(0, 0, 0, 0.6)",
                border: "1px solid #f59e0b",
                padding: "6px 18px",
                borderRadius: "999px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
              }}
            >
              AUTHENTIC KERALA AYURVEDA
            </span>

            <h2
              className="treatment-detail-cta-title"
              style={{
                fontSize: "clamp(28px, 4vw, 42px)",
                fontWeight: 900,
                margin: "12px 0 18px",
                color: "#ffffff",
                lineHeight: 1.2,
                textShadow: "0 4px 16px rgba(0,0,0,0.8)",
              }}
            >
              Ready to Begin Your Healing Journey?
            </h2>

            <p
              className="treatment-detail-cta-text"
              style={{ fontSize: "18px", color: "#ffffff", fontWeight: 700, lineHeight: 1.6, marginBottom: "32px", textShadow: "0 2px 12px rgba(0,0,0,0.95)", opacity: 1 }}
            >
              Consult with our senior Ayurvedic physicians for an expert diagnosis and personalized treatment plan.
            </p>

            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "16px" }}>
              <Link
                href={`/appointment?treatment=${treatment.slug}&type=SINGLE_TREATMENT`}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "16px 36px",
                  borderRadius: "999px",
                  background: "linear-gradient(135deg, #d49e54 0%, #b57a25 100%)",
                  color: "#ffffff",
                  fontWeight: 800,
                  fontSize: "15px",
                  textDecoration: "none",
                  boxShadow: "0 8px 24px rgba(212, 158, 84, 0.4)",
                }}
              >
                <span>Book Doctor Consultation</span>
                <span aria-hidden="true">&rarr;</span>
              </Link>
              <a
                href="tel:+919656656736"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  padding: "16px 32px",
                  borderRadius: "999px",
                  background: "#ffffff",
                  border: "1.5px solid #ffffff",
                  color: "#1c2a23",
                  fontWeight: 800,
                  fontSize: "15px",
                  textDecoration: "none",
                  boxShadow: "0 6px 20px rgba(0, 0, 0, 0.25)",
                }}
              >
                <span>Call +91 96566 56736</span>
              </a>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
