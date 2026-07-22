import { HeroBanner } from "../hero-banner/HeroBanner";
import { AboutPreviewSection } from "./AboutPreviewSection";
import { ContactPreviewSection } from "./ContactPreviewSection";
import { DoctorsPreviewSection } from "./DoctorsPreviewSection";
import { FacilitiesProcessSection } from "./FacilitiesProcessSection";
import { SpecialitiesSection } from "./SpecialitiesSection";
import { TrustBandSection } from "./TrustBandSection";

export function HomePage() {
  return (
    <>
      <HeroBanner />
      <TrustBandSection />
      <AboutPreviewSection />
      <SpecialitiesSection />
      <FacilitiesProcessSection />
      <DoctorsPreviewSection />
      <ContactPreviewSection />
    </>
  );
}
