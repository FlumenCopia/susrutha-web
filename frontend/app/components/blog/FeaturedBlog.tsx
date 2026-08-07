"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArticleMeta } from "./ArticleMeta";
import { ArrowIcon } from "./BlogIcons";
import { BlogSectionHeader } from "./BlogSectionHeader";
import { getPublicBlogs, getImageDisplayUrl } from "@/app/services/api";

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

