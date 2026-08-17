"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { getPublicTreatments, getPublicTreatmentCategories, getImageDisplayUrl } from "@/app/services/api";
import { SkeletonCard } from "@/app/components/common/SkeletonCard";
import { CustomSortDropdown, SortOption } from "@/app/components/common/CustomSortDropdown";

const sortOptionsList: SortOption[] = [
  { value: "popular", label: "Most Popular", icon: "auto_awesome" },
  { value: "duration", label: "Duration", icon: "schedule" },
  { value: "name", label: "Name (A - Z)", icon: "sort_by_alpha" },
];

const categoryIconMap: Record<string, string> = {
  panchakarma: "shower",
  detox: "eco",
  cleansing: "eco",
  women: "female",
  pain: "healing",
  wellness: "spa",
  kizhi: "local_pharmacy",
  dhara: "water_drop",
  vasthi: "sanitizer",
  specialized: "medical_services",
  spine: "bone",
  default: "spa",
};

function getCategoryIcon(label: string): string {
  const lower = label.toLowerCase();
  for (const key of Object.keys(categoryIconMap)) {
    if (lower.includes(key)) return categoryIconMap[key];
  }
  return categoryIconMap.default;
}

export function TreatmentsPageContent() {
  const [categories, setCategories] = useState<{ label: string; icon: string }[]>([
    { label: "All Treatments", icon: "apps" },
  ]);
  const [activeCategory, setActiveCategory] = useState("All Treatments");
  const [sortBy, setSortBy] = useState("popular");
  const [treatments, setTreatments] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [loadingMore, setLoadingMore] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(false);
  const [totalCount, setTotalCount] = useState<number>(0);

  const categoryTrackRef = useRef<HTMLDivElement>(null);
  const observerTarget = useRef<HTMLDivElement>(null);

  // Load dynamic categories from backend database
  useEffect(() => {
    async function loadDynamicCategories() {
      try {
        const backendCats = await getPublicTreatmentCategories();
        if (Array.isArray(backendCats) && backendCats.length > 0) {
          const dynamicPills = [
            { label: "All Treatments", icon: "apps" },
            ...backendCats.map((catName: string) => ({
              label: catName,
              icon: getCategoryIcon(catName),
            })),
          ];
          setCategories(dynamicPills);
        }
      } catch (err) {
        console.error("Failed to load backend categories:", err);
      }
    }
    loadDynamicCategories();
  }, []);

  // Fetch treatments from backend API with category, sort, page, and limit
  const fetchTreatments = useCallback(async (cat: string, sort: string, targetPage: number, append: boolean = false) => {
    try {
      if (append) {
        setLoadingMore(true);
      } else {
        setLoading(true);
      }

      const queryParams: any = { page: targetPage, limit: 9, sort };
      if (cat !== "All Treatments") queryParams.category = cat;

      const res: any = await getPublicTreatments(queryParams);
      let items: any[] = [];
      let paginationMeta: any = { total: 0, hasMore: false };

      if (res && Array.isArray(res.items)) {
        items = res.items.map((t: any) => ({
          slug: t.slug,
          title: t.name || t.title,
          text: t.shortDescription || t.subtitle || t.overview || "",
          time: t.durationMinutes ? `${t.durationMinutes} Mins` : '60 Mins',
          image: getImageDisplayUrl(t.coverImage || t.image),
          category: t.category || "Panchakarma",
          isBackendData: true,
        }));
        paginationMeta = res.pagination || { total: items.length, hasMore: false };
      } else if (Array.isArray(res)) {
        items = res.map((t: any) => ({
          slug: t.slug,
          title: t.name || t.title,
          text: t.shortDescription || t.subtitle || t.overview || "",
          time: t.durationMinutes ? `${t.durationMinutes} Mins` : '60 Mins',
          image: getImageDisplayUrl(t.coverImage || t.image),
          category: t.category || "Panchakarma",
          isBackendData: true,
        }));
        paginationMeta = { total: items.length, hasMore: false };
      } else {
        items = [];
        paginationMeta = { total: 0, hasMore: false };
      }

      if (append) {
        setTreatments((prev) => [...prev, ...items]);
      } else {
        setTreatments(items);
      }

      setTotalCount(paginationMeta.total || items.length);
      setHasMore(Boolean(paginationMeta.hasMore));
    } catch (err) {
      console.error("Failed to load treatments:", err);
      if (!append) setTreatments([]);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  }, []);

  // Initial & Filter change effect
  useEffect(() => {
    setPage(1);
    fetchTreatments(activeCategory, sortBy, 1, false);
  }, [activeCategory, sortBy, fetchTreatments]);

  // Load More handler for infinite scroll
  const handleLoadMore = () => {
    if (loadingMore || !hasMore) return;
    const nextPage = page + 1;
    setPage(nextPage);
    fetchTreatments(activeCategory, sortBy, nextPage, true);
  };

  // Scroll Category Bar
  const handleCategoryScroll = (direction: "left" | "right") => {
    if (categoryTrackRef.current) {
      const scrollAmount = direction === "left" ? -280 : 280;
      categoryTrackRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <div className="treatments-page-content-wrapper">
      {/* Banner Section */}
      <section className="treatment-reference-page" aria-labelledby="treatment-reference-title">
        <div className="treatment-reference-hero">
          <div className="treatment-hero-bg-wrap" aria-hidden="true">
            <Image
              src="/images/treatment-sirodhara.webp"
              alt="Authentic Ayurvedic Shirodhara treatment"
              fill
              priority
              sizes="100vw"
              className="treatment-hero-bg-img"
            />
            <div className="treatment-hero-overlay" />
          </div>

          <div className="treatment-hero-copy">
            <h1 id="treatment-reference-title">
              <span className="treatment-title-line">Ancient Wisdom.</span>
              <span className="treatment-title-line">
                <em>Healing</em> for Today.
              </span>
            </h1>

            <p style={{ color: "#fff" }}>
              Explore our authentic Ayurvedic therapies crafted to detoxify, rejuvenate and restore
              balance to your body, mind and soul.
            </p>

            <Link className="treatment-hero-cta" href="#treatment-categories">
              Explore Treatments
              <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        </div>

        {/* Dynamic Category Pill Filter Bar */}
        <div className="treatment-category-shell" id="treatment-categories">
          <button
            className="treatment-swiper-btn treatment-swiper-prev"
            type="button"
            onClick={() => handleCategoryScroll("left")}
            aria-label="Scroll categories left"
          >
            <span className="material-symbols-outlined">chevron_left</span>
          </button>

          <div className="treatment-category-track" ref={categoryTrackRef} role="list" aria-label="Treatment categories">
            {categories.map((category) => (
              <button
                className="treatment-category-pill"
                data-active={activeCategory === category.label ? "true" : undefined}
                onClick={() => setActiveCategory(category.label)}
                type="button"
                role="listitem"
                key={category.label}
              >
                <span className="treatment-category-icon" aria-hidden="true">
                  <span className="material-symbols-outlined">{category.icon}</span>
                </span>
                {category.label}
              </button>
            ))}
          </div>

          <button
            className="treatment-swiper-btn treatment-swiper-next"
            type="button"
            onClick={() => handleCategoryScroll("right")}
            aria-label="Scroll categories right"
          >
            <span className="material-symbols-outlined">chevron_right</span>
          </button>
        </div>
      </section>

      {/* Treatments Section */}
      <section className="all-treatments-section" aria-labelledby="all-treatments-title">
        <div className="all-treatments-head">
          <h2 id="all-treatments-title">
            {activeCategory === "All Treatments" ? "All Treatments" : `${activeCategory} Therapies`}
          </h2>
          <p>
            Discover authentic Kerala Ayurvedic therapies designed to restore balance, detoxify the body,
            and promote holistic healing.
          </p>
        </div>

        {/* Theme Styled Toolbar */}
        <div
          className="all-treatments-toolbar"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "16px",
            marginBottom: "36px",
            position: "relative",
            zIndex: 100,
          }}
        >
          <div className="all-treatments-count" style={{ fontSize: "14px", color: "#475569" }}>
            Showing <strong style={{ color: "#1b3d27", fontWeight: 800 }}>{treatments.length}</strong> {activeCategory !== "All Treatments" ? `therapies in ${activeCategory}` : "therapies"} (Total: {totalCount})
          </div>

          {/* Custom Theme Styled Sort Dropdown */}
          <CustomSortDropdown
            value={sortBy}
            onChange={(val) => setSortBy(val)}
            options={sortOptionsList}
          />
        </div>

        {/* Grid / Skeleton Loaders */}
        {loading ? (
          <div className="all-treatments-grid">
            {Array.from({ length: 6 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : (
          <div className="all-treatments-grid">
            {treatments.map((treatment: any) => {
              return (
                <Link
                  className="all-treatment-card"
                  href={`/treatments/${treatment.slug}`}
                  aria-label={`View ${treatment.title} treatment details`}
                  key={treatment.slug}
                  style={{ position: "relative" }}
                >
                  <div className="all-treatment-image">
                    <Image
                      src={treatment.image}
                      alt={treatment.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                  <div className="all-treatment-body">
                    <h3>{treatment.title}</h3>
                    <span className="all-treatment-rule" aria-hidden="true" />
                    <p>{treatment.text}</p>
                    <div className="all-treatment-time">
                      <span className="material-symbols-outlined" style={{ fontSize: "16px", marginRight: "5px" }} aria-hidden="true">
                        schedule
                      </span>
                      {treatment.time}
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}

        {/* Load More / Infinite Scroll Button */}
        {hasMore && (
          <div style={{ textAlign: "center", marginTop: "40px" }} ref={observerTarget}>
            <button
              onClick={handleLoadMore}
              disabled={loadingMore}
              style={{
                padding: "12px 32px",
                borderRadius: "30px",
                background: "#d49e54",
                color: "#ffffff",
                fontWeight: "700",
                fontSize: "14px",
                border: "none",
                cursor: loadingMore ? "wait" : "pointer",
                boxShadow: "0 6px 20px rgba(212, 158, 84, 0.35)",
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              {loadingMore ? "Loading More Therapies..." : "Load More Therapies ↓"}
            </button>
          </div>
        )}
      </section>
    </div>
  );
}
