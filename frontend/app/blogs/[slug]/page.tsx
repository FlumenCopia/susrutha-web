import { notFound } from "next/navigation";
import { SiteShell } from "../../components/common/SiteShell";
import { InnerPage } from "../../components/inner/InnerPage";
import { type PageContent } from "../../data/architecture";
import { getPublicBlogBySlug, getPublicBlogs } from "../../services/api";

type BlogDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamic = "force-dynamic";

export async function generateStaticParams() {
  try {
    const list = await getPublicBlogs();
    if (Array.isArray(list)) {
      return list.map((item: any) => ({ slug: item.slug || item._id }));
    }
  } catch (err) {}
  return [];
}

export default async function BlogDetailPage({ params }: BlogDetailPageProps) {
  const { slug } = await params;
  const post = await getPublicBlogBySlug(slug);

  if (!post) {
    notFound();
  }

  const title = post.title || post.name || "Blog Post";
  const summary = post.summary || post.meta || post.content || "";

  const content: PageContent = {
    eyebrow: post.category || post.meta || "Ayurvedic Health & Wellness",
    title: title,
    description: summary,
    breadcrumbs: [
      { label: "Home", href: "/" },
      { label: "Blogs", href: "/blogs" },
      { label: title, href: `/blogs/${post.slug || slug}` },
    ],
    intro: post.content || summary,
    highlights: [
      { title: "Author", text: post.authorName || post.author || "Susrutha Medical Team" },
      { title: "Category", text: post.category || "General Wellness" },
      { title: "Treatment CTA", text: "Connect education to consultation where appropriate.", href: "/appointment" },
    ],
    sections: [
      { title: "Article Overview", text: summary, items: post.tags || ["Health", "Ayurveda"] },
    ],
    cta: { title: "Need personal guidance?", text: "Book a consultation for condition-specific medical advice.", href: "/appointment", label: "Book Appointment" },
  };

  return (
    <SiteShell>
      <InnerPage content={content} />
    </SiteShell>
  );
}

