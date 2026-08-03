import Image from "next/image";
import Link from "next/link";
import { facilityPrograms } from "./facilitiesData";
import { FacilitiesIcon } from "./FacilitiesIcon";

export function FacilitiesPrograms() {
  return (
    <section className="facilities-programs">
      <div className="facilities-program-copy">
        <span className="facilities-eyebrow">Facilities Content Structure</span>
        <h2>Everything patients need before they arrive</h2>
        <p>Each facility can include photos, patient guidance, available services, branch information, and enquiry actions.</p>
        <Link href="/packages">
          View care options
          <FacilitiesIcon name="arrow" />
        </Link>
      </div>
      <div className="facilities-program-grid">
        {facilityPrograms.map((program) => (
          <article key={program.title}>
            <FacilitiesIcon name={program.icon} />
            <h3>{program.title}</h3>
            <p>{program.text}</p>
            <Image src={program.image} alt="" fill sizes="(max-width: 760px) 100vw, 18vw" />
          </article>
        ))}
      </div>
    </section>
  );
}
