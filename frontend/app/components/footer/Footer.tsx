import Image from "next/image";
import Link from "next/link";
import { footerLinks, siteConfig } from "../../data/site";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-cta">
        <div>
          <span className="eyebrow">Begin with a consultation</span>
          <h2>Personalized Ayurvedic care for recovery, balance, and long-term wellbeing.</h2>
        </div>
        <Link className="btn btn-light" href="/appointment">
          Book Appointment
        </Link>
      </div>

      <div className="footer-grid">
        <div className="footer-brand">
          <Image src="/images/logo.png" alt="Susrutha Ayurveda logo" width={260} height={80} />
          <p>
            {siteConfig.name} brings together Panchakarma expertise, hospital care, clinical services,
            and a long-standing Ayurveda legacy in Thiruvananthapuram.
          </p>
        </div>

        {footerLinks.map((group) => (
          <div className="footer-column" key={group.title}>
            <h3>{group.title}</h3>
            {group.links.map((link) => (
              <Link href={link.href} key={link.label}>
                {link.label}
              </Link>
            ))}
          </div>
        ))}

        <div className="footer-column contact-column">
          <h3>Contact</h3>
          <a href={`tel:${siteConfig.registrationPhone}`}>{siteConfig.registrationPhone}</a>
          <a href={`tel:${siteConfig.phone.replaceAll(" ", "")}`}>{siteConfig.phone}</a>
          <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
          <p>{siteConfig.address}</p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>Copyright (c) 2026 Susrutha Ayurveda. All rights reserved.</p>
        <div>
          <Link href="/privacy">Privacy</Link>
          <Link href="/sitemap">Sitemap</Link>
        </div>
      </div>
    </footer>
  );
}
