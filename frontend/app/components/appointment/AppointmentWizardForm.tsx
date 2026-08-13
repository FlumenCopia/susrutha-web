"use client";

import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useMemo, useState } from "react";
import {
  timeSlots as defaultTimeSlots,
} from "./appointmentData";
import { getPublicDoctors, getPublicDoctorsByDepartment, getPublicBranches, getPublicDepartments, getImageDisplayUrl } from "../../services/api";

const SHORT_DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const FULL_DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

// Helper to extract doctor working days array
function getDoctorWorkingDays(doc: any, branchId?: string): string[] {
  if (!doc) return SHORT_DAYS;

  // Check structured backend availability array
  if (Array.isArray(doc.availability) && doc.availability.length > 0) {
    const branchEntry = doc.availability.find(
      (a: any) =>
        a.branchId === branchId ||
        (typeof a.branchId === "object" && a.branchId?._id === branchId)
    ) || doc.availability[0];

    if (branchEntry && Array.isArray(branchEntry.days) && branchEntry.days.length > 0) {
      return branchEntry.days.map((d: string) => d.slice(0, 3));
    }
  }

  // Check static availableDays string array
  if (Array.isArray(doc.availableDays) && doc.availableDays.length > 0) {
    const days: string[] = [];
    doc.availableDays.forEach((d: string) => {
      if (d === "Daily" || d === "All Days") days.push(...SHORT_DAYS);
      else if (d === "Except Sunday") days.push("Mon", "Tue", "Wed", "Thu", "Fri", "Sat");
      else days.push(d.slice(0, 3));
    });
    return Array.from(new Set(days));
  }

  return SHORT_DAYS;
}

// Checks if doctor is available on a specific YYYY-MM-DD string
function checkDoctorAvailability(doc: any, dateStr: string, branchId?: string): boolean {
  if (!dateStr || !doc) return true;
  const dateObj = new Date(dateStr + "T00:00:00");
  const dayName = SHORT_DAYS[dateObj.getDay()];
  const workingDays = getDoctorWorkingDays(doc, branchId);
  return workingDays.some((w) => w.toLowerCase().startsWith(dayName.toLowerCase()));
}

// Helper to format Date object into local YYYY-MM-DD string without timezone offset bugs
function formatDateToYYYYMMDD(d: Date): string {
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

// Finds the next valid YYYY-MM-DD working date for a doctor
function findNextWorkingDate(doc: any, dateStr: string, branchId?: string): string {
  if (!dateStr) return formatDateToYYYYMMDD(new Date());
  let curr = new Date(dateStr + "T00:00:00");
  for (let i = 1; i <= 14; i++) {
    curr.setDate(curr.getDate() + 1);
    const dayName = SHORT_DAYS[curr.getDay()];
    const workingDays = getDoctorWorkingDays(doc, branchId);
    if (workingDays.some((w) => w.toLowerCase().startsWith(dayName.toLowerCase()))) {
      return formatDateToYYYYMMDD(curr);
    }
  }
  return dateStr;
}

// Extract the doctor's time slots for the selected branch from their availability array
// Returns slot objects compatible with the slot grid UI
function getDoctorBranchTimeSlots(doc: any, branchId?: string): { id: string; label: string; period: string }[] {
  if (!doc || !Array.isArray(doc.availability) || doc.availability.length === 0) return [];

  const branchEntry =
    doc.availability.find(
      (a: any) =>
        a.branchId === branchId ||
        (typeof a.branchId === "object" && (a.branchId?._id === branchId || String(a.branchId?._id) === String(branchId)))
    ) || doc.availability[0];

  if (!branchEntry || !Array.isArray(branchEntry.timeSlots) || branchEntry.timeSlots.length === 0) return [];

  return branchEntry.timeSlots.map((slot: string, idx: number) => {
    const upper = slot.toUpperCase();
    const period = upper.includes("AM") ? "Morning" : upper.includes("PM") ? upper.includes("07") || upper.includes("08") ? "Evening" : "Afternoon" : "";
    return { id: `branch-slot-${idx}`, label: slot, period };
  });
}

function AppointmentWizardContent() {
  const searchParams = useSearchParams();
  const doctorQuery = searchParams.get("doctor") || searchParams.get("doctorId") || searchParams.get("doc");
  const branchQuery = searchParams.get("branch") || searchParams.get("branchId");
  const specialtyQuery = searchParams.get("specialty") || searchParams.get("department");

  const [doctors, setDoctors] = useState<any[]>([]);
  const [branches, setBranches] = useState<any[]>([]);
  const [specialties, setSpecialties] = useState<any[]>([]);
  const [filteredDoctors, setFilteredDoctors] = useState<any[]>([]);
  const [isDoctorLoading, setIsDoctorLoading] = useState(false);

  const [currentStep, setCurrentStep] = useState<number>(1);
  const [selectedBranchId, setSelectedBranchId] = useState<string>("");
  const [selectedSpecialtyId, setSelectedSpecialtyId] = useState<string>("");
  const [selectedDoctorId, setSelectedDoctorId] = useState<string>("");
  const [selectedSlotId, setSelectedSlotId] = useState<string>("slot-m1");
  const [autoSelectedMsg, setAutoSelectedMsg] = useState<string | null>(null);

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
  const [bookingReference, setBookingReference] = useState("");

  // Load Live Doctors, Branches & Departments from Backend API
  useEffect(() => {
    async function loadData() {
      try {
        const [apiDocs, apiBranches, apiDepts] = await Promise.all([
          getPublicDoctors(),
          getPublicBranches(),
          getPublicDepartments(),
        ]);

        if (Array.isArray(apiDocs) && apiDocs.length > 0) {
          const mappedDocs = apiDocs.map((d: any) => ({
            id: d._id || d.id || d.slug,
            _id: d._id || d.id,
            name: d.name,
            slug: d.slug,
            departmentId: d.departmentId?._id || d.departmentId || null,
            departmentSlug: d.departmentId?.slug || null,
            qualification: d.qualifications || d.qualification || "BAMS, MD",
            specialty: d.designation || (d.specialties ? d.specialties.join(", ") : "Senior Physician"),
            experience: d.experienceYears ? `${d.experienceYears}+ Years` : d.experienceText || "15+ Years",
            avatar: getImageDisplayUrl(d.photo || d.photoUrl),
            availableDays: d.availability ? d.availability.flatMap((a: any) => a.days || []) : (d.availableDays || ["Daily"]),
            availability: d.availability,
            location: d.assignedBranchIds ? d.assignedBranchIds.map((b: any) => b.name || b).join(" & ") : "Main Hospital",
            rating: d.rating || 4.9,
          }));
          setDoctors(mappedDocs);
          setFilteredDoctors(mappedDocs);
          // Auto-sync selectedDoctorId to match loaded doctors if current ID does not match
          setSelectedDoctorId((prev) => {
            if (mappedDocs.some((d) => d.id === prev || d._id === prev || d.slug === prev)) return prev;
            return mappedDocs[0].id;
          });
        }

        if (Array.isArray(apiBranches) && apiBranches.length > 0) {
          const mappedBranches = apiBranches.map((b: any) => ({
            id: b.code ? b.code.toLowerCase() : (b._id || b.id),
            _id: b._id || b.id,
            name: b.name,
            type: b.type || "Inpatient & Outpatient Center",
            address: typeof b.address === "object" ? `${b.address.street}, ${b.address.city}` : (b.address || ""),
            phone: Array.isArray(b.contact?.phone) ? b.contact.phone[0] : (b.phone || "+91 94470 03191"),
            timing: b.opdTimings || "09:00 AM - 07:00 PM",
            image: getImageDisplayUrl(b.coverImage || "/images/kattakada-branch-hero.webp"),
            features: b.features || [],
          }));
          setBranches(mappedBranches);
          // Auto-sync selectedBranchId to match loaded branches if current ID does not match
          setSelectedBranchId((prev) => {
            if (mappedBranches.some((b) => b.id === prev || b._id === prev)) return prev;
            return mappedBranches[0].id;
          });
        }

        // Load departments from backend as specialties
        if (Array.isArray(apiDepts) && apiDepts.length > 0) {
          const mappedDepts = [
            {
              id: "all",
              title: "All Specialties",
              icon: "🩺",
              description: "View all Ayurvedic specialists at this branch",
            },
            ...apiDepts.map((dept: any) => ({
              id: dept.slug || dept._id,
              _id: dept._id,
              slug: dept.slug,
              title: dept.title || dept.name,
              icon: dept.icon || "🌿",
              description: dept.tagline || dept.overview?.slice(0, 80) || "",
            })),
          ];
          setSpecialties(mappedDepts as any);
        }
      } catch (err) {
        console.warn("Using default appointment data:", err);
      }
    }
    loadData();
  }, []);

  // When selected specialty/department OR branch changes, fetch matching doctors from backend
  useEffect(() => {
    if (!selectedSpecialtyId) return;
    const dept = specialties.find((s) => s.id === selectedSpecialtyId || s.slug === selectedSpecialtyId);
    const deptSlug = dept?.slug || selectedSpecialtyId;

    // Get the branch code to filter by — branch.id is the code lowercased
    const branchCode = selectedBranchId ? selectedBranchId.toUpperCase() : undefined;

    setIsDoctorLoading(true);
    getPublicDoctorsByDepartment(deptSlug, branchCode)
      .then((docs: any) => {
        if (Array.isArray(docs) && docs.length > 0) {
          const mapped = docs.map((d: any) => ({
            id: d._id || d.id || d.slug,
            _id: d._id || d.id,
            name: d.name,
            slug: d.slug,
            departmentId: d.departmentId?._id || d.departmentId || null,
            departmentSlug: d.departmentId?.slug || null,
            qualification: d.qualifications || d.qualification || "BAMS, MD",
            specialty: d.designation || (d.specialties ? d.specialties.join(", ") : "Senior Physician"),
            experience: d.experienceYears ? `${d.experienceYears}+ Years` : d.experienceText || "15+ Years",
            avatar: getImageDisplayUrl(d.photo || d.photoUrl),
            availableDays: d.availability ? d.availability.flatMap((a: any) => a.days || []) : (d.availableDays || ["Daily"]),
            availability: d.availability,
            assignedBranchIds: d.assignedBranchIds || [],
            location: d.assignedBranchIds ? d.assignedBranchIds.map((b: any) => b.name || b).join(" & ") : "Main Hospital",
            rating: d.rating || 4.9,
          }));
          setFilteredDoctors(mapped);
          // Auto-select first doctor in this dept+branch if current doctor isn't in the list
          setSelectedDoctorId((prev) => {
            if (mapped.some((d) => d.id === prev || d._id === prev)) return prev;
            return mapped[0].id;
          });
        } else {
          // No doctors in this dept at this branch — show empty with a message
          setFilteredDoctors([]);
        }
      })
      .catch(() => setFilteredDoctors(doctors))
      .finally(() => setIsDoctorLoading(false));
  }, [selectedSpecialtyId, selectedBranchId, specialties]);

  // Handle URL Search Params Auto-Selection
  useEffect(() => {

    if (branchQuery) {
      const matchBranch = branches.find(
        (b) => b.id === branchQuery.toLowerCase() || b._id === branchQuery || b.name.toLowerCase().includes(branchQuery.toLowerCase())
      );
      if (matchBranch) setSelectedBranchId(matchBranch.id);
    }

    if (specialtyQuery) {
      const matchSpec = specialties.find(
        (s) => s.id === specialtyQuery.toLowerCase() || s.title.toLowerCase().includes(specialtyQuery.toLowerCase())
      );
      if (matchSpec) setSelectedSpecialtyId(matchSpec.id);
    }

    if (doctorQuery) {
      const targetDoc = doctors.find(
        (d) =>
          d.slug === doctorQuery ||
          d.id === doctorQuery ||
          d._id === doctorQuery ||
          d.name.toLowerCase().includes(doctorQuery.toLowerCase().replace(/dr-?/, ""))
      );

      if (targetDoc) {
        setSelectedDoctorId(targetDoc.id);
        setAutoSelectedMsg(`⚡ Auto-selected ${targetDoc.name} (${targetDoc.specialty}). Choose your date & slot below.`);
        setCurrentStep(3); // Jump directly to Step 3 for fast user booking!
      }
    }
  }, [doctorQuery, branchQuery, specialtyQuery, doctors, branches, specialties]);

  const selectedBranch = useMemo(
    () => branches.find((b) => b.id === selectedBranchId || b._id === selectedBranchId) || branches[0] || null,
    [branches, selectedBranchId]
  );

  const selectedSpecialty = useMemo(
    () => specialties.find((s) => s.id === selectedSpecialtyId) || specialties[0] || null,
    [specialties, selectedSpecialtyId]
  );

  const selectedDoctor = useMemo(
    () => doctors.find((d) => d.id === selectedDoctorId || d._id === selectedDoctorId || d.slug === selectedDoctorId) || doctors[0] || null,
    [doctors, selectedDoctorId]
  );

  const selectedSlot = useMemo(() => {
    // Try to find the slot in doctor's branch-specific time slots first
    const branchSlots = getDoctorBranchTimeSlots(selectedDoctor, selectedBranch?._id || selectedBranch?.id);
    if (branchSlots.length > 0) {
      const found = branchSlots.find((s) => s.id === selectedSlotId);
      return found || branchSlots[0];
    }
    return defaultTimeSlots.find((t) => t.id === selectedSlotId) || defaultTimeSlots[0];
  }, [selectedSlotId, selectedDoctor, selectedBranch]);

  // Availability Checks for Selected Date
  const isDoctorAvailable = useMemo(
    () => checkDoctorAvailability(selectedDoctor, appointmentDate, selectedBranch?._id || selectedBranch?.id),
    [selectedDoctor, appointmentDate, selectedBranch]
  );

  const selectedDateDayName = useMemo(() => {
    if (!appointmentDate) return "";
    const dateObj = new Date(appointmentDate + "T00:00:00");
    return FULL_DAYS[dateObj.getDay()];
  }, [appointmentDate]);

  const doctorWorkingDaysList = useMemo(
    () => getDoctorWorkingDays(selectedDoctor, selectedBranch?._id || selectedBranch?.id),
    [selectedDoctor, selectedBranch]
  );

  const handleJumpToNextAvailableDate = () => {
    const nextDate = findNextWorkingDate(selectedDoctor, appointmentDate, selectedBranch?._id || selectedBranch?.id);
    setAppointmentDate(nextDate);
  };

  const handleNextStep = () => {
    if (currentStep === 1) {
      const isBranchValid = branches.some((b) => b.id === selectedBranchId || b._id === selectedBranchId);
      if (!isBranchValid) {
        if (branches.length > 0) {
          setSelectedBranchId(branches[0].id);
        } else {
          alert("Please select a hospital branch location to continue.");
          return;
        }
      }
      setCurrentStep(2);
    } else if (currentStep === 2) {
      const isDoctorValid = doctors.some((d) => d.id === selectedDoctorId || d._id === selectedDoctorId || d.slug === selectedDoctorId);
      if (!isDoctorValid) {
        if (doctors.length > 0) {
          setSelectedDoctorId(doctors[0].id);
        } else {
          alert("Please select a doctor to continue.");
          return;
        }
      }
      setCurrentStep(3);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) setCurrentStep((prev) => prev - 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!patientName || !patientPhone) {
      alert("Please enter your full name and phone number.");
      return;
    }
    setIsSubmitting(true);
    const refCode = `APT-${Math.floor(100000 + Math.random() * 900000)}`;
    setBookingReference(refCode);

    try {
      const apiBase = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1/public";
      const response = await fetch(`${apiBase}/appointment`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          bookingReference: refCode,
          // API schema field names
          name: patientName,
          phone: patientPhone,
          email: patientEmail || undefined,
          date: appointmentDate,
          symptoms: healthConcern || undefined,
          // Extra context fields
          patientAge: patientAge ? parseInt(patientAge, 10) : undefined,
          patientGender,
          consultationMode: "IN_PERSON",
          branchId: selectedBranch?._id || selectedBranch?.id,
          branchName: selectedBranch?.name,
          doctorId: selectedDoctor?._id || selectedDoctor?.id,
          doctorName: selectedDoctor?.name,
          specialty: selectedSpecialty?.title,
          appointmentDate,
          preferredTimeSlot: selectedSlot?.label || "10:00 AM",
          timeSlot: selectedSlot?.label || "10:00 AM",
          healthIssueDescription: healthConcern || undefined,
        }),
      });

      const data = await response.json().catch(() => null);

      if (!response.ok) {
        // Show server error message to user
        const errMsg =
          data?.errors?.map((e: any) => `${e.field}: ${e.message}`).join("\n") ||
          data?.message ||
          "Booking failed. Please try again.";
        alert(`Booking Error:\n${errMsg}`);
        return;
      }

      // Only mark as submitted on actual success
      setIsSubmitted(true);
    } catch (err) {
      console.error("Appointment submission error:", err);
      alert("Network error. Please check your connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setCurrentStep(1);
    setAutoSelectedMsg(null);
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
                <span className="step-title-text">Branch</span>
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
                {currentStep === 1 ? "Select Hospital Branch" : currentStep === 2 ? "Choose Specialist" : "Schedule & Contact"}
              </span>
            </div>
          </div>

          {/* Auto-Selected Doctor Notice Banner */}
          {autoSelectedMsg && !isSubmitted && (
            <div className="my-4 p-3 rounded-lg bg-amber-50 border border-amber-200 text-amber-900 text-xs font-semibold flex items-center justify-between">
              <span>{autoSelectedMsg}</span>
              <button
                type="button"
                onClick={() => setCurrentStep(2)}
                className="apt-change-doctor-btn"
              >
                ✦ Change Doctor
              </button>
            </div>
          )}

          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="apt-form-body-luxury">
              {/* STEP 1: LOCATION */}
              {currentStep === 1 && (
                <div className="apt-step-fade">
                  <div className="step-title-block">
                    <h2>Select Preferred Location</h2>
                    <p>Choose an in-person hospital visit location</p>
                  </div>

                  {/* Branch Selection Grid */}
                  <div className="apt-branch-selection-container">
                    <h3 className="section-sublabel">Select Hospital Branch Location:</h3>
                    <div className="apt-branch-options-list">
                      {branches.map((branch) => {
                        const isSelected =
                          selectedBranchId === branch.id ||
                          selectedBranchId === branch._id ||
                          selectedBranch?._id === branch._id ||
                          selectedBranch?.id === branch.id;
                        return (
                          <div
                            key={branch.id}
                            className={`apt-branch-card-option ${isSelected ? "active" : ""}`}
                            onClick={() => setSelectedBranchId(branch.id)}
                          >
                            <div className="branch-card-thumb">
                              <Image src={branch.image} alt={branch.name} fill sizes="140px" />
                            </div>
                            <div className="branch-card-content">
                              <h4>{branch.name}</h4>
                              <span className="branch-card-tag">{branch.type}</span>
                              <p className="branch-card-address"><i className="fa-solid fa-location-dot" style={{ marginRight: "6px" }} />{branch.address}</p>
                            </div>
                            <div className="branch-card-check">{isSelected ? "✓" : "+"}</div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div className="apt-action-bar">
                    <button type="button" className="btn btn-primary btn-next-step" onClick={handleNextStep}>
                      <span>Continue to Specialty & Doctor</span>
                      <i className="fa-solid fa-arrow-right" aria-hidden="true" style={{ marginLeft: "6px" }} />
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

                  {/* Selected Branch Indicator & Change Branch Action */}
                  <div
                    className="apt-selected-branch-bar"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: "16px",
                      padding: "12px 20px",
                      background: "linear-gradient(135deg, rgba(196, 146, 42, 0.08), rgba(196, 146, 42, 0.16))",
                      border: "1px solid rgba(196, 146, 42, 0.3)",
                      borderRadius: "14px",
                      marginBottom: "24px",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "14px", color: "#4a3e2e" }}>
                      <i className="fa-solid fa-location-dot" style={{ fontSize: "16px" }} />
                      <span>
                        Selected Hospital Branch:{" "}
                        <strong style={{ color: "#9a6528", fontWeight: 700 }}>
                          {selectedBranch?.name || "Kattakada Main Hospital"}
                        </strong>
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setCurrentStep(1)}
                      className="btn btn-outline"
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        padding: "6px 16px",
                        background: "#ffffff",
                        color: "#9a6528",
                        border: "1px solid rgba(196, 146, 42, 0.4)",
                        borderRadius: "9999px",
                        fontSize: "12px",
                        fontWeight: 700,
                        letterSpacing: "0.03em",
                        cursor: "pointer",
                        boxShadow: "0 2px 8px rgba(154, 101, 40, 0.1)",
                        whiteSpace: "nowrap",
                      }}
                    >
                      ✦ Change Branch
                    </button>
                  </div>

                  {/* Specialty Grid */}
                  <div className="apt-specialty-section">
                    <h3 className="section-sublabel">Select Health Specialty / Concern:</h3>
                    <div className="apt-specialty-pills-grid">
                      {specialties.map((spec) => (
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
                    <h3 className="section-sublabel">
                      {isDoctorLoading
                        ? "Loading specialists…"
                        : `Select Senior Specialist (${selectedSpecialty?.title || "All Departments"}):`}
                    </h3>
                    {isDoctorLoading ? (
                      <div className="apt-doctor-loading">
                        <span className="apt-doctor-loading-spinner" />
                        <span>Fetching available specialists…</span>
                      </div>
                    ) : filteredDoctors.length === 0 ? (
                      <div
                        className="apt-doctor-empty-state"
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          justifyContent: "center",
                          padding: "36px 24px",
                          background: "linear-gradient(145deg, #ffffff, #fdfaf4)",
                          border: "1px dashed rgba(196, 146, 42, 0.35)",
                          borderRadius: "20px",
                          textAlign: "center",
                          margin: "20px 0",
                          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.02)",
                        }}
                      >
                        <div
                          style={{
                            width: "54px",
                            height: "54px",
                            borderRadius: "50%",
                            background: "linear-gradient(135deg, rgba(196, 146, 42, 0.12), rgba(196, 146, 42, 0.22))",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            marginBottom: "14px",
                            border: "1px solid rgba(196, 146, 42, 0.3)",
                          }}
                        >
                          <i className="fa-solid fa-location-dot" style={{ fontSize: "24px" }} />
                        </div>
                        <h4
                          style={{
                            fontFamily: "var(--font-heading, 'Cinzel', 'Playfair Display', Georgia, serif)",
                            fontSize: "18px",
                            fontWeight: 700,
                            color: "#2c251e",
                            margin: "0 0 8px 0",
                          }}
                        >
                          No Specialists Assigned at this Branch
                        </h4>
                        <p
                          style={{
                            fontSize: "14px",
                            color: "#6b5a3e",
                            maxWidth: "480px",
                            lineHeight: 1.6,
                            margin: "0 0 20px 0",
                          }}
                        >
                          There are currently no specialists assigned to{" "}
                          <strong style={{ color: "#9a6528", fontWeight: 700 }}>
                            {selectedSpecialty?.title || "this department"}
                          </strong>{" "}
                          at{" "}
                          <strong style={{ color: "#9a6528", fontWeight: 700 }}>
                            {selectedBranch?.name}
                          </strong>
                          .
                        </p>
                        <div
                          style={{
                            display: "flex",
                            flexWrap: "wrap",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: "12px",
                          }}
                        >
                          <button
                            type="button"
                            onClick={() => setCurrentStep(1)}
                            className="btn btn-primary"
                            style={{
                              display: "inline-flex",
                              alignItems: "center",
                              justifyContent: "center",
                              padding: "10px 22px",
                              background: "linear-gradient(135deg, #9a6528 0%, #c4922a 100%)",
                              color: "#ffffff",
                              fontWeight: 700,
                              fontSize: "13px",
                              letterSpacing: "0.02em",
                              border: "none",
                              borderRadius: "9999px",
                              cursor: "pointer",
                              boxShadow: "0 4px 14px rgba(154, 101, 40, 0.28)",
                            }}
                          >
                            <span>✦ Switch Branch Location</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => setSelectedSpecialtyId("all")}
                            className="btn btn-outline"
                            style={{
                              display: "inline-flex",
                              alignItems: "center",
                              justifyContent: "center",
                              padding: "10px 20px",
                              background: "#ffffff",
                              color: "#9a6528",
                              fontWeight: 600,
                              fontSize: "13px",
                              border: "1px solid #d4c5b3",
                              borderRadius: "9999px",
                              cursor: "pointer",
                            }}
                          >
                            <span>View All Specialists at this Branch</span>
                          </button>
                        </div>
                      </div>
                    ) : (
                    <div className="apt-doctor-selection-grid">
                      {filteredDoctors.map((doc) => {
                        const isSelected =
                          selectedDoctorId === doc.id ||
                          selectedDoctorId === doc._id ||
                          selectedDoctor?._id === doc._id ||
                          selectedDoctor?.id === doc.id;
                        return (
                          <div
                            key={doc.id}
                            className={`apt-doctor-card-deluxe ${isSelected ? "selected" : ""}`}
                            onClick={() => {
                              setSelectedDoctorId(doc.id);
                              setAutoSelectedMsg(null);
                            }}
                          >
                            <div className="doc-portrait-wrapper">
                              <Image src={doc.avatar} alt={doc.name} fill sizes="80px" />
                              <span className="doc-rating-chip">{doc.rating} ★</span>
                            </div>

                            <div className="doc-card-info">
                              <h4>{doc.name}</h4>
                              <span className="doc-card-qual">{doc.qualification}</span>
                              <span className="doc-card-spec">{doc.specialty}</span>
                              <span className="doc-card-days">
                                📅 Days: {getDoctorWorkingDays(doc, selectedBranch?._id || selectedBranch?.id).join(", ")}
                              </span>
                            </div>

                            <div className="doc-card-select-icon">{isSelected ? "✓" : "+"}</div>
                          </div>
                        );
                      })}
                    </div>
                    )}
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

                  {/* Selected Doctor & Branch Summary Badge */}
                  <div className="apt-selected-doctor-badge">
                    <div className="apt-selected-doctor-info">
                      <div className="apt-selected-doctor-avatar">
                        <Image
                          src={selectedDoctor?.avatar}
                          alt={selectedDoctor?.name || "Doctor"}
                          width={52}
                          height={52}
                          style={{ objectFit: "cover", width: "52px", height: "52px", borderRadius: "50%" }}
                        />
                      </div>
                      <div className="apt-selected-doctor-text">
                        <span className="apt-selected-doctor-label">Consulting Doctor</span>
                        <h4 className="apt-selected-doctor-name">{selectedDoctor?.name}</h4>
                        <p className="apt-selected-doctor-meta">{selectedDoctor?.specialty} • {selectedBranch?.name}</p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => setCurrentStep(2)}
                      className="apt-change-doctor-btn"
                    >
                      ✦ Change Doctor
                    </button>
                  </div>

                  {/* Date Picker & Doctor Timetable Validation */}
                  <div className="apt-schedule-container">
                    <div className="form-group-luxury">
                      <label htmlFor="apt-date-picker" className="input-label-luxury">
                        Preferred Consultation Date:
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

                      {/* Doctor Availability Indicator */}
                      <div style={{ marginTop: "10px" }}>
                        {isDoctorAvailable ? (
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "8px",
                              padding: "10px 16px",
                              background: "rgba(16, 185, 129, 0.08)",
                              border: "1px solid rgba(16, 185, 129, 0.3)",
                              borderRadius: "12px",
                              color: "#065f46",
                              fontWeight: 600,
                              fontSize: "13px",
                            }}
                          >
                            <span style={{ fontSize: "15px" }}>✓</span>
                            <span>
                              {selectedDoctor?.name} is <strong style={{ color: "#047857" }}>AVAILABLE</strong> on {selectedDateDayName}s at {selectedBranch?.name}.
                            </span>
                          </div>
                        ) : (
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              gap: "8px",
                              padding: "14px 18px",
                              background: "linear-gradient(135deg, rgba(196, 146, 42, 0.08), rgba(196, 146, 42, 0.15))",
                              border: "1px solid rgba(196, 146, 42, 0.35)",
                              borderRadius: "14px",
                              color: "#4a3e2e",
                            }}
                          >
                            <div style={{ display: "flex", alignItems: "center", gap: "8px", fontWeight: 700, fontSize: "13px", color: "#84531e" }}>
                              <span style={{ fontSize: "16px" }}>⚠️</span>
                              <span>
                                {selectedDoctor?.name} does NOT conduct consultations on {selectedDateDayName}s.
                              </span>
                            </div>
                            <p style={{ margin: 0, fontSize: "12px", color: "#6b5a3e" }}>
                              Working Days for this branch: <strong style={{ color: "#9a6528" }}>{doctorWorkingDaysList.join(", ")}</strong>
                            </p>
                            <div>
                              <button
                                type="button"
                                onClick={handleJumpToNextAvailableDate}
                                className="btn btn-primary"
                                style={{
                                  display: "inline-flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  gap: "6px",
                                  padding: "9px 20px",
                                  background: "linear-gradient(135deg, #9a6528 0%, #c4922a 100%)",
                                  color: "#ffffff",
                                  fontWeight: 700,
                                  fontSize: "12px",
                                  letterSpacing: "0.02em",
                                  border: "none",
                                  borderRadius: "9999px",
                                  cursor: "pointer",
                                  boxShadow: "0 4px 12px rgba(154, 101, 40, 0.28)",
                                  marginTop: "4px",
                                  textDecoration: "none",
                                }}
                              >
                                <span><i className="fa-solid fa-calendar-days" style={{ marginRight: "6px" }} /> Jump to Next Available Working Day</span>
                                <i className="fa-solid fa-arrow-right" aria-hidden="true" style={{ marginLeft: "6px" }} />
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="form-group-luxury">
                      {(() => {
                        const branchSlots = getDoctorBranchTimeSlots(selectedDoctor, selectedBranch?._id || selectedBranch?.id);
                        const slotsToShow = branchSlots.length > 0 ? branchSlots : defaultTimeSlots;
                        return (
                          <>
                            <label className="input-label-luxury">
                              Available Time Slots ({selectedDateDayName})
                              {branchSlots.length > 0 && (
                                <span className="apt-slot-source-badge">Dr. {selectedDoctor?.name?.split(" ")[1]}&apos;s Schedule</span>
                              )}
                              :
                            </label>
                            <div className="apt-time-slots-grid">
                              {slotsToShow.map((slot) => (
                                <button
                                  type="button"
                                  key={slot.id}
                                  className={`apt-slot-btn ${selectedSlot?.id === slot.id || selectedSlot?.label === slot.label ? "active" : ""}`}
                                  onClick={() => setSelectedSlotId(slot.id)}
                                >
                                  <span className="slot-t">{slot.label}</span>
                                  <span className="slot-p">{slot.period}</span>
                                </button>
                              ))}
                            </div>
                          </>
                        );
                      })()}
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

                    <div className="form-group-luxury full-width">
                      <label htmlFor="p-concern" className="input-label-luxury">Describe Health Concern / Symptoms</label>
                      <textarea
                        id="p-concern"
                        rows={3}
                        placeholder="Mention symptoms e.g., low back pain, joint stiffness, skin rash, digestion issues..."
                        value={healthConcern}
                        onChange={(e) => setHealthConcern(e.target.value)}
                        className="apt-field-input"
                      />
                    </div>
                  </div>

                  <div className="apt-action-bar space-between">
                    <button type="button" className="btn btn-outline btn-prev-step" onClick={handlePrevStep}>
                      &larr; Back
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting || !isDoctorAvailable}
                      className={`btn btn-primary btn-submit-final ${!isDoctorAvailable ? "opacity-50 cursor-not-allowed" : ""}`}
                    >
                      {isSubmitting ? "Confirming Appointment..." : "Confirm & Request Booking ✓"}
                    </button>
                  </div>
                </div>
              )}
            </form>
          ) : (
            /* SUCCESS CONFIRMATION STATE */
            <div className="apt-success-screen-luxury text-center py-8 space-y-6">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 text-3xl font-bold">
                ✓
              </div>
              <div>
                <span className="text-xs uppercase tracking-widest font-bold text-susrutha-brand">Booking Confirmed</span>
                <h2 className="text-2xl font-bold text-foreground mt-1">Appointment Request Submitted!</h2>
                <p className="text-sm text-muted-foreground mt-1">
                  Reference Code: <strong className="font-mono text-foreground">{bookingReference}</strong>
                </p>
              </div>

              <div className="max-w-md mx-auto p-5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-left space-y-3 text-xs">
                <div className="flex items-center justify-between border-b border-border pb-2">
                  <span className="text-muted-foreground">Patient:</span>
                  <strong className="text-foreground">{patientName} ({patientPhone})</strong>
                </div>
                <div className="flex items-center justify-between border-b border-border pb-2">
                  <span className="text-muted-foreground">Doctor:</span>
                  <strong className="text-foreground">{selectedDoctor?.name}</strong>
                </div>
                <div className="flex items-center justify-between border-b border-border pb-2">
                  <span className="text-muted-foreground">Branch:</span>
                  <strong className="text-foreground">{selectedBranch?.name}</strong>
                </div>
                <div className="flex items-center justify-between border-b border-border pb-2">
                  <span className="text-muted-foreground">Date & Slot:</span>
                  <strong className="text-foreground">{appointmentDate} • {selectedSlot?.label}</strong>
                </div>
              </div>

              <p className="text-xs text-muted-foreground max-w-sm mx-auto">
                Our patient care desk at {selectedBranch?.name} will call you shortly on <strong>{patientPhone}</strong> to confirm your slot time.
              </p>

              <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
                <button type="button" className="btn btn-primary" onClick={handleReset}>
                  Book Another Appointment
                </button>
                <a
                  href={`https://wa.me/919447003191?text=Hello%20Susrutha%20Ayurveda,%20I%20have%20booked%20an%20appointment%20${bookingReference}%20for%20${patientName}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 rounded-lg bg-emerald-600 text-white font-semibold text-xs hover:bg-emerald-700 transition-colors flex items-center space-x-1.5"
                >
                  <span><i className="fa-brands fa-whatsapp" style={{ marginRight: "6px" }} /> Confirm via WhatsApp Desk</span>
                </a>
              </div>
            </div>
          )}
        </div>

        {/* Sidebar Summary Card */}
        <aside className="apt-sidebar-summary-luxury">
          <div className="apt-summary-card-inner">
            <h3 className="summary-title">Consultation Pass</h3>

            <div className="summary-doc-header">
              <div className="summary-doc-avatar">
                <Image
                  src={selectedDoctor?.avatar}
                  alt={selectedDoctor?.name || "Doctor"}
                  width={60}
                  height={60}
                  style={{ objectFit: "cover", width: "60px", height: "60px", borderRadius: "50%" }}
                />
              </div>
              <div>
                <h4 className="summary-doc-name">{selectedDoctor?.name}</h4>
                <span className="summary-doc-spec">{selectedDoctor?.specialty}</span>
                <span className="summary-doc-rating">★ {selectedDoctor?.rating} • {selectedDoctor?.experience}</span>
              </div>
            </div>

            <div className="summary-details-list">
              <div className="summary-item">
                <span>Consultation Mode:</span>
                <strong><i className="fa-solid fa-hospital" style={{ marginRight: "6px" }} /> Hospital Visit</strong>
              </div>

              <div className="summary-item">
                <span>Department:</span>
                <strong>{selectedSpecialty?.title}</strong>
              </div>

              <div className="summary-item">
                <span>Hospital Branch:</span>
                <strong>{selectedBranch?.name}</strong>
              </div>

              <div className="summary-item">
                <span>Scheduled Date:</span>
                <strong>{appointmentDate}</strong>
              </div>

              <div className="summary-item">
                <span>Time Slot:</span>
                <strong>{selectedSlot?.label}</strong>
              </div>
            </div>

            <div className="summary-guarantees">
              <div className="guarantee-line">✓ Zero pre-booking charges</div>
              <div className="guarantee-line">✓ Free cancellation up to 4 hours prior</div>
              <div className="guarantee-line">✓ Instant SMS & WhatsApp confirmation</div>
            </div>

            <div className="summary-support-box">
              <span>Need Direct Booking Assistance?</span>
              <a href="tel:+919447003191" className="support-phone-link">
                📞 Call Helpline: +91 94470 03191
              </a>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}

export function AppointmentWizardForm() {
  return (
    <Suspense
      fallback={
        <div className="p-12 text-center text-sm font-semibold text-amber-900 bg-amber-50 rounded-xl my-8">
          Loading Susrutha Interactive Booking Wizard...
        </div>
      }
    >
      <AppointmentWizardContent />
    </Suspense>
  );
}
