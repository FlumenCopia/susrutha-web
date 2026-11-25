import type { Metadata } from "next";
import { InternationalPatientsPage } from "../components/international-patients/InternationalPatientsPage";
import { SiteShell } from "../components/common/SiteShell";

export const metadata: Metadata = {
  title: "Ayurveda Treatment in Kerala, India for International Patients | Susrutha Ayurveda",
  description:
    "Comprehensive Ayurvedic medical tourism in Thiruvananthapuram, Kerala. Medical visa assistance, airport transfers from TRV Airport, 7/14/21-day inpatient Panchakarma, and English-speaking care.",
  keywords: [
    "ayurveda for foreigners kerala",
    "panchakarma retreat india cost",
    "ayurvedic hospital for international patients",
    "ayurveda medical visa kerala",
    "kerala ayurveda wellness packages foreigners",
  ],
  alternates: {
    canonical: "https://susruthaayurveda.com/international-patients",
  },
  openGraph: {
    title: "Ayurveda Treatment in Kerala, India for International Patients | Susrutha Ayurveda",
    description:
      "World-class authentic Ayurvedic healthcare for global patients in Kerala, India. Dedicated concierge, airport transfer from TRV, and physician-supervised Panchakarma.",
    url: "https://susruthaayurveda.com/international-patients",
  },
};

export default function InternationalPatientsRoute() {
  return (
    <SiteShell>
      <InternationalPatientsPage />
    </SiteShell>
  );
}
