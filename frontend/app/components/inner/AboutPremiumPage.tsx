import { AboutHeroSection } from "./about-premium/AboutHeroSection";
import { AboutFoundersSection } from "./about-premium/AboutFoundersSection";
import { AboutMilestonesSection } from "./about-premium/AboutMilestonesSection";
import { AboutPurposeSection } from "./about-premium/AboutPurposeSection";
import { AboutStorySection } from "./about-premium/AboutStorySection";

export function AboutPremiumPage() {
  return (
    <div className="about-premium-page">
      <AboutHeroSection />
      <AboutStorySection />
      <AboutMilestonesSection />
      {/* <AboutMilestoneShowcaseSection /> */}
      <AboutPurposeSection />
      <AboutFoundersSection />
    </div>
  );
}
