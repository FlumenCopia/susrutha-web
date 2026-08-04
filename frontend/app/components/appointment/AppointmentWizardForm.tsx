"use client";

import Image from "next/image";
import { useState } from "react";
import {
  branchLocations,
  specialtyOptions,
  doctorOptions,
  timeSlots,
  ConsultationMode,
} from "./appointmentData";

export function AppointmentWizardForm() {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [mode, setMode] = useState<ConsultationMode>("in-person");
  const [selectedBranchId, setSelectedBranchId] = useState<string>("kattakada");
  const [selectedSpecialtyId, setSelectedSpecialtyId] = useState<string>("panchakarma");
  const [selectedDoctorId, setSelectedDoctorId] = useState<string>("dr-krishnakumar");
  const [selectedSlotId, setSelectedSlotId] = useState<string>("slot-m1");
  const [appointmentDate, setAppointmentDate] = useState<string>(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split("T")[0];
  });

  // Patient Info
  const [patientName, setPatientName] = useState("");
  const [patientPhone, setPatientPhone] = useState("");
  const [patientEmail, setPatientEmail] = useState("");
  const [patientAge, setPatientAge] = useState("");
  const [patientGender, setPatientGender] = useState("Male");
  const [healthConcern, setHealthConcern] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const selectedBranch = branchLocations.find((b) => b.id === selectedBranchId) || branchLocations[0];
  const selectedSpecialty = specialtyOptions.find((s) => s.id === selectedSpecialtyId) || specialtyOptions[0];
  const selectedDoctor = doctorOptions.find((d) => d.id === selectedDoctorId) || doctorOptions[0];
  const selectedSlot = timeSlots.find((t) => t.id === selectedSlotId) || timeSlots[0];

  const handleNextStep = () => {
    if (currentStep < 3) setCurrentStep((prev) => prev + 1);
  };

  const handlePrevStep = () => {
    if (currentStep > 1) setCurrentStep((prev) => prev - 1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!patientName || !patientPhone) {
      alert("Please enter your full name and phone number.");
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1200);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setCurrentStep(1);
    setPatientName("");
    setPatientPhone("");
    setPatientEmail("");
    setHealthConcern("");
  };

  return (
    <section className="apt-booking-luxury" id="booking-wizard">
      <div className="apt-booking-grid-wrapper">
        {/* Main Interactive Wizard Column */}
        <div className="apt-wizard-card-luxury">
          {/* Progress Header */}
          <div className="apt-progress-header">
            <div className="apt-progress-step-track">
              <button
                type="button"
                className={`apt-step-indicator ${currentStep === 1 ? "active" : ""} ${currentStep > 1 ? "completed" : ""}`}
                onClick={() => setCurrentStep(1)}
              >
                <span className="step-badge">{currentStep > 1 ? "✓" : "1"}</span>
                <span className="step-title-text">Mode & Branch</span>
              </button>

              <div className={`apt-step-line ${currentStep > 1 ? "active" : ""}`} />

              <button
                type="button"
                className={`apt-step-indicator ${currentStep === 2 ? "active" : ""} ${currentStep > 2 ? "completed" : ""}`}
                onClick={() => setCurrentStep(2)}
              >
                <span className="step-badge">{currentStep > 2 ? "✓" : "2"}</span>
                <span className="step-title-text">Specialty & Doctor</span>
              </button>

              <div className={`apt-step-line ${currentStep > 2 ? "active" : ""}`} />

              <button
                type="button"
                className={`apt-step-indicator ${currentStep === 3 ? "active" : ""}`}
                onClick={() => setCurrentStep(3)}
              >
                <span className="step-badge">3</span>
                <span className="step-title-text">Date & Details</span>
              </button>
            </div>

            <div className="apt-progress-info">
              <span className="progress-percent">Step {currentStep} of 3</span>
              <span className="progress-label">
                {currentStep === 1 ? "Select Mode & Location" : currentStep === 2 ? "Choose Specialist" : "Schedule & Contact"}
              </span>
            </div>
          </div>

          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="apt-form-body-luxury">
              {/* STEP 1: MODE & LOCATION */}
              {currentStep === 1 && (
                <div className="apt-step-fade">
                  <div className="step-title-block">
                    <h2>Select Consultation Mode & Preferred Location</h2>
                    <p>Choose between an in-person hospital visit or online video tele-consultation</p>
                  </div>

                  {/* Consultation Mode Options */}
                  <div className="apt-mode-cards-grid">
                    <div
                      className={`apt-mode-box ${mode === "in-person" ? "selected" : ""}`}
                      onClick={() => setMode("in-person")}
                    >
                      <div className="mode-box-head">
                        <span className="mode-box-icon">🏥</span>
                        <span className="mode-box-radio">{mode === "in-person" ? "●" : "○"}</span>
                      </div>
                      <h3>In-Person Hospital Visit</h3>
                      <p>Consult with doctors at our hospital suites in Kattakada or Kowdiar outlet.</p>
                      <span className="mode-box-badge">Recommended for Panchakarma & Nadi Pariksha</span>
                    </div>

                    <div
                      className={`apt-mode-box ${mode === "video" ? "selected" : ""}`}
                      onClick={() => setMode("video")}
                    >
                      <div className="mode-box-head">
                        <span className="mode-box-icon">💻</span>
                        <span className="mode-box-radio">{mode === "video" ? "●" : "○"}</span>
                      </div>
                      <h3>Online Video Consultation</h3>
                      <p>HD Video tele-consultation for outstation & international patients.</p>
                      <span className="mode-box-badge gold">Convenient Tele-Ayurveda</span>
                    </div>
                  </div>

                  {/* Branch Selection Grid */}
                  {mode === "in-person" && (
                    <div className="apt-branch-selection-container">
                      <h3 className="section-sublabel">Select Hospital Branch Location:</h3>
                      <div className="apt-branch-options-list">
                        {branchLocations.map((branch) => (
                          <div
                            key={branch.id}
                            className={`apt-branch-card-option ${selectedBranchId === branch.id ? "active" : ""}`}
                            onClick={() => setSelectedBranchId(branch.id)}
                          >
                            <div className="branch-card-thumb">
                              <Image src={branch.image} alt={branch.name} fill sizes="140px" />
                            </div>
                            <div className="branch-card-content">
                              <h4>{branch.name}</h4>
                              <span className="branch-card-tag">{branch.type}</span>
                              <p className="branch-card-address">📍 {branch.address}</p>
                            </div>
                            <div className="branch-card-check">{selectedBranchId === branch.id ? "✓" : "+"}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="apt-action-bar">
                    <button type="button" className="btn btn-primary btn-next-step" onClick={handleNextStep}>
                      <span>Continue to Specialty & Doctor</span>
                      <span aria-hidden="true">&rarr;</span>
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 2: SPECIALTY & DOCTOR */}
              {currentStep === 2 && (
                <div className="apt-step-fade">
                  <div className="step-title-block">
                    <h2>Choose Specialty & Ayurvedic Specialist</h2>
                    <p>Select your health department and preferred consulting physician</p>
                  </div>

                  {/* Specialty Grid */}
                  <div className="apt-specialty-section">
                    <h3 className="section-sublabel">Select Health Specialty / Concern:</h3>
                    <div className="apt-specialty-pills-grid">
                      {specialtyOptions.map((spec) => (
                        <div
                          key={spec.id}
                          className={`apt-specialty-pill-card ${selectedSpecialtyId === spec.id ? "selected" : ""}`}
                          onClick={() => setSelectedSpecialtyId(spec.id)}
                        >
                          <span className="spec-pill-icon">{spec.icon}</span>
                          <div>
                            <strong>{spec.title}</strong>
                            <span>{spec.description}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Doctor Cards */}
                  <div className="apt-doctor-section">
                    <h3 className="section-sublabel">Select Senior Ayurvedic Doctor:</h3>
                    <div className="apt-doctor-selection-grid">
                      {doctorOptions.map((doc) => (
                        <div
                          key={doc.id}
                          className={`apt-doctor-card-deluxe ${selectedDoctorId === doc.id ? "selected" : ""}`}
                          onClick={() => setSelectedDoctorId(doc.id)}
                        >
                          <div className="doc-portrait-wrapper">
                            <Image src={doc.avatar} alt={doc.name} fill sizes="80px" />
                            <span className="doc-rating-chip">{doc.rating} ★</span>
                          </div>

                          <div className="doc-card-info">
                            <h4>{doc.name}</h4>
                            <span className="doc-card-qual">{doc.qualification}</span>
                            <span className="doc-card-spec">{doc.specialty}</span>
                            <span className="doc-card-days">📅 {doc.availableDays.join(", ")}</span>
                          </div>

                          <div className="doc-card-select-icon">{selectedDoctorId === doc.id ? "✓" : "+"}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="apt-action-bar space-between">
                    <button type="button" className="btn btn-outline btn-prev-step" onClick={handlePrevStep}>
                      &larr; Back
                    </button>
                    <button type="button" className="btn btn-primary btn-next-step" onClick={handleNextStep}>
                      <span>Continue to Date & Details</span>
                      <span aria-hidden="true">&rarr;</span>
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 3: SCHEDULE & PATIENT DETAILS */}
              {currentStep === 3 && (
                <div className="apt-step-fade">
                  <div className="step-title-block">
                    <h2>Schedule & Patient Registration Details</h2>
                    <p>Select your consultation date, preferred time slot, and patient contact info</p>
                  </div>

                  {/* Date & Time Slot Grid */}
                  <div className="apt-schedule-container">
                    <div className="form-group-luxury">
                      <label htmlFor="apt-date-picker" className="input-label-luxury">
                        Preferred Date:
                      </label>
                      <input
                        id="apt-date-picker"
                        type="date"
                        value={appointmentDate}
                        min={new Date().toISOString().split("T")[0]}
                        onChange={(e) => setAppointmentDate(e.target.value)}
                        className="apt-field-input"
                        required
                      />
                    </div>

                    <div className="form-group-luxury">
                      <label className="input-label-luxury">Available Time Slots:</label>
                      <div className="apt-time-slots-grid">
                        {timeSlots.map((slot) => (
                          <button
                            type="button"
                            key={slot.id}
                            className={`apt-slot-btn ${selectedSlotId === slot.id ? "active" : ""}`}
                            onClick={() => setSelectedSlotId(slot.id)}
                          >
                            <span className="slot-t">{slot.label}</span>
                            <span className="slot-p">{slot.period}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Patient Info Fields */}
                  <div className="apt-fields-grid-luxury">
                    <div className="form-group-luxury">
                      <label htmlFor="p-name" className="input-label-luxury">Patient Full Name *</label>
                      <input
                        id="p-name"
                        type="text"
                        placeholder="e.g. Ramesh Menon"
                        value={patientName}
                        onChange={(e) => setPatientName(e.target.value)}
                        className="apt-field-input"
                        required
                      />
                    </div>

                    <div className="form-group-luxury">
                      <label htmlFor="p-phone" className="input-label-luxury">Phone Number *</label>
                      <input
                        id="p-phone"
                        type="tel"
                        placeholder="+91 94470 00000"
                        value={patientPhone}
                        onChange={(e) => setPatientPhone(e.target.value)}
                        className="apt-field-input"
                        required
                      />
                    </div>

                    <div className="form-group-luxury">
                      <label htmlFor="p-email" className="input-label-luxury">Email Address (Optional)</label>
                      <input
                        id="p-email"
                        type="email"
                        placeholder="patient@example.com"
                        value={patientEmail}
                        onChange={(e) => setPatientEmail(e.target.value)}
                        className="apt-field-input"
                      />
                    </div>

                    <div className="form-group-luxury flex-row-fields">
                      <div className="f-col">
                        <label htmlFor="p-age" className="input-label-luxury">Age</label>
                        <input
                          id="p-age"
                          type="number"
                          placeholder="e.g. 45"
                          value={patientAge}
                          onChange={(e) => setPatientAge(e.target.value)}
                          className="apt-field-input"
                        />
                      </div>
                      <div className="f-col">
                        <label htmlFor="p-gender" className="input-label-luxury">Gender</label>
                        <select
                          id="p-gender"
                          value={patientGender}
                          onChange={(e) => setPatientGender(e.target.value)}
                          className="apt-field-input"
                        >
                          <option>Male</option>
                          <option>Female</option>
                          <option>Other</option>
                        </select>
                      </div>
                    </div>

                    <div className="form-group-luxury col-span-2">
                      <label htmlFor="p-concern" className="input-label-luxury">Describe Health Concern / Medical History</label>
                      <textarea
                        id="p-concern"
                        rows={3}
                        placeholder="Mention symptoms, duration of illness, or previous therapies..."
                        value={healthConcern}
                        onChange={(e) => setHealthConcern(e.target.value)}
                        className="apt-field-input textarea"
                      />
                    </div>
                  </div>

                  <div className="apt-action-bar space-between">
                    <button type="button" className="btn btn-outline btn-prev-step" onClick={handlePrevStep}>
                      &larr; Back
                    </button>
                    <button type="submit" className="btn btn-primary btn-submit-luxury" disabled={isSubmitting}>
                      {isSubmitting ? "Confirming Booking..." : "Confirm & Complete Booking"}
                    </button>
                  </div>
                </div>
              )}
            </form>
          ) : (
            /* SUCCESS CONFIRMATION MODAL */
            <div className="apt-success-screen fade-in">
              <div className="success-badge-glow">✓</div>
              <h2>Appointment Token Generated!</h2>
              <p className="success-subtitle">
                Your consultation request has been successfully registered for <strong>{patientName}</strong>.
              </p>

              <div className="success-ticket-card">
                <div className="ticket-header">
                  <span>SUSRUTHA CLINICAL APPOINTMENT PASS</span>
                  <span className="ticket-status">CONFIRMED</span>
                </div>
                <div className="ticket-body">
                  <div className="ticket-row">
                    <span>Consulting Doctor:</span>
                    <strong>{selectedDoctor.name} ({selectedDoctor.qualification})</strong>
                  </div>
                  <div className="ticket-row">
                    <span>Department & Mode:</span>
                    <strong>{selectedSpecialty.title} • {mode === "in-person" ? selectedBranch.name : "Video Tele-Consultation"}</strong>
                  </div>
                  <div className="ticket-row">
                    <span>Date & Time Slot:</span>
                    <strong>{appointmentDate} • {selectedSlot.label}</strong>
                  </div>
                  <div className="ticket-row">
                    <span>Contact Phone:</span>
                    <strong>{patientPhone}</strong>
                  </div>
                </div>
              </div>

              <p className="success-callout-text">
                📲 Our patient care officer will contact you on <strong>{patientPhone}</strong> within 30 minutes to confirm your token number and diet instructions.
              </p>

              <div className="success-action-group">
                <button type="button" className="btn btn-primary" onClick={handleReset}>
                  Book Another Consultation
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Live Summary Sidebar Card (Digital Consultation Pass) */}
        <aside className="apt-summary-column">
          <div className="apt-digital-pass-card">
            <div className="pass-card-head">
              <div className="pass-title-group">
                <span className="pass-logo-icon">🌿</span>
                <h3>Digital Consultation Pass</h3>
              </div>
              <span className="pass-live-pill">LIVE PREVIEW</span>
            </div>

            <div className="pass-doctor-hero">
              <div className="pass-doc-portrait">
                <Image src={selectedDoctor.avatar} alt={selectedDoctor.name} fill sizes="70px" />
              </div>
              <div>
                <strong>{selectedDoctor.name}</strong>
                <span className="pass-doc-role">{selectedDoctor.specialty}</span>
                <span className="pass-doc-rating">⭐ {selectedDoctor.rating} • {selectedDoctor.experience}</span>
              </div>
            </div>

            <div className="pass-details-list">
              <div className="pass-detail-row">
                <span className="p-lbl">Consultation Mode:</span>
                <span className="p-val">{mode === "in-person" ? "🏥 Hospital Visit" : "💻 Online Video Call"}</span>
              </div>

              {mode === "in-person" && (
                <div className="pass-detail-row">
                  <span className="p-lbl">Facility Location:</span>
                  <span className="p-val">{selectedBranch.name}</span>
                </div>
              )}

              <div className="pass-detail-row">
                <span className="p-lbl">Department:</span>
                <span className="p-val">{selectedSpecialty.title}</span>
              </div>

              <div className="pass-detail-row">
                <span className="p-lbl">Scheduled Date:</span>
                <span className="p-val highlight">{appointmentDate}</span>
              </div>

              <div className="pass-detail-row">
                <span className="p-lbl">Time Slot:</span>
                <span className="p-val highlight">{selectedSlot.label}</span>
              </div>
            </div>

            <div className="pass-guarantee-box">
              <div className="g-row">
                <span className="g-check">✓</span>
                <span>Zero pre-booking charges</span>
              </div>
              <div className="g-row">
                <span className="g-check">✓</span>
                <span>Free cancellation up to 4 hours prior</span>
              </div>
              <div className="g-row">
                <span className="g-check">✓</span>
                <span>Instant SMS & WhatsApp confirmation</span>
              </div>
            </div>

            <div className="pass-helpline-box">
              <span>Need Direct Booking Assistance?</span>
              <a href="tel:+919447003191" className="pass-call-link">
                📞 Call Helpline: +91 94470 03191
              </a>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}
