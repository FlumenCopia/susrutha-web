import Link from "next/link";
import "./about-hero.css";

const aboutValues = [
  {
    title: "Compassion",
    copy: "We care with empathy and understanding.",
    image: "/images/opt_womens_health.jpg",
  },
  {
    title: "Integrity",
    copy: "Honest practices you can trust.",
    image: "/images/about_pillar_ayurveda.jpg",
  },
  {
    title: "Excellence",
    copy: "Committed to the highest standard of care.",
    image: "/images/heritage-master.webp",
  },
  {
    title: "Sustainability",
    copy: "Healing today for a healthier tomorrow.",
    image: "/images/about-purpose-vision-plant.webp",
  },
  {
    title: "Holistic Approach",
    copy: "Mind, body and spirit in perfect balance.",
    image: "/images/opt_spine_joint.jpg",
  },
];

export function AboutHeroSection() {
  const imageSrc = "/images/about-susrutha-wellness.webp";

  return (
    <section className="about-hero-fullbleed">
      {/* Background Media Container - Image Only */}
      <div className="about-hero-media-wrapper">
        <img
          src={imageSrc}
          alt="Susrutha Ayurveda Hospital Wellness Care"
          className="about-hero-img active"
        />
      </div>

      {/* Dark Translucent Gradient Overlay */}
      <div className="about-hero-overlay-dark" />

      {/* Hero Main Content Container */}
      <div className="about-hero-content-container">
        <h1 className="about-hero-giant-heading">
          HEALING FOR
          <br />
          BODY &amp; SOUL
        </h1>

        <p className="about-hero-description">
          Multidisciplinary Ayurvedic &amp; Panchakarma excellence creating bespoke healing, rehabilitative, and wellness care for every individual.
        </p>
      </div>

      {/* Floating Bottom Glass Values Bar */}
      <div className="about-hero-values-floating">
        {aboutValues.map((item) => (
          <article className="about-hero-value-card" key={item.title}>
            <span className="about-hero-value-icon">
              <img
                src={item.image}
                alt={item.title}
                style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "50%" }}
              />
            </span>
            <div className="about-hero-value-text">
              <h3>{item.title}</h3>
              <p>{item.copy}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
