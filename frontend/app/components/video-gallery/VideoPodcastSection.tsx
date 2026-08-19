"use client";

import Image from "next/image";
import { Mic } from "lucide-react";
import { VideoItem } from "./FeaturedVideoCard";

type VideoPodcastSectionProps = {
  episodes?: any[];
  videos?: VideoItem[];
  onPlayVideo: (video: VideoItem) => void;
};

export function VideoPodcastSection({ episodes = [], videos = [], onPlayVideo }: VideoPodcastSectionProps) {
  if (episodes.length === 0) return null;

  const handlePodcastClick = (podId: string) => {
    const matchingVideo = videos.find((v) => v.id === podId) || videos[0];
    if (matchingVideo) onPlayVideo(matchingVideo);
  };

  return (
    <section className="vg-podcast-section" aria-labelledby="podcast-heading">
      <div className="vg-section-header">
        <div className="vg-section-title-group">
          <div className="vg-eyebrow-accent">PHYSICIAN ROUNDTABLE</div>
          <h2 id="podcast-heading" className="vg-section-title">
            Susrutha Video Podcasts <span className="vg-leaf-accent" aria-hidden="true"><Mic size={20} style={{ display: "inline-block", verticalAlign: "-2px", color: "#c88922" }} /></span>
          </h2>
          <p className="vg-section-subhead">In-depth conversations on classical Ayurveda, detox science, and integrative care</p>
        </div>
      </div>

      <div className="vg-podcast-banner-grid">
        {episodes.map((pod) => (
          <article
            key={pod.id}
            className="vg-podcast-banner-card"
            onClick={() => handlePodcastClick(pod.id)}
          >
            <div className="vg-podcast-thumb-col">
              <Image
                src={pod.thumbnail}
                alt={pod.title}
                width={360}
                height={230}
                className="vg-podcast-thumb-img"
              />
              <div className="vg-podcast-overlay" />
              <button
                type="button"
                className="vg-podcast-play-btn"
                aria-label={`Play ${pod.title}`}
              >
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </button>
              <span className="vg-podcast-duration">{pod.duration}</span>
            </div>

            <div className="vg-podcast-info-col">
              <div className="vg-podcast-top-meta">
                <span className="vg-podcast-ep-chip">{pod.episodeNumber}</span>
                <span className="vg-podcast-date">{pod.date}</span>
              </div>

              <h3 className="vg-podcast-title">{pod.title}</h3>
              <p className="vg-podcast-summary">{pod.summary}</p>

              {/* Host & Guest Doctor Avatars */}
              <div className="vg-podcast-doctors-row">
                <div className="vg-podcast-avatar-stack">
                  <Image
                    src={pod.host.avatar}
                    alt={pod.host.name}
                    width={32}
                    height={32}
                    className="vg-pod-avatar av-1"
                  />
                  <Image
                    src={pod.guest.avatar}
                    alt={pod.guest.name}
                    width={32}
                    height={32}
                    className="vg-pod-avatar av-2"
                  />
                </div>
                <div className="vg-podcast-doctor-names">
                  <span className="vg-pod-speakers">Featuring {pod.host.name} & {pod.guest.name}</span>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
