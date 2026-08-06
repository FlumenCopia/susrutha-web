import { doctorsDirectory, treatments } from "../data/architecture";
import { conditionDetails } from "../data/conditions";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1/public";

export function getImageDisplayUrl(url?: string | null): string {
  if (!url || typeof url !== 'string' || url.trim() === '') return '/uploads/slider_1.webp';
  if (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('data:')) return url;
  if (url.startsWith('/images/')) return url;
  const apiBase = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1/public';
  const hostBase = apiBase.replace(/\/api\/v1.*$/, '').replace(/\/+$/, '');
  const cleanPath = url.startsWith('/') ? url : `/${url}`;
  return `${hostBase}${cleanPath}`;
}


async function fetchWithFallback<T>(endpoint: string, fallbackData: T): Promise<T> {
  try {
    const res = await fetch(`${API_BASE_URL}${endpoint}`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) {
      return fallbackData;
    }
    const json = await res.json();
    if (json.success && json.data) {
      return json.data;
    }
    return fallbackData;
  } catch (error) {
    return fallbackData;
  }
}

export async function getPublicDoctors(departmentSlug?: string) {
  const endpoint = departmentSlug ? `/doctors?category=${encodeURIComponent(departmentSlug)}&limit=50` : "/doctors";
  return fetchWithFallback(endpoint, doctorsDirectory);
}

export async function getPublicDoctorsByDepartment(departmentSlug?: string, branchCode?: string) {
  const params = new URLSearchParams({ limit: "50" });
  if (departmentSlug && departmentSlug.toLowerCase() !== "all") {
    params.set("category", departmentSlug);
  }
  if (branchCode) params.set("branchCode", branchCode.toUpperCase());
  return fetchWithFallback(`/doctors?${params.toString()}`, []);
}

export async function getPublicDoctorBySlug(slug: string) {
  const all = await getPublicDoctors();
  const found = Array.isArray(all) ? all.find((d: any) => d.slug === slug || d.id === slug) : null;
  return found || doctorsDirectory.find((d) => d.slug === slug) || null;
}

export async function getPublicTreatments() {
  return fetchWithFallback("/treatments", treatments);
}

export async function getPublicTreatmentBySlug(slug: string) {
  const all = await getPublicTreatments();
  const found = Array.isArray(all) ? all.find((t: any) => t.slug === slug || t.id === slug) : null;
  return found || treatments.find((t) => t.slug === slug) || null;
}

export async function getPublicConditions() {
  return fetchWithFallback("/conditions", conditionDetails);
}

export async function getPublicConditionBySlug(slug: string) {
  const all = await getPublicConditions();
  const found = Array.isArray(all) ? all.find((c: any) => c.slug === slug || c.id === slug) : null;
  return found || conditionDetails.find((c) => c.slug === slug) || null;
}

export async function getPublicPackages() {
  return fetchWithFallback("/packages", []);
}

export async function getPublicBlogs() {
  return fetchWithFallback("/blogs", []);
}

export async function getPublicFAQs() {
  return fetchWithFallback("/faqs", []);
}

export async function getPublicBranches() {
  return fetchWithFallback("/branches", []);
}

export async function getPublicInfrastructure() {
  return fetchWithFallback("/facilities", []);
}

export async function getPublicFacilities() {
  return fetchWithFallback("/facilities", []);
}

export async function getPublicTestimonials() {
  return fetchWithFallback("/testimonials", []);
}

export async function getPublicDepartments() {
  return fetchWithFallback("/departments", []);
}

export async function getPublicVideos() {
  return fetchWithFallback("/videos", []);
}

export async function getPublicMedia() {
  return fetchWithFallback("/media", []);
}

export async function getPublicEcosystem() {
  return fetchWithFallback("/ecosystem", []);
}

export async function submitContactEnquiry(payload: { name: string; phone: string; email?: string; subject?: string; message?: string }) {
  const res = await fetch(`${API_BASE_URL}/contact`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return res.json();
}

