"use client";

import React, { useState } from "react";
import Link from "next/link";

export function LuxuryFooter() {
  const [emailInput, setEmailInput] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (emailInput.trim()) {
      setSubscribed(true);
      setEmailInput("");
      setTimeout(() => setSubscribed(false), 4000);
    }
  };

  return (
    <footer className="w-full rounded-t-[40px] mt-40 bg-primary px-margin-desktop py-20 flex flex-col md:flex-row justify-between items-start gap-gutter">
      <div className="md:w-1/3">
        <h2 className="font-display-lg text-headline-lg text-surface-bright mb-8">SUSRUTHA</h2>
        <p className="text-on-primary-container font-body-md mb-8 max-w-sm">
          Crafting multi-generational legacies of health and harmony through the timeless art of Ayurveda.
        </p>
        <div className="flex gap-4">
          <Link
            className="w-10 h-10 rounded-full border border-on-primary-container/30 flex items-center justify-center text-on-primary-container hover:bg-surface-bright hover:text-primary transition-all duration-300"
            href="#"
          >
            <span className="material-symbols-outlined text-sm">public</span>
          </Link>
          <Link
            className="w-10 h-10 rounded-full border border-on-primary-container/30 flex items-center justify-center text-on-primary-container hover:bg-surface-bright hover:text-primary transition-all duration-300"
            href="#"
          >
            <span className="material-symbols-outlined text-sm">mail</span>
          </Link>
          <Link
            className="w-10 h-10 rounded-full border border-on-primary-container/30 flex items-center justify-center text-on-primary-container hover:bg-surface-bright hover:text-primary transition-all duration-300"
            href="#"
          >
            <span className="material-symbols-outlined text-sm">call</span>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-12 md:w-2/3">
        <div>
          <h5 className="text-tertiary-fixed-dim font-label-sm text-label-sm mb-6 uppercase tracking-widest">
            Navigation
          </h5>
          <ul className="space-y-4">
            <li>
              <Link className="text-outline-variant/60 font-label-sm text-label-sm hover:text-tertiary-fixed transition-all" href="/about-us">
                Legacy
              </Link>
            </li>
            <li>
              <Link className="text-outline-variant/60 font-label-sm text-label-sm hover:text-tertiary-fixed transition-all" href="/treatments">
                Treatments
              </Link>
            </li>
            <li>
              <Link className="text-outline-variant/60 font-label-sm text-label-sm hover:text-tertiary-fixed transition-all" href="/doctors">
                Doctors
              </Link>
            </li>
            <li>
              <Link className="text-outline-variant/60 font-label-sm text-label-sm hover:text-tertiary-fixed transition-all" href="/ayurveda-village">
                Retreats
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h5 className="text-tertiary-fixed-dim font-label-sm text-label-sm mb-6 uppercase tracking-widest">
            Privacy
          </h5>
          <ul className="space-y-4">
            <li>
              <Link className="text-outline-variant/60 font-label-sm text-label-sm hover:text-tertiary-fixed transition-all" href="/privacy-policy">
                Cookies Policy
              </Link>
            </li>
            <li>
              <Link className="text-outline-variant/60 font-label-sm text-label-sm hover:text-tertiary-fixed transition-all" href="/privacy-policy">
                Data Protection
              </Link>
            </li>
            <li>
              <Link className="text-outline-variant/60 font-label-sm text-label-sm hover:text-tertiary-fixed transition-all" href="/terms">
                Terms of Service
              </Link>
            </li>
          </ul>
        </div>

        <div className="col-span-2 md:col-span-1">
          <h5 className="text-tertiary-fixed-dim font-label-sm text-label-sm mb-6 uppercase tracking-widest">
            Journal
          </h5>
          <p className="text-outline-variant/60 text-body-md mb-6">Receive wisdom and updates twice a month.</p>
          {subscribed ? (
            <p className="text-tertiary-fixed text-sm font-semibold">Thank you for subscribing!</p>
          ) : (
            <form onSubmit={handleSubscribe} className="flex border-b border-outline-variant/30 pb-2">
              <input
                className="bg-transparent border-none text-on-primary-container focus:ring-0 outline-none placeholder:text-outline-variant/30 flex-grow text-sm"
                placeholder="Your Email"
                type="email"
                required
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
              />
              <button type="submit" aria-label="Submit Email" className="material-symbols-outlined text-tertiary-fixed-dim cursor-pointer">
                arrow_forward
              </button>
            </form>
          )}
        </div>
      </div>

      <div className="w-full pt-12 mt-12 border-t border-on-primary-container/10 flex flex-col md:flex-row justify-between items-center gap-6">
        <span className="text-outline-variant/40 text-label-sm font-label-sm">
          © 1970-{new Date().getFullYear()} Susrutha Ayurvedic Excellence. All Rights Reserved.
        </span>
        <div className="flex gap-8">
          <Link className="text-outline-variant/40 text-label-sm font-label-sm hover:text-surface-bright" href="#">
            INSTAGRAM
          </Link>
          <Link className="text-outline-variant/40 text-label-sm font-label-sm hover:text-surface-bright" href="#">
            LINKEDIN
          </Link>
        </div>
      </div>
    </footer>
  );
}
