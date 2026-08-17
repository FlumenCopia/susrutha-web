"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getPublicTreatments, getImageDisplayUrl } from "@/app/services/api";

const PAGE_SIZE = 8;

export function AllTreatmentsSection() {
  const [treatmentsList, setTreatmentsList] = useState<any[]>([]);
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [initialLoading, setInitialLoading] = useState<boolean>(true);
  const [loadingMore, setLoadingMore] = useState<boolean>(false);
  const [totalCount, setTotalCount] = useState<number>(0);

  const fetchBatch = async (targetPage: number, append: boolean = false) => {
    try {
      if (targetPage === 1) setInitialLoading(true);
      else setLoadingMore(true);

      const res = await getPublicTreatments({ page: targetPage, limit: PAGE_SIZE });
      const rawData = Array.isArray(res) ? res : res.items || [];
      const pagination = (res as any).pagination || {};

      const normalized = rawData.map((t: any) => ({
        slug: t.slug || `tr-${(t.title || t.name || '').toLowerCase().replace(/\s+/g, '-')}`,
        title: t.title || t.name,
        text: t.shortDescription || t.text || t.description || 'Ayurvedic therapeutic treatment.',
        time: t.durationMinutes ? `${t.durationMinutes} Mins` : '60 Mins',
        image: getImageDisplayUrl(t.coverImage || t.image),
        icon: "spa",
      }));

      if (append) {
        setTreatmentsList((prev) => [...prev, ...normalized]);
      } else {
        setTreatmentsList(normalized);
      }

      setTotalCount(pagination.total || normalized.length);
      setHasMore(pagination.hasMore ?? (normalized.length === PAGE_SIZE));
    } catch (err) {
      console.error("Failed to load treatments:", err);
    } finally {
      setInitialLoading(false);
      setLoadingMore(false);
    }
  };

  useEffect(() => {
    fetchBatch(1, false);
  }, []);

  const handleLoadMore = () => {
    if (loadingMore || !hasMore) return;
    const nextPage = page + 1;
    setPage(nextPage);
    fetchBatch(nextPage, true);
  };

  return (
    <section className="all-treatments-section" aria-labelledby="all-treatments-title">
      <div className="all-treatments-head">
        <h2 id="all-treatments-title">All Treatments</h2>
        <p>
          Discover authentic Kerala Ayurvedic therapies designed to restore balance, detoxify the body, and promote holistic healing.
        </p>
      </div>

      <div className="all-treatments-toolbar">
        <div className="all-treatments-count">
          Showing <strong>{treatmentsList.length}</strong> of <strong>{totalCount || treatmentsList.length}</strong> therapies
        </div>
        <label className="all-treatments-sort-label">
          <span>Sort by</span>
          <select className="all-treatments-sort-select" defaultValue="popular">
            <option value="popular">Most Popular</option>
            <option value="duration">Duration</option>
            <option value="name">Name (A-Z)</option>
          </select>
        </label>
      </div>

      {initialLoading ? (
        <div className="all-treatments-grid">
          {Array.from({ length: PAGE_SIZE }).map((_, idx) => (
            <div className="all-treatment-card shimmer-card" key={idx} style={{ height: "320px", background: "linear-gradient(90deg, #f0ede6 25%, #f8f6f0 50%, #f0ede6 75%)", borderRadius: "16px" }} />
          ))}
        </div>
      ) : (
        <div className="all-treatments-grid">
          {treatmentsList.map((treatment: any, idx: number) => {
            return (
              <Link
                className="all-treatment-card"
                href={`/treatments/${treatment.slug}`}
                aria-label={`View ${treatment.title} treatment details`}
                key={`${treatment.slug}-${idx}`}
              >
                <div className="all-treatment-image">
                  <Image
                    src={treatment.image}
                    alt={treatment.title}
                    fill
                    sizes="(max-width: 640px) 92vw, (max-width: 1100px) 44vw, 20vw"
                  />
                  <span className="all-treatment-icon" aria-hidden="true">
                    <span className="material-symbols-outlined">{treatment.icon}</span>
                  </span>
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

      {hasMore && !initialLoading && (
        <div style={{ marginTop: "40px", textAlign: "center" }}>
          <button
            type="button"
            className="btn btn-primary"
            onClick={handleLoadMore}
            disabled={loadingMore}
            style={{
              padding: "14px 36px",
              borderRadius: "9999px",
              background: "linear-gradient(135deg, #9a6528 0%, #c4922a 100%)",
              color: "#ffffff",
              fontWeight: 700,
              fontSize: "14px",
              border: "none",
              cursor: "pointer",
              boxShadow: "0 6px 20px rgba(154, 101, 40, 0.25)",
            }}
          >
            {loadingMore ? "Loading More Therapies…" : "Load More Therapies ↓"}
          </button>
        </div>
      )}

      <div className="treatment-journey-banner">
        <div className="journey-banner-copy">
          <span>Ready to Begin?</span>
          <h2>Experience Personalized Classical Care</h2>
        </div>
      </div>
    </section>
  );
}
