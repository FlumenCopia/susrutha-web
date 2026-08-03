import { BranchLocationCard } from "./BranchLocationCard";
import { BranchIcon } from "./BranchIcons";
import { branches, branchRouteSteps } from "./branchesData";

export function BranchesLocations() {
  return (
    <section className="branches-locations" id="branch-locations">
      <div className="branches-section-heading">
        <span>
          <i />
          Our Locations
          <i />
        </span>
        <h2>Care Closer to You</h2>
        <p>Whether you need comprehensive inpatient care or convenient outpatient consultations, we are here for you.</p>
      </div>

      <div className="branches-location-grid">
        {branches.map((branch) => (
          <BranchLocationCard branch={branch} key={branch.id} />
        ))}
      </div>

      <div className="branches-route-strip" aria-label="Branch care path">
        {branchRouteSteps.map((step) => (
          <span key={step.label}>
            <BranchIcon name={step.icon} />
            {step.label}
          </span>
        ))}
      </div>
    </section>
  );
}
