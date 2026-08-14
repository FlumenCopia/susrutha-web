import Image from "next/image";
import Link from "next/link";

const metrics = [
  ["25+", "Years of Experience"],
  ["50K+", "Happy Patients"],
  ["20+", "Specialised Treatments"],
  ["10+", "Expert Doctors"],
];

export function HomeWellnessExpertiseSection() {
  return (
    <section className="home-wellness-expertise" id="about-susrutha">
      <div className="home-wellness-visual">
        <div className="home-wellness-outline" aria-hidden="true" />
        <div className="home-wellness-photo">
          <Image
            src="/images/heritage-master.webp"
            alt="Vintage Ayurvedic master sorting dried herbs in traditional courtyard"
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
        </div>
      </div>

      <div className="home-wellness-content">
        <span className="home-wellness-eyebrow">
          {/* <i aria-hidden="true" /> */}
          About Susrutha
        </span>

        <h2>
          Your Wellness,
          <br />
          Our <em>Ancient</em> Expertise
        </h2>

        {/* <div className="home-wellness-divider" aria-hidden="true">
          <span />
          <i />
          <span />
        </div> */}

        <p>
          Susrutha began in Kattakada through the vision of Ayurvedic physicians Sri. P. Krishna Pillai and Sri.
          P.K. Pillai. Their clinic grew into a hospital under the guidance of Prof. Dr. Krishnankutty Nair, and
          today the institute continues that legacy through physician-led care, research-minded practice, and a
          dedicated clinical team.
        </p>

        <div className="home-wellness-metrics" aria-label="Susrutha highlights">
          {metrics.map(([value, label]) => (
            <article key={label}>
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
