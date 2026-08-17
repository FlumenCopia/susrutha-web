import { SiteShell } from "../components/common/SiteShell";
import { UnifiedGalleryPage } from "../components/gallery/UnifiedGalleryPage";

export const metadata = {
  title: "Media & Gallery Hub | Susrutha Ayurveda Hospital",
  description:
    "Explore photo archives, video stories, press releases, and news coverage from Susrutha Ayurveda Hospital.",
};

export default function MediaRoute() {
  return (
    <SiteShell>
      <UnifiedGalleryPage />
    </SiteShell>
  );
}
