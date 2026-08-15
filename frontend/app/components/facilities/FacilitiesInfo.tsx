"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { facilityFaqs, facilityHeroStats } from "./facilitiesData";
import { FacilitiesIcon } from "./FacilitiesIcon";

function RunningStatNumber({ targetValue }: { targetValue: string }) {
  const [displayValue, setDisplayValue] = useState("0");

  useEffect(() => {
    const numericMatch = targetValue.match(/\d+/);
    if (!numericMatch) {
      setDisplayValue(targetValue);
      return;
    }

    const targetNum = parseInt(numericMatch[0], 10);
    const suffix = targetValue.replace(/^\d+/, "");
    let current = 0;
    const duration = 1200;
    const steps = 30;
    const stepTime = duration / steps;
    const increment = targetNum / steps;

    const timer = setInterval(() => {
      current += increment;
      if (current >= targetNum) {
        setDisplayValue(`${targetNum}${suffix}`);
        clearInterval(timer);
      } else {
        setDisplayValue(`${Math.floor(current)}${suffix}`);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [targetValue]);

  return <strong className="facilities-stat-number">{displayValue}</strong>;
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
              <FacilitiesIcon name={stat.icon} />
              <RunningStatNumber targetValue={stat.value} />
              <span className="facilities-stat-label">{stat.label}</span>
            </span>
          ))}
        </div>
      </article>
    </section>
  );
}
