"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { desktopNavigation, LinkItem } from "../../data/architecture";
import { siteConfig } from "../../data/site";
import { getPublicTreatments, getPublicConditions, getPublicDoctors } from "../../services/api";

import { Leaf, CalendarDays, ArrowRight, Phone, Mail, ChevronDown } from "lucide-react";
import { NavbarSearch } from "./NavbarSearch";
import "./navbar.css";

export function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openMobileDropdown, setOpenMobileDropdown] = useState<string | null>(null);
  const [navigation, setNavigation] = useState<LinkItem[]>(desktopNavigation);

  useEffect(() => {
    async function loadDynamicDropdowns() {
      try {
        const [apiTreatments, apiConditions, apiDoctors] = await Promise.all([
          getPublicTreatments(),
          getPublicConditions(),
          getPublicDoctors(),
        ]);

        const MAX_DROPDOWN_ITEMS = 6;

        const updated = desktopNavigation.map((item) => {
          if (item.label === "Treatments" && Array.isArray(apiTreatments) && apiTreatments.length > 0) {
            const limitedTreatments = apiTreatments.slice(0, MAX_DROPDOWN_ITEMS).map((t: any) => ({
              label: t.title || t.name,
              href: `/treatments/${t.slug || t._id || t.id}`,
            }));
            return {
              ...item,
              children: [
                ...limitedTreatments,
                { label: "View All Treatments →", href: "/treatments" },
              ],
            };
          }
          if (item.label === "Conditions" && Array.isArray(apiConditions) && apiConditions.length > 0) {
            const limitedConditions = apiConditions.slice(0, MAX_DROPDOWN_ITEMS).map((c: any) => ({
              label: c.title || c.name,
              href: `/conditions/${c.slug || c._id || c.id}`,
            }));
            return {
              ...item,
              children: [
                ...limitedConditions,
                { label: "View All Conditions →", href: "/conditions" },
              ],
            };
          }
          if (item.label === "Doctors" && Array.isArray(apiDoctors) && apiDoctors.length > 0) {
            const mainDoctors = apiDoctors.filter((d: any) => !d.name?.includes('Test') && !d.name?.match(/\d{5,}/));
            const doctorSource = mainDoctors.length > 0 ? mainDoctors : apiDoctors;
            const limitedDoctors = doctorSource.slice(0, MAX_DROPDOWN_ITEMS).map((d: any) => ({
              label: d.name,
              href: `/doctors/${d.slug || d._id || d.id}`,
            }));
            return {
              ...item,
              children: [
                ...limitedDoctors,
                { label: "View All Doctors →", href: "/doctors" },
              ],
            };
          }
          return item;
        });

        setNavigation(updated);
      } catch (err) {
        console.error("Failed to fetch dynamic dropdowns for Navbar:", err);
      }
    }
    loadDynamicDropdowns();
  }, []);

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

  const toggleMobileDropdown = (label: string) => {
    setOpenMobileDropdown((prev) => (prev === label ? null : label));
  };

  return (
    <header className="site-header">
      <nav className="navbar" aria-label="Main navigation">
        <Link className="brand" href="/" aria-label="Susrutha Ayurveda home">
          <img src="/images/logo.webp" alt="Susrutha Ayurveda logo" />
        </Link>

        <div className="nav-links">
          {navigation.map((item) => (
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
                    <Link href={child.href} key={child.label} className="dropdown-link-item">
                      <span>{child.label}</span>
                      {child.badge && <span className="nav-collab-badge">{child.badge}</span>}
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
      </nav>

      {/* Full-Screen Mobile Navigation Overlay (Solid opaque background) */}
      {mobileMenuOpen && (
        <div className="mobile-fullscreen-overlay" role="dialog" aria-modal="true" aria-label="Navigation Menu">
          <div className="mobile-overlay-header">
            <Link className="mobile-overlay-brand" href="/" onClick={() => setMobileMenuOpen(false)}>
              <Image src="/images/logo.webp" alt="Susrutha Ayurveda logo" width={180} height={56} priority style={{ width: "auto", height: "42px", objectFit: "contain" }} />
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
              {navigation.map((item) => (
                <div className="mobile-overlay-group" key={item.label}>
                  {item.children ? (
                    <>
                      <button
                        type="button"
                        className={`mobile-overlay-main-link has-dropdown ${openMobileDropdown === item.label ? "expanded" : ""} ${isActive(item.href) ? "active" : ""}`}
                        onClick={() => toggleMobileDropdown(item.label)}
                      >
                        <span>{item.label}</span>
                        <ChevronDown
                          size={18}
                          className={`mobile-chevron ${openMobileDropdown === item.label ? "rotated" : ""}`}
                        />
                      </button>
                      {openMobileDropdown === item.label && (
                        <div className="mobile-overlay-sub-links">
                          {item.children.map((child) => (
                            <Link
                              href={child.href}
                              key={child.label}
                              className={`mobile-overlay-sub-link ${isActive(child.href) ? "active" : ""}`}
                              onClick={() => setMobileMenuOpen(false)}
                            >
                              <span>{child.label}</span>
                              {child.badge && <span className="mobile-collab-badge">{child.badge}</span>}
                            </Link>
                          ))}
                        </div>
                      )}
                    </>
                  ) : (
                    <Link
                      href={item.href}
                      className={`mobile-overlay-main-link ${isActive(item.href) ? "active" : ""}`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <span>{item.label}</span>
                      {isActive(item.href) && <Leaf size={12} strokeWidth={2} className="mobile-active-dot" style={{ display: "inline-block", marginLeft: "6px" }} />}
                    </Link>
                  )}
                </div>
              ))}
            </nav>
          </div>

          <div className="mobile-overlay-footer">
            <Link
              className="btn btn-primary mobile-overlay-book-btn"
              href="/appointment"
              onClick={() => setMobileMenuOpen(false)}
              style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "6px" }}
            >
              <CalendarDays size={16} strokeWidth={1.75} aria-hidden="true" />
              Book Appointment
              <ArrowRight size={16} strokeWidth={1.75} aria-hidden="true" />
            </Link>
            <div className="mobile-overlay-contacts">
              <a href={`tel:${siteConfig.phone.replaceAll(" ", "")}`} style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
                <Phone size={14} strokeWidth={1.75} aria-hidden="true" />
                {siteConfig.phone}
              </a>
              <a href={`mailto:${siteConfig.email}`} style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
                <Mail size={14} strokeWidth={1.75} aria-hidden="true" />
                {siteConfig.email}
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
