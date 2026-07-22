import { SectionHeader } from "../common/SectionHeader";

const facilities = ["Treatment rooms", "Inpatient rooms", "Operation theater", "Physiotherapy", "Yoga hall"];

export function FacilitiesProcessSection() {
  return (
    <section className="section split-section">
      <div>
        <SectionHeader
          eyebrow="Facilities"
          title="Hospital comfort with a calm, natural treatment environment"
        />
        <div className="facility-list">
          {facilities.map((facility) => (
            <span key={facility}>{facility}</span>
          ))}
        </div>
      </div>
      <div className="process-panel">
        <h3>Treatment Process</h3>
        <ol>
          <li>Consultation and case history</li>
          <li>Diagnosis and personalized care plan</li>
          <li>Therapies, medicines, diet, and lifestyle guidance</li>
          <li>Follow-up and long-term wellness support</li>
        </ol>
      </div>
    </section>
  );
}
