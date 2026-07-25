import Image from "next/image";

export function AboutStorySection() {
  return (
    <section className="about-premium-story">
      <div className="about-premium-founder">
        <Image src="/images/doctor-portrait.png" alt="Susrutha Ayurveda founder portrait" width={720} height={860} />
      </div>
      <div className="about-premium-story-copy">
        <span>Our Story</span>
        <h2>Built on trust, classical knowledge, and patient-first care.</h2>
        <p>
          The Susrutha journey is rooted in a simple promise: to make authentic Ayurveda approachable, dignified, and
          reliable for families seeking healing, prevention, and lifelong wellness.
        </p>
        <blockquote>True healing begins when knowledge, compassion, and time meet around the patient.</blockquote>
        <div className="about-premium-signature">Susrutha Ayurveda</div>
      </div>
    </section>
  );
}
