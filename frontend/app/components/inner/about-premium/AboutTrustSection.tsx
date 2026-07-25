import Image from "next/image";

export function AboutTrustSection() {
  return (
    <section className="about-premium-trust">
      <div className="about-premium-trust-portrait">
        <Image src="/images/testimonial-lamp-flowers.png" alt="Patient trust and Ayurveda ambience" width={560} height={640} />
      </div>
      <blockquote>
        <span>Patient Trust</span>
        &ldquo;The care felt deeply personal, calm, and rooted in tradition. Every step was explained with patience.&rdquo;
        <footer>
          <strong>Google Rating</strong>
          <i>36+ Years of Trust</i>
        </footer>
      </blockquote>
    </section>
  );
}
