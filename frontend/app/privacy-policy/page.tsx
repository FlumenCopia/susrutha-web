import { SiteShell } from "../components/common/SiteShell";
import { InnerPage } from "../components/inner/InnerPage";
import { basePages } from "../data/architecture";

export default function PrivacyPolicyPage() {
  return (
    <SiteShell>
      <InnerPage content={basePages.privacy} />
    </SiteShell>
  );
}
