import Image from "next/image";
import Link from "next/link";
import { SiteShell } from "../components/common/SiteShell";

const conditions = [
  {
    title: "Spine & Joints",
    text: "Back pain, neck stiffness, arthritis, posture strain, and mobility concerns supported through Ayurveda and rehab.",
    href: "/conditions/spine-joints",
    category: "Musculoskeletal",
  },
  {
    title: "Neuro Rehab",
    text: "Structured care pathways for stroke recovery, nerve weakness, balance issues, and long-term neurological support.",
    href: "/conditions/neuro-rehab",
    category: "Rehabilitation",
  },
  {
    title: "Rheumatology",
    text: "Physician-led support for chronic inflammation, joint swelling, stiffness, and autoimmune patterns.",
    href: "/conditions/rheumatology",
    category: "Chronic Care",
  },
  {
    title: "Women's Health",
    text: "Care for menstrual health, fertility preparation, antenatal wellness, and postnatal restoration.",
    href: "/conditions/womens-health",
    category: "Speciality Care",
  },
  {
    title: "Paediatrics",
    text: "Gentle Ayurveda support for immunity, digestion, growth, allergies, and recurring childhood concerns.",
    href: "/conditions/paediatrics",
    category: "Family Care",
  },
  {
    title: "Preventive Care",
    text: "Lifestyle, diet, seasonal routines, rejuvenation, and early intervention for long-term wellbeing.",
    href: "/conditions/preventive-care",
    category: "Wellness",
  },
  {
    title: "General Medicine",
    text: "Holistic evaluation for digestion, respiratory comfort, sleep, fatigue, stress, and metabolic concerns.",
    href: "/conditions/general-medicine",
    category: "Primary Care",
  },
  {
    title: "Proctology",
    text: "Classical Ayurveda pathways for anorectal discomfort, bowel health, and physician-guided recovery.",
    href: "/conditions/proctology",
    category: "Speciality Care",
  },
];

const pathways = [
  "Detailed physician consultation",
  "Ayurvedic diagnosis and treatment planning",
  "Therapies, medicine, diet and lifestyle support",
  "Follow-up reviews for lasting recovery",
];

function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <circle cx="10.8" cy="10.8" r="6.6" />
      <path d="m16 16 4.5 4.5" />
    </svg>
  );
}

function GridIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="M5 5h5v5H5zM14 5h5v5h-5zM5 14h5v5H5zM14 14h5v5h-5z" />
    </svg>
  );
}

function ListIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="M8 6h12M8 12h12M8 18h12" />
      <path d="M4 6h.01M4 12h.01M4 18h.01" />
    </svg>
  );
}

function LeafMark() {
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true" focusable="false">
      <path d="M32 52C20 42 18 28 32 9c14 19 12 33 0 43Z" />
      <path d="M31 52C17 49 9 39 8 24c15 2 24 12 23 28Z" />
      <path d="M33 52c14-3 22-13 23-28-15 2-24 12-23 28Z" />
      <path d="M32 52C21 53 13 48 6 38c13-3 22 2 26 14Z" />
      <path d="M32 52c11 1 19-4 26-14-13-3-22 2-26 14Z" />
    </svg>
  );
}

export default function ConditionsPage() {
  return (
    <SiteShell>
      <div className="conditions-page">
        <section className="conditions-hero" aria-labelledby="conditions-title">
          <div className="conditions-hero-copy">
            <nav className="conditions-breadcrumb" aria-label="Breadcrumb">
              <Link href="/">Home</Link>
              <span aria-hidden="true">&gt;</span>
              <span>Conditions</span>
            </nav>
            <h1 id="conditions-title">
              Conditions
              <span>We Treat</span>
            </h1>
            <div className="conditions-title-rule" aria-hidden="true">
              <span />
              <i>
                <LeafMark />
              </i>
            </div>
            <p>
              Ayurvedic care for every condition.
              <br />
              Personalized treatments to restore balance,
              <br />
              revive health and enhance your well-being.
            </p>
          </div>

          <div className="conditions-hero-visual" aria-hidden="true">
            <div className="conditions-hero-arch">
              <Image
                src="/images/doctors-ayurveda-mortar-hero.png"
                alt=""
                fill
                priority
                sizes="(max-width: 900px) 100vw, 58vw"
              />
            </div>
            <div className="conditions-rooted-badge">
              <LeafMark />
              <span>Rooted in</span>
              <strong>Ayurveda</strong>
              <i />
              <em>Backed by Experience</em>
            </div>
          </div>

          <div className="conditions-filter-panel" aria-label="Find conditions">
            <label className="conditions-search">
              <SearchIcon />
              <input placeholder="Search for a condition or ailment..." />
            </label>
            <label className="conditions-select">
              <select defaultValue="all">
                <option value="all">All Categories</option>
                <option>Musculoskeletal</option>
                <option>Rehabilitation</option>
                <option>Chronic Care</option>
                <option>Speciality Care</option>
                <option>Wellness</option>
              </select>
            </label>
            <button className="conditions-view-button is-active" type="button" aria-label="Grid view">
              <GridIcon />
            </button>
            <button className="conditions-view-button" type="button" aria-label="List view">
              <ListIcon />
            </button>
          </div>
        </section>

        <section className="conditions-content" aria-labelledby="condition-pathways-title">
          <div className="conditions-section-head">
            <span>Condition Pathways</span>
            <h2 id="condition-pathways-title">Choose the concern that best matches your health journey.</h2>
            <p>
              Each pathway begins with consultation and is guided by constitution, diagnosis, age, strength, and
              recovery goals.
            </p>
          </div>

          <div className="conditions-card-grid">
            {conditions.map((condition, index) => (
              <Link className="condition-card" href={condition.href} key={condition.title}>
                <span>{condition.category}</span>
                <h3>{condition.title}</h3>
                <p>{condition.text}</p>
                <b aria-hidden="true">{String(index + 1).padStart(2, "0")}</b>
                <i aria-hidden="true">&rarr;</i>
              </Link>
            ))}
          </div>
        </section>

        <section className="conditions-care-band" aria-labelledby="conditions-care-title">
          <div>
            <span>How Care Works</span>
            <h2 id="conditions-care-title">Root-cause care, guided by experienced physicians.</h2>
          </div>
          <div className="conditions-pathway-list">
            {pathways.map((item) => (
              <article key={item}>
                <LeafMark />
                <p>{item}</p>
              </article>
            ))}
          </div>
        </section>
      </div>
    </SiteShell>
  );
}
