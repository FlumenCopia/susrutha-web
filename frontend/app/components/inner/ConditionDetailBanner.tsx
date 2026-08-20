import Image from "next/image";
import Link from "next/link";
import { getImageDisplayUrl } from "../../services/api";

export type ConditionDetail = {
  slug: string;
  category: string;
  title: string;
  subtitle: string;
  overview: string;
  shortDescription?: string;
  fullDescription?: string;
  summary?: string;
  reviewer?: string;
  image: string;
  keyStats?: Array<{ value: string; label: string }>;
  symptoms?: string[];
  ayurvedicView?: string;
  ayurvedicRootCause?: string;
  recommendedTreatments?: Array<{ title: string; duration: string; description: string }>;
  dietLifestyle?: string[];
};

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
  const rawImage = (condition as any).coverImage || condition.image || (condition as any).photo || (condition as any).photoUrl || "/images/banner_conditions_serene.jpg";
  const displayImage = getImageDisplayUrl(rawImage);
  const description = condition.summary || condition.shortDescription || condition.overview || condition.subtitle;

  return (
    <section className="condition-detail-banner" aria-labelledby="condition-detail-title">
      <div className="condition-detail-container">
        <div className="condition-detail-copy">
          <div className="condition-detail-eyebrow">
            <LeafMark />
            <span>AYURVEDIC CARE</span>
          </div>

          <h1 id="condition-detail-title">{condition.title}</h1>

          {description && <p className="condition-detail-summary">{description}</p>}

          {condition.reviewer && (
            <p className="condition-detail-review">
              Medically reviewed by <em>{condition.reviewer}</em>
            </p>
          )}

          <div className="condition-detail-actions">
            <Link className="condition-detail-primary" href="/appointment">
              <span>Request Consultation</span>
              <ArrowIcon />
            </Link>
            <Link className="condition-detail-secondary" href="/treatments">
              <span>Explore Treatments</span>
            </Link>
          </div>
        </div>

        <div className="condition-detail-visual" aria-hidden="true">
          <div className="condition-detail-media-frame">
            <Image
              src={displayImage}
              alt={condition.title || "Condition Detail"}
              fill
              priority
              sizes="(max-width: 980px) 100vw, 48vw"
              style={{ objectFit: "cover", objectPosition: "center" }}
            />
            <div className="condition-detail-media-overlay" />
            <div className="condition-detail-badge">
              <span>Rooted in Ayurveda</span>
              <LeafMark />
              <em>Backed by Experience</em>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
