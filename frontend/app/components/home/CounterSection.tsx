"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const counters = [
  {
    icon: "doctor",
    value: 25000,
    suffix: "K+",
    divisor: 1000,
    label: "Patients Treated",
  },
  {
    icon: "flower",
    value: 98,
    suffix: "%",
    divisor: 1,
    label: "Patient Satisfaction",
  },
  {
    icon: "leaf",
    value: 20,
    suffix: "+",
    divisor: 1,
    label: "Specialised Therapies",
  },
  {
    icon: "hand",
    value: 10,
    suffix: "+",
    divisor: 1,
    label: "Years of Trust",
  },
];

function formatCounter(value: number, divisor: number, suffix: string) {
  return `${Math.round(value / divisor)}${suffix}`;
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
      <div className="home-counter-band">
        {counters.map((counter) => (
          <div className="home-counter-item" data-icon={counter.icon} key={counter.label}>
            <span aria-hidden="true" />
            <div>
              <strong>
                {formatCounter(counter.value * progress, counter.divisor, counter.suffix)}
              </strong>
              <p>{counter.label}</p>
            </div>
          </div>
        ))}
        <div className="home-counter-still" aria-hidden="true">
          <Image
            src="/images/home-hero-reference.png"
            alt=""
            fill
            sizes="(max-width: 1180px) 0px, 300px"
            priority={false}
          />
        </div>
      </div>
    </section>
  );
}
