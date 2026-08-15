"use client";

import Link from "next/link";
import { ArrowIcon } from "./MediaIcons";

export function MediaCTA() {
  return (
    <section className="media-cta-fullbleed" aria-labelledby="media-cta-title">
      {/* Background Auto-Playing Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="media-cta-bg-video"
        poster="/images/about-hero-ayurveda-still-life.webp"
      >
        <source src="/bannervideo.mp4" type="video/mp4" />
      </video>
      <div className="media-cta-video-overlay" />

      {/* Card Content */}
      <div className="media-cta-content">
        {/* <div className="media-cta-badge">
          <span className="media-cta-pulse" />
          <span>COLLABORATE WITH OUR MEDIA DESK</span>
        </div> */}

        <h2 id="media-cta-title" className="media-cta-title">
          Bring a wellness story, interview, event or brand experience to life.
        </h2>

        <p className="media-cta-desc">
          Partner with Susrutha Institute&apos;s editorial, media, and clinical teams for authentic medical research insights and press coverage.
        </p>

        <Link href="/contact-us" className="media-cta-btn">
          <span>Start a Conversation</span>
          <ArrowIcon />
        </Link>
      </div>
    </section>
  );
}
