"use client";

import Image from "next/image";
import { useState } from "react";

const testimonials = [
  {
    name: "Priya Menon",
    place: "Bangalore",
    image: "/images/doctor-portrait.png",
    copy:
      "Susrutha's personalized treatments helped me overcome chronic stress and improved my overall well-being. Truly life-changing experience!",
  },
  {
    name: "Rohit Sharma",
    place: "Hyderabad",
    image: "/images/doctor-portrait.png",
    copy:
      "The doctors listen with patience and provide treatments that address the root cause. My energy, sleep, and digestion have improved remarkably.",
  },
  {
    name: "Ananya Iyer",
    place: "Chennai",
    image: "/images/doctor-portrait.png",
    copy:
      "From Panchakarma to diet guidance, everything was so well-planned. I felt cared for at every step of my healing journey.",
  },
  {
    name: "Vikram Nair",
    place: "Kochi",
    image: "/images/doctor-portrait.png",
    copy:
      "The care felt personal, calm, and deeply authentic. The team guided me with clarity throughout my wellness program.",
  },
  {
    name: "Asha Rao",
    place: "Mysore",
    image: "/images/doctor-portrait.png",
    copy:
      "Every visit felt reassuring. The therapies, food guidance, and follow-up helped me feel balanced again.",
  },
];

const stats = [
  ["people", "25K+", "Happy Patients", "Healed with care and compassion"],
  ["lotus", "98%", "Patient Satisfaction", "Trusted by thousands across India"],
  ["hands", "20+", "Years of Healing", "Rooted in ancient wisdom"],
  ["shield", "10+", "Specialized Therapies", "Holistic care for every individual"],
];

function getVisibleTestimonials(activeIndex: number) {
  return [-1, 0, 1].map((offset) => {
    const index = (activeIndex + offset + testimonials.length) % testimonials.length;

    return {
      ...testimonials[index],
      position: offset === 0 ? "center" : offset < 0 ? "left" : "right",
    };
  });
}

export function TestimonialsReferenceSection() {
  const [activeIndex, setActiveIndex] = useState(1);
  const visibleTestimonials = getVisibleTestimonials(activeIndex);

  const move = (direction: 1 | -1) => {
    setActiveIndex((current) => (current + direction + testimonials.length) % testimonials.length);
  };

  return (
    <section className="testimonials-reference-section" aria-labelledby="testimonials-reference-title">
      <div className="testimonials-reference-decor testimonials-reference-decor-left" aria-hidden="true">
        <Image src="/images/testimonials-left-corner.png" alt="" fill sizes="520px" />
      </div>
      <div className="testimonials-reference-decor testimonials-reference-decor-right" aria-hidden="true">
        <Image src="/images/home-hero-reference.png" alt="" fill sizes="330px" />
      </div>

      <div className="testimonials-reference-inner">
        <div className="testimonials-reference-heading">
          <span className="testimonials-reference-eyebrow">
            <i aria-hidden="true" />
            Testimonials
          </span>
          <h2 id="testimonials-reference-title">
            Trusted by Thousands.
            <em>Healed Naturally.</em>
          </h2>
          <span className="testimonials-reference-divider" aria-hidden="true" />
          <p>
            Real stories from real people who experienced the transformative power of Ayurvedic
            healing.
          </p>
        </div>

        <div className="testimonials-reference-stage">
          <button
            className="testimonials-reference-arrow testimonials-reference-arrow-prev"
            type="button"
            aria-label="Previous testimonial"
            onClick={() => move(-1)}
          >
            &larr;
          </button>

          <div className="testimonials-reference-cards">
            {visibleTestimonials.map((testimonial) => (
              <article
                className="testimonials-reference-card"
                data-position={testimonial.position}
                key={`${testimonial.name}-${testimonial.position}`}
              >
                <span className="testimonials-reference-quote" aria-hidden="true">
                  &ldquo;
                </span>
                <div className="testimonials-reference-avatar">
                  <Image
                    src={testimonial.image}
                    alt={testimonial.name}
                    fill
                    sizes="88px"
                  />
                </div>
                <div className="testimonials-reference-stars" aria-label="5 star rating">
                  <span aria-hidden="true">&#9733;&#9733;&#9733;&#9733;&#9733;</span>
                </div>
                <p>{testimonial.copy}</p>
                <i aria-hidden="true" />
                <h3>{testimonial.name}</h3>
                <small>{testimonial.place}</small>
                <b aria-hidden="true" />
              </article>
            ))}
          </div>

          <button
            className="testimonials-reference-arrow testimonials-reference-arrow-next"
            type="button"
            aria-label="Next testimonial"
            onClick={() => move(1)}
          >
            &rarr;
          </button>
        </div>

        <div className="testimonials-reference-dots" aria-label="Testimonials">
          {testimonials.map((testimonial, index) => (
            <button
              type="button"
              key={testimonial.name}
              aria-label={`Show testimonial from ${testimonial.name}`}
              aria-current={activeIndex === index ? "true" : undefined}
              onClick={() => {
                setActiveIndex(index);
              }}
            />
          ))}
        </div>

        <div className="testimonials-reference-stats" aria-label="Patient care highlights">
          {stats.map(([icon, value, label, copy]) => (
            <div className="testimonials-reference-stat" data-icon={icon} key={label}>
              <span aria-hidden="true" />
              <div>
                <strong>{value}</strong>
                <p>{label}</p>
                <small>{copy}</small>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
