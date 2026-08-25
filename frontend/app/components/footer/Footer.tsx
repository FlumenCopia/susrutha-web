"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Globe, ChevronUp, FileText, MapPin, Phone, Mail } from "lucide-react";
import { getPublicBranches } from "@/app/services/api";

const navSections = [
  {
    title: "Explore",
    links: [
      { label: "Home", href: "/" },
      { label: "About Us", href: "/about-us" },
      { label: "Our Doctors", href: "/doctors" },
      { label: "Affiliations", href: "/affiliations" },
      { label: "Ayurveda Village", href: "/ayurveda-village" },
      { label: "Facilities", href: "/facilities" },
      { label: "Blogs & Articles", href: "/blogs" },
    ],
  },
  {
    title: "Treatments",
    links: [
      { label: "All Treatments", href: "/treatments" },
      { label: "Panchakarma Detox", href: "/treatments/panchakarma" },
      { label: "Conditions We Treat", href: "/conditions" },
      { label: "Wellness Packages", href: "/packages" },
      { label: "International Patients", href: "/international-patients" },
      { label: "Book Appointment", href: "/appointment" },
    ],
  },
  {
    title: "Our Locations",
    links: [
      { label: "Kattakada Main Hospital", href: "/branches/kattakada" },
      { label: "Kowdiar City OP", href: "/branches/kowdiar" },
      { label: "Ayurveda Village", href: "/ayurveda-village" },
      { label: "Patient Care", href: "/patient-care" },
      { label: "Departments", href: "/departments" },
      { label: "Contact Us", href: "/contact-us" },
    ],
  },
];

export function Footer() {
  const [mainBranchInfo, setMainBranchInfo] = useState<{
    name: string;
    street: string;
    city: string;
    pincode: string;
    phone: string;
    mobile: string;
  }>({
    name: "Kattakada Main Branch",
    street: "Vaidya Ratnam K.S. & V.S. Campus, Opposite Christian College, Kattakada-Killi Main Road",
    city: "Kattakada, Thiruvananthapuram",
    pincode: "695572",
    phone: "0471-2291027",
    mobile: "+91 96566 56736",
  });

  useEffect(() => {
    async function loadMainBranch() {
      try {
        const branches = await getPublicBranches();
        if (Array.isArray(branches) && branches.length > 0) {
          const main = branches.find(
            (b: any) => b.isMainBranch === true || b.code === "KTK" || (b.type && b.type.includes("INPATIENT"))
          ) || branches[0];

          if (main) {
            setMainBranchInfo({
              name: main.name || "Kattakada Main Branch",
              street: typeof main.address === "object" ? main.address.street || "" : main.address || "",
              city: typeof main.address === "object" ? main.address.city || "" : "Thiruvananthapuram",
              pincode: typeof main.address === "object" ? main.address.pincode || "695572" : "695572",
              phone: main.contact?.phone?.[0] || "0471-2291027",
              mobile: main.contact?.phone?.[1] || main.contact?.emergencyPhone || "+91 96566 56736",
            });
          }
        }
      } catch (err) {
        console.error("Failed to fetch main branch for footer:", err);
      }
    }
    loadMainBranch();
  }, []);

  const scrollToTop = () => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <footer className="luxury-dark-footer" role="contentinfo">
      <div className="luxury-footer-container">
        {/* Main Multi-Column Top Section */}
        <div className="luxury-footer-grid">
          {/* Column 1: Contact & ONLY Main Branch Address */}
          <div className="luxury-footer-col-contact">
            <div className="luxury-footer-logo-wrap">
              <Image
                src="/images/susrutha-logo.webp"
                alt="Susrutha Ayurveda Logo"
                width={210}
                height={64}
                style={{ width: "auto", height: "46px", objectFit: "contain" }}
              />
            </div>

            {/* Main Branch Location Info - Perfectly Aligned */}
            <div className="luxury-footer-location-info">
              <h4 className="luxury-footer-branch-name">{mainBranchInfo.name}</h4>
              
              <div className="luxury-footer-address-row">
                <MapPin size={16} strokeWidth={1.8} className="luxury-footer-icon" />
                <p className="luxury-footer-address-text">
                  {mainBranchInfo.street}<br />
                  {mainBranchInfo.city}, Kerala – {mainBranchInfo.pincode}
                </p>
              </div>

              <div className="luxury-footer-contact-lines">
                <div className="luxury-footer-contact-row">
                  <Phone size={15} strokeWidth={1.8} className="luxury-footer-icon" />
                  <div className="luxury-footer-contact-links">
                    <a href={`tel:${mainBranchInfo.phone.replaceAll(" ", "")}`}>Ph: {mainBranchInfo.phone}</a>
                    <span className="sep">•</span>
                    <a href={`tel:${mainBranchInfo.mobile.replaceAll(" ", "")}`}>Mob: {mainBranchInfo.mobile}</a>
                  </div>
                </div>

                <div className="luxury-footer-contact-row">
                  <Mail size={15} strokeWidth={1.8} className="luxury-footer-icon" />
                  <a href="mailto:info@susruthaayurveda.com" className="luxury-footer-email-link">info@susruthaayurveda.com</a>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Links Columns */}
          <div className="luxury-footer-nav-group">
            {navSections.map((sec) => (
              <nav className="luxury-footer-col-nav" key={sec.title} aria-label={sec.title}>
                <span className="luxury-footer-nav-heading">{sec.title}</span>
                {sec.links.map((link) => (
                  <Link href={link.href} key={link.label}>
                    {link.label}
                  </Link>
                ))}
              </nav>
            ))}
          </div>

          {/* Grand Statement */}
          <div className="luxury-footer-col-statement">
            <h2 className="luxury-footer-heading">
              WE RESTORE BALANCE
              <br />
              &amp; INNER HARMONY
            </h2>
            <p className="luxury-footer-desc">
              Relax your body and mind with authentic Ayurvedic therapies and classical healing designed to release stress, restore energy, and enhance overall well-being in a calm, soothing atmosphere.
            </p>
            <div className="luxury-footer-brochure-wrap">
              <a
                href="/images/e-brochure.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="luxury-footer-brochure-btn"
                aria-label="Open Susrutha Hospital E-Brochure PDF"
              >
                <FileText size={16} strokeWidth={2} />
                <span>Hospital Brochure</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Social Icons & Copyright & Back to top */}
        <div className="luxury-footer-bottom">
          <div className="luxury-footer-socials" aria-label="Social media links">
            <a href="https://www.facebook.com/susruthaayurvedatvm" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
              </svg>
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
                <polygon points="10 15 15 12 10 9" />
              </svg>
            </a>
            <a href="https://www.instagram.com/susruthaayurvedatvm/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
              </svg>
            </a>
            <a href="https://susruthaayurveda.com" target="_blank" rel="noopener noreferrer" aria-label="Website">
              <Globe size={18} strokeWidth={1.75} />
            </a>
          </div>

          <div className="luxury-footer-bottom-right">
            <span className="luxury-footer-copyright">
              &copy; {new Date().getFullYear()} Susrutha Ayurveda Hospital. All Rights Reserved.
            </span>

            <button
              type="button"
              className="luxury-footer-top-btn"
              onClick={scrollToTop}
              aria-label="Back to top"
            >
              <ChevronUp size={18} strokeWidth={2} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
