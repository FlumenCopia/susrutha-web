import Image from "next/image";

const doctors = [
  {
    name: "Dr. Krishnakumar K.",
    qualification: "MD (Ayur)",
    experience: "Senior Ayurveda Physician",
  },
  {
    name: "Dr. Sreeja Krishna S.",
    qualification: "BAMS, MBA Hospital Management",
    experience: "Consultation and care coordination",
  },
  {
    name: "Dr. Priyanka R.",
    qualification: "BAMS, MS (Ayur)",
    experience: "Ayurvedic Gynaecology and Obstetrics",
  },
];

export function AboutDoctorsSection() {
  return (
    <section className="about-premium-doctors">
      <div className="about-premium-section-heading">
        <span>Meet Our Doctors</span>
        <h2>Experienced physicians guiding every treatment with care.</h2>
      </div>
      <div className="about-premium-doctor-grid">
        {doctors.map((doctor) => (
          <article key={doctor.name}>
            <Image src="/images/doctor-portrait.png" alt={doctor.name} width={520} height={620} />
            <h3>{doctor.name}</h3>
            <p>{doctor.qualification}</p>
            <span>{doctor.experience}</span>
          </article>
        ))}
      </div>
    </section>
  );
}
