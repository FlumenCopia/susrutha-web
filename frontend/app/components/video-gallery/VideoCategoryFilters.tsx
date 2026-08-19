"use client";

import { useRef } from "react";
import { X } from "lucide-react";
type VideoCategoryFiltersProps = {
  activeCategory: string;
  onSelectCategory: (category: string) => void;
  categories?: string[];
  searchQuery: string;
  onSearchChange: (query: string) => void;
  sortBy: string;
  onSortChange: (sort: string) => void;
  categoryCounts?: Record<string, number>;
};

export function VideoCategoryFilters({
  activeCategory,
  onSelectCategory,
  categories = ["All"],
  searchQuery,
  onSearchChange,
  sortBy,
  onSortChange,
  categoryCounts = {},
}: VideoCategoryFiltersProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const scrollLeftRef = useRef(0);

  const filterTabs = categories.length > 0 ? categories : ["All"];

  const getCategoryCount = (category: string) => {
    return categoryCounts[category] ?? 0;
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!trackRef.current) return;
    isDraggingRef.current = true;
    startXRef.current = e.pageX - trackRef.current.offsetLeft;
    scrollLeftRef.current = trackRef.current.scrollLeft;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDraggingRef.current || !trackRef.current) return;
    e.preventDefault();
    const x = e.pageX - trackRef.current.offsetLeft;
    const walk = (x - startXRef.current) * 1.5;
    trackRef.current.scrollLeft = scrollLeftRef.current - walk;
  };

  const handleMouseUpOrLeave = () => {
    isDraggingRef.current = false;
  };

  return (
    <div className="vg-filter-bar-wrapper">
      <div className="vg-filter-bar-deluxe">
        {/* Category Pills Track */}
        <div
          ref={trackRef}
          className="vg-filter-pills-track"
          role="tablist"
          aria-label="Video Categories"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUpOrLeave}
          onMouseLeave={handleMouseUpOrLeave}
        >
          {filterTabs.map((cat) => {
            const isActive = activeCategory === cat;
            const count = getCategoryCount(cat);
            return (
              <button
                key={cat}
                type="button"
                role="tab"
                aria-selected={isActive}
                className={`vg-filter-pill-deluxe ${isActive ? "active" : ""}`}
                onClick={() => onSelectCategory(cat)}
              >
                <span>{cat}</span>
                {count > 0 ? <span className="vg-pill-count">{count}</span> : null}
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
                <X size={13} />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
