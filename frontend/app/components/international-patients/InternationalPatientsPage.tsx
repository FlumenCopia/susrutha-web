import Image from "next/image";
import Link from "next/link";
import {
  internationalFacilities,
  internationalFaqs,
  internationalHeroFeatures,
  internationalPrograms,
  internationalStats,
  internationalSupportItems,
} from "./internationalPatientsData";
import { InternationalPatientsIcon } from "./InternationalPatientsIcon";
import { InternationalStatCard } from "./InternationalStatCard";

export function InternationalPatientsPage() {
  return (
    <div className="international-page">

      
      <section className="international-hero">
        <div className="international-leaf-trace" aria-hidden="true" />
        <div className="international-flight-line" aria-hidden="true">
          <InternationalPatientsIcon name="plane" />
        </div>

        <div className="international-hero-copy">
          <span className="international-eyebrow">International Patients</span>
          <h1>
            Rooted in <em>Ayurveda.</em>
            <br />
            Trusted by <em>the world.</em>
          </h1>
          <p>
            At Susrutha Ayurveda Gramam, we welcome patients from around the world to experience authentic Kerala
            Ayurveda with personalized care, modern facilities and a healing environment.
          </p>

          <div className="international-hero-features">
            {internationalHeroFeatures.map((item) => (
              <article key={item.title}>
                <span>
                  <InternationalPatientsIcon name={item.icon} />
                </span>
                <h2>{item.title}</h2>
              </article>
            ))}
          </div>

          <Link className="international-button" href="#international-enquiry">
            Enquire for your journey
            <span>
              <InternationalPatientsIcon name="plane" />
            </span>
          </Link>
        </div>

        <div className="international-hero-visual">
          <Image
            src="/images/ayurveda-village-path.webp"
            alt="Traditional Kerala Ayurveda Gramam cottages in a peaceful garden"
            fill
            priority
            sizes="(max-width: 900px) 100vw, 58vw"
          />
          <div className="international-stat-stack" aria-label="International patient statistics">
            {internationalStats.map((item) => (
              <InternationalStatCard icon={item.icon} value={item.value} label={item.label} key={item.label} />
            ))}
          </div>
        </div>
      </section>





























      <section className="international-facilities" aria-labelledby="international-facilities-title">
        <div className="international-strip-head">
          <button type="button" aria-label="Previous facility">
            <InternationalPatientsIcon name="arrow" />
          </button>
          <div>
            <span />
            <h2 id="international-facilities-title">Facilities that support classical care</h2>
            <span />
          </div>
          <button type="button" aria-label="Next facility">
            <InternationalPatientsIcon name="arrow" />
          </button>
        </div>

        <div className="international-facility-grid">
          {internationalFacilities.map((facility) => {
            const isPopular = "popular" in facility && facility.popular;

            return (
              <article className="international-facility-card" data-popular={isPopular ? "true" : undefined} key={facility.title}>
                <span className="international-card-icon">
                  <InternationalPatientsIcon name={facility.icon} />
                </span>
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

      <section className="international-programs">
        <div className="international-programs-intro">
          <span className="international-eyebrow">Programs Designed For You</span>
          <h2>Programs often chosen by travellers</h2>
          <Link href="/packages">
            View all programs
            <InternationalPatientsIcon name="arrow" />
          </Link>
        </div>

        <div className="international-program-grid">
          {internationalPrograms.map((program) => (
            <article className="international-program-card" key={program.title}>
              <span className="international-card-icon">
                <InternationalPatientsIcon name={program.icon} />
              </span>
              <h3>{program.title}</h3>
              <p>{program.text}</p>
              <Image src={program.image} alt="" width={220} height={120} />
              <Link href="/packages" aria-label={`Explore ${program.title}`}>
                <InternationalPatientsIcon name="arrow" />
              </Link>
            </article>
          ))}
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

        <aside className="international-travel-card">
          <h2>Travel Enquiry</h2>
          <p>Share your details and our international care team will assist you.</p>
          <div aria-hidden="true">
            <InternationalPatientsIcon name="kerala" />
          </div>
        </aside>
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
