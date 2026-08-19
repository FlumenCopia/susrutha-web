import Link from "next/link";
import { AyurVillageIcon } from "./AyurVillageIcon";

export function AyurVillageCTA() {
  return (
    <section className="ayur-village-cta" style={{ color: "#ffffff" }}>
      <div>
        <span style={{ color: "#ffffff", borderColor: "rgba(255, 255, 255, 0.4)" }}>
          <AyurVillageIcon name="calendar" />
        </span>
        <div>
          <h2 style={{ color: "#ffffff" }}>Begin your healing journey</h2>
          <p style={{ color: "rgba(255, 255, 255, 0.9)" }}>A stay that supports your transformation.</p>
        </div>
      </div>
      <Link className="ayur-village-button ayur-village-button-light" href="/appointment">
        Book your stay
        <AyurVillageIcon name="arrow" />
      </Link>
    </section>
  );
}
