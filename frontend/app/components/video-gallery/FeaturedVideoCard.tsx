"use client";

import { useState } from "react";
import Image from "next/image";
import { Check } from "lucide-react";
import { DataLayerRibbon } from "../common/DataLayerRibbon";

export type VideoChapter = {
  timestamp: string;
  title: string;
};

export type DoctorSpeaker = {
  name: string;
  role: string;
  avatar: string;
  verified?: boolean;
};

export type VideoItem = {
  id: string;
  title: string;
  description: string;
  category: string;
  duration: string;
  thumbnail: string;
  youtubeId: string;
  views: string;
  rating: string;
  level: "Beginner" | "Intermediate" | "Clinical Guide" | "Masterclass";
  speaker: DoctorSpeaker;
  chapters?: VideoChapter[];
  transcript?: string;
  featured?: boolean;
  isBackendData?: boolean;
};

type FeaturedVideoCardProps = {
  video: VideoItem;
  onPlay: (video: VideoItem) => void;
};

export function FeaturedVideoCard({ video, onPlay }: FeaturedVideoCardProps) {
  const [thumbSrc, setThumbSrc] = useState(
    video.thumbnail && video.thumbnail.trim() !== "" ? video.thumbnail : "/images/treatment-sirodhara.webp"
  );
  const [avatarSrc, setAvatarSrc] = useState(
    video.speaker.avatar && video.speaker.avatar.trim() !== "" ? video.speaker.avatar : "/images/doctor_sreeja.jpg"
  );

  return (
    <article className="vg-featured-card-deluxe" onClick={() => onPlay(video)}>
      <div className="vg-card-thumb-wrapper">
        <Image
          src={thumbSrc}
          alt={video.title}
          width={440}
          height={248}
          className="vg-card-thumb-img"
          onError={() => setThumbSrc("/images/treatment-sirodhara.webp")}
        />
        <div className="vg-card-thumb-overlay" />
        <div className="vg-card-shimmer-sweep" />

        {/* Top Badges Overlay */}
        {(video.level || video.rating) ? (
          <div className="vg-card-top-badges">
            {video.level ? <span className="vg-card-level-badge">{video.level}</span> : null}
            {video.rating ? <span className="vg-card-rating-badge">{video.rating}</span> : null}
          </div>
        ) : null}

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
        {(video.views || video.duration) ? (
          <div className="vg-card-bottom-info">
            {video.views ? <span className="vg-views-badge">{video.views}</span> : null}
            {video.duration ? <span className="vg-duration-badge">{video.duration}</span> : null}
          </div>
        ) : null}
      </div>

      <div className="vg-card-body-deluxe">
        {video.category ? (
          <div className="vg-card-meta-row">
            <span className="vg-card-category">{video.category.toUpperCase()}</span>
          </div>
        ) : null}

        <h3 className="vg-card-title">{video.title}</h3>
        {video.description ? <p className="vg-card-desc">{video.description}</p> : null}

        {/* Doctor Speaker Avatar & Verified Checkmark */}
        {video.speaker?.name ? (
          <div className="vg-card-speaker-footer">
            {avatarSrc ? (
              <div className="vg-speaker-avatar-wrapper">
                <Image
                  src={avatarSrc}
                  alt={video.speaker.name}
                  width={36}
                  height={36}
                  className="vg-speaker-avatar"
                  onError={() => setAvatarSrc("")}
                />
              </div>
            ) : null}
            <div className="vg-speaker-info">
              <span className="vg-speaker-name" style={{ display: "inline-flex", alignItems: "center", gap: "4px" }}>
                {video.speaker.name}
                {video.speaker.verified && (
                  <span className="vg-verified-check" title="Verified Physician" style={{ display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
                    <Check size={10} />
                  </span>
                )}
              </span>
              {video.speaker.role ? <span className="vg-speaker-role">{video.speaker.role}</span> : null}
            </div>
          </div>
        ) : null}
      </div>
    </article>
  );
}
