import Image from "next/image";
import { mediaItems } from "./mediaData";
import { PlayIcon } from "./MediaIcons";

export function FeaturedMedia() {
  const item = mediaItems[0];

  return (
    <section className="media-featured" aria-labelledby="featured-media-title">
      <article>
        <Image src={item.image} alt="" fill sizes="(max-width: 900px) 100vw, 86vw" />
        <button type="button" aria-label={`Play ${item.title}`}>
          <PlayIcon />
        </button>
        <div>
          <span>{item.type}</span>
          <h2 id="featured-media-title">{item.title}</h2>
          <p>A cinematic look at physician-directed care, calm spaces, and the disciplined rhythm behind classical treatment experiences.</p>
          <small>{item.date} / Susrutha Media Desk</small>
        </div>
      </article>
    </section>
  );
}
