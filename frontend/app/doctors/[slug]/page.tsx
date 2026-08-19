import { notFound } from "next/navigation";
import { SiteShell } from "../../components/common/SiteShell";
import { DoctorProfilePage } from "../../components/inner/DoctorProfilePage";
import { getPublicDoctorBySlug, getPublicDoctors } from "../../services/api";
import { generatePhysicianSchema } from "../../utils/jsonLd";

type DoctorDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamic = "force-dynamic";

export default async function DoctorDetailPage({ params }: DoctorDetailPageProps) {
  const { slug } = await params;
  const doctor = await getPublicDoctorBySlug(slug);

  if (!doctor) {
    notFound();
  }

  const physicianSchema = generatePhysicianSchema(doctor);

  return (
    <SiteShell>
      {physicianSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(physicianSchema) }}
        />
      )}
      <DoctorProfilePage doctor={doctor} />
    </SiteShell>
  );
}

