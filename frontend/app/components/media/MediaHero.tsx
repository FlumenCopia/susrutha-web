import Image from "next/image";
import Link from "next/link";
import { ArrowIcon, PlayIcon } from "./MediaIcons";

export function MediaHero() {
  return (
    <section className="media-hero" aria-labelledby="media-title">
      <Image src="/images/about-hero-ayurveda-still-life.webp" alt="" fill priority sizes="100vw" />
      <div className="media-hero-glow" aria-hidden="true" />
      <div className="media-hero-copy">
        <span>Susrutha Media</span>
        <h1 id="media-title">Stories from our Ayurveda hospital, care spaces, and healing traditions.</h1>
        <p>Explore videos, photos, press notes, and events from Susrutha Ayurveda in a calm visual archive.</p>
        <div>
          <Link href="#media-gallery">Explore media <ArrowIcon /></Link>
          <Link href="#video-showcase"><PlayIcon /> Watch films</Link>
        </div>
      </div>
      <div className="media-hero-float media-hero-float-one">Videos / Photos / Press</div>
      <div className="media-hero-float media-hero-float-two">Since 1986</div>
    </section>
  );
}
