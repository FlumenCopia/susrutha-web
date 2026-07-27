"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { desktopNavigation } from "../../data/architecture";
import { siteConfig } from "../../data/site";

export function Navbar() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }

    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <header className="site-header">
      <nav className="navbar" aria-label="Main navigation">
        <Link className="brand" href="/" aria-label="Susrutha Ayurveda home">
          <Image src="/images/logo.png" alt="Susrutha Ayurveda logo" width={356} height={110} priority />
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
          <a className="phone-link" href={`tel:${siteConfig.phone.replaceAll(" ", "")}`} aria-label="Call Susrutha Ayurveda">
            <span aria-hidden="true">&#9742;</span>
            {siteConfig.phone}
          </a>
          <Link className="btn btn-primary" href="/appointment">
            Book Appointment
          </Link>
        </div>

        <details className="mobile-menu">
          <summary aria-label="Open menu">
            <span />
            <span />
            <span />
          </summary>
          <div className="mobile-panel">
            {desktopNavigation.map((item) => (
              <div className="mobile-panel-group" key={item.label}>
                <Link href={item.href}>{item.label}</Link>
                {item.children ? (
                  <div>
                    {item.children.map((child) => (
                      <Link href={child.href} key={child.label}>{child.label}</Link>
                    ))}
                  </div>
                ) : null}
              </div>
            ))}
            <a href={`tel:${siteConfig.phone.replaceAll(" ", "")}`}>{siteConfig.phone}</a>
            <Link className="btn btn-primary" href="/appointment">
              Book Appointment
            </Link>
          </div>
        </details>
      </nav>
    </header>
  );
}
