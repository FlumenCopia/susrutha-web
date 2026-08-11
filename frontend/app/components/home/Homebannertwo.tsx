"use client";

import React, { useEffect, useState } from "react";
import { GlassHeader } from "./homebannertwo/GlassHeader";
import { HeroSection } from "./homebannertwo/HeroSection";
import { LegacySection } from "./homebannertwo/LegacySection";
import { PathToWholenessSection } from "./homebannertwo/PathToWholenessSection";
import { SignatureRitualsSection } from "./homebannertwo/SignatureRitualsSection";
import { EcosystemSection } from "./homebannertwo/EcosystemSection";
import { CustodiansSection } from "./homebannertwo/CustodiansSection";
import { SanctuariesSection } from "./homebannertwo/SanctuariesSection";
import { LocationsSection } from "./homebannertwo/LocationsSection";
import { LuxuryFooter } from "./homebannertwo/LuxuryFooter";

export function Homebannertwo() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Scroll reveal observer
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    };

    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
        }
      });
    }, observerOptions);

    document.querySelectorAll(".reveal-up").forEach((el) => {
      revealObserver.observe(el);
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      revealObserver.disconnect();
    };
  }, []);

  return (
    <div className="bg-background text-on-background font-body-md selection:bg-primary-fixed selection:text-primary min-h-screen">
      <GlassHeader scrolled={scrolled} />

      <main>
        <HeroSection />
        <LegacySection />
        <PathToWholenessSection />
        <SignatureRitualsSection />
        <EcosystemSection />
        <CustodiansSection />
        <SanctuariesSection />
        <LocationsSection />
      </main>

      <LuxuryFooter />
    </div>
  );
}

export default Homebannertwo;
