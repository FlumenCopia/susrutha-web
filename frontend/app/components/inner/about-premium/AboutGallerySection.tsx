import Image from "next/image";

export function AboutGallerySection() {
  return (
    <section className="about-premium-gallery">
      <div className="about-premium-section-heading">
        <span>Healing Experience</span>
        <h2>Quiet spaces, natural light, and the calm rhythm of Kerala Ayurveda.</h2>
      </div>
      <div className="about-premium-gallery-grid">
        <div className="large">
          <Image src="/images/hero-courtyard-ayurveda-v2.png" alt="Ayurveda courtyard" width={980} height={760} />
        </div>
        <div>
          <Image src="/images/treatment-sirodhara.png" alt="Sirodhara therapy" width={620} height={380} />
        </div>
        <div>
          <Image src="/images/faq-ayurveda-still-life.png" alt="Ayurveda herbs and oils" width={620} height={380} />
        </div>
        <div className="wide">
          <Image src="/images/ayurveda-village-path.png" alt="Ayurveda village path" width={1280} height={460} />
        </div>
      </div>
    </section>
  );
}
