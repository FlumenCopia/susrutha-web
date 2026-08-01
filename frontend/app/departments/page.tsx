import { SiteShell } from "../components/common/SiteShell";
import { InnerPage } from "../components/inner/InnerPage";
import { basePages } from "../data/architecture";

export default function DepartmentsPage() {
  return (
    <SiteShell>
      <InnerPage content={basePages.departments} />
    </SiteShell>
  );
}
