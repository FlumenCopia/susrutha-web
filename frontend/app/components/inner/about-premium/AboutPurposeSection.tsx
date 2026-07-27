import Image from "next/image";

const values = [
  {
    title: "Compassion",
    copy: "We care with empathy and understanding.",
    icon: "heart",
  },
  {
    title: "Integrity",
    copy: "Honest practices you can trust.",
    icon: "shield",
  },
  {
    title: "Excellence",
    copy: "Committed to the highest standard of care.",
    icon: "award",
  },
  {
    title: "Sustainability",
    copy: "Healing today for a healthier tomorrow.",
    icon: "leaf",
  },
  {
    title: "Holistic Approach",
    copy: "Mind, body and spirit in perfect balance.",
    icon: "lotus",
  },
];

type PurposeIconName = "award" | "eye" | "heart" | "leaf" | "lotus" | "shield" | "target";

function PurposeIcon({ name }: { name: PurposeIconName }) {
  const common = {
    fill: "none",
    stroke: "currentColor",
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    strokeWidth: 1.7,
  };

  return (
    <svg viewBox="0 0 48 48" aria-hidden="true">
      {name === "eye" ? (
        <>
          <path {...common} d="M7 24s6-11 17-11 17 11 17 11-6 11-17 11S7 24 7 24Z" />
          <circle {...common} cx="24" cy="24" r="5" />
          <path {...common} d="M24 8v5M12 13l4 4M36 13l-4 4M10 31l-4 4M38 31l4 4" />
        </>
      ) : null}

      {name === "target" ? (
        <>
          <circle {...common} cx="22" cy="26" r="13" />
          <circle {...common} cx="22" cy="26" r="7" />
          <path {...common} d="M22 26 38 10M32 10h6v6M37 11l4-4M38 16l4 4" />
        </>
      ) : null}

      {name === "heart" ? (
        <>
          <path {...common} d="M24 17c4-7 15-5 15 4 0 8-9 14-15 18C18 35 9 29 9 21c0-9 11-11 15-4Z" />
          <path {...common} d="M12 34c-3 2-5 4-6 8M36 34c3 2 5 4 6 8M16 42h16" />
        </>
      ) : null}

      {name === "shield" ? (
        <>
          <path {...common} d="M24 6 38 12v11c0 9-6 16-14 19-8-3-14-10-14-19V12l14-6Z" />
          <path {...common} d="m17 24 5 5 10-11" />
        </>
      ) : null}

      {name === "award" ? (
        <>
          <path {...common} d="M24 8 28 17l10 1-7 7 2 10-9-5-9 5 2-10-7-7 10-1 4-9Z" />
          <path {...common} d="M17 33 14 43l10-5 10 5-3-10" />
        </>
      ) : null}

      {name === "leaf" ? (
        <>
          <path {...common} d="M25 39V18" />
          <path {...common} d="M25 27C16 27 10 21 9 12c9 0 16 6 16 15ZM25 31c8 0 14-5 15-13-8 0-15 5-15 13Z" />
          <path {...common} d="M16 21c3 1 6 3 9 6M34 23c-3 1-6 4-9 8" />
        </>
      ) : null}

      {name === "lotus" ? (
        <>
          <path {...common} d="M24 38c-8-6-8-16 0-28 8 12 8 22 0 28Z" />
          <path {...common} d="M24 36c-9 1-16-5-17-16 9 0 15 5 17 16ZM24 36c9 1 16-5 17-16-9 0-15 5-17 16Z" />
          <path {...common} d="M13 39h22" />
        </>
      ) : null}
    </svg>
  );
}

export function AboutPurposeSection() {
  return (
    <section className="about-purpose-section">
      <div className="about-purpose-copy">
        <div className="purpose-eyebrow">
          <span>Our Purpose</span>
          <i aria-hidden="true" />
          <PurposeIcon name="lotus" />
        </div>
        <h2>
          Our Vision.
          <br />
          Our Mission.
          <br />
          <em>Our Commitment.</em>
        </h2>
        <div className="purpose-divider" aria-hidden="true">
          <span />
          <PurposeIcon name="lotus" />
          <span />
        </div>
        <p>
          Guided by ancient wisdom and driven by compassion, our vision and mission inspire everything we do for your
          well-being and a better tomorrow.
        </p>
        <div className="purpose-still-life">
          <Image
            src="/images/about-purpose-still-life.png"
            alt="Ayurvedic mortar and herbs"
            width={760}
            height={430}
            sizes="(max-width: 900px) 100vw, 42vw"
          />
        </div>
      </div>

      <div className="purpose-card-stack">
        <article className="purpose-card purpose-card-vision">
          <div className="purpose-badge">
            <PurposeIcon name="eye" />
          </div>
          <div className="purpose-card-content">
            <span>Our Vision</span>
            <h3>
              Healing Lives,
              <br />
              <em>Naturally.</em>
            </h3>
            <div className="purpose-mini-divider" aria-hidden="true">
              <i />
              <PurposeIcon name="lotus" />
              <i />
            </div>
            <p>To be a global leader in Ayurvedic care, recognized for restoring health, harmony and happiness naturally.</p>
          </div>
          <Image
            src="/images/about-purpose-vision-plant.png"
            alt=""
            width={520}
            height={360}
            sizes="(max-width: 900px) 48vw, 25vw"
            aria-hidden="true"
          />
        </article>

        <article className="purpose-card purpose-card-mission">
          <div className="purpose-badge purpose-badge-gold">
            <PurposeIcon name="target" />
          </div>
          <div className="purpose-card-content">
            <span>Our Mission</span>
            <h3>
              Care. Cure.
              <br />
              <em>Conscious Living.</em>
            </h3>
            <div className="purpose-mini-divider" aria-hidden="true">
              <i />
              <PurposeIcon name="lotus" />
              <i />
            </div>
            <p>
              To deliver authentic Ayurvedic treatments with compassion, innovation and excellence while empowering
              conscious, balanced living.
            </p>
          </div>
          <Image
            src="/images/about-purpose-mission-bowl.png"
            alt=""
            width={430}
            height={430}
            sizes="(max-width: 900px) 44vw, 22vw"
            aria-hidden="true"
          />
        </article>
      </div>

      <div className="purpose-values">
        <div className="purpose-values-heading">
          <span>Values That Guide Us</span>
          <i />
          <PurposeIcon name="lotus" />
        </div>
        {values.map((item) => (
          <article className="purpose-value" key={item.title}>
            <div>
              <PurposeIcon name={item.icon as PurposeIconName} />
            </div>
            <h3>{item.title}</h3>
            <p>{item.copy}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
