import { doctors } from "../../data/site";
import { SectionHeader } from "../common/SectionHeader";

export function DoctorsPreviewSection() {
  return (
    <section className="section doctors-section">
      <SectionHeader eyebrow="Doctors" title="Meet the medical team" />
      <div className="doctor-grid">
        {doctors.map((doctor) => (
          <article className="doctor-card" key={doctor.name}>
            <div className="doctor-photo" />
            <h3>{doctor.name}</h3>
            <p>{doctor.role}</p>
            <span>{doctor.availability}</span>
          </article>
        ))}
      </div>
    </section>
  );
}
