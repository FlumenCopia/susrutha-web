"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";

const navSections = [
  {
    title: "Explore",
    links: [
      { label: "Home", href: "/" },
      { label: "About Us", href: "/about-us" },
      { label: "Our Doctors", href: "/doctors" },
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
          </div>
        </div>

        {/* Bottom Bar: Social Icons & Copyright & Back to top */}
        <div className="luxury-footer-bottom">
          <div className="luxury-footer-socials" aria-label="Social media links">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <i className="fa-brands fa-facebook-f" />
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
              <i className="fa-brands fa-youtube" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <i className="fa-brands fa-instagram" />
            </a>
            <a href="https://susruthaayurveda.com" target="_blank" rel="noopener noreferrer" aria-label="Website">
              <i className="fa-solid fa-globe" />
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
              <i className="fa-solid fa-chevron-up" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
