"use client";

import { useEffect, useState } from "react";
import { pressItems as fallbackPress } from "./mediaData";
import { getPublicMedia } from "@/app/services/api";

type PressItem = {
  id: string;
  title: string;
  summary: string;
};

export function PressSection() {
  const [items, setItems] = useState<PressItem[]>(
    fallbackPress.map((p, i) => ({ id: `p-${i}`, title: p, summary: "Editorial recognition for patient-centred Ayurveda, physician guidance, and authentic Kerala treatment traditions." }))
  );

  useEffect(() => {
    async function loadMedia() {
      try {
        const data = await getPublicMedia();
        if (Array.isArray(data) && data.length > 0) {
          const normalized: PressItem[] = data.map((m: any, idx: number) => ({
            id: m._id || m.id || `m-${idx}`,
            title: m.title || fallbackPress[idx] || 'Susrutha Media Coverage',
            summary: m.summary || m.content || 'Editorial recognition for patient-centred Ayurveda, physician guidance, and authentic Kerala treatment traditions.',
          }));
          setItems(normalized);
        }
      } catch (err) {
        console.error("Failed to load live media:", err);
      }
    }
    loadMedia();
  }, []);

  return (
    <section className="media-press" aria-labelledby="press-title">
      <div className="media-section-head">
        <span>Press & Recognition</span>
        <h2 id="press-title">A quiet record of trust, coverage and care leadership.</h2>
      </div>
      <div>
        {items.map((item, index) => (
          <article key={item.id}>
            <small>0{index + 1}</small>
            <h3>{item.title}</h3>
            <p>{item.summary}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
