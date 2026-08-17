import React from "react";
import Image from "next/image";
import Link from "next/link";
import { DataLayerRibbon } from "../common/DataLayerRibbon";

export type ConsultationMode = "in-person" | "video";

export type DoctorDepartment = {
  id: string;
  name: string;
  shortName: string;
  icon: string;
  description: string;
  doctorCount: number;
};

export type DoctorBranch = {
  id: string;
  name: string;
  shortName: string;
};

export type DoctorItem = {
  id: string;
  slug: string;
  name: string;
  title: string;
  designation: string;
  qualification: string;
  departmentId: string;
  departmentName: string;
  experienceYears: number;
  experienceText: string;
  patientsCount: string;
  rating: number;
  reviewsCount: number;
  image: string;
  location: string;
  branchIds: string[];
  availableDays: string[];
  languages: string[];
  consultationModes: ConsultationMode[];
  focusAreas: string[];
  credentials: string[];
  quote: string;
  bio?: string;
  isFounder?: boolean;
  isPopular?: boolean;
  isAvailableToday?: boolean;
  isBackendData?: boolean;
};

type DoctorCardProps = {
  doctor: DoctorItem;
  viewMode: "grid" | "list";
  onQuickView: (doctor: DoctorItem) => void;
};

export function DoctorCard({ doctor, viewMode, onQuickView }: DoctorCardProps) {
  return (
    <article className={`doctor-card doctor-card-${viewMode}`}>
      {/* Top Overlay Badges */}
      <div className="doctor-card-top-badges">
        {doctor.isFounder && (
          <span className="doctor-card-founder-badge">Founder</span>
        )}
        {doctor.isAvailableToday && (
          <span className="doctor-card-availability-badge">Available Today</span>
        )}
      </div>

      {/* Portrait Header Image */}
      <div className="doctor-card-header">
        <Image
          src={doctor.image}
          alt={doctor.name}
          width={360}
          height={260}
          className="doctor-card-img"
          unoptimized
        />

        {/* Rating Pill */}
        <div className="doctor-card-rating">
          <span className="doctor-card-rating-star">★</span>
          <span>{doctor.rating.toFixed(1)}</span>
          <span className="doctor-card-rating-reviews">({doctor.reviewsCount})</span>
        </div>
      </div>

      {/* Main Content Body */}
      <div className="doctor-card-body">
        <div className="doctor-card-name-wrap">
          <h3 className="doctor-card-name">
            <Link href={`/doctors/${doctor.slug}`} style={{ color: "inherit", textDecoration: "none" }}>
              {doctor.name}
            </Link>
            <span className="doctor-card-verified-icon" title="Verified Susrutha Vaidya">
              ✓
            </span>
          </h3>
          <div className="doctor-card-qualification">{doctor.qualification}</div>
        </div>

        <div className="doctor-card-designation">{doctor.designation}</div>

        {/* Key Metrics Row */}
        <div className="doctor-card-metrics">
          <div className="doctor-card-metric-item">
            <span className="doctor-card-metric-icon"><i className="fa-solid fa-clock-rotate-left" /></span>
            <div>
              <div className="doctor-card-metric-val">{doctor.experienceText}</div>
              <div className="doctor-card-metric-lbl">Experience</div>
            </div>
          </div>
          <div className="doctor-card-metric-item">
            <span className="doctor-card-metric-icon"><i className="fa-solid fa-hospital" /></span>
            <div>
              <div className="doctor-card-metric-val">{doctor.location}</div>
              <div className="doctor-card-metric-lbl">Primary Branch</div>
            </div>
          </div>
        </div>

        {/* Focus Area Tags */}
        <div className="doctor-card-focus-areas">
          {doctor.focusAreas.slice(0, 3).map((area) => (
            <span key={area} className="doctor-card-focus-pill">
              {area}
            </span>
          ))}
          {doctor.focusAreas.length > 3 && (
            <span className="doctor-card-focus-pill">+{doctor.focusAreas.length - 3} more</span>
          )}
        </div>

        {/* Card Action Buttons */}
        <div className="doctor-card-actions">
          <Link
            href={`/appointment?doctor=${doctor.slug}`}
            className="doctor-card-btn-book"
          >
            <i className="fa-solid fa-calendar-days" style={{ marginRight: "6px" }} /> Book Consultation
          </Link>
          <button
            type="button"
            className="doctor-card-btn-secondary"
            onClick={() => onQuickView(doctor)}
            title="Quick View Details"
          >
            Quick View
          </button>
        </div>
      </div>
    </article>
  );
}
