"use client";

import { videoCategories, VideoCategory, featuredVideosData } from "./videoGalleryData";

type VideoCategoryFiltersProps = {
  activeCategory: VideoCategory;
  onSelectCategory: (category: VideoCategory) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  sortBy: string;
  onSortChange: (sort: string) => void;
};

const categoryIcons: Record<VideoCategory, string> = {
  All: "🌿",
  Panchakarma: "🌱",
  Abhyanga: "💆",
  Shirodhara: "💧",
  "Yoga & Wellness": "🧘",
  "Herbal Therapies": "🍵",
  "Diet & Nutrition": "🥗",
  Lifestyle: "✨",
};

export function VideoCategoryFilters({
  activeCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  sortBy,
  onSortChange,
}: VideoCategoryFiltersProps) {
  const getCategoryCount = (category: VideoCategory) => {
    if (category === "All") return featuredVideosData.length;
    return featuredVideosData.filter((v) => v.category === category).length;
  };

  return (
    <div className="vg-filter-bar-wrapper">
      <div className="vg-filter-bar-deluxe">
        {/* Category Pills Track */}
        <div className="vg-filter-pills-track" role="tablist" aria-label="Video Categories">
          {videoCategories.map((cat) => {
            const isActive = activeCategory === cat;
            const count = getCategoryCount(cat);
            const icon = categoryIcons[cat];
            return (
              <button
                key={cat}
                type="button"
                role="tab"
                aria-selected={isActive}
                className={`vg-filter-pill-deluxe ${isActive ? "active" : ""}`}
                onClick={() => onSelectCategory(cat)}
              >
                <span className="vg-cat-icon" aria-hidden="true">{icon}</span>
                <span>{cat}</span>
                <span className="vg-pill-count">{count}</span>
              </button>
            );
          })}
        </div>

        {/* Right Action Area: Live Search Input & Sort Dropdown */}
        <div className="vg-filter-controls-right">
          <div className="vg-sort-wrapper">
            <label htmlFor="vg-sort-select" className="sr-only">Sort Videos</label>
            <select
              id="vg-sort-select"
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value)}
              className="vg-sort-select"
            >
              <option value="popular">Sort: Most Popular</option>
              <option value="rating">Sort: Highest Rated</option>
              <option value="newest">Sort: Doctor&apos;s Pick</option>
            </select>
          </div>

          <div className="vg-filter-search-box">
            <svg className="vg-search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search title, doctor..."
              aria-label="Filter videos by search term"
              className="vg-search-input"
            />
            {searchQuery && (
              <button
                type="button"
                className="vg-search-clear-btn"
                onClick={() => onSearchChange("")}
                aria-label="Clear search query"
              >
                ✕
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
