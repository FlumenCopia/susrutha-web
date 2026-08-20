"use client";

import React, { useState, useEffect, useMemo } from "react";
import { Search } from "lucide-react";
import "./doctors.css";
import { DoctorCard, type DoctorItem } from "./DoctorCard";
import { DoctorsHero } from "./DoctorsHero";
import { DoctorsDepartmentGrid } from "./DoctorsDepartmentGrid";
import { DynamicDepartment } from "./DoctorsDepartmentGrid";
import { DoctorsFilterBar } from "./DoctorsFilterBar";
import { DynamicBranch } from "./DoctorsFilterBar";
import { DoctorQuickViewModal } from "./DoctorQuickViewModal";
import { DoctorMatchAssistant } from "./DoctorMatchAssistant";
import { DoctorsStatsBanner } from "./DoctorsStatsBanner";
import { DoctorsCTA } from "./DoctorsCTA";
import { getPublicDoctors, getPublicDepartments, getPublicBranches, getImageDisplayUrl } from "@/app/services/api";

export function DoctorsPage() {
  const [doctorsList, setDoctorsList] = useState<DoctorItem[]>([]);
  const [departments, setDepartments] = useState<DynamicDepartment[]>([]);
  const [branches, setBranches] = useState<DynamicBranch[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadAllData() {
      setLoading(true);
      try {
        const [rawDocs, rawDepts, rawBranches] = await Promise.all([
          getPublicDoctors(),
          getPublicDepartments(),
          getPublicBranches(),
        ]);

        // 1. Normalize Doctors from backend (filter out test records)
        const cleanDocs = Array.isArray(rawDocs)
          ? rawDocs.filter((d: any) => !d.name?.includes('Test') && !d.name?.match(/\d{5,}/))
          : [];
        const sourceDocs = cleanDocs.length > 0 ? cleanDocs : (Array.isArray(rawDocs) ? rawDocs : []);

        const normalizedDocs: DoctorItem[] = sourceDocs.map((d: any) => {
          const rawDept = d.departmentId;
          const deptName = typeof rawDept === "object" && rawDept ? rawDept.title : typeof rawDept === "string" ? rawDept : "General Medicine";
          const deptId = typeof rawDept === "object" && rawDept ? rawDept.slug || rawDept._id : typeof rawDept === "string" ? rawDept : "general";

          return {
            id: d._id,
            slug: d.slug,
            name: d.name,
            title: d.name,
            designation: d.designation || "Consultant Physician",
            qualification: d.qualifications || d.qualification || "BAMS",
            departmentId: deptId,
            departmentName: deptName,
            experienceYears: d.experienceYears || 0,
            experienceText: d.experienceYears ? `${d.experienceYears}+ Years` : "",
            patientsCount: "",
            rating: d.rating || 5.0,
            reviewsCount: d.reviewCount || 0,
            image: getImageDisplayUrl(d.photo || d.photoUrl || d.image),
            location: (() => {
              if (!d.assignedBranchIds || !Array.isArray(d.assignedBranchIds) || d.assignedBranchIds.length === 0) {
                return "Kattakada & Kowdiar";
              }
              const names = d.assignedBranchIds.map((b: any) => {
                if (!b) return "";
                if (typeof b === "string") return b;
                if (b.shortName) return b.shortName;
                if (b.address?.city) return b.address.city;
                if (b.city) return b.city;
                if (b.code) return b.code;
                if (b.name) {
                  let clean = b.name
                    .replace(/Susrutha Institute of Ayurvedic Sciences \(Research\) and Panchakarma Hospital/i, "Kattakada Hospital")
                    .replace(/Susrutha Panchakarma Hospital OP Outlet/i, "Kowdiar Clinic")
                    .replace(/Susrutha\s+/gi, "")
                    .replace(/\(.*?\)/g, "")
                    .trim();
                  return clean.length > 20 ? clean.slice(0, 20) : clean;
                }
                return "Main Campus";
              }).filter(Boolean);
              return names.slice(0, 2).join(" & ") || "Kattakada & Kowdiar";
            })(),
            branchIds: d.assignedBranchIds
              ? d.assignedBranchIds.map((b: any) => (typeof b === "string" ? b : b.code || b._id || "").toLowerCase())
              : ["kattakada"],
            availableDays: d.availability ? d.availability.flatMap((a: any) => a.days || []) : [],
            languages: d.languagesSpoken || ["English", "Malayalam"],
            consultationModes: ["in-person"] as ("in-person" | "video")[],
            focusAreas: d.specialties || [],
            credentials: d.qualifications ? [d.qualifications, d.registrationNumber ? `Reg No: ${d.registrationNumber}` : ''].filter(Boolean) : [],
            quote: d.quote || "",
            bio: d.bio || "",
            isFounder: d.isDirector || false,
            isPopular: d.isFeatured || false,
            isAvailableToday: true,
            isBackendData: true,
          };
        });

        setDoctorsList(normalizedDocs);

        // 2. Normalize Departments from backend & calculate assigned doctor count
        if (Array.isArray(rawDepts) && rawDepts.length > 0) {
          const deptsWithCounts: DynamicDepartment[] = rawDepts
            .map((d: any) => {
              const id = d.slug || d.code?.toLowerCase() || d._id;
              const name = d.title || d.name || "Specialty Department";
              const rawId = d._id?.toString?.() || "";

              // Count doctors assigned to this department
              const doctorCount = normalizedDocs.filter(
                (doc) =>
                  doc.departmentId === id ||
                  doc.departmentId === d.slug ||
                  doc.departmentId === rawId ||
                  doc.departmentName.toLowerCase().trim() === name.toLowerCase().trim()
              ).length;

              return {
                id,
                name,
                icon: d.icon || d.slug || id,
                description: d.tagline || d.overview || d.description || "Specialized Ayurvedic Treatment",
                doctorCount,
              };
            })
            // Only keep departments that have assigned doctors
            .filter((dept) => dept.doctorCount > 0);

          setDepartments([
            {
              id: "all",
              name: "All Departments",
              icon: "all",
              description: "View all specialized medical departments",
              doctorCount: normalizedDocs.length,
            },
            ...deptsWithCounts,
          ]);
        }

        // 3. Normalize Branches from backend
        if (Array.isArray(rawBranches) && rawBranches.length > 0) {
          const bList: DynamicBranch[] = rawBranches.map((b: any) => ({
            id: (b.code || b.slug || b._id || "").toLowerCase(),
            name: b.name,
            shortName: b.city || b.name,
          }));
          setBranches([
            { id: "all", name: "All Branches", shortName: "All Locations" },
            ...bList,
          ]);
        }
      } catch (err) {
        console.error("Failed to load doctor page data:", err);
      } finally {
        setLoading(false);
      }
    }

    loadAllData();
  }, []);

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
    return doctorsList
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
        if (selectedDeptId !== "all") {
          const deptObj = departments.find((d) => d.id === selectedDeptId);
          const deptName = deptObj?.name?.toLowerCase().trim();
          const matchesId = doc.departmentId === selectedDeptId;
          const matchesName = deptName && doc.departmentName.toLowerCase().trim() === deptName;
          if (!matchesId && !matchesName) {
            return false;
          }
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
  }, [doctorsList, departments, searchQuery, selectedDeptId, selectedBranchId, selectedMode, quickFilter, sortBy]);

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
        departments={departments}
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
        totalCount={doctorsList.length}
        activeFilterCount={activeFilterCount}
        onClearAllFilters={handleClearAll}
        departments={departments}
        branches={branches}
      />

      {/* 4. Doctors Listing (Grid or List View) */}
      <main className="doctors-list-section">
        {loading ? (
          <div className="doctors-empty-state" style={{ padding: "60px 20px" }}>
            <span className="apt-doctor-loading-spinner" style={{ width: "36px", height: "36px", margin: "0 auto 16px auto" }} />
            <h3 className="doctors-empty-title">Loading Vaidyas & Specialists…</h3>
            <p className="doctors-empty-desc">Fetching real-time clinical doctors from backend database.</p>
          </div>
        ) : filteredDoctors.length > 0 ? (
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
            <div className="doctors-empty-icon"><Search size={32} strokeWidth={1.5} /></div>
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
