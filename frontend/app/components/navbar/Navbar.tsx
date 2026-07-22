import Image from "next/image";
import Link from "next/link";
import { navigation, siteConfig } from "../../data/site";

export function Navbar() {
  return (
    <header className="site-header">
      <nav className="navbar" aria-label="Main navigation">
        <Link className="brand" href="/" aria-label="Susrutha Ayurveda home">
          <Image src="/images/logo.png" alt="Susrutha Ayurveda logo" width={356} height={110} priority />
        </Link>

        <div className="nav-links">
          {navigation.map((item, index) => (
            <div className="nav-item" data-active={index === 0 ? "true" : undefined} key={item.label}>
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
            <span aria-hidden="true">☎</span>
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
            {navigation.map((item) => (
              <Link href={item.href} key={item.label}>
                {item.label}
              </Link>
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
