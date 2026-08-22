"use client";

import React from "react";
import { Clock, Sun, Moon, Utensils, HeartPulse, Stethoscope } from "lucide-react";

const routineTimeline = [
  {
    time: "06:00 AM - 06:30 AM",
    title: "Ushapanam & Herbal Infusion",
    desc: "Warm herbal decoction (Kashayam) tailored to your dosha constitution served in your cottage verandah.",
    icon: Clock,
  },
  {
    time: "06:30 AM - 07:30 AM",
    title: "Gentle Pranayama & Meditation",
    desc: "Guided breathing sessions in the open garden pavilion to align prana and mental clarity.",
    icon: Sun,
  },
  {
    time: "08:30 AM - 09:30 AM",
    title: "Sattvic Pathya Breakfast",
    desc: "Fresh, easily digestible organic breakfast cooked according to traditional Ayurvedic dietary rules.",
    icon: Utensils,
  },
  {
    time: "09:30 AM - 12:30 PM",
    title: "Main Panchakarma Therapy",
    desc: "Abhyangam, Shirodhara, Pizhichil, or Njavarakizhi in private wooden droni treatment suite supervised by Vaidya.",
    icon: HeartPulse,
  },
  {
    time: "01:00 PM - 02:00 PM",
    title: "Pathya Lunch & Rest",
    desc: "Balanced medicinal meal followed by restful recovery in air-conditioned heritage cottages.",
    icon: Utensils,
  },
  {
    time: "04:30 PM - 05:30 PM",
    title: "Evening Vaidya Consult & Second Therapy",
    desc: "Daily pulse diagnosis (Nadi Pariksha) review by Chief Vaidya and secondary herbal steam/kizhi application.",
    icon: Stethoscope,
  },
  {
    time: "07:30 PM - 08:30 PM",
    title: "Light Pathya Dinner & Sleep Hygiene",
    desc: "Early light dinner and warm herbal bedtime formulation ensuring deep rest for tissue healing.",
    icon: Moon,
  },
];

export function AyurVillageRoutineSection() {
  return (
    <section style={{ padding: "48px 20px", background: "#ffffff" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", maxWidth: "700px", margin: "0 auto 36px" }}>
          <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", padding: "4px 14px", borderRadius: "999px", background: "rgba(181, 122, 37, 0.12)", color: "#9a651e", fontWeight: 800, fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "10px" }}>
            Gramam Dinacharya
          </span>
          <h2 style={{ fontSize: "28px", fontWeight: 800, color: "#1c2a23", marginBottom: "8px", lineHeight: "1.25" }}>
            A Day at Susrutha Ayur Village
          </h2>
          <p style={{ fontSize: "14.5px", color: "#556655", lineHeight: "1.55" }}>
            Healing at Gramam follows the classical Ayurvedic daily rhythm (Dinacharya) designed to maximize metabolic absorption and cellular rejuvenation.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "20px" }}>
          {routineTimeline.map((item, idx) => {
            const IconComponent = item.icon;
            return (
              <div
                key={item.title}
                style={{
                  padding: "24px",
                  borderRadius: "20px",
                  background: "linear-gradient(145deg, #fdfbf7, #f7f2e8)",
                  border: "1px solid rgba(181, 122, 37, 0.2)",
                  boxShadow: "0 4px 16px rgba(0, 0, 0, 0.02)",
                  display: "flex",
                  flexDirection: "column",
                  gap: "12px",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <span style={{ fontSize: "12px", fontWeight: 800, color: "#b57a25", letterSpacing: "0.04em" }}>
                    {item.time}
                  </span>
                  <div style={{ width: "36px", height: "36px", borderRadius: "50%", background: "rgba(181, 122, 37, 0.15)", color: "#9a651e", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <IconComponent size={18} />
                  </div>
                </div>
                <h3 style={{ fontSize: "17px", fontWeight: 700, color: "#1c2a23", margin: 0 }}>
                  {item.title}
                </h3>
                <p style={{ fontSize: "13.5px", color: "#556655", lineHeight: "1.55", margin: 0 }}>
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
