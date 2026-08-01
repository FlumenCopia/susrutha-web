import Image from "next/image";
import Link from "next/link";
import { ArticleMeta } from "./ArticleMeta";
import { BlogSectionHeader } from "./BlogSectionHeader";
import { blogArticles, getArticleCardSize } from "./blogData";

export function BlogGrid() {
  return (
    <section className="blog-premium-grid-section" id="blog-grid" aria-labelledby="blog-grid-title">
      <BlogSectionHeader eyebrow="Latest Thinking" title="Asymmetric reads, built for discovery." titleId="blog-grid-title" />
      <div className="blog-premium-grid">
        {blogArticles.map((article, index) => (
          <article className="blog-premium-card" data-size={getArticleCardSize(index)} key={`${article.title}-${index}`}>
            <Link href={`/blogs/${article.slug}`}>
              <span className="blog-premium-card-image">
                <Image src={article.image} alt="" fill sizes="(max-width: 900px) 100vw, 32vw" />
              </span>
              <span className="blog-premium-card-body">
                <span className="blog-premium-tag">{article.category}</span>
                <h3>{article.title}</h3>
                <p>{article.excerpt}</p>
                <ArticleMeta article={article} />
              </span>
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}
