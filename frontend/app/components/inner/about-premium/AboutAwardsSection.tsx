const awards = ["Certificates", "Accreditations", "Recognition", "Patient Trust", "Clinical Excellence"];

export function AboutAwardsSection() {
  return (
    <section className="about-premium-awards">
      <div className="about-premium-section-heading">
        <span>Awards & Recognition</span>
        <h2>Recognition built through trust, consistency, and service.</h2>
      </div>
      <div className="about-premium-logo-wall">
        {awards.map((item) => (
          <span key={item}>{item}</span>
        ))}
      </div>
    </section>
  );
}
