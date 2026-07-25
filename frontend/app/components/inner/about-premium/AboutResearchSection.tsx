import Image from "next/image";

export function AboutResearchSection() {
  return (
    <section className="about-premium-research">
      <div className="about-premium-research-image">
        <Image src="/images/treatment-herbal-medicine.png" alt="Ayurveda herbal medicine research" width={820} height={620} />
      </div>
      <div className="about-premium-research-copy">
        <span>Research & Innovation</span>
        <h2>Tradition strengthened through observation, documentation, and disciplined learning.</h2>
        <p>
          Susrutha&apos;s approach connects classical knowledge with careful treatment planning, outcome observation, and
          continuous improvement across patient care.
        </p>
        <div>
          <strong>36+</strong>
          <span>Years of institutional trust</span>
        </div>
      </div>
    </section>
  );
}
