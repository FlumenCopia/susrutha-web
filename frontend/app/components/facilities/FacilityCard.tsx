import Image from "next/image";
import Link from "next/link";
import { facilityCards } from "./facilitiesData";
import { FacilitiesIcon } from "./FacilitiesIcon";

type FacilityCardItem = (typeof facilityCards)[number];

type FacilityCardProps = {
  facility: FacilityCardItem;
};

export function FacilityCard({ facility }: FacilityCardProps) {
  return (
    <article className="facility-card" data-featured={facility.featured ? "true" : undefined}>
      <span className="facility-card-icon">
        <FacilitiesIcon name={facility.icon} />
      </span>
      <h3>{facility.title}</h3>
      <p>{facility.text}</p>
      <div className="facility-card-image">
        <Image src={facility.image} alt={`${facility.title} facility`} fill sizes="(max-width: 760px) 100vw, 16vw" />
      </div>
      <Link href="/contact-us">
        Explore
        <FacilitiesIcon name="arrow" />
      </Link>
    </article>
  );
}
