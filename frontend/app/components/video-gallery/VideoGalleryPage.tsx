"use client";

import { useState, useMemo, useEffect } from "react";
import { FeaturedVideoCard, VideoItem } from "./FeaturedVideoCard";
import { VideoGalleryHeaderHero } from "./VideoGalleryHeaderHero";
import { VideoCategoryFilters } from "./VideoCategoryFilters";
import { FeaturedVideosSection } from "./FeaturedVideosSection";
import { VideoModal } from "./VideoModal";
import { getPublicVideos, getPublicGalleryAlbums, getImageDisplayUrl } from "@/app/services/api";

export type VideoCategory = "All" | "Images" | "Videos" | "Podcasts";

export function VideoGalleryPage() {
  const [videoList, setVideoList] = useState<VideoItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sortBy, setSortBy] = useState<string>("popular");
  const [activeModalVideo, setActiveModalVideo] = useState<VideoItem | null>(null);

  useEffect(() => {
    async function loadVideos() {
      try {
        setLoading(true);
        const [videosRes, galleryRes] = await Promise.allSettled([
          getPublicVideos(),
          getPublicGalleryAlbums(),
        ]);

        const combinedItems: VideoItem[] = [];

        // 1. Process Live Backend Videos
        if (videosRes.status === "fulfilled" && Array.isArray(videosRes.value)) {
          videosRes.value.forEach((v: any, idx: number) => {
            let ytId = "";
            if (v.youtubeUrl) {
              const match = v.youtubeUrl.match(/(?:v=|\/embed\/|\/watch\?v=|\/shorts\/|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
              if (match) ytId = match[1];
            }

            const rawCat = (v.category || "").toString().toLowerCase();
            let categoryName = "Videos";
            if (rawCat.includes("podcast") || rawCat.includes("roundtable") || rawCat.includes("talk") || v.type === "podcast") {
              categoryName = "Podcasts";
            } else if (v.type === "gallery" || v.type === "image" || (!v.youtubeUrl && (rawCat === "image" || rawCat === "images" || rawCat === "gallery"))) {
              categoryName = "Images";
            } else {
              categoryName = "Videos";
            }

            combinedItems.push({
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
            });
          });
        }

        // 2. Process Live Backend Gallery / Photo Albums
        if (galleryRes.status === "fulfilled" && Array.isArray(galleryRes.value)) {
          galleryRes.value.forEach((g: any, idx: number) => {
            combinedItems.push({
              id: g._id || g.id || `gal-${idx}`,
              title: g.title || g.name || "Gallery Album",
              category: "Images",
              duration: g.photos?.length ? `${g.photos.length} Photos` : "",
              rating: g.rating ? `${g.rating}★` : "",
              views: g.views ? `${g.views}` : "",
              description: g.description || g.summary || "",
              thumbnail: getImageDisplayUrl(g.coverImage || g.thumbnail || g.image || (g.photos && g.photos[0])),
              youtubeId: "",
              level: "",
              speaker: {
                name: typeof g.author === 'object' ? (g.author?.name || "") : (g.author || ""),
                role: "Photo Gallery",
                avatar: "",
                verified: false,
              },
              featured: Boolean(g.isFeatured),
              isBackendData: true,
            });
          });
        }

        setVideoList(combinedItems);
      } catch (err) {
        console.error("Failed to load live backend video/gallery data:", err);
        setVideoList([]);
      } finally {
        setLoading(false);
      }
    }
    loadVideos();
  }, []);

  const dynamicCategories = useMemo(() => {
    const uniqueCats = new Set<string>();
    videoList.forEach((v) => {
      if (v.category && v.category.trim() !== "") {
        uniqueCats.add(v.category);
      }
    });

    const list = Array.from(uniqueCats);
    return list.length > 0 ? ["All", ...list] : ["All"];
  }, [videoList]);

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {
      All: videoList.length,
    };

    videoList.forEach((v) => {
      const cat = v.category || "General";
      counts[cat] = (counts[cat] || 0) + 1;
    });

    return counts;
  }, [videoList]);

  const filteredVideos = useMemo(() => {
    let list = videoList.filter((v) => {
      const matchesCategory =
        activeCategory === "All" ||
        (v.category && v.category.toLowerCase().trim() === activeCategory.toLowerCase().trim());

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
          {/* Glassmorphism Dynamic Category Filters, Live Search & Sort Bar */}
          <VideoCategoryFilters
            activeCategory={activeCategory}
            onSelectCategory={setActiveCategory}
            categories={dynamicCategories}
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
