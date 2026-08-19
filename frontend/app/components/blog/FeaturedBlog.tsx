"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArticleMeta } from "./ArticleMeta";
import { ArrowIcon } from "./BlogIcons";
import { BlogSectionHeader } from "./BlogSectionHeader";
import { getPublicBlogs, getImageDisplayUrl } from "@/app/services/api";
import { DataLayerRibbon } from "../common/DataLayerRibbon";

export function FeaturedBlog() {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function loadFeatured() {
      try {
        setLoading(true);
        const data = await getPublicBlogs();
        if (Array.isArray(data) && data.length > 0) {
          const normalized = data.map((b: any, idx: number) => ({
            slug: b.slug || `blog-${idx}`,
            title: b.title || b.name || "Ayurveda Blog",
            category: b.category || "Wellness",
            excerpt: b.excerpt || b.summary || b.meta || "",
            image: getImageDisplayUrl(b.coverImage || b.image),
            readTime: b.readTimeMinutes ? `${b.readTimeMinutes} min read` : "5 min read",
            date: b.publishedAt ? new Date(b.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : "Recent",
            author: b.authorName || b.author || "Susrutha Team",
          }));
          setBlogs(normalized);
        } else {
          setBlogs([]);
        }
      } catch (err) {
        console.error("Failed to load featured blogs:", err);
        setBlogs([]);
      } finally {
        setLoading(false);
      }
    }
    loadFeatured();
  }, []);

  if (!loading && blogs.length === 0) {
    return null;
  }

  const primary = blogs[0];
  const sideArticles = blogs.slice(1, 3);

  if (!primary) return null;

  return (
    <section className="blog-premium-featured" aria-labelledby="featured-articles-title">
      <BlogSectionHeader eyebrow="Featured Articles" title="Magazine-style stories with clinical depth." titleId="featured-articles-title" />
      <div className={`blog-premium-featured-layout ${sideArticles.length === 0 ? "has-single-item" : sideArticles.length === 1 ? "has-two-items" : ""}`}>
        <Link href={`/blogs/${primary.slug}`} className="blog-premium-featured-link blog-premium-featured-card-large">
          <article className="blog-premium-featured-card">
            {primary.image ? (
              <Image src={primary.image} alt={primary.title} fill sizes="(max-width: 900px) 100vw, 58vw" priority />
            ) : (
              <div className="blog-premium-card-placeholder" />
            )}
            <div>
              <span className="blog-premium-badge">{primary.category}</span>
              <h3>{primary.title}</h3>
              {primary.excerpt && <p>{primary.excerpt}</p>}
              <ArticleMeta article={primary} />
            </div>
            <span className="blog-premium-arrow-btn" aria-hidden="true">
              <ArrowIcon />
            </span>
          </article>
        </Link>

        {sideArticles.map((article) => (
          <Link href={`/blogs/${article.slug}`} key={`${article.slug}-${article.category}`} className="blog-premium-featured-link">
            <article className="blog-premium-featured-card">
              {article.image ? (
                <Image src={article.image} alt={article.title} fill sizes="(max-width: 900px) 100vw, 30vw" />
              ) : (
                <div className="blog-premium-card-placeholder" />
              )}
              <div>
                <span className="blog-premium-badge">{article.category}</span>
                <h3>{article.title}</h3>
                <ArticleMeta article={article} />
              </div>
              <span className="blog-premium-arrow-btn" aria-hidden="true">
                <ArrowIcon />
              </span>
            </article>
          </Link>
        ))}
      </div>
    </section>
  );
}

