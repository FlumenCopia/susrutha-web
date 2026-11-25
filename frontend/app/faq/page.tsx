import type { Metadata } from "next";
import { SiteShell } from "../components/common/SiteShell";
import { InnerPage } from "../components/inner/InnerPage";
import { basePages } from "../data/architecture";
import { getPublicFAQs } from "../services/api";
import { generateFAQPageSchema } from "../utils/jsonLd";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Frequently Asked Questions (FAQ) | Susrutha Ayurveda Hospital & Clinic",
  description:
    "Find answers about Ayurvedic consultation, Panchakarma duration, treatment costs, insurance coverage, Kowdiar OPD timings, and inpatient facilities at Susrutha Ayurveda.",
  keywords: [
    "ayurveda faq trivandrum",
    "panchakarma cost questions",
    "susrutha opd timings kowdiar",
    "ayurvedic medical insurance coverage",
  ],
  alternates: {
    canonical: "https://susruthaayurveda.com/faq",
  },
  openGraph: {
    title: "Frequently Asked Questions (FAQ) | Susrutha Ayurveda Hospital & Clinic",
    description:
      "Clear answers to common questions about treatments, admissions, doctor appointments, and therapies at Susrutha Ayurveda.",
    url: "https://susruthaayurveda.com/faq",
  },
};

export default async function FaqPage() {
  const faqs = await getPublicFAQs();
  const faqSchema = generateFAQPageSchema(faqs);

  const pageContent = Array.isArray(faqs) && faqs.length > 0
    ? {
        ...basePages.faq,
        sections: basePages.faq.sections.map((sec: any) => {
          if (sec.type === "faq") {
            return {
              ...sec,
              items: faqs.map((f: any) => ({
                question: f.question || f.q,
                answer: f.answer || f.a,
                category: f.category || "General",
              })),
            };
          }
          return sec;
        }),
      }
    : basePages.faq;

  return (
    <SiteShell>
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
      <InnerPage content={pageContent} />
    </SiteShell>
  );
}
