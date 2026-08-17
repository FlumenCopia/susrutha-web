import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { DoctorItem } from "./DoctorCard";

type DoctorMatchAssistantProps = {
  doctors?: DoctorItem[];
};

type OptionItem = {
  id: string;
  image: string;
  title: string;
  subtitle: string;
  deptId: string;
};

const healthOptions: OptionItem[] = [
  {
    id: "panchakarma",
    image: "/images/opt_panchakarma.jpg",
    title: "Panchakarma & Body Detox",
    subtitle: "Purification & Rejuvenation",
    deptId: "panchakarma",
  },
  {
    id: "spine-joints",
    image: "/images/opt_spine.jpg",
    title: "Spine, Joints & Bone Care",
    subtitle: "Kati Vasthi & Pain Care",
    deptId: "spine-joints",
  },
  {
    id: "womens-health",
    image: "/images/opt_women.jpg",
    title: "Women's Health & Wellness",
    subtitle: "Hormonal & Gynaec Care",
    deptId: "womens-health",
  },
  {
    id: "lifestyle-detox",
    image: "/images/opt_lifestyle.jpg",
    title: "Metabolic & Lifestyle Care",
    subtitle: "Diabetes & Metabolism",
    deptId: "lifestyle-detox",
  },
  {
    id: "skin",
    image: "/images/opt_skin_allergies.jpg",
    title: "Skin Psoriasis & Allergies",
    subtitle: "Ayurvedic Dermatology",
    deptId: "skin-hair",
  },
];

export function DoctorMatchAssistant({ doctors = [] }: DoctorMatchAssistantProps) {
  const [selectedOptId, setSelectedOptId] = useState<string>("panchakarma");

  const matchedDoctor: DoctorItem | undefined =
    doctors.find((d) => d.departmentId === selectedOptId) || doctors[0];

  return (
    <section className="doctors-assistant-section">
      <div className="doctors-assistant-card">
        <div className="doctors-assistant-header">
          <span className="doctors-assistant-tag">Smart Assistant</span>
          <h2 className="doctors-assistant-title">Need Help Choosing the Right Vaidya?</h2>
          <p className="doctors-assistant-desc">
            Select your primary health concern below and get instantly matched with Susrutha’s chief clinical specialist.
          </p>
        </div>

        {/* Health Concern Option Cards */}
        <div className="doctors-assistant-grid">
          {healthOptions.map((opt) => (
            <button
              key={opt.id}
              type="button"
              className={`doctors-assistant-option ${selectedOptId === opt.deptId ? "selected" : ""}`}
              onClick={() => setSelectedOptId(opt.deptId)}
            >
              <div className="doctors-assistant-opt-img-wrap">
                <Image
                  src={opt.image}
                  alt={opt.title}
                  width={140}
                  height={140}
                  className="doctors-assistant-opt-img"
                  unoptimized
                />
                {selectedOptId === opt.deptId && (
                  <span className="doctors-assistant-check-badge">
                    <i className="fa-solid fa-check" />
                  </span>
                )}
              </div>
              <div className="doctors-assistant-opt-copy">
                <div className="doctors-assistant-opt-title">{opt.title}</div>
                <div className="doctors-assistant-opt-sub">{opt.subtitle}</div>
              </div>
            </button>
          ))}
        </div>

        {/* Recommended Specialist Match Result */}
        {matchedDoctor && (
          <div className="doctors-assistant-result">
            <div className="doctors-assistant-result-info">
              <div className="doctors-assistant-avatar-wrap">
                <Image
                  src={matchedDoctor.image}
                  alt={matchedDoctor.name}
                  width={72}
                  height={72}
                  className="doctors-assistant-doc-avatar"
                  unoptimized
                />
                <span className="doctors-assistant-status-dot" />
              </div>
              <div className="doctors-assistant-doc-details">
                <div className="doctors-assistant-rec-eyebrow">
                  <i className="fa-solid fa-award" style={{ marginRight: 5 }} /> Recommended Specialist
                </div>
                <h4 className="doctors-assistant-doc-name">{matchedDoctor.name}</h4>
                <p className="doctors-assistant-doc-sub">
                  {matchedDoctor.qualification} • {matchedDoctor.experienceText} Practice
                </p>
              </div>
            </div>

            <Link
              href={`/appointment?doctor=${matchedDoctor.slug}`}
              className="doctors-assistant-book-btn"
            >
              <i className="fa-solid fa-calendar-check" />
              Book with {matchedDoctor.name.split(" ")[1] || "Vaidya"}
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
