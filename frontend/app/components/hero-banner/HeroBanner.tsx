"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import "./hero-banner.css";

interface HeroBannerProps {
  giantTitle?: string;
  subtitle?: string;
  buttonText?: string;
  buttonLink?: string;
  imageSrc?: string;
  videoSrc?: string;
}

export function HeroBanner({
  giantTitle = "Susrutha Ayurveda",
  subtitle = "Step into your personal sanctuary—where expert care meets serene ambience, guiding you toward both inner calm and outer radiance.",
  buttonText = "BOOK AN APPOINTMENT",
  buttonLink = "/appointment",
  imageSrc = "/images/hero-courtyard-ayurveda-v2.webp",
  videoSrc = "/bannervideo.mp4",
}: HeroBannerProps) {
  const [videoError, setVideoError] = useState(false);
  const [videoPlaying, setVideoPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.defaultMuted = true;
      videoRef.current.muted = true;
      videoRef.current
        .play()
        .then(() => {
          setVideoPlaying(true);
        })
        .catch((err) => {
          console.warn("Autoplay prevented or video playback error:", err);
        });
    }
  }, []);

  return (
    <section className="hero-banner-root ayora-hero-root">
      <div className="ayora-hero-card">
        {/* Background Media */}
        <div className="ayora-hero-media">
          <img
            src={imageSrc}
            alt="Susrutha Ayurveda Hospital"
            className={`ayora-hero-img ${videoPlaying ? "fade-out" : "active"}`}
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src =
                "/images/about-susrutha-wellness.webp";
            }}
          />
          {videoSrc && !videoError && (
            <video
              ref={videoRef}
              src={videoSrc}
              className="ayora-hero-video"
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

        {/* Soft Transparent Dark Gradient Overlay */}
        <div className="ayora-hero-overlay" />

        {/* Hero Main Content */}
        <div className="ayora-hero-content">
          {/* Tagline Subtitle Box */}
          <div className="ayora-hero-subtitle-box">
            <p className="ayora-hero-subtitle">{subtitle}</p>
          </div>

          {/* Bottom Giant Serif Title */}
          <div className="ayora-hero-title-box">
            <h1 className="ayora-hero-giant-title">{giantTitle}</h1>
          </div>
        </div>
      </div>
    </section>
  );
}
