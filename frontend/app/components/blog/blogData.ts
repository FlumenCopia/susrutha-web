export type Article = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
  image: string;
};

export type BlogAuthor = {
  name: string;
  role: string;
  image: string;
};

export const blogCategories = ["All", "Technology", "Design", "Business", "Innovation", "Insights"];

export function getArticleCardSize(index: number) {
  if (index % 5 === 0) return "wide";
  if (index % 3 === 0) return "tall";
  return "standard";
}

export const blogArticles: Article[] = [
  {
    slug: "panchakarma-preparation-guide",
    title: "A Clear, Calm Guide to Preparing for Panchakarma",
    excerpt: "How consultation, diet, rest, and therapy timing come together before a classical cleansing journey.",
    category: "Insights",
    author: "Dr. Krishnakumar K.",
    date: "Aug 01, 2026",
    readTime: "7 min read",
    image: "/images/treatment-panchakarma.webp",
  },
  {
    slug: "ayurveda-for-back-pain",
    title: "Rethinking Back Pain Through Ayurveda and Recovery Design",
    excerpt: "An expert-led look at pain, posture, mobility, oil therapies, and strengthening routines.",
    category: "Design",
    author: "Dr. Rajesh R.",
    date: "Jul 26, 2026",
    readTime: "6 min read",
    image: "/images/treatment-kati-vasti.webp",
  },
  {
    slug: "seasonal-wellness-ayurveda",
    title: "Seasonal Wellness Systems for Better Energy",
    excerpt: "Practical routines for digestion, immunity, sleep, and preventive health through seasonal shifts.",
    category: "Innovation",
    author: "Dr. Anju S.",
    date: "Jul 18, 2026",
    readTime: "5 min read",
    image: "/images/about-purpose-still-life.webp",
  },
  {
    slug: "panchakarma-preparation-guide",
    title: "Inside a Modern Ayurveda Hospital Care Journey",
    excerpt: "What a patient experiences from first consultation to inpatient rhythm and physician review.",
    category: "Business",
    author: "Care Team",
    date: "Jul 09, 2026",
    readTime: "8 min read",
    image: "/images/ayurveda-hospital-garden.webp",
  },
  {
    slug: "ayurveda-for-back-pain",
    title: "The Future of Integrative Pain Care",
    excerpt: "How clinical planning, traditional therapy, and lifestyle intelligence can support long-term comfort.",
    category: "Technology",
    author: "Research Desk",
    date: "Jun 30, 2026",
    readTime: "9 min read",
    image: "/images/doctors-ayurveda-mortar-hero.webp",
  },
  {
    slug: "seasonal-wellness-ayurveda",
    title: "Daily Rituals That Make Preventive Care Feel Effortless",
    excerpt: "A refined editorial guide to food timing, rest, movement, and practical self-observation.",
    category: "Insights",
    author: "Wellness Team",
    date: "Jun 21, 2026",
    readTime: "4 min read",
    image: "/images/faq-ayurveda-still-life.webp",
  },
];

export const blogAuthors: BlogAuthor[] = [
  { name: "Dr. Krishnakumar K.", role: "Senior Ayurveda Physician", image: "/images/doctor-portrait.webp" },
  { name: "Dr. Priyanka R.", role: "Women's Health Specialist", image: "/images/doctor-meera-das.webp" },
  { name: "Research Desk", role: "Clinical Insights Team", image: "/images/founder-arjun-das.webp" },
];

export const trendingArticles = blogArticles.concat(blogArticles.slice(0, 2));
