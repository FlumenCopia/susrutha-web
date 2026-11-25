import type { Metadata } from "next";
import { SiteShell } from "./components/common/SiteShell";
import { HomePage } from "./components/home/HomePage";
import { generateMedicalClinicSchema } from "./utils/jsonLd";

export const metadata: Metadata = {
  title: "Best Ayurvedic Hospital in Trivandrum & Kowdiar | Susrutha Ayurveda Kerala",
  description:
    "Top-rated Ayurvedic hospital & Panchakarma clinic in Thiruvananthapuram (Kowdiar & Kattakada). Specialized in spine care, disc bulge, arthritis, stroke rehabilitation, and authentic Panchakarma by senior MD physicians.",
  keywords: [
    "best ayurvedic hospital in trivandrum",
    "ayurvedic clinic in kowdiar",
    "ayurvedic hospital in thiruvananthapuram",
    "panchakarma treatment in kerala",
    "best ayurvedic doctor in trivandrum",
    "susrutha ayurveda",
    "ayurvedic spine treatment trivandrum",
    "ayurvedic stroke rehabilitation kerala",
    "panchakarma centre kowdiar",
  ],
  alternates: {
    canonical: "https://susruthaayurveda.com",
  },
  openGraph: {
    title: "Best Ayurvedic Hospital in Trivandrum & Kowdiar | Susrutha Ayurveda Kerala",
    description:
      "40+ years of institutional heritage. Authentic Panchakarma, non-surgical spine care, and stroke rehabilitation across our 40-bed Kattakada hospital campus and Kowdiar clinic.",
    url: "https://susruthaayurveda.com",
    siteName: "Susrutha Ayurveda",
    locale: "en_IN",
    type: "website",
  },
};

export default function Home() {
  const clinicSchema = generateMedicalClinicSchema();

  return (
    <SiteShell>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(clinicSchema) }}
      />
      <HomePage />
    </SiteShell>
  );
}
