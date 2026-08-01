import { pressItems } from "./mediaData";

export function PressSection() {
  return (
    <section className="media-press" aria-labelledby="press-title">
      <div className="media-section-head">
        <span>Press & Recognition</span>
        <h2 id="press-title">A quiet record of trust, coverage and care leadership.</h2>
      </div>
      <div>
        {pressItems.map((item, index) => (
          <article key={item}>
            <small>0{index + 1}</small>
            <h3>{item}</h3>
            <p>Editorial recognition for patient-centred Ayurveda, physician guidance, and authentic Kerala treatment traditions.</p>
          </article>
        ))}
      </div>
    </section>
  );
}
