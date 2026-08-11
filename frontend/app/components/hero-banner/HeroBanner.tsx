"use client";

import Link from "next/link";
import "./hero-banner.css";

interface HeroBannerProps {
  title?: string;
  buttonText?: string;
  buttonLink?: string;
  imageSrc?: string;
}

export function HeroBanner({
  title = "Renew Your Body, Refresh Your Soul",
  buttonText = "BOOK NOW",
  buttonLink = "/contact-us",
  imageSrc = "https://zenora.1onestrong.com/wp-content/uploads/2025/07/Image-01.jpg",
}: HeroBannerProps) {
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
          {/* Background Image / Media */}
          <div className="hero-media-wrapper">
            <img
              src={imageSrc}
              alt="Spa Treatment Wellness"
              className="hero-media-img"
              onError={(e) => {
                // Fallback to local high-res asset if remote image is slow/blocked
                (e.currentTarget as HTMLImageElement).src =
                  "/images/about-susrutha-wellness.webp";
              }}
            />
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
