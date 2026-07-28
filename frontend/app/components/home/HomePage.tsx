import { HeroBanner } from "../hero-banner/HeroBanner";
import { AyurvedaVillageSection } from "./AyurvedaVillageSection";
import { CounterSection } from "./CounterSection";
import { HomeWellnessExpertiseSection } from "./HomeWellnessExpertiseSection";
import { TreatmentsShowcaseSection } from "./TreatmentsShowcaseSection";

export function HomePage() {
  return (
    <div className="home-page">
      <HeroBanner />
      <HomeWellnessExpertiseSection />
      
      <TreatmentsShowcaseSection />
      <AyurvedaVillageSection />
      <CounterSection />
      {/* <DoctorsExpertSection /> */}
    </div>
  );
}
