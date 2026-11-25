import type { Metadata } from "next";
import { SiteShell } from "../components/common/SiteShell";
import { ConditionsBanner } from "../components/inner/ConditionsBanner";
import { ConditionsContentSection } from "../components/inner/ConditionsContentSection";

export const metadata: Metadata = {
  title: "Ayurvedic Treatment for Chronic Diseases in Trivandrum, Kerala | Susrutha Ayurveda",
  description:
    "Non-surgical Ayurvedic management for disc bulge, sciatica, cervical spondylosis, osteoarthritis, stroke recovery, and PCOD at Susrutha Ayurveda Hospital (Kattakada & Kowdiar).",
  keywords: [
    "ayurvedic disease treatment trivandrum",
    "sciatica ayurveda kerala",
    "slip disc ayurvedic hospital trivandrum",
    "stroke rehabilitation ayurveda",
    "pcod ayurvedic treatment trivandrum",
    "arthritis ayurvedic clinic kowdiar",
  ],
  alternates: {
    canonical: "https://susruthaayurveda.com/conditions",
  },
  openGraph: {
    title: "Ayurvedic Treatment for Chronic Diseases in Trivandrum, Kerala | Susrutha Ayurveda",
    description:
      "Clinical Ayurvedic care for spine, neurological, joint, and metabolic disorders by experienced Vaidyas in Thiruvananthapuram.",
    url: "https://susruthaayurveda.com/conditions",
  },
};

export default function ConditionsPage() {
  return (
    <SiteShell>
      <div className="conditions-page">
        <ConditionsBanner />
        <ConditionsContentSection />
      </div>
    </SiteShell>
  );
}
