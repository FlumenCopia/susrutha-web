export function AppointmentTrustSection() {
  const trustItems = [
    {
      icon: "👨‍⚕️",
      title: "Senior Vaidya Consultation",
      text: "Diagnosed by experienced Ayurvedic post-graduates and senior specialists.",
    },
    {
      icon: "⚡",
      title: "Zero Waiting Time",
      text: "Prioritized appointment slots ensure prompt consultation without queue delays.",
    },
    {
      icon: "🛡️",
      title: "100% Confidential Care",
      text: "Private consultation suites & secure digital health records.",
    },
    {
      icon: "📞",
      title: "Dedicated Care Officer",
      text: "Personal support for therapy preparation, lab reports & follow-up diet.",
    },
  ];

  return (
    <section className="apt-trust-section">
      <div className="apt-trust-container">
        <div className="apt-trust-grid">
          {trustItems.map((item) => (
            <article key={item.title} className="apt-trust-card">
              <span className="apt-trust-icon">{item.icon}</span>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
