export function generateMedicalClinicSchema() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Hospital",
        "@id": "https://susruthaayurveda.com/#hospital-kattakada",
        "name": "Susrutha Institute of Ayurvedic Sciences & Panchakarma Hospital",
        "alternateName": ["Susrutha Ayurveda Hospital", "Susrutha Kattakada"],
        "url": "https://susruthaayurveda.com",
        "logo": "https://susruthaayurveda.com/images/logo.webp",
        "image": "https://susruthaayurveda.com/images/hero-courtyard-ayurveda-v2.webp",
        "description": "Authentic Kerala Ayurveda 40-bed Inpatient Hospital and clinical research institute in Kattakada, Thiruvananthapuram. Specializing in classical Panchakarma, non-surgical spine and disc bulge rehabilitation, stroke paralysis recovery, and arthritis care.",
        "telephone": "+91 96566 56736",
        "email": "susruthaayurveda@gmail.com",
        "priceRange": "$$",
        "medicalSpecialty": [
          "Ayurveda",
          "Panchakarma",
          "Neurology",
          "Rheumatology",
          "Orthopedics",
          "Gynaecology",
          "Rehabilitation"
        ],
        "availableService": [
          { "@type": "MedicalProcedure", "name": "Classical Panchakarma Detoxification" },
          { "@type": "MedicalProcedure", "name": "Spine & Disc Bulge Care" },
          { "@type": "MedicalProcedure", "name": "Stroke & Paralysis Rehabilitation" },
          { "@type": "MedicalProcedure", "name": "Ayurvedic Rheumatology & Arthritis Care" },
          { "@type": "MedicalProcedure", "name": "Women's Health & PCOD Management" }
        ],
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
        "areaServed": [
          { "@type": "AdministrativeArea", "name": "Thiruvananthapuram" },
          { "@type": "AdministrativeArea", "name": "Kerala" },
          { "@type": "Country", "name": "India" }
        ],
        "openingHoursSpecification": [
          {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
            "opens": "00:00",
            "closes": "23:59"
          }
        ],
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "name": "Ayurvedic Treatment & Panchakarma Packages",
          "itemListElement": [
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "7-Day Panchakarma Rejuvenation" } },
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "14-Day Chronic Pain & Spine Protocol" } },
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "21-Day Stroke & Neuro Recovery Program" } }
          ]
        }
      },
      {
        "@type": "MedicalClinic",
        "@id": "https://susruthaayurveda.com/#clinic-kowdiar",
        "name": "Susrutha Ayurvedic Clinic & Daycare Panchakarma Centre - Kowdiar",
        "alternateName": ["Susrutha Ayurveda Kowdiar", "Susrutha Kowdiar OP Outlet"],
        "url": "https://susruthaayurveda.com/branches#kowdiar",
        "logo": "https://susruthaayurveda.com/images/logo.webp",
        "image": "https://susruthaayurveda.com/images/opt_spine_joint.jpg",
        "description": "Executive outpatient Ayurvedic clinic, specialist physician consultations, and daycare Panchakarma therapies (Shirodhara, Abhyangam, Kizhi) in the heart of Trivandrum at Kowdiar.",
        "telephone": "+91 80754 33728",
        "email": "susruthaayurveda@gmail.com",
        "priceRange": "$$",
        "parentOrganization": {
          "@id": "https://susruthaayurveda.com/#hospital-kattakada"
        },
        "medicalSpecialty": [
          "Ayurveda",
          "Panchakarma",
          "General Medicine",
          "Joint & Spine Care",
          "Women's Health"
        ],
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
          { "@type": "Place", "name": "Golf Links" },
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
      }
    ]
  };
}

export function generatePhysicianSchema(doctor: any) {
  if (!doctor) return null;
  return {
    "@context": "https://schema.org",
    "@type": "Physician",
    "name": doctor.name || doctor.title,
    "jobTitle": doctor.designation || doctor.role || doctor.meta || "Senior Consultant Ayurvedic Physician",
    "medicalSpecialty": doctor.specialties || doctor.focusAreas || ["Ayurveda", "Panchakarma", "Kaya Chikitsa"],
    "description": doctor.bio || doctor.text || doctor.overview,
    "image": doctor.photoUrl || doctor.photo || doctor.image,
    "worksFor": [
      {
        "@type": "Hospital",
        "name": "Susrutha Institute of Ayurvedic Sciences & Panchakarma Hospital",
        "url": "https://susruthaayurveda.com"
      },
      {
        "@type": "MedicalClinic",
        "name": "Susrutha Ayurvedic Clinic - Kowdiar",
        "url": "https://susruthaayurveda.com/branches#kowdiar"
      }
    ]
  };
}

export function generateMedicalProcedureSchema(treatment: any) {
  if (!treatment) return null;
  return {
    "@context": "https://schema.org",
    "@type": "MedicalProcedure",
    "name": treatment.title || treatment.name,
    "description": treatment.fullDescription || treatment.shortDescription || treatment.text,
    "bodyLocation": treatment.bodyLocation || "Full Body",
    "procedureType": "NoninvasiveProcedure",
    "howPerformed": treatment.procedureDetails || treatment.text || "Administered by trained Ayurvedic therapists under the clinical supervision of senior physicians.",
    "relevantSpecialty": {
      "@type": "MedicalSpecialty",
      "name": "Ayurveda Panchakarma"
    },
    "provider": {
      "@type": "MedicalClinic",
      "name": "Susrutha Ayurveda Hospital & Clinic (Kowdiar & Kattakada)",
      "url": "https://susruthaayurveda.com"
    }
  };
}

export function generateMedicalConditionSchema(condition: any) {
  if (!condition) return null;
  return {
    "@context": "https://schema.org",
    "@type": "MedicalCondition",
    "name": condition.title || condition.name,
    "description": condition.fullDescription || condition.shortDescription || condition.text,
    "possibleTreatment": (condition.recommendedTreatments || []).map((t: any) => ({
      "@type": "MedicalProcedure",
      "name": typeof t === 'string' ? t : t.title
    })),
    "relevantSpecialty": {
      "@type": "MedicalSpecialty",
      "name": "Ayurveda"
    }
  };
}

export function generateFAQPageSchema(faqs: any[]) {
  if (!faqs || !Array.isArray(faqs) || faqs.length === 0) return null;
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map((faq) => ({
      "@type": "Question",
      "name": faq.question || faq.title,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer || faq.text
      }
    }))
  };
}

export function generateBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  };
}
