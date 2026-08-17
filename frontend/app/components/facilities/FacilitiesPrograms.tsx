"use client";

import Image from "next/image";
import Link from "next/link";
import { FacilitiesIcon } from "./FacilitiesIcon";

const facilityPrograms = [
  {
    title: "Panchakarma Treatment Suites",
    text: "Private, hygienic treatment rooms equipped with traditional droni tables and steam units.",
    image: "/images/ayurveda-village-room.webp",
  },
  {
    title: "Inpatient Residential Care",
    text: "Serene, well-ventilated rooms with round-the-clock nursing care and Sattvic meals.",
    image: "/images/kattakada-hero-landscape.webp",
  },
];

export function FacilitiesPrograms() {
  return (
    <section className="facilities-programs-luxury">
      <div className="facilities-program-copy-deluxe">
        {/* <span className="facilities-eyebrow-deluxe">OUR CARE & FACILITIES</span> */}
        <h2>Everything patients need before they arrive</h2>
        <p>
          Explore our classical treatment rooms, inpatient residential suites, mobility rehabilitation care, and daily wellness practice environments.
        </p>
        <Link href="/packages" className="facilities-copy-cta">
          <span>View Care Options</span>
          <FacilitiesIcon name="arrow" />
        </Link>
      </div>

      <div className="facilities-program-grid-deluxe">
        {facilityPrograms.map((program) => (
          <article className="facilities-card-deluxe" key={program.title}>
            <div className="facilities-card-img-wrapper">
              <Image
                src={program.image}
                alt={program.title}
                fill
                sizes="(max-width: 760px) 100vw, 25vw"
                className="facilities-card-img"
              />
            </div>
            <div className="facilities-card-content">
              <h3>{program.title}</h3>
              <p>{program.text}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
