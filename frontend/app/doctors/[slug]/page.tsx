import { notFound } from "next/navigation";
import { SiteShell } from "../../components/common/SiteShell";
import { DoctorProfilePage } from "../../components/inner/DoctorProfilePage";
import { doctorsDirectory } from "../../data/architecture";

type DoctorDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return doctorsDirectory.map((item) => ({ slug: item.slug }));
}

export default async function DoctorDetailPage({ params }: DoctorDetailPageProps) {
  const { slug } = await params;
  const doctor = doctorsDirectory.find((item) => item.slug === slug);

  if (!doctor) {
    notFound();
  }

  return (
    <SiteShell>
      <DoctorProfilePage doctor={doctor} />
    </SiteShell>
  );
}
