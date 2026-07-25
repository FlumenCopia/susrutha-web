"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";

const signatureTreatments = [
  {
    title: "Panchakarma",
    focus: "Deep cleansing therapy",
    copy: "A physician-guided detox journey using classical oil therapies, steam, and cleansing methods to restore balance.",
    image: "/images/treatment-panchakarma.png",
  },
  {
    title: "Kati Vasti",
    focus: "Back and spine support",
    copy: "Warm medicated oil therapy focused on the lower back to ease stiffness, support mobility, and calm chronic discomfort.",
    image: "/images/treatment-kati-vasti.png",
  },
  {
    title: "Njavarakizhi",
    focus: "Strength and nourishment",
    copy: "A rejuvenating rice-bolus therapy that nourishes tissues, supports recovery, and helps the body regain strength.",
    image: "/images/treatment-njavarakizhi.png",
  },
  {
    title: "Sirodhara",
    focus: "Mind and sleep care",
    copy: "A continuous stream of warm herbal oil over the forehead to calm the nervous system and encourage deep relaxation.",
    image: "/images/treatment-sirodhara.png",
  },
  {
    title: "Herbal Medicine",
    focus: "Personalized formulations",
    copy: "Authentic herbal preparations selected by our doctors to support digestion, immunity, recovery, and long-term wellness.",
    image: "/images/treatment-herbal-medicine.png",
  },
];

export function SignatureTreatmentsSection() {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [activeSlide, setActiveSlide] = useState(0);

  const scrollToSlide = useCallback((index: number) => {
    const slider = sliderRef.current;

    if (!slider) {
      return;
    }

    const slides = Array.from(slider.querySelectorAll<HTMLElement>(".signature-treatment-card"));
    const target = slides[index];

    if (!target) {
      return;
    }

    slider.scrollTo({
      left: target.offsetLeft - slides[0].offsetLeft,
      behavior: "smooth",
    });
  }, []);

  const moveSlide = useCallback(
    (direction: 1 | -1) => {
      setActiveSlide((currentSlide) => {
        const nextSlide =
          direction === 1
            ? (currentSlide + 1) % signatureTreatments.length
            : (currentSlide - 1 + signatureTreatments.length) % signatureTreatments.length;

        scrollToSlide(nextSlide);
        return nextSlide;
      });
    },
    [scrollToSlide],
  );

  useEffect(() => {
    const slider = sliderRef.current;

    if (!slider) {
      return;
    }

    const updateActiveSlide = () => {
      const slides = Array.from(slider.querySelectorAll<HTMLElement>(".signature-treatment-card"));
      const sliderStyle = window.getComputedStyle(slider);
      const sliderLeft =
        slider.getBoundingClientRect().left + Number.parseFloat(sliderStyle.paddingLeft);
      let closestIndex = 0;
      let closestDistance = Number.POSITIVE_INFINITY;

      slides.forEach((slide, index) => {
        const distance = Math.abs(slide.getBoundingClientRect().left - sliderLeft);

        if (distance < closestDistance) {
          closestIndex = index;
          closestDistance = distance;
        }
      });

      setActiveSlide(closestIndex);
    };

    slider.addEventListener("scroll", updateActiveSlide, { passive: true });
    window.addEventListener("resize", updateActiveSlide);
    updateActiveSlide();

    return () => {
      slider.removeEventListener("scroll", updateActiveSlide);
      window.removeEventListener("resize", updateActiveSlide);
    };
  }, []);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) {
      return;
    }

    const interval = window.setInterval(() => {
      moveSlide(1);
    }, 4500);

    return () => {
      window.clearInterval(interval);
    };
  }, [moveSlide]);

  return (
    <section className="signature-treatments-section" aria-labelledby="signature-treatments-title">
      <div className="signature-treatments-header">
        <div className="signature-treatment-title-wrap">
          <span aria-hidden="true" />
          <h2 id="signature-treatments-title">Our Signature Treatments</h2>
          <span aria-hidden="true" />
          <i aria-hidden="true" />
        </div>

        <Link className="signature-treatments-link" href="/treatments">
          View All Treatments
          <span aria-hidden="true">&rarr;</span>
        </Link>
      </div>

      <p className="signature-treatments-intro">
        Doctor-led Ayurveda therapies designed around detoxification, pain relief, relaxation,
        rejuvenation, and sustainable everyday wellness.
      </p>

      <div className="signature-treatment-slider-wrap">
        <button
          className="signature-slider-btn signature-slider-btn-prev"
          type="button"
          aria-label="Previous treatment"
          onClick={() => moveSlide(-1)}
        >
          &larr;
        </button>

        <div className="signature-treatment-slider" ref={sliderRef}>
          {signatureTreatments.map((treatment) => (
            <article className="signature-treatment-card" key={treatment.title}>
              <div className="signature-treatment-image">
                <Image
                  src={treatment.image}
                  alt={`${treatment.title} treatment`}
                  fill
                  sizes="(max-width: 700px) 86vw, (max-width: 1100px) 46vw, 20vw"
                />
              </div>
              <div className="signature-treatment-copy">
                <h3>{treatment.title}</h3>
                <span>{treatment.focus}</span>
                <p>{treatment.copy}</p>
                <Link href="/treatments" aria-label={`Read more about ${treatment.title}`}>
                  &rarr;
                </Link>
              </div>
            </article>
          ))}
        </div>

        <button
          className="signature-slider-btn signature-slider-btn-next"
          type="button"
          aria-label="Next treatment"
          onClick={() => moveSlide(1)}
        >
          &rarr;
        </button>
      </div>

      <div className="signature-treatment-dots" aria-label="Treatment slides">
        {signatureTreatments.map((treatment, index) => (
          <button
            type="button"
            key={treatment.title}
            aria-label={`Show ${treatment.title}`}
            aria-current={activeSlide === index ? "true" : undefined}
            onClick={() => {
              setActiveSlide(index);
              scrollToSlide(index);
            }}
          />
        ))}
      </div>
    </section>
  );
}
