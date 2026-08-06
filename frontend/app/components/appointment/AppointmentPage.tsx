import { AppointmentHero } from "./AppointmentHero";
import { AppointmentTrustSection } from "./AppointmentTrustSection";
import { AppointmentWizardForm } from "./AppointmentWizardForm";
import { AppointmentBranchesSection } from "./AppointmentBranchesSection";
import { AppointmentFaqSection } from "./AppointmentFaqSection";

export function AppointmentPage() {
  return (
    <div className="appointment-page-wrapper">
      <AppointmentHero />
      <AppointmentTrustSection />
      <AppointmentWizardForm />
      <AppointmentBranchesSection />
      <AppointmentFaqSection />
    </div>
  );
}
