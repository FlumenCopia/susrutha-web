"use client";

import React from "react";
import Link from "next/link";

export function SanctuariesSection() {
  return (
    <section className="h-[819px] relative overflow-hidden flex items-center justify-center">
      <div className="absolute inset-0 bg-primary/20 z-10"></div>
      <div className="absolute inset-0 z-0">
        <img
          className="w-full h-full object-cover parallax-bg"
          alt="Susrutha luxury retreat villa overview"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuB4H9r2fYNsz6xIn54aeeG9XzpzO3ThZWd1VDSv-U6YUlw9mKhOPgq5AsBfwp7eYflbW1S2F6BLjA0ghq63BtNJ9DQKkfR3pnmYOi0dNiVjADZ4cxKcGkcEWhaXYve6tNDxpUV1eBXWXBapQreSLAcVUWO8ghe_oiGqIiydsHc-BEzCNEOmUr7bLTqVut7BOsQ85dvyDTh0_SwM_vLSveIgSrBu8zaNmloaU661CrFdFuBSbQIUjNI4sWAXlZq_AtcAnJCir-kKJ_e-"
        />
      </div>
      <div className="relative z-20 text-center text-on-primary max-w-3xl px-6 reveal-up">
        <h2 className="font-display-lg text-display-lg mb-8">Sanctuaries of Stillness</h2>
        <p className="font-body-lg text-body-lg mb-10 opacity-90">
          Designed as an architectural ode to tranquility, our facilities provide the perfect canvas for your
          transformation.
        </p>
        <Link
          href="/facilities"
          className="inline-block bg-surface text-primary px-10 py-5 rounded-full font-label-sm text-label-sm tracking-widest hover:bg-on-tertiary-fixed transition-all"
        >
          EXPLORE THE FACILITIES
        </Link>
      </div>
    </section>
  );
}
