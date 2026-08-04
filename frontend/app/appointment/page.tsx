import { SiteShell } from "../components/common/SiteShell";
import { AppointmentPage } from "../components/appointment/AppointmentPage";

export const metadata = {
  title: "Book Appointment | Susrutha Ayurveda Panchakarma Hospital",
  description:
    "Book an in-person or online video consultation with expert Ayurvedic doctors at Susrutha Ayurveda Hospital Kattakada and Kowdiar.",
};

export default function Page() {
  return (
    <SiteShell>
      <AppointmentPage />
    </SiteShell>
  );
}
