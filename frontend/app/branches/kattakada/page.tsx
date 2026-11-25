import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { SiteShell } from "@/app/components/common/SiteShell";
import { BranchesTrustPanel } from "@/app/components/branches/BranchesTrustPanel";
import { BranchesCTA } from "@/app/components/branches/BranchesCTA";

export const metadata: Metadata = {
  title: "Susrutha 40-Bed Ayurvedic Hospital Campus Kattakada | Thiruvananthapuram",
  description:
    "Flagship 40-bed inpatient hospital, NABH-standard Panchakarma suites, non-surgical spine care, and intensive stroke rehabilitation opposite Christian College, Kattakada, Trivandrum.",
  keywords: [
    "ayurvedic hospital kattakada",
    "panchakarma hospital trivandrum",
    "inpatient ayurvedic care kerala",
    "susrutha kattakada campus",
    "stroke rehabilitation hospital trivandrum",
    "spine care ayurvedic hospital kerala",
  ],
  alternates: {
    canonical: "https://susruthaayurveda.com/branches/kattakada",
  },
  openGraph: {
    title: "Susrutha 40-Bed Ayurvedic Hospital Campus Kattakada | Thiruvananthapuram",
    description:
      "Full inpatient facilities, clinical research institute, and 24x7 Ayurvedic emergency & nursing care in Kattakada.",
    url: "https://susruthaayurveda.com/branches/kattakada",
    images: [{ url: "/images/banner_welcome.webp", width: 1200, height: 630 }],
  },
};

const kattakadaSchema = {
  "@context": "https://schema.org",
  "@type": "Hospital",
  "@id": "https://susruthaayurveda.com/branches/kattakada#hospital",
  "name": "Susrutha Institute of Ayurvedic Sciences & Panchakarma Hospital - Kattakada",
  "alternateName": ["Susrutha Hospital Campus", "Susrutha Kattakada"],
  "url": "https://susruthaayurveda.com/branches/kattakada",
  "telephone": "0471-2291027",
  "email": "susruthaayurveda@gmail.com",
  "priceRange": "$$",
  "image": "https://susruthaayurveda.com/images/banner_welcome.webp",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Opposite Christian College, Kattakada-Killi Main Road",
    "addressLocality": "Kattakada, Thiruvananthapuram",
    "addressRegion": "Kerala",
    "postalCode": "695572",
    "addressCountry": "IN"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 8.5085,
    "longitude": 77.0805
  },
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      "opens": "00:00",
      "closes": "23:59"
    }
  ]
};

export default function KattakadaBranchPage() {
  return (
    <SiteShell>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(kattakadaSchema) }}
      />
      <div className="branches-premium-page">
        {/* Kattakada Hero Section */}
        <section className="branches-hero">
          <div className="branches-hero-inner">
            <span className="branches-badge">Flagship 40-Bed Inpatient Campus</span>
            <h1>Susrutha Institute of Ayurvedic Sciences — Kattakada Campus</h1>
            <p>
              Our flagship hospital campus providing 24x7 residential Ayurvedic healthcare, NABH-standard Panchakarma 
              therapy suites, intensive stroke rehabilitation, physiotherapy, and herbal pharmacy.
            </p>
            <div className="branches-hero-actions">
              <Link href="/appointment" className="branches-btn-primary">
                Book Hospital Admission / OPD
              </Link>
              <a href="tel:04712291027" className="branches-btn-secondary">
                Call: 0471-2291027
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
                  src="/images/banner_welcome.webp"
                  alt="Susrutha Ayurveda Hospital Kattakada Campus"
                  fill
                  style={{ objectFit: "cover" }}
                />
                <span>Main Hospital Campus</span>
              </div>
              <div className="branch-location-body">
                <h3>Susrutha Institute of Ayurvedic Sciences & Panchakarma Hospital</h3>
                <p className="branch-location-address">
                  Opposite Christian College, Kattakada, Thiruvananthapuram, Kerala - 695572
                </p>
                <p className="branch-location-description">
                  Equipped with 40 inpatient beds across private and executive AC rooms, specialized Panchakarma suites, 
                  yoga halls, and an in-house pharmacy producing authentic Kerala herbal formulations. Supervised around the 
                  clock by resident physicians and trained therapists.
                </p>

                <div className="branch-location-meta" style={{ margin: "1.5rem 0" }}>
                  <span>
                    <strong>Care:</strong> 24x7 Inpatient Admissions | OPD: 09:00 AM - 07:00 PM
                  </span>
                  <a href="tel:04712291027">
                    <strong>Hospital Line:</strong> 0471-2291027
                  </a>
                </div>

                <h4 style={{ fontSize: "1.1rem", marginBottom: "0.75rem", color: "#1b4332" }}>
                  Campus Facilities & Clinical Departments:
                </h4>
                <div className="branch-location-tags">
                  <span>24x7 Inpatient Nursing Care</span>
                  <span>Classical Panchakarma Suites</span>
                  <span>Stroke & Neuro Rehabilitation Wing</span>
                  <span>Non-Surgical Spine Clinic</span>
                  <span>Ayurvedic Gynaecology & Infertility</span>
                  <span>Physiotherapy & Yoga Unit</span>
                  <span>GMP-Standard In-house Pharmacy</span>
                  <span>Pure Ayurvedic Sattvic Dining</span>
                </div>

                <div style={{ marginTop: "2rem" }}>
                  <h4 style={{ fontSize: "1.1rem", marginBottom: "0.5rem", color: "#1b4332" }}>Consultant Physicians:</h4>
                  <ul style={{ listStyle: "disc", paddingLeft: "1.25rem", color: "#4a5568", lineHeight: "1.8" }}>
                    <li><strong>Dr. Krishnakumar K., MD (Ayur)</strong> — Chief Physician (Spine & Kaya Chikitsa)</li>
                    <li><strong>Dr. Sreeja Krishna S., BAMS</strong> — Senior Physician (General & Lifestyle)</li>
                    <li><strong>Dr. Priyanka R., BAMS, MS (Ayur)</strong> — Ayurvedic Gynaecologist & Obstetrician</li>
                  </ul>
                </div>

                <div style={{ marginTop: "2rem", display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                  <a
                    href="https://maps.google.com/?q=Susrutha+Institute+of+Ayurvedic+Sciences+and+Panchakarma+Hospital+Kattakada"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="branches-btn-secondary"
                    style={{ textDecoration: "none" }}
                  >
                    Open in Google Maps &rarr;
                  </a>
                  <Link href="/appointment" className="branches-btn-primary" style={{ textDecoration: "none" }}>
                    Book Inpatient / Consultation
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
