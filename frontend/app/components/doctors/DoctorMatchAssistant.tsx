import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Check, Award, CalendarCheck } from "lucide-react";
import { DoctorItem } from "./DoctorCard";

import { getImageDisplayUrl } from "@/app/services/api";

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
    image: getImageDisplayUrl("/uploads/treatment-panchakarma.webp"),
    title: "Panchakarma & Body Detox",
    subtitle: "Purification & Rejuvenation",
    deptId: "panchakarma",
  },
  {
    id: "spine-joints",
    image: getImageDisplayUrl("/uploads/opt_spine_joint.jpg"),
    title: "Spine, Joints & Bone Care",
    subtitle: "Kati Vasthi & Pain Care",
    deptId: "spine-joints",
  },
  {
    id: "womens-health",
    image: getImageDisplayUrl("/uploads/dept_fertilization.webp"),
    title: "Women's Health & Wellness",
    subtitle: "Hormonal & Gynaec Care",
    deptId: "womens-health",
  },
  {
    id: "lifestyle-detox",
    image: getImageDisplayUrl("/uploads/ayur_nutri.webp"),
    title: "Metabolic & Lifestyle Care",
    subtitle: "Diabetes & Metabolism",
    deptId: "lifestyle-detox",
  },
  {
    id: "skin",
    image: getImageDisplayUrl("/uploads/dept_general.webp"),
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
                    <Check size={14} strokeWidth={2.5} />
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
                <div className="doctors-assistant-rec-eyebrow" style={{ display: "inline-flex", alignItems: "center", gap: 5 }}>
                  <Award size={14} strokeWidth={1.75} /> Recommended Specialist
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
              style={{ display: "inline-flex", alignItems: "center", gap: 8 }}
            >
              <CalendarCheck size={16} strokeWidth={1.75} />
              Book with {matchedDoctor.name.split(" ")[1] || "Vaidya"}
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
