import { HeroBanner } from "../hero-banner/HeroBanner";
import { CounterSection } from "./CounterSection";
import { HomeAboutFeatureSection } from "./HomeAboutFeatureSection";
import { TreatmentsShowcaseSection } from "./TreatmentsShowcaseSection";

export function HomePage() {
  return (
    <div className="home-page">
      <HeroBanner />
      <HomeAboutFeatureSection />
      <TreatmentsShowcaseSection />
      <CounterSection />
      {/* <DoctorsExpertSection /> */}
    </div>
  );
}
