




"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import "./timeloop.css";

const FRAME_COUNT = 210;

const frameSource = (index) =>
  `/timeloop/ezgif-frame-${String(index + 1).padStart(3, "0")}.webp`;

const FEATURES = [
  {
    year: "2022 June",
    text: "Started First satellite OPD and treatment center at Kowdiar, Trivandrum.",
  },
  {
    year: "2022 April",
    text: "Susrutha Life care Private Limited.",
  },
  {
    year: "2020",
    text: "Susrutha Proctology unit Susrutha Postnatal care Susrutha Post stroke Palliative care.",
  },
  {
    year: "2019",
    text: "Susrutha can a cancer care awareness movement.",
  },
  {
    year: "2016",
    text: "Registered Susrutha Charitable medical trust.",
  },
  {
    year: "2015",
    text: "Started Susrutha Medi Tech Lab.",
  },
  {
    year: "2013",
    text: "Susrutha Advanced Ayurveda Nursing School.",
  },
  {
    year: "2012",
    text: "Registered as Partnership firm.",
  },
  {
    year: "2010",
    text: "Started Susrutha Ayurveda village.",
  },
  {
    year: "2008",
    text: "Registered GMP certified Susrutha Ayurvedic Pharma.",
  },
  {
    year: "2002",
    text: "Registered 30 bedded panchakarma Hospital and institute.",
  },
  {
    year: "1986",
    text: "Susrutha clinic and pharmacy at Kattakada.",
  },
];

export default function Timeloop() {
  const sectionRef = useRef(null);
  const tickingRef = useRef(false);
  const [frameIndex, setFrameIndex] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const updateProgress = () => {
      tickingRef.current = false;

      const section = sectionRef.current;
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const scrollable = Math.max(section.offsetHeight - window.innerHeight, 1);
      const rawProgress = Math.min(Math.max(-rect.top / scrollable, 0), 1);
      const nextFrame = reduceMotion
        ? 0
        : Math.min(FRAME_COUNT - 1, Math.round(rawProgress * (FRAME_COUNT - 1)));
      const nextActive = Math.min(
        FEATURES.length - 1,
        Math.floor(rawProgress * FEATURES.length)
      );

      setFrameIndex((current) => (current === nextFrame ? current : nextFrame));
      setActiveIndex((current) => (current === nextActive ? current : nextActive));
    };

    const requestUpdate = () => {
      if (tickingRef.current) return;
      tickingRef.current = true;
      window.requestAnimationFrame(updateProgress);
    };

    updateProgress();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);

    return () => {
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="timeloop-section"
      aria-labelledby="timeloop-title"
    >
      <div className="timeloop-sticky">
        <div className="timeloop-frame-wrap" aria-hidden="true">
          <Image
            className="timeloop-frame"
            src={frameSource(frameIndex)}
            alt=""
            fill
            priority
            sizes="100vw"
            unoptimized
          />
          <div className="timeloop-frame-shade" />
        </div>

        <div className="timeloop-content">
          <div className="timeloop-heading">
            <div className="timeloop-eyebrow-row">
              <span className="timeloop-eyebrow">Our Journey</span>
              <span className="timeloop-counter-badge">
                {String(activeIndex + 1).padStart(2, "0")} / {String(FEATURES.length).padStart(2, "0")}
              </span>
            </div>
            <h2 id="timeloop-title">A Legacy Moving Through Time</h2>
          </div>

          <div
            className="timeloop-list"
            style={{ "--active-index": activeIndex }}
            aria-label="Susrutha timeline milestones"
          >
            <div className="timeloop-track">
              {FEATURES.map((feature, index) => (
                <article
                  className={`timeloop-item ${index === activeIndex ? "is-active" : ""}`}
                  key={`${feature.year}-${feature.text}`}
                >
                  <div className="timeloop-item-header">
                    <time>{feature.year}</time>
                    <span className="timeloop-item-num">{String(index + 1).padStart(2, "0")}</span>
                  </div>
                  <p>{feature.text}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
