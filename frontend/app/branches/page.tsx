import type { Metadata } from "next";
import { SiteShell } from "../components/common/SiteShell";
import { BranchesPremiumPage } from "../components/branches/BranchesPremiumPage";

export const metadata: Metadata = {
  title: "Ayurvedic Hospital & Clinic Branches in Trivandrum | Kowdiar & Kattakada",
  description:
    "Visit Susrutha Ayurveda in Thiruvananthapuram: Executive OPD Clinic in Kowdiar (Opp. Income Tax Office) and 40-bed Inpatient Hospital Campus in Kattakada. Consult senior Ayurvedic doctors.",
  keywords: [
    "ayurvedic clinic in kowdiar",
    "ayurvedic hospital kattakada",
    "ayurveda centre trivandrum",
    "panchakarma kowdiar",
    "susrutha ayurveda branches",
    "ayurvedic doctor near kowdiar palace",
  ],
  alternates: {
    canonical: "https://susruthaayurveda.com/branches",
  },
  openGraph: {
    title: "Ayurvedic Hospital & Clinic Branches in Trivandrum | Kowdiar & Kattakada",
    description:
      "Executive outpatient care in Kowdiar and full inpatient hospital facilities in Kattakada, Thiruvananthapuram.",
    url: "https://susruthaayurveda.com/branches",
  },
};

export default function BranchesPage() {
  return (
    <SiteShell>
      <BranchesPremiumPage />
    </SiteShell>
  );
}
