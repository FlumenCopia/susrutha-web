import type { Metadata } from "next";
import { SiteShell } from "../components/common/SiteShell";
import { AyurVillagePage } from "../components/ayur-village/AyurVillagePage";

export const metadata: Metadata = {
  title: "Ayurveda Village Kerala | Nature-Integrated Inpatient Wellness | Susrutha",
  description:
    "Experience traditional healing in an eco-friendly sanctuary. Long-term Panchakarma retreat, organic Ayurvedic dining, yoga, and meditation in Thiruvananthapuram, Kerala.",
  keywords: [
    "ayurveda village kerala",
    "inpatient ayurvedic retreat trivandrum",
    "traditional wellness village kerala",
    "panchakarma retreat thiruvananthapuram",
  ],
  alternates: {
    canonical: "https://susruthaayurveda.com/ayurveda-village",
  },
  openGraph: {
    title: "Ayurveda Village Kerala | Nature-Integrated Inpatient Wellness | Susrutha",
    description:
      "A serene healing retreat blending classical Ayurvedic therapies with natural living in Thiruvananthapuram, Kerala.",
    url: "https://susruthaayurveda.com/ayurveda-village",
  },
};

export default function AyurvedaVillageRoute() {
  return (
    <SiteShell>
      <AyurVillagePage />
    </SiteShell>
  );
}
