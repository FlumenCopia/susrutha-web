import Image from "next/image";
import Link from "next/link";

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

function HomeIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="M4 11.5 12 5l8 6.5" />
      <path d="M6.5 10.5V19h11v-8.5" />
      <path d="M10 19v-5h4v5" />
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

function ListIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="M8 6h12M8 12h12M8 18h12" />
      <path d="M4 6h.01M4 12h.01M4 18h.01" />
    </svg>
  );
}

export function ConditionsBanner() {
  return (
    <section className="conditions-hero" aria-labelledby="conditions-title">
      <div className="conditions-hero-copy">
        <nav className="conditions-breadcrumb" aria-label="Breadcrumb">
          <Link href="/">
            <HomeIcon />
            Home
          </Link>
          <span aria-hidden="true">&gt;</span>
          <span>Conditions</span>
        </nav>

        <h1 id="conditions-title">
          Conditions
          <span>We Treat</span>
        </h1>

        {/* <div className="conditions-title-rule" aria-hidden="true">
          <span />
          <i>
            <LeafMark />
          </i>
        </div> */}

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
            src="/images/doctors-ayurveda-mortar-hero.webp"
            alt=""
            fill
            priority
            sizes="(max-width: 900px) 100vw, 66vw"
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
  );
}
