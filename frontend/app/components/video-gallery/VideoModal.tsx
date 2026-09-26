"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { X } from "lucide-react";
import { VideoItem } from "./FeaturedVideoCard";
import { isVideoFile } from "@/app/services/api";

type VideoModalProps = {
  video: VideoItem | null;
  allVideos?: VideoItem[];
  onClose: () => void;
  onSelectRelated?: (video: VideoItem) => void;
};

export function VideoModal({ video, onClose }: VideoModalProps) {
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

  const isHtml5Video = isVideoFile(video.videoUrl) || isVideoFile(video.thumbnail);
  const isYoutube = Boolean(video.youtubeId);
  const isImage = !isHtml5Video && !isYoutube;
  const directVideoSource = (isVideoFile(video.videoUrl) ? video.videoUrl : null) || (isVideoFile(video.thumbnail) ? video.thumbnail : null) || video.videoUrl || video.thumbnail;

  return (
    <div className="vg-modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div
        className="vg-modal-container-deluxe"
        onClick={(e) => e.stopPropagation()}
        style={{
          maxWidth: "960px",
          width: "92vw",
          borderRadius: "20px",
          background: "#141414",
          boxShadow: "0 35px 80px rgba(0, 0, 0, 0.85)",
          border: "1px solid rgba(255, 255, 255, 0.12)",
          padding: "20px",
          overflow: "hidden",
        }}
      >
        <button
          type="button"
          className="vg-modal-close-btn-deluxe"
          onClick={onClose}
          aria-label="Close modal"
          style={{ display: "flex", alignItems: "center", justifyContent: "center" }}
        >
          <X size={18} />
        </button>

        <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
          {/* Main Media Player */}
          {isHtml5Video ? (
            <div
              style={{
                position: "relative",
                width: "100%",
                height: "560px",
                maxHeight: "75vh",
                background: "#000000",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "14px",
                overflow: "hidden",
                boxShadow: "0 20px 40px rgba(0,0,0,0.6)",
              }}
            >
              <video
                src={directVideoSource}
                controls
                autoPlay
                playsInline
                style={{
                  width: "100%",
                  height: "100%",
                  maxHeight: "100%",
                  maxWidth: "100%",
                  objectFit: "contain",
                  display: "block",
                  margin: "auto",
                }}
              />
            </div>
          ) : isImage ? (
            <div
              style={{
                position: "relative",
                width: "100%",
                height: "560px",
                maxHeight: "75vh",
                background: "#000000",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "14px",
                overflow: "hidden",
              }}
            >
              {video.thumbnail ? (
                <Image
                  src={video.thumbnail}
                  alt={video.title}
                  fill
                  style={{ objectFit: "contain" }}
                  priority
                />
              ) : (
                <div style={{ color: "#ffffff", opacity: 0.6 }}>No image available</div>
              )}
            </div>
          ) : (
            <div className="vg-modal-video-aspect" style={{ borderRadius: "14px", overflow: "hidden" }}>
              <iframe
                src={`https://www.youtube.com/embed/${video.youtubeId}?autoplay=1`}
                title={video.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="vg-modal-iframe"
              />
            </div>
          )}

          {/* YouTube Playback Control Bar */}
          {!isImage && video.youtubeId ? (
            <div className="vg-modal-control-bar" style={{ marginTop: "12px" }}>
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
                  }}
                >
                  <span>Watch on YouTube</span>
                </a>
                <div className="vg-modal-quality-chip">1080p HD</div>
              </div>
            </div>
          ) : null}

          {/* Video Metadata / Details Row */}
          <div className="vg-modal-details-deluxe" style={{ marginTop: "16px", padding: "0 4px" }}>
            <div className="vg-modal-tags-row">
              {video.category ? <span className="vg-modal-category-badge">{video.category.toUpperCase()}</span> : null}
              {video.level ? <span className="vg-modal-level-badge">{video.level}</span> : null}
              {video.views ? <span className="vg-modal-meta-item">{video.views}</span> : null}
              {video.rating ? <span className="vg-modal-meta-item">{video.rating}</span> : null}
            </div>

            <h2 className="vg-modal-title-deluxe" style={{ fontSize: "1.45rem", fontWeight: 700, margin: "6px 0" }}>{video.title}</h2>
            {video.description ? <p className="vg-modal-desc-deluxe" style={{ color: "rgba(255,255,255,0.75)", lineHeight: 1.6 }}>{video.description}</p> : null}
          </div>
        </div>
      </div>
    </div>
  );
}
