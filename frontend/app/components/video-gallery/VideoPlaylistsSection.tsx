"use client";

import Image from "next/image";
import { playlistsData, VideoPlaylist, VideoItem, featuredVideosData } from "./videoGalleryData";

type VideoPlaylistsSectionProps = {
  onPlayVideo: (video: VideoItem) => void;
};

export function VideoPlaylistsSection({ onPlayVideo }: VideoPlaylistsSectionProps) {
  const handlePlaylistClick = (playlist: VideoPlaylist) => {
    // Find matching video or launch first video in category
    const match = featuredVideosData.find((v) => v.category === playlist.category) || featuredVideosData[0];
    onPlayVideo(match);
  };

  return (
    <section className="vg-playlists-section" aria-labelledby="playlists-heading">
      <div className="vg-section-header">
        <div className="vg-section-title-group">
          <div className="vg-eyebrow-accent">CURATED SERIES</div>
          <h2 id="playlists-heading" className="vg-section-title">
            Featured Playlists <span className="vg-leaf-accent" aria-hidden="true"><i className="fa-solid fa-scroll" /></span>
          </h2>
          <p className="vg-section-subhead">Structured multi-part video series guided by senior physicians</p>
        </div>
      </div>

      <div className="vg-playlists-grid">
        {playlistsData.map((pl) => (
          <article
            key={pl.id}
            className="vg-playlist-card"
            onClick={() => handlePlaylistClick(pl)}
          >
            <div className="vg-playlist-stack-wrapper">
              <div className="vg-stack-card-back" />
              <div className="vg-stack-card-mid" />
              <div className="vg-stack-card-front">
                <Image
                  src={pl.thumbnail}
                  alt={pl.title}
                  width={380}
                  height={220}
                  className="vg-playlist-thumb-img"
                />
                <div className="vg-playlist-overlay" />
                <div className="vg-playlist-count-badge">
                  <svg className="vg-playlist-icon" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-8 12.5v-9l7 4.5-7 4.5z" />
                  </svg>
                  <span>{pl.videoCount} VIDEOS</span>
                </div>
                <span className="vg-playlist-duration-badge">{pl.totalDuration}</span>
              </div>
            </div>

            <div className="vg-playlist-content">
              <span className="vg-card-category">{pl.category.toUpperCase()}</span>
              <h3 className="vg-playlist-title">{pl.title}</h3>
              <p className="vg-playlist-desc">{pl.description}</p>
              <div className="vg-playlist-footer">
                <div className="vg-speaker-avatar-wrapper">
                  <Image
                    src={pl.speaker.avatar}
                    alt={pl.speaker.name}
                    width={28}
                    height={28}
                    className="vg-speaker-avatar"
                  />
                </div>
                <span className="vg-playlist-doctor-name">{pl.speaker.name}</span>
                <span className="vg-playlist-play-link">Start Series →</span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
