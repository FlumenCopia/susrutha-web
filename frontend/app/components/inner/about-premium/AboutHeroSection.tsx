import Image from "next/image";
import Link from "next/link";

export function AboutHeroSection() {
  return (
    <section className="about-premium-hero">
      <div className="about-premium-hero-copy">
        <span>About Us</span>
        <h1>
          Ancient Wisdom.
          <br />
          Timeless <em>Care.</em>
        </h1>
        <p>
          At Susrutha Ayurvedic Hospital, we blend the timeless science of Ayurveda with personalized care to help you
          live a healthier, balanced life.
        </p>
        <Link href="#legacy">
          Our Story
          <span aria-hidden="true" />
        </Link>
      </div>
      <div className="about-premium-hero-image">
        <div className="about-premium-hero-botanical" aria-hidden="true" />
        <Image
          src="/images/about-hero-ayurveda-still-life.png"
          alt="Ayurvedic herbs with marble mortar and brass vessels"
          width={1536}
          height={864}
          priority
        />
      </div>
    </section>
  );
}
