import Image from "next/image";
import Link from "next/link";
import { AyurVillageIcon } from "./AyurVillageIcon";

export function AyurVillageCTA() {
  return (
    <section className="ayur-village-cta">
      <div className="ayur-village-cta-bg-wrap" aria-hidden="true">
        <Image
          src="/images/banner_calm_retreat.jpg"
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
          <h2 style={{ color: "#ffffff", fontWeight: 700, textShadow: "0 2px 10px rgba(0,0,0,0.6)" }}>Begin your Gramam healing journey</h2>
          <p style={{ color: "rgba(255, 255, 255, 0.95)", fontWeight: 500, textShadow: "0 1px 6px rgba(0,0,0,0.6)" }}>A residential stay that restores balance, health, and vitality.</p>
        </div>
      </div>

      <Link className="ayur-village-button ayur-village-button-primary ayur-village-cta-btn" href="/appointment?package=rejuvenation-package&type=PACKAGE_BOOKING">
        <span>Book your stay</span>
        <AyurVillageIcon name="arrow" />
      </Link>
    </section>
  );
}
