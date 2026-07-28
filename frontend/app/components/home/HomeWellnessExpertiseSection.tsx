import Image from "next/image";
import Link from "next/link";

const metrics = [
  ["leaf", "25+", "Years of Experience"],
  ["people", "50K+", "Happy Patients"],
  ["lotus", "20+", "Specialised Treatments"],
  ["doctor", "10+", "Expert Doctors"],
];

function MetricIcon({ name }: { name: string }) {
  return (
    <svg viewBox="0 0 52 52" aria-hidden="true" focusable="false">
      {name === "leaf" ? (
        <>
          <path d="M14 35c16 0 25-9 26-25-16 1-26 10-26 26Z" />
          <path d="M14 35c7-10 15-18 26-25" />
          <path d="M17 31c-8-1-13 4-14 12 9 1 16-3 19-11" />
          <path d="M17 31c-4 4-8 8-13 12" />
        </>
      ) : null}
      {name === "people" ? (
        <>
          <circle cx="26" cy="15" r="5" />
          <circle cx="13" cy="19" r="4" />
          <circle cx="39" cy="19" r="4" />
          <path d="M17 40c1-9 5-14 9-14s8 5 9 14" />
          <path d="M5 40c1-7 5-11 9-11 2 0 4 1 5 3" />
          <path d="M47 40c-1-7-5-11-9-11-2 0-4 1-5 3" />
        </>
      ) : null}
      {name === "lotus" ? (
        <>
          <path d="M26 40c-10-8-11-18 0-32 11 14 10 24 0 32Z" />
          <path d="M25 40C13 38 7 30 7 18c12 2 19 10 18 22Z" />
          <path d="M27 40c12-2 18-10 18-22-12 2-19 10-18 22Z" />
          <path d="M26 40c-9 1-16-3-22-11 10-2 17 2 22 11Z" />
          <path d="M26 40c9 1 16-3 22-11-10-2-17 2-22 11Z" />
        </>
      ) : null}
      {name === "doctor" ? (
        <>
          <circle cx="26" cy="15" r="6" />
          <path d="M13 44V31c0-6 5-11 13-11s13 5 13 11v13" />
          <path d="M20 26l6 8 6-8" />
          <path d="M26 34v8" />
          <path d="M22 38h8" />
        </>
      ) : null}
    </svg>
  );
}

export function HomeWellnessExpertiseSection() {
  return (
    <section className="home-wellness-expertise" id="about-susrutha">
      <div className="home-wellness-visual">
        <div className="home-wellness-outline" aria-hidden="true" />
        <div className="home-wellness-photo">
          <Image
            src="/images/about-susrutha-wellness.png"
            alt="Traditional Ayurvedic wellness courtyard at Susrutha"
            fill
            sizes="(max-width: 980px) 100vw, 48vw"
          />
        </div>

        <div className="home-wellness-badge" aria-label="25 plus years of excellence">
          <strong>25+</strong>
          <span>
            Years of
            <br />
            Excellence
          </span>
          <i aria-hidden="true" />
        </div>
      </div>

      <div className="home-wellness-content">
        <span className="home-wellness-eyebrow">
          <i aria-hidden="true" />
          About Susrutha
        </span>

        <h2>
          Your Wellness,
          <br />
          Our <em>Ancient</em> Expertise
        </h2>

        <div className="home-wellness-divider" aria-hidden="true">
          <span />
          <i />
          <span />
        </div>

        <p>
          The long felt desire of the people of Kattakada to have an Ayurvedic Clinic was realized through two visionaries are Ayurvedic Physician Sri. P. Krishna Pillai (Late) and Sri. P.K. Pillai (Late) in 1970. By their untiring and restless efforts the clinic grey up into a run all hospital. Their visions and ambitions were further enhanced by Sri. P.K. Pillai’s son, Prof. Dr. Krishnankutty Nair (Late), HOD of Govt. Ayurveda College Panchakarma Hospital. Dr. Nair, a thorough professional and a karmayogi, also a recipient of many awards. The hospital also started research work under his able guidance. The Research Institute and the hospital is most effectively managed by Dr. Nair's son Dr.Krishnakumar and Daughter Dr.Sreejakrishna along with their dedicated team of professionals.
        </p>

        <div className="home-wellness-metrics" aria-label="Susrutha highlights">
          {metrics.map(([icon, value, label]) => (
            <article key={label}>
              <MetricIcon name={icon} />
              <strong>{value}</strong>
              <span>{label}</span>
            </article>
          ))}
        </div>

        <Link className="home-wellness-link" href="/about-us">
          Know More About Us
          <span aria-hidden="true">&rarr;</span>
        </Link>
      </div>

      <div className="home-wellness-branch" aria-hidden="true" />
      <div className="home-wellness-mortar" aria-hidden="true" />
    </section>
  );
}
