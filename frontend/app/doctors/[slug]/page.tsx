import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SiteShell } from "../../components/common/SiteShell";
import { DoctorProfilePage } from "../../components/inner/DoctorProfilePage";
import { getPublicDoctorBySlug, getPublicDoctors } from "../../services/api";
import { generatePhysicianSchema } from "../../utils/jsonLd";

type DoctorDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: DoctorDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const doctor = await getPublicDoctorBySlug(slug);

  if (!doctor) {
    return {
      title: "Doctor Profile | Susrutha Ayurveda",
    };
  }

  const title = `${doctor.name} - ${doctor.designation || doctor.role || doctor.meta || "Ayurvedic Physician"} | Susrutha Ayurveda`;
  const description =
    doctor.bio ||
    doctor.overview ||
    doctor.text ||
    `Consult ${doctor.name} at Susrutha Ayurveda Hospital & Clinic in Thiruvananthapuram (Kowdiar & Kattakada). Specialized in classical Ayurveda and Panchakarma care.`;

  return {
    title,
    description: description.slice(0, 160),
    keywords: [
      doctor.name,
      `${doctor.name} trivandrum`,
      "ayurvedic doctor kowdiar",
      "ayurvedic physician thiruvananthapuram",
      "susrutha ayurveda doctors",
    ],
    alternates: {
      canonical: `https://susruthaayurveda.com/doctors/${slug}`,
    },
    openGraph: {
      title,
      description: description.slice(0, 160),
      url: `https://susruthaayurveda.com/doctors/${slug}`,
      images: doctor.photoUrl || doctor.photo || doctor.image ? [doctor.photoUrl || doctor.photo || doctor.image] : undefined,
    },
  };
}

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
