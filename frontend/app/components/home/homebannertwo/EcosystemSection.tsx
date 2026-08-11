"use client";

import React from "react";

export function EcosystemSection() {
  return (
    <section className="py-40 bg-surface">
      <div className="container-max mx-auto px-margin-mobile md:px-margin-desktop">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter">
          <div className="md:col-span-4 flex flex-col justify-center reveal-up">
            <span className="font-label-sm text-label-sm text-on-tertiary-fixed-variant tracking-widest uppercase mb-4 block">
              The Susrutha Way
            </span>
            <h2 className="font-display-lg text-headline-lg text-primary mb-8 leading-tight">
              Crafting an Ecosystem of Total Wellness
            </h2>
            <p className="font-body-lg text-body-lg text-secondary mb-10">
              We prioritize vast whitespace to provide breathing room for your mind, reflecting the mental clarity
              associated with Ayurvedic healing.
            </p>
          </div>

          <div className="md:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-surface-container-low p-10 rounded-[32px] border border-outline/10 hover:border-on-tertiary-fixed-variant/30 transition-all reveal-up">
              <div className="w-12 h-12 rounded-full bg-primary/5 flex items-center justify-center text-primary mb-6">
                <span className="material-symbols-outlined">clinical_notes</span>
              </div>
              <h4 className="font-display-lg text-headline-md text-primary mb-4">Evidence-Based</h4>
              <p className="text-body-md text-secondary">
                Blending ancient protocols with contemporary medical insights for measurable results.
              </p>
            </div>

            <div className="bg-surface-container-low p-10 rounded-[32px] border border-outline/10 hover:border-on-tertiary-fixed-variant/30 transition-all reveal-up delay-100">
              <div className="w-12 h-12 rounded-full bg-primary/5 flex items-center justify-center text-primary mb-6">
                <span className="material-symbols-outlined">eco</span>
              </div>
              <h4 className="font-display-lg text-headline-md text-primary mb-4">Pure Sourcing</h4>
              <p className="text-body-md text-secondary">
                All oils and herbs are ethically harvested from our private botanical gardens.
              </p>
            </div>

            <div className="bg-surface-container-low p-10 rounded-[32px] border border-outline/10 hover:border-on-tertiary-fixed-variant/30 transition-all reveal-up delay-200">
              <div className="w-12 h-12 rounded-full bg-primary/5 flex items-center justify-center text-primary mb-6">
                <span className="material-symbols-outlined">king_bed</span>
              </div>
              <h4 className="font-display-lg text-headline-md text-primary mb-4">Ultra-Luxury</h4>
              <p className="text-body-md text-secondary">
                Immersive retreats that offer world-class hospitality and profound tranquility.
              </p>
            </div>

            <div className="bg-surface-container-low p-10 rounded-[32px] border border-outline/10 hover:border-on-tertiary-fixed-variant/30 transition-all reveal-up delay-300">
              <div className="w-12 h-12 rounded-full bg-primary/5 flex items-center justify-center text-primary mb-6">
                <span className="material-symbols-outlined">verified_user</span>
              </div>
              <h4 className="font-display-lg text-headline-md text-primary mb-4">Master Lineage</h4>
              <p className="text-body-md text-secondary">
                Over 50 years of accumulated wisdom passed through three generations of healers.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
