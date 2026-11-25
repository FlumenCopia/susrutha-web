import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SiteShell } from "../../components/common/SiteShell";
import { PackageDetailReferencePage } from "../../components/inner/PackageDetailReferencePage";
import { getPublicPackageBySlug, getPublicPackages } from "../../services/api";

type PackageDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: PackageDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const pkg = await getPublicPackageBySlug(slug);

  if (!pkg) {
    return {
      title: "Care Package | Susrutha Ayurveda",
    };
  }

  const title = `${pkg.title || pkg.name || "Ayurvedic Package"} in Kerala | Susrutha Ayurveda Trivandrum`;
  const description =
    pkg.shortDescription ||
    pkg.description ||
    pkg.text ||
    `Comprehensive ${pkg.title || "Panchakarma"} care package at Susrutha Ayurveda Hospital, Thiruvananthapuram, Kerala. Physician consultation, daily therapies & accommodation included.`;

  return {
    title,
    description: description.slice(0, 160),
    keywords: [
      pkg.title,
      `${pkg.title} kerala`,
      "panchakarma package trivandrum",
      "ayurvedic treatment package",
      "susrutha ayurveda",
    ],
    alternates: {
      canonical: `https://susruthaayurveda.com/packages/${slug}`,
    },
    openGraph: {
      title,
      description: description.slice(0, 160),
      url: `https://susruthaayurveda.com/packages/${slug}`,
      images: pkg.image || pkg.coverImage ? [pkg.image || pkg.coverImage] : undefined,
    },
  };
}

export default async function PackageDetailPage({ params }: PackageDetailPageProps) {
  const { slug } = await params;
  const pkg = await getPublicPackageBySlug(slug);

  if (!pkg) {
    notFound();
  }

  return (
    <SiteShell>
      <PackageDetailReferencePage pkg={pkg} />
    </SiteShell>
  );
}
