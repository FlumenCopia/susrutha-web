"use client";

import { useState } from "react";
import { VideoGalleryPage } from "../video-gallery/VideoGalleryPage";
import { MediaGallery } from "../media/MediaGallery";
import { PressSection } from "../media/PressSection";
import { EventsSection } from "../media/EventsSection";
import "./unified-gallery.css";

export function UnifiedGalleryPage() {
  const [activeTab, setActiveTab] = useState<"videos" | "photos" | "press">("videos");

  return (
    <div className="unified-gallery-wrapper">
      {/* Header Banner */}
      <section className="ug-hero">
        <div className="ug-hero-container">
          <span className="ug-eyebrow">SUSRUTHA MEDIA & GALLERY HUB</span>
          <h1 className="ug-title">Stories, Places, Visuals & Living Traditions</h1>
          <p className="ug-subtext">
            Explore authentic Kerala Ayurveda therapies, physician insights, campus tours, patient journeys, and press news.
          </p>

          {/* Unified Category Tabs */}
          <div className="ug-tabs" role="tablist" aria-label="Media & Gallery Categories">
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === "videos"}
              className={`ug-tab ${activeTab === "videos" ? "active" : ""}`}
              onClick={() => setActiveTab("videos")}
            >
              <span className="material-symbols-outlined" style={{ fontSize: "18px" }}>play_circle</span>
              <span>Video Stories & Podcasts</span>
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === "photos"}
              className={`ug-tab ${activeTab === "photos" ? "active" : ""}`}
              onClick={() => setActiveTab("photos")}
            >
              <span className="material-symbols-outlined" style={{ fontSize: "18px" }}>photo_library</span>
              <span>Photo Archive & Campus</span>
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === "press"}
              className={`ug-tab ${activeTab === "press" ? "active" : ""}`}
              onClick={() => setActiveTab("press")}
            >
              <span className="material-symbols-outlined" style={{ fontSize: "18px" }}>newspaper</span>
              <span>Press & News Releases</span>
            </button>
          </div>
        </div>
      </section>

      {/* Tab Panels */}
      <div className="ug-content-container">
        {activeTab === "videos" && (
          <div className="ug-tab-panel">
            <VideoGalleryPage />
          </div>
        )}

        {activeTab === "photos" && (
          <div className="ug-tab-panel">
            <MediaGallery />
          </div>
        )}

        {activeTab === "press" && (
          <div className="ug-tab-panel">
            <PressSection />
            <div style={{ marginTop: "40px" }}>
              <EventsSection />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
