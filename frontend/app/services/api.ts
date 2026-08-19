const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1/public";

export function getImageDisplayUrl(url?: string | null): string {
  if (!url || typeof url !== 'string' || url.trim() === '') return '';
  if (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('data:')) return url;
  if (url.startsWith('/images/')) return url;
  const apiBase = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1/public';
  const hostBase = apiBase.replace(/\/api\/v1.*$/, '').replace(/\/+$/, '');
  const cleanPath = url.startsWith('/') ? url : `/${url}`;
  return `${hostBase}${cleanPath}`;
}

export type PaginatedResult<T> = {
  items: T[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasMore: boolean;
  };
};

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

export async function fetchApiDataWithPagination<T>(endpoint: string): Promise<PaginatedResult<T>> {
  const defaultMeta = { total: 0, page: 1, limit: 8, totalPages: 1, hasMore: false };
  try {
    const res = await fetch(`${API_BASE_URL}${endpoint}`, { cache: "no-store" });
    if (!res.ok) return { items: [], pagination: defaultMeta };
    const json = await res.json();
    if (json.success && json.data !== undefined) {
      const items = Array.isArray(json.data) ? json.data : [];
      const rawMeta = json.meta || json.pagination || {};
      const total = rawMeta.total ?? items.length;
      const page = rawMeta.page ?? 1;
      const limit = rawMeta.limit ?? (items.length || 8);
      const totalPages = rawMeta.totalPages ?? (Math.ceil(total / limit) || 1);
      const hasMore = page < totalPages;

      return {
        items,
        pagination: { total, page, limit, totalPages, hasMore },
      };
    }
    return { items: [], pagination: defaultMeta };
  } catch (error) {
    console.error(`Error fetching ${endpoint}:`, error);
    return { items: [], pagination: defaultMeta };
  }
}

export async function getPublicDoctors(departmentSlug?: string) {
  const endpoint = departmentSlug ? `/doctors?category=${encodeURIComponent(departmentSlug)}&limit=50` : "/doctors?limit=50";
  return fetchApiData<any[]>(endpoint, []);
}

export async function getPublicDoctorsPaginated(queryParams?: { category?: string; branchCode?: string; search?: string; page?: number; limit?: number }) {
  const params = new URLSearchParams();
  if (queryParams?.category && queryParams.category.toLowerCase() !== "all") params.set("category", queryParams.category);
  if (queryParams?.branchCode) params.set("branchCode", queryParams.branchCode.toUpperCase());
  if (queryParams?.search) params.set("search", queryParams.search);
  params.set("page", String(queryParams?.page || 1));
  params.set("limit", String(queryParams?.limit || 6));
  return fetchApiDataWithPagination<any>(`/doctors?${params.toString()}`);
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

export async function getPublicTreatmentCategories() {
  return fetchApiData<string[]>("/treatment-categories", []);
}

export async function getPublicTreatments(queryParams?: { category?: string; sort?: string; page?: number; limit?: number; search?: string }) {
  if (!queryParams) {
    return fetchApiData<any[]>("/treatments?limit=50", []);
  }
  const params = new URLSearchParams();
  if (queryParams.category) params.set("category", queryParams.category);
  if (queryParams.sort) params.set("sort", queryParams.sort);
  if (queryParams.page) params.set("page", queryParams.page.toString());
  if (queryParams.limit) params.set("limit", queryParams.limit.toString());
  if (queryParams.search) params.set("search", queryParams.search);

  return fetchApiDataWithPagination<any>(`/treatments?${params.toString()}`);
}

export async function getPublicTreatmentBySlug(slug: string) {
  const data = await fetchApiData<any>(`/treatments/${encodeURIComponent(slug)}`, null);
  if (data) return data;
  const all = await getPublicTreatments();
  const items = Array.isArray(all) ? all : (all as any).items || [];
  return items.find((t: any) => t.slug === slug || t._id === slug || t.id === slug) || null;
}

export async function getPublicConditions(queryParams?: { page?: number; limit?: number; category?: string; search?: string }) {
  if (!queryParams) return fetchApiData<any[]>("/conditions?limit=50", []);
  const params = new URLSearchParams();
  if (queryParams.page) params.set("page", String(queryParams.page));
  if (queryParams.limit) params.set("limit", String(queryParams.limit));
  if (queryParams.category) params.set("category", queryParams.category);
  if (queryParams.search) params.set("search", queryParams.search);
  return fetchApiDataWithPagination<any>(`/conditions?${params.toString()}`);
}

export async function getPublicConditionBySlug(slug: string) {
  const data = await fetchApiData<any>(`/conditions/${encodeURIComponent(slug)}`, null);
  if (data) return data;
  const all = await getPublicConditions();
  const items = Array.isArray(all) ? all : (all as any).items || [];
  return items.find((c: any) => c.slug === slug || c._id === slug || c.id === slug) || null;
}

export async function getPublicPackages(queryParams?: { page?: number; limit?: number; category?: string; search?: string }) {
  if (!queryParams) return fetchApiData<any[]>("/packages?limit=50", []);
  const params = new URLSearchParams();
  if (queryParams.page) params.set("page", String(queryParams.page));
  if (queryParams.limit) params.set("limit", String(queryParams.limit));
  if (queryParams.category) params.set("category", queryParams.category);
  if (queryParams.search) params.set("search", queryParams.search);
  return fetchApiDataWithPagination<any>(`/packages?${params.toString()}`);
}

export async function getPublicPackageBySlug(slug: string) {
  const data = await fetchApiData<any>(`/packages/${encodeURIComponent(slug)}`, null);
  if (data) return data;
  const all = await getPublicPackages();
  const items = Array.isArray(all) ? all : (all as any).items || [];
  return items.find((p: any) => p.slug === slug || p._id === slug || p.id === slug) || null;
}

export async function getPublicBlogs(queryParams?: { page?: number; limit?: number; category?: string; search?: string }) {
  if (!queryParams) return fetchApiData<any[]>("/blogs?limit=50", []);
  const params = new URLSearchParams();
  if (queryParams.page) params.set("page", String(queryParams.page));
  if (queryParams.limit) params.set("limit", String(queryParams.limit));
  if (queryParams.category) params.set("category", queryParams.category);
  if (queryParams.search) params.set("search", queryParams.search);
  return fetchApiDataWithPagination<any>(`/blogs?${params.toString()}`);
}

export async function getPublicBlogBySlug(slug: string) {
  const data = await fetchApiData<any>(`/blogs/${encodeURIComponent(slug)}`, null);
  if (data) return data;
  const all = await getPublicBlogs();
  const items = Array.isArray(all) ? all : (all as any).items || [];
  return items.find((b: any) => b.slug === slug || b._id === slug || b.id === slug) || null;
}

export async function getPublicFAQs() {
  return fetchApiData<any[]>("/faqs?limit=50", []);
}

export async function getPublicBranches() {
  return fetchApiData<any[]>("/branches?limit=50", []);
}

export async function getPublicInfrastructure() {
  return fetchApiData<any[]>("/facilities?limit=50", []);
}

export async function getPublicFacilities() {
  return fetchApiData<any[]>("/facilities?limit=50", []);
}

export async function getPublicTestimonials() {
  return fetchApiData<any[]>("/testimonials?limit=50", []);
}

export async function getPublicDepartments() {
  return fetchApiData<any[]>("/departments?limit=50", []);
}

export async function getPublicVideos(queryParams?: { page?: number; limit?: number; category?: string }) {
  if (!queryParams) return fetchApiData<any[]>("/videos?limit=50", []);
  const params = new URLSearchParams();
  if (queryParams.page) params.set("page", String(queryParams.page));
  if (queryParams.limit) params.set("limit", String(queryParams.limit));
  if (queryParams.category) params.set("category", queryParams.category);
  return fetchApiDataWithPagination<any>(`/videos?${params.toString()}`);
}

export async function getPublicMedia() {
  return fetchApiData<any[]>("/media?limit=50", []);
}

export async function getPublicEcosystem() {
  return fetchApiData<any[]>("/ecosystem?limit=50", []);
}

export async function getPublicGalleryAlbums(queryParams?: { page?: number; limit?: number }) {
  if (!queryParams) return fetchApiData<any[]>("/gallery?limit=50", []);
  const params = new URLSearchParams();
  if (queryParams.page) params.set("page", String(queryParams.page));
  if (queryParams.limit) params.set("limit", String(queryParams.limit));
  return fetchApiDataWithPagination<any>(`/gallery?${params.toString()}`);
}

export async function getPublicSettings() {
  return fetchApiData<Record<string, any>>("/settings", {});
}

export async function submitContactEnquiry(payload: { name: string; phone: string; email?: string; subject?: string; message?: string }) {
  const res = await fetch(`${API_BASE_URL}/contact`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return res.json();
}
