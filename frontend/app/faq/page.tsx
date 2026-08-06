import { SiteShell } from "../components/common/SiteShell";
import { InnerPage } from "../components/inner/InnerPage";
import { basePages } from "../data/architecture";
import { getPublicFAQs } from "../services/api";
import { generateFAQPageSchema } from "../utils/jsonLd";

export const dynamic = "force-dynamic";

export default async function FaqPage() {
  const faqs = await getPublicFAQs();
  const faqSchema = generateFAQPageSchema(faqs);

  return (
    <SiteShell>
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
      <InnerPage content={basePages.faq} />
    </SiteShell>
  );
}
