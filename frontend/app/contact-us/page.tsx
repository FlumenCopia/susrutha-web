import { SiteShell } from "../components/common/SiteShell";
import { PageIntro } from "../components/common/PageIntro";

export default function ContactUsPage() {
  return (
    <SiteShell>
      <PageIntro
        eyebrow="Contact"
        title="Contact Susrutha"
        copy="A conversion-focused contact page for appointment requests, emergency contacts, branch selection, and patient enquiries."
      />
    </SiteShell>
  );
}
