import { SiteShell } from "../components/common/SiteShell";
import { PageIntro } from "../components/common/PageIntro";

export default function FacilitiesPage() {
  return (
    <SiteShell>
      <PageIntro
        eyebrow="Facilities"
        title="Hospital Facilities"
        copy="A premium facilities page for rooms, Panchakarma treatment spaces, physiotherapy, yoga hall, lab, and inpatient care."
      />
    </SiteShell>
  );
}
