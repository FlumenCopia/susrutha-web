"use client";

import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useMemo, useState } from "react";
import {
  Check,
  Plus,
  Sparkles,
  Building2,
  Calendar,
  Star,
  AlertTriangle,
  ArrowRight,
  ArrowLeft,
  Zap,
  ShieldCheck,
  MapPin,
  Hospital,
  Phone,
  RefreshCw,
  UserCheck,
  Stethoscope,
  Leaf,
  Clock,
  Activity
} from "lucide-react";
import {
  getPublicDoctors,
  getPublicDoctorsByDepartment,
  getPublicBranches,
  getPublicDepartments,
  getPublicPackages,
  getPublicTreatments,
  getImageDisplayUrl
} from "../../services/api";

const defaultTimeSlots = [
  { id: "slot-1", label: "09:00 AM", period: "Morning" },
  { id: "slot-2", label: "09:30 AM", period: "Morning" },
  { id: "slot-3", label: "10:00 AM", period: "Morning" },
  { id: "slot-4", label: "10:30 AM", period: "Morning" },
  { id: "slot-5", label: "11:00 AM", period: "Morning" },
  { id: "slot-6", label: "11:30 AM", period: "Morning" },
  { id: "slot-7", label: "02:00 PM", period: "Afternoon" },
  { id: "slot-8", label: "02:30 PM", period: "Afternoon" },
  { id: "slot-9", label: "03:00 PM", period: "Afternoon" },
  { id: "slot-10", label: "03:30 PM", period: "Afternoon" },
  { id: "slot-11", label: "04:00 PM", period: "Evening" },
  { id: "slot-12", label: "04:30 PM", period: "Evening" },
];

const SHORT_DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const FULL_DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

function getDoctorWorkingDays(doc: any, branchId?: string): string[] {
  if (!doc) return SHORT_DAYS;

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

function checkDoctorAvailability(doc: any, dateStr: string, branchId?: string): boolean {
  if (!dateStr || !doc) return true;
  const dateObj = new Date(dateStr + "T00:00:00");
  const dayName = SHORT_DAYS[dateObj.getDay()];
  const workingDays = getDoctorWorkingDays(doc, branchId);
  return workingDays.some((w) => w.toLowerCase().startsWith(dayName.toLowerCase()));
}

function formatDateToYYYYMMDD(d: Date): string {
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

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
  const packageQuery = searchParams.get("package") || searchParams.get("packageId") || searchParams.get("pkg");
  const treatmentQuery = searchParams.get("treatment") || searchParams.get("treatmentId") || searchParams.get("therapy");
  const typeQuery = searchParams.get("type");
  const durationQuery = searchParams.get("duration");

  const [bookingMode, setBookingMode] = useState<"DOCTOR" | "PACKAGE" | "TREATMENT">(() => {
    if (treatmentQuery || typeQuery === "SINGLE_TREATMENT") return "TREATMENT";
    if (packageQuery || typeQuery === "PACKAGE_BOOKING") return "PACKAGE";
    return "DOCTOR";
  });

  const [doctors, setDoctors] = useState<any[]>([]);
  const [branches, setBranches] = useState<any[]>([]);
  const [specialties, setSpecialties] = useState<any[]>([]);
  const [packages, setPackages] = useState<any[]>([]);
  const [treatments, setTreatments] = useState<any[]>([]);
  const [filteredDoctors, setFilteredDoctors] = useState<any[]>([]);
  const [isDoctorLoading, setIsDoctorLoading] = useState(false);

  const [currentStep, setCurrentStep] = useState<number>(1);
  const [selectedBranchId, setSelectedBranchId] = useState<string>("");
  const [selectedSpecialtyId, setSelectedSpecialtyId] = useState<string>("");
  const [selectedDoctorId, setSelectedDoctorId] = useState<string>("");
  const [selectedPackageId, setSelectedPackageId] = useState<string>("");
  const [selectedTreatmentId, setSelectedTreatmentId] = useState<string>("");
  const [selectedDurationDays, setSelectedDurationDays] = useState<number>(14);
  const [selectedAccommodation, setSelectedAccommodation] = useState<string>("Executive Suite");
  const [selectedSlotId, setSelectedSlotId] = useState<string>("slot-1");
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

  // Load Live Doctors, Branches, Departments, Packages & Treatments from Backend API
  useEffect(() => {
    async function loadData() {
      try {
        const [apiDocs, apiBranches, apiDepts, apiPkgs, apiTreatments] = await Promise.all([
          getPublicDoctors(),
          getPublicBranches(),
          getPublicDepartments(),
          getPublicPackages(),
          getPublicTreatments(),
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
          setSelectedBranchId((prev) => {
            if (mappedBranches.some((b) => b.id === prev || b._id === prev)) return prev;
            return mappedBranches[0].id;
          });
        }

        if (Array.isArray(apiDepts) && apiDepts.length > 0) {
          const mappedDepts = [
            {
              id: "all",
              title: "All Specialties",
              icon: "Stethoscope",
              description: "View all Ayurvedic specialists at this branch",
            },
            ...apiDepts.map((dept: any) => ({
              id: dept.slug || dept._id,
              _id: dept._id,
              slug: dept.slug,
              title: dept.title || dept.name,
              icon: dept.icon || "Leaf",
              description: dept.tagline || dept.overview?.slice(0, 80) || "",
            })),
          ];
          setSpecialties(mappedDepts as any);
        }

        // Load Care Packages
        const pkgData = Array.isArray(apiPkgs) ? apiPkgs : (apiPkgs as any).items || [];
        if (Array.isArray(pkgData) && pkgData.length > 0) {
          setPackages(pkgData);
          if (packageQuery) {
            const matchPkg = pkgData.find((p: any) => p.slug === packageQuery || p._id === packageQuery || p.title.toLowerCase().includes(packageQuery.toLowerCase()));
            if (matchPkg) {
              setSelectedPackageId(matchPkg._id || matchPkg.slug);
              setBookingMode("PACKAGE");
              if (durationQuery) setSelectedDurationDays(Number(durationQuery) || 14);
              setAutoSelectedMsg(`Auto-selected Care Package: ${matchPkg.title}`);
            } else {
              setSelectedPackageId(pkgData[0]._id || pkgData[0].slug);
            }
          } else {
            setSelectedPackageId(pkgData[0]._id || pkgData[0].slug);
          }
        }

        // Load Treatments
        const trtData = Array.isArray(apiTreatments) ? apiTreatments : (apiTreatments as any).items || [];
        if (Array.isArray(trtData) && trtData.length > 0) {
          setTreatments(trtData);
          if (treatmentQuery) {
            const matchTrt = trtData.find((t: any) => t.slug === treatmentQuery || t._id === treatmentQuery || t.title.toLowerCase().includes(treatmentQuery.toLowerCase()));
            if (matchTrt) {
              setSelectedTreatmentId(matchTrt._id || matchTrt.slug);
              setBookingMode("TREATMENT");
              setAutoSelectedMsg(`Auto-selected Therapy: ${matchTrt.title}`);
            } else {
              setSelectedTreatmentId(trtData[0]._id || trtData[0].slug);
            }
          } else {
            setSelectedTreatmentId(trtData[0]._id || trtData[0].slug);
          }
        }
      } catch (err) {
        console.warn("Using default appointment data:", err);
      }
    }
    loadData();
  }, [packageQuery, treatmentQuery, durationQuery]);

  // When selected specialty/department OR branch changes, fetch matching doctors from backend
  useEffect(() => {
    if (!selectedSpecialtyId) return;
    const dept = specialties.find((s) => s.id === selectedSpecialtyId || s.slug === selectedSpecialtyId);
    const deptSlug = dept?.slug || selectedSpecialtyId;
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
          setSelectedDoctorId((prev) => {
            if (mapped.some((d) => d.id === prev || d._id === prev)) return prev;
            return mapped[0].id;
          });
        } else {
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

    if (doctorQuery && bookingMode === "DOCTOR") {
      const targetDoc = doctors.find(
        (d) =>
          d.slug === doctorQuery ||
          d.id === doctorQuery ||
          d._id === doctorQuery ||
          d.name.toLowerCase().includes(doctorQuery.toLowerCase().replace(/dr-?/, ""))
      );

      if (targetDoc) {
        setSelectedDoctorId(targetDoc.id);
        setAutoSelectedMsg(`Auto-selected ${targetDoc.name} (${targetDoc.specialty}). Choose your date & slot below.`);
        setCurrentStep(3);
      }
    }
  }, [doctorQuery, branchQuery, specialtyQuery, doctors, branches, specialties, bookingMode]);

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

  const selectedPackage = useMemo(
    () => packages.find((p) => p._id === selectedPackageId || p.slug === selectedPackageId || p.id === selectedPackageId) || packages[0] || null,
    [packages, selectedPackageId]
  );

  const selectedTreatment = useMemo(
    () => treatments.find((t) => t._id === selectedTreatmentId || t.slug === selectedTreatmentId || t.id === selectedTreatmentId) || treatments[0] || null,
    [treatments, selectedTreatmentId]
  );

  const selectedSlot = useMemo(() => {
    const branchSlots = getDoctorBranchTimeSlots(selectedDoctor, selectedBranch?._id || selectedBranch?.id);
    if (branchSlots.length > 0) {
      const found = branchSlots.find((s) => s.id === selectedSlotId);
      return found || branchSlots[0];
    }
    return defaultTimeSlots.find((t) => t.id === selectedSlotId) || defaultTimeSlots[0];
  }, [selectedSlotId, selectedDoctor, selectedBranch]);

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
      if (!isBranchValid && branches.length > 0) {
        setSelectedBranchId(branches[0].id);
      }
      setCurrentStep(2);
    } else if (currentStep === 2) {
      if (bookingMode === "DOCTOR") {
        const isDoctorValid = doctors.some((d) => d.id === selectedDoctorId || d._id === selectedDoctorId || d.slug === selectedDoctorId);
        if (!isDoctorValid && doctors.length > 0) {
          setSelectedDoctorId(doctors[0].id);
        }
      } else if (bookingMode === "PACKAGE") {
        if (!selectedPackageId && packages.length > 0) {
          setSelectedPackageId(packages[0]._id || packages[0].slug);
        }
      } else if (bookingMode === "TREATMENT") {
        if (!selectedTreatmentId && treatments.length > 0) {
          setSelectedTreatmentId(treatments[0]._id || treatments[0].slug);
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
      alert("Please enter your full name and contact phone number.");
      return;
    }
    setIsSubmitting(true);
    const refCode = `SUS-${Math.floor(100000 + Math.random() * 900000)}`;
    setBookingReference(refCode);

    try {
      const apiBase = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1/public";

      if (bookingMode === "PACKAGE") {
        const response = await fetch(`${apiBase}/contact`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: patientName,
            phone: patientPhone,
            email: patientEmail || undefined,
            subject: `Care Package Booking: ${selectedPackage?.title || "Residential Care"}`,
            leadType: "PACKAGE_BOOKING",
            packageId: selectedPackage?._id || selectedPackage?.id,
            branchId: selectedBranch?._id || selectedBranch?.id,
            preferredDate: appointmentDate,
            message: `Selected Duration: ${selectedDurationDays} Days Stay | Accommodation: ${selectedAccommodation} | Campus Branch: ${selectedBranch?.name} | Patient Notes: ${healthConcern || "None"}`,
          }),
        });
        if (!response.ok) {
          const data = await response.json().catch(() => null);
          alert(`Package Lead Error: ${data?.message || "Submission failed"}`);
          return;
        }
        setIsSubmitted(true);
      } else if (bookingMode === "TREATMENT") {
        const response = await fetch(`${apiBase}/contact`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: patientName,
            phone: patientPhone,
            email: patientEmail || undefined,
            subject: `Therapy Reservation: ${selectedTreatment?.title || "Single Procedure"}`,
            leadType: "SINGLE_TREATMENT",
            treatmentId: selectedTreatment?._id || selectedTreatment?.id,
            branchId: selectedBranch?._id || selectedBranch?.id,
            preferredDate: appointmentDate,
            preferredTimeSlot: selectedSlot?.label || "09:00 AM",
            message: `Therapy Title: ${selectedTreatment?.title} | Session Time: ${selectedSlot?.label} | Branch: ${selectedBranch?.name} | Patient Notes: ${healthConcern || "None"}`,
          }),
        });
        if (!response.ok) {
          const data = await response.json().catch(() => null);
          alert(`Therapy Lead Error: ${data?.message || "Submission failed"}`);
          return;
        }
        setIsSubmitted(true);
      } else {
        // DOCTOR OPD Appointment
        const response = await fetch(`${apiBase}/appointment`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            bookingReference: refCode,
            name: patientName,
            phone: patientPhone,
            email: patientEmail || undefined,
            date: appointmentDate,
            symptoms: healthConcern || undefined,
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
          const errMsg =
            data?.errors?.map((e: any) => `${e.field}: ${e.message}`).join("\n") ||
            data?.message ||
            "Booking failed. Please try again.";
          alert(`Booking Error:\n${errMsg}`);
          return;
        }
        setIsSubmitted(true);
      }
    } catch (err) {
      console.error("Booking submission error:", err);
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
                <span className="step-badge">{currentStep > 1 ? <Check size={13} /> : "1"}</span>
                <span className="step-title-text">Branch</span>
              </button>

              <div className={`apt-step-line ${currentStep > 1 ? "active" : ""}`} />

              <button
                type="button"
                className={`apt-step-indicator ${currentStep === 2 ? "active" : ""} ${currentStep > 2 ? "completed" : ""}`}
                onClick={() => setCurrentStep(2)}
              >
                <span className="step-badge">{currentStep > 2 ? <Check size={13} /> : "2"}</span>
                <span className="step-title-text">
                  {bookingMode === "PACKAGE" ? "Care Package" : bookingMode === "TREATMENT" ? "Therapy" : "Specialty & Doctor"}
                </span>
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
                {currentStep === 1
                  ? "Select Hospital Branch"
                  : currentStep === 2
                  ? bookingMode === "PACKAGE" ? "Choose Package & Accommodation" : bookingMode === "TREATMENT" ? "Choose Therapy Procedure" : "Choose Specialist"
                  : "Schedule & Contact"}
              </span>
            </div>
          </div>

          {/* Three-Way Mode Switcher Header */}
          <div
            className="apt-booking-mode-switcher"
            style={{
              display: "flex",
              gap: "8px",
              marginBottom: "24px",
              padding: "6px",
              background: "#f6ede0",
              borderRadius: "999px",
              border: "1px solid rgba(181, 122, 37, 0.25)",
            }}
          >
            <button
              type="button"
              onClick={() => { setBookingMode("DOCTOR"); setAutoSelectedMsg(null); }}
              style={{
                flex: 1,
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "6px",
                padding: "10px 14px",
                borderRadius: "999px",
                border: "none",
                background: bookingMode === "DOCTOR" ? "linear-gradient(135deg, #b57a25 0%, #9a651e 100%)" : "transparent",
                color: bookingMode === "DOCTOR" ? "#ffffff" : "#665544",
                fontWeight: 700,
                fontSize: "13px",
                cursor: "pointer",
                boxShadow: bookingMode === "DOCTOR" ? "0 4px 14px rgba(181, 122, 37, 0.3)" : "none",
                transition: "all 0.25s ease",
              }}
            >
              <UserCheck size={14} />
              <span>Doctor OPD</span>
            </button>

            <button
              type="button"
              onClick={() => { setBookingMode("PACKAGE"); setAutoSelectedMsg(null); }}
              style={{
                flex: 1,
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "6px",
                padding: "10px 14px",
                borderRadius: "999px",
                border: "none",
                background: bookingMode === "PACKAGE" ? "linear-gradient(135deg, #b57a25 0%, #9a651e 100%)" : "transparent",
                color: bookingMode === "PACKAGE" ? "#ffffff" : "#665544",
                fontWeight: 700,
                fontSize: "13px",
                cursor: "pointer",
                boxShadow: bookingMode === "PACKAGE" ? "0 4px 14px rgba(181, 122, 37, 0.3)" : "none",
                transition: "all 0.25s ease",
              }}
            >
              <Sparkles size={14} />
              <span>Care Package</span>
            </button>

            <button
              type="button"
              onClick={() => { setBookingMode("TREATMENT"); setAutoSelectedMsg(null); }}
              style={{
                flex: 1,
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "6px",
                padding: "10px 14px",
                borderRadius: "999px",
                border: "none",
                background: bookingMode === "TREATMENT" ? "linear-gradient(135deg, #b57a25 0%, #9a651e 100%)" : "transparent",
                color: bookingMode === "TREATMENT" ? "#ffffff" : "#665544",
                fontWeight: 700,
                fontSize: "13px",
                cursor: "pointer",
                boxShadow: bookingMode === "TREATMENT" ? "0 4px 14px rgba(181, 122, 37, 0.3)" : "none",
                transition: "all 0.25s ease",
              }}
            >
              <Activity size={14} />
              <span>Single Therapy</span>
            </button>
          </div>

          {/* Auto-Selected Notice Banner */}
          {autoSelectedMsg && !isSubmitted && (
            <div className="my-4 p-3 rounded-lg bg-amber-50 border border-amber-200 text-amber-900 text-xs font-semibold flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <Zap size={14} className="text-amber-600 shrink-0" />
                {autoSelectedMsg}
              </span>
              <button
                type="button"
                onClick={() => setCurrentStep(2)}
                className="apt-change-doctor-btn"
                style={{ display: "inline-flex", alignItems: "center", gap: "4px" }}
              >
                <RefreshCw size={12} />
                <span>Change Selection</span>
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
                    <p>Choose an in-person hospital visit or Ayur Village retreat campus</p>
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
                              <p className="branch-card-address"><MapPin size={13} style={{ display: "inline-block", verticalAlign: "-2px", marginRight: "6px" }} />{branch.address}</p>
                            </div>
                            <div className="branch-card-check">{isSelected ? <Check size={14} /> : <Plus size={14} />}</div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div className="apt-action-bar">
                    <button type="button" className="btn btn-primary btn-next-step" onClick={handleNextStep}>
                      <span>Continue to {bookingMode === "PACKAGE" ? "Care Package" : bookingMode === "TREATMENT" ? "Therapy Selection" : "Specialty & Doctor"}</span>
                      <ArrowRight size={14} style={{ marginLeft: "6px" }} />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 2: SPECIALTY & DOCTOR / PACKAGE / TREATMENT */}
              {currentStep === 2 && (
                <div className="apt-step-fade">
                  <div className="step-title-block">
                    <h2>
                      {bookingMode === "PACKAGE"
                        ? "Choose Care Package & Accommodation"
                        : bookingMode === "TREATMENT"
                        ? "Choose Therapy or Treatment Procedure"
                        : "Choose Specialty & Ayurvedic Specialist"}
                    </h2>
                    <p>
                      {bookingMode === "PACKAGE"
                        ? "Select your residential treatment package, duration, and room preference"
                        : bookingMode === "TREATMENT"
                        ? "Select your required Ayurvedic procedure, therapy category, or wellness treatment"
                        : "Select your health department and preferred consulting physician"}
                    </p>
                  </div>

                  {/* Selected Branch Bar */}
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
                      <MapPin size={16} />
                      <span>
                        Selected Hospital Campus:{" "}
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
                        gap: "6px",
                        padding: "6px 16px",
                        background: "#ffffff",
                        color: "#9a6528",
                        border: "1px solid rgba(196, 146, 42, 0.4)",
                        borderRadius: "9999px",
                        fontSize: "12px",
                        fontWeight: 700,
                        cursor: "pointer",
                        whiteSpace: "nowrap",
                      }}
                    >
                      <Building2 size={13} />
                      <span>Change Branch</span>
                    </button>
                  </div>

                  {/* MODE A: CARE PACKAGE SELECTION */}
                  {bookingMode === "PACKAGE" && (
                    <div className="apt-package-section" style={{ marginBottom: "24px" }}>
                      <h3 className="section-sublabel" style={{ fontSize: "15px", fontWeight: 700, color: "#1c2a23", marginBottom: "12px" }}>
                        Select Residential Care Package:
                      </h3>
                      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "14px", marginBottom: "24px" }}>
                        {packages.map((pkg) => {
                          const isSelected = selectedPackageId === pkg._id || selectedPackageId === pkg.slug || selectedPackageId === pkg.id;
                          return (
                            <div
                              key={pkg._id || pkg.slug}
                              onClick={() => setSelectedPackageId(pkg._id || pkg.slug)}
                              style={{
                                padding: "16px",
                                borderRadius: "16px",
                                border: isSelected ? "2px solid #b57a25" : "1px solid rgba(181, 122, 37, 0.2)",
                                background: isSelected ? "linear-gradient(145deg, #fffbf4, #f8eedc)" : "#ffffff",
                                cursor: "pointer",
                                transition: "all 0.2s ease",
                                boxShadow: isSelected ? "0 6px 20px rgba(181, 122, 37, 0.18)" : "0 2px 8px rgba(0,0,0,0.03)",
                              }}
                            >
                              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "8px" }}>
                                <span style={{ fontSize: "11px", fontWeight: 800, color: "#b57a25", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                                  {pkg.category || "Inpatient Care"}
                                </span>
                                {isSelected && (
                                  <span style={{ width: "22px", height: "22px", borderRadius: "50%", background: "#b57a25", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                    <Check size={13} strokeWidth={2.5} />
                                  </span>
                                )}
                              </div>
                              <h4 style={{ fontSize: "15px", fontWeight: 700, color: "#1c2a23", marginBottom: "6px" }}>{pkg.title}</h4>
                              <p style={{ fontSize: "12px", color: "#556655", lineHeight: "1.4", marginBottom: "10px" }}>
                                {pkg.overview?.slice(0, 90) || pkg.subtitle || pkg.meta || "Physician-directed residential treatment program."}
                              </p>
                              {pkg.startingPrice ? (
                                <span style={{ fontSize: "13px", fontWeight: 800, color: "#2d4d3a" }}>
                                  Starts at ₹{pkg.startingPrice.toLocaleString("en-IN")}
                                </span>
                              ) : null}
                            </div>
                          );
                        })}
                      </div>

                      {/* Duration Tier Picker */}
                      <h3 className="section-sublabel" style={{ fontSize: "15px", fontWeight: 700, color: "#1c2a23", marginBottom: "12px" }}>
                        Select Package Duration:
                      </h3>
                      <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", marginBottom: "24px" }}>
                        {[7, 14, 21, 28].map((days) => (
                          <button
                            key={days}
                            type="button"
                            onClick={() => setSelectedDurationDays(days)}
                            style={{
                              flex: "1 1 120px",
                              padding: "12px 16px",
                              borderRadius: "12px",
                              border: selectedDurationDays === days ? "2px solid #b57a25" : "1px solid rgba(181, 122, 37, 0.25)",
                              background: selectedDurationDays === days ? "linear-gradient(135deg, #b57a25, #9a651e)" : "#ffffff",
                              color: selectedDurationDays === days ? "#ffffff" : "#4a3e2e",
                              fontWeight: 700,
                              fontSize: "14px",
                              cursor: "pointer",
                              boxShadow: selectedDurationDays === days ? "0 4px 12px rgba(181, 122, 37, 0.3)" : "none",
                            }}
                          >
                            {days} Days Stay
                          </button>
                        ))}
                      </div>

                      {/* Accommodation Selection */}
                      <h3 className="section-sublabel" style={{ fontSize: "15px", fontWeight: 700, color: "#1c2a23", marginBottom: "12px" }}>
                        Select Suite / Room Preference:
                      </h3>
                      <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", marginBottom: "24px" }}>
                        {["Executive Suite", "Deluxe AC Cottage", "Private Room", "Standard Ward"].map((acc) => (
                          <button
                            key={acc}
                            type="button"
                            onClick={() => setSelectedAccommodation(acc)}
                            style={{
                              flex: "1 1 140px",
                              padding: "10px 16px",
                              borderRadius: "12px",
                              border: selectedAccommodation === acc ? "2px solid #2d4d3a" : "1px solid rgba(45, 77, 58, 0.2)",
                              background: selectedAccommodation === acc ? "#2d4d3a" : "#ffffff",
                              color: selectedAccommodation === acc ? "#ffffff" : "#2d4d3a",
                              fontWeight: 700,
                              fontSize: "13px",
                              cursor: "pointer",
                              boxShadow: selectedAccommodation === acc ? "0 4px 12px rgba(45, 77, 58, 0.25)" : "none",
                            }}
                          >
                            {acc}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* MODE B: SINGLE TREATMENT SELECTION */}
                  {bookingMode === "TREATMENT" && (
                    <div className="apt-treatment-section" style={{ marginBottom: "24px" }}>
                      <h3 className="section-sublabel" style={{ fontSize: "15px", fontWeight: 700, color: "#1c2a23", marginBottom: "12px" }}>
                        Select Treatment / Therapy Procedure:
                      </h3>
                      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "14px", marginBottom: "24px" }}>
                        {treatments.map((trt) => {
                          const isSelected = selectedTreatmentId === trt._id || selectedTreatmentId === trt.slug || selectedTreatmentId === trt.id;
                          return (
                            <div
                              key={trt._id || trt.slug}
                              onClick={() => setSelectedTreatmentId(trt._id || trt.slug)}
                              style={{
                                padding: "16px",
                                borderRadius: "16px",
                                border: isSelected ? "2px solid #b57a25" : "1px solid rgba(181, 122, 37, 0.2)",
                                background: isSelected ? "linear-gradient(145deg, #fffbf4, #f8eedc)" : "#ffffff",
                                cursor: "pointer",
                                transition: "all 0.2s ease",
                                boxShadow: isSelected ? "0 6px 20px rgba(181, 122, 37, 0.18)" : "0 2px 8px rgba(0,0,0,0.03)",
                              }}
                            >
                              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "8px" }}>
                                <span style={{ fontSize: "11px", fontWeight: 800, color: "#b57a25", textTransform: "uppercase" }}>
                                  {trt.category || "Panchakarma Therapy"}
                                </span>
                                {isSelected && (
                                  <span style={{ width: "22px", height: "22px", borderRadius: "50%", background: "#b57a25", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                    <Check size={13} strokeWidth={2.5} />
                                  </span>
                                )}
                              </div>
                              <h4 style={{ fontSize: "15px", fontWeight: 700, color: "#1c2a23", marginBottom: "6px" }}>{trt.title}</h4>
                              <p style={{ fontSize: "12px", color: "#556655", lineHeight: "1.4" }}>
                                {trt.overview?.slice(0, 85) || trt.description?.slice(0, 85) || "Authentic physician-prescribed therapy session."}
                              </p>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* MODE C: DOCTOR OPD SELECTION */}
                  {bookingMode === "DOCTOR" && (
                    <div className="apt-doctor-mode-container">
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
                              <span className="spec-pill-icon">
                                {spec.id === "all" ? <Stethoscope size={18} /> : <Leaf size={18} />}
                              </span>
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
                              <MapPin size={24} strokeWidth={1.5} style={{ color: "#d97706" }} />
                            </div>
                            <h4 style={{ fontSize: "18px", fontWeight: 700, color: "#2c251e", margin: "0 0 8px 0" }}>
                              No Specialists Assigned at this Branch
                            </h4>
                            <p style={{ fontSize: "14px", color: "#6b5a3e", maxWidth: "480px", lineHeight: 1.6, margin: "0 0 20px 0" }}>
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
                            <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "center", gap: "12px" }}>
                              <button
                                type="button"
                                onClick={() => setCurrentStep(1)}
                                className="btn btn-primary"
                                style={{
                                  display: "inline-flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  gap: "6px",
                                  padding: "10px 22px",
                                  background: "linear-gradient(135deg, #9a6528 0%, #c4922a 100%)",
                                  color: "#ffffff",
                                  fontWeight: 700,
                                  fontSize: "13px",
                                  borderRadius: "9999px",
                                  border: "none",
                                  cursor: "pointer",
                                }}
                              >
                                <Building2 size={14} />
                                <span>Switch Branch Location</span>
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
                                  <div className="doc-portrait-wrapper" style={{ overflow: "hidden", borderRadius: "50%" }}>
                                    <Image
                                      src={doc.avatar}
                                      alt={doc.name}
                                      fill
                                      sizes="80px"
                                      style={{ objectFit: "cover", objectPosition: "top center", borderRadius: "50%" }}
                                    />
                                  </div>

                                  <div className="doc-card-info">
                                    <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>
                                      <h4 style={{ margin: 0, fontSize: "15px", fontWeight: 800, color: "#1a221f" }}>{doc.name}</h4>
                                      <span style={{ display: "inline-flex", alignItems: "center", gap: "3px", padding: "1px 7px", background: "#fef3c7", color: "#92400e", borderRadius: "999px", fontSize: "11px", fontWeight: 700, border: "1px solid #fde68a" }}>
                                        <Star size={10} fill="#d97706" color="#d97706" /> {doc.rating}
                                      </span>
                                    </div>
                                    <span className="doc-card-qual">{doc.qualification}</span>
                                    <span className="doc-card-spec">{doc.specialty}</span>
                                    <span className="doc-card-days" style={{ display: "inline-flex", alignItems: "center", gap: "4px" }}>
                                      <Calendar size={12} /> Days: {getDoctorWorkingDays(doc, selectedBranch?._id || selectedBranch?.id).join(", ")}
                                    </span>
                                  </div>

                                  <div className="doc-card-select-icon">{isSelected ? <Check size={14} /> : <Plus size={14} />}</div>
                                </div>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  <div className="apt-action-bar space-between">
                    <button type="button" className="btn btn-outline btn-prev-step" onClick={handlePrevStep} style={{ display: "inline-flex", alignItems: "center", gap: "4px" }}>
                      <ArrowLeft size={14} /> Back
                    </button>
                    <button type="button" className="btn btn-primary btn-next-step" onClick={handleNextStep} style={{ display: "inline-flex", alignItems: "center", gap: "4px" }}>
                      <span>Continue to Date & Details</span>
                      <ArrowRight size={14} />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 3: SCHEDULE & PATIENT DETAILS */}
              {currentStep === 3 && (
                <div className="apt-step-fade">
                  <div className="step-title-block">
                    <h2>
                      {bookingMode === "PACKAGE"
                        ? "Care Package Check-in & Patient Details"
                        : bookingMode === "TREATMENT"
                        ? "Therapy Schedule & Patient Details"
                        : "Schedule & Patient Registration Details"}
                    </h2>
                    <p>
                      {bookingMode === "PACKAGE"
                        ? "Select your preferred arrival date and patient contact details for admission"
                        : bookingMode === "TREATMENT"
                        ? "Select your preferred therapy date and session slot"
                        : "Select your consultation date, preferred time slot, and patient contact info"}
                    </p>
                  </div>

                  {/* SUMMARY BADGE AT TOP OF STEP 3 */}
                  {bookingMode === "PACKAGE" ? (
                    <div
                      style={{
                        padding: "16px 20px",
                        background: "linear-gradient(145deg, #fffbf4, #f8eedc)",
                        border: "1px solid rgba(181, 122, 37, 0.35)",
                        borderRadius: "16px",
                        marginBottom: "24px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        flexWrap: "wrap",
                        gap: "12px"
                      }}
                    >
                      <div>
                        <span style={{ fontSize: "11px", fontWeight: 800, color: "#b57a25", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                          Selected Care Package
                        </span>
                        <h3 style={{ fontSize: "18px", fontWeight: 700, color: "#1c2a23", margin: "2px 0 4px 0" }}>
                          {selectedPackage?.title || "Low Back Pain & Sciatica Care Package"}
                        </h3>
                        <p style={{ fontSize: "13px", color: "#556655", margin: 0 }}>
                          <strong>{selectedDurationDays} Days Residential Stay</strong> • {selectedAccommodation} • {selectedBranch?.name}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => setCurrentStep(2)}
                        className="btn btn-outline"
                        style={{ padding: "6px 16px", borderRadius: "999px", borderColor: "#b57a25", color: "#9a651e", fontWeight: 700, fontSize: "12px" }}
                      >
                        Change Package
                      </button>
                    </div>
                  ) : bookingMode === "TREATMENT" ? (
                    <div
                      style={{
                        padding: "16px 20px",
                        background: "linear-gradient(145deg, #fffbf4, #f8eedc)",
                        border: "1px solid rgba(181, 122, 37, 0.35)",
                        borderRadius: "16px",
                        marginBottom: "24px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        flexWrap: "wrap",
                        gap: "12px"
                      }}
                    >
                      <div>
                        <span style={{ fontSize: "11px", fontWeight: 800, color: "#b57a25", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                          Selected Therapy / Procedure
                        </span>
                        <h3 style={{ fontSize: "18px", fontWeight: 700, color: "#1c2a23", margin: "2px 0 4px 0" }}>
                          {selectedTreatment?.title || "Abhyangam Therapy"}
                        </h3>
                        <p style={{ fontSize: "13px", color: "#556655", margin: 0 }}>
                          Category: <strong>{selectedTreatment?.category || "Panchakarma Therapy"}</strong> • {selectedBranch?.name}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => setCurrentStep(2)}
                        className="btn btn-outline"
                        style={{ padding: "6px 16px", borderRadius: "999px", borderColor: "#b57a25", color: "#9a651e", fontWeight: 700, fontSize: "12px" }}
                      >
                        Change Therapy
                      </button>
                    </div>
                  ) : (
                    /* DOCTOR SUMMARY BADGE */
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
                        style={{ display: "inline-flex", alignItems: "center", gap: "4px" }}
                      >
                        <UserCheck size={13} />
                        <span>Change Doctor</span>
                      </button>
                    </div>
                  )}

                  {/* DATE & TIME SCHEDULING SECTION */}
                  <div className="apt-schedule-container">
                    <div className="form-group-luxury">
                      <label htmlFor="apt-date-picker" className="input-label-luxury">
                        {bookingMode === "PACKAGE" ? "Preferred Arrival / Admission Date:" : bookingMode === "TREATMENT" ? "Preferred Session Date:" : "Preferred Consultation Date:"}
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

                      {/* Doctor Availability Indicator ONLY for Doctor Mode */}
                      {bookingMode === "DOCTOR" && (
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
                              <Check size={16} color="#047857" style={{ flexShrink: 0 }} />
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
                                <AlertTriangle size={16} color="#d97706" style={{ flexShrink: 0 }} />
                                <span>
                                  {selectedDoctor?.name} does NOT conduct OPD consultations on {selectedDateDayName}s.
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
                                    border: "none",
                                    borderRadius: "9999px",
                                    cursor: "pointer",
                                  }}
                                >
                                  <Calendar size={14} />
                                  <span>Jump to Next Available Working Day</span>
                                  <ArrowRight size={14} />
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Time Slot Selection */}
                    {bookingMode === "DOCTOR" ? (
                      <div className="form-group-luxury">
                        {(() => {
                          const branchSlots = getDoctorBranchTimeSlots(selectedDoctor, selectedBranch?._id || selectedBranch?.id);
                          const slotsToShow = branchSlots.length > 0 ? branchSlots : defaultTimeSlots;
                          return (
                            <>
                              <label className="input-label-luxury">
                                Available Time Slots ({selectedDateDayName}):
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
                    ) : bookingMode === "PACKAGE" ? (
                      <div className="form-group-luxury">
                        <label className="input-label-luxury">Preferred Arrival Time Window:</label>
                        <div className="apt-time-slots-grid" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))" }}>
                          {[
                            { id: "arrival-m1", label: "09:00 AM - 12:00 PM", period: "Morning Check-in" },
                            { id: "arrival-a1", label: "01:00 PM - 04:00 PM", period: "Afternoon Check-in" },
                            { id: "arrival-e1", label: "04:00 PM - 07:00 PM", period: "Evening Check-in" },
                          ].map((slot) => (
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
                    ) : (
                      <div className="form-group-luxury">
                        <label className="input-label-luxury">Preferred Therapy Session Slot:</label>
                        <div className="apt-time-slots-grid" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))" }}>
                          {[
                            { id: "trt-m1", label: "09:00 AM", period: "Morning Therapy" },
                            { id: "trt-m2", label: "11:00 AM", period: "Morning Therapy" },
                            { id: "trt-a1", label: "02:30 PM", period: "Afternoon Therapy" },
                            { id: "trt-e1", label: "05:00 PM", period: "Evening Therapy" },
                          ].map((slot) => (
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
                    )}
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
                      <label htmlFor="p-concern" className="input-label-luxury">Describe Health Concern / Medical Requirements</label>
                      <textarea
                        id="p-concern"
                        rows={3}
                        placeholder="Mention symptoms e.g., low back pain, joint stiffness, skin rash, digestion issues, room preferences..."
                        value={healthConcern}
                        onChange={(e) => setHealthConcern(e.target.value)}
                        className="apt-field-input"
                      />
                    </div>
                  </div>

                  <div className="apt-action-bar space-between">
                    <button type="button" className="btn btn-outline btn-prev-step" onClick={handlePrevStep} style={{ display: "inline-flex", alignItems: "center", gap: "4px" }}>
                      <ArrowLeft size={14} /> Back
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting || (bookingMode === "DOCTOR" && !isDoctorAvailable)}
                      className={`btn btn-primary btn-submit-final ${bookingMode === "DOCTOR" && !isDoctorAvailable ? "opacity-50 cursor-not-allowed" : ""}`}
                      style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}
                    >
                      <span>
                        {isSubmitting
                          ? "Submitting Request..."
                          : bookingMode === "PACKAGE"
                          ? "Confirm Package Booking Request"
                          : bookingMode === "TREATMENT"
                          ? "Confirm Therapy Reservation"
                          : "Confirm & Request Booking"}
                      </span>
                      {!isSubmitting && <Check size={16} />}
                    </button>
                  </div>
                </div>
              )}
            </form>
          ) : (
            /* SUCCESS CONFIRMATION STATE */
            <div className="apt-success-screen-luxury text-center py-8 space-y-6">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                <Check size={32} />
              </div>
              <div>
                <span className="text-xs uppercase tracking-widest font-bold text-susrutha-brand">Request Confirmed</span>
                <h2 className="text-2xl font-bold text-foreground mt-1">
                  {bookingMode === "PACKAGE"
                    ? "Care Package Request Submitted!"
                    : bookingMode === "TREATMENT"
                    ? "Therapy Reservation Submitted!"
                    : "Appointment Request Submitted!"}
                </h2>
                <p className="text-sm text-muted-foreground mt-1">
                  Reference Code: <strong className="font-mono text-foreground">{bookingReference}</strong>
                </p>
              </div>

              <div className="max-w-md mx-auto p-5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-left space-y-3 text-xs">
                <div className="flex items-center justify-between border-b border-border pb-2">
                  <span className="text-muted-foreground">Patient:</span>
                  <strong className="text-foreground">{patientName} ({patientPhone})</strong>
                </div>
                {bookingMode === "PACKAGE" ? (
                  <>
                    <div className="flex items-center justify-between border-b border-border pb-2">
                      <span className="text-muted-foreground">Package:</span>
                      <strong className="text-foreground">{selectedPackage?.title}</strong>
                    </div>
                    <div className="flex items-center justify-between border-b border-border pb-2">
                      <span className="text-muted-foreground">Duration & Room:</span>
                      <strong className="text-foreground">{selectedDurationDays} Days Stay • {selectedAccommodation}</strong>
                    </div>
                  </>
                ) : bookingMode === "TREATMENT" ? (
                  <div className="flex items-center justify-between border-b border-border pb-2">
                    <span className="text-muted-foreground">Therapy:</span>
                    <strong className="text-foreground">{selectedTreatment?.title}</strong>
                  </div>
                ) : (
                  <div className="flex items-center justify-between border-b border-border pb-2">
                    <span className="text-muted-foreground">Doctor:</span>
                    <strong className="text-foreground">{selectedDoctor?.name}</strong>
                  </div>
                )}
                <div className="flex items-center justify-between border-b border-border pb-2">
                  <span className="text-muted-foreground">Campus Branch:</span>
                  <strong className="text-foreground">{selectedBranch?.name}</strong>
                </div>
                <div className="flex items-center justify-between border-b border-border pb-2">
                  <span className="text-muted-foreground">Scheduled Date:</span>
                  <strong className="text-foreground">{appointmentDate}</strong>
                </div>
              </div>

              <p className="text-xs text-muted-foreground max-w-sm mx-auto">
                Our patient care coordinator at {selectedBranch?.name} will call you back shortly on <strong>{patientPhone}</strong> to confirm your schedule.
              </p>

              <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "center", gap: "14px", marginTop: "24px", paddingTop: "12px" }}>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleReset}
                  style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", height: "48px", padding: "0 26px", borderRadius: "999px", fontWeight: 700, fontSize: "14px", cursor: "pointer", background: "linear-gradient(135deg, #b57a25, #9a651e)", color: "#ffffff", border: "none" }}
                >
                  Book Another Service
                </button>
                <a
                  href={`https://wa.me/919447003191?text=Hello%20Susrutha%20Ayurveda,%20I%20have%20submitted%20a%20booking%20request%20${bookingReference}%20for%20${patientName}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "8px", height: "48px", padding: "0 26px", borderRadius: "999px", fontWeight: 700, fontSize: "14px", background: "#25D366", color: "#ffffff", textDecoration: "none", boxShadow: "0 4px 14px rgba(37, 211, 102, 0.35)", border: "none" }}
                >
                  <Phone size={16} />
                  <span>Confirm via WhatsApp Desk</span>
                </a>
              </div>
            </div>
          )}
        </div>

        {/* Dynamic Sidebar Summary Pass */}
        <aside className="apt-sidebar-summary-luxury">
          <div className="apt-summary-card-inner">
            <h3 className="summary-title">
              {bookingMode === "PACKAGE" ? "Care Package Pass" : bookingMode === "TREATMENT" ? "Therapy Pass" : "Consultation Pass"}
            </h3>

            {bookingMode === "PACKAGE" ? (
              <div className="summary-doc-header" style={{ display: "flex", flexDirection: "column", gap: "6px", width: "100%", gridTemplateColumns: "1fr" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <div style={{ width: "40px", height: "40px", borderRadius: "10px", background: "linear-gradient(135deg, #b57a25, #9a651e)", display: "flex", alignItems: "center", justifyContent: "center", color: "#ffffff", flexShrink: 0 }}>
                    <Sparkles size={20} />
                  </div>
                  <span style={{ fontSize: "11px", fontWeight: 800, color: "#b57a25", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                    {selectedPackage?.category || "Residential Program"}
                  </span>
                </div>
                <div style={{ marginTop: "4px" }}>
                  <h4 className="summary-doc-name" style={{ fontSize: "16px", fontWeight: 700, color: "#1c2a23", lineHeight: 1.35, margin: "0 0 4px 0" }}>
                    {selectedPackage?.title || "Low Back Pain Care Package"}
                  </h4>
                  <span className="summary-doc-spec" style={{ color: "#2d4d3a", fontWeight: 700, fontSize: "13px" }}>
                    Starts at ₹{selectedPackage?.startingPrice ? selectedPackage.startingPrice.toLocaleString("en-IN") : "14,500"}
                  </span>
                </div>
              </div>
            ) : bookingMode === "TREATMENT" ? (
              <div className="summary-doc-header" style={{ display: "flex", flexDirection: "column", gap: "6px", width: "100%", gridTemplateColumns: "1fr" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <div style={{ width: "40px", height: "40px", borderRadius: "10px", background: "linear-gradient(135deg, #b57a25, #9a651e)", display: "flex", alignItems: "center", justifyContent: "center", color: "#ffffff", flexShrink: 0 }}>
                    <Activity size={20} />
                  </div>
                  <span style={{ fontSize: "11px", fontWeight: 800, color: "#b57a25", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                    {selectedTreatment?.category || "Ayurvedic Therapy"}
                  </span>
                </div>
                <div style={{ marginTop: "4px" }}>
                  <h4 className="summary-doc-name" style={{ fontSize: "16px", fontWeight: 700, color: "#1c2a23", lineHeight: 1.35, margin: 0 }}>
                    {selectedTreatment?.title || "Abhyangam Therapy"}
                  </h4>
                </div>
              </div>
            ) : (
              <div className="summary-doc-header">
                <div className="summary-doc-avatar">
                  <Image
                    src={selectedDoctor?.avatar}
                    alt={selectedDoctor?.name || "Doctor"}
                    width={64}
                    height={64}
                    style={{ objectFit: "cover", width: "100%", height: "100%", borderRadius: "50%", display: "block" }}
                  />
                </div>
                <div>
                  <h4 className="summary-doc-name">{selectedDoctor?.name}</h4>
                  <span className="summary-doc-spec">{selectedDoctor?.specialty}</span>
                  <span className="summary-doc-rating" style={{ display: "inline-flex", alignItems: "center", gap: "3px" }}>
                    <Star size={11} fill="#d97706" color="#d97706" /> {selectedDoctor?.rating} • {selectedDoctor?.experience}
                  </span>
                </div>
              </div>
            )}

            <div className="summary-details-list">
              <div className="summary-item">
                <span>Booking Type:</span>
                <strong>
                  {bookingMode === "PACKAGE" ? "Ayur Village Stay" : bookingMode === "TREATMENT" ? "Therapy Session" : "Hospital OPD Visit"}
                </strong>
              </div>

              {bookingMode === "PACKAGE" ? (
                <>
                  <div className="summary-item">
                    <span>Stay Duration:</span>
                    <strong>{selectedDurationDays} Days Stay</strong>
                  </div>
                  <div className="summary-item">
                    <span>Accommodation:</span>
                    <strong>{selectedAccommodation}</strong>
                  </div>
                </>
              ) : bookingMode === "DOCTOR" ? (
                <div className="summary-item">
                  <span>Department:</span>
                  <strong>{selectedSpecialty?.title}</strong>
                </div>
              ) : null}

              <div className="summary-item">
                <span>Campus Branch:</span>
                <strong>{selectedBranch?.name}</strong>
              </div>

              <div className="summary-item">
                <span>Preferred Date:</span>
                <strong>{appointmentDate}</strong>
              </div>

              {bookingMode === "DOCTOR" && (
                <div className="summary-item">
                  <span>Time Slot:</span>
                  <strong>{selectedSlot?.label}</strong>
                </div>
              )}
            </div>

            <div className="summary-guarantees">
              <div className="guarantee-line"><Check size={13} color="#16a34a" style={{ display: "inline-block", verticalAlign: "-1px", marginRight: "6px" }} /> Zero pre-booking charges</div>
              <div className="guarantee-line"><Check size={13} color="#16a34a" style={{ display: "inline-block", verticalAlign: "-1px", marginRight: "6px" }} /> Free date modification up to 4 hours prior</div>
              <div className="guarantee-line"><Check size={13} color="#16a34a" style={{ display: "inline-block", verticalAlign: "-1px", marginRight: "6px" }} /> Instant SMS & WhatsApp confirmation</div>
            </div>

            <div className="summary-support-box">
              <span>Need Direct Booking Assistance?</span>
              <a href="tel:+919447003191" className="support-phone-link">
                <Phone size={15} style={{ display: "inline-block", verticalAlign: "-2px", marginRight: "6px", color: "#c88922" }} />
                Call Helpline: +91 94470 03191
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
