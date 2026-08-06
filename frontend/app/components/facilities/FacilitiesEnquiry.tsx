import Link from "next/link";
import { facilityEnquirySupport } from "./facilitiesData";
import { FacilitiesIcon } from "./FacilitiesIcon";

export function FacilitiesEnquiry() {
  return (
    <section className="facilities-enquiry">
      <aside className="facilities-support-list">
        {facilityEnquirySupport.map((item) => (
          <article key={item.title}>
            <FacilitiesIcon name={item.icon} />
            <h3>{item.title}</h3>
          </article>
        ))}
      </aside>

      <form className="facilities-form">
        <label>
          <span>Full Name</span>
          <input placeholder="Full Name" type="text" />
        </label>
        <label>
          <span>Email Address</span>
          <input placeholder="Email Address" type="email" />
        </label>
        <label>
          <span>Preferred Facility</span>
          <input placeholder="Preferred Facility" type="text" />
        </label>
        <label>
          <span>Phone / WhatsApp</span>
          <input placeholder="Phone / WhatsApp" type="tel" />
        </label>
        <label className="facilities-form-wide">
          <span>Your Requirements</span>
          <textarea placeholder="Your Requirements" />
        </label>
        <button type="button">
          Submit Enquiry
          <FacilitiesIcon name="arrow" />
        </button>
      </form>

      <aside className="facilities-help-card">
        <h2>Need help planning your stay?</h2>
        <p>The team can help with room availability, treatment duration, and branch options.</p>
        <Link href="/contact-us">
          Contact Us
          <FacilitiesIcon name="phone" />
        </Link>
      </aside>
    </section>
  );
}
