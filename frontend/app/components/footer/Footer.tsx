import Image from "next/image";
import Link from "next/link";
import { footerNavigation } from "../../data/architecture";
import { siteConfig } from "../../data/site";

function LotusMark({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 64 48" aria-hidden="true" focusable="false">
      <path d="M32 42C21 33 19 21 32 6c13 15 11 27 0 36Z" fill="currentColor" opacity="0.85" />
      <path d="M31 42C18 39 10 30 9 16c14 2 22 11 22 26Z" fill="currentColor" opacity="0.65" />
      <path d="M33 42c13-3 21-12 22-26-14 2-22 11-22 26Z" fill="currentColor" opacity="0.65" />
      <path d="M32 42C22 43 14 39 7 30c12-3 21 1 25 12Z" fill="currentColor" opacity="0.45" />
      <path d="M32 42c10 1 18-3 25-12-12-3-21 1-25 12Z" fill="currentColor" opacity="0.45" />
    </svg>
  );
}

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-ornament-line">
        <LotusMark />
      </div>

      <div className="footer-main">
        <div className="footer-botanical footer-botanical-left" aria-hidden="true" />
        <div className="footer-botanical footer-botanical-right" aria-hidden="true" />

        {/* Column 1: Brand Info */}
        <div className="footer-brand-panel">
          <Image src="/images/logo.webp" alt="Susrutha Ayurveda logo" width={282} height={88} />
          <span className="footer-small-line" />
          <h2>
            Healing with Tradition
            <span>Since 1987</span>
          </h2>
          <p>Rooted in ancient wisdom. Backed by research. Dedicated to your wellness and longevity.</p>
          <div className="footer-mini-ornament" aria-hidden="true">
            <span />
            <LotusMark />
            <span />
          </div>
          <div className="footer-social" aria-label="Social links">
            <a href="#" aria-label="Facebook">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H7.5v-3H10V9.5C10 7.01 11.49 5.6 13.78 5.6c1.1 0 2.25.2 2.25.2v2.47h-1.27c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.45 3h-2.33v6.8c4.56-.93 8-4.96 8-9.8z"/></svg>
            </a>
            <a href="#" aria-label="Instagram">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
            </a>
            <a href="#" aria-label="YouTube">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
            </a>
            <a href="#" aria-label="LinkedIn">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/></svg>
            </a>
          </div>
        </div>

        {/* Column 2: Navigation Links */}
        <nav className="footer-link-columns" aria-label="Footer navigation">
          {footerNavigation.map((column) => (
            <div className="footer-column" key={column.title}>
              <h3>{column.title}</h3>
              <span />
              {column.links.map((link) => (
                <Link href={link.href} key={link.label}>
                  {link.label}
                </Link>
              ))}
            </div>
          ))}
        </nav>

        {/* Column 3: Consultation Card */}
        <aside className="footer-consult-card" aria-label="Book a consultation">
          <div className="footer-card-ornament" aria-hidden="true">
            <span />
            <LotusMark />
            <span />
          </div>
          <h3>Book A Consultation</h3>
          <span className="footer-consult-rule" />
          <p>Take the first step towards a healthier, balanced life.</p>
          <Link className="footer-consult-button" href="/appointment">
            <span>Book Appointment</span>
            <span aria-hidden="true" className="btn-arrow">&rarr;</span>
          </Link>
          <div className="footer-card-contact-box">
            <a className="footer-contact-row" href="tel:+919447003191">
              <span className="contact-icon" aria-hidden="true">📞</span>
              +91 94470 03191
            </a>
            <a className="footer-contact-row" href={`mailto:${siteConfig.email}`}>
              <span className="contact-icon" aria-hidden="true">✉️</span>
              {siteConfig.email}
            </a>
          </div>
        </aside>
      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} Susrutha Ayurveda. All Rights Reserved.</p>
        <div className="footer-bottom-mark" aria-hidden="true">
          <span />
          <LotusMark />
          <span />
        </div>
        <p>Crafted with care. Inspired by tradition.</p>
      </div>
    </footer>
  );
}
