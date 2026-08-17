"use client";

import Image from "next/image";
import { DoctorSpeaker, VideoItem } from "./FeaturedVideoCard";

export type ContinueWatchingItem = {
  id: string;
  title: string;
  category: string;
  thumbnail: string;
  youtubeId: string;
  currentTimestamp: string;
  totalDuration: string;
  progressPercent: number;
  timeLeft: string;
  speaker: DoctorSpeaker;
};

type ContinueWatchingCardProps = {
  item: ContinueWatchingItem;
  onPlay: (video: VideoItem) => void;
};

export function ContinueWatchingCard({ item, onPlay }: ContinueWatchingCardProps) {
  const handleCardClick = () => {
    onPlay({
      id: item.id,
      title: item.title,
      description: `Continue watching from ${item.currentTimestamp} (${item.timeLeft})`,
      category: item.category,
      duration: item.totalDuration,
      thumbnail: item.thumbnail,
      youtubeId: item.youtubeId,
      views: "Recent Play",
      rating: "5.0 ★",
      level: "Intermediate",
      speaker: item.speaker,
    });
  };

  return (
    <article className="vg-cw-card-luxury" onClick={handleCardClick}>
      <div className="vg-cw-thumb-wrapper">
        <Image
          src={item.thumbnail}
          alt={item.title}
          width={280}
          height={160}
          className="vg-cw-thumb-img"
        />
        <div className="vg-cw-thumb-overlay" />

        <div className="vg-cw-time-left-badge">{item.timeLeft}</div>

        <button
          type="button"
          className="vg-cw-play-btn-luxury"
          aria-label={`Resume watching ${item.title}`}
        >
          <svg className="vg-cw-play-icon" viewBox="0 0 24 24" fill="currentColor">
            <path d="M8 5v14l11-7z" />
          </svg>
        </button>

        <span className="vg-cw-timestamp">
          {item.currentTimestamp} / {item.totalDuration}
        </span>

        {/* Glowing Progress Bar */}
        <div className="vg-cw-progress-bg">
          <div className="vg-cw-progress-fill" style={{ width: `${item.progressPercent}%` }}>
            <div className="vg-cw-progress-glow-tip" />
          </div>
        </div>
      </div>

      <div className="vg-cw-content-luxury">
        <span className="vg-cw-category">{item.category.toUpperCase()}</span>
        <h4 className="vg-cw-title">{item.title}</h4>

        <div className="vg-cw-footer">
          <span className="vg-cw-speaker-name">{item.speaker.name}</span>
          <span className="vg-cw-resume-btn">Resume →</span>
        </div>
      </div>
    </article>
  );
}
