"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { facilityFaqs, facilityHeroStats } from "./facilitiesData";
import { FacilitiesIcon } from "./FacilitiesIcon";

function RunningStatNumber({ targetValue }: { targetValue: string }) {
  const [displayValue, setDisplayValue] = useState("0");
  const containerRef = useRef<HTMLSpanElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const element = containerRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);

          if (targetValue === "24x7") {
            let n1 = 0;
            let n2 = 0;
            const timer = setInterval(() => {
              if (n1 < 24) n1 += 1;
              if (n2 < 7) n2 += 1;
              setDisplayValue(`${n1}x${n2}`);
              if (n1 >= 24 && n2 >= 7) {
                clearInterval(timer);
              }
            }, 45);
            return;
          }

          const targetNum = parseInt(targetValue, 10);
          if (isNaN(targetNum)) {
            setDisplayValue(targetValue);
            return;
          }

          let current = 0;
          const duration = 1000;
          const stepTime = Math.max(25, Math.floor(duration / targetNum));
          const timer = setInterval(() => {
            current += 1;
            setDisplayValue(`${current}`);
            if (current >= targetNum) {
              clearInterval(timer);
            }
          }, stepTime);
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [targetValue, hasAnimated]);

  return (
    <span ref={containerRef} className="facilities-stat-number">
      {displayValue}
    </span>
  );
}

export function FacilitiesInfo() {
  return (
    <section className="facilities-info">
      <article className="facilities-faq-card">
        <span className="facilities-eyebrow">Frequently Asked Questions</span>
        <div>
          {facilityFaqs.map((question) => (
            <details key={question}>
              <summary>
                {question}
                <span aria-hidden="true">+</span>
              </summary>
              <p>The team can guide you based on room availability, treatment duration, and branch options.</p>
            </details>
          ))}
        </div>
        <Link href="/faq">
          View all FAQs
          <FacilitiesIcon name="arrow" />
        </Link>
      </article>

      <article className="facilities-trust-card">
        <span className="facilities-eyebrow">Patient-Ready Care Environment</span>
        <h2>Facilities pages help patients understand the care environment.</h2>
        <p>Patients can review the setting before they book a consultation or inpatient programme.</p>
        <div className="facilities-stats-container">
          {facilityHeroStats.map((stat) => (
            <span key={stat.label} className="facilities-stat-item">
              <RunningStatNumber targetValue={stat.value} />
              <span className="facilities-stat-label">{stat.label}</span>
            </span>
          ))}
        </div>
      </article>
    </section>
  );
}
