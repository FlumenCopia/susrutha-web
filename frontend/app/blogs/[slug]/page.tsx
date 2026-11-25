import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SiteShell } from "../../components/common/SiteShell";
import { BlogDetailPageView } from "../../components/blog/BlogDetailPageView";
import { getPublicBlogBySlug, getPublicBlogs } from "../../services/api";

type BlogDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: BlogDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPublicBlogBySlug(slug);

  if (!post) {
    return {
      title: "Health Article | Susrutha Ayurveda",
    };
  }

  const title = `${post.title} | Susrutha Ayurveda Blog`;
  const description =
    post.excerpt ||
    post.summary ||
    post.description ||
    `Read clinical insights on ${post.title} by Ayurvedic physicians at Susrutha Ayurveda Hospital & Clinic, Thiruvananthapuram, Kerala.`;

  return {
    title,
    description: description.slice(0, 160),
    keywords: [
      post.title,
      "ayurveda health tips",
      "panchakarma insights kerala",
      "susrutha ayurveda blog",
    ],
    alternates: {
      canonical: `https://susruthaayurveda.com/blogs/${slug}`,
    },
    openGraph: {
      title,
      description: description.slice(0, 160),
      url: `https://susruthaayurveda.com/blogs/${slug}`,
      type: "article",
      images: post.coverImage || post.image ? [post.coverImage || post.image] : undefined,
    },
  };
}

export default async function BlogDetailPage({ params }: BlogDetailPageProps) {
  const { slug } = await params;
  const post = await getPublicBlogBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <SiteShell>
      <BlogDetailPageView post={post} slug={slug} />
    </SiteShell>
  );
}
