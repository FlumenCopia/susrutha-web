import Image from "next/image";
import Link from "next/link";
import { BranchIcon, type BranchIconName } from "./BranchIcons";

const branchHighlights: Array<{ icon: BranchIconName; title: string; subtitle: string; text: string }> = [
  { icon: "building", title: "Kattakada Flagship", subtitle: "Specialty Hospital & Inpatient Suites", text: "Flagship hospital with 24/7 care and full Panchakarma suites." },
  { icon: "leaf", title: "Kowdiar Clinic", subtitle: "City Outpatient & Consultation Centre", text: "Urban consultation clinic for outpatient wellness & diagnosis." },
];

export function BranchesHero() {
  return (
    <section className="branches-hero">
      <div className="branches-hero-copy">
        <nav className="branches-breadcrumb" aria-label="Breadcrumb">
          <Link href="/">Home</Link>
          <span aria-hidden="true">/</span>
          <span>Branches</span>
        </nav>

        <span className="branches-kicker">Our Locations</span>
        <h1>Our Branches</h1>
        <p>
          Two access points in Thiruvananthapuram - full inpatient infrastructure at Kattakada, city outpatient
          convenience at Kowdiar since June 2022.
        </p>

        <div className="branches-hero-actions">
          <Link className="branches-button branches-button-primary" href="/appointment">
            Book Appointment
            <BranchIcon name="calendar" />
          </Link>
          <Link className="branches-button branches-button-secondary" href="#branch-locations">
            View Locations
            <BranchIcon name="arrow" />
          </Link>
        </div>
      </div>

      <div className="branches-hero-visual">
        <Image
          src="/images/ayurveda-hospital-garden.webp"
          alt="Susrutha Ayurveda branch building and garden"
          fill
          priority
          sizes="(max-width: 900px) 100vw, 50vw"
        />
        <div className="branches-hero-card">
          <span>2</span>
          <p>Care destinations across Thiruvananthapuram</p>
        </div>
      </div>

      <div className="branches-hero-highlights" aria-label="Branch highlights">
        {branchHighlights.map((item) => (
          <article key={item.title}>
            <span>
              <BranchIcon name={item.icon} />
            </span>
            <div>
              <h2>{item.title}</h2>
              <p>{item.text}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
