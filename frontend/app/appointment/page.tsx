import { SiteShell } from "../components/common/SiteShell";
import { InnerPage } from "../components/inner/InnerPage";
import { basePages, doctorsDirectory, treatments } from "../data/architecture";

export default function AppointmentPage() {
  return (
    <SiteShell>
      <InnerPage content={basePages.appointment}>
        <section className="inner-section">
          <div className="inner-section-heading">
            <span className="eyebrow">Booking Form</span>
            <h2>Appointment Request</h2>
            <p>Form structure for production booking with doctor selection, department selection, date picker, time slot, and confirmation.</p>
          </div>
          <form className="inner-form">
            <label>
              Full Name
              <input name="name" placeholder="Patient name" />
            </label>
            <label>
              Phone Number
              <input name="phone" placeholder="+91" />
            </label>
            <label>
              Department
              <select name="department" defaultValue="">
                <option value="" disabled>Select department</option>
                {treatments.slice(0, 7).map((item) => (
                  <option value={item.slug} key={item.slug}>{item.title}</option>
                ))}
              </select>
            </label>
            <label>
              Doctor
              <select name="doctor" defaultValue="">
                <option value="" disabled>Select doctor</option>
                {doctorsDirectory.map((item) => (
                  <option value={item.slug} key={item.slug}>{item.title}</option>
                ))}
              </select>
            </label>
            <label>
              Preferred Date
              <input name="date" type="date" />
            </label>
            <label>
              Time Slot
              <select name="slot" defaultValue="">
                <option value="" disabled>Select time slot</option>
                <option>Morning</option>
                <option>Afternoon</option>
                <option>Evening</option>
              </select>
            </label>
            <label className="full">
              Concern
              <textarea name="concern" placeholder="Briefly describe the concern" />
            </label>
            <button className="btn btn-primary" type="button">Submit Request</button>
          </form>
        </section>
      </InnerPage>
    </SiteShell>
  );
}
