import type { Metadata } from "next";
import { SiteShell } from "../components/common/SiteShell";
import { PackagesPage } from "../components/packages/PackagesPage";

export const metadata: Metadata = {
  title: "Ayurvedic Treatment & Panchakarma Packages in Kerala | Susrutha Ayurveda",
  description:
    "Choose from 7-day, 14-day, and 21-day authentic Kerala Ayurvedic packages: Rejuvenation, Spine & Joint Care, Stress Relief, Weight Management, and Postnatal Care in Trivandrum.",
  keywords: [
    "ayurvedic packages kerala",
    "panchakarma package cost trivandrum",
    "7 days ayurveda package kerala",
    "spine care package ayurveda",
    "panchakarma treatment packages india",
  ],
  alternates: {
    canonical: "https://susruthaayurveda.com/packages",
  },
  openGraph: {
    title: "Ayurvedic Treatment & Panchakarma Packages in Kerala | Susrutha Ayurveda",
    description:
      "All-inclusive inpatient and daycare Panchakarma packages in Thiruvananthapuram. Consultation, treatments, medicines, and sattvic diet included.",
    url: "https://susruthaayurveda.com/packages",
  },
};

export default function PackagesRoute() {
  return (
    <SiteShell>
      <PackagesPage />
    </SiteShell>
  );
}
