import { SiteShell } from "../components/common/SiteShell";
import { InnerPage } from "../components/inner/InnerPage";
import { basePages } from "../data/architecture";
import { getPublicFAQs } from "../services/api";
import { generateFAQPageSchema } from "../utils/jsonLd";

export default async function FaqPage() {
  const faqs = await getPublicFAQs();
  const faqSchema = generateFAQPageSchema(faqs.length > 0 ? faqs : [
    { question: "What is Panchakarma treatment?", answer: "Panchakarma is a 5-step Ayurvedic detoxification and rejuvenation procedure." },
    { question: "Where is Susrutha Ayurvedhik Hospital located?", answer: "Kattakada 40-Bed Inpatient Hospital and Kowdiar City OP Clinic in Thiruvananthapuram, Kerala." },
    { question: "How can I book an appointment?", answer: "You can book online through our website or call +91 96566 56736." }
  ]);

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
