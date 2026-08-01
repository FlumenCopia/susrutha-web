import { BlogCategories } from "./BlogCategories";
import { BlogGrid } from "./BlogGrid";
import { BlogEngagementPanel } from "./BlogEngagementPanel";
import { BlogHero } from "./BlogHero";
import { FeaturedBlog } from "./FeaturedBlog";

export function BlogPremiumPage() {
  return (
    <div className="blog-premium-page">
      <BlogHero />
      <BlogCategories />
      <FeaturedBlog />
      <BlogGrid />
      <BlogEngagementPanel />
    </div>
  );
}
