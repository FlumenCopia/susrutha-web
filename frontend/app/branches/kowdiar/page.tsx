import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { SiteShell } from "@/app/components/common/SiteShell";
import { BranchesTrustPanel } from "@/app/components/branches/BranchesTrustPanel";
import { BranchesCTA } from "@/app/components/branches/BranchesCTA";

export const metadata: Metadata = {
  title: "Susrutha Ayurvedic Clinic & Panchakarma Centre Kowdiar | Trivandrum",
  description:
    "Specialist Ayurvedic doctor consultation, Nadi Pariksha, and daycare Panchakarma therapies (Shirodhara, Abhyangam, Kizhi) at Ground Floor, Urbon Heights, Opp. Income Tax Office, Kowdiar, Trivandrum.",
  keywords: [
    "ayurvedic clinic in kowdiar",
    "panchakarma centre kowdiar",
    "ayurvedic doctor in kowdiar",
    "ayurvedic clinic near kowdiar palace",
    "nadi pariksha kowdiar",
    "shirodhara kowdiar trivandrum",
    "ayurvedic doctor kuravankonam",
    "ayurvedic consultation vellayambalam",
  ],
  alternates: {
    canonical: "https://susruthaayurveda.com/branches/kowdiar",
  },
  openGraph: {
    title: "Susrutha Ayurvedic Clinic & Panchakarma Centre Kowdiar | Trivandrum",
    description:
      "Executive outpatient Ayurvedic clinic, specialist consultations, and daycare Panchakarma therapies in the heart of Trivandrum at Kowdiar.",
    url: "https://susruthaayurveda.com/branches/kowdiar",
    images: [{ url: "/images/opt_spine_joint.jpg", width: 1200, height: 630 }],
  },
};

const kowdiarSchema = {
  "@context": "https://schema.org",
  "@type": "MedicalClinic",
  "@id": "https://susruthaayurveda.com/branches/kowdiar#clinic",
  "name": "Susrutha Ayurvedic Clinic & Daycare Panchakarma Centre - Kowdiar",
  "alternateName": ["Susrutha Ayurveda Kowdiar", "Susrutha Kowdiar OP Outlet"],
  "url": "https://susruthaayurveda.com/branches/kowdiar",
  "telephone": "+91 80754 33728",
  "email": "susruthaayurveda@gmail.com",
  "priceRange": "$$",
  "image": "https://susruthaayurveda.com/images/opt_spine_joint.jpg",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Ground Floor, Urbon Heights, Opposite Income Tax Office, Pipelane Road",
    "addressLocality": "Kowdiar, Thiruvananthapuram",
    "addressRegion": "Kerala",
    "postalCode": "695003",
    "addressCountry": "IN"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 8.5241,
    "longitude": 76.9632
  },
  "areaServed": [
    { "@type": "Place", "name": "Kowdiar" },
    { "@type": "Place", "name": "Kuravankonam" },
    { "@type": "Place", "name": "Vellayambalam" },
    { "@type": "Place", "name": "Sasthamangalam" },
    { "@type": "Place", "name": "Pattom" },
    { "@type": "Place", "name": "Jawahar Nagar" },
    { "@type": "AdministrativeArea", "name": "Thiruvananthapuram" }
  ],
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      "opens": "09:00",
      "closes": "19:00"
    }
  ]
};

export default function KowdiarBranchPage() {
  return (
    <SiteShell>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(kowdiarSchema) }}
      />
      <div className="branches-premium-page">
        {/* Kowdiar Dedicated Hero Section */}
        <section className="branches-hero">
          <div className="branches-hero-inner">
            <span className="branches-badge">Executive City OPD & Panchakarma Clinic</span>
            <h1>Susrutha Ayurvedic Clinic & Daycare Panchakarma — Kowdiar</h1>
            <p>
              Located in the heart of Trivandrum at Urbon Heights, Kowdiar. Offering physician-led consultations, 
              pulse diagnosis (Nadi Pariksha), classical daycare Panchakarma therapies, and genuine Ayurvedic medicines.
            </p>
            <div className="branches-hero-actions">
              <Link href="/appointment" className="branches-btn-primary">
                Book Consultation at Kowdiar
              </Link>
              <a href="tel:+918075433728" className="branches-btn-secondary">
                Call: +91 80754 33728
              </a>
            </div>
          </div>
        </section>

        {/* Location & Facility Card */}
        <section className="branches-locations-section" style={{ padding: "3rem 1.5rem" }}>
          <div className="branches-container" style={{ maxWidth: "1100px", margin: "0 auto" }}>
            <div className="branch-location-card" style={{ gridTemplateColumns: "1fr" }}>
              <div className="branch-location-image" style={{ height: "350px", position: "relative" }}>
                <Image
                  src="/images/opt_spine_joint.jpg"
                  alt="Susrutha Ayurvedic Clinic Kowdiar Trivandrum"
                  fill
                  style={{ objectFit: "cover" }}
                />
                <span>Kowdiar Executive Clinic</span>
              </div>
              <div className="branch-location-body">
                <h3>Susrutha Panchakarma Hospital OP Outlet — Kowdiar</h3>
                <p className="branch-location-address">
                  Ground Floor, Urbon Heights, Opposite Income Tax Office, Pipelane Road, Kowdiar, Trivandrum - 695003
                </p>
                <p className="branch-location-description">
                  Conveniently situated just 2 minutes from Kowdiar Palace, our city clinic provides direct access to 
                  senior Ayurvedic Vaidyas without traveling outside the city. Ideal for working professionals, residents of 
                  Kowdiar, Kuravankonam, Vellayambalam, and Sasthamangalam seeking targeted pain relief, stress management, and rejuvenation.
                </p>

                <div className="branch-location-meta" style={{ margin: "1.5rem 0" }}>
                  <span>
                    <strong>Hours:</strong> 09:00 AM - 07:00 PM (Monday - Sunday)
                  </span>
                  <a href="tel:+918075433728">
                    <strong>Direct Desk:</strong> +91 80754 33728
                  </a>
                </div>

                <h4 style={{ fontSize: "1.1rem", marginBottom: "0.75rem", color: "#1b4332" }}>
                  Key Services Available at Kowdiar:
                </h4>
                <div className="branch-location-tags">
                  <span>Specialist OPD Consultations</span>
                  <span>Nadi Pariksha (Pulse Diagnosis)</span>
                  <span>Daycare Panchakarma Therapies</span>
                  <span>Shirodhara & Abhyangam</span>
                  <span>Kizhi (Podikizhi, Elakizhi)</span>
                  <span>Kati Basti & Greeva Basti</span>
                  <span>Susrutha Pharmacy Medicine Counter</span>
                  <span>Lifestyle & Diet Counseling</span>
                </div>

                <div style={{ marginTop: "2rem" }}>
                  <h4 style={{ fontSize: "1.1rem", marginBottom: "0.5rem", color: "#1b4332" }}>Consulting Physicians:</h4>
                  <ul style={{ listStyle: "disc", paddingLeft: "1.25rem", color: "#4a5568", lineHeight: "1.8" }}>
                    <li><strong>Dr. Krishnakumar K., MD (Ayur)</strong> — Chief Consultant Physician</li>
                    <li><strong>Dr. Sreeja Krishna S., BAMS</strong> — Senior Consultant Physician</li>
                  </ul>
                </div>

                <div style={{ marginTop: "2rem", display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                  <a
                    href="https://maps.google.com/?q=Susrutha+Panchakarma+Hospital+OP+Outlet+Kowdiar"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="branches-btn-secondary"
                    style={{ textDecoration: "none" }}
                  >
                    Open in Google Maps &rarr;
                  </a>
                  <Link href="/appointment" className="branches-btn-primary" style={{ textDecoration: "none" }}>
                    Book Kowdiar Appointment
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        <BranchesTrustPanel />
        <BranchesCTA />
      </div>
    </SiteShell>
  );
}
