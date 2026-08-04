import React from "react";
import { doctorBranches, doctorDepartments } from "./doctorsData";

type DoctorsFilterBarProps = {
  selectedBranchId: string;
  onBranchChange: (branchId: string) => void;
  selectedDeptId: string;
  onDeptChange: (deptId: string) => void;
  selectedMode: string;
  onModeChange: (mode: string) => void;
  sortBy: string;
  onSortChange: (sort: string) => void;
  quickFilter: string;
  onQuickFilterChange: (filter: string) => void;
  viewMode: "grid" | "list";
  onViewModeChange: (mode: "grid" | "list") => void;
  resultCount: number;
  totalCount: number;
  activeFilterCount: number;
  onClearAllFilters: () => void;
};

export function DoctorsFilterBar({
  selectedBranchId,
  onBranchChange,
  selectedDeptId,
  onDeptChange,
  selectedMode,
  onModeChange,
  sortBy,
  onSortChange,
  quickFilter,
  onQuickFilterChange,
  viewMode,
  onViewModeChange,
  resultCount,
  totalCount,
  activeFilterCount,
  onClearAllFilters,
}: DoctorsFilterBarProps) {
  return (
    <div className="doctors-filter-section">
      <div className="doctors-filter-container">
        {/* Main Controls Row */}
        <div className="doctors-filter-row">
          <div className="doctors-filter-controls">
            {/* Department Dropdown */}
            <div className="doctors-filter-select-wrap">
              <select
                className="doctors-filter-select"
                value={selectedDeptId}
                onChange={(e) => onDeptChange(e.target.value)}
              >
                {doctorDepartments.map((dept) => (
                  <option key={dept.id} value={dept.id}>
                    {dept.name}
                  </option>
                ))}
              </select>
              <span className="doctors-filter-select-arrow">▼</span>
            </div>

            {/* Branch Location Dropdown */}
            <div className="doctors-filter-select-wrap">
              <select
                className="doctors-filter-select"
                value={selectedBranchId}
                onChange={(e) => onBranchChange(e.target.value)}
              >
                {doctorBranches.map((branch) => (
                  <option key={branch.id} value={branch.id}>
                    {branch.name}
                  </option>
                ))}
              </select>
              <span className="doctors-filter-select-arrow">▼</span>
            </div>

            {/* Consultation Mode Selector */}
            <div className="doctors-filter-select-wrap">
              <select
                className="doctors-filter-select"
                value={selectedMode}
                onChange={(e) => onModeChange(e.target.value)}
              >
                <option value="all">All Consultation Modes</option>
                <option value="in-person">🏥 In-Person Hospital Visit</option>
                <option value="video">💻 Tele-Video Consultation</option>
              </select>
              <span className="doctors-filter-select-arrow">▼</span>
            </div>

            {/* Sort Dropdown */}
            <div className="doctors-filter-select-wrap">
              <select
                className="doctors-filter-select"
                value={sortBy}
                onChange={(e) => onSortChange(e.target.value)}
              >
                <option value="rating">Sort: Highest Rated</option>
                <option value="experience">Sort: Most Experienced</option>
                <option value="name">Sort: Name (A-Z)</option>
              </select>
              <span className="doctors-filter-select-arrow">▼</span>
            </div>
          </div>

          {/* Right Side: Result Count & Grid/List View Switcher */}
          <div className="doctors-filter-right">
            <span className="doctors-result-count">
              Showing <strong>{resultCount}</strong> of {totalCount} Doctors
            </span>

            <div className="doctors-view-toggle">
              <button
                type="button"
                className={`doctors-view-btn ${viewMode === "grid" ? "active" : ""}`}
                onClick={() => onViewModeChange("grid")}
                title="Grid View"
                aria-label="Grid View"
              >
                ⊞ Grid
              </button>
              <button
                type="button"
                className={`doctors-view-btn ${viewMode === "list" ? "active" : ""}`}
                onClick={() => onViewModeChange("list")}
                title="List View"
                aria-label="List View"
              >
                ☰ List
              </button>
            </div>
          </div>
        </div>

        {/* Quick Filter Pills Row */}
        <div className="doctors-filter-pills">
          <button
            type="button"
            className={`doctors-pill-btn ${quickFilter === "all" ? "active" : ""}`}
            onClick={() => onQuickFilterChange("all")}
          >
            All Doctors
          </button>
          <button
            type="button"
            className={`doctors-pill-btn ${quickFilter === "today" ? "active" : ""}`}
            onClick={() => onQuickFilterChange(quickFilter === "today" ? "all" : "today")}
          >
            ⚡ Available Today
          </button>
          <button
            type="button"
            className={`doctors-pill-btn ${quickFilter === "senior" ? "active" : ""}`}
            onClick={() => onQuickFilterChange(quickFilter === "senior" ? "all" : "senior")}
          >
            👑 Senior Vaidyas (15+ Yrs)
          </button>
          <button
            type="button"
            className={`doctors-pill-btn ${quickFilter === "top-rated" ? "active" : ""}`}
            onClick={() => onQuickFilterChange(quickFilter === "top-rated" ? "all" : "top-rated")}
          >
            ⭐ Top Rated (4.9★)
          </button>
          <button
            type="button"
            className={`doctors-pill-btn ${quickFilter === "founders" ? "active" : ""}`}
            onClick={() => onQuickFilterChange(quickFilter === "founders" ? "all" : "founders")}
          >
            🏆 Founder Physicians
          </button>
        </div>

        {/* Active Filter Badges */}
        {activeFilterCount > 0 && (
          <div className="doctors-active-filters-row">
            <span style={{ fontWeight: 600, color: "#6a6c67" }}>Active Filters:</span>
            {selectedDeptId !== "all" && (
              <span className="doctors-active-filter-tag">
                Dept: {doctorDepartments.find((d) => d.id === selectedDeptId)?.name}
                <button
                  type="button"
                  className="doctors-active-filter-remove"
                  onClick={() => onDeptChange("all")}
                >
                  ✕
                </button>
              </span>
            )}
            {selectedBranchId !== "all" && (
              <span className="doctors-active-filter-tag">
                Location: {doctorBranches.find((b) => b.id === selectedBranchId)?.name}
                <button
                  type="button"
                  className="doctors-active-filter-remove"
                  onClick={() => onBranchChange("all")}
                >
                  ✕
                </button>
              </span>
            )}
            {selectedMode !== "all" && (
              <span className="doctors-active-filter-tag">
                Mode: {selectedMode === "in-person" ? "In-Person" : "Video"}
                <button
                  type="button"
                  className="doctors-active-filter-remove"
                  onClick={() => onModeChange("all")}
                >
                  ✕
                </button>
              </span>
            )}
            {quickFilter !== "all" && (
              <span className="doctors-active-filter-tag">
                Tag: {quickFilter}
                <button
                  type="button"
                  className="doctors-active-filter-remove"
                  onClick={() => onQuickFilterChange("all")}
                >
                  ✕
                </button>
              </span>
            )}
            <button
              type="button"
              className="doctors-clear-all-btn"
              onClick={onClearAllFilters}
            >
              Clear All
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
