import { SiteShell } from "../components/common/SiteShell";
import { AllTreatmentsSection } from "../components/inner/AllTreatmentsSection";
import { TreatmentsBannerSection } from "../components/inner/TreatmentsBannerSection";

export default function TreatmentsPage() {
  return (
    <SiteShell>
      <TreatmentsBannerSection />
      <AllTreatmentsSection />
    </SiteShell>
  );
}
