"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { PlayIcon } from "./MediaIcons";
import { getPublicMedia, getImageDisplayUrl } from "@/app/services/api";

type MediaItem = {
  id: string;
  type: string;
  title: string;
  image: string;
  date: string;
};

export function FeaturedMedia() {
  const [featuredItem, setFeaturedItem] = useState<MediaItem | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function loadFeatured() {
      try {
        setLoading(true);
        const data = await getPublicMedia();
        if (Array.isArray(data) && data.length > 0) {
          const m = data[0];
          setFeaturedItem({
            id: m._id || m.id || 'm-0',
            type: m.category || m.type || 'DOCUMENTARY',
            title: m.title || 'Susrutha Healing & Hospital Experience',
            image: getImageDisplayUrl(m.image || m.coverImage || '/images/hero-doctor-consultation.webp'),
            date: m.date || 'Recent Coverage',
          });
        } else {
          setFeaturedItem(null);
        }
      } catch (err) {
        console.error("Failed to load featured media:", err);
        setFeaturedItem(null);
      } finally {
        setLoading(false);
      }
    }
    loadFeatured();
  }, []);

  if (!loading && !featuredItem) {
    return null;
  }

  const item = featuredItem || {
    id: 'm-0',
    type: 'DOCUMENTARY',
    title: 'Susrutha Healing & Hospital Experience',
    image: '/images/hero-doctor-consultation.webp',
    date: 'Recent Coverage',
  };

  return (
    <section className="media-featured" aria-labelledby="featured-media-title">
      <article>
        <Image src={item.image} alt={item.title} fill sizes="(max-width: 900px) 100vw, 86vw" />
        <button type="button" aria-label={`Play ${item.title}`}>
          <PlayIcon />
        </button>
        <div>
          <span>{item.type}</span>
          <h2 id="featured-media-title">{item.title}</h2>
          <p>A cinematic look at physician-directed care, calm spaces, and the disciplined rhythm behind classical treatment experiences.</p>
          <small>{item.date} / Susrutha Media Desk</small>
        </div>
      </article>
    </section>
  );
}

