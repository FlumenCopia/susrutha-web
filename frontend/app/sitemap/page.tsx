import Link from "next/link";
import { SiteShell } from "../components/common/SiteShell";
import {
  completeSitemap,
  componentReusePlan,
  desktopNavigation,
  developmentRoadmap,
  featureList,
  footerNavigation,
  nextFolderStructure,
  seoStructure,
  userFlows,
} from "../data/architecture";

function ArchitectureList({ title, items }: { title: string; items: string[] }) {
  return (
    <section className="inner-section inner-split">
      <div className="inner-section-heading">
        <span className="eyebrow">Architecture</span>
        <h2>{title}</h2>
      </div>
      <ul className="architecture-list">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </section>
  );
}

export default function SitemapPage() {
  return (
    <SiteShell>
      <section className="inner-hero">
        <div className="inner-breadcrumb" aria-label="Breadcrumb">
          <span><Link href="/">Home</Link></span>
          <span><i aria-hidden="true">/</i><Link href="/sitemap">Sitemap</Link></span>
        </div>
        <span className="eyebrow">Website Architecture</span>
        <h1>Complete Website Sitemap</h1>
        <p>Production-ready sitemap, navigation hierarchy, user flows, reusable components, SEO structure, and development roadmap.</p>
      </section>

      <section className="inner-section">
        <div className="inner-section-heading">
          <span className="eyebrow">1</span>
          <h2>Complete Website Sitemap</h2>
        </div>
        <ul className="sitemap-tree">
          {completeSitemap.map((item) => (
            <li key={item.href}>
              <Link href={item.href}>{item.label}</Link>
              {item.children ? (
                <ul>
                  {item.children.map((child) => (
                    <li key={child.href}><Link href={child.href}>{child.label}</Link></li>
                  ))}
                </ul>
              ) : null}
            </li>
          ))}
        </ul>
      </section>

      <section className="inner-section inner-split">
        <div className="inner-section-heading">
          <span className="eyebrow">2</span>
          <h2>Navigation Hierarchy</h2>
          <p>Desktop navigation, mobile navigation, dropdown menus, breadcrumb structure, footer navigation, quick links, useful links, and patient links.</p>
        </div>
        <ul className="architecture-list">
          {desktopNavigation.map((item) => (
            <li key={item.label}>{item.label}{item.children ? `: ${item.children.map((child) => child.label).join(", ")}` : ""}</li>
          ))}
          {footerNavigation.map((column) => (
            <li key={column.title}>{column.title}: {column.links.map((link) => link.label).join(", ")}</li>
          ))}
        </ul>
      </section>

      <ArchitectureList title="3. Inner Page List" items={completeSitemap.map((item) => item.label)} />
      <ArchitectureList title="4. Functional List" items={featureList} />
      <ArchitectureList title="5. User Flow" items={userFlows} />
      <ArchitectureList title="6. Navigation Flow" items={["Home -> primary navigation -> listing pages -> detail pages -> appointment/contact CTA", "Footer -> quick links/useful links/patient links -> support pages", "Breadcrumbs -> parent section -> current page"]} />
      <ArchitectureList title="7. Component Reuse Plan" items={componentReusePlan} />
      <ArchitectureList title="8. Next.js Folder Structure" items={nextFolderStructure} />
      <ArchitectureList title="9. SEO Structure" items={seoStructure} />
      <ArchitectureList title="10. Development Roadmap" items={developmentRoadmap} />
    </SiteShell>
  );
}
