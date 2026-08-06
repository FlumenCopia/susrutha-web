export function generateMedicalClinicSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "MedicalClinic",
    "name": "Susrutha Ayurvedhik Hospital & Research Center",
    "alternateName": "Susrutha Ayurveda",
    "url": "https://susruthaayurveda.com",
    "logo": "https://susruthaayurveda.com/images/logo.webp",
    "description": "Research-backed authentic Kerala Ayurveda hospital, clinical research institute, Panchakarma suites, and city outpatient clinic.",
    "telephone": "+91 96566 56736",
    "email": "kattakada@susruthaayurveda.com",
    "address": [
      {
        "@type": "PostalAddress",
        "streetAddress": "Kattakada-Killi Main Road",
        "addressLocality": "Kattakada, Thiruvananthapuram",
        "addressRegion": "Kerala",
        "postalCode": "695572",
        "addressCountry": "IN"
      },
      {
        "@type": "PostalAddress",
        "streetAddress": "Kowdiar Palace Road",
        "addressLocality": "Kowdiar, Thiruvananthapuram",
        "addressRegion": "Kerala",
        "postalCode": "695003",
        "addressCountry": "IN"
      }
    ],
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 8.5085,
      "longitude": 77.0805
    },
    "openingHours": "Mo-Su 09:00-19:00",
    "priceRange": "$$"
  };
}

export function generatePhysicianSchema(doctor: any) {
  if (!doctor) return null;
  return {
    "@context": "https://schema.org",
    "@type": "Physician",
    "name": doctor.name || doctor.title,
    "jobTitle": doctor.designation || doctor.meta,
    "medicalSpecialty": doctor.specialties || doctor.focusAreas || ["Ayurveda", "Panchakarma"],
    "description": doctor.bio || doctor.text,
    "image": doctor.photoUrl || doctor.photo || doctor.image,
    "worksFor": {
      "@type": "MedicalClinic",
      "name": "Susrutha Ayurvedhik Hospital & Research Center",
      "url": "https://susruthaayurveda.com"
    }
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
    "howPerformed": treatment.procedureDetails || treatment.text,
    "relevantSpecialty": {
      "@type": "MedicalSpecialty",
      "name": "Ayurveda Panchakarma"
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
    }))
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
