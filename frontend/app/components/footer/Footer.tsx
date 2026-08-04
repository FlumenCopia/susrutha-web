import Image from "next/image";
import Link from "next/link";
import { footerNavigation } from "../../data/architecture";
import { siteConfig } from "../../data/site";

function LotusMark({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 64 48" aria-hidden="true" focusable="false">
      <path d="M32 42C21 33 19 21 32 6c13 15 11 27 0 36Z" />
      <path d="M31 42C18 39 10 30 9 16c14 2 22 11 22 26Z" />
      <path d="M33 42c13-3 21-12 22-26-14 2-22 11-22 26Z" />
      <path d="M32 42C22 43 14 39 7 30c12-3 21 1 25 12Z" />
      <path d="M32 42c10 1 18-3 25-12-12-3-21 1-25 12Z" />
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
            <a href="#" aria-label="Facebook">f</a>
            <a href="#" aria-label="Instagram">ig</a>
            <a href="#" aria-label="YouTube">yt</a>
            <a href="#" aria-label="LinkedIn">in</a>
          </div>
        </div>

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
            Book Appointment
            <span aria-hidden="true">&rarr;</span>
          </Link>
          <div className="footer-card-ornament footer-card-ornament-bottom" aria-hidden="true">
            <span />
            <LotusMark />
            <span />
          </div>
          <a className="footer-contact-row" href="tel:+919447003191">
            <span aria-hidden="true">T</span>
            +91 94470 03191
          </a>
          <a className="footer-contact-row" href={`mailto:${siteConfig.email}`}>
            <span aria-hidden="true">M</span>
            {siteConfig.email}
          </a>
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
