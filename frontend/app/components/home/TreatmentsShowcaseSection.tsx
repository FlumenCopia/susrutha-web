"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { getImageDisplayUrl, getPublicTreatments } from "../../services/api";

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

function TreatmentSvgIcon({ type }: { type: TreatmentMeta["iconType"] }) {
  switch (type) {
    case "lotus":
      return (
        <svg viewBox="0 0 36 36" fill="none" className="treatment-svg-icon" aria-hidden="true">
          <path
            d="M18 6C14 12 10 19 18 28C26 19 22 12 18 6Z"
            fill="url(#goldGrad)"
            stroke="#a87534"
            strokeWidth="1.2"
          />
          <path
            d="M18 28C11 25 5 17 6 12C10 15 15 20 18 28Z"
            fill="url(#goldGrad2)"
            stroke="#a87534"
            strokeWidth="1"
          />
          <path
            d="M18 28C25 25 31 17 30 12C26 15 21 20 18 28Z"
            fill="url(#goldGrad2)"
            stroke="#a87534"
            strokeWidth="1"
          />
          <defs>
            <linearGradient id="goldGrad" x1="18" y1="6" x2="18" y2="28" gradientUnits="userSpaceOnUse">
              <stop stopColor="#e8c792" />
              <stop offset="1" stopColor="#a87534" />
            </linearGradient>
            <linearGradient id="goldGrad2" x1="18" y1="12" x2="18" y2="28" gradientUnits="userSpaceOnUse">
              <stop stopColor="#d4a359" />
              <stop offset="1" stopColor="#825721" />
            </linearGradient>
          </defs>
        </svg>
      );
    case "shiro":
      return (
        <svg viewBox="0 0 36 36" fill="none" className="treatment-svg-icon" aria-hidden="true">
          <path d="M11 9H25L23 18H13L11 9Z" stroke="#a87534" strokeWidth="1.8" strokeLinejoin="round" />
          <path d="M18 18V26" stroke="#a87534" strokeWidth="1.8" strokeDasharray="2 2" />
          <circle cx="18" cy="28" r="3" fill="#a87534" />
          <path d="M14 6H22" stroke="#a87534" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      );
    case "spine":
      return (
        <svg viewBox="0 0 36 36" fill="none" className="treatment-svg-icon" aria-hidden="true">
          <circle cx="18" cy="8" r="3" fill="#a87534" />
          <circle cx="18" cy="15" r="3.5" fill="#a87534" />
          <circle cx="18" cy="22" r="4" fill="#a87534" />
          <circle cx="18" cy="29" r="3" fill="#a87534" />
          <path d="M18 5V31" stroke="#e8c792" strokeWidth="1" strokeDasharray="1 2" />
        </svg>
      );
    case "hands":
      return (
        <svg viewBox="0 0 36 36" fill="none" className="treatment-svg-icon" aria-hidden="true">
          <path
            d="M8 22C10 16 16 14 20 18C22 20 25 21 28 20"
            stroke="#a87534"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
          <path
            d="M18 10C18 7 21 5 24 7C27 9 26 13 22 15"
            stroke="#a87534"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <circle cx="18" cy="24" r="4" fill="#e8c792" stroke="#a87534" />
        </svg>
      );
    case "mortar":
      return (
        <svg viewBox="0 0 36 36" fill="none" className="treatment-svg-icon" aria-hidden="true">
          <path d="M8 15C8 23 12 27 18 27C24 27 28 23 28 15H8Z" fill="#e8c792" stroke="#a87534" strokeWidth="1.8" />
          <path d="M22 8L15 17" stroke="#825721" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M6 15H30" stroke="#a87534" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      );
    case "balance":
      return (
        <svg viewBox="0 0 36 36" fill="none" className="treatment-svg-icon" aria-hidden="true">
          <path d="M18 6V29" stroke="#a87534" strokeWidth="1.8" />
          <path d="M9 12H27" stroke="#a87534" strokeWidth="1.8" />
          <path d="M9 12L5 20H13L9 12Z" stroke="#a87534" strokeWidth="1.2" fill="#e8c792" />
          <path d="M27 12L23 20H31L27 12Z" stroke="#a87534" strokeWidth="1.2" fill="#e8c792" />
        </svg>
      );
    case "sprout":
      return (
        <svg viewBox="0 0 36 36" fill="none" className="treatment-svg-icon" aria-hidden="true">
          <path d="M18 29V15" stroke="#a87534" strokeWidth="1.8" strokeLinecap="round" />
          <path
            d="M18 17C12 17 8 12 8 8C13 8 18 12 18 17Z"
            fill="#e8c792"
            stroke="#a87534"
            strokeWidth="1.4"
          />
          <path
            d="M18 15C24 15 28 10 28 6C23 6 18 10 18 15Z"
            fill="#e8c792"
            stroke="#a87534"
            strokeWidth="1.4"
          />
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 36 36" fill="none" className="treatment-svg-icon" aria-hidden="true">
          <path
            d="M18 6C24 12 28 17 28 23C28 28.5228 23.5228 33 18 33C12.4772 33 8 28.5228 8 23C8 17 12 12 18 6Z"
            fill="#e8c792"
            stroke="#a87534"
            strokeWidth="1.8"
          />
        </svg>
      );
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

  // Reset active page on category change
  useEffect(() => {
    setActivePage(0);
    if (trackRef.current) {
      trackRef.current.scrollLeft = 0;
    }
  }, [activeCategory]);

  const pageCount = Math.max(1, Math.ceil(filteredTreatments.length / itemsPerPage));
  const pages = useMemo(() => Array.from({ length: pageCount }, (_, index) => index), [pageCount]);
  const safeActivePage = Math.min(activePage, pageCount - 1);

  const scrollToPage = (page: number) => {
    const track = trackRef.current;
    if (!track) return;
    const safePage = (page + pageCount) % pageCount;
    const targetCard = track.children[safePage * itemsPerPage] as HTMLElement | undefined;

    if (targetCard) {
      track.scrollTo({
        left: targetCard.offsetLeft,
        behavior: "smooth",
      });
    }
    setActivePage(safePage);
  };

  const handleScroll = () => {
    const track = trackRef.current;
    if (!track) return;

    const pageOffsets = pages.map((page) => {
      const card = track.children[page * itemsPerPage] as HTMLElement | undefined;
      return card?.offsetLeft ?? 0;
    });
    const nearestPage = pageOffsets.reduce((nearest, offset, page) => {
      const currentDistance = Math.abs(track.scrollLeft - pageOffsets[nearest]);
      const nextDistance = Math.abs(track.scrollLeft - offset);
      return nextDistance < currentDistance ? page : nearest;
    }, 0);

    setActivePage(nearestPage);
  };

  return (
    <section className="treatments-showcase-section" aria-labelledby="treatments-showcase-title">
      <div className="treatments-showcase-panel">
        <div className="treatments-botanical treatments-botanical-left" aria-hidden="true" />
        <div className="treatments-botanical treatments-botanical-right" aria-hidden="true" />

        {/* Section Header */}
        <div className="treatments-showcase-head">
          <span className="treatments-showcase-eyebrow">
            <i aria-hidden="true" />
            Authentic Clinical Ayurveda
            <i aria-hidden="true" />
          </span>
          <h2 id="treatments-showcase-title">
            Holistic Treatments for Every <em>Body &amp; Mind</em>
          </h2>
          <div className="treatments-showcase-divider" aria-hidden="true">
            <span />
            <i />
            <span />
          </div>
          <p>
            Personalized, physician-guided therapies rooted in classical Ayurvedic literature,
            crafted to restore total health, vitality, and balance.
          </p>

          {/* Trust Highlights Ribbon */}
          {/* <div className="treatments-trust-ribbon">
            <div className="treatments-trust-item">
              <span className="trust-icon">🌿</span>
              <span>100% Classical Formulations</span>
            </div>
            <div className="treatments-trust-divider" />
            <div className="treatments-trust-item">
              <span className="trust-icon">👨‍⚕️</span>
              <span>Physician Monitored Care</span>
            </div>
            <div className="treatments-trust-divider" />
            <div className="treatments-trust-item">
              <span className="trust-icon">🏥</span>
              <span>Dedicated Panchakarma Suites</span>
            </div>
            <div className="treatments-trust-divider" />
            <div className="treatments-trust-item">
              <span className="trust-icon">✨</span>
              <span>Personalized Dosha Plans</span>
            </div>
          </div> */}
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

          <Link className="treatments-showcase-all" href="/treatments">
            Explore All Treatments
            <span aria-hidden="true">&rarr;</span>
          </Link>

          <div className="treatments-slider-controls" aria-label="Treatment slider controls">
            <button type="button" onClick={() => scrollToPage(safeActivePage - 1)} aria-label="Previous treatments">
              &larr;
            </button>
            <button type="button" onClick={() => scrollToPage(safeActivePage + 1)} aria-label="Next treatments">
              &rarr;
            </button>
          </div>
        </div>

        {/* Cards Carousel Slider */}
        <div className="treatments-showcase-slider">
          <div className="treatments-showcase-grid" ref={trackRef} onScroll={handleScroll}>
            {filteredTreatments.map((treatment) => (
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
                      <span className="card-badge-duration">⏱ {treatment.duration}</span>
                    </div>

                    <div className="treatments-card-overlay-gradient" />
                  </div>

                  <div className="treatments-card-body">
                    <div className="treatments-card-icon-wrapper">
                      <TreatmentSvgIcon type={treatment.iconType} />
                    </div>

                    <h3>{treatment.title}</h3>
                    <p className="treatment-card-desc">{treatment.copy}</p>

                    {/* Benefit Tags */}
                    {treatment.benefits && treatment.benefits.length > 0 && (
                      <div className="treatments-card-benefits">
                        {treatment.benefits.map((b: string) => (
                          <span key={b} className="benefit-tag">
                            <svg viewBox="0 0 16 16" fill="currentColor" width="10" height="10">
                              <path d="M13.78 4.22a.75.75 0 010 1.06l-6.25 6.25a.75.75 0 01-1.06 0L3.72 8.78a.75.75 0 011.06-1.06l2.22 2.22 5.72-5.72a.75.75 0 011.06 0z" />
                            </svg>
                            {b}
                          </span>
                        ))}
                      </div>
                    )}

                    <div className="treatments-card-cta-row">
                      <span className="treatments-card-cta-btn">
                        Explore Therapy
                        <span className="arrow" aria-hidden="true">&rarr;</span>
                      </span>
                    </div>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        </div>

        {/* Pagination Dots */}
        <div className="treatments-showcase-dots" aria-label="Treatment slider pagination">
          {pages.map((page) => (
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

