const approachSteps = [
  {
    number: "01",
    title: "Detailed musculoskeletal and lifestyle assessment",
    icon: "lotus",
  },
  {
    number: "02",
    title: "Local external therapies",
    detail: "(Abhyanga, Kati Basti/Greva Basti as indicated)",
    icon: "therapy",
  },
  {
    number: "03",
    title: "Internal medicines tailored to stage and Agni",
    icon: "mortar",
  },
  {
    number: "04",
    title: "Panchakarma sequencing when systemic clearing is appropriate",
    icon: "scroll",
  },
  {
    number: "05",
    title: "Physiotherapy and posture education",
    icon: "leaf",
  },
];

function ApproachIcon({ name }: { name: string }) {
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true" focusable="false">
      {name === "therapy" ? (
        <>
          <path d="M32 15a8 8 0 1 0 0 16 8 8 0 0 0 0-16Z" />
          <path d="M20 54V43a12 12 0 0 1 24 0v11" />
          <path d="M13 51h38" />
          <path d="M14 38h8M42 38h8" />
          <path d="M18 44c-5 0-8-3-8-8 5 0 8 3 8 8ZM46 44c5 0 8-3 8-8-5 0-8 3-8 8Z" />
        </>
      ) : name === "mortar" ? (
        <>
          <path d="M17 30h30l-4 19H21l-4-19Z" />
          <path d="M14 25h36" />
          <path d="M35 13l13 13" />
          <path d="M39 9l13 13" />
          <path d="M23 24c-4-6 0-11 6-15 4 6 1 11-6 15Z" />
          <path d="M31 24c4-6 10-6 16-2-4 5-9 6-16 2Z" />
        </>
      ) : name === "scroll" ? (
        <>
          <path d="M21 12h25a6 6 0 0 0-6 6v29H18V18a6 6 0 0 1 6-6" />
          <path d="M40 47a6 6 0 0 0 12 0v-4H40" />
          <path d="M25 24h11M25 31h11M25 38h8" />
          <path d="M48 12v14" />
          <path d="M44 18h8" />
        </>
      ) : name === "leaf" ? (
        <>
          <path d="M32 52C20 42 18 28 32 9c14 19 12 33 0 43Z" />
          <path d="M31 52C17 49 9 39 8 24c15 2 24 12 23 28Z" />
          <path d="M33 52c14-3 22-13 23-28-15 2-24 12-23 28Z" />
          <path d="M32 52C21 53 13 48 6 38c13-3 22 2 26 14Z" />
          <path d="M32 52c11 1 19-4 26-14-13-3-22 2-26 14Z" />
        </>
      ) : (
        <>
          <path d="M32 52C22 43 21 29 32 11c11 18 10 32 0 41Z" />
          <path d="M31 50C20 48 13 39 12 27c12 2 19 10 19 23Z" />
          <path d="M33 50c11-2 18-11 19-23-12 2-19 10-19 23Z" />
          <path d="M32 52c-10 0-18-5-24-14 12-2 20 3 24 14Z" />
          <path d="M32 52c10 0 18-5 24-14-12-2-20 3-24 14Z" />
          <path d="M18 18c4-2 8-2 12 0M46 18c-4-2-8-2-12 0" />
        </>
      )}
    </svg>
  );
}

export function ConditionApproachSection() {
  return (
    <section className="condition-approach-section" aria-labelledby="condition-approach-title">
      <div className="condition-approach-panel">
        <div className="condition-approach-title-wrap">
          <h2 id="condition-approach-title">How Susrutha Approaches It</h2>
        </div>

        <div className="condition-approach-flow">
          {approachSteps.map((step, index) => (
            <article className="condition-approach-step" key={step.number}>
              <div className="condition-approach-icon">
                <ApproachIcon name={step.icon} />
              </div>
              {index < approachSteps.length - 1 ? <i aria-hidden="true" /> : null}
              <strong>{step.number}</strong>
              <h3>{step.title}</h3>
              {step.detail ? <p>{step.detail}</p> : null}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
