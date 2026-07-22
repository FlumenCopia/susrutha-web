import { SiteShell } from "./components/common/SiteShell";
import { HeroBanner } from "./components/hero-banner/HeroBanner";
import { WhyChooseSection } from "./components/why-choose/WhyChooseSection";

export default function Home() {
  return (
    <SiteShell>
      <HeroBanner />
      <WhyChooseSection />
    </SiteShell>
  );
}
