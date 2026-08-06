import { internationalPrograms } from "./internationalPatientsData";
import { InternationalPatientsIcon } from "./InternationalPatientsIcon";
import { InternationalProgramCard } from "./InternationalProgramCard";

export function InternationalPrograms() {
  return (
    <section className="international-programs">
      <div className="international-programs-top">
        <div className="international-section-head">
          <span className="international-eyebrow">Programs Designed For You</span>
          <h2>
            Programs often chosen by <em>travellers</em>
          </h2>
        </div>
        <div className="international-program-controls">
          <button type="button" aria-label="Previous program" disabled>
            <InternationalPatientsIcon name="arrow" />
          </button>
          <button type="button" aria-label="Next program" disabled>
            <InternationalPatientsIcon name="arrow" />
          </button>
        </div>
      </div>

      <div className="international-program-grid">
        {internationalPrograms.map((program) => (
          <InternationalProgramCard program={program} key={program.title} />
        ))}
      </div>
    </section>
  );
}
