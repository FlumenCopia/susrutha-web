import { HeroBanner } from "../hero-banner/HeroBanner";
import { AboutPreviewSection } from "./AboutPreviewSection";
import { CounterSection } from "./CounterSection";
import { DoctorsExpertSection } from "./DoctorsExpertSection";
import { SignatureTreatmentsSection } from "./SignatureTreatmentsSection";
import { TestimonialsReferenceSection } from "./TestimonialsReferenceSection";

export function HomePage() {
  return (
    <>
      <HeroBanner />
      <AboutPreviewSection />
      <SignatureTreatmentsSection />
      <CounterSection />
      <DoctorsExpertSection />
      <TestimonialsReferenceSection />
    </>
  );
}
