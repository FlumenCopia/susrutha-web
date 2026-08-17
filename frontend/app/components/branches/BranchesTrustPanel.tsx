"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { BranchIcon } from "./BranchIcons";

const trustPoints = [
  "Physician-supervised classical Panchakarma therapies",
  "NABH accredited hospital standards & hygiene",
  "Customized Sattvic diet and authentic medicine formulations",
  "Dedicated international & outstation patient desk",
];

const branchStats = [
  { target: 2, suffix: "", label: "Specialty Centres" },
  { target: 25, suffix: "+", label: "Expert Vaidyas" },
  { target: 50000, suffix: "+", formatComma: true, label: "Patients Healed" },
];

function RunningStatCounter({
  target,
  suffix = "",
  formatComma = false,
}: {
  target: number;
  suffix?: string;
  formatComma?: boolean;
}) {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    let startTime: number | null = null;
    const duration = 1600;

    const step = (timestamp: number) => {
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

  const formattedCount = formatComma ? count.toLocaleString() : count;

  return (
    <div ref={elementRef} className="branches-trust-count-val">
      {formattedCount}
      {suffix}
    </div>
  );
}

export function BranchesTrustPanel() {
  return (
    <section className="branches-trust-panel">
      <div className="branches-trust-copy">
        <span>Why Choose Susrutha</span>
        <h2>Healing Rooted in Trust & Tradition</h2>
        <ul>
          {trustPoints.map((point) => (
            <li key={point}>
              <BranchIcon name="check" />
              {point}
            </li>
          ))}
        </ul>
      </div>

      <div className="branches-trust-image">
        <Image
          src="/images/about-purpose-still-life.webp"
          alt="Traditional Ayurvedic care setting"
          fill
          sizes="(max-width: 900px) 100vw, 42vw"
        />
      </div>

      <div className="branches-trust-stats">
        {branchStats.map((stat) => (
          <article key={stat.label}>
            <strong>
              <RunningStatCounter
                target={stat.target}
                suffix={stat.suffix}
                formatComma={stat.formatComma}
              />
            </strong>
            <p>{stat.label}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
