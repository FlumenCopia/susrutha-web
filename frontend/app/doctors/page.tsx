import { SiteShell } from "../components/common/SiteShell";
import { DoctorsPage } from "../components/doctors/DoctorsPage";

export const metadata = {
  title: "Specialist Ayurvedic Doctors & Vaidyas | Susrutha Ayurveda Hospital",
  description:
    "Consult top Ayurvedic doctors and Vaidyas for Panchakarma detox, spine & joint rehabilitation, women's health, and chronic wellness care at Kattakada, Kowdiar & online video consultation.",
  keywords: [
    "Ayurvedic Doctors Kerala",
    "Panchakarma Specialists",
    "Vaidya Consultation",
    "Susrutha Ayurveda Hospital Doctors",
    "Online Ayurveda Video Consultation",
  ],
};

export default function DoctorsRoute() {
  return (
    <SiteShell>
      <DoctorsPage />
    </SiteShell>
  );
}
