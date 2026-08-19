"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArticleMeta } from "./ArticleMeta";
import { BlogSectionHeader } from "./BlogSectionHeader";
import { getPublicBlogs, getImageDisplayUrl } from "@/app/services/api";

function getArticleCardSize(index: number): "large" | "wide" | "standard" {
  if (index % 4 === 0) return "large";
  if (index % 3 === 0) return "wide";
  return "standard";
}

const PAGE_SIZE = 6;

export function BlogGrid() {
  const [articles, setArticles] = useState<any[]>([]);
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(true);
  const [loadingMore, setLoadingMore] = useState<boolean>(false);

  const fetchBlogsBatch = async (targetPage: number, append: boolean = false) => {
    try {
      if (targetPage === 1) setLoading(true);
      else setLoadingMore(true);

      const res = await getPublicBlogs({ page: targetPage, limit: PAGE_SIZE });
      const rawData = Array.isArray(res) ? res : res.items || [];
      const pagination = (res as any).pagination || {};

      const normalized = rawData.map((b: any, idx: number) => ({
        slug: b.slug || `blog-${idx}`,
        title: b.title || b.name || "Ayurveda Blog",
        category: b.category || "Wellness",
        excerpt: b.excerpt || b.summary || b.meta || "",
        image: getImageDisplayUrl(b.coverImage || b.image),
        readTime: b.readTimeMinutes ? `${b.readTimeMinutes} min read` : "5 min read",
        date: b.publishedAt ? new Date(b.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : "Recent",
        author: b.authorName || b.author || "Susrutha Team",
        featured: b.isFeatured || false,
        isBackendData: true,
      }));

      if (append) {
        setArticles((prev) => [...prev, ...normalized]);
      } else {
        setArticles(normalized);
      }

      setHasMore(pagination.hasMore ?? (normalized.length === PAGE_SIZE));
    } catch (err) {
      console.error("Failed to load live blogs:", err);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  useEffect(() => {
    fetchBlogsBatch(1, false);
  }, []);

  const handleLoadMore = () => {
    if (loadingMore || !hasMore) return;
    const nextPage = page + 1;
    setPage(nextPage);
    fetchBlogsBatch(nextPage, true);
  };

  return (
    <section className="blog-premium-grid-section" id="blog-grid" aria-labelledby="blog-grid-title">
      <BlogSectionHeader
        eyebrow="OUR BLOG"
        title="Blogs & Insights"
        description="Explore our complete collection of clinical insights, treatment protocols, and wellness guides."
        titleId="blog-grid-title"
      />

      {loading ? (
        <div className="blog-premium-grid">
          {Array.from({ length: PAGE_SIZE }).map((_, idx) => (
            <div className="blog-premium-card shimmer-card" key={idx} style={{ height: "300px", background: "linear-gradient(90deg, #f0ede6 25%, #f8f6f0 50%, #f0ede6 75%)", borderRadius: "20px" }} />
          ))}
        </div>
      ) : articles.length === 0 ? (
        <div style={{ padding: "40px 0", textAlign: "center", opacity: 0.7 }}>
          <p>No articles available.</p>
        </div>
      ) : (
        <>
          <div className="blog-premium-grid">
            {articles.map((article, index) => {
              return (
                <article
                  className="blog-premium-card"
                  data-size={getArticleCardSize(index)}
                  key={`${article.slug}-${index}`}
                >
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
              );
            })}
          </div>

          {hasMore && (
            <div style={{ marginTop: "40px", textAlign: "center" }}>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleLoadMore}
                disabled={loadingMore}
                style={{
                  padding: "14px 36px",
                  borderRadius: "9999px",
                  background: "linear-gradient(135deg, #9a6528 0%, #c4922a 100%)",
                  color: "#ffffff",
                  fontWeight: 700,
                  fontSize: "14px",
                  border: "none",
                  cursor: "pointer",
                  boxShadow: "0 6px 20px rgba(154, 101, 40, 0.25)",
                }}
              >
                {loadingMore ? "Loading More Articles…" : "Load More Articles ↓"}
              </button>
            </div>
          )}
        </>
      )}
    </section>
  );
}
