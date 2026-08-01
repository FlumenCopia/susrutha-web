import Image from "next/image";
import Link from "next/link";
import { ArrowIcon, PlayIcon } from "./MediaIcons";

export function MediaBanner() {
  return (
    <section className="media-story-banner" aria-labelledby="media-banner-title">
      <div className="media-story-banner-copy">
        <span>Featured Banner</span>
        <h2 id="media-banner-title">A visual journal of care, craft, and Kerala Ayurveda.</h2>
        <p>Discover the moments behind Susrutha: therapy rooms, physicians, healing gardens, press stories, and patient-centred experiences.</p>
        <Link href="#video-showcase">
          Watch the latest story
          <PlayIcon />
        </Link>
      </div>
      <div className="media-story-banner-collage" aria-hidden="true">
        <Image className="media-story-banner-main" src="/images/ayurveda-hospital-garden.webp" alt="" width={720} height={520} />
        <Image className="media-story-banner-small media-story-banner-small-one" src="/images/treatment-sirodhara.webp" alt="" width={280} height={220} />
        <Image className="media-story-banner-small media-story-banner-small-two" src="/images/about-purpose-still-life.webp" alt="" width={260} height={220} />
        <span><ArrowIcon /></span>
      </div>
    </section>
  );
}
