import Image from "next/image";
import { BranchIcon } from "./BranchIcons";

const trustPoints = [
  "Physician-supervised classical Panchakarma therapies",
  "NABH accredited hospital standards & hygiene",
  "Customized Sattvic diet and authentic medicine formulations",
  "Dedicated international & outstation patient desk",
];

const branchStats = [
  { value: "2", label: "Specialty Centres" },
  { value: "25+", label: "Expert Vaidyas" },
  { value: "50,000+", label: "Patients Healed" },
];

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
