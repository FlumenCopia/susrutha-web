import Image from "next/image";
import Link from "next/link";

const doctors = [
  {
    name: "Dr. Anjali Nair",
    specialty: "Panchakarma Expert",
    qualification: "BAMS, MD (Ayurveda)",
    summary: "Specialist in Panchakarma & Detoxification",
    experience: "8+ Years",
    image: "/images/doctor-anjali-nair.png",
    icon: "leaf",
    accent: "green",
  },
  {
    name: "Dr. Arjun Dev",
    specialty: "Herbal Medicine Expert",
    qualification: "BAMS, MD (Ayurveda)",
    summary: "Expert in Herbal Medicine & Immunity",
    experience: "10+ Years",
    image: "/images/doctor-arjun-dev.png",
    icon: "bowl",
    accent: "gold",
  },
  {
    name: "Dr. Meera Das",
    specialty: "Women's Health Expert",
    qualification: "BAMS, MD (Ayurveda)",
    summary: "Specialist in Women's Health & Wellness",
    experience: "7+ Years",
    image: "/images/doctor-meera-das.png",
    icon: "leaf",
    accent: "green",
  },
  {
    name: "Dr. Rahul Kumar",
    specialty: "Pain Management Expert",
    qualification: "BAMS, MD (Ayurveda)",
    summary: "Expert in Pain Management & Physiotherapy",
    experience: "12+ Years",
    image: "/images/doctor-rahul-kumar.png",
    icon: "stethoscope",
    accent: "gold",
  },
];

const values = [
  { icon: "sprout", title: "Ancient Wisdom", text: "Rooted in timeless Ayurvedic principles" },
  { icon: "science", title: "Modern Science", text: "Backed by research and continuous learning" },
  { icon: "heart", title: "Personalised Care", text: "Tailored treatments for your unique needs" },
  { icon: "lotus", title: "Holistic Healing", text: "For mind, body and soul" },
  { icon: "shield", title: "Safe & Natural", text: "100% natural therapies with no side effects" },
];

function LineIcon({ name }: { name: string }) {
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true" focusable="false">
      {name === "leaf" || name === "sprout" ? (
        <>
          <path d="M16 32c13 0 21-8 22-22-14 1-22 9-22 22Z" />
          <path d="M16 32c6-9 13-16 22-22" />
          <path d="M19 29c-7-1-12 3-13 10 8 1 14-3 17-10" />
          <path d="M19 29c-4 4-8 7-13 10" />
        </>
      ) : null}
      {name === "bowl" ? (
        <>
          <path d="M12 23h24c-1 9-5 14-12 14s-11-5-12-14Z" />
          <path d="M15 37h18" />
          <path d="M24 11c-4 4 4 5 0 9" />
          <path d="M32 12c-3 3 3 4 0 8" />
        </>
      ) : null}
      {name === "stethoscope" ? (
        <>
          <path d="M15 9v10a9 9 0 0 0 18 0V9" />
          <path d="M11 9h8" />
          <path d="M29 9h8" />
          <path d="M24 28v4a7 7 0 0 0 14 0v-3" />
          <circle cx="38" cy="27" r="3" />
        </>
      ) : null}
      {name === "people" ? (
        <>
          <circle cx="24" cy="15" r="5" />
          <circle cx="13" cy="19" r="4" />
          <circle cx="35" cy="19" r="4" />
          <path d="M15 39c1-8 4-12 9-12s8 4 9 12" />
          <path d="M5 39c1-6 4-9 8-9 2 0 4 1 5 3" />
          <path d="M43 39c-1-6-4-9-8-9-2 0-4 1-5 3" />
        </>
      ) : null}
      {name === "award" ? (
        <>
          <circle cx="24" cy="17" r="8" />
          <path d="m18 24-3 15 9-5 9 5-3-15" />
          <path d="m21 17 2 2 5-5" />
        </>
      ) : null}
      {name === "science" ? (
        <>
          <path d="M28 7v11l9 16a5 5 0 0 1-4 7H15a5 5 0 0 1-4-7l9-16V7" />
          <path d="M17 7h14" />
          <path d="M16 31h16" />
        </>
      ) : null}
      {name === "heart" ? (
        <>
          <path d="M24 39S9 30 9 18a7 7 0 0 1 13-4 7 7 0 0 1 13 4c0 12-15 21-15 21Z" />
          <path d="M10 35c5-3 8-5 11-10" />
          <path d="M38 35c-5-3-8-5-11-10" />
        </>
      ) : null}
      {name === "lotus" ? (
        <>
          <path d="M24 38c-9-7-10-17 0-30 10 13 9 23 0 30Z" />
          <path d="M23 38C13 36 7 29 7 18c11 2 17 9 16 20Z" />
          <path d="M25 38c10-2 16-9 16-20-11 2-17 9-16 20Z" />
          <path d="M24 38c-8 1-14-3-19-10 9-2 15 2 19 10Z" />
          <path d="M24 38c8 1 14-3 19-10-9-2-15 2-19 10Z" />
        </>
      ) : null}
      {name === "shield" ? (
        <>
          <path d="M24 6 38 11v12c0 10-6 17-14 20-8-3-14-10-14-20V11Z" />
          <path d="m17 24 5 5 10-11" />
        </>
      ) : null}
    </svg>
  );
}

export function DoctorsShowcaseSection() {
  return (
    <section className="home-doctors-section" aria-labelledby="home-doctors-title">
      <div className="home-doctors-leaf home-doctors-leaf-top" aria-hidden="true" />
      <div className="home-doctors-leaf home-doctors-leaf-bottom" aria-hidden="true" />

      <div className="home-doctors-hero">
        <div className="home-doctors-copy">
          <span className="home-doctors-eyebrow">
            <i aria-hidden="true">
              <LineIcon name="leaf" />
            </i>
            Our Doctors
          </span>
          <h2 id="home-doctors-title">
            Wisdom. Experience.
            <br />
            Care that <em>Heals.</em>
          </h2>
          <div className="home-doctors-divider" aria-hidden="true">
            <span />
            <i />
            <span />
          </div>
          <p>
            Our Ayurvedic experts combine ancient wisdom with modern science to deliver personalised care for your
            complete well-being.
          </p>
          <Link className="home-doctors-button" href="/doctors">
            Meet All Doctors
            <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>

        <div className="home-doctors-visual" aria-label="Ayurvedic healing">
          <div className="home-doctors-arch">
            <Image
              src="/images/doctors-ayurveda-mortar-hero.png"
              alt="Ayurvedic herbs with mortar and pestle"
              fill
              sizes="(max-width: 900px) 88vw, 34vw"
            />
          </div>
          <div className="home-doctors-seal" aria-hidden="true">
            <LineIcon name="lotus" />
            <span>Rooted in Ayurveda</span>
            <span>Focused on You</span>
          </div>
          <p className="home-doctors-script">Healing Naturally</p>
        </div>

        <aside className="home-doctors-stats" aria-label="Doctor care highlights">
          <div>
            <i aria-hidden="true">
              <LineIcon name="people" />
            </i>
            <p>
              <strong>15K+</strong>
              Happy Patients
            </p>
          </div>
          <div>
            <i aria-hidden="true">
              <LineIcon name="award" />
            </i>
            <p>
              <strong>20+</strong>
              Expert Doctors
            </p>
          </div>
          <div>
            <i aria-hidden="true">
              <LineIcon name="sprout" />
            </i>
            <p>
              <strong>25+</strong>
              Years of Trust
            </p>
          </div>
        </aside>
      </div>

      <div className="home-doctors-grid">
        {doctors.map((doctor) => (
          <article className="home-doctor-card" data-accent={doctor.accent} key={doctor.name}>
            <div className="home-doctor-card-copy">
              <i aria-hidden="true">
                <LineIcon name={doctor.icon} />
              </i>
              <span>{doctor.specialty}</span>
              <h3>{doctor.name}</h3>
              <p>{doctor.qualification}</p>
              <b aria-hidden="true" />
              <p>{doctor.summary}</p>
            </div>
            <div className="home-doctor-photo">
              <Image src={doctor.image} alt={doctor.name} fill sizes="(max-width: 760px) 48vw, 18vw" />
            </div>
            <div className="home-doctor-card-foot">
              <div>
                <i aria-hidden="true">
                  <LineIcon name="award" />
                </i>
                <span>{doctor.experience}</span>
                <span>Experience</span>
              </div>
              <Link href="/doctors" aria-label={`View ${doctor.name}`}>
                <span aria-hidden="true">&rarr;</span>
              </Link>
            </div>
          </article>
        ))}
      </div>

      <div className="home-doctors-values" aria-label="Care values">
        {values.map((value) => (
          <article key={value.title}>
            <i aria-hidden="true">
              <LineIcon name={value.icon} />
            </i>
            <div>
              <h3>{value.title}</h3>
              <p>{value.text}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
