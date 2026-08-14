import Image from "next/image";
import Link from "next/link";
import "./about-founders.css";

const founders = [
  {
    name: "Dr. Nikhil Sharma",
    role: "Founder & Chief Physician",
    copy: "18+ years of experience in Panchakarma and holistic healing.",
    image: "/images/founder-nikhil-sharma.webp",
    href: "/doctors",
  },
  {
    name: "Dr. Meera Iyer",
    role: "Founder & Wellness Director",
    copy: "Specialist in women's health, nutrition and preventive care.",
    image: "/images/founder-meera-iyer.webp",
    href: "/doctors",
  },
  {
    name: "Dr. Arjun Das",
    role: "Founder & Research Director",
    copy: "Passionate about Ayurvedic research and evidence-based practices.",
    image: "/images/founder-arjun-das.webp",
    href: "/doctors",
  },
  {
    name: "Dr. Anjali Nair",
    role: "Senior Physician & Care Lead",
    copy: "Expert in traditional rejuvenation therapies and patient care.",
    image: "/images/doctor-portrait.webp",
    href: "/doctors",
  },
];

export function AboutFoundersSection() {
  return (
    <section className="af-section">
      <div className="af-container">
        <header className="af-header">
          <span className="af-eyebrow">OUR CORE LEADERSHIP</span>
          <h2 className="af-title">Rooted in Ayurveda. Driven by Purpose.</h2>
        </header>

        <div className="af-grid">
          {founders.map((founder) => (
            <Link href={founder.href} className="af-card" key={founder.name}>
              <Image
                src={founder.image}
                alt={founder.name}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1100px) 50vw, 25vw"
                className="af-card-img"
              />
              <div className="af-card-overlay">
                <div className="af-card-content">
                  <h3 className="af-card-name">{founder.name}</h3>
                  <p className="af-card-role">{founder.role}</p>
                  <p className="af-card-copy">{founder.copy}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
