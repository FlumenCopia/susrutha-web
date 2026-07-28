import { notFound } from "next/navigation";
import { SiteShell } from "../../components/common/SiteShell";
import { TreatmentDetailReferencePage } from "../../components/inner/TreatmentDetailReferencePage";
import { treatments } from "../../data/architecture";

type TreatmentDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return treatments.map((item) => ({ slug: item.slug }));
}

export default async function TreatmentDetailPage({ params }: TreatmentDetailPageProps) {
  const { slug } = await params;
  const treatment = treatments.find((item) => item.slug === slug);

  if (!treatment) {
    notFound();
  }

  return (
    <SiteShell>
      <TreatmentDetailReferencePage treatment={treatment} />
    </SiteShell>
  );
}
