import Image from "next/image";
import Link from "next/link";
import { ArticleMeta } from "./ArticleMeta";
import { ArrowIcon, SparkIcon } from "./BlogIcons";
import { blogArticles } from "./blogData";

export function BlogHero() {
  const article = blogArticles[0];

  return (
    <section className="blog-premium-hero" aria-labelledby="blog-premium-title">
      <div className="blog-premium-hero-bg" aria-hidden="true">
        <Image src="/images/about-hero-ayurveda-still-life.webp" alt="" fill priority sizes="100vw" />
      </div>
      <div className="blog-premium-orbit" aria-hidden="true" />
      <div className="blog-premium-hero-copy">
        <span className="blog-premium-kicker">
          <SparkIcon />
          Susrutha Journal
        </span>
        <h1 id="blog-premium-title">Ideas for a more balanced way to live, heal, and think.</h1>
        <p>A premium editorial space for Ayurveda, preventive care, clinical insight, hospital journeys, and modern wellness intelligence.</p>
        <div className="blog-premium-hero-actions">
          <Link href={`/blogs/${article.slug}`}>
            Read the feature
            <ArrowIcon />
          </Link>
          <a href="#blog-grid">Explore articles</a>
        </div>
      </div>

      <article className="blog-premium-hero-feature">
        <span>{article.category}</span>
        <h2>{article.title}</h2>
        <ArticleMeta article={article} />
        <Link href={`/blogs/${article.slug}`} aria-label={`Read ${article.title}`}>
          Open article
          <ArrowIcon />
        </Link>
      </article>
    </section>
  );
}
