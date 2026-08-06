import { SiteShell } from "../components/common/SiteShell";
import { VideoGalleryPage } from "../components/video-gallery/VideoGalleryPage";

export const metadata = {
  title: "Video Gallery | Susrutha Ayurveda Hospital",
  description:
    "Explore videos on Panchakarma, Abhyanga, Shirodhara, Ayurvedic therapies, yoga, diet, and wellness care.",
};

export default function GalleryPage() {
  return (
    <SiteShell>
      <VideoGalleryPage />
    </SiteShell>
  );
}
