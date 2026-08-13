import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { doctorsData, DoctorItem } from "./doctorsData";

type OptionItem = {
  id: string;
  iconClass: string;
  title: string;
  deptId: string;
};

const healthOptions: OptionItem[] = [
  { id: "panchakarma", iconClass: "fa-solid fa-spa", title: "Panchakarma & Body Detox", deptId: "panchakarma" },
  { id: "spine", iconClass: "fa-solid fa-bone", title: "Spine, Joint & Back Pain", deptId: "spine-joints" },
  { id: "womens", iconClass: "fa-solid fa-venus", title: "Women's Health & PCOS", deptId: "womens-health" },
  { id: "lifestyle", iconClass: "fa-solid fa-leaf", title: "Diabetes & Lifestyle Care", deptId: "lifestyle-detox" },
  { id: "skin", iconClass: "fa-solid fa-heart-pulse", title: "Skin Psoriasis & Allergies", deptId: "skin-hair" },
];

export function DoctorMatchAssistant() {
  const [selectedOptId, setSelectedOptId] = useState<string>("panchakarma");

  const matchedDoctor: DoctorItem =
    doctorsData.find((d) => d.departmentId === selectedOptId) || doctorsData[0];

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

        {/* Step 1 Options Grid */}
        <div className="doctors-assistant-grid">
          {healthOptions.map((opt) => (
            <div
              key={opt.id}
              className={`doctors-assistant-option ${selectedOptId === opt.deptId ? "selected" : ""}`}
              onClick={() => setSelectedOptId(opt.deptId)}
            >
              <div className="doctors-assistant-opt-icon"><i className={opt.iconClass} /></div>
              <div className="doctors-assistant-opt-title">{opt.title}</div>
            </div>
          ))}
        </div>

        {/* Match Result Banner */}
        {matchedDoctor && (
          <div className="doctors-assistant-result">
            <div className="doctors-assistant-result-info">
              <Image
                src={matchedDoctor.image}
                alt={matchedDoctor.name}
                width={60}
                height={60}
                className="doctors-assistant-doc-avatar"
                unoptimized
              />
              <div>
                <div style={{ fontSize: 12, textTransform: "uppercase", color: "#f7a51a", fontWeight: 800 }}>
                  Recommended Specialist
                </div>
                <div style={{ fontSize: 18, fontWeight: 700, color: "#ffffff" }}>
                  {matchedDoctor.name}
                </div>
                <div style={{ fontSize: 13, color: "rgba(255,255,255,0.8)" }}>
                  {matchedDoctor.qualification} • {matchedDoctor.experienceText} Practice
                </div>
              </div>
            </div>

            <Link
              href={`/appointment?doctor=${matchedDoctor.slug}`}
              className="doctors-cta-btn"
              style={{ background: "#ffffff", color: "#d61f2b" }}
            >
              <i className="fa-solid fa-calendar-days" style={{ marginRight: "6px" }} />
              Book with {matchedDoctor.name.split(" ")[1] || "Vaidya"}
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
