import { SiteShell } from "../components/common/SiteShell";
import { InnerPage } from "../components/inner/InnerPage";
import { basePages } from "../data/architecture";

export default function ContactUsPage() {
  return (
    <SiteShell>
      <InnerPage content={basePages.contact}>
        <section className="inner-section">
          <div className="inner-section-heading">
            <span className="eyebrow">Enquiry Form</span>
            <h2>Submit Enquiry</h2>
            <p>Production-ready structure for contact, branch routing, WhatsApp, call button, email, and Google Map placement.</p>
          </div>
          <form className="inner-form">
            <label>
              Name
              <input name="name" placeholder="Your name" />
            </label>
            <label>
              Phone
              <input name="phone" placeholder="+91" />
            </label>
            <label>
              Preferred Branch
              <select name="branch" defaultValue="">
                <option value="" disabled>Select branch</option>
                <option>Kattakada Hospital</option>
                <option>Kowdiar OP Outlet</option>
                <option>Ayurveda Village</option>
              </select>
            </label>
            <label>
              Enquiry Type
              <select name="type" defaultValue="">
                <option value="" disabled>Select enquiry</option>
                <option>Appointment</option>
                <option>Treatment</option>
                <option>Facilities</option>
                <option>General</option>
              </select>
            </label>
            <label className="full">
              Message
              <textarea name="message" placeholder="How can we help?" />
            </label>
            <button className="btn btn-primary" type="button">Submit Enquiry</button>
          </form>
        </section>
      </InnerPage>
    </SiteShell>
  );
}
