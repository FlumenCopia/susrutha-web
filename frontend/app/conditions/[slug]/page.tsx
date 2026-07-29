import { notFound } from "next/navigation";
import { SiteShell } from "../../components/common/SiteShell";
import { ConditionApproachSection } from "../../components/inner/ConditionApproachSection";
import { ConditionDetailBanner } from "../../components/inner/ConditionDetailBanner";
import { ConditionDetailCareSection } from "../../components/inner/ConditionDetailCareSection";
import { conditionDetails } from "../../data/conditions";

type ConditionDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return conditionDetails.map((item) => ({ slug: item.slug }));
}

export default async function ConditionDetailPage({ params }: ConditionDetailPageProps) {
  const { slug } = await params;
  const condition = conditionDetails.find((item) => item.slug === slug);

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
