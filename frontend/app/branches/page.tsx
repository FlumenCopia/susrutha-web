import { SiteShell } from "../components/common/SiteShell";
import { PageIntro } from "../components/common/PageIntro";

export default function BranchesPage() {
  return (
    <SiteShell>
      <PageIntro
        eyebrow="Branches"
        title="Kattakada and Kowdiar"
        copy="Branch information with addresses, working hours, contact numbers, maps, doctors, and available services."
      />
    </SiteShell>
  );
}
