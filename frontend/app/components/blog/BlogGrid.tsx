"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArticleMeta } from "./ArticleMeta";
import { BlogSectionHeader } from "./BlogSectionHeader";
import { getArticleCardSize } from "./blogData";
import { getPublicBlogs, getImageDisplayUrl } from "@/app/services/api";

export function BlogGrid() {
  const [articles, setArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function loadBlogs() {
      try {
        setLoading(true);
        const data = await getPublicBlogs();
        if (Array.isArray(data) && data.length > 0) {
          const normalized = data.map((b: any, idx: number) => {
            return {
              slug: b.slug || `blog-${idx}`,
              title: b.title || b.name || "Ayurveda Blog",
              category: b.category || "Wellness",
              excerpt: b.excerpt || b.summary || b.meta || "",
              image: getImageDisplayUrl(b.coverImage || b.image),
              readTime: b.readTimeMinutes ? `${b.readTimeMinutes} min read` : "5 min read",
              date: b.publishedAt ? new Date(b.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : "Recent",
              author: b.authorName || b.author || "Susrutha Team",
              featured: b.isFeatured || false,
            };
          });
          setArticles(normalized);
        } else {
          setArticles([]);
        }
      } catch (err) {
        console.error("Failed to load live blogs:", err);
        setArticles([]);
      } finally {
        setLoading(false);
      }
    }
    loadBlogs();
  }, []);

  if (!loading && articles.length === 0) {
    return (
      <section className="blog-premium-grid-section" id="blog-grid" aria-labelledby="blog-grid-title">
        <BlogSectionHeader eyebrow="Latest Thinking" title="Asymmetric reads, built for discovery." titleId="blog-grid-title" />
        <div style={{ padding: "40px 0", textAlign: "center", opacity: 0.7 }}>
          <p>No blog articles published yet.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="blog-premium-grid-section" id="blog-grid" aria-labelledby="blog-grid-title">
      <BlogSectionHeader eyebrow="Latest Thinking" title="Asymmetric reads, built for discovery." titleId="blog-grid-title" />
      <div className="blog-premium-grid">
        {articles.map((article, index) => (
          <article className="blog-premium-card" data-size={getArticleCardSize(index)} key={`${article.slug}-${index}`}>
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

