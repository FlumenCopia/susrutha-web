"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import "./hero-banner.css";

interface HeroBannerProps {
  title?: string;
  buttonText?: string;
  buttonLink?: string;
  imageSrc?: string;
  videoSrc?: string;
}

export function HeroBanner({
  title = "Renew Your Body, Refresh Your Soul",
  buttonText = "BOOK NOW",
  buttonLink = "/appointment",
  imageSrc = "https://zenora.1onestrong.com/wp-content/uploads/2025/07/Image-01.jpg",
  videoSrc = "/bannervideo.mp4",
}: HeroBannerProps) {
  const [videoError, setVideoError] = useState(false);
  const [videoPlaying, setVideoPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (videoRef.current && videoSrc && !videoError) {
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setVideoPlaying(true);
          })
          .catch((err) => {
            console.warn(
              "Autoplay prevented or video playback error, displaying thumbnail fallback:",
              err
            );
            setVideoError(true);
          });
      }
    }
  }, [videoSrc, videoError]);

  const marqueeItems = [
    "RELAX",
    "REJUVENATE",
    "TREATMENTS",
    "RELAX",
    "REJUVENATE",
    "TREATMENTS",
    "RELAX",
    "REJUVENATE",
    "TREATMENTS",
  ];

  return (
    <section className="hero-banner-root">
      {/* Floating Hero Card */}
      <div className="hero-card-wrapper">
        <div className="hero-card-inner">
          {/* Background Media (Video or Thumbnail Image) */}
          <div className="hero-media-wrapper">
            {/* Always render Thumbnail Image as base layer */}
            <img
              src={imageSrc}
              alt="Spa Treatment Wellness"
              className={`hero-media-img ${videoPlaying ? "fade-out" : "active"}`}
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src =
                  "/images/about-susrutha-wellness.webp";
              }}
            />

            {/* Background Video Layer */}
            {videoSrc && !videoError && (
              <video
                ref={videoRef}
                src={videoSrc}
                className="hero-media-video"
                autoPlay
                loop
                muted
                playsInline
                preload="auto"
                poster={imageSrc}
                onPlay={() => setVideoPlaying(true)}
                onLoadedData={() => {
                  setVideoPlaying(true);
                  videoRef.current?.play().catch(() => {});
                }}
                onError={() => setVideoError(true)}
              >
                <source src={videoSrc} type="video/mp4" />
              </video>
            )}
          </div>

          {/* Dark Overlay Gradient */}
          <div className="hero-overlay-gradient" />

          {/* Text Content Overlay */}
          <div className="hero-content-wrapper">
            <h1 className="hero-main-title">{title}</h1>

            <Link href={buttonLink} className="hero-cta-button">
              <span className="hero-cta-text">{buttonText}</span>
              <span className="hero-cta-icon-circle">
                <svg
                  className="hero-cta-arrow-svg"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M5 12h14M12 5l7 7-7 7"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </Link>
          </div>
        </div>
      </div>

      {/* Infinite Horizontal Marquee Ticker */}
      <div className="hero-marquee-container" aria-hidden="true">
        <div className="hero-marquee-track">
          {/* First Marquee Group */}
          <div className="marquee-group">
            {marqueeItems.map((item, index) => (
              <span key={`grp1-${index}`} className="marquee-item-wrapper">
                <span className="marquee-word">{item}</span>
                <span className="marquee-symbol">⊹</span>
              </span>
            ))}
          </div>
          {/* Duplicate Marquee Group for Seamless Continuous Loop */}
          <div className="marquee-group">
            {marqueeItems.map((item, index) => (
              <span key={`grp2-${index}`} className="marquee-item-wrapper">
                <span className="marquee-word">{item}</span>
                <span className="marquee-symbol">⊹</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
