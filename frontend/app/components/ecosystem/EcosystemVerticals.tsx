"use client";

import { useEffect, useState } from "react";
import { EcosystemVerticalCard } from "./EcosystemVerticalCard";
import { getPublicDepartments, getImageDisplayUrl } from "@/app/services/api";

export function EcosystemVerticals() {
  const [verticals, setVerticals] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function loadDepartments() {
      try {
        setLoading(true);
        const data = await getPublicDepartments();
        if (Array.isArray(data) && data.length > 0) {
          const normalized = data.map((d: any) => {
            return {
              title: d.name || d.title || "Vertical",
              text: d.overview || d.description || d.tagline || "",
              image: getImageDisplayUrl(d.coverImage || d.image || "/images/ayurveda-village-path.webp"),
              href: d.slug ? `/treatments/${d.slug}` : "/treatments",
              icon: "hospital",
              since: d.establishedYear ? `EST. ${d.establishedYear}` : "EST. 2004",
            };
          });
          setVerticals(normalized);
        } else {
          setVerticals([]);
        }
      } catch (err) {
        console.error("Failed to load live departments:", err);
        setVerticals([]);
      } finally {
        setLoading(false);
      }
    }
    loadDepartments();
  }, []);

  return (
    <section className="ecosystem-verticals" id="ecosystem-verticals">
      <div className="ecosystem-section-head">
        <span className="ecosystem-eyebrow">Our Verticals</span>
        <h2>
          Explore <em>each vertical</em>
        </h2>
        <p>Dedicated pages include services, FAQs, maps, galleries and enquiry forms for answer-engine clarity.</p>
      </div>

      {!loading && verticals.length === 0 ? (
        <div style={{ padding: "40px 0", textAlign: "center", opacity: 0.7 }}>
          <p>No verticals currently listed.</p>
        </div>
      ) : (
        <div className="ecosystem-grid">
          {verticals.map((item) => (
            <EcosystemVerticalCard item={item} key={item.title} />
          ))}
        </div>
      )}
    </section>
  );
}

