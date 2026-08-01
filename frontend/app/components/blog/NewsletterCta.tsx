import { ArrowIcon } from "./BlogIcons";

export function NewsletterCta() {
  return (
    <section className="blog-premium-newsletter" aria-labelledby="newsletter-title">
      <div>
        <span>Private Notes</span>
        <h2 id="newsletter-title">Receive refined wellness ideas before everyone else.</h2>
        <p>Monthly clinical insight, seasonal routines, and thoughtful guides from the Susrutha team.</p>
      </div>
      <form>
        <input type="email" placeholder="Email address" aria-label="Email address" />
        <button type="button">
          Subscribe
          <ArrowIcon />
        </button>
      </form>
    </section>
  );
}
