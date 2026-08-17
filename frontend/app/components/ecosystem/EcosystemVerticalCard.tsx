import Image from "next/image";
import Link from "next/link";
import { EcosystemIcon, type EcosystemIconName } from "./EcosystemIcon";

export type EcosystemVertical = {
  title: string;
  text: string;
  image: string;
  icon: EcosystemIconName;
  href: string;
  since?: string;
  externalText?: string;
};

type EcosystemVerticalCardProps = {
  item: EcosystemVertical;
};

export function EcosystemVerticalCard({ item }: EcosystemVerticalCardProps) {
  const isExternal = item.href.startsWith("http");

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
        {isExternal ? (
          <a href={item.href} target="_blank" rel="noreferrer">
            Open page
            <EcosystemIcon name="arrow" />
          </a>
        ) : (
          <Link href={item.href}>
            Open page
            <EcosystemIcon name="arrow" />
          </Link>
        )}
      </div>
    </article>
  );
}
