import { InternationalPatientsIcon, type InternationalPatientsIconName } from "./InternationalPatientsIcon";
import { InternationalProgramCard } from "./InternationalProgramCard";

const internationalPrograms: Array<{ title: string; text: string; image: string; icon: InternationalPatientsIconName }> = [
  {
    title: "14-Day Panchakarma Rejuvenation",
    text: "Comprehensive body detox, herbal oil therapies, and daily Vaidya monitoring.",
    image: "/images/treatment-panchakarma.webp",
    icon: "lotus",
  },
  {
    title: "Spine & Joint Rehabilitation",
    text: "Targeted Kati Vasthi and herbal fomentation for chronic back and joint pain.",
    image: "/images/ayurveda-village-room.webp",
    icon: "leaf",
  },
];

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
