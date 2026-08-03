import Link from "next/link";
import { PackagesIcon } from "./PackagesIcon";
import { packages } from "./packagesData";

type PackageItem = (typeof packages)[number];

type PackageCardProps = {
  item: PackageItem;
};

export function PackageCard({ item }: PackageCardProps) {
  return (
    <article className="package-card">
      <span className="package-card-icon">
        <PackagesIcon name={item.icon} />
      </span>
      <div>
        <span className="package-card-meta">{item.meta}</span>
        <h3>{item.title}</h3>
        <p>{item.text}</p>
        <Link href="/appointment">
          Explore
          <PackagesIcon name="arrow" />
        </Link>
      </div>
    </article>
  );
}
