"use client";

import { useRef, useState } from "react";
import { Leaf, SlidersHorizontal, LayoutGrid, ArrowLeft, ArrowRight, Search } from "lucide-react";
import { FeaturedVideoCard, VideoItem } from "./FeaturedVideoCard";

type FeaturedVideosSectionProps = {
  videos: VideoItem[];
  onPlayVideo: (video: VideoItem) => void;
  activeCategory?: string;
};

export function FeaturedVideosSection({
  videos,
  onPlayVideo,
  activeCategory = "All",
}: FeaturedVideosSectionProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [viewMode, setViewMode] = useState<"carousel" | "grid">("carousel");

  const getHeaderContent = () => {
    const cat = (activeCategory || "All").toLowerCase();
    if (cat === "images" || cat === "gallery") {
      return {
        eyebrow: "CAMPUS & CARE SPACES",
        title: "Photo Gallery",
        subhead: "Explore visual walkthroughs of our hospital campus, inpatient suites, and healing spaces",
      };
    }
    if (cat === "podcasts") {
      return {
        eyebrow: "PHYSICIAN DIALOGUES",
        title: "Ayurveda Podcasts",
        subhead: "In-depth clinical discussions and roundtables with our medical experts",
      };
    }
    if (cat === "videos") {
      return {
        eyebrow: "PHYSICIAN MASTERCLASSES",
        title: "Featured Videos",
        subhead: "Curated videos to inspire your wellness journey",
      };
    }
    return {
      eyebrow: "CURATED MEDIA GALLERY",
      title: "All Media & Videos",
      subhead: "Explore physician masterclasses, photo walkthroughs, and healing wisdom",
    };
  };

  const header = getHeaderContent();

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
          <div className="vg-eyebrow-accent">{header.eyebrow}</div>
          <h2 id="featured-videos-heading" className="vg-section-title">
            {header.title} <span className="vg-leaf-accent" aria-hidden="true"><Leaf size={16} strokeWidth={1.75} /></span>
          </h2>
          <p className="vg-section-subhead">{header.subhead}</p>
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
              <SlidersHorizontal size={15} strokeWidth={1.75} />
            </button>
            <button
              type="button"
              className={`vg-toggle-btn ${viewMode === "grid" ? "active" : ""}`}
              onClick={() => setViewMode("grid")}
              aria-label="Grid View"
            >
              <LayoutGrid size={15} strokeWidth={1.75} />
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
                <ArrowLeft size={16} strokeWidth={1.75} />
              </button>
              <button
                type="button"
                className="vg-nav-arrow-btn"
                onClick={scrollRight}
                aria-label="Scroll right"
              >
                <ArrowRight size={16} strokeWidth={1.75} />
              </button>
            </div>
          )}
        </div>
      </div>

      {videos.length === 0 ? (
        <div className="vg-empty-state">
          <span className="vg-empty-icon"><Search size={24} strokeWidth={1.5} /></span>
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
