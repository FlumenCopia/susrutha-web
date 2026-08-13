import { HeroBanner } from "../hero-banner/HeroBanner";
import { AyurvedaVillageSection } from "./AyurvedaVillageSection";
import { CounterSection } from "./CounterSection";
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
      <TreatmentsShowcaseSection />
      <DoctorsShowcaseSection />
      <AyurvedaVillageSection />
      <CounterSection />
    </div>
  );
}
