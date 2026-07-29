import Image from "next/image";
import Link from "next/link";
import type { ConditionDetail } from "../../data/conditions";

type ConditionDetailBannerProps = {
  condition: ConditionDetail;
};

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="M5 12h13" />
      <path d="m13 6 6 6-6 6" />
    </svg>
  );
}

function LeafMark() {
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true" focusable="false">
      <path d="M32 52C20 42 18 28 32 9c14 19 12 33 0 43Z" />
      <path d="M31 52C17 49 9 39 8 24c15 2 24 12 23 28Z" />
      <path d="M33 52c14-3 22-13 23-28-15 2-24 12-23 28Z" />
      <path d="M32 52C21 53 13 48 6 38c13-3 22 2 26 14Z" />
      <path d="M32 52c11 1 19-4 26-14-13-3-22 2-26 14Z" />
    </svg>
  );
}

export function ConditionDetailBanner({ condition }: ConditionDetailBannerProps) {
  return (
    <section className="condition-detail-banner" aria-labelledby="condition-detail-title">
      <div className="condition-detail-copy">
        <nav className="condition-detail-breadcrumb" aria-label="Breadcrumb">
          <Link href="/">Home</Link>
          <span aria-hidden="true">&gt;</span>
          <Link href="/conditions">Conditions</Link>
          <span aria-hidden="true">&gt;</span>
          <span>{condition.title}</span>
        </nav>

        <div className="condition-detail-eyebrow">
          <LeafMark />
          <span>Condition</span>
        </div>

        <h1 id="condition-detail-title">{condition.title}</h1>

        <p className="condition-detail-summary">{condition.summary}</p>

        <p className="condition-detail-review">
          Medically reviewed by <em>{condition.reviewer}</em>
        </p>

        <div className="condition-detail-actions">
          <Link className="condition-detail-primary" href="/appointment">
            Request Consultation
            <ArrowIcon />
          </Link>
          <Link className="condition-detail-secondary" href="/treatments">
            Explore Treatments
          </Link>
        </div>
      </div>

      <div className="condition-detail-visual" aria-hidden="true">
        <div className="condition-detail-curve" />
        <Image src={condition.image} alt="" fill priority sizes="(max-width: 980px) 100vw, 58vw" />
        <div className="condition-detail-badge">
          <span>Rooted in Ayurveda</span>
          <LeafMark />
          <em>Backed by Experience</em>
        </div>
      </div>
    </section>
  );
}
