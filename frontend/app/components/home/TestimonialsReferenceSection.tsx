"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { getPublicTestimonials, getImageDisplayUrl } from "@/app/services/api";
import { DataLayerRibbon } from "../common/DataLayerRibbon";

type TestimonialItem = {
  name: string;
  place: string;
  image: string;
  copy: string;
};

const stats = [
  ["people", "25K+", "Happy Patients", "Healed with care and compassion"],
  ["lotus", "98%", "Patient Satisfaction", "Trusted by thousands across India"],
  ["hands", "20+", "Years of Healing", "Rooted in ancient wisdom"],
  ["shield", "10+", "Specialized Therapies", "Holistic care for every individual"],
];

const initialTestimonials: (TestimonialItem & { isBackendData?: boolean })[] = [
  {
    name: "Sunil Kumar",
    place: "Trivandrum",
    image: "/images/doctor-portrait.webp",
    copy: "The Panchakarma care at Susrutha Kattakada was deeply therapeutic. The doctors and therapists provided attentive, personalized treatment.",
  },
  {
    name: "Anitha R.",
    place: "Kowdiar",
    image: "/images/doctor-portrait.webp",
    copy: "Outstanding outpatient consultation at Kowdiar OP clinic. Professional, warm, and highly effective Ayurvedic guidance.",
  },
];

export function TestimonialsReferenceSection() {
  const [testimonialList, setTestimonialList] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    async function loadTestimonials() {
      try {
        setLoading(true);
        const data = await getPublicTestimonials();
        if (Array.isArray(data) && data.length > 0) {
          const normalized = data.map((t: any) => ({
            name: t.patientName || t.name,
            place: t.patientLocation || t.place || 'Kerala',
            image: getImageDisplayUrl(t.patientPhoto || t.image),
            copy: t.reviewText || t.copy || t.message || '',
            isBackendData: true,
          }));
          setTestimonialList(normalized);
        } else {
          setTestimonialList(initialTestimonials);
        }
      } catch (err) {
        console.error("Failed to load live testimonials:", err);
        setTestimonialList(initialTestimonials);
      } finally {
        setLoading(false);
      }
    }
    loadTestimonials();
  }, []);

  if (!loading && testimonialList.length === 0) {
    return null;
  }

  const visibleTestimonials = [-1, 0, 1].map((offset) => {
    const len = testimonialList.length || 1;
    const index = (activeIndex + offset + len) % len;
    const item = testimonialList[index] || { name: "", place: "", image: "", copy: "" };
    return {
      ...item,
      position: offset === 0 ? "center" : offset < 0 ? "left" : "right",
    };
  });

  const move = (direction: 1 | -1) => {
    const len = testimonialList.length || 1;
    setActiveIndex((current) => (current + direction + len) % len);
  };

  return (
    <section className="testimonials-reference-section" aria-labelledby="testimonials-reference-title">
      <div className="testimonials-reference-decor testimonials-reference-decor-left" aria-hidden="true">
        <Image src="/images/testimonials-left-corner.webp" alt="" fill sizes="520px" />
      </div>
      <div className="testimonials-reference-decor testimonials-reference-decor-right" aria-hidden="true">
        <Image src="/images/home-hero-reference.webp" alt="" fill sizes="330px" />
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
            {visibleTestimonials.map((testimonial) => {
              return (
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
              );
            })}
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
          {testimonialList.map((testimonial, index) => (
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
