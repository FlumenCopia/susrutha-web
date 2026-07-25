"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";

const treatments = [
  {
    title: "Panchakarma",
    copy: "Detoxify and cleanse your body.",
    image: "/images/treatment-herbal-medicine.png",
  },
  {
    title: "Abhyangam",
    copy: "Therapeutic oil massage for total relaxation.",
    image: "/images/treatment-kati-vasti.png",
  },
  {
    title: "Shirodhara",
    copy: "Calms the mind and nervous system.",
    image: "/images/treatment-sirodhara.png",
  },
  {
    title: "Herbal Therapies",
    copy: "Natural herbs for effective healing.",
    image: "/images/treatment-njavarakizhi.png",
  },
  {
    title: "Nutrition & Diet",
    copy: "Personalised diet plans for a healthier you.",
    image: "/images/faq-ayurveda-still-life.png",
  },
  {
    title: "Wellness Programs",
    copy: "Holistic programs for health & immunity.",
    image: "/images/ayurveda-village-path.png",
  },
  {
    title: "Kati Vasti",
    copy: "Warm oil care for back and spine support.",
    image: "/images/treatment-kati-vasti.png",
  },
  {
    title: "Njavarakizhi",
    copy: "Rejuvenating therapy for strength and recovery.",
    image: "/images/treatment-njavarakizhi.png",
  },
  {
    title: "Herbal Medicine",
    copy: "Doctor-guided formulations for long-term wellness.",
    image: "/images/treatment-herbal-medicine.png",
  },
  {
    title: "Ayurveda Retreats",
    copy: "Restorative programs in a calm healing setting.",
    image: "/images/ayurveda-hospital-garden.png",
  },
];

export function SignatureTreatmentsSection() {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(1);

  const maxSlideIndex = Math.max(treatments.length - visibleCount, 0);
  const slideIndexes = Array.from(
    new Set([
      ...Array.from(
        { length: Math.ceil(treatments.length / Math.max(visibleCount, 1)) },
        (_, index) => Math.min(index * Math.max(visibleCount, 1), maxSlideIndex),
      ),
      maxSlideIndex,
    ]),
  );
  const activeDotIndex = slideIndexes.reduce((closestIndex, slideIndex, index) => {
    const closestDistance = Math.abs(slideIndexes[closestIndex] - activeIndex);
    const currentDistance = Math.abs(slideIndex - activeIndex);

    return currentDistance < closestDistance ? index : closestIndex;
  }, 0);

  const scrollToCard = useCallback((index: number) => {
    const slider = sliderRef.current;

    if (!slider) {
      return;
    }

    const cards = Array.from(slider.querySelectorAll<HTMLElement>(".treatments-reference-card"));
    const safeIndex = Math.min(Math.max(index, 0), Math.max(cards.length - 1, 0));
    const card = cards[safeIndex];

    if (!card) {
      return;
    }

    setActiveIndex(Math.min(safeIndex, Math.max(treatments.length - visibleCount, 0)));

    slider.scrollTo({
      left: card.offsetLeft - slider.offsetLeft,
      behavior: "smooth",
    });
  }, [visibleCount]);

  const moveSlider = useCallback(
    (direction: 1 | -1) => {
      const maxIndex = Math.max(treatments.length - visibleCount, 0);
      const step = Math.max(visibleCount, 1);
      const requestedIndex = activeIndex + direction * step;
      let nextIndex = requestedIndex;

      if (direction === 1) {
        nextIndex = activeIndex >= maxIndex ? 0 : Math.min(requestedIndex, maxIndex);
      } else {
        nextIndex = activeIndex <= 0 ? maxIndex : Math.max(requestedIndex, 0);
      }

      scrollToCard(nextIndex);
    },
    [activeIndex, scrollToCard, visibleCount],
  );

  useEffect(() => {
    const slider = sliderRef.current;

    if (!slider) {
      return;
    }

    let animationFrame = 0;
    const cards = () => Array.from(slider.querySelectorAll<HTMLElement>(".treatments-reference-card"));

    const updateSliderState = () => {
      window.cancelAnimationFrame(animationFrame);
      animationFrame = window.requestAnimationFrame(() => {
        const cardElements = cards();
        const firstCard = cardElements[0];

        if (!firstCard) {
          return;
        }

        const cardWidth = firstCard.getBoundingClientRect().width;
        const nextCard = cardElements[1];
        const gap = nextCard ? nextCard.offsetLeft - firstCard.offsetLeft - cardWidth : 0;
        const nextVisibleCount = Math.max(1, Math.floor((slider.clientWidth + gap) / (cardWidth + gap)));
        const sliderLeft = slider.getBoundingClientRect().left;
        let closestIndex = 0;
        let closestDistance = Number.POSITIVE_INFINITY;

        cardElements.forEach((card, index) => {
          const distance = Math.abs(card.getBoundingClientRect().left - sliderLeft);

          if (distance < closestDistance) {
            closestDistance = distance;
            closestIndex = index;
          }
        });

        setVisibleCount(nextVisibleCount);
        setActiveIndex(Math.min(closestIndex, Math.max(treatments.length - nextVisibleCount, 0)));
      });
    };

    const resizeObserver = new ResizeObserver(updateSliderState);

    resizeObserver.observe(slider);
    slider.addEventListener("scroll", updateSliderState, { passive: true });
    window.addEventListener("resize", updateSliderState);
    updateSliderState();

    return () => {
      window.cancelAnimationFrame(animationFrame);
      resizeObserver.disconnect();
      slider.removeEventListener("scroll", updateSliderState);
      window.removeEventListener("resize", updateSliderState);
    };
  }, []);

  return (
    <section className="treatments-reference-section" aria-labelledby="treatments-reference-title">
      <div className="treatments-reference-header">
        <div>
          <span className="treatments-reference-eyebrow">
            <i aria-hidden="true" />
            Our Treatments
          </span>
          <h2 id="treatments-reference-title">Holistic Treatments for Every Body &amp; Mind</h2>
        </div>

        <div className="treatments-reference-actions">
          <Link className="treatments-reference-link" href="/treatments">
            View All Treatments
            <span aria-hidden="true">&rarr;</span>
          </Link>
          <div className="treatments-reference-controls" aria-label="Treatment slider controls">
            <button type="button" aria-label="Previous treatment" onClick={() => moveSlider(-1)}>
              &larr;
            </button>
            <button type="button" aria-label="Next treatment" onClick={() => moveSlider(1)}>
              &rarr;
            </button>
          </div>
        </div>
      </div>

      <div className="treatments-reference-slider" ref={sliderRef}>
        {treatments.map((treatment) => (
          <article className="treatments-reference-card" key={treatment.title}>
            <div className="treatments-reference-image">
              <Image
                src={treatment.image}
                alt={`${treatment.title} treatment`}
                fill
                sizes="(max-width: 760px) 84vw, (max-width: 1180px) 31vw, 15vw"
              />
            </div>
            <div className="treatments-reference-copy">
              <span className="treatments-reference-icon" aria-hidden="true" />
              <h3>{treatment.title}</h3>
              <p>{treatment.copy}</p>
              <i aria-hidden="true" />
            </div>
          </article>
        ))}
      </div>

      <div className="treatments-reference-dots" aria-label="Treatment slides">
        {slideIndexes.map((index) => (
          <button
            type="button"
            key={index}
            aria-label={`Show treatments ${index + 1} to ${Math.min(index + visibleCount, treatments.length)}`}
            aria-current={slideIndexes[activeDotIndex] === index ? "true" : undefined}
            onClick={() => {
              scrollToCard(index);
            }}
          />
        ))}
      </div>

    </section>
  );
}
