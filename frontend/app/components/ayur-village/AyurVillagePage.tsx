import { AyurVillageCTA } from "./AyurVillageCTA";
import { AyurVillageExperience } from "./AyurVillageExperience";
import { AyurVillageGallery } from "./AyurVillageGallery";
import { AyurVillageHero } from "./AyurVillageHero";
import { AyurVillageIdealFor } from "./AyurVillageIdealFor";
import { AyurVillagePackagesSection } from "./AyurVillagePackagesSection";
import { AyurVillageRoutineSection } from "./AyurVillageRoutineSection";

export function AyurVillagePage() {
  return (
    <div className="ayur-village-page">
      <AyurVillageHero />
      <AyurVillageExperience />
      <AyurVillagePackagesSection />
      <AyurVillageRoutineSection />
      <AyurVillageIdealFor />
      <AyurVillageGallery />
      <AyurVillageCTA />
    </div>
  );
}
