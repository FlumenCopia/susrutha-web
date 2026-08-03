import { EcosystemCTA } from "./EcosystemCTA";
import { EcosystemHero } from "./EcosystemHero";
import { EcosystemVerticals } from "./EcosystemVerticals";

export function EcosystemPage() {
  return (
    <div className="ecosystem-page">
      <EcosystemHero />
      <EcosystemVerticals />
      <EcosystemCTA />
    </div>
  );
}
