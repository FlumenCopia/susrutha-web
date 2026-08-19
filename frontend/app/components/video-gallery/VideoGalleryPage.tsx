"use client";

import { useState, useMemo, useEffect } from "react";
import { FeaturedVideoCard, VideoItem } from "./FeaturedVideoCard";
import { VideoGalleryHeaderHero } from "./VideoGalleryHeaderHero";
import { VideoCategoryFilters } from "./VideoCategoryFilters";
import { FeaturedVideosSection } from "./FeaturedVideosSection";
import { VideoModal } from "./VideoModal";
import { getPublicVideos, getImageDisplayUrl } from "@/app/services/api";

export type VideoCategory = "All" | "Panchakarma" | "Clinical" | "Patient Stories" | "Wellness" | "Podcasts";

const defaultGalleryVideos: VideoItem[] = [
  {
    id: "def-pk-1",
    title: "Shirodhara Therapy: The Science of Neurological Calming",
    category: "Panchakarma",
    duration: "14 mins",
    rating: "4.9",
    views: "24.5k Views",
    description: "An in-depth physician demonstration of classical Shirodhara warm medicated herbal oil application on the forehead.",
    thumbnail: "/images/treatment-sirodhara.webp",
    youtubeId: "dQw4w9WgXcQ",
    level: "Masterclass",
    speaker: {
      name: "Dr. Sreeja Krishna S.",
      role: "Senior Vaidya & Panchakarma Specialist",
      avatar: "/images/doctor_sreeja.jpg",
      verified: true,
    },
    featured: true,
  },
  {
    id: "def-pk-2",
    title: "Abhyanga & Swedana: Deep Tissue Detoxification Protocols",
    category: "Panchakarma",
    duration: "18 mins",
    rating: "4.8",
    views: "19.2k Views",
    description: "Explore the step-by-step synchronization of whole-body herbal oil massage followed by steam chamber therapy.",
    thumbnail: "/images/treatment-panchakarma.webp",
    youtubeId: "dQw4w9WgXcQ",
    level: "Clinical Guide",
    speaker: {
      name: "Dr. Govind N.",
      role: "Chief Medical Officer",
      avatar: "/images/doctor_govind.jpg",
      verified: true,
    },
  },
  {
    id: "def-pk-3",
    title: "Njavarakizhi: Herbal Rice Bolus Therapy for Muscular Strength",
    category: "Panchakarma",
    duration: "12 mins",
    rating: "4.9",
    views: "15.8k Views",
    description: "Demonstration of medicated cooked rice poultice therapy for joint lubrication and muscle rejuvenation.",
    thumbnail: "/images/treatment-njavarakizhi.webp",
    youtubeId: "dQw4w9WgXcQ",
    level: "Therapy Insight",
    speaker: {
      name: "Dr. Lakshmi Prasad",
      role: "Ayurvedic Physician",
      avatar: "/images/doctor_lakshmi.jpg",
      verified: true,
    },
  },
  {
    id: "def-clin-1",
    title: "Spine & Disc Degeneration: Non-Surgical Ayurvedic Management",
    category: "Clinical",
    duration: "22 mins",
    rating: "5.0",
    views: "31.4k Views",
    description: "Clinical breakdown of Kati Vasti, spinal decompression herbs, and posture rehabilitation protocols.",
    thumbnail: "/images/treatment-kati-vasti.webp",
    youtubeId: "dQw4w9WgXcQ",
    level: "Clinical Case Study",
    speaker: {
      name: "Dr. Govind N.",
      role: "Chief Medical Officer",
      avatar: "/images/doctor_govind.jpg",
      verified: true,
    },
    featured: true,
  },
  {
    id: "def-clin-2",
    title: "Rheumatoid Arthritis & Joint Inflammation Pathways",
    category: "Clinical",
    duration: "16 mins",
    rating: "4.9",
    views: "21.0k Views",
    description: "Detailed Ayurvedic pathology of Ama accumulation and bio-cleansing therapies for chronic joint stiffness.",
    thumbnail: "/images/opt_panchakarma.jpg",
    youtubeId: "dQw4w9WgXcQ",
    level: "Physician Lecture",
    speaker: {
      name: "Dr. Sreeja Krishna S.",
      role: "Senior Vaidya",
      avatar: "/images/doctor_sreeja.jpg",
      verified: true,
    },
  },
  {
    id: "def-pat-1",
    title: "Overcoming 10 Years of Chronic Sciatica Pain: Raman's Story",
    category: "Patient Stories",
    duration: "9 mins",
    rating: "4.9",
    views: "42.1k Views",
    description: "A patient testimonial documenting mobility recovery after 21 days of inpatient Ayurvedic therapy at Susrutha.",
    thumbnail: "/images/kowdiar_gallery_01.webp",
    youtubeId: "dQw4w9WgXcQ",
    level: "Patient Journey",
    speaker: {
      name: "Care Team Susrutha",
      role: "Patient Care Coordinator",
      avatar: "/images/doctor_sreeja.jpg",
      verified: true,
    },
  },
  {
    id: "def-pat-2",
    title: "Complete Remission from Severe Psoriasis through Detox",
    category: "Patient Stories",
    duration: "11 mins",
    rating: "5.0",
    views: "38.7k Views",
    description: "Visual documentation of skin healing and lifestyle transformation through Virechana & Takradhara.",
    thumbnail: "/images/kowdiar_gallery_02.webp",
    youtubeId: "dQw4w9WgXcQ",
    level: "Transformation Story",
    speaker: {
      name: "Care Team Susrutha",
      role: "Patient Care Coordinator",
      avatar: "/images/doctor_govind.jpg",
      verified: true,
    },
  },
  {
    id: "def-well-1",
    title: "Dinacharya: Daily Ayurvedic Routines for Lifelong Vitality",
    category: "Wellness",
    duration: "15 mins",
    rating: "4.8",
    views: "27.3k Views",
    description: "Practical guide to morning oil pulling, tongue scraping, dry brushing, and circadian meal timing.",
    thumbnail: "/images/about-purpose-still-life.webp",
    youtubeId: "dQw4w9WgXcQ",
    level: "Wellness Workshop",
    speaker: {
      name: "Dr. Lakshmi Prasad",
      role: "Ayurvedic Physician",
      avatar: "/images/doctor_lakshmi.jpg",
      verified: true,
    },
  },
  {
    id: "def-well-2",
    title: "Sattvic Nutrition & Mindful Eating for Digestive Fire (Agni)",
    category: "Wellness",
    duration: "13 mins",
    rating: "4.9",
    views: "18.9k Views",
    description: "Learn how food combinations, seasonal herbs, and cooking oils influence digestion and mental clarity.",
    thumbnail: "/images/ayurveda-hospital-garden.webp",
    youtubeId: "dQw4w9WgXcQ",
    level: "Nutritional Masterclass",
    speaker: {
      name: "Dr. Sreeja Krishna S.",
      role: "Senior Vaidya",
      avatar: "/images/doctor_sreeja.jpg",
      verified: true,
    },
  },
  {
    id: "def-pod-1",
    title: "Ayurveda Roundtable: Integrating Ancient Medicine with Modern Diagnostics",
    category: "Podcasts",
    duration: "34 mins",
    rating: "5.0",
    views: "14.2k Views",
    description: "Panel discussion with leading Ayurvedic physicians on pulse diagnosis, blood biochemistry, and evidence-based care.",
    thumbnail: "/images/ayurveda-hero.webp",
    youtubeId: "dQw4w9WgXcQ",
    level: "Physician Podcast",
    speaker: {
      name: "Dr. Govind N. & Panel",
      role: "Chief Medical Officers",
      avatar: "/images/doctor_govind.jpg",
      verified: true,
    },
  },
  {
    id: "def-pod-2",
    title: "Healing Chronic Stress: The Mind-Body Vata Connection",
    category: "Podcasts",
    duration: "28 mins",
    rating: "4.9",
    views: "16.8k Views",
    description: "Episode 04 of Susrutha Wellness Talks discussing nervous system stabilization and adaptogenic herbs.",
    thumbnail: "/images/banner_calm_retreat.jpg",
    youtubeId: "dQw4w9WgXcQ",
    level: "Podcast Episode",
    speaker: {
      name: "Dr. Sreeja Krishna S.",
      role: "Senior Vaidya",
      avatar: "/images/doctor_sreeja.jpg",
      verified: true,
    },
  },
];

export function VideoGalleryPage() {
  const [videoList, setVideoList] = useState<VideoItem[]>(defaultGalleryVideos);
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
              category: v.category || "All",
              duration: v.duration || "10 mins",
              rating: `${v.rating || 4.9}`,
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
              isBackendData: true,
            };
          });
          setVideoList(normalized.length > 0 ? normalized : defaultGalleryVideos);
        } else {
          setVideoList(defaultGalleryVideos);
        }
      } catch (err) {
        console.error("Failed to load live videos:", err);
        setVideoList(defaultGalleryVideos);
      } finally {
        setLoading(false);
      }
    }
    loadVideos();
  }, []);

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {
      All: videoList.length,
      Panchakarma: 0,
      Clinical: 0,
      "Patient Stories": 0,
      Wellness: 0,
      Podcasts: 0,
    };

    videoList.forEach((v) => {
      const cat = (v.category || "").toLowerCase();
      if (cat.includes("panchakarma")) counts["Panchakarma"]++;
      else if (cat.includes("clinical")) counts["Clinical"]++;
      else if (cat.includes("patient") || cat.includes("story") || cat.includes("testimonial")) counts["Patient Stories"]++;
      else if (cat.includes("wellness") || cat.includes("lifestyle") || cat.includes("nutrition")) counts["Wellness"]++;
      else if (cat.includes("podcast") || cat.includes("roundtable") || cat.includes("talk")) counts["Podcasts"]++;
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
        (activeCategory === "Patient Stories" && (vCat.includes("patient") || vCat.includes("story") || vCat.includes("testimonial"))) ||
        (activeCategory === "Podcasts" && (vCat.includes("podcast") || vCat.includes("roundtable") || vCat.includes("talk"))) ||
        (activeCategory === "Wellness" && (vCat.includes("wellness") || vCat.includes("lifestyle") || vCat.includes("nutrition"))) ||
        (activeCategory === "Panchakarma" && vCat.includes("panchakarma")) ||
        (activeCategory === "Clinical" && vCat.includes("clinical"));

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
