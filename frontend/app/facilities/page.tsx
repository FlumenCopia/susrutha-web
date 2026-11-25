import type { Metadata } from "next";
import { SiteShell } from "../components/common/SiteShell";
import { FacilitiesPage } from "../components/facilities/FacilitiesPage";

export const metadata: Metadata = {
  title: "Hospital Facilities & Panchakarma Suites | Susrutha Ayurveda Thiruvananthapuram",
  description:
    "Explore our 40-bed inpatient campus: NABH-standard Panchakarma therapy suites, in-house herbal pharmacy, physiotherapy unit, yoga hall, and AC inpatient rooms in Kattakada.",
  keywords: [
    "ayurvedic hospital facilities trivandrum",
    "panchakarma suites kerala",
    "susrutha inpatient rooms",
    "ayurvedic physiotherapy trivandrum",
  ],
  alternates: {
    canonical: "https://susruthaayurveda.com/facilities",
  },
  openGraph: {
    title: "Hospital Facilities & Panchakarma Suites | Susrutha Ayurveda Thiruvananthapuram",
    description:
      "Modern hospital infrastructure meets classical Ayurvedic treatment rooms across our Kattakada campus.",
    url: "https://susruthaayurveda.com/facilities",
  },
};

export default function FacilitiesRoute() {
  return (
    <SiteShell>
      <FacilitiesPage />
    </SiteShell>
  );
}
