"use client";

import { useState, useMemo, useEffect } from "react";
import {
  continueWatchingData,
  featuredVideosData,
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
  const [videoList, setVideoList] = useState<VideoItem[]>(featuredVideosData);
  const [loading, setLoading] = useState<boolean>(true);
  const [activeCategory, setActiveCategory] = useState<VideoCategory>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sortBy, setSortBy] = useState<string>("popular");
  const [activeModalVideo, setActiveModalVideo] = useState<VideoItem | null>(null);

  useEffect(() => {
    async function loadVideos() {
      try {
        setLoading(true);
        const data = await getPublicVideos();
        if (Array.isArray(data) && data.length > 0) {
          const normalized: VideoItem[] = data.map((v: any, idx: number) => {
            let ytId = "";
            if (v.youtubeUrl) {
              const match = v.youtubeUrl.match(/(?:v=|\/embed\/|\/watch\?v=|\/shorts\/|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
              if (match) ytId = match[1];
            }
            return {
              id: v._id || v.id || `v-${idx}`,
              title: v.title || "Ayurvedic Video",
              category: (v.category as VideoCategory) || "All",
              duration: v.duration || "10 mins",
              rating: `${v.rating || 4.9} ★`,
              views: `${v.viewsCount || 1000} Views`,
              description: v.description || "",
              thumbnail: getImageDisplayUrl(v.thumbnailUrl || v.thumbnail),
              youtubeId: ytId || "dQw4w9WgXcQ",
              level: v.level || "Masterclass",
              speaker: {
                name: typeof v.speaker === 'object' ? (v.speaker.name || "Dr. Susrutha Team") : (v.speaker || "Dr. Susrutha Team"),
                role: typeof v.speaker === 'object' ? (v.speaker.role || v.speaker.title || "Ayurvedic Physician") : "Ayurvedic Physician",
                avatar: getImageDisplayUrl(typeof v.speaker === 'object' ? v.speaker.avatar : null),
                verified: true,
              },
              transcript: v.transcript || "",
              featured: v.isFeatured || false,
            };
          });
          setVideoList(normalized);
        } else {
          setVideoList(featuredVideosData);
        }
      } catch (err) {
        console.error("Failed to load live videos:", err);
        setVideoList(featuredVideosData);
      } finally {
        setLoading(false);
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

  const spotlightVideo = videoList[0] || null;

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
