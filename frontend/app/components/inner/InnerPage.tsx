import Link from "next/link";
import type { PageContent } from "../../data/architecture";

type InnerPageProps = {
  content: PageContent;
  children?: React.ReactNode;
};

export function InnerPage({ content, children }: InnerPageProps) {
  return (
    <>
      <section className="inner-hero">
        <div className="inner-breadcrumb" aria-label="Breadcrumb">
          {content.breadcrumbs.map((item, index) => (
            <span key={item.href}>
              {index > 0 ? <i aria-hidden="true">/</i> : null}
              <Link href={item.href}>{item.label}</Link>
            </span>
          ))}
        </div>
        <span className="eyebrow">{content.eyebrow}</span>
        <h1>{content.title}</h1>
        <p>{content.description}</p>
      </section>

      <section className="inner-section inner-intro-section">
        <div className="inner-section-heading">
          <span className="eyebrow">Overview</span>
          <h2>{content.intro}</h2>
        </div>
      </section>

      <section className="inner-section">
        <div className="inner-card-grid">
          {content.highlights.map((item) => {
            const card = (
              <>
                {item.meta ? <span>{item.meta}</span> : null}
                <h3>{item.title}</h3>
                <p>{item.text}</p>
                {item.href ? <b aria-hidden="true">{"->"}</b> : null}
              </>
            );

            return item.href ? (
              <Link className="inner-card" href={item.href} key={item.title}>
                {card}
              </Link>
            ) : (
              <article className="inner-card" key={item.title}>
                {card}
              </article>
            );
          })}
        </div>
      </section>

      {children}

      {content.sections.map((section) => (
        <section className="inner-section inner-split" key={section.title}>
          <div className="inner-section-heading">
            <span className="eyebrow">Structure</span>
            <h2>{section.title}</h2>
            <p>{section.text}</p>
          </div>
          <ul className="inner-check-list">
            {section.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>
      ))}

      {content.cta ? (
        <section className="inner-section inner-cta">
          <div>
            <span className="eyebrow">Next Step</span>
            <h2>{content.cta.title}</h2>
            <p>{content.cta.text}</p>
          </div>
          <Link className="btn btn-primary" href={content.cta.href}>
            {content.cta.label}
          </Link>
        </section>
      ) : null}
    </>
  );
}

