import { notFound } from "next/navigation";
import { SiteShell } from "../../components/common/SiteShell";
import { InnerPage } from "../../components/inner/InnerPage";
import { treatments, type PageContent } from "../../data/architecture";

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

  const content: PageContent = {
    eyebrow: "Treatment",
    title: treatment.title,
    description: treatment.text,
    breadcrumbs: [
      { label: "Home", href: "/" },
      { label: "Treatments", href: "/treatments" },
      { label: treatment.title, href: `/treatments/${treatment.slug}` },
    ],
    intro: `${treatment.title} is presented as a treatment detail page with patient-friendly education, consultation context, care process, related treatments, and appointment actions.`,
    highlights: [
      { title: "Who It Helps", text: "Patients are guided after physician assessment, diagnosis, and suitability review.", meta: treatment.meta },
      { title: "Care Process", text: "Consultation, therapy planning, medicines, diet guidance, and follow-up are connected in one journey." },
      { title: "Related Doctors", text: "Profiles and availability can be attached by specialty and department.", href: "/doctors" },
    ],
    sections: [
      { title: "Treatment detail sections", text: "Every treatment detail page keeps the same structure for clarity and SEO.", items: ["Overview", "Benefits", "Procedure", "Duration", "Related treatments", "Doctor CTA"] },
      { title: "Related treatments", text: "Cross-links help patients compare options and continue toward appointment booking.", items: treatments.slice(0, 5).map((item) => item.title) },
    ],
    cta: { title: `Consult for ${treatment.title}`, text: "Book a doctor consultation to understand whether this treatment is appropriate for your condition.", href: "/appointment", label: "Book Appointment" },
  };

  return (
    <SiteShell>
      <InnerPage content={content} />
    </SiteShell>
  );
}
