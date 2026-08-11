"use client";

import React from "react";

interface HeroSectionProps {
  onReserveClick?: () => void;
}

export function HeroSection({ onReserveClick }: HeroSectionProps) {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/10 to-background"></div>
      </div>
      <div className="relative z-10 text-center max-w-4xl px-margin-mobile md:px-margin-desktop">
        <span className="inline-block font-label-sm text-label-sm text-on-tertiary-fixed-variant tracking-[0.3em] mb-6 reveal-up">
          ESTABLISHED 1970
        </span>
        <h1 className="font-display-lg text-display-lg-mobile md:text-display-lg text-primary mb-8 leading-[1.05] reveal-up delay-100">
          Ancient Wisdom.
          <br />
          <span className="italic font-light">Modern Healing.</span>
        </h1>
        <p className="font-body-lg text-body-lg text-secondary mb-12 max-w-2xl mx-auto reveal-up delay-200">
          Susrutha embodies the intersection of ancient Ayurvedic wisdom and modern ultra-luxury hospitality,
          offering curated journeys for the soul.
        </p>
        <div className="flex flex-col md:flex-row items-center justify-center gap-6 reveal-up delay-300">
          <button
            onClick={onReserveClick}
            className="group flex items-center gap-3 bg-primary text-on-primary px-10 py-5 rounded-full transition-all hover:pr-12 active:scale-95 cursor-pointer"
          >
            <span className="font-label-sm text-label-sm tracking-widest">START YOUR JOURNEY</span>
            <span className="material-symbols-outlined text-lg transition-transform group-hover:translate-x-1">
              arrow_forward
            </span>
          </button>
          <button
            onClick={() => alert("Playing Susrutha Sanctuary Documentary")}
            className="flex items-center gap-2 text-primary border-b border-primary/20 pb-1 hover:border-primary transition-all cursor-pointer"
          >
            <span className="material-symbols-outlined">play_circle</span>
            <span className="font-label-sm text-label-sm tracking-widest">WATCH THE FILM</span>
          </button>
        </div>
      </div>

      {/* Hero Bottom Decorative Scroll */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
        <span className="text-[10px] tracking-[0.4em] font-bold opacity-30">SCROLL</span>
        <div className="w-[1px] h-12 bg-primary/20"></div>
      </div>
    </section>
  );
}
