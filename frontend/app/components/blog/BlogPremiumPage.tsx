import { AuthorSection } from "./AuthorSection";
import { BlogCategories } from "./BlogCategories";
import { BlogGrid } from "./BlogGrid";
import { BlogHero } from "./BlogHero";
import { FeaturedBlog } from "./FeaturedBlog";
import { FooterCta } from "./FooterCta";
import { NewsletterCta } from "./NewsletterCta";
import { TrendingArticles } from "./TrendingArticles";

export function BlogPremiumPage() {
  return (
    <div className="blog-premium-page">
      <BlogHero />
      <BlogCategories />
      <FeaturedBlog />
      <BlogGrid />
      <TrendingArticles />
      <NewsletterCta />
      <AuthorSection />
      <FooterCta />
    </div>
  );
}
