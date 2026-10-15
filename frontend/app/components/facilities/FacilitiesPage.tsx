import { FacilitiesGrid } from "./FacilitiesGrid";
import { FacilitiesHero } from "./FacilitiesHero";
import { FacilitiesInfo } from "./FacilitiesInfo";

export function FacilitiesPage() {
  return (
    <div className="facilities-page">
      <FacilitiesHero />
      <FacilitiesGrid />
      <FacilitiesInfo />
    </div>
  );
}
