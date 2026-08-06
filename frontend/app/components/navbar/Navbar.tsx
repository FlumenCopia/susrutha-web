"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { desktopNavigation } from "../../data/architecture";
import { siteConfig } from "../../data/site";

import { NavbarSearch } from "./NavbarSearch";

export function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  const [prevPathname, setPrevPathname] = useState(pathname);
  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    setMobileMenuOpen(false);
  }

  const toggleMobileMenu = () => {
    setMobileMenuOpen((prev) => !prev);
  };

  return (
    <header className="site-header">
      <nav className="navbar" aria-label="Main navigation">
        <Link className="brand" href="/" aria-label="Susrutha Ayurveda home">
          <Image src="/images/logo.webp" alt="Susrutha Ayurveda logo" width={356} height={110} priority />
        </Link>

        <div className="nav-links">
          {desktopNavigation.map((item) => (
            <div
              className="nav-item"
              data-active={
                isActive(item.href) || item.children?.some((child) => isActive(child.href)) ? "true" : undefined
              }
              key={item.label}
            >
              <Link href={item.href}>
                {item.label}
                {item.children ? <span className="nav-chevron" aria-hidden="true" /> : null}
              </Link>
              {item.children ? (
                <div className="dropdown">
                  {item.children.map((child) => (
                    <Link href={child.href} key={child.label}>
                      {child.label}
                    </Link>
                  ))}
                </div>
              ) : null}
            </div>
          ))}
        </div>

        <div className="nav-actions">
          <NavbarSearch />
          <Link className="btn btn-primary nav-book-btn" href="/appointment">
            <svg className="nav-calendar-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
            <span>Book</span>
          </Link>
        </div>

        {/* Mobile Navigation Trigger */}
        <div className="mobile-menu-wrapper">
          <button
            type="button"
            className={`mobile-menu-toggle ${mobileMenuOpen ? "open" : ""}`}
            aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={mobileMenuOpen}
            onClick={toggleMobileMenu}
          >
            <span className="hamburger-bar" />
            <span className="hamburger-bar" />
            <span className="hamburger-bar" />
          </button>
        </div>

        {/* Full-Screen Mobile Navigation Overlay */}
        {mobileMenuOpen && (
          <div className="mobile-fullscreen-overlay" role="dialog" aria-modal="true" aria-label="Navigation Menu">
            <div className="mobile-overlay-header">
              <Link className="mobile-overlay-brand" href="/" onClick={() => setMobileMenuOpen(false)}>
                <Image src="/images/logo.webp" alt="Susrutha Ayurveda logo" width={220} height={68} priority />
              </Link>
              <button
                type="button"
                className="mobile-overlay-close-btn"
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Close navigation"
              >
                <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            <div className="mobile-overlay-body">
              <div className="mobile-overlay-search">
                <NavbarSearch />
              </div>

              <nav className="mobile-overlay-links">
                {desktopNavigation.map((item) => (
                  <div className="mobile-overlay-group" key={item.label}>
                    <Link
                      href={item.href}
                      className={`mobile-overlay-main-link ${isActive(item.href) ? "active" : ""}`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <span>{item.label}</span>
                      {isActive(item.href) && <span className="mobile-active-dot">🌿</span>}
                    </Link>
                    {item.children ? (
                      <div className="mobile-overlay-sub-links">
                        {item.children.map((child) => (
                          <Link
                            href={child.href}
                            key={child.label}
                            className={`mobile-overlay-sub-link ${isActive(child.href) ? "active" : ""}`}
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    ) : null}
                  </div>
                ))}
              </nav>
            </div>

            <div className="mobile-overlay-footer">
              <Link
                className="btn btn-primary mobile-overlay-book-btn"
                href="/appointment"
                onClick={() => setMobileMenuOpen(false)}
              >
                📅 Book Appointment &rarr;
              </Link>
              <div className="mobile-overlay-contacts">
                <a href={`tel:${siteConfig.phone.replaceAll(" ", "")}`}>
                  📞 {siteConfig.phone}
                </a>
                <a href={`mailto:${siteConfig.email}`}>
                  ✉️ {siteConfig.email}
                </a>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
