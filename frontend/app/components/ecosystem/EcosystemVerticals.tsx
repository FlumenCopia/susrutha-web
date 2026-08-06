"use client";

import { useEffect, useState } from "react";
import { EcosystemVerticalCard } from "./EcosystemVerticalCard";
import { ecosystemVerticals as fallbackVerticals } from "./ecosystemData";
import { getPublicDepartments, getImageDisplayUrl } from "@/app/services/api";

export function EcosystemVerticals() {
  const [verticals, setVerticals] = useState(fallbackVerticals);

  useEffect(() => {
    async function loadDepartments() {
      try {
        const data = await getPublicDepartments();
        if (Array.isArray(data) && data.length > 0) {
          const normalized = data.map((d: any, idx: number) => {
            const fb = fallbackVerticals[idx] || fallbackVerticals[0];
            return {
              title: d.name || d.title || fb.title,
              text: d.overview || d.description || d.tagline || fb.text,
              image: getImageDisplayUrl(d.coverImage || d.image || fb.image),
              href: d.slug ? `/treatments/${d.slug}` : fb.href,
              icon: fb.icon as any,
              since: fb.since,
            };
          });
          setVerticals(normalized as any);
        }
      } catch (err) {
        console.error("Failed to load live departments:", err);
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

      <div className="ecosystem-grid">
        {verticals.map((item) => (
          <EcosystemVerticalCard item={item} key={item.title} />
        ))}
      </div>
    </section>
  );
}
