"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { X, Check, ArrowRight } from "lucide-react";
import { VideoItem } from "./FeaturedVideoCard";

type VideoModalProps = {
  video: VideoItem | null;
  allVideos?: VideoItem[];
  onClose: () => void;
  onSelectRelated?: (video: VideoItem) => void;
};

export function VideoModal({ video, allVideos = [], onClose, onSelectRelated }: VideoModalProps) {
  const [activeTab, setActiveTab] = useState<"chapters" | "transcript">("chapters");
  const [activeChapter, setActiveChapter] = useState<string>("00:00");
  const [playbackSpeed, setPlaybackSpeed] = useState<string>("1.0x");

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    if (video) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [video, onClose]);

  if (!video) return null;

  const relatedVideos = allVideos
    .filter((v) => v.id !== video.id && (v.category === video.category || (v.speaker && video.speaker && v.speaker.name === video.speaker.name)))
    .slice(0, 3);

  return (
    <div className="vg-modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div className="vg-modal-container-deluxe" onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          className="vg-modal-close-btn-deluxe"
          onClick={onClose}
          aria-label="Close video cinema player"
          style={{ display: "flex", alignItems: "center", justifyContent: "center" }}
        >
          <X size={18} />
        </button>

        <div className="vg-modal-cinema-body">
          {/* Main Video Player & Details Column */}
          <div className="vg-modal-main-col">
            <div className="vg-modal-video-aspect">
              <iframe
                src={`https://www.youtube.com/embed/${video.youtubeId}?autoplay=1`}
                title={video.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="vg-modal-iframe"
              />
            </div>

            {/* Playback Control Bar (Speed Selectors & Quality) */}
            <div className="vg-modal-control-bar">
              <div className="vg-speed-selector">
                <span className="vg-speed-label">Speed:</span>
                {["0.75x", "1.0x", "1.25x", "1.5x"].map((speed) => (
                  <button
                    key={speed}
                    type="button"
                    className={`vg-speed-btn ${playbackSpeed === speed ? "active" : ""}`}
                    onClick={() => setPlaybackSpeed(speed)}
                  >
                    {speed}
                  </button>
                ))}
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <a
                  href={`https://www.youtube.com/watch?v=${video.youtubeId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="vg-yt-direct-link"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                    padding: "5px 12px",
                    borderRadius: "999px",
                    background: "#cc0000",
                    color: "#ffffff",
                    fontSize: "12px",
                    fontWeight: 600,
                    textDecoration: "none",
                    transition: "transform 150ms ease, background 150ms ease",
                  }}
                >
                  <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                  <span>Watch on YouTube</span>
                </a>
                <div className="vg-modal-quality-chip">1080p HD</div>
              </div>
            </div>

            <div className="vg-modal-details-deluxe">
              <div className="vg-modal-tags-row">
                <span className="vg-modal-category-badge">{video.category.toUpperCase()}</span>
                <span className="vg-modal-level-badge">{video.level}</span>
                <span className="vg-modal-meta-item">{video.views}</span>
                <span className="vg-modal-meta-item">{video.rating}</span>
              </div>

              <h2 className="vg-modal-title-deluxe">{video.title}</h2>
              <p className="vg-modal-desc-deluxe">{video.description}</p>
            </div>
          </div>

          {/* Sidebar Column: Tabs (Chapters vs. Transcript), Doctor Profile, Related */}
          <div className="vg-modal-sidebar-col">
            {/* Sidebar Tab Navigation */}
            <div className="vg-modal-tab-bar">
              <button
                type="button"
                className={`vg-modal-tab-btn ${activeTab === "chapters" ? "active" : ""}`}
                onClick={() => setActiveTab("chapters")}
              >
                Chapters
              </button>
              <button
                type="button"
                className={`vg-modal-tab-btn ${activeTab === "transcript" ? "active" : ""}`}
                onClick={() => setActiveTab("transcript")}
              >
                Transcript
              </button>
            </div>

            {/* Doctor Bio Card */}
            <div className="vg-modal-speaker-card">
              <div className="vg-speaker-card-header">
                <Image
                  src={video.speaker.avatar}
                  alt={video.speaker.name}
                  width={52}
                  height={52}
                  className="vg-modal-speaker-avatar"
                />
                <div>
                  <h4 className="vg-modal-speaker-name" style={{ display: "inline-flex", alignItems: "center", gap: "4px" }}>
                    {video.speaker.name}
                    {video.speaker.verified && (
                      <span className="vg-verified-check" style={{ display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
                        <Check size={10} />
                      </span>
                    )}
                  </h4>
                  <p className="vg-modal-speaker-role">{video.speaker.role}</p>
                </div>
              </div>
              <Link href="/appointment" className="vg-modal-book-btn" style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "6px" }}>
                <span>Book Consultation with Doctor</span>
                <ArrowRight size={14} />
              </Link>
            </div>

            {/* Chapters Tab Content */}
            {activeTab === "chapters" && (
              <div className="vg-modal-chapters-block">
                <h4 className="vg-chapters-heading">
                  <span>Video Chapters</span>
                  <span className="vg-chapters-count">{video.chapters?.length || 0}</span>
                </h4>
                <div className="vg-chapters-list">
                  {video.chapters && video.chapters.length > 0 ? (
                    video.chapters.map((ch) => (
                      <button
                        key={ch.timestamp}
                        type="button"
                        className={`vg-chapter-item ${activeChapter === ch.timestamp ? "active" : ""}`}
                        onClick={() => setActiveChapter(ch.timestamp)}
                      >
                        <span className="vg-chapter-time">{ch.timestamp}</span>
                        <span className="vg-chapter-title">{ch.title}</span>
                      </button>
                    ))
                  ) : (
                    <p className="vg-no-transcript">Full video presentation without chapters.</p>
                  )}
                </div>
              </div>
            )}

            {/* Transcript Tab Content */}
            {activeTab === "transcript" && (
              <div className="vg-modal-transcript-block">
                <h4 className="vg-chapters-heading">Video Subtitles & Transcript</h4>
                <div className="vg-transcript-box">
                  <p>{video.transcript || "Full physician transcript available upon request."}</p>
                </div>
              </div>
            )}

            {/* Related Recommendations Strip */}
            {relatedVideos.length > 0 && (
              <div className="vg-modal-related-block">
                <h4 className="vg-chapters-heading">Related Films</h4>
                <div className="vg-modal-related-list">
                  {relatedVideos.map((rel) => (
                    <div
                      key={rel.id}
                      className="vg-related-mini-card"
                      onClick={() => {
                        if (onSelectRelated) onSelectRelated(rel);
                      }}
                    >
                      <Image
                        src={rel.thumbnail}
                        alt={rel.title}
                        width={90}
                        height={56}
                        className="vg-related-thumb"
                      />
                      <div className="vg-related-info">
                        <h5 className="vg-related-title">{rel.title}</h5>
                        <span className="vg-related-meta">{rel.duration} • {rel.speaker.name}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
