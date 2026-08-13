export function AppointmentTrustSection() {
  const trustItems = [
    {
      iconClass: "fa-solid fa-user-doctor",
      title: "Senior Vaidya Consultation",
      text: "Diagnosed by experienced Ayurvedic post-graduates and senior specialists.",
    },
    {
      iconClass: "fa-solid fa-bolt",
      title: "Zero Waiting Time",
      text: "Prioritized appointment slots ensure prompt consultation without queue delays.",
    },
    {
      iconClass: "fa-solid fa-shield-halved",
      title: "100% Confidential Care",
      text: "Private consultation suites & secure digital health records.",
    },
    {
      iconClass: "fa-solid fa-phone",
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
              <span className="apt-trust-icon">
                <i className={item.iconClass} aria-hidden="true" />
              </span>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
