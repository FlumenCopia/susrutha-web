"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getPublicConditions } from "@/app/services/api";

const PAGE_SIZE = 8;

const pathways = [
  "Detailed physician consultation",
  "Ayurvedic diagnosis and treatment planning",
  "Therapies, medicine, diet and lifestyle support",
  "Follow-up reviews for lasting recovery",
];

function LeafMark() {
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true" focusable="false">
      <path d="M32 52C20 42 18 28 32 9c14 19 12 33 0 43Z" />
      <path d="M31 52C17 49 9 39 8 24c15 2 24 12 23 28Z" />
      <path d="M33 52c14-3 22-13 23-28-15 2-24 12-23 28Z" />
      <path d="M32 52C21 53 13 48 6 38c13-3 22 2 26 14Z" />
      <path d="M32 52c11 1 19-4 26-14-13-3-22 2-26 14Z" />
    </svg>
  );
}

export function ConditionsContentSection() {
  const [conditionsList, setConditionsList] = useState<any[]>([]);
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(true);
  const [loadingMore, setLoadingMore] = useState<boolean>(false);

  const fetchConditionsBatch = async (targetPage: number, append: boolean = false) => {
    try {
      if (targetPage === 1) setLoading(true);
      else setLoadingMore(true);

      const res = await getPublicConditions({ page: targetPage, limit: PAGE_SIZE });
      const rawData = Array.isArray(res) ? res : res.items || [];
      const pagination = (res as any).pagination || {};

      const normalized = rawData.map((c: any) => ({
        title: c.name || c.title,
        text: c.shortDescription || c.description || c.summary || c.text || "Physician-guided Ayurvedic care and recovery.",
        href: `/conditions/${c.slug || c._id || c.id}`,
        category: c.category || "Speciality Care",
      }));

      if (append) {
        setConditionsList((prev) => [...prev, ...normalized]);
      } else {
        setConditionsList(normalized);
      }

      setHasMore(pagination.hasMore ?? (normalized.length === PAGE_SIZE));
    } catch (err) {
      console.error("Failed to load backend conditions:", err);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  useEffect(() => {
    fetchConditionsBatch(1, false);
  }, []);

  const handleLoadMore = () => {
    if (loadingMore || !hasMore) return;
    const nextPage = page + 1;
    setPage(nextPage);
    fetchConditionsBatch(nextPage, true);
  };

  return (
    <>
      <section className="conditions-content" aria-labelledby="condition-pathways-title">
        <div className="conditions-section-head">
          <span>Condition Pathways</span>
          <h2 id="condition-pathways-title">Choose the concern that best matches your health journey.</h2>
          <p>
            Each pathway begins with consultation and is guided by constitution, diagnosis, age, strength, and recovery
            goals.
          </p>
        </div>

        {loading ? (
          <div className="conditions-card-grid">
            {Array.from({ length: PAGE_SIZE }).map((_, idx) => (
              <div className="condition-card shimmer-card" key={idx} style={{ height: "220px", background: "linear-gradient(90deg, #f0ede6 25%, #f8f6f0 50%, #f0ede6 75%)", borderRadius: "16px" }} />
            ))}
          </div>
        ) : (
          <>
            <div className="conditions-card-grid">
              {conditionsList.map((condition: any, index: number) => {
                return (
                  <Link
                    className="condition-card"
                    href={condition.href}
                    key={`${condition.title}-${index}`}
                  >
                    <span>{condition.category}</span>
                    <h3>{condition.title}</h3>
                    <p>{condition.text}</p>
                    <b aria-hidden="true">{String(index + 1).padStart(2, "0")}</b>
                    <i aria-hidden="true">&rarr;</i>
                  </Link>
                );
              })}
            </div>

            {hasMore && (
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
                  {loadingMore ? "Loading More Conditions…" : "Load More Condition Pathways ↓"}
                </button>
              </div>
            )}
          </>
        )}
      </section>

      <section className="conditions-care-band" aria-labelledby="conditions-care-title">
        <div>
          <span>How Care Works</span>
          <h2 id="conditions-care-title">Root-cause care, guided by experienced physicians.</h2>
        </div>
        <div className="conditions-pathway-list">
          {pathways.map((item) => (
            <article key={item}>
              <LeafMark />
              <p>{item}</p>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
