import { HeroBanner } from "../hero-banner/HeroBanner";
import { AyurvedaVillageSection } from "./AyurvedaVillageSection";
import { CounterSection } from "./CounterSection";
import { CustodiansOfWisdomSection } from "./CustodiansOfWisdomSection";
import { PathToWholenessSection } from "./PathToWholenessSection";
import { SignatureExperienceSection } from "./SignatureExperienceSection";
import { SusruthaWaySection } from "./SusruthaWaySection";
import { DoctorsShowcaseSection } from "./DoctorsShowcaseSection";
import { HomeWellnessExpertiseSection } from "./HomeWellnessExpertiseSection";
import { TreatmentsShowcaseSection } from "./TreatmentsShowcaseSection";
import Timeloop from "./Timeloop";


export function HomePage() {
  return (
    <div className="home-page">
      <HeroBanner />
      {/* <Timeloop /> */}





      <HomeWellnessExpertiseSection />
      {/* <TreatmentsShowcaseSection /> */}
      {/* <DoctorsShowcaseSection /> */}
   








      <PathToWholenessSection />
      <SignatureExperienceSection />
      <SusruthaWaySection />
      <CustodiansOfWisdomSection />
      {/* <AyurvedaVillageSection /> */}
      {/* <CounterSection /> */}
    </div>
  );
}
