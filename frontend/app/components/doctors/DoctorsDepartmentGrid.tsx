"use client";
import React from "react";

export type DynamicDepartment = {
  id: string;
  name: string;
  icon: string;
  doctorCount: number;
};

type DoctorsDepartmentGridProps = {
  selectedDeptId: string;
  onSelectDepartment: (deptId: string) => void;
  departments: DynamicDepartment[];
};

const FALLBACK_ICON_MAP: Record<string, string> = {
  all: "fa-solid fa-user-doctor",
  panchakarma: "fa-solid fa-spa",
  "spine-joints": "fa-solid fa-bone",
  "womens-health": "fa-solid fa-venus",
  "lifestyle-detox": "fa-solid fa-leaf",
  "skin-hair": "fa-solid fa-wand-magic-sparkles",
  kayachikitsa: "fa-solid fa-stethoscope",
  "preventive-medicine": "fa-solid fa-shield-heart",
  rheumatology: "fa-solid fa-person-running",
  neurology: "fa-solid fa-brain",
  "ent-eye": "fa-solid fa-eye",
};

export function DoctorsDepartmentGrid({
  selectedDeptId,
  onSelectDepartment,
  departments,
}: DoctorsDepartmentGridProps) {
  const getIconClass = (dept: DynamicDepartment) => {
    if (dept.icon && dept.icon.startsWith("fa-")) {
      return dept.icon;
    }
    const slugKey = (dept.id || "").toLowerCase();
    return FALLBACK_ICON_MAP[slugKey] || "fa-solid fa-hospital-user";
  };

  return (
    <section className="doctors-dept-section">
      <div className="doctors-dept-head">
        <h2 className="doctors-dept-title">Browse Doctors by Department</h2>
        <p className="doctors-dept-sub">
          Select a clinical specialty to view dedicated Vaidyas and treatment consultants
        </p>
      </div>

      <div className="doctors-dept-grid">
        {departments.map((dept: DynamicDepartment) => {
          const isActive = selectedDeptId === dept.id;
          const iconClass = getIconClass(dept);

          return (
            <div
              key={dept.id}
              className={`doctors-dept-card ${isActive ? "active" : ""}`}
              onClick={() => onSelectDepartment(dept.id)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") onSelectDepartment(dept.id);
              }}
            >
              <div className="doctors-dept-icon-box">
                <i className={iconClass} aria-hidden="true" />
              </div>
              <div className="doctors-dept-name">{dept.name}</div>
              <div className="doctors-dept-count">
                {dept.id === "all"
                  ? `${dept.doctorCount} Doctors Available`
                  : `${dept.doctorCount} Specialist${dept.doctorCount !== 1 ? "s" : ""}`}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
