import Image from "next/image";
import { BranchIcon } from "./BranchIcons";
import { branchStats, trustPoints } from "./branchesData";

export function BranchesTrustPanel() {
  return (
    <section className="branches-trust-panel">
      <div className="branches-trust-copy">
        <span>Why Choose Susrutha</span>
        <h2>Healing Rooted in Trust & Tradition</h2>
        <ul>
          {trustPoints.map((point) => (
            <li key={point}>
              <BranchIcon name="check" />
              {point}
            </li>
          ))}
        </ul>
      </div>

      <div className="branches-trust-image">
        <Image
          src="/images/about-purpose-still-life.webp"
          alt="Traditional Ayurvedic care setting"
          fill
          sizes="(max-width: 900px) 100vw, 42vw"
        />
      </div>

      <div className="branches-trust-stats">
        {branchStats.map((stat) => (
          <article key={stat.label}>
            <strong>{stat.value}</strong>
            <p>{stat.label}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
