import { AboutAwardsSection } from "./about-premium/AboutAwardsSection";
import { AboutCtaSection } from "./about-premium/AboutCtaSection";
import { AboutDoctorsSection } from "./about-premium/AboutDoctorsSection";
import { AboutGallerySection } from "./about-premium/AboutGallerySection";
import { AboutHeroSection } from "./about-premium/AboutHeroSection";
import { AboutLegacySection } from "./about-premium/AboutLegacySection";
import { AboutMilestonesSection } from "./about-premium/AboutMilestonesSection";
import { AboutPhilosophySection } from "./about-premium/AboutPhilosophySection";
import { AboutResearchSection } from "./about-premium/AboutResearchSection";
import { AboutStorySection } from "./about-premium/AboutStorySection";
import { AboutTrustSection } from "./about-premium/AboutTrustSection";
import { AboutWhySection } from "./about-premium/AboutWhySection";

export function AboutPremiumPage() {
  return (
    <div className="about-premium-page">
      <AboutHeroSection />
      <AboutLegacySection />
      <AboutStorySection />
      <AboutPhilosophySection />
      <AboutWhySection />
      <AboutGallerySection />
      <AboutDoctorsSection />
      <AboutResearchSection />
      <AboutAwardsSection />
      <AboutTrustSection />
      <AboutMilestonesSection />
      <AboutCtaSection />
    </div>
  );
}
