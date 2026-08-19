import { UserCheck, Zap, ShieldCheck, Headphones } from "lucide-react";

export function AppointmentTrustSection() {
  const trustItems = [
    {
      icon: <UserCheck size={26} strokeWidth={1.75} />,
      title: "Senior Vaidya Consultation",
      text: "Diagnosed by experienced Ayurvedic post-graduates and senior specialists.",
    },
    {
      icon: <Zap size={26} strokeWidth={1.75} />,
      title: "Zero Waiting Time",
      text: "Prioritized appointment slots ensure prompt consultation without queue delays.",
    },
    {
      icon: <ShieldCheck size={26} strokeWidth={1.75} />,
      title: "100% Confidential Care",
      text: "Private consultation suites & secure digital health records.",
    },
    {
      icon: <Headphones size={26} strokeWidth={1.75} />,
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
                {item.icon}
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
