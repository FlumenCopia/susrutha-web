"use client";

import Image from "next/image";
import { VideoItem } from "./videoGalleryData";

type FeaturedVideoCardProps = {
  video: VideoItem;
  onPlay: (video: VideoItem) => void;
};

export function FeaturedVideoCard({ video, onPlay }: FeaturedVideoCardProps) {
  return (
    <article className="vg-featured-card-deluxe" onClick={() => onPlay(video)}>
      <div className="vg-card-thumb-wrapper">
        <Image
          src={video.thumbnail}
          alt={video.title}
          width={440}
          height={248}
          className="vg-card-thumb-img"
        />
        <div className="vg-card-thumb-overlay" />
        <div className="vg-card-shimmer-sweep" />

        {/* Top Badges Overlay */}
        <div className="vg-card-top-badges">
          <span className="vg-card-level-badge">{video.level}</span>
          <span className="vg-card-rating-badge">{video.rating}</span>
        </div>

        {/* Pulse Glowing Play Button with Ripple */}
        <button
          type="button"
          className="vg-play-btn-deluxe"
          aria-label={`Play ${video.title}`}
          onClick={(e) => {
            e.stopPropagation();
            onPlay(video);
          }}
        >
          <div className="vg-play-btn-ripple-1" />
          <div className="vg-play-btn-ripple-2" />
          <svg className="vg-play-icon" viewBox="0 0 24 24" fill="currentColor">
            <path d="M8 5v14l11-7z" />
          </svg>
        </button>

        {/* Bottom Duration & Views Badge */}
        <div className="vg-card-bottom-info">
          <span className="vg-views-badge">{video.views}</span>
          <span className="vg-duration-badge">{video.duration}</span>
        </div>
      </div>

      <div className="vg-card-body-deluxe">
        <div className="vg-card-meta-row">
          <span className="vg-card-category">{video.category.toUpperCase()}</span>
        </div>

        <h3 className="vg-card-title">{video.title}</h3>
        <p className="vg-card-desc">{video.description}</p>

        {/* Doctor Speaker Avatar & Verified Checkmark */}
        <div className="vg-card-speaker-footer">
          <div className="vg-speaker-avatar-wrapper">
            <Image
              src={video.speaker.avatar}
              alt={video.speaker.name}
              width={36}
              height={36}
              className="vg-speaker-avatar"
            />
          </div>
          <div className="vg-speaker-info">
            <span className="vg-speaker-name">
              {video.speaker.name}
              {video.speaker.verified && <span className="vg-verified-check" title="Verified Physician">✔</span>}
            </span>
            <span className="vg-speaker-role">{video.speaker.role}</span>
          </div>
        </div>
      </div>
    </article>
  );
}
