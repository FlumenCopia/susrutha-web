"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { getPublicPackages } from "@/app/services/api";
import { DataLayerRibbon } from "../common/DataLayerRibbon";

export function AyurvedaVillageSection() {
  const [programs, setPrograms] = useState<string[]>([
    "Stress Management",
    "Detox & Rejuvenation",
    "Weight Management",
    "Women's Wellness",
    "Lifestyle & Longevity",
  ]);
  const [isBackendData, setIsBackendData] = useState<boolean>(false);

  useEffect(() => {
    async function loadBackendPrograms() {
      try {
        const pkgs = await getPublicPackages();
        if (Array.isArray(pkgs) && pkgs.length > 0) {
          const names = pkgs.slice(0, 5).map((p: any) => p.title || p.name);
          setPrograms(names);
          setIsBackendData(true);
        }
      } catch (err) {
        console.error("Failed to load village programs:", err);
      }
    }
    loadBackendPrograms();
  }, []);

  return (
    <section className="ayurveda-village-section" aria-labelledby="ayurveda-village-title" style={{ position: "relative" }}>
      <div className="village-copy-panel">
        <span className="village-eyebrow">Ayurveda Village Experience</span>
        <p>Our most exclusive offer for our guest, is the Susrutha Ayurveda Gramam. Located 20 kilometers away from Trivandrum International Airport, Susrutha Ayurveda Gramam is a specially designed ayurvedic villege, catering to the need of the guests, who are looking for an escape from busy routines. Four Ergonomically Designed Cottage, built in tune with Traditional Kerala Architechture, are furnished luxuriously with all amenities, including private treatment room for individual cottage, where one can enjoy the ayurvedic treatments in total privacy.</p>
        <Link className="village-link" href="/ayurveda-village">
          Explore Ayurveda Village
          <span aria-hidden="true">&rarr;</span>
        </Link>
      </div>

      <div className="village-image-panel" style={{ position: "relative" }}>
        <Image
          src="/images/ayurveda-village-path.webp"
          alt="Ayurveda village pathway with traditional cottages"
          fill
          sizes="(max-width: 800px) 100vw, 34vw"
        />
      </div>

      <div className="village-program-panel">
        <span className="village-program-eyebrow">Wellness Programs</span>
        <h3>Curated programs for every stage of life.</h3>
        <ul>
          {programs.map((program) => (
            <li key={program}>{program}</li>
          ))}
        </ul>
        <Link className="village-program-link" href="/treatments">
          View All Programs
          <span aria-hidden="true">&rarr;</span>
        </Link>
      </div>
    </section>
  );
}
