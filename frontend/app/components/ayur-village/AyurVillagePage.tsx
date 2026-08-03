import { AyurVillageCTA } from "./AyurVillageCTA";
import { AyurVillageExperience } from "./AyurVillageExperience";
import { AyurVillageGallery } from "./AyurVillageGallery";
import { AyurVillageHero } from "./AyurVillageHero";
import { AyurVillageIdealFor } from "./AyurVillageIdealFor";

export function AyurVillagePage() {
  return (
    <div className="ayur-village-page">
      <AyurVillageHero />
      <AyurVillageExperience />
      <AyurVillageIdealFor />
      <AyurVillageGallery />
      <AyurVillageCTA />
    </div>
  );
}
