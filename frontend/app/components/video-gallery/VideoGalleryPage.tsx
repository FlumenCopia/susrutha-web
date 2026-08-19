"use client";

import { useState, useMemo, useEffect } from "react";
import { FeaturedVideoCard, VideoItem } from "./FeaturedVideoCard";
import { VideoGalleryHeaderHero } from "./VideoGalleryHeaderHero";
import { VideoCategoryFilters } from "./VideoCategoryFilters";
import { FeaturedVideosSection } from "./FeaturedVideosSection";
import { VideoModal } from "./VideoModal";
import { getPublicVideos, getImageDisplayUrl } from "@/app/services/api";

export type VideoCategory = "All" | "Images" | "Videos" | "Podcasts";

export function VideoGalleryPage() {
  const [videoList, setVideoList] = useState<VideoItem[]>([]);
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

            const rawCat = (v.category || "").toString().toLowerCase();
            let categoryName = "Videos";
            if (rawCat.includes("image") || rawCat.includes("gallery") || rawCat.includes("tour") || rawCat.includes("photo") || v.type === "gallery" || v.type === "image") {
              categoryName = "Images";
            } else if (rawCat.includes("podcast") || rawCat.includes("roundtable") || rawCat.includes("talk") || v.type === "podcast") {
              categoryName = "Podcasts";
            } else {
              categoryName = "Videos";
            }

            return {
              id: v._id || v.id || `v-${idx}`,
              title: v.title || v.name || "",
              category: categoryName,
              duration: v.duration || "",
              rating: v.rating ? `${v.rating}★` : "",
              views: v.viewsCount ? `${v.viewsCount} Views` : (v.views ? `${v.views}` : ""),
              description: v.description || v.summary || "",
              thumbnail: getImageDisplayUrl(v.thumbnailUrl || v.thumbnail || v.coverImage || v.image),
              youtubeId: ytId || "",
              level: v.level || "",
              speaker: {
                name: typeof v.speaker === 'object' ? (v.speaker?.name || "") : (v.speaker || ""),
                role: typeof v.speaker === 'object' ? (v.speaker?.role || v.speaker?.title || "") : "",
                avatar: getImageDisplayUrl(typeof v.speaker === 'object' ? v.speaker?.avatar : null),
                verified: Boolean(v.speaker?.verified ?? v.speaker),
              },
              transcript: v.transcript || "",
              featured: Boolean(v.isFeatured),
              isBackendData: true,
            };
          });
          setVideoList(normalized);
        } else {
          setVideoList([]);
        }
      } catch (err) {
        console.error("Failed to load live videos:", err);
        setVideoList([]);
      } finally {
        setLoading(false);
      }
    }
    loadVideos();
  }, []);

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {
      All: videoList.length,
      Images: 0,
      Videos: 0,
      Podcasts: 0,
    };

    videoList.forEach((v) => {
      const cat = (v.category || "").toLowerCase();
      if (cat.includes("image") || cat.includes("gallery") || cat.includes("tour") || cat.includes("campus") || cat.includes("facility")) {
        counts["Images"]++;
      } else if (cat.includes("podcast") || cat.includes("roundtable") || cat.includes("talk")) {
        counts["Podcasts"]++;
      } else {
        counts["Videos"]++;
      }
    });

    return counts;
  }, [videoList]);

  const filteredVideos = useMemo(() => {
    let list = videoList.filter((v) => {
      const vCat = (v.category || "").toLowerCase().trim();
      const aCat = activeCategory.toLowerCase().trim();

      const matchesCategory =
        activeCategory === "All" ||
        vCat === aCat ||
        (activeCategory === "Images" && (vCat.includes("image") || vCat.includes("gallery") || vCat.includes("tour") || vCat.includes("campus") || vCat.includes("facility"))) ||
        (activeCategory === "Podcasts" && (vCat.includes("podcast") || vCat.includes("roundtable") || vCat.includes("talk"))) ||
        (activeCategory === "Videos" && (!vCat.includes("image") && !vCat.includes("gallery") && !vCat.includes("podcast") && !vCat.includes("roundtable") && !vCat.includes("talk")));

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
            categoryCounts={categoryCounts}
          />

          {/* Single Dynamic Video Gallery Section Filtered by Tabs */}
          <FeaturedVideosSection
            videos={filteredVideos}
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
