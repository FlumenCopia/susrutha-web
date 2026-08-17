import Link from "next/link";
import { PackagesIcon } from "./PackagesIcon";
import { DataLayerRibbon } from "../common/DataLayerRibbon";

export type PackageItem = {
  slug?: string;
  icon: string;
  meta: string;
  title: string;
  text: string;
  isBackendData?: boolean;
};

type PackageCardProps = {
  item: PackageItem;
};

export function PackageCard({ item }: PackageCardProps) {
  const slug = item.slug || item.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

  return (
    <article className="package-card">
      <span className="package-card-icon">
        <PackagesIcon name={item.icon} />
      </span>
      <div>
        <span className="package-card-meta">{item.meta}</span>
        <h3>{item.title}</h3>
        <p>{item.text}</p>
        <Link href={`/packages/${slug}`}>
          Explore Package
          <PackagesIcon name="arrow" />
        </Link>
      </div>
    </article>
  );
}
