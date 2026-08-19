import Image from "next/image";
import Link from "next/link";
import { BranchIcon } from "./BranchIcons";

export function BranchesCTA() {
  return (
    <section className="branches-cta">
      <div className="branches-cta-bg-wrap" aria-hidden="true">
        <Image
          src="/images/testimonial-lamp-flowers.webp"
          alt=""
          fill
          priority
          sizes="(max-width: 1200px) 100vw, 1280px"
          style={{ objectFit: "cover", objectPosition: "right center" }}
        />
        <div className="branches-cta-overlay" />
      </div>

      <div className="branches-cta-inner">
        <span className="branches-cta-icon-badge">
          <BranchIcon name="calendar" />
        </span>
        <div className="branches-cta-text">
          <h2 style={{ color: "#000000", fontWeight: 700 }}>Begin Your Healing Journey</h2>
          <p style={{ color: "#222222", fontWeight: 500 }}>Book a consultation at the branch nearest to you.</p>
        </div>
      </div>

      <Link className="branches-button branches-button-primary branches-cta-btn" href="/appointment">
        <span>Book Appointment</span>
        <BranchIcon name="arrow" />
      </Link>
    </section>
  );
}
