"use client";

import { useEffect, useState } from "react";
import { PackageCard } from "./PackageCard";
import { getPublicPackages } from "@/app/services/api";

type PackageData = {
  slug?: string;
  icon: string;
  meta: string;
  title: string;
  text: string;
  isBackendData?: boolean;
};

const PAGE_SIZE = 6;

export function PackagesGrid() {
  const [packageList, setPackageList] = useState<PackageData[]>([]);
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(true);
  const [loadingMore, setLoadingMore] = useState<boolean>(false);

  const fetchPackagesBatch = async (targetPage: number, append: boolean = false) => {
    try {
      if (targetPage === 1) setLoading(true);
      else setLoadingMore(true);

      const res = await getPublicPackages({ page: targetPage, limit: PAGE_SIZE });
      const rawData = Array.isArray(res) ? res : res.items || [];
      const pagination = (res as any).pagination || {};

      const normalized: PackageData[] = rawData.map((pkg: any) => ({
        slug: pkg.slug || pkg._id,
        icon: pkg.icon || "lotus",
        meta: pkg.meta || `${pkg.durationDays || 7} Days Care`,
        title: pkg.title,
        text: pkg.overview || pkg.subtitle || pkg.text || "",
        isBackendData: true,
      }));

      if (append) {
        setPackageList((prev) => [...prev, ...normalized]);
      } else {
        setPackageList(normalized);
      }

      setHasMore(pagination.hasMore ?? (normalized.length === PAGE_SIZE));
    } catch (err) {
      console.error("Failed to load live packages:", err);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  useEffect(() => {
    fetchPackagesBatch(1, false);
  }, []);

  const handleLoadMore = () => {
    if (loadingMore || !hasMore) return;
    const nextPage = page + 1;
    setPage(nextPage);
    fetchPackagesBatch(nextPage, true);
  };

  return (
    <section className="packages-list-section">
      <div className="packages-section-head">
        <span className="packages-eyebrow">Our Packages</span>
        <h2>Structured care, meaningful healing</h2>
      </div>

      {loading ? (
        <div className="packages-grid">
          {Array.from({ length: PAGE_SIZE }).map((_, idx) => (
            <div className="package-card shimmer-card" key={idx} style={{ height: "300px", background: "linear-gradient(90deg, #f0ede6 25%, #f8f6f0 50%, #f0ede6 75%)", borderRadius: "20px" }} />
          ))}
        </div>
      ) : packageList.length === 0 ? (
        <div style={{ padding: "40px 0", textAlign: "center", opacity: 0.7 }}>
          <p>No care packages currently available.</p>
        </div>
      ) : (
        <>
          <div className="packages-grid">
            {packageList.map((item, idx) => (
              <PackageCard item={item} key={`${item.title}-${idx}`} />
            ))}
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
                {loadingMore ? "Loading More Packages…" : "Load More Care Packages ↓"}
              </button>
            </div>
          )}
        </>
      )}
    </section>
  );
}
