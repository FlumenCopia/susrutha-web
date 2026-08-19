import Image from "next/image";
import Link from "next/link";
import { AyurVillageIcon } from "./AyurVillageIcon";

export function AyurVillageCTA() {
  return (
    <section className="ayur-village-cta">
      <div className="ayur-village-cta-bg-wrap" aria-hidden="true">
        <Image
          src="/images/ayurveda-village-path.webp"
          alt="Ayur Village Retreat"
          fill
          priority
          sizes="(max-width: 1200px) 100vw, 1280px"
          style={{ objectFit: "cover", objectPosition: "center 45%" }}
        />
        <div className="ayur-village-cta-overlay" />
      </div>

      <div className="ayur-village-cta-inner">
        <span className="ayur-village-cta-icon-badge">
          <AyurVillageIcon name="calendar" />
        </span>
        <div className="ayur-village-cta-text">
          <h2 style={{ color: "#000000", fontWeight: 700 }}>Begin your healing journey</h2>
          <p style={{ color: "#222222", fontWeight: 500 }}>A stay that supports your transformation.</p>
        </div>
      </div>

      <Link className="ayur-village-button ayur-village-button-primary ayur-village-cta-btn" href="/appointment">
        <span>Book your stay</span>
        <AyurVillageIcon name="arrow" />
      </Link>
    </section>
  );
}
