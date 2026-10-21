import Image from "next/image";
import { EcosystemIcon, type EcosystemIconName } from "./EcosystemIcon";

export type EcosystemVertical = {
  title: string;
  text: string;
  image: string;
  icon: EcosystemIconName;
  href?: string;
  since?: string;
  externalText?: string;
};

type EcosystemVerticalCardProps = {
  item: EcosystemVertical;
};

export function EcosystemVerticalCard({ item }: EcosystemVerticalCardProps) {
  return (
    <article className="ecosystem-card">
      <Image src={item.image} alt={`${item.title} visual`} fill sizes="(max-width: 900px) 100vw, 33vw" />
      <div>
        <span className="ecosystem-card-icon">
          <EcosystemIcon name={item.icon} />
        </span>
        {item.since ? <span className="ecosystem-card-meta">{item.since}</span> : null}
        <h3>{item.title}</h3>
        <p>{item.text}</p>
      </div>
    </article>
  );
}
