"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  Flower2,
  Droplets,
  Activity,
  Heart,
  FlaskConical,
  Scale,
  Sprout,
  Leaf,
  ArrowRight,
  ArrowLeft,
  Clock,
  Check,
} from "lucide-react";
import { getImageDisplayUrl, getPublicTreatments } from "../../services/api";
import { DataLayerRibbon } from "../common/DataLayerRibbon";

type TreatmentMeta = {
  category: "panchakarma" | "spine-joint" | "nerve-stress" | "specialized";
  categoryLabel: string;
  duration: string;
  badge: string;
  benefits: string[];
  iconType: "lotus" | "shiro" | "leaf" | "hands" | "spine" | "sprout" | "balance" | "mortar";
  image: string;
  copy: string;
};

const treatmentMetadata: Record<string, TreatmentMeta> = {
  panchakarma: {
    category: "panchakarma",
    categoryLabel: "Panchakarma & Detox",
    duration: "7 - 21 Days",
    badge: "Core Purification",
    benefits: ["Flush Body Toxins", "Reset Digestion", "Boost Immunity"],
    iconType: "lotus",
    image: "/images/treatment-panchakarma.webp",
    copy: "A physician-guided 5-stage cleansing programme restoring total metabolic balance.",
  },
  abhyangam: {
    category: "nerve-stress",
    categoryLabel: "Nerve & Stress Relief",
    duration: "60 - 90 Mins",
    badge: "Body Massage",
    benefits: ["Enhance Circulation", "Ease Muscle Stiffness", "Skin Nourishment"],
    iconType: "hands",
    image: "/images/treatment-sirodhara.webp",
    copy: "Therapeutic warm herbal oil massage designed for deep nourishment and vitality.",
  },
  shirodhara: {
    category: "nerve-stress",
    categoryLabel: "Nerve & Stress Relief",
    duration: "30 - 45 Mins",
    badge: "Mind Calming",
    benefits: ["Deep Mental Calm", "Improves Sleep Quality", "Relieves Migraines"],
    iconType: "shiro",
    image: "/images/treatment-sirodhara.webp",
    copy: "Continuous stream of medicated oil over the forehead to pacify stressed nervous system.",
  },
  swedana: {
    category: "panchakarma",
    categoryLabel: "Panchakarma & Detox",
    duration: "20 - 30 Mins",
    badge: "Herbal Steam",
    benefits: ["Opens Skin Pores", "Eases Joint Stiffness", "Accelerates Detox"],
    iconType: "sprout",
    image: "/images/faq-ayurveda-still-life.webp",
    copy: "Medicated herbal steam chamber therapy for sweat-induced toxin excretion.",
  },
  nasya: {
    category: "panchakarma",
    categoryLabel: "Panchakarma & Detox",
    duration: "20 - 30 Mins",
    badge: "Nasal Therapy",
    benefits: ["Sinus Clearance", "Headache Relief", "Mental Alertness"],
    iconType: "leaf",
    image: "/images/treatment-herbal-medicine.webp",
    copy: "Nasal administration of medicated oils to clear respiratory and cranial passages.",
  },
  pizhichil: {
    category: "spine-joint",
    categoryLabel: "Spine & Joint Care",
    duration: "60 - 90 Mins",
    badge: "Royal Oil Bath",
    benefits: ["Joint Pain Relief", "Tissue Regeneration", "Deep Relaxation"],
    iconType: "hands",
    image: "/images/treatment-sirodhara.webp",
    copy: "Synchronized warm oil pour with gentle massage for muscular and joint recovery.",
  },
  udvarthanam: {
    category: "panchakarma",
    categoryLabel: "Panchakarma & Detox",
    duration: "45 - 60 Mins",
    badge: "Herbal Scrub",
    benefits: ["Metabolism Boost", "Fat & Lymph Detox", "Skin Exfoliation"],
    iconType: "mortar",
    image: "/images/treatment-njavarakizhi.webp",
    copy: "Deep herbal powder scrub massage targeting metabolic sluggishness and cellulite.",
  },
  basti: {
    category: "panchakarma",
    categoryLabel: "Panchakarma & Detox",
    duration: "30 - 45 Mins",
    badge: "Enema Therapy",
    benefits: ["Vata Dosha Balance", "Gut Cleanse", "Chronic Pain Care"],
    iconType: "balance",
    image: "/images/faq-ayurveda-still-life.webp",
    copy: "Medicated enema therapy directed by physicians for colon cleansing and Vata control.",
  },
  "kati-basti": {
    category: "spine-joint",
    categoryLabel: "Spine & Joint Care",
    duration: "30 - 45 Mins",
    badge: "Lower Back Care",
    benefits: ["Lumbar Spine Comfort", "Sciatica Relief", "Eases Disc Pressure"],
    iconType: "spine",
    image: "/images/treatment-kati-vasti.webp",
    copy: "Warm oil pooling therapy over the lumbosacral region for deep vertebral relief.",
  },
  garshanam: {
    category: "specialized",
    categoryLabel: "Specialized Care",
    duration: "30 - 45 Mins",
    badge: "Raw Silk Dry Massage",
    benefits: ["Lymph Drainage", "Exfoliates Dead Cells", "Energizes Body"],
    iconType: "leaf",
    image: "/images/treatment-kati-vasti.webp",
    copy: "Dry silk glove massage to stimulate lymphatic flow and remove skin toxins.",
  },
  "womens-health": {
    category: "specialized",
    categoryLabel: "Specialized Care",
    duration: "Personalized",
    badge: "Gynaecology Care",
    benefits: ["Hormonal Balance", "Antenatal Support", "Postnatal Recovery"],
    iconType: "lotus",
    image: "/images/ayurveda-village-path.webp",
    copy: "Comprehensive Ayurveda-led care plans for every stage of womanhood.",
  },
  "child-care": {
    category: "specialized",
    categoryLabel: "Specialized Care",
    duration: "Personalized",
    badge: "Paediatric Care",
    benefits: ["Immunity Strengthening", "Digestive Health", "Healthy Growth"],
    iconType: "sprout",
    image: "/images/ayurveda-hospital-garden.webp",
    copy: "Gentle natural therapies for growing children, immune defense, and digestion.",
  },
  orthopaedics: {
    category: "spine-joint",
    categoryLabel: "Spine & Joint Care",
    duration: "Specialist Plan",
    badge: "Joint & Spine",
    benefits: ["Arthritis Relief", "Post-Injury Rehab", "Improved Mobility"],
    iconType: "spine",
    image: "/images/treatment-kati-vasti.webp",
    copy: "Integrative care for chronic back pain, joint stiffness, and spinal disorders.",
  },
  neurology: {
    category: "nerve-stress",
    categoryLabel: "Nerve & Stress Relief",
    duration: "Specialist Plan",
    badge: "Neuro Rehab",
    benefits: ["Stroke Recovery", "Nerve Weakness", "Motor Re-education"],
    iconType: "shiro",
    image: "/images/treatment-sirodhara.webp",
    copy: "Structured rehabilitation programs for stroke recovery and nerve weakness.",
  },
  "skin-care": {
    category: "specialized",
    categoryLabel: "Specialized Care",
    duration: "Herbal Protocol",
    badge: "Dermatology",
    benefits: ["Natural Radiance", "Eczema & Psoriasis", "Inflammation Relief"],
    iconType: "leaf",
    image: "/images/treatment-herbal-medicine.webp",
    copy: "Internal cleansing and external herbal pastes for chronic skin healing.",
  },
  "lifestyle-disorders": {
    category: "specialized",
    categoryLabel: "Specialized Care",
    duration: "Preventive Plan",
    badge: "Metabolic Care",
    benefits: ["Diabetes Support", "Weight Balance", "Stress Management"],
    iconType: "balance",
    image: "/images/faq-ayurveda-still-life.webp",
    copy: "Holistic diet, lifestyle, and herbal regimens for lasting metabolic wellness.",
  },
  sirodhara: {
    category: "nerve-stress",
    categoryLabel: "Nerve & Stress Relief",
    duration: "30 - 45 Mins",
    badge: "Relaxation Therapy",
    benefits: ["Calms Mind", "Relieves Anxiety", "Improves Focus"],
    iconType: "shiro",
    image: "/images/treatment-sirodhara.webp",
    copy: "Pure warm oil stream pour to soothe hyperactive nerve centers.",
  },
  njavarakizhi: {
    category: "spine-joint",
    categoryLabel: "Spine & Joint Care",
    duration: "45 - 60 Mins",
    badge: "Rice Poultice",
    benefits: ["Muscle Strengthening", "Tissue Nourishment", "Anti-Aging Care"],
    iconType: "mortar",
    image: "/images/treatment-njavarakizhi.webp",
    copy: "Warm medicated rice pouch massage to strengthen weak muscles and tissues.",
  },
  "kati-vasti": {
    category: "spine-joint",
    categoryLabel: "Spine & Joint Care",
    duration: "30 - 45 Mins",
    badge: "Lower Back Care",
    benefits: ["Lumbar Support", "Relieves Stiffness", "Restores Flexibility"],
    iconType: "spine",
    image: "/images/treatment-kati-vasti.webp",
    copy: "Targeted herbal oil pool therapy for acute and chronic back ailments.",
  },
  "herbal-medicine": {
    category: "specialized",
    categoryLabel: "Specialized Care",
    duration: "Prescription",
    badge: "Pure Formulations",
    benefits: ["Authentic Extracts", "Custom Formulations", "Zero Additives"],
    iconType: "mortar",
    image: "/images/treatment-herbal-medicine.webp",
    copy: "Classical physician-prescribed herbal rasayanas and Kashayams.",
  },
};

const CATEGORIES = [
  { id: "all", label: "All Treatments" },
  { id: "panchakarma", label: "Panchakarma & Detox" },
  { id: "spine-joint", label: "Spine & Joint Care" },
  { id: "nerve-stress", label: "Nerve & Stress Relief" },
  { id: "specialized", label: "Specialized Care" },
] as const;

function TreatmentFaIcon({ type }: { type: TreatmentMeta["iconType"] }) {
  switch (type) {
    case "lotus":
      return <Flower2 className="treatment-fa-icon" size={20} strokeWidth={1.75} aria-hidden="true" />;
    case "shiro":
      return <Droplets className="treatment-fa-icon" size={20} strokeWidth={1.75} aria-hidden="true" />;
    case "spine":
      return <Activity className="treatment-fa-icon" size={20} strokeWidth={1.75} aria-hidden="true" />;
    case "hands":
      return <Heart className="treatment-fa-icon" size={20} strokeWidth={1.75} aria-hidden="true" />;
    case "mortar":
      return <FlaskConical className="treatment-fa-icon" size={20} strokeWidth={1.75} aria-hidden="true" />;
    case "balance":
      return <Scale className="treatment-fa-icon" size={20} strokeWidth={1.75} aria-hidden="true" />;
    case "sprout":
      return <Sprout className="treatment-fa-icon" size={20} strokeWidth={1.75} aria-hidden="true" />;
    case "leaf":
    default:
      return <Leaf className="treatment-fa-icon" size={20} strokeWidth={1.75} aria-hidden="true" />;
  }
}

export function TreatmentsShowcaseSection() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [itemsPerPage, setItemsPerPage] = useState(6);
  const [activePage, setActivePage] = useState(0);
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [treatmentsList, setTreatmentsList] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function loadLiveTreatments() {
      try {
        setLoading(true);
        const data = await getPublicTreatments();
        if (Array.isArray(data) && data.length > 0) {
          const normalized = data.map((t: any) => {
            const slug = t.slug || `tr-${(t.title || t.name || '').toLowerCase().replace(/\s+/g, '-')}`;
            const meta = treatmentMetadata[slug] ?? treatmentMetadata.panchakarma;
            return {
              slug,
              title: t.title || t.name,
              copy: t.shortDescription || meta.copy || t.description || "",
              href: `/treatments/${slug}`,
              image: getImageDisplayUrl(t.coverImage || t.image || meta.image),
              category: meta.category,
              categoryLabel: t.category || meta.categoryLabel,
              duration: t.durationMinutes ? `${t.durationMinutes} Mins` : meta.duration,
              badge: meta.badge,
              benefits: t.benefits || meta.benefits,
              iconType: meta.iconType,
              isBackendData: true,
            };
          });
          setTreatmentsList(normalized);
        } else {
          setTreatmentsList([]);
        }
      } catch (err) {
        console.error("Failed to load homepage treatments:", err);
        setTreatmentsList([]);
      } finally {
        setLoading(false);
      }
    }
    loadLiveTreatments();
  }, []);

  const filteredTreatments = useMemo(() => {
    if (activeCategory === "all") return treatmentsList;
    return treatmentsList.filter((t) => t.category === activeCategory);
  }, [activeCategory, treatmentsList]);

  useEffect(() => {
    const syncItemsPerPage = () => {
      const width = window.innerWidth;
      setItemsPerPage(width > 1500 ? 6 : width > 1024 ? 4 : width > 768 ? 3 : width > 520 ? 2 : 1);
    };

    syncItemsPerPage();
    window.addEventListener("resize", syncItemsPerPage);
    return () => window.removeEventListener("resize", syncItemsPerPage);
  }, []);

  const pageCount = Math.max(1, Math.ceil(filteredTreatments.length / itemsPerPage));

  const handleScroll = () => {
    if (!trackRef.current) return;
    const { scrollLeft, clientWidth } = trackRef.current;
    const page = Math.round(scrollLeft / clientWidth);
    setActivePage(page);
  };

  const scrollToPage = (pageIndex: number) => {
    const targetPage = Math.max(0, Math.min(pageIndex, pageCount - 1));
    setActivePage(targetPage);
    if (trackRef.current) {
      trackRef.current.scrollTo({
        left: targetPage * trackRef.current.clientWidth,
        behavior: "smooth",
      });
    }
  };

  const safeActivePage = Math.min(activePage, pageCount - 1);

  return (
    <section className="treatments-showcase-section" aria-labelledby="treatments-showcase-title">
      <div className="treatments-showcase-container">
        {/* Section Header */}
        <div className="treatments-showcase-header">
          <span className="treatments-showcase-eyebrow">
            <i aria-hidden="true" />
            Kerala Heritage Therapies
          </span>
          <h2 id="treatments-showcase-title">
            Authentic Clinical <span>Panchakarma & Dhara</span>
          </h2>
          <p className="treatments-showcase-subtitle">
            Authentic physician-supervised therapies, tailored to individual prakriti and diagnostics,
            crafted to restore total health, vitality, and balance.
          </p>
        </div>

        {/* Filter Category Tabs */}
        <div className="treatments-category-tabs" role="tablist" aria-label="Treatment categories">
          {CATEGORIES.map((cat) => {
            const count = cat.id === "all" ? treatmentsList.length : treatmentsList.filter((t) => t.category === cat.id).length;
            const isActive = activeCategory === cat.id;

            return (
              <button
                key={cat.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                className={`treatments-category-tab ${isActive ? "is-active" : ""}`}
                onClick={() => setActiveCategory(cat.id)}
              >
                <span>{cat.label}</span>
                <span className="tab-count-badge">{count}</span>
              </button>
            );
          })}
        </div>

        {/* Section Top Controls bar */}
        <div className="treatments-showcase-actions">
          <div className="treatments-counter-display">
            <span className="counter-current">
              {String(safeActivePage + 1).padStart(2, "0")}
            </span>
            <span className="counter-slash">/</span>
            <span className="counter-total">
              {String(pageCount).padStart(2, "0")}
            </span>
          </div>

          <Link className="treatments-showcase-all" href="/treatments" style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}>
            Explore All Treatments
            <ArrowRight size={16} strokeWidth={1.75} aria-hidden="true" />
          </Link>

          <div className="treatments-slider-controls" aria-label="Treatment slider controls">
            <button type="button" onClick={() => scrollToPage(safeActivePage - 1)} aria-label="Previous treatments">
              <ArrowLeft size={16} strokeWidth={1.75} aria-hidden="true" />
            </button>
            <button type="button" onClick={() => scrollToPage(safeActivePage + 1)} aria-label="Next treatments">
              <ArrowRight size={16} strokeWidth={1.75} aria-hidden="true" />
            </button>
          </div>
        </div>

        {/* Cards Carousel Slider */}
        <div className="treatments-showcase-slider">
          <div className="treatments-showcase-grid" ref={trackRef} onScroll={handleScroll}>
            {filteredTreatments.map((treatment: any) => {
              return (
                <article className="treatments-showcase-card" key={treatment.slug}>
                <Link href={treatment.href} aria-label={`View ${treatment.title} treatment`}>
                  <div className="treatments-card-image">
                    <Image
                      src={getImageDisplayUrl(treatment.image)}
                      alt={treatment.title}
                      fill
                      sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, (max-width: 1500px) 30vw, 240px"
                    />

                    <div className="treatments-card-badges">
                      <span className="card-badge-category">{treatment.badge}</span>
                      <span className="card-badge-duration" style={{ display: "inline-flex", alignItems: "center", gap: "4px" }}>
                        <Clock size={13} strokeWidth={1.75} aria-hidden="true" />
                        {treatment.duration}
                      </span>
                    </div>

                    <div className="treatments-card-overlay-gradient" />
                  </div>

                  <div className="treatments-card-body">
                    <div className="treatments-card-icon-wrapper">
                      <TreatmentFaIcon type={treatment.iconType} />
                    </div>

                    <h3>{treatment.title}</h3>
                    <p className="treatment-card-desc">{treatment.copy}</p>

                    {/* Benefit Tags */}
                    {treatment.benefits && treatment.benefits.length > 0 && (
                      <div className="treatments-card-benefits">
                        {treatment.benefits.map((b: string) => (
                          <span key={b} className="benefit-tag" style={{ display: "inline-flex", alignItems: "center", gap: "4px" }}>
                            <Check size={11} strokeWidth={2} aria-hidden="true" />
                            {b}
                          </span>
                        ))}
                      </div>
                    )}

                    <div className="treatments-card-cta-row">
                      <span className="treatments-card-cta-btn" style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
                        Explore Therapy
                        <ArrowRight size={14} strokeWidth={1.75} className="arrow" aria-hidden="true" />
                      </span>
                    </div>
                  </div>
                </Link>
              </article>
              );
            })}
          </div>
        </div>

        {/* Pagination Dots */}
        <div className="treatments-showcase-dots" aria-label="Treatment slider pagination">
          {Array.from({ length: pageCount }, (_, page) => (
            <button
              type="button"
              key={page}
              aria-label={`Show treatment slide ${page + 1}`}
              aria-current={safeActivePage === page ? "true" : undefined}
              onClick={() => scrollToPage(page)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

