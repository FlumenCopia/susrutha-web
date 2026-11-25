import type { Metadata } from "next";
import { SiteShell } from "../components/common/SiteShell";
import { TreatmentsPageContent } from "../components/inner/TreatmentsPageContent";

export const metadata: Metadata = {
  title: "Authentic Ayurvedic Treatments & Panchakarma Therapies in Trivandrum | Susrutha Ayurveda",
  description:
    "Explore authentic Ayurvedic treatments in Thiruvananthapuram: Classical Panchakarma, Abhyangam, Shirodhara, Kizhi, spine care, and stroke rehabilitation at our Kowdiar and Kattakada centers.",
  keywords: [
    "ayurvedic treatments trivandrum",
    "panchakarma therapies kerala",
    "shirodhara kowdiar",
    "abhyangam trivandrum",
    "ayurvedic spine care kerala",
    "susrutha treatments",
  ],
  alternates: {
    canonical: "https://susruthaayurveda.com/treatments",
  },
  openGraph: {
    title: "Authentic Ayurvedic Treatments & Panchakarma Therapies in Trivandrum | Susrutha Ayurveda",
    description:
      "Doctor-supervised classical Panchakarma and specialized healing therapies across our Kowdiar and Kattakada centers in Thiruvananthapuram.",
    url: "https://susruthaayurveda.com/treatments",
  },
};

export default function TreatmentsPage() {
  return (
    <SiteShell>
      <TreatmentsPageContent />
    </SiteShell>
  );
}
