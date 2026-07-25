import { HeroBanner } from "../hero-banner/HeroBanner";
import { AboutPreviewSection } from "./AboutPreviewSection";
import { AyurvedaVillageSection } from "./AyurvedaVillageSection";
import { ContactPreviewSection } from "./ContactPreviewSection";
import { DoctorsPreviewSection } from "./DoctorsPreviewSection";
import { FaqSection } from "./FaqSection";
import { FacilitiesProcessSection } from "./FacilitiesProcessSection";
import { LegacySection } from "./LegacySection";
import { SignatureTreatmentsSection } from "./SignatureTreatmentsSection";
import { SpecialitiesSection } from "./SpecialitiesSection";
import { TestimonialStripSection } from "./TestimonialStripSection";
import { TrustBandSection } from "./TrustBandSection";

export function HomePage() {
  return (
    <>
      <HeroBanner />
      <TrustBandSection />
      <LegacySection />
      <SignatureTreatmentsSection />
      <AyurvedaVillageSection />
      <TestimonialStripSection />
      <FaqSection />
      <AboutPreviewSection />
      <SpecialitiesSection />
      <FacilitiesProcessSection />
      <DoctorsPreviewSection />
      <ContactPreviewSection />
    </>
  );
}
