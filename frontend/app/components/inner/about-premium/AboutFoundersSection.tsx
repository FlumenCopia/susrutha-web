import Image from "next/image";
import Link from "next/link";

type FounderIconName = "leaf" | "lotus" | "bowl" | "team";

const founders = [
  {
    name: "Dr. Nikhil Sharma",
    role: "Founder & Chief Physician",
    copy: "18+ years of experience in Panchakarma and holistic healing.",
    image: "/images/founder-nikhil-sharma.png",
    icon: "leaf",
    href: "/doctors",
  },
  {
    name: "Dr. Meera Iyer",
    role: "Founder & Wellness Director",
    copy: "Specialist in women's health, nutrition and preventive care.",
    image: "/images/founder-meera-iyer.png",
    icon: "lotus",
    href: "/doctors",
  },
  {
    name: "Dr. Arjun Das",
    role: "Founder & Research Director",
    copy: "Passionate about Ayurvedic research and evidence-based practices.",
    image: "/images/founder-arjun-das.png",
    icon: "bowl",
    href: "/doctors",
  },
] satisfies {
  name: string;
  role: string;
  copy: string;
  image: string;
  icon: FounderIconName;
  href: string;
}[];

function FounderIcon({ name }: { name: FounderIconName }) {
  const common = {
    fill: "none",
    stroke: "currentColor",
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    strokeWidth: 1.75,
  };

  return (
    <svg viewBox="0 0 48 48" aria-hidden="true">
      {name === "leaf" ? (
        <>
          <path {...common} d="M24 40V17" />
          <path {...common} d="M24 28C15 28 9 22 8 12c10 0 16 7 16 16Z" />
          <path {...common} d="M24 32c8 0 14-5 16-14-9 0-16 6-16 14Z" />
          <path {...common} d="M15 20c4 2 7 4 9 8M35 23c-4 2-8 5-11 9" />
        </>
      ) : null}

      {name === "lotus" ? (
        <>
          <path {...common} d="M24 38c-8-6-8-17 0-29 8 12 8 23 0 29Z" />
          <path {...common} d="M24 37c-9 1-16-5-17-16 9 0 15 5 17 16Z" />
          <path {...common} d="M24 37c9 1 16-5 17-16-9 0-15 5-17 16Z" />
          <path {...common} d="M13 40h22" />
        </>
      ) : null}

      {name === "bowl" ? (
        <>
          <path {...common} d="M12 22h24c-1 10-6 16-12 16s-11-6-12-16Z" />
          <path {...common} d="M17 38h14M20 19l8-8M27 16l6 3M15 18c2-3 5-4 8-3" />
          <path {...common} d="M14 22c3 3 17 3 20 0" />
        </>
      ) : null}

      {name === "team" ? (
        <>
          <circle {...common} cx="17" cy="18" r="5" />
          <circle {...common} cx="31" cy="18" r="5" />
          <path {...common} d="M8 37c1-7 5-11 11-11s10 4 11 11" />
          <path {...common} d="M25 28c2-2 4-3 7-3 5 0 8 4 9 12" />
        </>
      ) : null}
    </svg>
  );
}

export function AboutFoundersSection() {
  return (
    <section className="about-founders-section" aria-labelledby="about-founders-title">
      <div className="about-founders-still" aria-hidden="true">
        <Image
          src="/images/about-purpose-still-life.png"
          alt=""
          width={620}
          height={390}
          sizes="(max-width: 900px) 70vw, 34vw"
        />
      </div>

      <div className="about-founders-head">
        <div className="about-founders-eyebrow">
          <FounderIcon name="leaf" />
          <span>Our Founders</span>
        </div>
        <h2 id="about-founders-title">
          Rooted in <em>Ayurveda.</em>
          <br />
          Driven by <em>Purpose.</em>
        </h2>
        <div className="about-founders-divider" aria-hidden="true">
          <span />
          <FounderIcon name="lotus" />
          <span />
        </div>
        <p>Three visionaries. One mission - to bring the timeless wisdom of Ayurveda to modern lives.</p>
      </div>

      <aside className="about-founders-note" aria-label="Founder philosophy">
        <div>
          <FounderIcon name="leaf" />
        </div>
        <p>
          Ancient wisdom.
          <br />
          Modern care.
          <br />
          Lasting impact.
        </p>
        <span aria-hidden="true" />
      </aside>

      <div className="about-founders-grid">
        {founders.map((founder, index) => (
          <article className="about-founder-card" key={founder.name}>
            <div className="about-founder-photo">
              {index === 0 ? <span className="about-founder-side" aria-hidden="true" /> : null}
              <Image
                src={founder.image}
                alt={founder.name}
                fill
                sizes="(max-width: 720px) 88vw, (max-width: 1100px) 44vw, 28vw"
              />
              <div className="about-founder-icon">
                <FounderIcon name={founder.icon} />
              </div>
            </div>
            <div className="about-founder-body">
              <span aria-hidden="true" />
              <h3>{founder.name}</h3>
              <p className="about-founder-role">{founder.role}</p>
              <p className="about-founder-copy">{founder.copy}</p>
              <Link href={founder.href} className="about-founder-link">
                View Profile <i aria-hidden="true">-&gt;</i>
              </Link>
            </div>
          </article>
        ))}
      </div>

      <div className="about-founders-team">
        <div className="about-founders-team-icon">
          <FounderIcon name="team" />
        </div>
        <p>United by purpose. Dedicated to your well-being.</p>
        <span aria-hidden="true" />
        <Link href="/doctors">
          Meet Our Team <i aria-hidden="true">-&gt;</i>
        </Link>
      </div>
    </section>
  );
}
