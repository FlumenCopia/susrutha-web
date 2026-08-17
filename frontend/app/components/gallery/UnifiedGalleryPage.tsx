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
