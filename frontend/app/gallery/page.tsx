import { SiteShell } from "../components/common/SiteShell";
import { UnifiedGalleryPage } from "../components/gallery/UnifiedGalleryPage";

export const metadata = {
  title: "Media & Video Gallery Hub | Susrutha Ayurveda Hospital",
  description:
    "Explore authentic Kerala Ayurveda videos, patient stories, hospital campus photo archive, podcasts, and press news.",
};

export default function GalleryRoute() {
  return (
    <SiteShell>
      <UnifiedGalleryPage />
    </SiteShell>
  );
}
