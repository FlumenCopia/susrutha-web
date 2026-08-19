import Image from "next/image";
import Link from "next/link";
import { BranchIcon, type BranchIconName } from "./BranchIcons";
import { DataLayerRibbon } from "../common/DataLayerRibbon";

export type Branch = {
  id: string;
  title: string;
  label: string;
  description: string;
  location: string;
  hours: string;
  phone: string;
  image: string;
  icon: BranchIconName;
  details: string[];
  doctors: string[];
  mapsHref: string;
  isBackendData?: boolean;
};

type BranchLocationCardProps = {
  branch: Branch;
};

export function BranchLocationCard({ branch }: BranchLocationCardProps) {
  return (
    <article
      className="branch-location-card"
      id={branch.id}
    >
      <div className="branch-location-image">
        <Image src={branch.image} alt={`${branch.title} care environment`} fill sizes="(max-width: 900px) 100vw, 50vw" />
        <span>{branch.label}</span>
      </div>

      <div className="branch-location-body">
        <h3>{branch.title}</h3>

        <p className="branch-location-address">
          <BranchIcon name="pin" />
          {branch.location}
        </p>

        <p className="branch-location-description">{branch.description}</p>

        <div className="branch-location-meta">
          <span>
            <BranchIcon name="clock" />
            {branch.hours}
          </span>
          <a href={`tel:${branch.phone.replaceAll(" ", "")}`}>
            <BranchIcon name="phone" />
            {branch.phone}
          </a>
        </div>

        <div className="branch-location-tags">
          {branch.details.map((detail) => (
            <span key={detail}>{detail}</span>
          ))}
        </div>

        <p className="branch-location-doctors">
          <BranchIcon name="check" />
          {branch.doctors}
        </p>

        <div className="branch-location-actions">
          <Link className="branches-button branches-button-primary" href="/contact-us">
            Branch Details
            <BranchIcon name="arrow" />
          </Link>
          <a className="branches-button branches-button-secondary" href={branch.mapsHref} target="_blank" rel="noreferrer">
            Directions
            <BranchIcon name="arrow" />
          </a>
        </div>
      </div>
    </article>
  );
}
