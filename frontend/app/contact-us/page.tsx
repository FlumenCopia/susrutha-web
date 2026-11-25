import type { Metadata } from "next";
import { SiteShell } from "../components/common/SiteShell";
import { ContactReferencePage } from "../components/contact/ContactReferencePage";

export const metadata: Metadata = {
  title: "Contact Susrutha Ayurveda Hospital & Clinic | Kowdiar & Kattakada, Trivandrum",
  description:
    "Get in touch with Susrutha Ayurveda. Book doctor consultations and Panchakarma therapies at our Kowdiar City Clinic (+91 80754 33728) or Kattakada Hospital Campus (0471-2291027).",
  keywords: [
    "contact susrutha ayurveda",
    "ayurvedic clinic kowdiar phone number",
    "susrutha kattakada phone",
    "ayurveda consultation booking trivandrum",
    "ayurvedic hospital address kowdiar",
  ],
  alternates: {
    canonical: "https://susruthaayurveda.com/contact-us",
  },
  openGraph: {
    title: "Contact Susrutha Ayurveda Hospital & Clinic | Kowdiar & Kattakada, Trivandrum",
    description:
      "Direct contact details and appointment booking for Susrutha Ayurveda Hospital & Clinic in Kowdiar and Kattakada, Thiruvananthapuram.",
    url: "https://susruthaayurveda.com/contact-us",
  },
};

export default function ContactUsPage() {
  return (
    <SiteShell>
      <ContactReferencePage />
    </SiteShell>
  );
}
