import Image from "next/image";
import { videos } from "./mediaData";
import { PlayIcon } from "./MediaIcons";

export function VideoShowcase() {
  return (
    <section className="media-video" id="video-showcase" aria-labelledby="video-title">
      <div className="media-section-head">
        <span>Video Experience</span>
        <h2 id="video-title">Films that feel calm, cinematic and deeply human.</h2>
      </div>
      <div className="media-video-track">
        {videos.map((video) => (
          <article key={video.title}>
            <Image src={video.image} alt="" fill sizes="(max-width: 760px) 86vw, 34vw" />
            <button type="button" aria-label={`Play ${video.title}`}><PlayIcon /></button>
            <span>{video.duration}</span>
            <h3>{video.title}</h3>
          </article>
        ))}
      </div>
    </section>
  );
}
