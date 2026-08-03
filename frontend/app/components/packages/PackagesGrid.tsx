import { PackageCard } from "./PackageCard";
import { packages } from "./packagesData";

export function PackagesGrid() {
  return (
    <section className="packages-list-section">
      <div className="packages-section-head">
        <span className="packages-eyebrow">Our Packages</span>
        <h2>Structured care, meaningful healing</h2>
      </div>

      <div className="packages-grid">
        {packages.map((item) => (
          <PackageCard item={item} key={item.title} />
        ))}
      </div>
    </section>
  );
}
