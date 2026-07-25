import Image from "next/image";

const whyRows = [
  {
    title: "Physician-led Panchakarma care",
    text: "Every therapy journey begins with consultation and continues through planned procedures, diet guidance, rest, and review.",
    image: "/images/treatment-panchakarma.png",
    alt: "Ayurveda Panchakarma treatment preparation",
  },
  {
    title: "A hospital environment for traditional healing",
    text: "Purposeful spaces for consultation, inpatient care, therapy, recovery, yoga, and patient support.",
    image: "/images/ayurveda-hospital-garden.png",
    alt: "Susrutha Ayurveda hospital garden",
  },
  {
    title: "A heritage institution with a long view of wellness",
    text: "Care is designed beyond temporary relief, supporting prevention, strength, balance, and sustainable wellbeing.",
    image: "/images/ayurveda-village-path.png",
    alt: "Kerala Ayurveda village pathway",
  },
];

export function AboutWhySection() {
  return (
    <section className="about-premium-why">
      <div className="about-premium-section-heading">
        <span>Why Choose Susrutha</span>
        <h2>An Ayurveda institution designed for thoughtful, unhurried care.</h2>
      </div>
      {whyRows.map((row, index) => (
        <article className="about-premium-why-row" data-reverse={index === 1 ? "true" : undefined} key={row.title}>
          <div>
            <Image src={row.image} alt={row.alt} width={860} height={600} />
          </div>
          <section>
            <span>{`0${index + 1}`}</span>
            <h3>{row.title}</h3>
            <p>{row.text}</p>
          </section>
        </article>
      ))}
    </section>
  );
}
