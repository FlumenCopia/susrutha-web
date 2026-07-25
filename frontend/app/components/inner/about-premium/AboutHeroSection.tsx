import Image from "next/image";
import Link from "next/link";

export function AboutHeroSection() {
  return (
    <section className="about-premium-hero">
      <div className="about-premium-hero-copy">
        <span>About Susrutha</span>
        <h1>
          Healing with Tradition.
          <br />
          Trusted Through Generations.
        </h1>
        <p>
          Susrutha Ayurveda brings the wisdom of classical Ayurveda into a calm, hospital-based environment shaped by
          physician guidance, heritage, research, and deeply personal care.
        </p>
        <Link href="#legacy">Discover Our Legacy</Link>
      </div>
      <div className="about-premium-hero-image">
        <Image
          src="/images/about-susrutha-wellness.png"
          alt="Susrutha Ayurveda consultation and wellness setting"
          width={980}
          height={720}
          priority
        />
      </div>
    </section>
  );
}
