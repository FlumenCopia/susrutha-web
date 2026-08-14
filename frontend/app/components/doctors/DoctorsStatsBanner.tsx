"use client";

import React, { useEffect, useRef, useState } from "react";

type StatItem = {
  target: number;
  suffix: string;
  label: string;
};

const STATS_DATA: StatItem[] = [
  {
    target: 95,
    suffix: " %",
    label: "Feel healthier holistically.",
  },
  {
    target: 80,
    suffix: " %",
    label: "Less anxiety meditating.",
  },
  {
    target: 150,
    suffix: " K",
    label: "Embraced holistic wellness.",
  },
];

function AnimatedCounter({ target, suffix, isVisible }: { target: number; suffix: string; isVisible: boolean }) {
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
    <div className="doctors-stat-number">
      {count}
      <span className="doctors-stat-suffix">{suffix}</span>
    </div>
  );
}

export function DoctorsStatsBanner() {
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
    <section className="doctors-stats-section" ref={sectionRef}>
      <div className="doctors-stats-banner">
        <div className="doctors-stats-banner-overlay" />
        <div className="doctors-stats-banner-content">
          {/* Left Title */}
          <div className="doctors-stats-left">
            <h2 className="doctors-stats-heading">
              The Impact of
              <span>Holistic Health</span>
            </h2>
          </div>

          {/* Vertical Divider */}
          <div className="doctors-stats-divider" />

          {/* Right Stats Columns */}
          <div className="doctors-stats-right">
            {STATS_DATA.map((stat, idx) => (
              <div key={idx} className="doctors-stat-col">
                <AnimatedCounter target={stat.target} suffix={stat.suffix} isVisible={isVisible} />
                <p className="doctors-stat-label" style={{ color: "#ffffff" }}>
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
