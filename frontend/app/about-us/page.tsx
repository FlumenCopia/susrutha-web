import { SiteShell } from "../components/common/SiteShell";
import { PageIntro } from "../components/common/PageIntro";

export default function AboutUsPage() {
  return (
    <SiteShell>
      <PageIntro
        eyebrow="About"
        title="About Susrutha"
        copy="A dedicated page for the hospital legacy, founders, milestones, vision, mission, and institutional trust signals."
      />
    </SiteShell>
  );
}
