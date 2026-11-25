import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SiteShell } from "../../components/common/SiteShell";
import { TreatmentDetailReferencePage } from "../../components/inner/TreatmentDetailReferencePage";
import { getPublicTreatmentBySlug, getPublicTreatments } from "../../services/api";
import { generateMedicalProcedureSchema } from "../../utils/jsonLd";

type TreatmentDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: TreatmentDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const treatment = await getPublicTreatmentBySlug(slug);

  if (!treatment) {
    return {
      title: "Treatment Details | Susrutha Ayurveda",
    };
  }

  const title = `${treatment.title || "Ayurvedic Treatment"} in Trivandrum, Kerala | Susrutha Ayurveda`;
  const description =
    treatment.shortDescription ||
    treatment.overview ||
    treatment.text ||
    `Specialized Ayurvedic care for ${treatment.title}. Classical Panchakarma protocols supervised by senior physicians in Kowdiar and Kattakada campuses, Thiruvananthapuram.`;

  return {
    title,
    description: description.slice(0, 160),
    keywords: [
      treatment.title,
      `${treatment.title} trivandrum`,
      `${treatment.title} ayurveda kerala`,
      "panchakarma kowdiar",
      "susrutha ayurveda",
    ],
    alternates: {
      canonical: `https://susruthaayurveda.com/treatments/${slug}`,
    },
    openGraph: {
      title,
      description: description.slice(0, 160),
      url: `https://susruthaayurveda.com/treatments/${slug}`,
      images: treatment.image || treatment.coverImage ? [treatment.image || treatment.coverImage] : undefined,
    },
  };
}

export default async function TreatmentDetailPage({ params }: TreatmentDetailPageProps) {
  const { slug } = await params;
  const treatment = await getPublicTreatmentBySlug(slug);

  if (!treatment) {
    notFound();
  }

  const procedureSchema = generateMedicalProcedureSchema(treatment);

  return (
    <SiteShell>
      {procedureSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(procedureSchema) }}
        />
      )}
      <TreatmentDetailReferencePage treatment={treatment} />
    </SiteShell>
  );
}
