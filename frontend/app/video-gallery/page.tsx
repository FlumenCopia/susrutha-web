import { SiteShell } from "../components/common/SiteShell";
import { UnifiedGalleryPage } from "../components/gallery/UnifiedGalleryPage";

export const metadata = {
  title: "Video & Media Gallery | Susrutha Ayurveda Hospital",
  description:
    "Explore videos on Panchakarma, Abhyanga, Shirodhara, Ayurvedic therapies, yoga, diet, and wellness care.",
};

export default function VideoGalleryRoute() {
  return (
    <SiteShell>
      <UnifiedGalleryPage />
    </SiteShell>
  );
}
