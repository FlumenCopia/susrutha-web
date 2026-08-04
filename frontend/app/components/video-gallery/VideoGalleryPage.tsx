"use client";

import { useState, useMemo } from "react";
import {
  featuredVideosData,
  continueWatchingData,
  VideoCategory,
  VideoItem,
} from "./videoGalleryData";
import { VideoGalleryHeaderHero } from "./VideoGalleryHeaderHero";
import { VideoCategoryFilters } from "./VideoCategoryFilters";
import { FeaturedVideosSection } from "./FeaturedVideosSection";
import { VideoPodcastSection } from "./VideoPodcastSection";
import { VideoPlaylistsSection } from "./VideoPlaylistsSection";
import { PatientStoriesSection } from "./PatientStoriesSection";
import { ContinueWatchingSection } from "./ContinueWatchingSection";
import { VideoModal } from "./VideoModal";

export function VideoGalleryPage() {
  const [activeCategory, setActiveCategory] = useState<VideoCategory>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sortBy, setSortBy] = useState<string>("popular");
  const [activeModalVideo, setActiveModalVideo] = useState<VideoItem | null>(null);

  const filteredVideos = useMemo(() => {
    let list = featuredVideosData.filter((v) => {
      const matchesCategory = activeCategory === "All" || v.category === activeCategory;
      const matchesSearch =
        searchQuery.trim() === "" ||
        v.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        v.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        v.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        v.speaker.name.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });

    if (sortBy === "rating") {
      list = [...list].sort((a, b) => b.rating.localeCompare(a.rating));
    } else if (sortBy === "newest") {
      list = [...list].sort((a, b) => (b.featured ? 1 : -1));
    }

    return list;
  }, [activeCategory, searchQuery, sortBy]);

  const spotlightVideo = featuredVideosData[0];

  return (
    <div className="vg-page-wrapper">
      {/* Dynamic Motion & Ambient Hero Banner */}
      <VideoGalleryHeaderHero
        spotlightVideo={spotlightVideo}
        onSpotlightClick={(v) => setActiveModalVideo(v)}
      />

      {/* Main Overlapping Ivory Container */}
      <div className="vg-main-panel">
        <div className="vg-main-container">
          {/* Glassmorphism Category Filters, Live Search & Sort Bar */}
          <VideoCategoryFilters
            activeCategory={activeCategory}
            onSelectCategory={setActiveCategory}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            sortBy={sortBy}
            onSortChange={setSortBy}
          />

          {/* Featured Video Masterclasses */}
          <FeaturedVideosSection
            videos={filteredVideos}
            onPlayVideo={(video) => setActiveModalVideo(video)}
          />

          {/* Physician Video Podcasts & Roundtable Section */}
          <VideoPodcastSection
            onPlayVideo={(video) => setActiveModalVideo(video)}
          />

          {/* Curated Video Series Playlists */}
          <VideoPlaylistsSection
            onPlayVideo={(video) => setActiveModalVideo(video)}
          />

          {/* Patient Transformation Video Stories */}
          <PatientStoriesSection
            onPlayVideo={(video) => setActiveModalVideo(video)}
          />

          {/* Continue Watching Panel */}
          <ContinueWatchingSection
            items={continueWatchingData}
            onPlayVideo={(video) => setActiveModalVideo(video)}
          />
        </div>
      </div>

      {/* Deluxe Cinema Modal Player with Transcripts & Speed Controls */}
      <VideoModal
        video={activeModalVideo}
        onClose={() => setActiveModalVideo(null)}
        onSelectRelated={(v) => setActiveModalVideo(v)}
      />
    </div>
  );
}
