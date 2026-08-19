import { notFound } from "next/navigation";
import { SiteShell } from "../../components/common/SiteShell";
import { TreatmentDetailReferencePage } from "../../components/inner/TreatmentDetailReferencePage";
import { getPublicTreatmentBySlug, getPublicTreatments } from "../../services/api";
import { generateMedicalProcedureSchema } from "../../utils/jsonLd";

type TreatmentDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamic = "force-dynamic";

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

