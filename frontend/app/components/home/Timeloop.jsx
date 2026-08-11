




"use client";

import { useEffect, useRef, useState } from "react";
import "./timeloop.css";
const FRAME_COUNT = 210;
const PRELOAD_AHEAD = 4;
const PRELOAD_BEHIND = 2;
const frameSource = (index) =>
  `/timeloop/ezgif-frame-${String(index + 1).padStart(3, "0")}.webp`;

const FEATURES = [
  {
    eyebrow: "Anoop Krishna — IT & Web Solutions",
    title: "High-Performance Digital Systems.",
    copy: "I build scalable web applications, custom software solutions, and modern digital experiences engineered for speed and reliability.",
  },
  {
    eyebrow: "Web Development & Architecture",
    title: "Modern Tech Stack. Clean Code.",
    copy: "Developing fast, responsive web platforms using modern frontend frameworks, optimized interfaces, and resilient architecture.",
  },
  {
    eyebrow: " Custom Software Solutions",
    title: "Tailored IT Infrastructure.",
    copy: "Engineering custom tools, API integrations, and digital workflows built to automate processes and elevate digital capabilities.",
  },

];

export default function Timeloop() {
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);
  const imagesRef = useRef([]);
  const frameRef = useRef(-1);
  const rafRef = useRef(null);
  const activeFeatureRef = useRef(0);
  const currentTargetFrameRef = useRef(0);
  const preloadTimerRef = useRef(null);
  const [activeFeature, setActiveFeature] = useState(0);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");

    if (!section || !canvas || !context) return undefined;

    let mounted = true;
    let progress = 0;

    const drawFrame = (index) => {
      if (frameRef.current === index) return;
      const image = imagesRef.current[index];
      if (!image?.complete || !image.naturalWidth) return;

      const { width, height } = canvas.getBoundingClientRect();
      const scale = Math.max(width / image.naturalWidth, height / image.naturalHeight);
      const drawWidth = image.naturalWidth * scale;
      const drawHeight = image.naturalHeight * scale;

      context.clearRect(0, 0, width, height);
      context.drawImage(
        image,
        (width - drawWidth) / 2,
        (height - drawHeight) / 2,
        drawWidth,
        drawHeight,
      );
      frameRef.current = index;
    };

    const resize = () => {
      const bounds = canvas.getBoundingClientRect();
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(bounds.width * pixelRatio);
      canvas.height = Math.round(bounds.height * pixelRatio);
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
      drawFrame(Math.max(frameRef.current, 0));
    };

    const requestFrame = (index) => {
      const existing = imagesRef.current[index];
      if (existing) {
        if (existing.complete) drawFrame(index);
        return;
      }

      const image = new Image();
      imagesRef.current[index] = image;
      image.decoding = "async";
      image.src = frameSource(index);
      image.onload = () => {
        if (!mounted) return;
        const currentTarget = Math.round(progress * (FRAME_COUNT - 1));
        if (index === currentTarget || frameRef.current < 0) drawFrame(index);
        if (index === 0) setIsReady(true);
      };
    };

    const scheduleSequentialPreload = (startIndex) => {
      if (preloadTimerRef.current) return;

      let nextIndex = startIndex;

      const step = () => {
        preloadTimerRef.current = null;
        if (!mounted) return;

        while (nextIndex < FRAME_COUNT && imagesRef.current[nextIndex]) {
          nextIndex += 1;
        }

        if (nextIndex >= FRAME_COUNT) return;

        requestFrame(nextIndex);
        nextIndex += 1;
        preloadTimerRef.current = window.setTimeout(step, 120);
      };

      preloadTimerRef.current = window.setTimeout(step, 120);
    };

    const update = () => {
      rafRef.current = null;
      const bounds = section.getBoundingClientRect();
      const distance = Math.max(section.offsetHeight - window.innerHeight, 1);
      progress = Math.min(Math.max(-bounds.top / distance, 0), 1);

      const targetFrame = Math.round(progress * (FRAME_COUNT - 1));
      currentTargetFrameRef.current = targetFrame;
      requestFrame(targetFrame);
      for (let offset = 1; offset <= PRELOAD_AHEAD; offset += 1) {
        requestFrame(Math.min(targetFrame + offset, FRAME_COUNT - 1));
      }
      for (let offset = 1; offset <= PRELOAD_BEHIND; offset += 1) {
        requestFrame(Math.max(targetFrame - offset, 0));
      }

      scheduleSequentialPreload(Math.min(targetFrame + PRELOAD_AHEAD + 1, FRAME_COUNT - 1));

      const nextFeature = Math.min(Math.floor(progress * FEATURES.length), FEATURES.length - 1);
      if (activeFeatureRef.current !== nextFeature) {
        activeFeatureRef.current = nextFeature;
        setActiveFeature(nextFeature);
      }
    };

    const onScroll = () => {
      if (!rafRef.current) rafRef.current = requestAnimationFrame(update);
    };

    requestFrame(0);
    resize();
    update();

    window.addEventListener("resize", resize);
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      mounted = false;
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", onScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      if (preloadTimerRef.current) window.clearTimeout(preloadTimerRef.current);
    };
  }, []);

  return (
    <section ref={sectionRef} className="macbook-hero" id="hero">
      <div className="macbook-hero__sticky">
        <canvas ref={canvasRef} className="macbook-hero__canvas" aria-hidden="true" />
        <div className="macbook-hero__shade" aria-hidden="true" />

        <div className={`macbook-hero__loader ${isReady ? "is-hidden" : ""}`} aria-hidden="true">
          <span />
        </div>

        <div className="macbook-hero__content">
          {FEATURES.map((feature, index) => (
            <article
              key={feature.eyebrow}
              className={`macbook-hero__feature ${activeFeature === index ? "is-active" : ""}`}
              aria-hidden={activeFeature !== index}
            >
              <p className="macbook-hero__eyebrow">{feature.eyebrow}</p>
              <h1>{feature.title}</h1>
              <p className="macbook-hero__copy">{feature.copy}</p>

            </article>
          ))}
        </div>

        <div className="macbook-hero__rail" aria-label={`Chapter ${activeFeature + 1} of ${FEATURES.length}`}>
          {FEATURES.map((feature, index) => (
            <span key={feature.eyebrow} className={activeFeature === index ? "is-active" : ""} />
          ))}
        </div>

        <p className="macbook-hero__scroll-cue">
          <span aria-hidden="true" /> Scroll to explore
        </p>
      </div>
    </section>
  );
}
