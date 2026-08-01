import { notFound } from "next/navigation";
import { SiteShell } from "../../components/common/SiteShell";
import { InnerPage } from "../../components/inner/InnerPage";
import { blogPosts, type PageContent } from "../../data/architecture";

type BlogDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return blogPosts.map((item) => ({ slug: item.slug }));
}

export default async function BlogDetailPage({ params }: BlogDetailPageProps) {
  const { slug } = await params;
  const post = blogPosts.find((item) => item.slug === slug);

  if (!post) {
    notFound();
  }

  const content: PageContent = {
    eyebrow: post.meta,
    title: post.title,
    description: post.text,
    breadcrumbs: [
      { label: "Home", href: "/" },
      { label: "Blogs", href: "/blogs" },
      { label: post.title, href: `/blogs/${post.slug}` },
    ],
    intro: `${post.text} This article detail layout is ready for author information, category tags, reading time, related blogs, and treatment CTAs.`,
    highlights: [
      { title: "Article Body", text: "Structured educational content with clear headings and patient-friendly language." },
      { title: "Related Blogs", text: "Cross-link to relevant articles for deeper education.", href: "/blogs" },
      { title: "Treatment CTA", text: "Connect education to consultation where appropriate.", href: "/appointment" },
    ],
    sections: [
      { title: "Blog detail structure", text: "Every article should use consistent sections for better reading and SEO.", items: ["Category", "Author", "Reading time", "Related blogs", "Appointment CTA"] },
    ],
    cta: { title: "Need personal guidance?", text: "Book a consultation for condition-specific medical advice.", href: "/appointment", label: "Book Appointment" },
  };

  return (
    <SiteShell>
      <InnerPage content={content} />
    </SiteShell>
  );
}
