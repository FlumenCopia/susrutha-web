import type { Metadata } from "next";
import { SiteShell } from "../components/common/SiteShell";
import { AboutPremiumPage } from "../components/inner/AboutPremiumPage";

export const metadata: Metadata = {
  title: "About Susrutha Ayurveda | Heritage, Founders & Clinical Excellence | Trivandrum",
  description:
    "Founded by Prof. Dr. Krishnankutty Nair (Ex-HoD Panchakarma, Govt. Ayurveda College, Trivandrum), Susrutha combines 40+ years of classical lineage with research-backed hospital care in Kerala.",
  keywords: [
    "about susrutha ayurveda",
    "dr krishnankutty nair ayurveda",
    "ayurvedic hospital history trivandrum",
    "authentic ayurveda kerala",
    "susrutha institute of ayurvedic sciences",
  ],
  alternates: {
    canonical: "https://susruthaayurveda.com/about-us",
  },
  openGraph: {
    title: "About Susrutha Ayurveda | Heritage, Founders & Clinical Excellence | Trivandrum",
    description:
      "Discover the lineage and medical philosophy of Susrutha Institute of Ayurvedic Sciences, serving patients for over 40 years across Thiruvananthapuram.",
    url: "https://susruthaayurveda.com/about-us",
  },
};

export default function AboutUsPage() {
  return (
    <SiteShell>
      <AboutPremiumPage />
    </SiteShell>
  );
}
