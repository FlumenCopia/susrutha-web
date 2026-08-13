import React, { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { DoctorItem } from "./doctorsData";

type DoctorQuickViewModalProps = {
  doctor: DoctorItem | null;
  onClose: () => void;
};

export function DoctorQuickViewModal({ doctor, onClose }: DoctorQuickViewModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  if (!doctor) return null;

  return (
    <div className="doctor-modal-backdrop" onClick={onClose}>
      <div
        className="doctor-modal-content"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        <button
          type="button"
          className="doctor-modal-close"
          onClick={onClose}
          aria-label="Close modal"
        >
          ✕
        </button>

        <div className="doctor-modal-grid">
          {/* Left Avatar Column */}
          <div className="doctor-modal-image-col">
            <div className="doctor-modal-avatar-wrap">
              <Image
                src={doctor.image}
                alt={doctor.name}
                width={240}
                height={240}
                className="doctor-modal-avatar"
                unoptimized
              />
            </div>

            {doctor.quote && (
              <div className="doctor-modal-quote">
                &ldquo;{doctor.quote}&rdquo;
              </div>
            )}
          </div>

          {/* Right Info Column */}
          <div className="doctor-modal-info-col">
            <h3>{doctor.name}</h3>
            <div className="doctor-modal-sub">
              {doctor.qualification} • {doctor.designation}
            </div>

            <p className="doctor-modal-bio">{doctor.bio}</p>

            <div className="doctor-modal-section-title">Clinical Credentials</div>
            <ul className="doctor-modal-list">
              {doctor.credentials.map((cred) => (
                <li key={cred}>{cred}</li>
              ))}
            </ul>

            <div className="doctor-modal-section-title">Key Focus Areas</div>
            <div className="doctor-card-focus-areas" style={{ marginBottom: 20 }}>
              {doctor.focusAreas.map((area) => (
                <span key={area} className="doctor-card-focus-pill" style={{ background: "#fff8ec", borderColor: "#c88922" }}>
                  {area}
                </span>
              ))}
            </div>

            <div className="doctor-modal-section-title">Available Consultation Days</div>
            <p style={{ fontSize: 14, color: "#262725", fontWeight: 600, margin: "0 0 20px" }}>
              🗓️ {doctor.availableDays.join(", ")}
            </p>

            <div className="doctor-modal-section-title">Languages Spoken</div>
            <p style={{ fontSize: 13.5, color: "#6a6c67", margin: "0 0 24px" }}>
              🗣️ {doctor.languages.join(", ")}
            </p>

            <div className="doctor-card-actions">
              <Link
                href={`/appointment?doctor=${doctor.slug}`}
                className="doctor-card-btn-book"
                onClick={onClose}
              >
                <i className="fa-solid fa-calendar-days" style={{ marginRight: "6px" }} />
                Book Appointment
              </Link>
              <Link
                href={`/doctors/${doctor.slug}`}
                className="doctor-card-btn-secondary"
                onClick={onClose}
              >
                Full Profile Page <i className="fa-solid fa-arrow-right" style={{ marginLeft: "6px" }} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
