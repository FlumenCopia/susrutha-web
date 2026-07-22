import { SiteShell } from "../components/common/SiteShell";
import { PageIntro } from "../components/common/PageIntro";

export default function TreatmentsPage() {
  return (
    <SiteShell>
      <PageIntro
        eyebrow="Treatments"
        title="Ayurveda Treatments"
        copy="A structured treatment index for Panchakarma, specialty care, packages, and condition-led patient journeys."
      />
    </SiteShell>
  );
}
