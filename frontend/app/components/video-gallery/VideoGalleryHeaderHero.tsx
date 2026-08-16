"use client";

import Link from "next/link";
import { VideoItem } from "./videoGalleryData";

type VideoGalleryHeaderHeroProps = {
  onSpotlightClick?: (video: VideoItem) => void;
  spotlightVideo?: VideoItem;
};

export function VideoGalleryHeaderHero({ onSpotlightClick, spotlightVideo }: VideoGalleryHeaderHeroProps) {
  return (
    <section className="conditions-hero-serene" aria-labelledby="video-gallery-title">
      <div
        className="conditions-hero-serene-bg"
        style={{ backgroundImage: `url('/images/doctors-ayurveda-mortar-hero.webp')` }}
      />
      <div className="conditions-hero-serene-overlay" />

      <div className="conditions-hero-serene-content">
        {/* <nav className="conditions-hero-serene-nav" aria-label="Breadcrumb">
          <Link href="/">HOME</Link>
          <span>/</span>
          <span>VIDEO GALLERY</span>
        </nav> */}

        <div className="conditions-hero-serene-middle-wrapper">
          <div className="conditions-hero-serene-middle">
            <p className="conditions-hero-serene-quote">
              Immerse yourself in physician-guided masterclasses, clinical therapy demonstrations, and authentic healing wisdom from Kerala.
            </p>
          </div>

          <div className="conditions-hero-serene-right-stats" aria-label="Video quick facts">
            <div className="conditions-hero-stat-card">
              <div className="conditions-hero-stat-info">
                <strong>50+</strong>
                <span>Doctor Films</span>
              </div>
            </div>
            <div className="conditions-hero-stat-card">
              <div className="conditions-hero-stat-info">
                <strong>100%</strong>
                <span>Kerala Lineage</span>
              </div>
            </div>
            <div className="conditions-hero-stat-card">
              <div className="conditions-hero-stat-info">
                <strong>4.9 ★</strong>
                <span>Patient Rating</span>
              </div>
            </div>
          </div>
        </div>

        <div className="conditions-hero-serene-bottom">
          <h1 id="video-gallery-title" className="conditions-hero-serene-title">
            VIDEO GALLERY
          </h1>
        </div>
      </div>
    </section>
  );
}
