import Image from "next/image";
import Link from "next/link";
import { ArticleMeta } from "./ArticleMeta";
import { ArrowIcon } from "./BlogIcons";
import { BlogSectionHeader } from "./BlogSectionHeader";
import { blogArticles } from "./blogData";

export function FeaturedBlog() {
  const [primary, secondary, tertiary] = blogArticles;
  const sideArticles = [secondary, tertiary];

  return (
    <section className="blog-premium-featured" aria-labelledby="featured-articles-title">
      <BlogSectionHeader eyebrow="Featured Articles" title="Magazine-style stories with clinical depth." titleId="featured-articles-title" />
      <div className="blog-premium-studio-note" aria-hidden="true">
        <span>Curated by physicians</span>
        <span>Seasonal care</span>
        <span>Research-backed</span>
      </div>
      <div className="blog-premium-featured-layout">
        <article className="blog-premium-featured-card blog-premium-featured-card-large">
          <Image src={primary.image} alt="" fill sizes="(max-width: 900px) 100vw, 58vw" />
          <div>
            <span>{primary.category}</span>
            <h3>{primary.title}</h3>
            <p>{primary.excerpt}</p>
            <ArticleMeta article={primary} />
          </div>
          <Link href={`/blogs/${primary.slug}`} aria-label={`Read ${primary.title}`}>
            <ArrowIcon />
          </Link>
        </article>

        {sideArticles.map((article) => (
          <article className="blog-premium-featured-card" key={`${article.slug}-${article.category}`}>
            <Image src={article.image} alt="" fill sizes="(max-width: 900px) 100vw, 30vw" />
            <div>
              <span>{article.category}</span>
              <h3>{article.title}</h3>
              <ArticleMeta article={article} />
            </div>
            <Link href={`/blogs/${article.slug}`} aria-label={`Read ${article.title}`}>
              <ArrowIcon />
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}
