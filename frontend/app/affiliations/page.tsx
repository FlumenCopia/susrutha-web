import { Metadata } from "next";
import { SiteShell } from "../components/common/SiteShell";
import { AffiliationsPage } from "../components/affiliations/AffiliationsPage";

export const metadata: Metadata = {
  title: "International Affiliations & Global Collaboration | Susrutha Ayurveda",
  description:
    "Explore Susrutha Ayurveda's international clinical and scientific collaboration with Dr. Satish Asotra (USA) bridging authentic Kerala Ayurveda with modern medical science and global patient care.",
  openGraph: {
    title: "International Affiliations & Global Collaboration | Susrutha Ayurveda",
    description:
      "Bridging 55+ years of authentic Kerala Ayurvedic heritage with Western scientific research and global healthcare, in official collaboration with Dr. Satish Asotra (USA).",
    images: ["/images/banner_holistic_health.jpg"],
  },
};

export default function AffiliationsRoute() {
  return (
    <SiteShell>
      <AffiliationsPage />
    </SiteShell>
  );
}
