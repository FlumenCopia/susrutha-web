import Image from "next/image";
import Link from "next/link";
import {
  internationalFacilities,
  internationalFaqs,
  internationalPrograms,
  internationalStats,
  internationalSupportItems,
} from "./internationalPatientsData";
import { InternationalPatientsIcon } from "./InternationalPatientsIcon";
import { InternationalStatCard } from "./InternationalStatCard";

export function InternationalPatientsPage() {
  return (
    <div className="international-page">
      <section className="conditions-hero-serene" aria-labelledby="international-patients-title">
        <div
          className="conditions-hero-serene-bg"
          style={{ backgroundImage: `url('/images/ayurveda-village-path.webp')` }}
        />
        <div className="conditions-hero-serene-overlay" />

        <div className="conditions-hero-serene-content">
          <nav className="conditions-hero-serene-nav" aria-label="Breadcrumb">
            <Link href="/">HOME</Link>
            <span>/</span>
            <span>INTERNATIONAL PATIENTS</span>
          </nav>

          <div className="conditions-hero-serene-middle-wrapper">
            <div className="conditions-hero-serene-middle">
              <p className="conditions-hero-serene-quote">
                At Susrutha Ayurveda Gramam, we welcome patients from around the world to experience authentic Kerala
                Ayurveda with personalized care, modern facilities, and a tranquil healing environment.
              </p>
            </div>

            <div className="conditions-hero-serene-right-stats" aria-label="International patient statistics">
              {internationalStats.map((item) => (
                <div className="conditions-hero-stat-card" key={item.label}>
                  <InternationalPatientsIcon name={item.icon} />
                  <div className="conditions-hero-stat-info">
                    <strong>{item.value}</strong>
                    <span>{item.label}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="conditions-hero-serene-bottom">
            <h1 id="international-patients-title" className="conditions-hero-serene-title">
              INTERNATIONAL PATIENTS
            </h1>
          </div>
        </div>
      </section>





























      <section className="international-facilities" aria-labelledby="international-facilities-title">
        <div className="international-strip-head">
          <h2 id="international-facilities-title">Facilities that support classical care</h2>
        </div>

        <div className="international-facility-grid">
          {internationalFacilities.map((facility) => {
            const isPopular = "popular" in facility && facility.popular;

            return (
              <article className="international-facility-card" data-popular={isPopular ? "true" : undefined} key={facility.title}>
                <h3>{facility.title}</h3>
                {isPopular ? <b>Popular</b> : null}
                <p>{facility.text}</p>
                <div className="international-facility-image">
                  <Image src={facility.image} alt={facility.title} fill sizes="(max-width: 760px) 100vw, 16vw" />
                </div>
                <Link href="/facilities">
                  Explore
                  <InternationalPatientsIcon name="arrow" />
                </Link>
              </article>
            );
          })}
        </div>
      </section>

      <section className="international-programs-banner">
        <Image
          src="/images/banner_calm_retreat.jpg"
          alt="Peaceful Kerala Ayurveda retreat environment"
          fill
          priority
          sizes="100vw"
          className="international-programs-bg"
        />
        <div className="international-programs-overlay" />

        <div className="international-programs-content">
          <div className="international-programs-intro">
            {/* <span className="international-eyebrow">Programs Designed For You</span> */}
            <h2>Programs often chosen by travellers</h2>
            <Link href="/packages">
              View all programs
              <InternationalPatientsIcon name="arrow" />
            </Link>
          </div>

          <div className="international-program-grid">
            {internationalPrograms.map((program) => (
              <article className="international-program-card" key={program.title}>
                <div className="international-program-image">
                  <Image src={program.image} alt={program.title} fill sizes="(max-width: 760px) 100vw, 25vw" />
                </div>
                <h3>{program.title}</h3>
                <p>{program.text}</p>
                <Link href="/packages" aria-label={`Explore ${program.title}`}>
                  <span>Explore Program</span>
                  <InternationalPatientsIcon name="arrow" />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="international-info-grid">
        <article className="international-faq-card">
          <span className="international-eyebrow">Frequently Asked Questions</span>
          <div className="international-faq-list">
            {internationalFaqs.map((question) => (
              <details key={question}>
                <summary>
                  {question}
                  <span aria-hidden="true">+</span>
                </summary>
                <p>Our international care team will guide you with clear details based on your treatment plan.</p>
              </details>
            ))}
          </div>
          <Link href="/faq">
            View All FAQs
            <InternationalPatientsIcon name="arrow" />
          </Link>
        </article>

        <article className="international-world-card">
          <span className="international-eyebrow">Trusted By Patients Worldwide</span>
          <h2>We welcome you</h2>
          <p>Patients from around the world trust Susrutha Gramam for safe, effective and compassionate care.</p>
          <div className="international-map" aria-hidden="true">
            <InternationalPatientsIcon name="plane" />
          </div>
          <div className="international-world-stats">
            {internationalStats.map((item) => (
              <InternationalStatCard icon={item.icon} value={item.value} label={item.label} key={item.label} />
            ))}
          </div>
        </article>

        {/* <aside className="international-travel-card">
          <h2>Travel Enquiry</h2>
          <p>Share your details and our international care team will assist you.</p>
          <div aria-hidden="true">
            <InternationalPatientsIcon name="kerala" />
          </div>
        </aside> */}
      </section>

      <section className="international-enquiry" id="international-enquiry">
        <aside className="international-support-list">
          {internationalSupportItems.map((item) => (
            <article key={item.title}>
              <InternationalPatientsIcon name={item.icon} />
              <h3>{item.title}</h3>
            </article>
          ))}
        </aside>

        <form className="international-enquiry-form">
          <label>
            <span>Full Name</span>
            <input type="text" name="name" placeholder="Full Name" />
          </label>
          <label>
            <span>Email Address</span>
            <input type="email" name="email" placeholder="Email Address" />
          </label>
          <label>
            <span>Country</span>
            <select name="country" defaultValue="">
              <option value="" disabled>
                Country
              </option>
              <option>India</option>
              <option>United Arab Emirates</option>
              <option>United States</option>
              <option>United Kingdom</option>
              <option>Singapore</option>
            </select>
          </label>
          <label>
            <span>Phone / WhatsApp</span>
            <input type="tel" name="phone" placeholder="+91    Phone / WhatsApp" />
          </label>
          <label>
            <span>Preferred Date Of Arrival</span>
            <input type="text" name="arrival" placeholder="Preferred Date Of Arrival" />
          </label>
          <label className="international-form-wide">
            <span>Your Requirements</span>
            <textarea name="requirements" placeholder="Your Requirements" />
          </label>
          <button type="button">
            Submit Enquiry
            <InternationalPatientsIcon name="plane" />
          </button>
        </form>

        <aside className="international-help-card">
          <h2>Need help planning your journey?</h2>
          <p>Our team is here to guide you at every step of the way.</p>
          <ul>
            <li>
              <InternationalPatientsIcon name="phone" />
              +91 98460 56736
            </li>
            <li>
              <InternationalPatientsIcon name="mail" />
              international@susruthaayurveda.com
            </li>
            <li>
              <InternationalPatientsIcon name="chat" />
              WhatsApp Support Available
            </li>
          </ul>
          <Link href="tel:+919846056736">
            Call Us Now
            <InternationalPatientsIcon name="phone" />
          </Link>
        </aside>
      </section>
    </div>
  );
}
