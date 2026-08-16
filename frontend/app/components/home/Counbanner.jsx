"use client";

import React, { useEffect, useRef, useState } from "react";

const metricsData = [
  { target: 25, suffix: "+", label: "Years of Experience" },
  { target: 50, suffix: "K+", label: "Happy Patients" },
  { target: 20, suffix: "+", label: "Specialised Treatments" },
  { target: 10, suffix: "+", label: "Expert Doctors" },
];

function AnimatedCounter({ target, suffix, isVisible }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isVisible) return;

    let startTime = null;
    const duration = 2000;

    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const easeProgress = 1 - Math.pow(1 - progress, 3);
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

export function Counbanner() {
  const sectionRef = useRef(null);
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
    <section
      ref={sectionRef}
      className="blog-premium-footer-cta-fluid"
      aria-labelledby="counbanner-title"
    >
      <div
        className="blog-premium-footer-cta-bg"
        style={{ backgroundImage: `url('/images/banner_calm_retreat.jpg')` }}
      />
      <div className="blog-premium-footer-cta-overlay" />

      <div className="blog-premium-footer-cta-content">
        <div className="counbanner-metrics">
          {metricsData.map((m) => (
            <div className="counbanner-metric-item" key={m.label}>
              <AnimatedCounter target={m.target} suffix={m.suffix} isVisible={isVisible} />
              <span>{m.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
