"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

interface TextCard {
  type: "text";
  title: string;
  desc: string;
  linkText: string;
  href: string;
}

interface ImageCard {
  type: "image";
  src: string;
  alt: string;
}

type GridCard = TextCard | ImageCard;

export function SusruthaWaySection() {
  const cards: GridCard[] = [
    // Row 1
    {
      type: "text",
      title: "MASSAGE OPTIONS",
      desc: "Relax in comfort with our skilled team for your total wellness needs.",
      linkText: "LEARN MORE",
      href: "/treatments",
    },
    {
      type: "image",
      src: "/images/opt_womens_health.jpg",
      alt: "Relaxing wellness massage treatment",
    },
    {
      type: "text",
      title: "WELLNESS ESSENTIALS",
      desc: "Calming treatments inspired by nature, designed to relax the body.",
      linkText: "LEARN MORE",
      href: "/services",
    },
    {
      type: "image",
      src: "/images/about-purpose-still-life.webp",
      alt: "Natural spa essentials, bamboo and towels",
    },
    // Row 2
    {
      type: "image",
      src: "/images/opt_skin_allergies.jpg",
      alt: "Expert holistic facial and skin treatment",
    },
    {
      type: "text",
      title: "EXPERT HOLISTIC FACIALS",
      desc: "Glow with a custom facial using natural care and gentle touch.",
      linkText: "LEARN MORE",
      href: "/treatments",
    },
    {
      type: "image",
      src: "/images/treatment-njavarakizhi.webp",
      alt: "Traditional Ayurvedic herbal pouch massage",
    },
    {
      type: "text",
      title: "WELLNESS PROGRAM PLANS",
      desc: "Enjoy tailored wellness plans for your body and spirit goals.",
      linkText: "LEARN MORE",
      href: "/packages",
    },
  ];

  return (
    <section className="susrutha-way-section" aria-label="Wellness Treatments Showcase">
      <div className="susrutha-way-container">
        <div className="susrutha-way-checkerboard-grid">
          {cards.map((card, index) => {
            if (card.type === "text") {
              return (
                <div className="susrutha-way-card susrutha-way-card-text" key={card.title}>
                  <div className="susrutha-way-card-content">
                    <h3 className="susrutha-way-card-title">{card.title}</h3>
                    <p className="susrutha-way-card-desc">{card.desc}</p>
                    <Link href={card.href} className="susrutha-way-card-link">
                      {card.linkText}
                    </Link>
                  </div>
                </div>
              );
            }

            return (
              <div className="susrutha-way-card susrutha-way-card-image" key={`img-${index}`}>
                <Image
                  src={card.src}
                  alt={card.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  className="susrutha-way-img"
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
