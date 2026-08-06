import { FacilitiesEnquiry } from "./FacilitiesEnquiry";
import { FacilitiesGrid } from "./FacilitiesGrid";
import { FacilitiesHero } from "./FacilitiesHero";
import { FacilitiesInfo } from "./FacilitiesInfo";
import { FacilitiesPrograms } from "./FacilitiesPrograms";

export function FacilitiesPage() {
  return (
    <div className="facilities-page">
      <FacilitiesHero />
      <FacilitiesGrid />
      <FacilitiesPrograms />
      <FacilitiesInfo />
      <FacilitiesEnquiry />
    </div>
  );
}
