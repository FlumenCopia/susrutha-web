import Link from "next/link";
import { InternationalPatientsIcon } from "./InternationalPatientsIcon";

export function InternationalEnquiry() {
  return (
    <section className="international-enquiry" id="international-enquiry">
      <aside className="international-enquiry-intro">
        <h2>Travel Enquiry</h2>
        <p>Share your details and our international care team will assist you.</p>
        <InternationalPatientsIcon name="plane" />
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
          <input type="text" name="country" placeholder="Country" />
        </label>
        <label>
          <span>Phone / WhatsApp</span>
          <input type="tel" name="phone" placeholder="+91  Phone / WhatsApp" />
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
  );
}
