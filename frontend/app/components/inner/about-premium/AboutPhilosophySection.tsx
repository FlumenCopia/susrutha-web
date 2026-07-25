const philosophy = [
  {
    title: "Healing",
    text: "Classical treatment plans shaped around the patient constitution, condition, rhythm, and recovery goals.",
  },
  {
    title: "Research",
    text: "A disciplined approach to documentation, observation, and continuous learning within Ayurveda practice.",
  },
  {
    title: "Authenticity",
    text: "Therapies, medicines, and guidance rooted in Ayurveda tradition and delivered with modern clarity.",
  },
  {
    title: "Compassion",
    text: "Calm communication, careful listening, and long-term support through every stage of care.",
  },
];

export function AboutPhilosophySection() {
  return (
    <section className="about-premium-philosophy">
      <div className="about-premium-section-heading">
        <span>Our Philosophy</span>
        <h2>Four principles guide every care journey.</h2>
      </div>
      <div className="about-premium-philosophy-grid">
        {philosophy.map((item, index) => (
          <article key={item.title}>
            <i aria-hidden="true">{String(index + 1).padStart(2, "0")}</i>
            <h3>{item.title}</h3>
            <p>{item.text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
