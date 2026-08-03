import { PackagesCTA } from "./PackagesCTA";
import { PackagesGrid } from "./PackagesGrid";
import { PackagesHero } from "./PackagesHero";

export function PackagesPage() {
  return (
    <div className="packages-page">
      <PackagesHero />
      <PackagesGrid />
      <PackagesCTA />
    </div>
  );
}
