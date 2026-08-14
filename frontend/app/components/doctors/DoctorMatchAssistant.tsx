import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { doctorsData, DoctorItem } from "./doctorsData";

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
    id: "spine",
    image: "/images/opt_spine_joint.jpg",
    title: "Spine, Joint & Back Pain",
    subtitle: "Kati Vasti & Musculoskeletal",
    deptId: "spine-joints",
  },
  {
    id: "womens",
    image: "/images/opt_womens_health.jpg",
    title: "Women's Health & PCOS",
    subtitle: "Hormonal & Holistic Care",
    deptId: "womens-health",
  },
  {
    id: "lifestyle",
    image: "/images/opt_lifestyle_diabetes.jpg",
    title: "Diabetes & Lifestyle Care",
    subtitle: "Metabolic Wellness & Herbs",
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

export function DoctorMatchAssistant() {
  const [selectedOptId, setSelectedOptId] = useState<string>("panchakarma");

  const matchedDoctor: DoctorItem =
    doctorsData.find((d) => d.departmentId === selectedOptId) || doctorsData[0];

  return (
    <section className="doctors-assistant-section">
      <div className="doctors-assistant-card">
        <div className="doctors-assistant-header">
          <span className="doctors-assistant-tag">
            <i className="fa-solid fa-sparkles" style={{ marginRight: 6 }} /> Smart Specialist Matcher
          </span>
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
