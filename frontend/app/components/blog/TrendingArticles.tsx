import Image from "next/image";
import Link from "next/link";
import { BlogSectionHeader } from "./BlogSectionHeader";

const trendingArticles = [
  {
    slug: "classical-panchakarma-detox",
    title: "Understanding Classical Panchakarma: The Five Purificatory Therapies",
    category: "Panchakarma",
    readTime: "7 min read",
    image: "/images/treatment-panchakarma.webp",
  },
  {
    slug: "ayurvedic-dietetics",
    title: "Ahara Vihara: Ayurvedic Principles of Daily Nutrition & Digestion",
    category: "Nutrition",
    readTime: "5 min read",
    image: "/images/ayurveda-village-room.webp",
  },
];

export function TrendingArticles() {
  return (
    <section className="blog-premium-trending" aria-labelledby="trending-title">
      <BlogSectionHeader eyebrow="Trending Now" title="Swipeable insights for curious readers." titleId="trending-title" />
      <div className="blog-premium-trend-track" tabIndex={0} aria-label="Trending articles carousel">
        {trendingArticles.map((article, index) => (
          <Link className="blog-premium-trend-card" href={`/blogs/${article.slug}`} key={`${article.title}-trend-${index}`}>
            <Image src={article.image} alt="" fill sizes="320px" />
            <span>{article.category}</span>
            <h3>{article.title}</h3>
            <small>{article.readTime}</small>
          </Link>
        ))}
      </div>
    </section>
  );
}
