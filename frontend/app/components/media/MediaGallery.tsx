"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { PlayIcon } from "./MediaIcons";
import { getPublicGalleryAlbums, getImageDisplayUrl } from "@/app/services/api";

export type MediaItem = {
  title: string;
  kicker: string;
  date: string;
  image: string;
  type: string;
  duration?: string;
  isBackendData?: boolean;
};

const PAGE_SIZE = 8;

export function MediaGallery() {
  const [items, setItems] = useState<MediaItem[]>([]);
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(true);
  const [loadingMore, setLoadingMore] = useState<boolean>(false);

  const fetchGalleryBatch = async (targetPage: number, append: boolean = false) => {
    try {
      if (targetPage === 1) setLoading(true);
      else setLoadingMore(true);

      const res = await getPublicGalleryAlbums({ page: targetPage, limit: PAGE_SIZE });
      const rawData = Array.isArray(res) ? res : res.items || [];
      const pagination = (res as any).pagination || {};

      const normalized: MediaItem[] = rawData.map((album: any) => ({
        title: album.title || "Gallery Album",
        kicker: album.category || "Photo Gallery",
        date: album.createdAt ? new Date(album.createdAt).toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" }) : "Recent",
        image: getImageDisplayUrl(album.coverImage || (album.mediaItems && album.mediaItems[0]?.url)),
        type: "Photo",
        isBackendData: true,
      }));

      if (append) {
        setItems((prev) => [...prev, ...normalized]);
      } else {
        setItems(normalized);
      }

      setHasMore(pagination.hasMore ?? (normalized.length === PAGE_SIZE));
    } catch (err) {
      console.error("Failed to load gallery albums:", err);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  useEffect(() => {
    fetchGalleryBatch(1, false);
  }, []);

  const handleLoadMore = () => {
    if (loadingMore || !hasMore) return;
    const nextPage = page + 1;
    setPage(nextPage);
    fetchGalleryBatch(nextPage, true);
  };

  return (
    <section className="media-gallery-section" id="media-gallery" aria-labelledby="media-gallery-title">
      <div className="media-section-head">
        <span>Visual Archive</span>
        <h2 id="media-gallery-title">A curated wall of stories, places, people and rituals.</h2>
      </div>

      {loading ? (
        <div className="media-gallery">
          {Array.from({ length: PAGE_SIZE }).map((_, idx) => (
            <div className="media-card shimmer-card" key={idx} style={{ height: "280px", background: "linear-gradient(90deg, #f0ede6 25%, #f8f6f0 50%, #f0ede6 75%)", borderRadius: "20px" }} />
          ))}
        </div>
      ) : (
        <>
          <div className="media-gallery">
            {items.map((item: any, index: number) => {
              return (
                <article
                  className="media-card"
                  data-size={index % 4 === 0 ? "large" : index % 3 === 0 ? "wide" : "standard"}
                  key={`${item.title}-${index}`}
                >
                  <Image src={item.image} alt="" fill sizes="(max-width: 760px) 100vw, 33vw" />
                  <div>
                    <span>{item.type}</span>
                    <h3>{item.title}</h3>
                    <small>{item.kicker} / {item.date}</small>
                  </div>
                  {item.duration ? <button type="button" aria-label={`Play ${item.title}`}><PlayIcon /></button> : null}
                </article>
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
                {loadingMore ? "Loading More Albums…" : "Load More Gallery Albums ↓"}
              </button>
            </div>
          )}
        </>
      )}
    </section>
  );
}
