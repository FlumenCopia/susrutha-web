import { EventsSection } from "./EventsSection";
import { FeaturedMedia } from "./FeaturedMedia";
import { MediaBanner } from "./MediaBanner";
import { MediaCategories } from "./MediaCategories";
import { MediaCTA } from "./MediaCTA";
import { MediaGallery } from "./MediaGallery";
import { MediaHero } from "./MediaHero";
import { PressSection } from "./PressSection";
import { VideoShowcase } from "./VideoShowcase";

export function MediaPage() {
  return (
    <div className="media-page">
      <MediaHero />
      <MediaCategories />
      {/* <MediaBanner /> */}
      <FeaturedMedia />
      <MediaGallery />
      <VideoShowcase />
      <PressSection />
      <EventsSection />
      <MediaCTA />
    </div>
  );
}
