"use client";

import Image from "next/image";
import { VideoItem } from "./videoGalleryData";

type VideoGalleryHeaderHeroProps = {
  onSpotlightClick?: (video: VideoItem) => void;
  spotlightVideo?: VideoItem;
};

export function VideoGalleryHeaderHero({ onSpotlightClick, spotlightVideo }: VideoGalleryHeaderHeroProps) {
  return (
    <section className="vg-hero">
      {/* Motion Mesh & Ambient Lighting Background */}
      <div className="vg-hero-bg-overlay" aria-hidden="true" />
      <div className="vg-hero-mesh-glow" aria-hidden="true" />
      <div className="vg-hero-dust-1" aria-hidden="true" />
      <div className="vg-hero-dust-2" aria-hidden="true" />

      <div className="vg-hero-container">
        <div className="vg-hero-content">
          <div className="vg-hero-eyebrow-chip">
            <span className="vg-chip-pulse" />
            <span className="vg-hero-eyebrow">SUSRUTHA CINEMATIC MEDIA HUB</span>
          </div>

          <h1 className="vg-hero-title">
            Ayurvedic <span className="vg-gold-gradient-text">Video Gallery</span>
          </h1>

          <p className="vg-hero-subtitle">
            Immerse yourself in physician-guided masterclasses, clinical therapy demonstrations, and authentic healing wisdom from Kerala.
          </p>

          {/* Luxury Metric Chips Bar */}
          <div className="vg-hero-metrics-row">
            <div className="vg-metric-chip">
              <span className="vg-metric-num">50+</span>
              <span className="vg-metric-lbl">Doctor Films</span>
            </div>
            <div className="vg-metric-divider" />
            <div className="vg-metric-chip">
              <span className="vg-metric-num">100%</span>
              <span className="vg-metric-lbl">Kerala Lineage</span>
            </div>
            <div className="vg-metric-divider" />
            <div className="vg-metric-chip">
              <span className="vg-metric-num">4.9 ★</span>
              <span className="vg-metric-lbl">Patient Rating</span>
            </div>
          </div>

          {/* Feature Badges */}
          <div className="vg-hero-badges">
            <div className="vg-badge-glass">
              <span className="vg-badge-icon" aria-hidden="true">🌿</span>
              <span>Expert Physician Insights</span>
            </div>
            <div className="vg-badge-glass">
              <span className="vg-badge-icon" aria-hidden="true">📜</span>
              <span>Classical Protocols</span>
            </div>
            <div className="vg-badge-glass">
              <span className="vg-badge-icon" aria-hidden="true">✨</span>
              <span>4K Ultra HD</span>
            </div>
          </div>

          {spotlightVideo && onSpotlightClick && (
            <div className="vg-hero-action-group">
              <button
                type="button"
                className="vg-spotlight-btn-deluxe"
                onClick={() => onSpotlightClick(spotlightVideo)}
              >
                <div className="vg-spotlight-btn-shimmer" />
                <span className="vg-spotlight-play-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </span>
                <div className="vg-spotlight-btn-text">
                  <span className="vg-spotlight-label">Watch Spotlight Masterclass</span>
                  <span className="vg-spotlight-title">{spotlightVideo.title} ({spotlightVideo.duration})</span>
                </div>
              </button>
            </div>
          )}
        </div>

        {/* Hero Spotlight Image Player with Equalizer */}
        <div className="vg-hero-image-wrapper">
          <div className="vg-hero-image-glow" aria-hidden="true" />
          <div className="vg-hero-img-frame">
            <Image
              src="/images/doctors-ayurveda-mortar-hero.webp"
              alt="Ayurvedic traditional herbs and mortar"
              width={580}
              height={420}
              className="vg-hero-img"
              priority
            />
            
            {/* Audio Wave Equalizer Bar Overlay */}
            <div className="vg-hero-equalizer-card">
              <div className="vg-equalizer-left">
                <div className="vg-equalizer-bars">
                  <span className="vg-eq-bar eq-1" />
                  <span className="vg-eq-bar eq-2" />
                  <span className="vg-eq-bar eq-3" />
                  <span className="vg-eq-bar eq-4" />
                </div>
                <div className="vg-equalizer-info">
                  <span className="vg-eq-title">Featured Video Spotlight</span>
                  <span className="vg-eq-subtitle">Physician Explainer • 12:45 min</span>
                </div>
              </div>
              <span className="vg-eq-hd-tag">4K HD</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
