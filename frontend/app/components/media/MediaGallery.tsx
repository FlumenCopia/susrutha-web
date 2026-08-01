import Image from "next/image";
import { mediaItems } from "./mediaData";
import { PlayIcon } from "./MediaIcons";

export function MediaGallery() {
  return (
    <section className="media-gallery-section" id="media-gallery" aria-labelledby="media-gallery-title">
      <div className="media-section-head">
        <span>Visual Archive</span>
        <h2 id="media-gallery-title">A curated wall of stories, places, people and rituals.</h2>
      </div>
      <div className="media-gallery">
        {mediaItems.map((item, index) => (
          <article className="media-card" data-size={index % 4 === 0 ? "large" : index % 3 === 0 ? "wide" : "standard"} key={`${item.title}-${index}`}>
            <Image src={item.image} alt="" fill sizes="(max-width: 760px) 100vw, 33vw" />
            <div>
              <span>{item.type}</span>
              <h3>{item.title}</h3>
              <small>{item.kicker} / {item.date}</small>
            </div>
            {item.duration ? <button type="button" aria-label={`Play ${item.title}`}><PlayIcon /></button> : null}
          </article>
        ))}
      </div>
    </section>
  );
}
