import { notFound } from "next/navigation";
import { SiteShell } from "../../components/common/SiteShell";
import { ConditionApproachSection } from "../../components/inner/ConditionApproachSection";
import { ConditionDetailBanner } from "../../components/inner/ConditionDetailBanner";
import { ConditionDetailCareSection } from "../../components/inner/ConditionDetailCareSection";
import { getPublicConditionBySlug, getPublicConditions } from "../../services/api";

type ConditionDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamic = "force-dynamic";

export default async function ConditionDetailPage({ params }: ConditionDetailPageProps) {
  const { slug } = await params;
  const condition = await getPublicConditionBySlug(slug);

  if (!condition) {
    notFound();
  }

  return (
    <SiteShell>
      <div className="condition-detail-page">
        <ConditionDetailBanner condition={condition} />
        <ConditionDetailCareSection condition={condition} />
        <ConditionApproachSection />
      </div>
    </SiteShell>
  );
}

