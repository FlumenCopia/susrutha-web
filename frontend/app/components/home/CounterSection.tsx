"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const values = [
  {
    icon: "compassion",
    title: "Compassion",
    copy: "We care with empathy and understanding.",
  },
  {
    icon: "integrity",
    title: "Integrity",
    copy: "Honest practices you can trust.",
  },
  {
    icon: "excellence",
    title: "Excellence",
    copy: "Committed to the highest standard of care.",
  },
  {
    icon: "sustainability",
    title: "Sustainability",
    copy: "Healing today for a healthier tomorrow.",
  },
  {
    icon: "holistic",
    title: "Holistic Approach",
    copy: "Mind, body and spirit in perfect balance.",
  },
];

const counters = [
  {
    icon: "leaf",
    value: 25,
    suffix: "+",
    divisor: 1,
    label: "Years of Experience",
  },
  {
    icon: "patient",
    value: 50000,
    suffix: "K+",
    divisor: 1000,
    label: "Happy Patients",
  },
  {
    icon: "bowl",
    value: 20,
    suffix: "+",
    divisor: 1,
    label: "Specialised Therapies",
  },
  {
    icon: "doctor",
    value: 10,
    suffix: "+",
    divisor: 1,
    label: "Expert Doctors",
  },
];

function formatCounter(value: number, divisor: number, suffix: string) {
  return `${Math.round(value / divisor)}${suffix}`;
}

function IconShape({ icon }: { icon: string }) {
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true" focusable="false">
      {icon === "compassion" ? (
        <>
          <path d="M20 33V20c0-4 5-4 5 0v12" />
          <path d="M44 33V20c0-4-5-4-5 0v12" />
          <path d="M22 31l-5-6c-3-3-7 1-4 5l9 12v10h8" />
          <path d="M42 31l5-6c3-3 7 1 4 5l-9 12v10h-8" />
          <path d="M32 24c-6-8-17 2 0 13 17-11 6-21 0-13z" />
        </>
      ) : null}
      {icon === "integrity" ? (
        <>
          <path d="M32 8c8 7 18 6 18 6v16c0 13-9 21-18 26-9-5-18-13-18-26V14s10 1 18-6z" />
          <path d="M22 32l7 7 15-16" />
        </>
      ) : null}
      {icon === "excellence" ? (
        <>
          <path d="M22 18h20v9c0 8-4 14-10 17-6-3-10-9-10-17V18z" />
          <path d="M22 22h-8c0 9 4 15 12 17" />
          <path d="M42 22h8c0 9-4 15-12 17" />
          <path d="M32 25l3 6 6 1-4 5 1 7-6-3-6 3 1-7-4-5 6-1 3-6z" />
          <path d="M28 52h8" />
        </>
      ) : null}
      {icon === "sustainability" || icon === "leaf" ? (
        <>
          <path d="M18 42c18 0 28-10 29-28-18 1-28 11-28 29" />
          <path d="M18 42c8-10 16-17 29-28" />
          <path d="M23 34c-9-1-15 5-16 14 10 1 17-3 20-12" />
          <path d="M23 34c-4 4-8 9-13 14" />
        </>
      ) : null}
      {icon === "holistic" ? (
        <>
          <path d="M32 9c10 10 12 21 0 34-12-13-10-24 0-34z" />
          <path d="M32 18c-12-3-22 4-23 17 13 2 22-4 23-17z" />
          <path d="M32 18c12-3 22 4 23 17-13 2-22-4-23-17z" />
          <path d="M18 49h28" />
        </>
      ) : null}
      {icon === "patient" ? (
        <>
          <circle cx="32" cy="22" r="7" />
          <path d="M18 50c2-10 8-16 14-16s12 6 14 16" />
          <path d="M22 50V36" />
          <path d="M42 50V36" />
        </>
      ) : null}
      {icon === "bowl" ? (
        <>
          <path d="M15 32h34c-2 12-9 19-17 19s-15-7-17-19z" />
          <path d="M21 32c5-5 16-5 22 0" />
          <path d="M34 27l10-10" />
          <path d="M43 16l6 6" />
        </>
      ) : null}
      {icon === "doctor" ? (
        <>
          <circle cx="32" cy="20" r="7" />
          <path d="M20 52V40c0-6 5-10 12-10s12 4 12 10v12" />
          <path d="M27 36l5 6 5-6" />
          <path d="M32 42v8" />
          <path d="M28 46h8" />
        </>
      ) : null}
    </svg>
  );
}

export function CounterSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) {
      return;
    }

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let frame = 0;

    if (prefersReducedMotion) {
      frame = window.requestAnimationFrame(() => {
        setProgress(1);
      });

      return () => {
        window.cancelAnimationFrame(frame);
      };
    }

    let started = false;

    const animate = () => {
      const startedAt = performance.now();
      const duration = 1200;

      const tick = (now: number) => {
        const elapsed = Math.min((now - startedAt) / duration, 1);
        const eased = 1 - Math.pow(1 - elapsed, 3);

        setProgress(eased);

        if (elapsed < 1) {
          frame = window.requestAnimationFrame(tick);
        }
      };

      frame = window.requestAnimationFrame(tick);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          started = true;
          animate();
          observer.disconnect();
        }
      },
      { threshold: 0.35 },
    );

    observer.observe(section);

    return () => {
      window.cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, []);

  return (
    <section className="home-counter-section" aria-label="Susrutha highlights" ref={sectionRef}>
      <div className="home-counter-shell">
        <div className="home-counter-heading">
          <span>
            <i aria-hidden="true" />
            What We Stand For
          </span>
          <h2>
            Values that <em>guide our care</em>
          </h2>
          <div aria-hidden="true">
            <b />
            <i />
            <b />
          </div>
        </div>

        <div className="home-values-grid">
          {values.map((value) => (
            <article className="home-value-item" key={value.title}>
              <span>
                <IconShape icon={value.icon} />
              </span>
              <h3>{value.title}</h3>
              <i aria-hidden="true" />
              <p>{value.copy}</p>
            </article>
          ))}
        </div>

        <div className="home-counter-band">
          <Image
            src="/images/testimonial-lamp-flowers.png"
            alt="Traditional Ayurvedic wellness setup"
            fill
            sizes="(max-width: 900px) 100vw, 42vw"
            priority={false}
          />
          <div className="home-counter-botanical" aria-hidden="true" />
          <div className="home-counter-items">
            {counters.map((counter) => (
              <article className="home-counter-item" data-icon={counter.icon} key={counter.label}>
                <span>
                  <IconShape icon={counter.icon} />
                </span>
                <strong>
                  {formatCounter(counter.value * progress, counter.divisor, counter.suffix)}
                </strong>
                <p>{counter.label}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
