"use client";

import { useEffect, useState } from "react";
import { PackageCard } from "./PackageCard";
import { getPublicPackages } from "@/app/services/api";

type PackageData = {
  icon: string;
  meta: string;
  title: string;
  text: string;
};

export function PackagesGrid() {
  const [packageList, setPackageList] = useState<PackageData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function loadPackages() {
      try {
        setLoading(true);
        const data = await getPublicPackages();
        if (Array.isArray(data) && data.length > 0) {
          const normalized: PackageData[] = data.map((pkg: any) => ({
            icon: pkg.icon || "lotus",
            meta: pkg.meta || `${pkg.durationDays || 7} Days Care`,
            title: pkg.title,
            text: pkg.overview || pkg.subtitle || pkg.text || "",
          }));
          setPackageList(normalized);
        } else {
          setPackageList([]);
        }
      } catch (err) {
        console.error("Failed to load live packages:", err);
        setPackageList([]);
      } finally {
        setLoading(false);
      }
    }
    loadPackages();
  }, []);

  return (
    <section className="packages-list-section">
      <div className="packages-section-head">
        <span className="packages-eyebrow">Our Packages</span>
        <h2>Structured care, meaningful healing</h2>
      </div>

      {!loading && packageList.length === 0 ? (
        <div style={{ padding: "40px 0", textAlign: "center", opacity: 0.7 }}>
          <p>No care packages currently available.</p>
        </div>
      ) : (
        <div className="packages-grid">
          {packageList.map((item) => (
            <PackageCard item={item} key={item.title} />
          ))}
        </div>
      )}
    </section>
  );
}

