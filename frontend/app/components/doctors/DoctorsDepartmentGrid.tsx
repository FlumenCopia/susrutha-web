import React from "react";
import { doctorDepartments, DoctorDepartment } from "./doctorsData";

type DoctorsDepartmentGridProps = {
  selectedDeptId: string;
  onSelectDepartment: (deptId: string) => void;
};

export function DoctorsDepartmentGrid({
  selectedDeptId,
  onSelectDepartment,
}: DoctorsDepartmentGridProps) {
  return (
    <section className="doctors-dept-section">
      <div className="doctors-dept-head">
        <h2 className="doctors-dept-title">Browse Doctors by Department</h2>
        <p className="doctors-dept-sub">
          Select a clinical specialty to view dedicated Vaidyas and treatment consultants
        </p>
      </div>

      <div className="doctors-dept-grid">
        {doctorDepartments.map((dept: DoctorDepartment) => {
          const isActive = selectedDeptId === dept.id;
          return (
            <div
              key={dept.id}
              className={`doctors-dept-card ${isActive ? "active" : ""}`}
              onClick={() => onSelectDepartment(dept.id)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  onSelectDepartment(dept.id);
                }
              }}
            >
              <div className="doctors-dept-icon">{dept.icon}</div>
              <div className="doctors-dept-name">{dept.name}</div>
              <div className="doctors-dept-count">
                {dept.id === "all"
                  ? `${dept.doctorCount} Doctors Available`
                  : `${dept.doctorCount} Specialist${dept.doctorCount > 1 ? "s" : ""}`}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
