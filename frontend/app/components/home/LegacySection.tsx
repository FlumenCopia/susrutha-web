import Link from "next/link";

export function LegacySection() {
  return (
    <section className="legacy-section">
      <div className="legacy-copy">
        <span className="legacy-eyebrow">Our Legacy</span>
        <h2>
          A Legacy of <span>Healing.</span>
          <br />
          A Commitment to <span>Care.</span>
        </h2>

        <div className="legacy-divider" aria-hidden="true">
          <span />
          <i />
          <span />
        </div>

        <p>
          For over three decades, Susrutha Ayurveda has blended ancient wisdom with modern
          advancements to deliver authentic, effective and personalized care.
        </p>

        <Link className="legacy-link" href="/about-us">
          Know More About Us
          <span aria-hidden="true">→</span>
        </Link>
      </div>

      <div className="legacy-image" aria-label="Traditional Ayurveda heritage corridor" />
    </section>
  );
}
