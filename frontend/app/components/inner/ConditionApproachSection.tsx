import Image from "next/image";

const approachSteps = [
  {
    number: "01",
    title: "Detailed musculoskeletal and lifestyle assessment",
    image: "/images/about_pillar_ayurveda.jpg",
  },
  {
    number: "02",
    title: "Local external therapies",
    detail: "(Abhyanga, Kati Basti/Greva Basti as indicated)",
    image: "/images/treatment-kati-vasti.webp",
  },
  {
    number: "03",
    title: "Internal medicines tailored to stage and Agni",
    image: "/images/treatment-herbal-medicine.webp",
  },
  {
    number: "04",
    title: "Panchakarma sequencing when systemic clearing is appropriate",
    image: "/images/treatment-panchakarma.webp",
  },
  {
    number: "05",
    title: "Physiotherapy and posture education",
    image: "/images/treatment-njavarakizhi.webp",
  },
];

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
                <Image
                  src={step.image}
                  alt={step.title}
                  fill
                  sizes="120px"
                  style={{ objectFit: "cover", borderRadius: "50%" }}
                />
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
