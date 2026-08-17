"use client";

import { useRef, useState } from "react";

const mediaCategories = ["All", "Press Releases", "News Coverage", "Video Feature", "Events"];

type MediaCategoriesProps = {
  activeCategory?: string;
  onSelectCategory?: (category: string) => void;
};

export function MediaCategories({
  activeCategory = "All",
  onSelectCategory,
}: MediaCategoriesProps) {
  const [selected, setSelected] = useState(activeCategory);
  const trackRef = useRef<HTMLElement>(null);
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const scrollLeftRef = useRef(0);
  const dragDistanceRef = useRef(0);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!trackRef.current) return;
    isDraggingRef.current = true;
    dragDistanceRef.current = 0;
    startXRef.current = e.pageX - trackRef.current.offsetLeft;
    scrollLeftRef.current = trackRef.current.scrollLeft;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDraggingRef.current || !trackRef.current) return;
    const x = e.pageX - trackRef.current.offsetLeft;
    const walk = (x - startXRef.current) * 1.5;
    dragDistanceRef.current = Math.abs(walk);
    if (dragDistanceRef.current > 5) {
      e.preventDefault();
      trackRef.current.scrollLeft = scrollLeftRef.current - walk;
    }
  };

  const handleMouseUpOrLeave = () => {
    isDraggingRef.current = false;
  };

  const handleClick = (e: React.MouseEvent, cat: string) => {
    if (dragDistanceRef.current > 5) {
      e.preventDefault();
      return;
    }
    setSelected(cat);
    if (onSelectCategory) {
      onSelectCategory(cat);
    }
  };

  const currentActive = onSelectCategory ? activeCategory : selected;

  return (
    <nav
      ref={trackRef}
      className="media-categories"
      aria-label="Media categories"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUpOrLeave}
      onMouseLeave={handleMouseUpOrLeave}
    >
      {mediaCategories.map((category) => {
        const isActive = currentActive === category;
        return (
          <a
            key={category}
            className={isActive ? "is-active" : undefined}
            href="#media-gallery"
            onClick={(e) => handleClick(e, category)}
          >
            {category}
          </a>
        );
      })}
    </nav>
  );
}
