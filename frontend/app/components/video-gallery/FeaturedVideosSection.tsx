"use client";

import { useRef, useState } from "react";
import { VideoItem } from "./videoGalleryData";
import { FeaturedVideoCard } from "./FeaturedVideoCard";

type FeaturedVideosSectionProps = {
  videos: VideoItem[];
  onPlayVideo: (video: VideoItem) => void;
};

export function FeaturedVideosSection({ videos, onPlayVideo }: FeaturedVideosSectionProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [viewMode, setViewMode] = useState<"carousel" | "grid">("carousel");

  const scrollRight = () => {
    if (trackRef.current) {
      trackRef.current.scrollBy({ left: 360, behavior: "smooth" });
    }
  };

  const scrollLeft = () => {
    if (trackRef.current) {
      trackRef.current.scrollBy({ left: -360, behavior: "smooth" });
    }
  };

  return (
    <section className="vg-featured-section" aria-labelledby="featured-videos-heading">
      <div className="vg-section-header">
        <div className="vg-section-title-group">
          <div className="vg-eyebrow-accent">PHYSICIAN MASTERCLASSES</div>
          <h2 id="featured-videos-heading" className="vg-section-title">
            Featured Videos <span className="vg-leaf-accent" aria-hidden="true"><i className="fa-solid fa-leaf" /></span>
          </h2>
          <p className="vg-section-subhead">Curated videos to inspire your wellness journey</p>
        </div>

        {/* View Mode Switcher & Navigation Controls */}
        <div className="vg-section-actions">
          <div className="vg-view-toggle-group">
            <button
              type="button"
              className={`vg-toggle-btn ${viewMode === "carousel" ? "active" : ""}`}
              onClick={() => setViewMode("carousel")}
              aria-label="Carousel View"
            >
              <i className="fa-solid fa-sliders" />
            </button>
            <button
              type="button"
              className={`vg-toggle-btn ${viewMode === "grid" ? "active" : ""}`}
              onClick={() => setViewMode("grid")}
              aria-label="Grid View"
            >
              <i className="fa-solid fa-border-all" />
            </button>
          </div>

          {viewMode === "carousel" && (
            <div className="vg-carousel-controls">
              <button
                type="button"
                className="vg-nav-arrow-btn"
                onClick={scrollLeft}
                aria-label="Scroll left"
              >
                <i className="fa-solid fa-arrow-left" />
              </button>
              <button
                type="button"
                className="vg-nav-arrow-btn"
                onClick={scrollRight}
                aria-label="Scroll right"
              >
                <i className="fa-solid fa-arrow-right" />
              </button>
            </div>
          )}
        </div>
      </div>

      {videos.length === 0 ? (
        <div className="vg-empty-state">
          <span className="vg-empty-icon"><i className="fa-solid fa-magnifying-glass" /></span>
          <h3>No videos match your search</h3>
          <p>Try adjusting your category filter or search keywords.</p>
        </div>
      ) : viewMode === "carousel" ? (
        <div className="vg-carousel-wrapper">
          <div className="vg-featured-cards-track" ref={trackRef}>
            {videos.map((video) => (
              <FeaturedVideoCard key={video.id} video={video} onPlay={onPlayVideo} />
            ))}
          </div>
        </div>
      ) : (
        <div className="vg-featured-grid">
          {videos.map((video) => (
            <FeaturedVideoCard key={video.id} video={video} onPlay={onPlayVideo} />
          ))}
        </div>
      )}
    </section>
  );
}
