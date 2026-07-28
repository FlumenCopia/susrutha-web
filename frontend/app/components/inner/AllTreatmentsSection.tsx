import Image from "next/image";
import Link from "next/link";

const allTreatments = [
  {
    slug: "panchakarma",
    title: "Panchakarma",
    text: "The ultimate detox therapy to cleanse toxins and restore balance.",
    time: "7 - 21 Days",
    image: "/images/treatment-panchakarma.png",
    icon: "lotus",
  },
  {
    slug: "abhyangam",
    title: "Abhyangam",
    text: "Therapeutic full-body oil massage for relaxation and nourishment.",
    time: "60 - 90 Mins",
    image: "/images/treatment-sirodhara.png",
    icon: "steam",
  },
  {
    slug: "shirodhara",
    title: "Shirodhara",
    text: "Gentle oil therapy for the mind to relieve stress and anxiety.",
    time: "30 - 45 Mins",
    image: "/images/treatment-sirodhara.png",
    icon: "body",
  },
  {
    slug: "swedana",
    title: "Swedana",
    text: "Herbal steam therapy to detoxify and improve circulation.",
    time: "20 - 30 Mins",
    image: "/images/faq-ayurveda-still-life.png",
    icon: "lotus",
  },
  {
    slug: "nasya",
    title: "Nasya",
    text: "Nasal therapy to clear sinuses and improve head & neck health.",
    time: "20 - 30 Mins",
    image: "/images/treatment-herbal-medicine.png",
    icon: "leaf",
  },
  {
    slug: "pizhichil",
    title: "Pizhichil",
    text: "Warm herbal oil bath therapy to relieve pain and rejuvenate.",
    time: "60 - 90 Mins",
    image: "/images/treatment-sirodhara.png",
    icon: "leaf",
  },
  {
    slug: "udvarthanam",
    title: "Udvarthanam",
    text: "Herbal powder therapy to reduce fatigue and improve metabolism.",
    time: "45 - 60 Mins",
    image: "/images/treatment-njavarakizhi.png",
    icon: "steam",
  },
  {
    slug: "basti",
    title: "Basti",
    text: "Medicated enema therapy to balance Vata and cleanse the colon.",
    time: "30 - 45 Mins",
    image: "/images/faq-ayurveda-still-life.png",
    icon: "leaf",
  },
  {
    slug: "kati-basti",
    title: "Kati Basti",
    text: "Warm oil therapy for lower back pain and stiffness relief.",
    time: "30 - 45 Mins",
    image: "/images/treatment-kati-vasti.png",
    icon: "woman",
  },
  {
    slug: "garshanam",
    title: "Garshanam",
    text: "Silk glove massage to improve lymphatic flow and skin health.",
    time: "30 - 45 Mins",
    image: "/images/treatment-kati-vasti.png",
    icon: "motion",
  },
];

export function AllTreatmentsSection() {
  return (
    <section className="all-treatments-section" aria-labelledby="all-treatments-title">
      <div className="all-treatments-head">
        <h2 id="all-treatments-title">All Treatments</h2>
        <p>
          Explore our complete range of Ayurvedic therapies designed for
          detoxification, rejuvenation, and total well-being.
        </p>
        <label className="all-treatments-sort">
          <span>View by</span>
          <select aria-label="Sort treatments">
            <option>Popularity</option>
            <option>Duration</option>
            <option>Name</option>
          </select>
        </label>
      </div>

      <div className="all-treatments-grid">
        {allTreatments.map((treatment) => (
          <Link
            className="all-treatment-card"
            href={`/treatments/${treatment.slug}`}
            aria-label={`View ${treatment.title} treatment details`}
            key={treatment.title}
          >
            <div className="all-treatment-image">
              <Image
                src={treatment.image}
                alt={treatment.title}
                fill
                sizes="(max-width: 640px) 92vw, (max-width: 1100px) 44vw, 20vw"
              />
              <span className="all-treatment-icon" data-icon={treatment.icon} aria-hidden="true" />
            </div>
            <div className="all-treatment-body">
              <h3>{treatment.title}</h3>
              <span className="all-treatment-rule" aria-hidden="true" />
              <p>{treatment.text}</p>
              <div className="all-treatment-time">
                <span aria-hidden="true" />
                {treatment.time}
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="treatment-journey-banner">
        <div className="journey-banner-copy">
          <span>Ready to Begin?</span>
          <h2>
            Begin Your Journey
            <br />
            to <em>Natural Healing</em>
          </h2>
          <p>
            Consult our expert doctors and get a personalized treatment plan
            tailored to your unique needs.
          </p>
        </div>
        <div className="journey-banner-features">
          <div>
            <i data-icon="lotus" aria-hidden="true" />
            <strong>Expert Guidance</strong>
            <span>from Experienced Doctors</span>
          </div>
          <div>
            <i data-icon="dots" aria-hidden="true" />
            <strong>Personalised Plans</strong>
            <span>Tailored to Your Needs</span>
          </div>
          <div>
            <i data-icon="lotus" aria-hidden="true" />
            <strong>Holistic Healing</strong>
            <span>for Body, Mind & Soul</span>
          </div>
        </div>
        <Link className="journey-banner-button" href="/appointment">
          Book Your Consultation
          <span aria-hidden="true">&rarr;</span>
        </Link>
        <div className="journey-banner-still" aria-hidden="true">
          <Image src="/images/faq-ayurveda-still-life.png" alt="" fill sizes="(max-width: 900px) 100vw, 360px" />
        </div>
      </div>
    </section>
  );
}
