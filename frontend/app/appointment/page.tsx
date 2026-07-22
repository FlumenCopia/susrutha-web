import { SiteShell } from "../components/common/SiteShell";
import { PageIntro } from "../components/common/PageIntro";

export default function AppointmentPage() {
  return (
    <SiteShell>
      <PageIntro
        eyebrow="Appointment"
        title="Book an Appointment"
        copy="A dedicated appointment flow with treatment selection, preferred branch, date, contact details, and confirmation states."
      />
    </SiteShell>
  );
}
