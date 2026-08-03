import { BranchesCTA } from "./BranchesCTA";
import { BranchesHero } from "./BranchesHero";
import { BranchesLocations } from "./BranchesLocations";
import { BranchesTrustPanel } from "./BranchesTrustPanel";

export function BranchesPremiumPage() {
  return (
    <div className="branches-premium-page">
      <BranchesHero />
      <BranchesLocations />
      <BranchesTrustPanel />
      <BranchesCTA />
    </div>
  );
}
