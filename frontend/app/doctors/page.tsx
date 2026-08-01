import { SiteShell } from "../components/common/SiteShell";
import { InnerPage } from "../components/inner/InnerPage";
import { basePages } from "../data/architecture";

export default function DoctorsPage() {
  return (
    <SiteShell>
      <InnerPage content={basePages.doctors} />
    </SiteShell>
  );
}
