import { HeroBanner } from "../hero-banner/HeroBanner";
import { AboutPreviewSection } from "./AboutPreviewSection";
import { CounterSection } from "./CounterSection";
import { TreatmentsShowcaseSection } from "./TreatmentsShowcaseSection";

export function HomePage() {
  return (
    <div className="home-page">
      <HeroBanner />
      <AboutPreviewSection />
      <TreatmentsShowcaseSection />
      <CounterSection />
      {/* <DoctorsExpertSection /> */}
    </div>
  );
}
