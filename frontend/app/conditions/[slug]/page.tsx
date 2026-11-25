import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SiteShell } from "../../components/common/SiteShell";
import { ConditionDetailBanner } from "../../components/inner/ConditionDetailBanner";
import { ConditionDetailCareSection } from "../../components/inner/ConditionDetailCareSection";
import { getPublicConditionBySlug, getPublicConditions } from "../../services/api";
import { generateMedicalConditionSchema } from "../../utils/jsonLd";

type ConditionDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: ConditionDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const condition = await getPublicConditionBySlug(slug);

  if (!condition) {
    return {
      title: "Health Condition | Susrutha Ayurveda",
    };
  }

  const title = `Ayurvedic Treatment for ${condition.title || "Condition"} in Trivandrum, Kerala | Susrutha Ayurveda`;
  const description =
    condition.shortDescription ||
    condition.overview ||
    condition.text ||
    `Clinical Ayurvedic management and Panchakarma protocols for ${condition.title} at Susrutha Ayurveda Hospital & Clinic (Kowdiar & Kattakada, Thiruvananthapuram).`;

  return {
    title,
    description: description.slice(0, 160),
    keywords: [
      `${condition.title} ayurvedic treatment`,
      `${condition.title} trivandrum`,
      `${condition.title} kerala`,
      "susrutha ayurveda",
    ],
    alternates: {
      canonical: `https://susruthaayurveda.com/conditions/${slug}`,
    },
    openGraph: {
      title,
      description: description.slice(0, 160),
      url: `https://susruthaayurveda.com/conditions/${slug}`,
      images: condition.image || condition.coverImage ? [condition.image || condition.coverImage] : undefined,
    },
  };
}

export default async function ConditionDetailPage({ params }: ConditionDetailPageProps) {
  const { slug } = await params;
  const condition = await getPublicConditionBySlug(slug);

  if (!condition) {
    notFound();
  }

  const conditionSchema = generateMedicalConditionSchema(condition);

  return (
    <SiteShell>
      {conditionSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(conditionSchema) }}
        />
      )}
      <div className="condition-detail-page">
        <ConditionDetailBanner condition={condition} />
        <ConditionDetailCareSection condition={condition} />
      </div>
    </SiteShell>
  );
}
