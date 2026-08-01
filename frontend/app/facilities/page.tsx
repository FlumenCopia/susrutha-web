import { SiteShell } from "../components/common/SiteShell";
import { InnerPage } from "../components/inner/InnerPage";
import { basePages } from "../data/architecture";

export default function FacilitiesPage() {
  return (
    <SiteShell>
      <InnerPage content={basePages.facilities} />
    </SiteShell>
  );
}
