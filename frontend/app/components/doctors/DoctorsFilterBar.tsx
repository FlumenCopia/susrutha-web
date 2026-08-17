import React from "react";
import { DynamicDepartment } from "./DoctorsDepartmentGrid";

export type DynamicBranch = {
  id: string;
  name: string;
  shortName?: string;
};

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
  departments: DynamicDepartment[];
  branches: DynamicBranch[];
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
  departments,
  branches,
}: DoctorsFilterBarProps) {
  const isDeptActive = selectedDeptId !== "all";
  const isBranchActive = selectedBranchId !== "all";
  const isModeActive = selectedMode !== "all";
  const isSortActive = sortBy !== "rating";

  return (
    <div className="doctors-filter-section">
      <div className="doctors-filter-container">
        {/* Main Controls Row */}
        <div className="doctors-filter-row">
          <div className="doctors-filter-controls">
            {/* Department Dropdown */}
            <div className={`doctors-filter-select-wrap ${isDeptActive ? "is-active" : ""}`}>
              <i className="fa-solid fa-stethoscope doctors-filter-icon" />
              <select
                className="doctors-filter-select"
                value={selectedDeptId}
                onChange={(e) => onDeptChange(e.target.value)}
                aria-label="Filter by Department"
              >
                {departments.map((dept) => (
                  <option key={dept.id} value={dept.id}>
                    {dept.name}
                  </option>
                ))}
              </select>
              <i className="fa-solid fa-chevron-down doctors-filter-select-arrow" />
            </div>

            {/* Branch Location Dropdown */}
            <div className={`doctors-filter-select-wrap ${isBranchActive ? "is-active" : ""}`}>
              <i className="fa-solid fa-location-dot doctors-filter-icon" />
              <select
                className="doctors-filter-select"
                value={selectedBranchId}
                onChange={(e) => onBranchChange(e.target.value)}
                aria-label="Filter by Location"
              >
                {branches.map((branch) => (
                  <option key={branch.id} value={branch.id}>
                    {branch.name}
                  </option>
                ))}
              </select>
              <i className="fa-solid fa-chevron-down doctors-filter-select-arrow" />
            </div>

            {/* Consultation Mode Selector */}
            <div className={`doctors-filter-select-wrap ${isModeActive ? "is-active" : ""}`}>
              <i className="fa-solid fa-video doctors-filter-icon" />
              <select
                className="doctors-filter-select"
                value={selectedMode}
                onChange={(e) => onModeChange(e.target.value)}
                aria-label="Filter by Consultation Mode"
              >
                <option value="all">All Consultation Modes</option>
                <option value="in-person">In-Person Hospital Visit</option>
              </select>
              <i className="fa-solid fa-chevron-down doctors-filter-select-arrow" />
            </div>

            {/* Sort Dropdown */}
            <div className={`doctors-filter-select-wrap ${isSortActive ? "is-active" : ""}`}>
              <i className="fa-solid fa-arrow-down-short-wide doctors-filter-icon" />
              <select
                className="doctors-filter-select"
                value={sortBy}
                onChange={(e) => onSortChange(e.target.value)}
                aria-label="Sort Doctors"
              >
                <option value="rating">Sort: Highest Rated</option>
                <option value="experience">Sort: Most Experienced</option>
                <option value="name">Sort: Name (A-Z)</option>
              </select>
              <i className="fa-solid fa-chevron-down doctors-filter-select-arrow" />
            </div>
          </div>

          {/* Right Side: Result Count & Grid/List View Switcher */}
          <div className="doctors-filter-right">
            <div className="doctors-result-count-badge">
              <span className="doctors-result-dot" />
              <span className="doctors-result-count">
                Showing <strong>{resultCount}</strong> of {totalCount} Doctors
              </span>
            </div>

            <div className="doctors-view-toggle">
              <button
                type="button"
                className={`doctors-view-btn ${viewMode === "grid" ? "active" : ""}`}
                onClick={() => onViewModeChange("grid")}
                title="Grid View"
                aria-label="Grid View"
              >
                <i className="fa-solid fa-border-all" /> <span>Grid</span>
              </button>
              <button
                type="button"
                className={`doctors-view-btn ${viewMode === "list" ? "active" : ""}`}
                onClick={() => onViewModeChange("list")}
                title="List View"
                aria-label="List View"
              >
                <i className="fa-solid fa-list" /> <span>List</span>
              </button>
            </div>
          </div>
        </div>

        {/* Quick Filter Pills Row */}
        <div className="doctors-filter-pills-wrap">
          <div className="doctors-filter-pills">
            <button
              type="button"
              className={`doctors-pill-btn ${quickFilter === "all" ? "active" : ""}`}
              onClick={() => onQuickFilterChange("all")}
            >
              <i className="fa-solid fa-user-doctor" /> All Doctors
            </button>
            <button
              type="button"
              className={`doctors-pill-btn ${quickFilter === "today" ? "active" : ""}`}
              onClick={() => onQuickFilterChange(quickFilter === "today" ? "all" : "today")}
            >
              <i className="fa-solid fa-bolt" /> Available Today
            </button>
            <button
              type="button"
              className={`doctors-pill-btn ${quickFilter === "senior" ? "active" : ""}`}
              onClick={() => onQuickFilterChange(quickFilter === "senior" ? "all" : "senior")}
            >
              <i className="fa-solid fa-crown" /> Senior Vaidyas (15+ Yrs)
            </button>
            <button
              type="button"
              className={`doctors-pill-btn ${quickFilter === "top-rated" ? "active" : ""}`}
              onClick={() => onQuickFilterChange(quickFilter === "top-rated" ? "all" : "top-rated")}
            >
              <i className="fa-solid fa-star" /> Top Rated (4.9)
            </button>
            <button
              type="button"
              className={`doctors-pill-btn ${quickFilter === "founders" ? "active" : ""}`}
              onClick={() => onQuickFilterChange(quickFilter === "founders" ? "all" : "founders")}
            >
              <i className="fa-solid fa-trophy" /> Founder Physicians
            </button>
          </div>
        </div>

        {/* Active Filter Badges */}
        {activeFilterCount > 0 && (
          <div className="doctors-active-filters-row">
            <span className="doctors-active-label">
              <i className="fa-solid fa-filter" /> Active Filters ({activeFilterCount}):
            </span>
            {selectedDeptId !== "all" && (
              <span className="doctors-active-filter-tag">
                Dept: <strong>{departments.find((d) => d.id === selectedDeptId)?.name}</strong>
                <button
                  type="button"
                  className="doctors-active-filter-remove"
                  onClick={() => onDeptChange("all")}
                  aria-label="Remove Department Filter"
                >
                  <i className="fa-solid fa-xmark" />
                </button>
              </span>
            )}
            {selectedBranchId !== "all" && (
              <span className="doctors-active-filter-tag">
                Location: <strong>{branches.find((b) => b.id === selectedBranchId)?.name}</strong>
                <button
                  type="button"
                  className="doctors-active-filter-remove"
                  onClick={() => onBranchChange("all")}
                  aria-label="Remove Location Filter"
                >
                  <i className="fa-solid fa-xmark" />
                </button>
              </span>
            )}
            {selectedMode !== "all" && (
              <span className="doctors-active-filter-tag">
                Mode: <strong>{selectedMode === "in-person" ? "In-Person" : "Video"}</strong>
                <button
                  type="button"
                  className="doctors-active-filter-remove"
                  onClick={() => onModeChange("all")}
                  aria-label="Remove Mode Filter"
                >
                  <i className="fa-solid fa-xmark" />
                </button>
              </span>
            )}
            {quickFilter !== "all" && (
              <span className="doctors-active-filter-tag">
                Filter: <strong>{quickFilter}</strong>
                <button
                  type="button"
                  className="doctors-active-filter-remove"
                  onClick={() => onQuickFilterChange("all")}
                  aria-label="Remove Quick Filter"
                >
                  <i className="fa-solid fa-xmark" />
                </button>
              </span>
            )}
            <button
              type="button"
              className="doctors-clear-all-btn"
              onClick={onClearAllFilters}
            >
              <i className="fa-solid fa-rotate-left" /> Reset All
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
