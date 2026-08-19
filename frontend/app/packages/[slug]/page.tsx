import { notFound } from "next/navigation";
import { SiteShell } from "../../components/common/SiteShell";
import { PackageDetailReferencePage } from "../../components/inner/PackageDetailReferencePage";
import { getPublicPackageBySlug, getPublicPackages } from "../../services/api";

type PackageDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamic = "force-dynamic";

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
