import Link from "next/link";
import { ArrowIcon } from "./MediaIcons";

export function MediaCTA() {
  return (
    <section className="media-cta" aria-labelledby="media-cta-title">
      <span>Collaborate with our media desk</span>
      <h2 id="media-cta-title">Bring a wellness story, interview, event or brand experience to life.</h2>
      <Link href="/contact-us">Start a conversation <ArrowIcon /></Link>
    </section>
  );
}
