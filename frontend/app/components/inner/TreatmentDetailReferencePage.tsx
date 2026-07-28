import Image from "next/image";
import Link from "next/link";

type TreatmentDetailReferencePageProps = {
  treatment: {
    slug: string;
    title: string;
    meta: string;
    text: string;
    image?: string;
  };
};

const benefitCards = [
  {
    title: "Detoxifies Body",
    text: "Eliminates toxins and impurities.",
    image: "/images/treatment-herbal-medicine.png",
    icon: "lotus",
  },
  {
    title: "Balances Doshas",
    text: "Restores harmony of Vata, Pitta and Kapha.",
    image: "/images/treatment-sirodhara.png",
    icon: "body",
  },
  {
    title: "Improves Immunity",
    text: "Strengthens natural defenses.",
    image: "/images/faq-ayurveda-still-life.png",
    icon: "leaf",
  },
  {
    title: "Enhances Vitality",
    text: "Rejuvenates tissues and boosts energy.",
    image: "/images/treatment-panchakarma.png",
    icon: "woman",
  },
];

const idealForItems = [
  ["Chronic fatigue", "and low energy", "lotus"],
  ["Stress, anxiety", "and burnout", "people"],
  ["Digestive issues", "and bloating", "stomach"],
  ["Skin problems", "and allergies", "shield"],
  ["Lifestyle disorders", "and imbalances.", "people"],
];

const journeySteps = [
  ["Purva Karma", "Preparation phase to loosen toxins.", "steam"],
  ["Pradhana Karma", "Main detox therapies as per your plan.", "pot"],
  ["Paschat Karma", "Post detox procedures to eliminate toxins.", "steam"],
  ["Rasayana", "Rejuvenation therapies to restore strength.", "lotus"],
  ["Pathya Apathya", "Guidelines for diet and lifestyle after treatment.", "list"],
];

const expectItems = [
  "Personalised therapy plan by expert doctors",
  "Natural therapies in a serene environment",
  "Balanced diet and lifestyle guidance",
  "Complete mind-body rejuvenation",
];

const includeItems = [
  "Expert consultation & health assessment",
  "All therapies, medicines & herbal products",
  "Sattvic meals & detox diet plan",
  "Daily yoga & meditation sessions",
  "Continuous care & progress tracking",
];

function slugLabel(slug: string) {
  return slug
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

export function TreatmentDetailReferencePage({ treatment }: TreatmentDetailReferencePageProps) {
  const subtitle = treatment.slug === "panchakarma" ? "The Ultimate Detox" : treatment.meta;
  const duration = treatment.slug === "panchakarma" ? "7 - 21 Days" : treatment.meta;
  const bannerImage = treatment.image ?? "/images/treatment-panchakarma.png";

  return (
    <div className="treatment-detail-reference">
      <section className="treatment-detail-hero" aria-labelledby="treatment-detail-title">
        <div className="treatment-detail-copy">
          <nav className="treatment-detail-breadcrumb" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span aria-hidden="true">&rsaquo;</span>
            <Link href="/treatments">Treatments</Link>
            <span aria-hidden="true">&rsaquo;</span>
            <span>{treatment.title || slugLabel(treatment.slug)}</span>
          </nav>

          <div className="treatment-detail-eyebrow">
            <i aria-hidden="true" />
            <span>Signature Treatment</span>
          </div>

          <h1 id="treatment-detail-title">{treatment.title}</h1>
          <strong>{subtitle}</strong>
          <p>{treatment.text}</p>

          <div className="treatment-detail-facts" aria-label="Treatment facts">
            <div>
              <i data-icon="clock" aria-hidden="true" />
              <span>Duration</span>
              <b>{duration}</b>
            </div>
            <div>
              <i data-icon="body" aria-hidden="true" />
              <span>Personalised</span>
              <b>For Your Body Type</b>
            </div>
            <div>
              <i data-icon="lotus" aria-hidden="true" />
              <span>100% Natural</span>
              <b>Ayurvedic Healing</b>
            </div>
          </div>

          <div className="treatment-detail-actions">
            <Link className="treatment-detail-primary" href="/appointment">
              Book Consultation
              <span aria-hidden="true">&rarr;</span>
            </Link>
            <Link className="treatment-detail-secondary" href="/contact-us">
              Enquire Now
              <span aria-hidden="true" />
            </Link>
          </div>
        </div>

        <div className="treatment-detail-visual" aria-hidden="true">
          <Image src={bannerImage} alt="" fill priority sizes="(max-width: 900px) 100vw, 58vw" />
          <div className="treatment-detail-floating-card">
            <i />
            <b>Rooted in Ayurveda</b>
            <span>Ancient wisdom, modern care.</span>
          </div>
        </div>
      </section>

      <nav className="treatment-detail-tabs" aria-label="Treatment detail sections">
        {["Overview", "Benefits", "Who Is It For?", "Treatment Process", "What to Expect", "FAQs"].map((item, index) => (
          <a href={`#${item.toLowerCase().replaceAll(" ", "-").replaceAll("?", "")}`} data-active={index === 0 ? "true" : undefined} key={item}>
            <i data-icon={index === 3 ? "dots" : index === 5 ? "question" : "lotus"} aria-hidden="true" />
            {item}
          </a>
        ))}
      </nav>

      <section className="treatment-detail-overview" id="overview">
        <div className="treatment-detail-section-title">
          <span><i aria-hidden="true" /> Overview</span>
          <h2>
            Deep Detox.
            <br />
            Complete Renewal.
          </h2>
          <b aria-hidden="true" />
          <p>
            {treatment.title} is a time-honored Ayurvedic therapy designed to purify
            the body at a deep cellular level. It helps eliminate ama (toxins),
            restore balance, strengthen digestion and promote long-term wellness.
          </p>
          <blockquote>
            <p>When toxins are eliminated, vitality is restored and true healing begins.</p>
            <cite>- Ayurvedic Wisdom</cite>
          </blockquote>
        </div>

        <div className="treatment-benefit-grid" id="benefits">
          {benefitCards.map((card) => (
            <article className="treatment-benefit-card" key={card.title}>
              <div>
                <Image src={card.image} alt="" fill sizes="(max-width: 900px) 44vw, 260px" />
              </div>
              <i data-icon={card.icon} aria-hidden="true" />
              <h3>{card.title}</h3>
              <p>{card.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="treatment-ideal-panel" id="who-is-it-for">
        <div className="treatment-ideal-image" aria-hidden="true">
          <Image src="/images/ayurveda-hero.png" alt="" fill sizes="(max-width: 900px) 100vw, 520px" />
        </div>
        <div className="treatment-ideal-content">
          <span>Who Is It For?</span>
          <h2>Ideal for people experiencing</h2>
          <b aria-hidden="true" />
          <div className="treatment-ideal-grid">
            {idealForItems.map(([lineOne, lineTwo, icon]) => (
              <div key={`${lineOne}-${lineTwo}`}>
                <i data-icon={icon} aria-hidden="true" />
                <p>
                  {lineOne}
                  <br />
                  {lineTwo}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="treatment-process-section" id="treatment-process">
        <div className="treatment-detail-section-title treatment-process-title">
          <span><i aria-hidden="true" /> Treatment Process</span>
          <h2>A Holistic 5 Step Journey</h2>
        </div>
        <div className="treatment-process-track">
          {journeySteps.map(([title, text, icon], index) => (
            <article className="treatment-process-step" key={title}>
              <div>
                <i data-icon={icon} aria-hidden="true" />
                <span>{String(index + 1).padStart(2, "0")}</span>
              </div>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="treatment-expect-panel" id="what-to-expect">
        <div className="treatment-expect-dark">
          <span>What To Expect</span>
          <h2>
            A Transformative
            <br />
            Healing Experience
          </h2>
          <ul>
            {expectItems.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
        <div>
          <span>Includes</span>
          <ul>
            {includeItems.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
        <div className="treatment-expect-image" aria-hidden="true">
          <Image src="/images/faq-ayurveda-still-life.png" alt="" fill sizes="(max-width: 900px) 100vw, 360px" />
        </div>
      </section>

      <section className="treatment-detail-cta">
        <div>
          <h2>Ready to begin your healing journey?</h2>
          <p>Consult our experts and get a personalised {treatment.title} plan tailored for you.</p>
        </div>
        <Link href="/appointment">
          Book Your Consultation
          <span aria-hidden="true">&rarr;</span>
        </Link>
        <div aria-hidden="true">
          <Image src="/images/faq-ayurveda-still-life.png" alt="" fill sizes="(max-width: 900px) 100vw, 320px" />
        </div>
      </section>
    </div>
  );
}
