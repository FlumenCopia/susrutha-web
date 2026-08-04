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

        {/* Mobile Navigation Drawer Trigger */}
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

          {mobileMenuOpen && (
            <div className="mobile-menu-backdrop" onClick={() => setMobileMenuOpen(false)} aria-hidden="true" />
          )}

          <div className={`mobile-panel ${mobileMenuOpen ? "open" : ""}`} aria-hidden={!mobileMenuOpen}>
            <div className="mobile-panel-header">
              <span className="mobile-panel-title">Navigation</span>
              <button
                type="button"
                className="mobile-panel-close-btn"
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Close menu"
              >
                ✕
              </button>
            </div>

            <div className="mobile-panel-links">
              {desktopNavigation.map((item) => (
                <div className="mobile-panel-group" key={item.label}>
                  <Link
                    href={item.href}
                    className={isActive(item.href) ? "active" : ""}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                  {item.children ? (
                    <div className="mobile-sub-links">
                      {item.children.map((child) => (
                        <Link
                          href={child.href}
                          key={child.label}
                          className={isActive(child.href) ? "active" : ""}
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  ) : null}
                </div>
              ))}
            </div>

            <div className="mobile-panel-footer">
              <a href={`tel:${siteConfig.phone.replaceAll(" ", "")}`} className="mobile-phone-link">
                📞 {siteConfig.phone}
              </a>
              <Link
                className="btn btn-primary mobile-book-btn"
                href="/appointment"
                onClick={() => setMobileMenuOpen(false)}
              >
                Book Appointment
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
