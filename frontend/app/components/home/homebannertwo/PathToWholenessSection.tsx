"use client";

import React from "react";

export function PathToWholenessSection() {
  return (
    <section className="py-40 bg-surface">
      <div className="container-max mx-auto px-margin-mobile md:px-margin-desktop text-center mb-24">
        <h2 className="font-display-lg text-headline-lg text-primary reveal-up">The Path to Wholeness</h2>
        <div className="w-20 h-px bg-on-tertiary-fixed-variant/40 mx-auto mt-6 reveal-up delay-100"></div>
      </div>
      <div className="relative overflow-x-auto pb-20 px-margin-desktop scrollbar-hide">
        <div className="flex min-w-[1000px] gap-gutter justify-between items-start relative">
          <div className="absolute top-10 left-0 right-0 h-px bg-outline-variant/30 z-0"></div>

          {/* Step 1 */}
          <div className="relative z-10 flex flex-col items-center max-w-[240px] text-center group cursor-pointer">
            <div className="w-20 h-20 rounded-full bg-surface-container-high flex items-center justify-center mb-8 border border-outline/20 group-hover:bg-primary group-hover:text-on-primary transition-all duration-500 shadow-glows">
              <span className="material-symbols-outlined text-3xl">spa</span>
            </div>
            <span className="font-label-sm text-label-sm text-on-tertiary-fixed-variant mb-4">STEP 01</span>
            <h3 className="font-display-lg text-headline-md mb-4 text-primary">Consultation</h3>
            <p className="text-body-md text-secondary">
              A deep diagnostic exploration of your Prakriti (constitution) and current imbalances.
            </p>
          </div>

          {/* Step 2 */}
          <div className="relative z-10 flex flex-col items-center max-w-[240px] text-center group cursor-pointer">
            <div className="w-20 h-20 rounded-full bg-surface-container-high flex items-center justify-center mb-8 border border-outline/20 group-hover:bg-primary group-hover:text-on-primary transition-all duration-500 shadow-glows">
              <span className="material-symbols-outlined text-3xl">psychology</span>
            </div>
            <span className="font-label-sm text-label-sm text-on-tertiary-fixed-variant mb-4">STEP 02</span>
            <h3 className="font-display-lg text-headline-md mb-4 text-primary">Diagnosis</h3>
            <p className="text-body-md text-secondary">
              Scientific pulse-reading and observation to map out your personalized healing roadmap.
            </p>
          </div>

          {/* Step 3 */}
          <div className="relative z-10 flex flex-col items-center max-w-[240px] text-center group cursor-pointer">
            <div className="w-20 h-20 rounded-full bg-surface-container-high flex items-center justify-center mb-8 border border-outline/20 group-hover:bg-primary group-hover:text-on-primary transition-all duration-500 shadow-glows">
              <span className="material-symbols-outlined text-3xl">fluid_med</span>
            </div>
            <span className="font-label-sm text-label-sm text-on-tertiary-fixed-variant mb-4">STEP 03</span>
            <h3 className="font-display-lg text-headline-md mb-4 text-primary">Treatment</h3>
            <p className="text-body-md text-secondary">
              A series of synchronized therapies including Shirodhara, Abhyanga, and herbal purification.
            </p>
          </div>

          {/* Step 4 */}
          <div className="relative z-10 flex flex-col items-center max-w-[240px] text-center group cursor-pointer">
            <div className="w-20 h-20 rounded-full bg-surface-container-high flex items-center justify-center mb-8 border border-outline/20 group-hover:bg-primary group-hover:text-on-primary transition-all duration-500 shadow-glows">
              <span className="material-symbols-outlined text-3xl">self_improvement</span>
            </div>
            <span className="font-label-sm text-label-sm text-on-tertiary-fixed-variant mb-4">STEP 04</span>
            <h3 className="font-display-lg text-headline-md mb-4 text-primary">Recovery</h3>
            <p className="text-body-md text-secondary">
              Sustainable lifestyle and dietary integration for lifelong vitality and harmony.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
