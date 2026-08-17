import { SiteShell } from "../components/common/SiteShell";
import { InnerPage } from "../components/inner/InnerPage";
import { basePages } from "../data/architecture";
import { getPublicFAQs } from "../services/api";
import { generateFAQPageSchema } from "../utils/jsonLd";

export const dynamic = "force-dynamic";

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
