import Image from "next/image";
import Link from "next/link";
import { PackagesIcon } from "./PackagesIcon";

export type PackageItem = {
  slug?: string;
  icon?: string;
  image?: string;
  meta: string;
  title: string;
  text: string;
  isBackendData?: boolean;
};

type PackageCardProps = {
  item: PackageItem;
};

const PACKAGE_IMAGES: Record<string, string> = {
  "neck-pain-care-package": "/images/treatment-kati-vasti.webp",
  "ano-rectal-care-package-piles-fistula": "/images/village_feature_treatment.jpg",
  "low-back-pain-care-package": "/images/opt_spine_joint.jpg",
  "rejuvenation-package": "/images/treatment-panchakarma.webp",
  "post-natal-care-package-op-ip": "/images/opt_womens_health.jpg",
  "3-days-ayurveda-package": "/images/treatment-sirodhara.webp",
  "panchakarma-detox": "/images/opt_panchakarma.jpg",
  "lifestyle-disorders": "/images/opt_lifestyle_diabetes.jpg",
  "skin-allergies": "/images/opt_skin_allergies.jpg",
  "rheumatology-care": "/images/dept_rheumatology.webp",
  "stroke-rehabilitation": "/images/dept_stroke.webp",
  "fertility-care": "/images/dept_fertilization.webp",
};

function getPackageImage(slug: string, title: string, itemImage?: string): string {
  if (itemImage && !itemImage.includes("placeholder")) return itemImage;
  const normalizedSlug = slug.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

  if (PACKAGE_IMAGES[normalizedSlug]) return PACKAGE_IMAGES[normalizedSlug];

  const lowerTitle = title.toLowerCase();
  if (lowerTitle.includes("neck") || lowerTitle.includes("cervical")) return "/images/treatment-kati-vasti.webp";
  if (lowerTitle.includes("ano") || lowerTitle.includes("rectal") || lowerTitle.includes("piles") || lowerTitle.includes("fistula")) return "/images/village_feature_treatment.jpg";
  if (lowerTitle.includes("back") || lowerTitle.includes("spine") || lowerTitle.includes("lumbar")) return "/images/opt_spine_joint.jpg";
  if (lowerTitle.includes("rejuvenat") || lowerTitle.includes("detox") || lowerTitle.includes("panchakarma")) return "/images/treatment-panchakarma.webp";
  if (lowerTitle.includes("natal") || lowerTitle.includes("women") || lowerTitle.includes("mother")) return "/images/opt_womens_health.jpg";
  if (lowerTitle.includes("3 day") || lowerTitle.includes("siro") || lowerTitle.includes("shirodhara") || lowerTitle.includes("stress")) return "/images/treatment-sirodhara.webp";
  if (lowerTitle.includes("joint") || lowerTitle.includes("rheumat") || lowerTitle.includes("arthrit")) return "/images/dept_rheumatology.webp";
  if (lowerTitle.includes("skin") || lowerTitle.includes("allergy") || lowerTitle.includes("psoriasis")) return "/images/opt_skin_allergies.jpg";
  if (lowerTitle.includes("stroke") || lowerTitle.includes("paralysis") || lowerTitle.includes("neuro")) return "/images/dept_stroke.webp";
  if (lowerTitle.includes("fertilit") || lowerTitle.includes("garbha")) return "/images/dept_fertilization.webp";
  if (lowerTitle.includes("diabet") || lowerTitle.includes("lifestyle")) return "/images/opt_lifestyle_diabetes.jpg";

  return "/images/treatment-njavarakizhi.webp";
}

export function PackageCard({ item }: PackageCardProps) {
  const slug = item.slug || item.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  const imageSrc = getPackageImage(slug, item.title, item.image);

  return (
    <article className="package-card">
      <div className="package-card-thumb">
        <Image
          src={imageSrc}
          alt={item.title}
          width={60}
          height={60}
          unoptimized
          style={{ objectFit: "cover", width: "100%", height: "100%", borderRadius: "50%" }}
        />
      </div>
      <div>
        <span className="package-card-meta">{item.meta}</span>
        <h3>{item.title}</h3>
        <p>{item.text}</p>
        <Link href={`/packages/${slug}`}>
          Explore Package
          <PackagesIcon name="arrow" />
        </Link>
      </div>
    </article>
  );
}
