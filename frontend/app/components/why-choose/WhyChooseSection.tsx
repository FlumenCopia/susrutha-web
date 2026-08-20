const stats = [
  { value: "36+", label: "Years of Experience" },
  { value: "50,000+", label: "Happy Patients" },
  { value: "40+", label: "Specialized Treatments" },
  { value: "NABH", label: "Certified" },
  { value: "100%", label: "Natural & Safe" },
];

const features = [
  { title: "Authentic Ayurveda", copy: "Ayurvedic healing rooted in classical texts." },
  { title: "Expert Doctors", copy: "Experienced doctors and multidisciplinary care." },
  { title: "Panchakarma Experts", copy: "Specialized detoxification and rejuvenation therapies." },
  { title: "Herbal Pharmacy", copy: "Quality herbal medicine manufacturing." },
  { title: "Research & Development", copy: "Continuous research for better treatment outcomes." },
  { title: "Personalized Care", copy: "Individual care plans for holistic health." },
];

export function WhyChooseSection() {
  return (
    <section className="why-section" aria-labelledby="why-title">
      <div className="why-stats" aria-label="Susrutha Ayurveda highlights">
        {stats.map((item) => (
          <div className="why-stat" key={item.label}>
            <span className="why-stat-icon" aria-hidden="true" />
            <strong>{item.value}</strong>
            <p>{item.label}</p>
          </div>
        ))}
      </div>

      <div className="why-content">
        <div className="why-copy">
          <span className="eyebrow">Why Choose Susrutha Ayurveda</span>
          <h2 id="why-title">
            A Legacy of Healing. <br />
            A Commitment to <span>Care.</span>
          </h2>
          <p>
            We blend the timeless wisdom of Ayurveda with modern patient care standards to
            deliver authentic, effective, and personalized treatments.
          </p>

          <div className="why-feature-grid">
            {features.map((feature) => (
              <article className="why-feature" key={feature.title}>
                <span aria-hidden="true" />
                <h3>{feature.title}</h3>
                <p>{feature.copy}</p>
              </article>
            ))}
          </div>
        </div>

        <div className="why-visuals" aria-label="Susrutha Ayurveda care visuals">
          <div className="why-image-large" />
          <div className="why-quote-card">
            <span aria-hidden="true" />
            <p>
              Preserving the purity of Ayurveda and delivering the best care to every individual.
            </p>
            <small>- Dr. K. Ramankutty, Chief Physician</small>
          </div>
          <div className="why-doctor-card">
            <div className="doctor-portrait" />
            <div>
              <strong>Doctor-led care</strong>
              <p>Consultation, therapies, pharmacy, and follow-up in one trusted care journey.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
