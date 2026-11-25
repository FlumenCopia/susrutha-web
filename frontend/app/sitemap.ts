import { MetadataRoute } from "next";
import {
  getPublicTreatments,
  getPublicConditions,
  getPublicBlogs,
  getPublicDoctors,
  getPublicPackages,
} from "./services/api";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://susruthaayurveda.com";
  const now = new Date();

  // Core high-priority static pages
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${baseUrl}`, lastModified: now, changeFrequency: "daily", priority: 1.0 },
    { url: `${baseUrl}/branches`, lastModified: now, changeFrequency: "weekly", priority: 0.95 },
    { url: `${baseUrl}/branches/kowdiar`, lastModified: now, changeFrequency: "weekly", priority: 0.95 },
    { url: `${baseUrl}/branches/kattakada`, lastModified: now, changeFrequency: "weekly", priority: 0.95 },
    { url: `${baseUrl}/treatments`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/conditions`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/doctors`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/appointment`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/packages`, lastModified: now, changeFrequency: "weekly", priority: 0.85 },
    { url: `${baseUrl}/international-patients`, lastModified: now, changeFrequency: "weekly", priority: 0.85 },
    { url: `${baseUrl}/about-us`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/contact-us`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/ayurveda-village`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/facilities`, lastModified: now, changeFrequency: "monthly", priority: 0.75 },
    { url: `${baseUrl}/patient-care`, lastModified: now, changeFrequency: "monthly", priority: 0.75 },
    { url: `${baseUrl}/testimonials`, lastModified: now, changeFrequency: "weekly", priority: 0.75 },
    { url: `${baseUrl}/blogs`, lastModified: now, changeFrequency: "weekly", priority: 0.75 },
    { url: `${baseUrl}/video-gallery`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: `${baseUrl}/gallery`, lastModified: now, changeFrequency: "monthly", priority: 0.65 },
    { url: `${baseUrl}/faq`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/affiliations`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${baseUrl}/privacy-policy`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${baseUrl}/terms`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
  ];

  // Dynamic treatments
  let treatmentRoutes: MetadataRoute.Sitemap = [];
  try {
    const treatments = await getPublicTreatments();
    if (Array.isArray(treatments)) {
      treatmentRoutes = treatments
        .filter((t: any) => t && t.slug)
        .map((t: any) => ({
          url: `${baseUrl}/treatments/${t.slug}`,
          lastModified: t.updatedAt ? new Date(t.updatedAt) : now,
          changeFrequency: "weekly" as const,
          priority: 0.9,
        }));
    }
  } catch (e) {
    console.error("Error fetching treatments for sitemap:", e);
  }

  // Dynamic conditions
  let conditionRoutes: MetadataRoute.Sitemap = [];
  try {
    const conditions = await getPublicConditions();
    if (Array.isArray(conditions)) {
      conditionRoutes = conditions
        .filter((c: any) => c && c.slug)
        .map((c: any) => ({
          url: `${baseUrl}/conditions/${c.slug}`,
          lastModified: c.updatedAt ? new Date(c.updatedAt) : now,
          changeFrequency: "weekly" as const,
          priority: 0.9,
        }));
    }
  } catch (e) {
    console.error("Error fetching conditions for sitemap:", e);
  }

  // Dynamic doctors
  let doctorRoutes: MetadataRoute.Sitemap = [];
  try {
    const doctors = await getPublicDoctors();
    if (Array.isArray(doctors)) {
      doctorRoutes = doctors
        .filter((d: any) => d && d.slug)
        .map((d: any) => ({
          url: `${baseUrl}/doctors/${d.slug}`,
          lastModified: d.updatedAt ? new Date(d.updatedAt) : now,
          changeFrequency: "monthly" as const,
          priority: 0.85,
        }));
    }
  } catch (e) {
    console.error("Error fetching doctors for sitemap:", e);
  }

  // Dynamic blogs
  let blogRoutes: MetadataRoute.Sitemap = [];
  try {
    const blogs = await getPublicBlogs();
    if (Array.isArray(blogs)) {
      blogRoutes = blogs
        .filter((b: any) => b && b.slug)
        .map((b: any) => ({
          url: `${baseUrl}/blogs/${b.slug}`,
          lastModified: b.updatedAt ? new Date(b.updatedAt) : now,
          changeFrequency: "weekly" as const,
          priority: 0.8,
        }));
    }
  } catch (e) {
    console.error("Error fetching blogs for sitemap:", e);
  }

  // Dynamic care packages
  let packageRoutes: MetadataRoute.Sitemap = [];
  try {
    const packages = await getPublicPackages();
    if (Array.isArray(packages)) {
      packageRoutes = packages
        .filter((p: any) => p && p.slug)
        .map((p: any) => ({
          url: `${baseUrl}/packages/${p.slug}`,
          lastModified: p.updatedAt ? new Date(p.updatedAt) : now,
          changeFrequency: "weekly" as const,
          priority: 0.85,
        }));
    }
  } catch (e) {
    console.error("Error fetching care packages for sitemap:", e);
  }

  return [
    ...staticRoutes,
    ...treatmentRoutes,
    ...conditionRoutes,
    ...doctorRoutes,
    ...blogRoutes,
    ...packageRoutes,
  ];
}
