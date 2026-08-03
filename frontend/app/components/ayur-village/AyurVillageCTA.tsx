import Link from "next/link";
import { AyurVillageIcon } from "./AyurVillageIcon";

export function AyurVillageCTA() {
  return (
    <section className="ayur-village-cta">
      <div>
        <span>
          <AyurVillageIcon name="calendar" />
        </span>
        <div>
          <h2>Begin your healing journey</h2>
          <p>A stay that supports your transformation.</p>
        </div>
      </div>
      <Link className="ayur-village-button ayur-village-button-light" href="/appointment">
        Book your stay
        <AyurVillageIcon name="arrow" />
      </Link>
    </section>
  );
}
