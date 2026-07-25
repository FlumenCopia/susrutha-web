import { notFound } from "next/navigation";
import { SiteShell } from "../../components/common/SiteShell";
import { InnerPage } from "../../components/inner/InnerPage";
import { doctorsDirectory, type PageContent } from "../../data/architecture";

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

  const content: PageContent = {
    eyebrow: "Doctor Profile",
    title: doctor.title,
    description: doctor.meta,
    breadcrumbs: [
      { label: "Home", href: "/" },
      { label: "Doctors", href: "/doctors" },
      { label: doctor.title, href: `/doctors/${doctor.slug}` },
    ],
    intro: doctor.text,
    highlights: [
      { title: "Qualification", text: doctor.meta },
      { title: "Experience", text: "Profile section for clinical focus, years of practice, and patient care approach." },
      { title: "Appointment CTA", text: "Patients can book directly from the profile.", href: "/appointment" },
    ],
    sections: [
      { title: "Profile sections", text: "The doctor profile pattern supports all content a patient expects before booking.", items: ["Bio", "Qualifications", "Specialities", "Availability", "Treatments", "Book appointment"] },
    ],
    cta: { title: `Book with ${doctor.title}`, text: "Select a preferred date and consultation slot through the appointment flow.", href: "/appointment", label: "Book Appointment" },
  };

  return (
    <SiteShell>
      <InnerPage content={content} />
    </SiteShell>
  );
}
