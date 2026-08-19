"use client";

import { useRef } from "react";
import { ChevronLeft, ChevronRight, Play, Leaf } from "lucide-react";
import { ContinueWatchingCard, ContinueWatchingItem } from "./ContinueWatchingCard";
import { VideoItem } from "./FeaturedVideoCard";

type ContinueWatchingSectionProps = {
  items?: ContinueWatchingItem[];
  onPlayVideo: (video: VideoItem) => void;
};

export function ContinueWatchingSection({ items = [], onPlayVideo }: ContinueWatchingSectionProps) {
  if (items.length === 0) return null;
  const trackRef = useRef<HTMLDivElement>(null);

  const scrollRight = () => {
    if (trackRef.current) {
      trackRef.current.scrollBy({ left: 320, behavior: "smooth" });
    }
  };

  const scrollLeft = () => {
    if (trackRef.current) {
      trackRef.current.scrollBy({ left: -320, behavior: "smooth" });
    }
  };

  return (
    <section className="vg-cw-section" aria-labelledby="continue-watching-heading">
      <div className="vg-cw-panel-luxury">
        <div className="vg-section-header">
          <div className="vg-cw-header-left">
            <div className="vg-cw-icon-badge" aria-hidden="true" style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Play size={14} />
            </div>
            <div>
              <div className="vg-eyebrow-accent">RESTART SESSION</div>
              <h2 id="continue-watching-heading" className="vg-section-title">
                Continue Watching <span className="vg-leaf-accent" aria-hidden="true"><Leaf size={16} style={{ display: "inline-block", verticalAlign: "-2px" }} /></span>
              </h2>
              <p className="vg-section-subhead">Pick up right where you left off</p>
            </div>
          </div>

          <div className="vg-carousel-controls">
            <button
              type="button"
              className="vg-nav-arrow-btn"
              onClick={scrollLeft}
              aria-label="Scroll left"
              style={{ display: "flex", alignItems: "center", justifyContent: "center" }}
            >
              <ChevronLeft size={16} />
            </button>
            <button
              type="button"
              className="vg-nav-arrow-btn"
              onClick={scrollRight}
              aria-label="Scroll right"
              style={{ display: "flex", alignItems: "center", justifyContent: "center" }}
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>

        <div className="vg-carousel-wrapper">
          <div className="vg-cw-cards-track" ref={trackRef}>
            {items.map((item) => (
              <ContinueWatchingCard key={item.id} item={item} onPlay={onPlayVideo} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
