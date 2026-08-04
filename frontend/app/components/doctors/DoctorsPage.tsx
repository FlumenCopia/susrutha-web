"use client";

import React, { useState, useMemo } from "react";
import "./doctors.css";
import { doctorsData, DoctorItem } from "./doctorsData";
import { DoctorsHero } from "./DoctorsHero";
import { DoctorsDepartmentGrid } from "./DoctorsDepartmentGrid";
import { DoctorsFilterBar } from "./DoctorsFilterBar";
import { DoctorCard } from "./DoctorCard";
import { DoctorQuickViewModal } from "./DoctorQuickViewModal";
import { DoctorMatchAssistant } from "./DoctorMatchAssistant";
import { DoctorsStatsBanner } from "./DoctorsStatsBanner";
import { DoctorsCTA } from "./DoctorsCTA";

export function DoctorsPage() {
  // Filter and view states
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDeptId, setSelectedDeptId] = useState("all");
  const [selectedBranchId, setSelectedBranchId] = useState("all");
  const [selectedMode, setSelectedMode] = useState("all");
  const [sortBy, setSortBy] = useState("rating");
  const [quickFilter, setQuickFilter] = useState("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  // Modal quick view state
  const [quickViewDoctor, setQuickViewDoctor] = useState<DoctorItem | null>(null);

  // Compute active filter count
  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (selectedDeptId !== "all") count++;
    if (selectedBranchId !== "all") count++;
    if (selectedMode !== "all") count++;
    if (quickFilter !== "all") count++;
    if (searchQuery.trim() !== "") count++;
    return count;
  }, [selectedDeptId, selectedBranchId, selectedMode, quickFilter, searchQuery]);

  // Handle Tag click from Hero
  const handleTagClick = (tag: string) => {
    setSearchQuery(tag);
    // Scroll smoothly to filter section
    const el = document.querySelector(".doctors-filter-section");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Clear all filters
  const handleClearAll = () => {
    setSearchQuery("");
    setSelectedDeptId("all");
    setSelectedBranchId("all");
    setSelectedMode("all");
    setQuickFilter("all");
    setSortBy("rating");
  };

  // Filtered & Sorted Doctors List
  const filteredDoctors = useMemo(() => {
    return doctorsData
      .filter((doc) => {
        // Text Search
        if (searchQuery.trim() !== "") {
          const q = searchQuery.toLowerCase();
          const matchesName = doc.name.toLowerCase().includes(q);
          const matchesTitle = doc.title.toLowerCase().includes(q);
          const matchesQual = doc.qualification.toLowerCase().includes(q);
          const matchesDept = doc.departmentName.toLowerCase().includes(q);
          const matchesFocus = doc.focusAreas.some((f) => f.toLowerCase().includes(q));
          const matchesCred = doc.credentials.some((c) => c.toLowerCase().includes(q));
          if (!matchesName && !matchesTitle && !matchesQual && !matchesDept && !matchesFocus && !matchesCred) {
            return false;
          }
        }

        // Department Filter
        if (selectedDeptId !== "all" && doc.departmentId !== selectedDeptId) {
          return false;
        }

        // Branch Location Filter
        if (selectedBranchId !== "all" && !doc.branchIds.includes(selectedBranchId)) {
          return false;
        }

        // Consultation Mode Filter
        if (selectedMode !== "all" && !doc.consultationModes.includes(selectedMode as "in-person" | "video")) {
          return false;
        }

        // Quick Filter Pills
        if (quickFilter === "today" && !doc.isAvailableToday) {
          return false;
        }
        if (quickFilter === "senior" && doc.experienceYears < 15) {
          return false;
        }
        if (quickFilter === "top-rated" && doc.rating < 4.9) {
          return false;
        }
        if (quickFilter === "founders" && !doc.isFounder) {
          return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === "rating") {
          return b.rating - a.rating || b.reviewsCount - a.reviewsCount;
        }
        if (sortBy === "experience") {
          return b.experienceYears - a.experienceYears;
        }
        if (sortBy === "name") {
          return a.name.localeCompare(b.name);
        }
        return 0;
      });
  }, [searchQuery, selectedDeptId, selectedBranchId, selectedMode, quickFilter, sortBy]);

  return (
    <div className="doctors-page-root">
      {/* 1. Hero Section */}
      <DoctorsHero
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onTagClick={handleTagClick}
      />

      {/* 2. Department Category Grid */}
      <DoctorsDepartmentGrid
        selectedDeptId={selectedDeptId}
        onSelectDepartment={setSelectedDeptId}
      />

      {/* 3. Sticky Filter Toolbar */}
      <DoctorsFilterBar
        selectedBranchId={selectedBranchId}
        onBranchChange={setSelectedBranchId}
        selectedDeptId={selectedDeptId}
        onDeptChange={setSelectedDeptId}
        selectedMode={selectedMode}
        onModeChange={setSelectedMode}
        sortBy={sortBy}
        onSortChange={setSortBy}
        quickFilter={quickFilter}
        onQuickFilterChange={setQuickFilter}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        resultCount={filteredDoctors.length}
        totalCount={doctorsData.length}
        activeFilterCount={activeFilterCount}
        onClearAllFilters={handleClearAll}
      />

      {/* 4. Doctors Listing (Grid or List View) */}
      <main className="doctors-list-section">
        {filteredDoctors.length > 0 ? (
          <div className={viewMode === "grid" ? "doctors-cards-grid" : "doctors-cards-list"}>
            {filteredDoctors.map((doctor) => (
              <DoctorCard
                key={doctor.id}
                doctor={doctor}
                viewMode={viewMode}
                onQuickView={setQuickViewDoctor}
              />
            ))}
          </div>
        ) : (
          /* Empty Search State */
          <div className="doctors-empty-state">
            <div className="doctors-empty-icon">🔍</div>
            <h3 className="doctors-empty-title">No Doctors Found</h3>
            <p className="doctors-empty-desc">
              We couldn’t find any physicians matching your selected filters or search terms. 
              Try resetting your filters to see all available specialists.
            </p>
            <button
              type="button"
              className="doctors-cta-btn"
              onClick={handleClearAll}
              style={{ background: "#d61f2b", color: "#ffffff", border: "none" }}
            >
              Reset All Filters
            </button>
          </div>
        )}
      </main>

      {/* 5. Doctor Match Assistant Recommendation Widget */}
      <DoctorMatchAssistant />

      {/* 6. Clinical Heritage & Trust Stats */}
      <DoctorsStatsBanner />

      {/* 7. Consultation Call-to-Action */}
      <DoctorsCTA />

      {/* 8. Quick View Modal Window */}
      <DoctorQuickViewModal
        doctor={quickViewDoctor}
        onClose={() => setQuickViewDoctor(null)}
      />
    </div>
  );
}
