"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { PlayIcon } from "./MediaIcons";
import { getPublicVideos, getImageDisplayUrl } from "@/app/services/api";
import { DataLayerRibbon } from "../common/DataLayerRibbon";

export function VideoShowcase() {
  const [videoList, setVideoList] = useState<any[]>([]);

  useEffect(() => {
    async function loadBackendVideos() {
      try {
        const raw = await getPublicVideos();
        if (Array.isArray(raw) && raw.length > 0) {
          const mapped = raw.map((v: any) => ({
            title: v.title || v.name || "Susrutha Video Experience",
            duration: v.durationMinutes ? `${v.durationMinutes}:00` : "04:15",
            image: getImageDisplayUrl(v.thumbnail || v.coverImage || v.image),
            isBackendData: true,
          }));
          setVideoList(mapped);
        }
      } catch (err) {
        console.error("Failed to load backend videos:", err);
      }
    }
    loadBackendVideos();
  }, []);

  return (
    <section className="media-video" id="video-showcase" aria-labelledby="video-title">
      <div className="media-section-head">
        <span>Video Experience</span>
        <h2 id="video-title">Films that feel calm, cinematic and deeply human.</h2>
      </div>
      <div className="media-video-track">
        {videoList.map((video) => (
          <article key={video.title}>
            <Image src={video.image} alt={video.title} fill sizes="(max-width: 760px) 86vw, 34vw" />
            <button type="button" aria-label={`Play ${video.title}`}><PlayIcon /></button>
            <span>{video.duration}</span>
            <h3>{video.title}</h3>
          </article>
        ))}
      </div>
    </section>
  );
}
