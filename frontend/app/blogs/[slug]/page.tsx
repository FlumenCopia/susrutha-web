import { notFound } from "next/navigation";
import { SiteShell } from "../../components/common/SiteShell";
import { BlogDetailPageView } from "../../components/blog/BlogDetailPageView";
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

  return (
    <SiteShell>
      <BlogDetailPageView post={post} slug={slug} />
    </SiteShell>
  );
}

