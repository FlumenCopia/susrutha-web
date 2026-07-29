import { SiteShell } from "../components/common/SiteShell";
import { ConditionsBanner } from "../components/inner/ConditionsBanner";
import { ConditionsContentSection } from "../components/inner/ConditionsContentSection";

export default function ConditionsPage() {
  return (
    <SiteShell>
      <div className="conditions-page">
        <ConditionsBanner />
        <ConditionsContentSection />
      </div>
    </SiteShell>
  );
}
