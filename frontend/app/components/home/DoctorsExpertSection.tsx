import Image from "next/image";
import Link from "next/link";

const doctorCards = [
  {
    name: "Dr. Arjun Dev",
    degree: "B.A.M.S, MD (Ayurveda)",
    focus: "Expert in Herbal Medicine & Immunity",
    imagePosition: "center 28%",
    icons: ["leaf", "shield", "bowl"],
  },
  {
    name: "Dr. Meera Das",
    degree: "B.A.M.S, MD (Ayurveda)",
    focus: "Specialist in Women's Health",
    imagePosition: "center 22%",
    icons: ["doctor", "lotus", "bowl"],
  },
  {
    name: "Dr. Rahul Kumar",
    degree: "B.A.M.S, MD (Ayurveda)",
    focus: "Expert in Pain Management & Physiotherapy",
    imagePosition: "center 25%",
    icons: ["walk", "lotus", "spine"],
  },
];

const values = [
  ["lotus", "Ancient Wisdom", "Rooted in tradition, guided by science."],
  ["leaf", "Personalized Care", "Tailored treatments for every individual."],
];

const stats = [
  ["doctor", "2000+", "Happy Consultations"],
  ["lotus", "98%", "Patient Satisfaction"],
  ["bowl", "25+", "Patient Rooms"],
  ["shield", "20+", "Specialized Therapies"],
  ["hand", "10+", "Years of Trust"],
];

export function DoctorsExpertSection() {
  return (
    <section className="doctors-expert-section" aria-labelledby="doctors-expert-title">
      <div className="doctors-expert-inner">
        <div className="doctors-expert-intro">
          <span className="doctors-expert-eyebrow">
            <i aria-hidden="true" />
            Our Doctors
          </span>
          <h2 id="doctors-expert-title">
            Meet Our <em>Ayurvedic</em> Experts
          </h2>
          <span className="doctors-expert-divider" aria-hidden="true" />
          <p>
            Our team of experienced Ayurvedic doctors combines ancient wisdom with modern
            expertise to deliver personalized care and lasting wellness.
          </p>

          <div className="doctors-expert-values">
            {values.map(([icon, title, copy]) => (
              <div className="doctors-expert-value" data-icon={icon} key={title}>
                <span aria-hidden="true" />
                <div>
                  <strong>{title}</strong>
                  <p>{copy}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="doctors-expert-feature">
          <div className="doctors-expert-portrait">
            <Image
              src="/images/doctor-portrait.png"
              alt="Dr. Anjali Nair"
              fill
              sizes="(max-width: 900px) 70vw, 390px"
              priority={false}
            />
          </div>
          <div className="doctors-expert-badge">
            <strong>15+</strong>
            <span>Years of Experience</span>
            <i aria-hidden="true" />
          </div>
          <div className="doctors-expert-profile">
            <span>Chief Ayurvedic Physician</span>
            <h3>Dr. Anjali Nair</h3>
            <p>B.A.M.S, MD (Ayurveda)</p>
            <div className="doctors-expert-pill">
              <i aria-hidden="true" />
              Specialist in Panchakarma &amp; Women&apos;s Wellness
            </div>
            <p>
              Expert in holistic healing through personalized treatments that restore balance and
              promote long-term wellness.
            </p>
            <div className="doctors-expert-actions">
              <Link href="/doctors">View Profile</Link>
              <Link href="/appointment">Book Consultation</Link>
            </div>
          </div>
        </div>

        <div className="doctors-expert-list">
          {doctorCards.map((doctor) => (
            <article className="doctors-expert-card" key={doctor.name}>
              <div className="doctors-expert-card-photo">
                <Image
                  src="/images/doctor-portrait.png"
                  alt={doctor.name}
                  fill
                  sizes="(max-width: 900px) 120px, 155px"
                  style={{ objectPosition: doctor.imagePosition }}
                />
              </div>
              <div className="doctors-expert-card-copy">
                <h3>{doctor.name}</h3>
                <span>{doctor.degree}</span>
                <i aria-hidden="true" />
                <p>{doctor.focus}</p>
                <div className="doctors-expert-card-icons">
                  {doctor.icons.map((icon) => (
                    <b data-icon={icon} key={icon} aria-hidden="true" />
                  ))}
                </div>
              </div>
              <Link href="/doctors" aria-label={`View profile for ${doctor.name}`}>
                &rarr;
              </Link>
            </article>
          ))}
        </div>

        <div className="doctors-expert-still doctors-expert-still-left" aria-hidden="true">
          <Image src="/images/home-hero-reference.png" alt="" fill sizes="330px" />
        </div>

        <div className="doctors-expert-stats" aria-label="Doctor care highlights">
          {stats.map(([icon, value, label]) => (
            <div className="doctors-expert-stat" data-icon={icon} key={label}>
              <span aria-hidden="true" />
              <strong>{value}</strong>
              <p>{label}</p>
            </div>
          ))}
        </div>

        <blockquote className="doctors-expert-quote">
          <span aria-hidden="true">&ldquo;</span>
          <p>Healing is not just our profession, it is our purpose rooted in ancient wisdom.</p>
          <i aria-hidden="true" />
        </blockquote>

        <div className="doctors-expert-still doctors-expert-still-right" aria-hidden="true">
          <Image src="/images/testimonial-lamp-flowers.png" alt="" fill sizes="260px" />
        </div>
      </div>
    </section>
  );
}
