import Link from "next/link";
import { ArrowIcon } from "./BlogIcons";

export function FooterCta() {
  return (
    <section className="blog-premium-footer-cta" aria-labelledby="blog-footer-cta-title">
      <span>Need a personal care answer?</span>
      <h2 id="blog-footer-cta-title">Move from reading to a physician-guided consultation.</h2>
      <Link href="/appointment">
        Book an appointment
        <ArrowIcon />
      </Link>
    </section>
  );
}
