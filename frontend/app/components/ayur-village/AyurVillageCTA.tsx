import Image from "next/image";
import Link from "next/link";
import { AyurVillageIcon } from "./AyurVillageIcon";
import { getImageDisplayUrl } from "@/app/services/api";

export function AyurVillageCTA() {
  return (
    <section className="ayur-village-cta">
      <div className="ayur-village-cta-bg-wrap" aria-hidden="true">
        <Image
          src={getImageDisplayUrl("/uploads/banner_welcome.webp")}
          alt="Ayur Village Retreat"
          fill
          priority
          unoptimized
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
          <h2 style={{ color: "#000000", fontWeight: 700 }}>Begin your Gramam healing journey</h2>
          <p style={{ color: "#222222", fontWeight: 500 }}>A residential stay that restores balance, health, and vitality.</p>
        </div>
      </div>

      <Link className="ayur-village-button ayur-village-button-primary ayur-village-cta-btn" href="/appointment?package=rejuvenation-package&type=PACKAGE_BOOKING">
        <span>Book your stay</span>
        <AyurVillageIcon name="arrow" />
      </Link>
    </section>
  );
}
