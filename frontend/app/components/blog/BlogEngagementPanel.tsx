import { AuthorSection } from "./AuthorSection";
import { FooterCta } from "./FooterCta";
import { NewsletterCta } from "./NewsletterCta";
import { TrendingArticles } from "./TrendingArticles";

export function BlogEngagementPanel() {
  return (
    <section className="blog-premium-engagement" aria-label="Blog engagement">
      <TrendingArticles />
      <NewsletterCta />
      <AuthorSection />
      <FooterCta />
    </section>
  );
}
