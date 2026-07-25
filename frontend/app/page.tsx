import { SiteShell } from "./components/common/SiteShell";
import { HeroBanner } from "./components/hero-banner/HeroBanner";
import { AyurvedaVillageSection } from "./components/home/AyurvedaVillageSection";
import { FaqSection } from "./components/home/FaqSection";
import { LegacySection } from "./components/home/LegacySection";
import { SignatureTreatmentsSection } from "./components/home/SignatureTreatmentsSection";
import { TestimonialStripSection } from "./components/home/TestimonialStripSection";

export default function Home() {
  return (
    <SiteShell>
      <HeroBanner />
      <LegacySection />
      <SignatureTreatmentsSection />
      <AyurvedaVillageSection />
      <TestimonialStripSection />
      <FaqSection />
      {/* <WhyChooseSection /> */}
    </SiteShell>
  );
}
