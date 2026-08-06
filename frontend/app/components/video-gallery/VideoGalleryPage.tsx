"use client";

import { useState, useMemo, useEffect } from "react";
import {
  featuredVideosData as fallbackVideos,
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
import { getPublicVideos, getImageDisplayUrl } from "@/app/services/api";

export function VideoGalleryPage() {
  const [videoList, setVideoList] = useState<VideoItem[]>(fallbackVideos);
  const [activeCategory, setActiveCategory] = useState<VideoCategory>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sortBy, setSortBy] = useState<string>("popular");
  const [activeModalVideo, setActiveModalVideo] = useState<VideoItem | null>(null);

  useEffect(() => {
    async function loadVideos() {
      try {
        const data = await getPublicVideos();
        if (Array.isArray(data) && data.length > 0) {
          const normalized: VideoItem[] = data.map((v: any, idx: number) => {
            const fb = fallbackVideos[idx] || fallbackVideos[0];
            return {
              id: v._id || v.id || fb.id,
              title: v.title || fb.title,
              category: (v.category as VideoCategory) || fb.category,
              duration: v.duration || fb.duration,
              rating: "4.9 ★",
              views: "12K Views",
              description: v.description || fb.description,
              thumbnail: getImageDisplayUrl(v.thumbnailUrl || v.thumbnail || fb.thumbnail),
              youtubeId: v.youtubeUrl ? v.youtubeUrl.split('v=')[1] || fb.youtubeId : fb.youtubeId,
              level: fb.level || "Masterclass",
              speaker: fb.speaker,
              transcript: fb.transcript,
              featured: v.isFeatured || false,
            };
          });
          setVideoList(normalized);
        }
      } catch (err) {
        console.error("Failed to load live videos:", err);
      }
    }
    loadVideos();
  }, []);

  const filteredVideos = useMemo(() => {
    let list = videoList.filter((v) => {
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
  }, [activeCategory, searchQuery, sortBy, videoList]);

  const spotlightVideo = videoList[0] || fallbackVideos[0];

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
