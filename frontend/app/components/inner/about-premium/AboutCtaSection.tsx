import Link from "next/link";

export function AboutCtaSection() {
  return (
    <section className="about-premium-cta">
      <div>
        <span>Begin With Consultation</span>
        <h2>Start Your Healing Journey</h2>
        <p>Speak with the hospital team and find the right physician-led path for your concern.</p>
      </div>
      <Link href="/appointment">Book Consultation</Link>
    </section>
  );
}
