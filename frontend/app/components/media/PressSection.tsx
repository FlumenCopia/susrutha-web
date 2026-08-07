"use client";

import { useEffect, useState } from "react";
import { getPublicMedia } from "@/app/services/api";

type PressItem = {
  id: string;
  title: string;
  summary: string;
};

export function PressSection() {
  const [items, setItems] = useState<PressItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function loadMedia() {
      try {
        setLoading(true);
        const data = await getPublicMedia();
        if (Array.isArray(data) && data.length > 0) {
          const normalized: PressItem[] = data.map((m: any, idx: number) => ({
            id: m._id || m.id || `m-${idx}`,
            title: m.title || 'Susrutha Media Coverage',
            summary: m.summary || m.content || 'Editorial recognition for patient-centred Ayurveda, physician guidance, and authentic Kerala treatment traditions.',
          }));
          setItems(normalized);
        } else {
          setItems([]);
        }
      } catch (err) {
        console.error("Failed to load live media:", err);
        setItems([]);
      } finally {
        setLoading(false);
      }
    }
    loadMedia();
  }, []);

  if (!loading && items.length === 0) {
    return null;
  }

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

