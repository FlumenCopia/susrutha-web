"use client";

import { useEffect, useState } from "react";

type DoctorBookingDrawerProps = {
  isOpen: boolean;
  doctorName?: string;
  specialty?: string;
  onClose: () => void;
};

export function DoctorBookingDrawer({
  isOpen,
  doctorName = "Dr. Krishnakumar K.",
  specialty = "Senior Ayurveda Physician",
  onClose,
}: DoctorBookingDrawerProps) {
  const [selectedBranch, setSelectedBranch] = useState<string>("Kattakada");
  const [patientName, setPatientName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [preferredDate, setPreferredDate] = useState<string>("");
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      onClose();
    }, 2500);
  };

  return (
    <div className="doc-drawer-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div className="doc-drawer-container" onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          className="doc-drawer-close-btn"
          onClick={onClose}
          aria-label="Close consultation drawer"
        >
          ✕
        </button>

        <div className="doc-drawer-header">
          <div className="doc-drawer-chip">PHYSICIAN APPOINTMENT</div>
          <h3 className="doc-drawer-title">Book Consultation</h3>
          <p className="doc-drawer-subtitle">
            Schedule a personalized OP consultation with <strong>{doctorName}</strong> ({specialty}).
          </p>
        </div>

        {isSubmitted ? (
          <div className="doc-drawer-success">
            <div className="doc-success-icon">✓</div>
            <h4>Appointment Requested!</h4>
            <p>
              Thank you, <strong>{patientName}</strong>. Our hospital patient-care team will call you shortly to confirm your consultation slot at the {selectedBranch} branch.
            </p>
          </div>
        ) : (
          <form className="doc-drawer-form" onSubmit={handleSubmit}>
            <div className="doc-form-group">
              <label htmlFor="doc-branch-select">Select Preferred Branch</label>
              <div className="doc-branch-pills">
                <button
                  type="button"
                  className={`doc-branch-pill ${selectedBranch === "Kattakada" ? "active" : ""}`}
                  onClick={() => setSelectedBranch("Kattakada")}
                >
                  <i className="fa-solid fa-location-dot" aria-hidden="true" style={{ marginRight: "6px" }} />
                  Kattakada Hospital
                </button>
                <button
                  type="button"
                  className={`doc-branch-pill ${selectedBranch === "Kowdiar" ? "active" : ""}`}
                  onClick={() => setSelectedBranch("Kowdiar")}
                >
                  <i className="fa-solid fa-location-dot" aria-hidden="true" style={{ marginRight: "6px" }} />
                  Kowdiar OP Clinic
                </button>
              </div>
            </div>

            <div className="doc-form-group">
              <label htmlFor="patient-name-input">Full Name *</label>
              <input
                id="patient-name-input"
                type="text"
                required
                placeholder="Enter your full name"
                value={patientName}
                onChange={(e) => setPatientName(e.target.value)}
                className="doc-drawer-input"
              />
            </div>

            <div className="doc-form-row">
              <div className="doc-form-group">
                <label htmlFor="patient-phone-input">Phone Number *</label>
                <input
                  id="patient-phone-input"
                  type="tel"
                  required
                  placeholder="+91 98765 43210"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="doc-drawer-input"
                />
              </div>

              <div className="doc-form-group">
                <label htmlFor="patient-date-input">Preferred Date</label>
                <input
                  id="patient-date-input"
                  type="date"
                  value={preferredDate}
                  onChange={(e) => setPreferredDate(e.target.value)}
                  className="doc-drawer-input"
                />
              </div>
            </div>

            <div className="doc-drawer-footer flex flex-col space-y-2">
              <button type="submit" className="doc-drawer-submit-btn">
                <span>Confirm Quick Consultation Request</span>
                <span aria-hidden="true">&rarr;</span>
              </button>
              <a
                href={`/appointment?doctor=${encodeURIComponent(doctorName.toLowerCase().replace(/dr-?/, '').trim())}`}
                className="text-center text-xs font-semibold text-susrutha-brand hover:underline py-1"
                onClick={onClose}
              >
                Or launch full 3-step slot picker wizard &rarr;
              </a>
              <span className="doc-drawer-guarantee">🔒 Confidential & Instant Confirmation</span>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
