"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { treatments as treatmentDirectory } from "../../data/architecture";

const treatmentVisuals: Record<string, { image: string; icon: string; copy?: string }> = {
  panchakarma: {
    image: "/images/treatment-panchakarma.webp",
    icon: "lotus",
    copy: "Detoxify and cleanse your body.",
  },
  "womens-health": {
    image: "/images/ayurveda-village-path.webp",
    icon: "wellness",
    copy: "Holistic care for every stage of womanhood.",
  },
  "child-care": {
    image: "/images/ayurveda-hospital-garden.webp",
    icon: "sprout",
    copy: "Gentle Ayurveda support for growing children.",
  },
  orthopaedics: {
    image: "/images/treatment-kati-vasti.webp",
    icon: "therapy",
    copy: "Focused care for joints, spine and mobility.",
  },
  neurology: {
    image: "/images/treatment-sirodhara.webp",
    icon: "shiro",
    copy: "Calming care for nerves and recovery support.",
  },
  "skin-care": {
    image: "/images/treatment-herbal-medicine.webp",
    icon: "leaf",
    copy: "Natural herbs for effective skin healing.",
  },
  "lifestyle-disorders": {
    image: "/images/faq-ayurveda-still-life.webp",
    icon: "sprout",
    copy: "Diet and lifestyle plans for lasting balance.",
  },
  sirodhara: {
    image: "/images/treatment-sirodhara.webp",
    icon: "shiro",
    copy: "Calms the mind and nervous system.",
  },
  njavarakizhi: {
    image: "/images/treatment-njavarakizhi.webp",
    icon: "therapy",
    copy: "Nourishing therapy for strength and recovery.",
  },
  "kati-vasti": {
    image: "/images/treatment-kati-vasti.webp",
    icon: "therapy",
    copy: "Localized oil therapy for lower back care.",
  },
  "herbal-medicine": {
    image: "/images/treatment-herbal-medicine.webp",
    icon: "leaf",
    copy: "Classical formulations for personalized healing.",
  },
};

const treatments = treatmentDirectory.map((treatment) => {
  const visual = treatmentVisuals[treatment.slug] ?? treatmentVisuals.panchakarma;

  return {
    title: treatment.title,
    copy: visual.copy ?? treatment.meta,
    href: `/treatments/${treatment.slug}`,
    image: visual.image,
    icon: visual.icon,
  };
});

export function TreatmentsShowcaseSection() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [itemsPerPage, setItemsPerPage] = useState(6);
  const [activePage, setActivePage] = useState(0);

  useEffect(() => {
    const syncItemsPerPage = () => {
      const width = window.innerWidth;
      setItemsPerPage(width > 1500 ? 6 : width > 900 ? 3 : width > 620 ? 2 : 1);
    };

    syncItemsPerPage();
    window.addEventListener("resize", syncItemsPerPage);
    return () => window.removeEventListener("resize", syncItemsPerPage);
  }, []);

  const pageCount = Math.max(1, Math.ceil(treatments.length / itemsPerPage));
  const pages = useMemo(() => Array.from({ length: pageCount }, (_, index) => index), [pageCount]);
  const safeActivePage = Math.min(activePage, pageCount - 1);

  const scrollToPage = (page: number) => {
    const track = trackRef.current;
    const safePage = (page + pageCount) % pageCount;
    const targetCard = track?.children[safePage * itemsPerPage] as HTMLElement | undefined;

    targetCard?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "start",
    });
    setActivePage(safePage);
  };

  const handleScroll = () => {
    const track = trackRef.current;
    if (!track) return;

    const pageOffsets = pages.map((page) => {
      const card = track.children[page * itemsPerPage] as HTMLElement | undefined;
      return card?.offsetLeft ?? 0;
    });
    const nearestPage = pageOffsets.reduce((nearest, offset, page) => {
      const currentDistance = Math.abs(track.scrollLeft - pageOffsets[nearest]);
      const nextDistance = Math.abs(track.scrollLeft - offset);
      return nextDistance < currentDistance ? page : nearest;
    }, 0);

    setActivePage(nearestPage);
  };

  return (
    <section className="treatments-showcase-section" aria-labelledby="treatments-showcase-title">
      <div className="treatments-showcase-panel">
        <div className="treatments-botanical treatments-botanical-left" aria-hidden="true" />
        <div className="treatments-botanical treatments-botanical-right" aria-hidden="true" />

        <div className="treatments-showcase-head">
          <span className="treatments-showcase-eyebrow">
            <i aria-hidden="true" />
            Our Treatments
            <i aria-hidden="true" />
          </span>
          <h2 id="treatments-showcase-title">
            Holistic Treatments for Every <em>Body &amp; Mind</em>
          </h2>
          <div className="treatments-showcase-divider" aria-hidden="true">
            <span />
            <i />
            <span />
          </div>
          <p>
            Experience the perfect blend of ancient Ayurvedic wisdom and modern care
            for a healthier, balanced life.
          </p>
        </div>

        <div className="treatments-showcase-actions">
          <Link className="treatments-showcase-all" href="/treatments">
            View All Treatments
            <span aria-hidden="true">&rarr;</span>
          </Link>
          <div className="treatments-slider-controls" aria-label="Treatment slider controls">
            <button type="button" onClick={() => scrollToPage(safeActivePage - 1)} aria-label="Previous treatments">
              &larr;
            </button>
            <button type="button" onClick={() => scrollToPage(safeActivePage + 1)} aria-label="Next treatments">
              &rarr;
            </button>
          </div>
        </div>

        <div className="treatments-showcase-slider">
          <div className="treatments-showcase-grid" ref={trackRef} onScroll={handleScroll}>
          {treatments.map((treatment) => (
            <article className="treatments-showcase-card" key={treatment.title}>
              <Link href={treatment.href} aria-label={`View ${treatment.title} treatment`}>
                <span className="treatments-card-image">
                  <Image
                    src={treatment.image}
                    alt={treatment.title}
                    fill
                    sizes="(max-width: 640px) 86vw, (max-width: 1200px) 30vw, 240px"
                  />
                </span>
                <span className="treatments-card-body">
                  <span className="treatments-card-icon" data-icon={treatment.icon} aria-hidden="true" />
                  <h3>{treatment.title}</h3>
                  <p>{treatment.copy}</p>
                  <span className="treatments-card-arrow" aria-hidden="true">
                    &rarr;
                  </span>
                </span>
              </Link>
            </article>
          ))}
          </div>
        </div>

        <div className="treatments-showcase-dots" aria-label="Treatment slider pagination">
          {pages.map((page) => (
            <button
              type="button"
              key={page}
              aria-label={`Show treatment slide ${page + 1}`}
              aria-current={safeActivePage === page ? "true" : undefined}
              onClick={() => scrollToPage(page)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
