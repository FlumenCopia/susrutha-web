"use client";

import React from "react";
import Link from "next/link";

export function LegacySection() {
  return (
    <section className="py-40 bg-surface-container-low overflow-hidden">
      <div className="container-max mx-auto px-margin-mobile md:px-margin-desktop">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter items-center">
          <div className="md:col-span-5 reveal-up">
            <span className="font-label-sm text-label-sm text-on-tertiary-fixed-variant tracking-widest uppercase mb-4 block">
              Our Heritage
            </span>
            <h2 className="font-display-lg text-headline-lg text-primary mb-8">
              Fifty-Five Years of Timeless Tradition
            </h2>
            <p className="font-body-lg text-body-lg text-secondary mb-10 leading-relaxed">
              Founded in 1970 by Dr. Ananda Varma, Susrutha has evolved into a global sanctuary for those seeking
              profound tranquility. Our lineage is built on the rigorous application of clinical excellence and
              multi-generational trust.
            </p>
            <div className="grid grid-cols-2 gap-8 mb-10">
              <div>
                <div className="text-headline-md font-display-lg text-primary mb-1">1970</div>
                <div className="font-label-sm text-label-sm text-on-secondary-container">FOUNDING YEAR</div>
              </div>
              <div>
                <div className="text-headline-md font-display-lg text-primary mb-1">120K+</div>
                <div className="font-label-sm text-label-sm text-on-secondary-container">HEALED SOULS</div>
              </div>
            </div>
            <Link className="inline-flex items-center gap-2 font-label-sm text-label-sm text-primary group" href="/about-us">
              LEARN MORE ABOUT OUR ROOTS
              <span className="w-12 h-px bg-primary/30 group-hover:w-16 transition-all"></span>
            </Link>
          </div>

          <div className="md:col-span-6 md:col-start-7 reveal-up delay-200">
            <div className="relative group">
              <div className="aspect-[4/5] overflow-hidden rounded-[40px]">
                <img
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                  alt="Ayurvedic master herb sorting photograph"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAI8LVoaxSDbPGCljdyi2UpRyIkg-0862ktNI6Y2SdqNsw4Sgvi1AJq8ujtcgj2egMs-Zs-TBqpjg2TvwM6huvkciV7wbhqKQ3qmP525wcTHWf68BSuAZLzWSPky9k1auH_nkk8LlIjquAznsvHR0uVoFBA2amOUIFNhZFTXE8tYFMhFtP8v5H6AxKnaZy6XEqmMQD5V_Au1ILVIFlJALfa9lXcz4yj2RBQ8qfrvznRRnvwFPF1OwYtdPKMeyx16424BhNrTM4FDgH5"
                />
              </div>
              <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-surface rounded-3xl p-8 shadow-glows hidden md:block border border-outline/10">
                <p className="font-display-lg text-headline-md italic text-primary leading-tight">
                  &quot;Health is not just absence of disease, but presence of vitality.&quot;
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
