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

async function fetchApiData<T>(endpoint: string, defaultVal: T = [] as any): Promise<T> {
  try {
    const res = await fetch(`${API_BASE_URL}${endpoint}`, {
      cache: "no-store",
    });
    if (!res.ok) {
      return defaultVal;
    }
    const json = await res.json();
    if (json.success && json.data !== undefined) {
      return json.data;
    }
    return defaultVal;
  } catch (error) {
    console.error(`Error fetching ${endpoint}:`, error);
    return defaultVal;
  }
}

export async function getPublicDoctors(departmentSlug?: string) {
  const endpoint = departmentSlug ? `/doctors?category=${encodeURIComponent(departmentSlug)}&limit=50` : "/doctors";
  return fetchApiData<any[]>(endpoint, []);
}

export async function getPublicDoctorsByDepartment(departmentSlug?: string, branchCode?: string) {
  const params = new URLSearchParams({ limit: "50" });
  if (departmentSlug && departmentSlug.toLowerCase() !== "all") {
    params.set("category", departmentSlug);
  }
  if (branchCode) params.set("branchCode", branchCode.toUpperCase());
  return fetchApiData<any[]>(`/doctors?${params.toString()}`, []);
}

export async function getPublicDoctorBySlug(slug: string) {
  const data = await fetchApiData<any>(`/doctors/${encodeURIComponent(slug)}`, null);
  if (data) return data;
  const all = await getPublicDoctors();
  return Array.isArray(all) ? all.find((d: any) => d.slug === slug || d._id === slug || d.id === slug) || null : null;
}

export async function getPublicTreatments() {
  return fetchApiData<any[]>("/treatments", []);
}

export async function getPublicTreatmentBySlug(slug: string) {
  const data = await fetchApiData<any>(`/treatments/${encodeURIComponent(slug)}`, null);
  if (data) return data;
  const all = await getPublicTreatments();
  return Array.isArray(all) ? all.find((t: any) => t.slug === slug || t._id === slug || t.id === slug) || null : null;
}

export async function getPublicConditions() {
  return fetchApiData<any[]>("/conditions", []);
}

export async function getPublicConditionBySlug(slug: string) {
  const data = await fetchApiData<any>(`/conditions/${encodeURIComponent(slug)}`, null);
  if (data) return data;
  const all = await getPublicConditions();
  return Array.isArray(all) ? all.find((c: any) => c.slug === slug || c._id === slug || c.id === slug) || null : null;
}

export async function getPublicPackages() {
  return fetchApiData<any[]>("/packages", []);
}

export async function getPublicPackageBySlug(slug: string) {
  const data = await fetchApiData<any>(`/packages/${encodeURIComponent(slug)}`, null);
  if (data) return data;
  const all = await getPublicPackages();
  return Array.isArray(all) ? all.find((p: any) => p.slug === slug || p._id === slug || p.id === slug) || null : null;
}

export async function getPublicBlogs() {
  return fetchApiData<any[]>("/blogs", []);
}

export async function getPublicBlogBySlug(slug: string) {
  const data = await fetchApiData<any>(`/blogs/${encodeURIComponent(slug)}`, null);
  if (data) return data;
  const all = await getPublicBlogs();
  return Array.isArray(all) ? all.find((b: any) => b.slug === slug || b._id === slug || b.id === slug) || null : null;
}

export async function getPublicFAQs() {
  return fetchApiData<any[]>("/faqs", []);
}

export async function getPublicBranches() {
  return fetchApiData<any[]>("/branches", []);
}

export async function getPublicInfrastructure() {
  return fetchApiData<any[]>("/facilities", []);
}

export async function getPublicFacilities() {
  return fetchApiData<any[]>("/facilities", []);
}

export async function getPublicTestimonials() {
  return fetchApiData<any[]>("/testimonials", []);
}

export async function getPublicDepartments() {
  return fetchApiData<any[]>("/departments", []);
}

export async function getPublicVideos() {
  return fetchApiData<any[]>("/videos", []);
}

export async function getPublicMedia() {
  return fetchApiData<any[]>("/media", []);
}

export async function getPublicEcosystem() {
  return fetchApiData<any[]>("/ecosystem", []);
}

export async function submitContactEnquiry(payload: { name: string; phone: string; email?: string; subject?: string; message?: string }) {
  const res = await fetch(`${API_BASE_URL}/contact`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return res.json();
}


