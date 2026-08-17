"use client";

import Image from "next/image";
import { VideoItem } from "./FeaturedVideoCard";

export type PatientStory = {
  id: string;
  patientName: string;
  ageLocation: string;
  age?: string;
  condition: string;
  treatmentDuration: string;
  quote: string;
  thumbnail: string;
  youtubeId: string;
  rating: string;
};

type PatientStoriesSectionProps = {
  stories?: PatientStory[];
  onPlayVideo: (video: VideoItem) => void;
};

export function PatientStoriesSection({ stories = [], onPlayVideo }: PatientStoriesSectionProps) {
  if (stories.length === 0) return null;
  const handleStoryClick = (story: PatientStory) => {
    onPlayVideo({
      id: story.id,
      title: `${story.patientName}'s Recovery Story`,
      description: `Patient journey for ${story.condition} following ${story.treatmentDuration}. "${story.quote}"`,
      category: "Panchakarma",
      duration: "04:30",
      thumbnail: story.thumbnail,
      youtubeId: story.youtubeId,
      views: "Verified Journey",
      rating: story.rating,
      level: "Beginner",
      speaker: {
        name: story.patientName,
        role: `Patient • ${story.condition}`,
        avatar: story.thumbnail,
        verified: true,
      },
    });
  };

  return (
    <section className="vg-patient-stories-section" aria-labelledby="patient-stories-heading">
      <div className="vg-section-header">
        <div className="vg-section-title-group">
          <div className="vg-eyebrow-accent">PATIENT RECOVERY JOURNEYS</div>
          <h2 id="patient-stories-heading" className="vg-section-title">
            Patient Transformation Stories <span className="vg-leaf-accent" aria-hidden="true"><i className="fa-solid fa-star" /></span>
          </h2>
          <p className="vg-section-subhead">Hear directly from patients who experienced healing through classical Panchakarma care</p>
        </div>
      </div>

      <div className="vg-stories-grid">
        {stories.map((ps) => (
          <article
            key={ps.id}
            className="vg-story-card"
            onClick={() => handleStoryClick(ps)}
          >
            <div className="vg-story-thumb-wrapper">
              <Image
                src={ps.thumbnail}
                alt={ps.patientName}
                width={360}
                height={210}
                className="vg-story-thumb-img"
              />
              <div className="vg-story-overlay" />

              <div className="vg-story-badge-top">
                <span className="vg-story-verified-chip">✔ Verified Patient</span>
                <span className="vg-story-rating-chip">{ps.rating}</span>
              </div>

              <button
                type="button"
                className="vg-story-play-btn"
                aria-label={`Play story of ${ps.patientName}`}
              >
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </button>

              <div className="vg-story-duration-tag">{ps.treatmentDuration}</div>
            </div>

            <div className="vg-story-body">
              <div className="vg-story-patient-header">
                <div>
                  <h4 className="vg-story-patient-name">{ps.patientName}</h4>
                  <span className="vg-story-condition">{ps.condition} • {ps.age || ps.ageLocation}</span>
                </div>
              </div>
              <blockquote className="vg-story-quote">
                &ldquo;{ps.quote}&rdquo;
              </blockquote>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
