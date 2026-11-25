import type { Metadata } from "next";
import { SiteShell } from "../components/common/SiteShell";
import { BlogPremiumPage } from "../components/blog/BlogPremiumPage";

export const metadata: Metadata = {
  title: "Ayurvedic Health Insights, Wellness Tips & Treatment Guides | Susrutha Ayurveda",
  description:
    "Read clinically verified articles on Ayurveda, Panchakarma benefits, diet, spine care, and lifestyle wisdom by senior Ayurvedic physicians in Thiruvananthapuram, Kerala.",
  keywords: [
    "ayurveda blog kerala",
    "panchakarma benefits articles",
    "ayurvedic doctor tips trivandrum",
    "susrutha health insights",
    "ayurvedic treatment guides",
  ],
  alternates: {
    canonical: "https://susruthaayurveda.com/blogs",
  },
  openGraph: {
    title: "Ayurvedic Health Insights, Wellness Tips & Treatment Guides | Susrutha Ayurveda",
    description:
      "Expert health articles, dietary recommendations, and classical Ayurvedic insights by practicing physicians at Susrutha Ayurveda.",
    url: "https://susruthaayurveda.com/blogs",
  },
};

export default function BlogsPage() {
  return (
    <SiteShell>
      <BlogPremiumPage />
    </SiteShell>
  );
}
