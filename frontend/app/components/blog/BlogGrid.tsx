"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArticleMeta } from "./ArticleMeta";
import { BlogSectionHeader } from "./BlogSectionHeader";
import { blogArticles as fallbackArticles, getArticleCardSize } from "./blogData";
import { getPublicBlogs, getImageDisplayUrl } from "@/app/services/api";

export function BlogGrid() {
  const [articles, setArticles] = useState(fallbackArticles);

  useEffect(() => {
    async function loadBlogs() {
      try {
        const data = await getPublicBlogs();
        if (Array.isArray(data) && data.length > 0) {
          const normalized = data.map((b: any, idx: number) => {
            const fb = fallbackArticles[idx] || fallbackArticles[0];
            return {
              slug: b.slug || `blog-${idx}`,
              title: b.title || fb.title,
              category: b.category || fb.category,
              excerpt: b.excerpt || fb.excerpt,
              image: getImageDisplayUrl(b.coverImage || fb.image),
              readTime: b.readTimeMinutes ? `${b.readTimeMinutes} min read` : fb.readTime,
              date: b.publishedAt ? new Date(b.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : fb.date,
              author: b.authorName || fb.author,
              featured: b.isFeatured || false,
            };
          });
          setArticles(normalized as any);
        }
      } catch (err) {
        console.error("Failed to load live blogs:", err);
      }
    }
    loadBlogs();
  }, []);

  return (
    <section className="blog-premium-grid-section" id="blog-grid" aria-labelledby="blog-grid-title">
      <BlogSectionHeader eyebrow="Latest Thinking" title="Asymmetric reads, built for discovery." titleId="blog-grid-title" />
      <div className="blog-premium-grid">
        {articles.map((article, index) => (
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
