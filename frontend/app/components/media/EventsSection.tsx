import Image from "next/image";
import { events } from "./mediaData";

export function EventsSection() {
  return (
    <section className="media-events" aria-labelledby="events-title">
      <div className="media-section-head">
        <span>Events & Experiences</span>
        <h2 id="events-title">Moments designed for learning, presence and connection.</h2>
      </div>
      <div>
        {events.map((event) => (
          <article key={event.title}>
            <Image src={event.image} alt="" width={420} height={280} />
            <time>{event.date}</time>
            <div>
              <h3>{event.title}</h3>
              <p>{event.location}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
