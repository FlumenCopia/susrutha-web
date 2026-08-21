"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";

const metrics = [
  { target: 25, suffix: "+", label: "Years of Experience" },
  { target: 50, suffix: "K+", label: "Happy Patients" },
  { target: 20, suffix: "+", label: "Specialised Treatments" },
  { target: 10, suffix: "+", label: "Expert Doctors" },
];

function AnimatedMetricCounter({ target, suffix, isVisible }: { target: number; suffix: string; isVisible: boolean }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isVisible) return;

    let startTime: number | null = null;
    const duration = 2000; // 2 seconds smooth count-up

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      // Ease out quad
      const easeProgress = 1 - (1 - progress) * (1 - progress);
      setCount(Math.floor(easeProgress * target));

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        setCount(target);
      }
    };

    const animId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animId);
  }, [isVisible, target]);

  return (
    <strong>
      {count}
      {suffix}
    </strong>
  );
}

export function HomeWellnessExpertiseSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    const currentElem = sectionRef.current;
    if (currentElem) {
      observer.observe(currentElem);
    }

    return () => {
      if (currentElem) {
        observer.unobserve(currentElem);
      }
      observer.disconnect();
    };
  }, []);

  return (
    <section className="home-wellness-expertise" id="about-susrutha" ref={sectionRef}>
      <div className="home-wellness-visual">
        <div className="home-wellness-outline" aria-hidden="true" />
        <div className="home-wellness-photo">
          <Image
            src="/ch.png"
            alt="Vintage Ayurvedic master sorting dried herbs in traditional courtyard"
            fill
            sizes="(max-width: 980px) 100vw, 48vw"
          />
        </div>

        <div className="home-wellness-badge" aria-label="25 plus years of excellence">
          <strong>40+</strong>
          <span>
            Years of
            <br />
            Excellence
          </span>
        </div>
      </div>

      <div className="home-wellness-content">
        <span className="home-wellness-eyebrow">
          {/* <i aria-hidden="true" /> */}
          About Susrutha
        </span>

        <h2>
          Your Wellness,
          <br />
          Our <span>Ancient</span> Expertise
        </h2>

        {/* <div className="home-wellness-divider" aria-hidden="true">
          <span />
          <i />
          <span />
        </div> */}

        <p>
          Susrutha began in Kattakada through the vision of Ayurvedic physicians Sri. P. Krishna Pillai and Sri.
          P.K. Pillai. Their clinic grew into a hospital under the guidance of Prof. Dr. Krishnankutty Nair, and
          today the institute continues that legacy through physician-led care, research-minded practice, and a
          dedicated clinical team.
        </p>

        {/* <div className="home-wellness-metrics" aria-label="Susrutha highlights">
          {metrics.map((metric) => (
            <article key={metric.label}>
              <AnimatedMetricCounter target={metric.target} suffix={metric.suffix} isVisible={isVisible} />
              <span>{metric.label}</span>
            </article>
          ))}
        </div> */}

        <Link className="home-wellness-link" href="/about-us">
          Know More About Us
          <span aria-hidden="true">&rarr;</span>
        </Link>
      </div>

      <div className="home-wellness-branch" aria-hidden="true" />
      <div className="home-wellness-mortar" aria-hidden="true" />
    </section>
  );
}
