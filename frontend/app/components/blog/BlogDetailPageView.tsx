"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Clock, Calendar, User, CheckCircle2, ChevronRight, Share2, Bookmark } from "lucide-react";
import { getImageDisplayUrl } from "@/app/services/api";

type BlogDetailPageViewProps = {
  post: any;
  slug: string;
};

export function BlogDetailPageView({ post, slug }: BlogDetailPageViewProps) {
  const title = post.title || post.name || "Ayurvedic Health & Clinical Insights";
  const category = post.category || "Ayurvedic Research & Clinical Insights";
  const author = post.authorName || (typeof post.author === "object" ? post.author?.name : post.author) || "Dr. Krishnakumar K.";
  const authorRole = post.authorRole || "Senior Ayurvedic Physician & Researcher";
  const dateStr = post.publishedAt || post.createdAt
    ? new Date(post.publishedAt || post.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
    : "Recent Article";
  const readTime = post.readTimeMinutes ? `${post.readTimeMinutes} min read` : "5 min read";
  const heroImage = getImageDisplayUrl(post.coverImage || post.image) || "/images/banner_holistic_health.jpg";
  const summary = post.summary || post.meta || post.excerpt || "";
  const content = post.content || summary;

  // Split content into clean readable paragraphs if needed
  const paragraphs = content
    ? content.split(/\n\n+/).filter(Boolean)
    : [];

  return (
    <div className="blog-detail-page-wrapper">
      {/* Luxury Cinematic Hero Banner */}
      <section className="blog-detail-hero-banner">
        <div className="blog-detail-hero-bg">
          <Image
            src={heroImage}
            alt={title}
            fill
            sizes="100vw"
            priority
            className="blog-detail-hero-img"
          />
          <div className="blog-detail-hero-overlay" />
        </div>

        <div className="blog-detail-hero-content">
          {/* Breadcrumb Navigation */}
          <nav className="blog-detail-breadcrumb" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <ChevronRight size={13} />
            <Link href="/blogs">Blogs</Link>
            <ChevronRight size={13} />
            <span>{category}</span>
          </nav>

          {/* Category Chip */}
          <div className="blog-detail-category-chip">
            {category}
          </div>

          {/* Main Title */}
          <h1 className="blog-detail-title">{title}</h1>

          {/* Author & Meta Row */}
          <div className="blog-detail-meta-row">
            <div className="blog-detail-author-info">
              <div className="blog-detail-author-avatar">
                <User size={18} />
              </div>
              <div>
                <span className="blog-detail-author-name">{author}</span>
                <span className="blog-detail-author-role">{authorRole}</span>
              </div>
            </div>

            <div className="blog-detail-meta-pills">
              <span className="blog-detail-meta-pill">
                <Calendar size={14} />
                <span>{dateStr}</span>
              </span>
              <span className="blog-detail-meta-pill">
                <Clock size={14} />
                <span>{readTime}</span>
              </span>
              <span className="blog-detail-verified-pill">
                <CheckCircle2 size={14} />
                <span>Peer Reviewed</span>
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Editorial Content Container */}
      <div className="blog-detail-body-container">
        <div className="blog-detail-layout-grid">
          {/* Article Main Text Column */}
          <article className="blog-detail-article-column">
            {summary && summary !== content ? (
              <div className="blog-detail-lead-summary">
                <p>{summary}</p>
              </div>
            ) : null}

            <div className="blog-detail-content-rich">
              {paragraphs.length > 0 ? (
                paragraphs.map((p: string, idx: number) => (
                  <p key={idx}>{p}</p>
                ))
              ) : (
                <p>{content}</p>
              )}
            </div>

            {/* Tags Row */}
            {post.tags && Array.isArray(post.tags) && post.tags.length > 0 ? (
              <div className="blog-detail-tags-section">
                <span className="blog-detail-tags-label">Related Topics:</span>
                <div className="blog-detail-tags-track">
                  {post.tags.map((tag: string, idx: number) => (
                    <span key={idx} className="blog-detail-tag-item">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            ) : null}

            {/* Back to blogs link */}
            <div className="blog-detail-back-bar">
              <Link href="/blogs" className="blog-detail-back-btn">
                <ArrowLeft size={16} />
                <span>Back to All Blogs & Insights</span>
              </Link>
            </div>
          </article>

          {/* Right Sticky Consultation Sidebar */}
          <aside className="blog-detail-sidebar-column">
            <div className="blog-detail-cta-card">
              <div className="blog-detail-cta-accent" />
              <span className="blog-detail-cta-eyebrow">PERSONALIZED MEDICAL CARE</span>
              <h3>Consult Senior Ayurvedic Specialists</h3>
              <p>
                Get classical holistic assessment, customized herbal prescriptions, and personalized Panchakarma healing plans tailored to your medical condition.
              </p>
              <Link href="/appointment" className="blog-detail-cta-btn">
                <span>Book Consultation</span>
              </Link>
              <div className="blog-detail-cta-guarantee">
                <CheckCircle2 size={14} />
                <span>In-person & Online Video Consultations</span>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
