import Link from "next/link";
import { BranchIcon } from "./BranchIcons";

export function BranchesCTA() {
  return (
    <section className="branches-cta">
      <div>
        <span>
          <BranchIcon name="calendar" />
        </span>
        <div>
          <h2 style={{ color: "#ffffff" }}>Begin Your Healing Journey</h2>
          <p style={{ color: "rgba(255, 255, 255, 0.88)" }}>Book a consultation at the branch nearest to you.</p>
        </div>
      </div>
      <Link className="branches-button branches-button-light" href="/appointment">
        Book Appointment
        <BranchIcon name="arrow" />
      </Link>
    </section>
  );
}
