import Link from "next/link";

export function ContactPreviewSection() {
  return (
    <section className="section contact-preview">
      <span className="eyebrow">Contact</span>
      <h2>Choose a branch, select a treatment, and request a confirmed appointment.</h2>
      <Link className="btn btn-primary" href="/contact-us">
        Contact Susrutha
      </Link>
    </section>
  );
}
