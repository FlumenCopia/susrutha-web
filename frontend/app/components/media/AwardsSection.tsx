import { awards } from "./mediaData";

export function AwardsSection() {
  return (
    <section className="media-awards" aria-labelledby="awards-title">
      <div className="media-section-head">
        <span>Awards</span>
        <h2 id="awards-title">Signals of excellence, shaped by everyday care.</h2>
      </div>
      <div>
        {awards.map((award) => (
          <article key={award}>
            <span>{award}</span>
            <strong>2026</strong>
          </article>
        ))}
      </div>
    </section>
  );
}
