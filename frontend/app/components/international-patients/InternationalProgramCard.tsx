import Image from "next/image";
import Link from "next/link";
import { internationalPrograms } from "./internationalPatientsData";
import { InternationalPatientsIcon } from "./InternationalPatientsIcon";

type InternationalProgram = (typeof internationalPrograms)[number];

type InternationalProgramCardProps = {
  program: InternationalProgram;
};

export function InternationalProgramCard({ program }: InternationalProgramCardProps) {
  return (
    <article className="international-program-card">
      <div className="international-program-media">
        <Image src={program.image} alt={`${program.title} program`} fill sizes="(max-width: 760px) 100vw, 25vw" />
      </div>
      <span className="international-card-icon">
        <InternationalPatientsIcon name={program.icon} />
      </span>
      <div className="international-program-content">
        <h3>{program.title}</h3>
        <p>{program.text}</p>
        <Link href="/packages">
          Explore Program
          <InternationalPatientsIcon name="arrow" />
        </Link>
      </div>
    </article>
  );
}
