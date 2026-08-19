"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Globe, ChevronUp, FileText } from "lucide-react";

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
    title: "Patient Care",
    links: [
      { label: "Patient Care", href: "/patient-care" },
      { label: "Departments", href: "/departments" },
      { label: "Testimonials", href: "/testimonials" },
      { label: "FAQ", href: "/faq" },
      { label: "Contact Us", href: "/contact-us" },
      { label: "Privacy Policy", href: "/privacy-policy" },
    ],
  },
];

export function Footer() {
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
          {/* Column 1: Contact & Address with Logo */}
          <div className="luxury-footer-col-contact">
            <div className="luxury-footer-logo-wrap">
              <Image
                src="/images/susrutha-logo.webp"
                alt="Susrutha Ayurveda Logo"
                width={190}
                height={58}
                style={{ width: "auto", height: "48px", objectFit: "contain" }}
              />
            </div>

            <div className="luxury-footer-address">
              <p>Door No. 47/881:1, Kanjikuzhi,</p>
              <p>Kottayam, Kerala – 686004</p>
            </div>

            <div className="luxury-footer-direct">
              <a href="mailto:info@susruthaayurveda.com">info@susruthaayurveda.com</a>
              <a href="tel:+914813501000">+91 481 350 1000</a>
              <a href="tel:+919387510100">+91 9387 510 100</a>
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
                href="/brochure"
                className="luxury-footer-brochure-btn"
                aria-label="Download Hospital Brochure"
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
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
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
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
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
              &copy; Susrutha Ayurveda. {new Date().getFullYear()}. All Rights Reserved.
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
