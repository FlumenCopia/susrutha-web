import { SiteShell } from "../components/common/SiteShell";
import { PageIntro } from "../components/common/PageIntro";

export default function DoctorsPage() {
  return (
    <SiteShell>
      <PageIntro
        eyebrow="Doctors"
        title="Doctors and Consultation"
        copy="A doctor directory with credentials, availability, branch schedules, specialties, and appointment actions."
      />
    </SiteShell>
  );
}
