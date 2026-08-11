"use client";

import React from "react";
import Link from "next/link";

export function SignatureRitualsSection() {
  return (
    <section className="py-40 bg-surface-container-lowest">
      <div className="container-max mx-auto px-margin-mobile md:px-margin-desktop">
        <div className="flex justify-between items-end mb-20 reveal-up">
          <div className="max-w-xl">
            <span className="font-label-sm text-label-sm text-on-tertiary-fixed-variant tracking-widest uppercase mb-4 block">
              The Experience
            </span>
            <h2 className="font-display-lg text-headline-lg text-primary">Signature Healing Rituals</h2>
          </div>
          <Link
            href="/treatments"
            className="hidden md:inline-block font-label-sm text-label-sm text-primary tracking-widest border border-primary/20 px-8 py-4 rounded-full hover:bg-primary hover:text-on-primary transition-all"
          >
            VIEW ALL TREATMENTS
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Treatment 1 */}
          <div className="group cursor-pointer reveal-up">
            <div className="relative overflow-hidden rounded-[40px] aspect-[3/4] mb-8 shadow-glows">
              <img
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                alt="Shirodhara oil ritual"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCh_jFoSomUy_aHqk-jQ_n-gBpstLn0TpaQJ5KlB-dkjNXjLIHUtgSfLZytuyEFolonm1MZcHwoNyYjSK9w1S9k6UjqolJs0grH5MVxy4U--MdtKGoWzDOaKYrgaYYZFSlrRY44-JTj3mTITR2p8Yh2WAljD6Fzdl-pSYn-yru5phn3QKJjt8JUdeQLAM8saUeynMZDchXwN0edo6LG9H1Fs3HxwOaOeIeGmaKEIPvzUsa9KZ4Pg6d9gFfIW02HW3T7QrI8-iB9HCr0"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-10">
                <span className="text-on-primary font-label-sm text-label-sm tracking-widest">DISCOVER RITUAL</span>
              </div>
            </div>
            <h3 className="font-display-lg text-headline-md text-primary mb-2">Shirodhara Bliss</h3>
            <p className="text-body-md text-secondary line-clamp-2">
              A rhythmic pouring of herbal oils onto the forehead to calm the nervous system.
            </p>
            <div className="mt-4 flex items-center gap-2 text-on-tertiary-fixed-variant font-label-sm text-label-sm">
              <span className="material-symbols-outlined text-sm">schedule</span> 90 MINS
              <span className="mx-2">•</span>
              <span className="material-symbols-outlined text-sm">payments</span> $240
            </div>
          </div>

          {/* Treatment 2 */}
          <div className="group cursor-pointer reveal-up delay-100">
            <div className="relative overflow-hidden rounded-[40px] aspect-[3/4] mb-8 shadow-glows">
              <img
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                alt="Panchakarma detox herbs"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAHfNtwrN5wxUXWI9frodzlFxqBB-IVoASS4GSz_Pt2XucxO8ct-J-PoT96MeZX7_ZzvdYJJfZ6uSNoqZI_kLkIqCNqbXjOCoKyPsH7EJVzydy2_D4FgRFplj2GQgSdxhfRSsAstSRlp4qbVBssEqDcvG-gBQyzp3I4YkQcgEV9Q-4Mrk3rp-LIQ3fiTmDB6YHIStlVUnuwIsO3G9QyukqP_B0ioUJiGYcsKNU9GumjIHpr5OgQfvVYMlHmHMCzMboiGqRvSKphfHBA"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-10">
                <span className="text-on-primary font-label-sm text-label-sm tracking-widest">DISCOVER RITUAL</span>
              </div>
            </div>
            <h3 className="font-display-lg text-headline-md text-primary mb-2">Panchakarma Detox</h3>
            <p className="text-body-md text-secondary line-clamp-2">
              Five-fold purification therapy designed to deeply cleanse and rejuvenate the body.
            </p>
            <div className="mt-4 flex items-center gap-2 text-on-tertiary-fixed-variant font-label-sm text-label-sm">
              <span className="material-symbols-outlined text-sm">schedule</span> 7 DAYS
              <span className="mx-2">•</span>
              <span className="material-symbols-outlined text-sm">payments</span> FROM $3,500
            </div>
          </div>

          {/* Treatment 3 */}
          <div className="group cursor-pointer reveal-up delay-200">
            <div className="relative overflow-hidden rounded-[40px] aspect-[3/4] mb-8 shadow-glows">
              <img
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                alt="Abhyanga herbal massage"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBWabfcdX-_Ff3I5rhOLAsAr0N473rCVLDXezEr8BTlyLrroJWYEphjWj9ujW8siW2hO4nGCht4PALzIFXM6lkcS0aT_IY3_QSDmuygf9ZAn5rjkiC5JUOk2UnXcsCJ-hB1IB5mDDZCigVenvT4ontphHzYZlgC86Xu9Y0dBMHtRgiM07el8wByK7VaTrGdrghpBgn8O4oaRUBncwcewnJV9k2AzFCP6ZtzVWl9xun95CMG8Jfl0eT-7gVVSx-Zsq3TOgdMHnnRUQhi"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-10">
                <span className="text-on-primary font-label-sm text-label-sm tracking-widest">DISCOVER RITUAL</span>
              </div>
            </div>
            <h3 className="font-display-lg text-headline-md text-primary mb-2">Abhyanga Massage</h3>
            <p className="text-body-md text-secondary line-clamp-2">
              Full body warm oil massage that improves circulation and boosts the immune system.
            </p>
            <div className="mt-4 flex items-center gap-2 text-on-tertiary-fixed-variant font-label-sm text-label-sm">
              <span className="material-symbols-outlined text-sm">schedule</span> 60 MINS
              <span className="mx-2">•</span>
              <span className="material-symbols-outlined text-sm">payments</span> $180
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
