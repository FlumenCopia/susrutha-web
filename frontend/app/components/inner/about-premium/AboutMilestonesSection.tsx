const milestones = ["1987", "1995", "2005", "2015", "2025"];

export function AboutMilestonesSection() {
  return (
    <section className="about-premium-milestones">
      <div className="about-premium-section-heading">
        <span>Milestones</span>
        <h2>A long journey of care, learning, and service.</h2>
      </div>
      <div className="about-premium-timeline">
        {milestones.map((year) => (
          <div key={year}>
            <i />
            <strong>{year}</strong>
          </div>
        ))}
      </div>
    </section>
  );
}
