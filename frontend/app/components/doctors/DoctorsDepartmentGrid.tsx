"use client";
import React from "react";
import {
  UserCheck,
  Flower2,
  Stethoscope,
  Activity,
  Brain,
  ShieldCheck,
  Heart,
  Flame,
  Sparkles,
  Leaf,
  Eye,
  Hospital,
  LucideIcon,
} from "lucide-react";
import { DataLayerRibbon } from "../common/DataLayerRibbon";

export type DynamicDepartment = {
  id: string;
  name: string;
  icon: string;
  doctorCount: number;
  description?: string;
};

type DoctorsDepartmentGridProps = {
  selectedDeptId: string;
  onSelectDepartment: (deptId: string) => void;
  departments: DynamicDepartment[];
};

const DEPT_ICON_MAP: Record<string, LucideIcon> = {
  all: UserCheck,
  "panchakarma-bio-purification": Flower2,
  "kayachikitsa-internal-medicine": Stethoscope,
  "neck-back-joint-problems": Activity,
  "stroke-neurological-rehabilitation": Brain,
  "preventive-medicine-rejuvenation": ShieldCheck,
  "prasooti-tantra-stree-roga": Heart,
  "rheumatology-autoimmune-care": Flame,
  "susrutha-proctology-unit": ShieldCheck,
  "skin-hair-care": Sparkles,
  panchakarma: Flower2,
  "spine-joints": Activity,
  "womens-health": Heart,
  "lifestyle-detox": Leaf,
  "skin-hair": Sparkles,
  kayachikitsa: Stethoscope,
  "preventive-medicine": ShieldCheck,
  rheumatology: Flame,
  neurology: Brain,
  "ent-eye": Eye,
};

export function DoctorsDepartmentGrid({
  selectedDeptId,
  onSelectDepartment,
  departments,
}: DoctorsDepartmentGridProps) {
  const getDeptIcon = (dept: DynamicDepartment): LucideIcon => {
    const slugKey = (dept.id || "").toLowerCase();
    return DEPT_ICON_MAP[slugKey] || Hospital;
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
          const IconComponent = getDeptIcon(dept);

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
                <IconComponent size={22} strokeWidth={1.75} aria-hidden="true" />
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
