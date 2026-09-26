import { HeroBanner } from "../hero-banner/HeroBanner";
import { CustodiansOfWisdomSection } from "./CustodiansOfWisdomSection";
import { PathToWholenessSection } from "./PathToWholenessSection";
import { SignatureExperienceSection } from "./SignatureExperienceSection";
import { SusruthaWaySection } from "./SusruthaWaySection";
import { HomeWellnessExpertiseSection } from "./HomeWellnessExpertiseSection";
import { Counbanner } from "./Counbanner";
// import Timeloop from "./Timeloop";
import { HomeFooterBanner } from "./HomeFooterBanner";
import { AboutFoundersSection } from "../inner/about-premium/AboutFoundersSection";
import { TestimonialsReferenceSection } from "./TestimonialsReferenceSection";

export function HomePage() {
  return (
    <div className="home-page">
      <HeroBanner />
      <HomeWellnessExpertiseSection />
      <Counbanner />
      {/* <Timeloop /> */}
      <PathToWholenessSection />
      <SignatureExperienceSection />
      <SusruthaWaySection />
      {/* <CustodiansOfWisdomSection /> */}
      {/* <AboutFoundersSection /> */}
      <AboutFoundersSection />
      <TestimonialsReferenceSection />
      <HomeFooterBanner />
    </div>
  );
}
 