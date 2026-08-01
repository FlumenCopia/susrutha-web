import Image from "next/image";
import { mediaItems } from "./mediaData";

export function SocialMediaWall() {
  return (
    <section className="media-social" aria-labelledby="social-title">
      <div className="media-section-head">
        <span>Social Wall</span>
        <h2 id="social-title">Fragments from the living world of Susrutha.</h2>
      </div>
      <div>
        {mediaItems.map((item, index) => (
          <article key={`${item.title}-social`}>
            <Image src={item.image} alt="" fill sizes="(max-width: 760px) 50vw, 18vw" />
            <span>{index % 2 === 0 ? "IG" : "YT"}</span>
          </article>
        ))}
      </div>
    </section>
  );
}
