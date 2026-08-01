export type LinkItem = {
  label: string;
  href: string;
  children?: LinkItem[];
};

export type CardItem = {
  title: string;
  text: string;
  href?: string;
  meta?: string;
};

export type PageContent = {
  eyebrow: string;
  title: string;
  description: string;
  breadcrumbs: LinkItem[];
  intro: string;
  highlights: CardItem[];
  sections: {
    title: string;
    text: string;
    items: string[];
  }[];
  cta?: {
    title: string;
    text: string;
    href: string;
    label: string;
  };
};

export type DoctorDirectoryItem = {
  slug: string;
  title: string;
  meta: string;
  text: string;
  image?: string;
  experience?: string;
  patients?: string;
  availability?: string;
  languages?: string[];
  credentials?: string[];
  focusAreas?: string[];
  approach?: string[];
  quote?: string;
};

export const completeSitemap: LinkItem[] = [
  { label: "Home", href: "/" },
  {
    label: "About Us",
    href: "/about-us",
  },
  {
    label: "Treatments",
    href: "/treatments",
    children: [
      { label: "All Treatments", href: "/treatments" },
      { label: "Panchakarma", href: "/treatments/panchakarma" },
      { label: "Women's Health", href: "/treatments/womens-health" },
      { label: "Child Care", href: "/treatments/child-care" },
      { label: "Orthopaedics", href: "/treatments/orthopaedics" },
      { label: "Neurology", href: "/treatments/neurology" },
      { label: "Skin Care", href: "/treatments/skin-care" },
      { label: "Lifestyle Disorders", href: "/treatments/lifestyle-disorders" },
    ],
  },
  {
    label: "Doctors",
    href: "/doctors",
    children: [
      { label: "Dr. Krishnakumar K.", href: "/doctors/dr-krishnakumar-k" },
      { label: "Dr. Sreeja Krishna S.", href: "/doctors/dr-sreeja-krishna-s" },
      { label: "Dr. Priyanka R.", href: "/doctors/dr-priyanka-r" },
      { label: "Dr. Rajesh R.", href: "/doctors/dr-rajesh-r" },
      { label: "Dr. Anju S.", href: "/doctors/dr-anju-s" },
    ],
  },
  { label: "Departments", href: "/departments" },
  { label: "Services", href: "/services" },
  { label: "Facilities", href: "/facilities" },
  { label: "Patient Care", href: "/patient-care" },
  { label: "Testimonials", href: "/testimonials" },
  { label: "Gallery", href: "/gallery" },
  {
    label: "Blog",
    href: "/blogs",
    children: [
      { label: "Blog Listing", href: "/blogs" },
      { label: "Blog Details", href: "/blogs/panchakarma-preparation-guide" },
    ],
  },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact-us" },
  { label: "Book Appointment", href: "/appointment" },
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms & Conditions", href: "/terms" },
  { label: "404 Page", href: "/not-found" },
];

export const desktopNavigation: LinkItem[] = [
  {
    label: "Treatments",
    href: "/treatments",
    children: [
      { label: "Panchakarma", href: "/treatments/panchakarma" },
      { label: "Abhyanga", href: "/treatments/abhyangam" },
      { label: "Shirodhara", href: "/treatments/shirodhara" },
      { label: "Kizhi (Herbal Bolus Fomentation)", href: "/treatments/njavarakizhi" },
      { label: "Kati Basti / Greeva Basti", href: "/treatments/kati-basti" },
      { label: "Vasti (Medicated Enema Therapy)", href: "/treatments/basti" },
      { label: "Kshara Sutra", href: "/treatments/herbal-medicine" },
      { label: "Rejuvenation & Rasayana Therapies", href: "/treatments/lifestyle-disorders" },
    ],
  },
  {
    label: "Conditions",
    href: "/conditions",
    children: [
      { label: "Spine & Joints", href: "/conditions/spine-joints" },
      { label: "Neuro Rehab", href: "/conditions/neuro-rehab" },
      { label: "Rheumatology", href: "/conditions/rheumatology" },
      { label: "Women's Health", href: "/conditions/womens-health" },
      { label: "Paediatrics", href: "/conditions/paediatrics" },
      { label: "Preventive Care", href: "/conditions/preventive-care" },
      { label: "General Medicine", href: "/conditions/general-medicine" },
      { label: "Proctology", href: "/conditions/proctology" },
    ],
  },
  {
    label: "Doctors",
    href: "/doctors",
    children: [
      { label: "All Doctors", href: "/doctors" },
      { label: "Dr. Krishnakumar K.", href: "/doctors/dr-krishnakumar-k" },
      { label: "Dr. Sreeja Krishna S.", href: "/doctors/dr-sreeja-krishna-s" },
      { label: "Dr. Priyanka R.", href: "/doctors/dr-priyanka-r" },
      { label: "Dr. Rajesh R.", href: "/doctors/dr-rajesh-r" },
    ],
  },
  {
    label: "Explore",
    href: "/about-us",
    children: [
      { label: "About & legacy", href: "/about-us" },
      { label: "Branches", href: "/branches" },
      { label: "Ayur Village", href: "/facilities" },
      { label: "Packages", href: "/services" },
      { label: "Knowledge Centre", href: "/blogs" },
      { label: "International patients", href: "/patient-care" },
      { label: "Ecosystem", href: "/departments" },
      { label: "Facilities", href: "/facilities" },
      { label: "Video gallery", href: "/gallery" },
      { label: "Media", href: "/media" },
      { label: "Blog", href: "/blogs" },
    ],
  },
  { label: "Contact", href: "/contact-us" },
];

export const footerNavigation = [
  {
    title: "Quick Links",
    links: [
      { label: "Home", href: "/" },
      { label: "About Us", href: "/about-us" },
      { label: "Doctors", href: "/doctors" },
      { label: "Treatments", href: "/treatments" },
      { label: "Gallery", href: "/gallery" },
      { label: "Blogs", href: "/blogs" },
    ],
  },
  {
    title: "Patient Links",
    links: [
      { label: "Book Appointment", href: "/appointment" },
      { label: "Patient Care", href: "/patient-care" },
      { label: "Facilities", href: "/facilities" },
      { label: "FAQ", href: "/faq" },
      { label: "Contact Us", href: "/contact-us" },
      { label: "Testimonials", href: "/testimonials" },
    ],
  },
  {
    title: "Useful Links",
    links: [
      { label: "Departments", href: "/departments" },
      { label: "Services", href: "/services" },
      { label: "Privacy Policy", href: "/privacy-policy" },
      { label: "Terms & Conditions", href: "/terms" },
      { label: "Sitemap", href: "/sitemap" },
    ],
  },
];

export const treatments = [
  {
    slug: "panchakarma",
    title: "Panchakarma",
    meta: "Detoxification and rejuvenation",
    text: "A physician-guided cleansing programme for restoring balance, improving digestion, and supporting long-term wellness.",
    image: "/images/treatment-panchakarma.webp",
  },
  {
    slug: "abhyangam",
    title: "Abhyangam",
    meta: "60 - 90 mins",
    text: "A therapeutic full-body oil massage for relaxation, nourishment, circulation, and body-mind balance.",
    image: "/images/treatment-sirodhara.webp",
  },
  {
    slug: "shirodhara",
    title: "Shirodhara",
    meta: "30 - 45 mins",
    text: "A gentle stream of warm medicated oil used in physician-guided care for stress, sleep, and nervous system calm.",
    image: "/images/treatment-sirodhara.webp",
  },
  {
    slug: "swedana",
    title: "Swedana",
    meta: "20 - 30 mins",
    text: "Herbal steam therapy used to support detoxification, circulation, stiffness relief, and preparatory Ayurvedic care.",
    image: "/images/faq-ayurveda-still-life.webp",
  },
  {
    slug: "nasya",
    title: "Nasya",
    meta: "20 - 30 mins",
    text: "Nasal therapy used in guided care for sinus clearance, head and neck balance, and respiratory comfort.",
    image: "/images/treatment-herbal-medicine.webp",
  },
  {
    slug: "pizhichil",
    title: "Pizhichil",
    meta: "60 - 90 mins",
    text: "Warm herbal oil bath therapy used to support pain relief, nourishment, relaxation, and rejuvenation.",
    image: "/images/treatment-sirodhara.webp",
  },
  {
    slug: "udvarthanam",
    title: "Udvarthanam",
    meta: "45 - 60 mins",
    text: "A herbal powder therapy used to support metabolism, lymphatic flow, fatigue reduction, and body lightness.",
    image: "/images/treatment-njavarakizhi.webp",
  },
  {
    slug: "basti",
    title: "Basti",
    meta: "30 - 45 mins",
    text: "A classical medicated enema therapy used in physician-directed Panchakarma care to balance Vata and cleanse the colon.",
    image: "/images/faq-ayurveda-still-life.webp",
  },
  {
    slug: "kati-basti",
    title: "Kati Basti",
    meta: "30 - 45 mins",
    text: "Localized warm oil therapy for lower back pain, stiffness, spine comfort, and mobility support.",
    image: "/images/treatment-kati-vasti.webp",
  },
  {
    slug: "garshanam",
    title: "Garshanam",
    meta: "30 - 45 mins",
    text: "Silk glove massage used to support lymphatic flow, exfoliation, skin health, and energizing body care.",
    image: "/images/treatment-kati-vasti.webp",
  },
  {
    slug: "womens-health",
    title: "Women's Health",
    meta: "Gynaecology, fertility, postnatal care",
    text: "Ayurveda-led support for menstrual health, fertility preparation, antenatal wellness, and postnatal recovery.",
    image: "/images/ayurveda-hero.webp",
  },
  {
    slug: "child-care",
    title: "Child Care",
    meta: "Paediatric Ayurveda",
    text: "Gentle care plans for immunity, digestion, growth milestones, recurrent allergies, and child wellness.",
    image: "/images/about-susrutha-wellness.webp",
  },
  {
    slug: "orthopaedics",
    title: "Orthopaedics",
    meta: "Back, neck, joint care",
    text: "Integrated support for pain, stiffness, injury recovery, arthritis, and spine-related discomfort.",
    image: "/images/treatment-kati-vasti.webp",
  },
  {
    slug: "neurology",
    title: "Neurology",
    meta: "Stroke and nerve rehabilitation",
    text: "Structured care for stroke rehabilitation, nerve weakness, mobility challenges, and chronic neurological conditions.",
    image: "/images/treatment-njavarakizhi.webp",
  },
  {
    slug: "skin-care",
    title: "Skin Care",
    meta: "Dermatology and wellness",
    text: "Internal and external therapies for skin balance, inflammation, sensitivity, and recurrent dermatological concerns.",
    image: "/images/treatment-herbal-medicine.webp",
  },
  {
    slug: "lifestyle-disorders",
    title: "Lifestyle Disorders",
    meta: "Metabolic and preventive care",
    text: "Diet, lifestyle, medicine, and therapy plans for diabetes support, weight management, stress, and digestion.",
    image: "/images/faq-ayurveda-still-life.webp",
  },
  {
    slug: "sirodhara",
    title: "Sirodhara",
    meta: "Relaxation therapy",
    text: "A calming oil-stream therapy used in physician-directed programmes for sleep, stress, and nervous system balance.",
    image: "/images/treatment-sirodhara.webp",
  },
  {
    slug: "njavarakizhi",
    title: "Njavarakizhi",
    meta: "Nourishing poultice therapy",
    text: "A classical therapy using medicated rice boluses to support strength, flexibility, and recovery.",
    image: "/images/treatment-njavarakizhi.webp",
  },
  {
    slug: "kati-vasti",
    title: "Kati Vasti",
    meta: "Lower back care",
    text: "Localized oil therapy used as part of lower back pain, stiffness, and spine-care programmes.",
    image: "/images/treatment-kati-vasti.webp",
  },
  {
    slug: "herbal-medicine",
    title: "Herbal Medicine",
    meta: "Classical formulations",
    text: "Customized prescriptions and pharmacy support aligned to diagnosis, constitution, and treatment goals.",
    image: "/images/treatment-herbal-medicine.webp",
  },
];

export const doctorsDirectory: DoctorDirectoryItem[] = [
  {
    slug: "dr-nikhil-sharma",
    title: "Dr. Nikhil Sharma",
    meta: "Founder & Chief Physician | Panchakarma and Holistic Care",
    text: "Founder physician guiding Panchakarma, detoxification, rejuvenation, and holistic Ayurveda care with a patient-first approach.",
    image: "/images/founder-nikhil-sharma.webp",
    experience: "18+ Years",
    patients: "12K+",
    availability: "Mon, Wed, Fri",
    languages: ["English", "Malayalam", "Hindi"],
    credentials: ["Founder & Chief Physician", "Panchakarma planning", "Holistic chronic care"],
    focusAreas: ["Panchakarma detox", "Chronic wellness", "Digestive balance", "Rejuvenation care"],
    approach: ["Detailed constitution assessment", "Physician-guided therapy plan", "Diet and routine correction", "Follow-up wellness review"],
    quote: "Healing works best when classical Ayurveda is personalized with clarity, patience, and trust.",
  },
  {
    slug: "dr-meera-iyer",
    title: "Dr. Meera Iyer",
    meta: "Founder & Wellness Director | Women's Health and Preventive Care",
    text: "Wellness director focused on women's health, nutrition, preventive Ayurveda, and balanced lifestyle planning.",
    image: "/images/founder-meera-iyer.webp",
    experience: "15+ Years",
    patients: "9K+",
    availability: "Tue, Thu, Sat",
    languages: ["English", "Malayalam", "Tamil"],
    credentials: ["Founder & Wellness Director", "Women's health guidance", "Nutrition and preventive Ayurveda"],
    focusAreas: ["Women's wellness", "Preventive care", "Nutrition planning", "Lifestyle balance"],
    approach: ["Personal wellness mapping", "Nutrition-led care plan", "Gentle therapy selection", "Long-term lifestyle support"],
    quote: "A balanced life is built through small daily choices, supported by compassionate clinical care.",
  },
  {
    slug: "dr-arjun-das",
    title: "Dr. Arjun Das",
    meta: "Founder & Research Director | Ayurvedic Research and Evidence-Based Care",
    text: "Research director supporting evidence-based Ayurvedic protocols, clinical quality, and patient education.",
    image: "/images/founder-arjun-das.webp",
    experience: "12+ Years",
    patients: "7K+",
    availability: "Mon, Thu, Sat",
    languages: ["English", "Malayalam", "Hindi"],
    credentials: ["Founder & Research Director", "Evidence-based Ayurveda", "Clinical quality systems"],
    focusAreas: ["Ayurvedic research", "Protocol planning", "Patient education", "Preventive health"],
    approach: ["Evidence-informed consultation", "Structured treatment protocol", "Outcome tracking", "Clear patient education"],
    quote: "Modern Ayurvedic care should be measurable, thoughtful, and deeply rooted in classical wisdom.",
  },
  {
    slug: "dr-krishnakumar-k",
    title: "Dr. Krishnakumar K.",
    meta: "MD (Ayur) | Senior Ayurveda Physician",
    text: "Consultation for chronic conditions, Panchakarma planning, and long-term Ayurveda care journeys.",
    image: "/images/doctor-portrait.webp",
    experience: "20+ Years",
    patients: "15K+",
    availability: "On appointment",
    languages: ["English", "Malayalam"],
    credentials: ["MD (Ayur)", "Senior Ayurveda Physician", "Chronic disease consultation"],
    focusAreas: ["Chronic conditions", "Panchakarma planning", "Pain management", "Long-term Ayurveda care"],
    approach: ["Clinical assessment", "Root-cause care planning", "Therapy and medicine guidance", "Review-based optimization"],
    quote: "A careful diagnosis helps every treatment become more precise and meaningful.",
  },
  {
    slug: "dr-sreeja-krishna-s",
    title: "Dr. Sreeja Krishna S.",
    meta: "BAMS, MBA Hospital Management",
    text: "Patient-centred consultations with focus on branch care coordination and follow-up planning.",
    image: "/images/doctor-portrait.webp",
    experience: "12+ Years",
    patients: "8K+",
    availability: "Tue, Thu, Sat",
    languages: ["English", "Malayalam"],
    credentials: ["BAMS", "MBA Hospital Management", "Patient-care coordination"],
    focusAreas: ["Consultation planning", "Follow-up care", "Branch coordination", "Preventive wellness"],
    approach: ["Patient history review", "Care coordination", "Follow-up scheduling", "Family guidance"],
    quote: "Good care feels organized, understandable, and available when patients need support.",
  },
  {
    slug: "dr-priyanka-r",
    title: "Dr. Priyanka R.",
    meta: "BAMS, MS (Ayur) | Gynaecology and Obstetrics",
    text: "Specialist support for women's health, fertility, antenatal wellness, and postnatal care.",
    image: "/images/doctor-portrait.webp",
    experience: "10+ Years",
    patients: "6K+",
    availability: "Sun, Mon, Wed, Fri",
    languages: ["English", "Malayalam"],
    credentials: ["BAMS", "MS (Ayur)", "Ayurvedic Gynaecology and Obstetrics"],
    focusAreas: ["Women's health", "Fertility support", "Antenatal wellness", "Postnatal care"],
    approach: ["Sensitive consultation", "Stage-wise care planning", "Diet and routine support", "Continuity of care"],
    quote: "Women's healthcare needs trust, patience, and care that respects every stage of life.",
  },
  {
    slug: "dr-rajesh-r",
    title: "Dr. Rajesh R.",
    meta: "BAMS, MD (Ayur) | Panchakarma Specialist",
    text: "Focused consultation for Panchakarma planning, pain management, rejuvenation care, and chronic wellness programmes.",
    image: "/images/doctor-portrait.webp",
    experience: "14+ Years",
    patients: "10K+",
    availability: "On appointment",
    languages: ["English", "Malayalam", "Hindi"],
    credentials: ["BAMS", "MD (Ayur)", "Panchakarma Specialist"],
    focusAreas: ["Panchakarma therapy", "Pain care", "Rejuvenation", "Chronic wellness"],
    approach: ["Therapy eligibility check", "Purification planning", "Daily monitoring", "Post-therapy rasayana care"],
    quote: "Classical Panchakarma needs careful timing, preparation, and physician supervision.",
  },
  {
    slug: "dr-anju-s",
    title: "Dr. Anju S.",
    meta: "BAMS | Lifestyle and Preventive Ayurveda",
    text: "Patient guidance for lifestyle disorders, diet correction, preventive wellness, digestion, stress, and follow-up care.",
    image: "/images/doctor-portrait.webp",
    experience: "8+ Years",
    patients: "5K+",
    availability: "Mon, Wed, Fri",
    languages: ["English", "Malayalam"],
    credentials: ["BAMS", "Lifestyle Ayurveda", "Preventive wellness care"],
    focusAreas: ["Lifestyle disorders", "Diet correction", "Digestive wellness", "Stress balance"],
    approach: ["Habit and diet review", "Practical routine design", "Medicine and therapy support", "Progress tracking"],
    quote: "Prevention becomes possible when health routines feel realistic and sustainable.",
  },
];

export const blogPosts = [
  {
    slug: "panchakarma-preparation-guide",
    title: "How to Prepare for Panchakarma",
    meta: "Patient Guide",
    text: "A simple preparation guide covering consultation, diet, schedule expectations, rest, and follow-up care.",
  },
  {
    slug: "ayurveda-for-back-pain",
    title: "Ayurveda Care for Back Pain",
    meta: "Treatment Education",
    text: "How classical therapies, lifestyle correction, and strengthening plans work together in spine care.",
  },
  {
    slug: "seasonal-wellness-ayurveda",
    title: "Seasonal Wellness with Ayurveda",
    meta: "Wellness",
    text: "Practical routines for food, sleep, digestion, immunity, and preventive health through seasonal transitions.",
  },
];

export const featureList = [
  "Sticky header",
  "Mobile navigation",
  "Dropdown navigation",
  "Breadcrumbs",
  "Treatment listing and detail pages",
  "Doctor listing and profile pages",
  "Appointment booking form",
  "Contact form",
  "WhatsApp and call actions",
  "Blog listing and detail pages",
  "Gallery sections for images and video placeholders",
  "FAQ accordions",
  "SEO URLs, metadata, Open Graph, and schema-ready content",
];

export const userFlows = [
  "Home -> Treatment Listing -> Treatment Detail -> Choose Doctor -> Book Appointment -> Confirmation",
  "Home -> Doctors -> Doctor Profile -> Book Appointment",
  "Home -> Blogs -> Blog Detail -> Related Blogs",
  "Home -> Contact -> Submit Enquiry -> Success",
  "Home -> Facilities -> Patient Care -> Book Appointment",
];

export const componentReusePlan = [
  "Navbar and dropdowns for desktop navigation",
  "Mobile details menu for compact navigation",
  "Hero banner language for inner page intros",
  "Gold CTA buttons from the approved Home Page",
  "Treatment cards for listings and related content",
  "Doctor cards for profile previews",
  "Section headers with eyebrow labels",
  "Footer CTA and footer link columns",
  "Form controls using rounded ivory fields and gold focus states",
  "FAQ/detail panels using the existing card border and shadow rhythm",
];

export const nextFolderStructure = [
  "app/",
  "app/about-us/",
  "app/treatments/",
  "app/treatments/[slug]/",
  "app/doctors/",
  "app/doctors/[slug]/",
  "app/departments/",
  "app/services/",
  "app/facilities/",
  "app/patient-care/",
  "app/testimonials/",
  "app/gallery/",
  "app/blogs/",
  "app/blogs/[slug]/",
  "app/faq/",
  "app/contact-us/",
  "app/appointment/",
  "app/privacy-policy/",
  "app/terms/",
  "app/not-found.tsx",
];

export const seoStructure = [
  "Human-readable slugs for every treatment, doctor, and article",
  "Route-specific titles and descriptions",
  "Open Graph image fallback from the approved hero and treatment imagery",
  "Organization, MedicalBusiness, Physician, BlogPosting, FAQPage, and BreadcrumbList schema targets",
  "Canonical URLs aligned to the final production domain",
  "Sitemap page and XML sitemap-ready route inventory",
];

export const developmentRoadmap = [
  "Approve sitemap, navigation hierarchy, and content ownership",
  "Finalize treatment, doctor, branch, and facility data",
  "Connect appointment and enquiry forms to CRM/email/WhatsApp workflows",
  "Add CMS-backed blogs, gallery media, and testimonials",
  "Implement route metadata, schema, sitemap.xml, and robots.txt",
  "Run responsive QA against desktop, laptop, tablet, and mobile breakpoints",
  "Perform accessibility, performance, and production deployment checks",
];

export const basePages: Record<string, PageContent> = {
  about: {
    eyebrow: "About",
    title: "About Susrutha",
    description: "The legacy, philosophy, people, and facilities behind Susrutha Ayurveda.",
    breadcrumbs: [
      { label: "Home", href: "/" },
      { label: "About Us", href: "/about-us" },
    ],
    intro:
      "Susrutha Ayurveda brings classical Ayurvedic care into a hospital setting with experienced physicians, Panchakarma infrastructure, and patient-centred follow-up.",
    highlights: [
      { title: "Our Story", text: "A legacy built around traditional healing, clinical discipline, and community trust." },
      { title: "Vision & Mission", text: "A clear commitment to responsible Ayurveda, preventive health, and compassionate patient care." },
      { title: "Infrastructure", text: "Treatment rooms, inpatient spaces, pharmacy support, physiotherapy, and wellness facilities." },
    ],
    sections: [
      {
        title: "Why patients choose Susrutha",
        text: "Every care journey is guided by consultation, diagnosis, treatment planning, and steady follow-up.",
        items: ["Classical Panchakarma expertise", "Specialist doctor consultations", "Hospital-based care environment", "Clear patient communication"],
      },
      {
        title: "Reusable design system",
        text: "Inner pages follow the approved Home Page language: ivory backgrounds, deep green headings, gold accents, compact cards, and rounded CTA buttons.",
        items: ["Same typography scale", "Same card radius and borders", "Same CTA styling", "Same footer and header system"],
      },
    ],
    cta: { title: "Plan your visit", text: "Share your concern and preferred branch. The team can guide you to the right consultation.", href: "/appointment", label: "Book Appointment" },
  },
  treatments: {
    eyebrow: "Treatments",
    title: "Ayurveda Treatments",
    description: "Condition-led Ayurveda treatments, Panchakarma programmes, and wellness care.",
    breadcrumbs: [
      { label: "Home", href: "/" },
      { label: "Treatments", href: "/treatments" },
    ],
    intro:
      "Treatment journeys begin with physician consultation and continue through carefully selected therapies, medicines, diet guidance, and follow-up.",
    highlights: treatments.map((item) => ({ title: item.title, text: item.text, meta: item.meta, href: `/treatments/${item.slug}` })),
    sections: [
      {
        title: "Treatment detail page pattern",
        text: "Each treatment page includes concern overview, ideal candidates, care process, related doctors, related treatments, and appointment CTA.",
        items: ["Hero banner", "Breadcrumb", "Benefits", "Care process", "Related treatments", "Appointment CTA"],
      },
    ],
    cta: { title: "Need help choosing a treatment?", text: "A consultation can identify the right care plan for your condition and constitution.", href: "/appointment", label: "Choose Doctor" },
  },
  doctors: {
    eyebrow: "Doctors",
    title: "Doctors and Consultation",
    description: "Doctor listing, credentials, specialties, availability, and appointment actions.",
    breadcrumbs: [
      { label: "Home", href: "/" },
      { label: "Doctors", href: "/doctors" },
    ],
    intro:
      "The doctors listing helps patients move from condition awareness to specialist consultation with clear credentials and appointment routes.",
    highlights: doctorsDirectory.map((item) => ({ title: item.title, text: item.text, meta: item.meta, href: `/doctors/${item.slug}` })),
    sections: [
      {
        title: "Doctor profile structure",
        text: "Profiles support qualifications, experience, specialties, schedule, treatment focus, and direct booking.",
        items: ["Experience", "Qualification", "Specialities", "Branch availability", "Book appointment CTA"],
      },
    ],
    cta: { title: "Choose a doctor", text: "Select a physician or let the hospital team route your appointment by concern.", href: "/appointment", label: "Book Appointment" },
  },
  departments: {
    eyebrow: "Departments",
    title: "Departments",
    description: "Clinical departments organized by patient concern and treatment focus.",
    breadcrumbs: [
      { label: "Home", href: "/" },
      { label: "Departments", href: "/departments" },
    ],
    intro: "Departments make the hospital easier to explore for patients who know their concern but may not know the exact therapy name.",
    highlights: [
      { title: "Panchakarma", text: "Detoxification, rejuvenation, and chronic care programmes.", href: "/treatments/panchakarma" },
      { title: "Orthopaedics", text: "Back, neck, joint, spine, and mobility care.", href: "/treatments/orthopaedics" },
      { title: "Neurology", text: "Stroke rehabilitation and neurological support.", href: "/treatments/neurology" },
      { title: "Women's Health", text: "Fertility, menstrual health, antenatal, and postnatal care.", href: "/treatments/womens-health" },
    ],
    sections: [
      { title: "Department page model", text: "Each department can grow into a hub for doctors, treatments, facilities, FAQs, and articles.", items: ["Overview", "Doctors", "Treatments", "Facilities", "FAQs"] },
    ],
    cta: { title: "Find the right department", text: "Start with your symptoms and the care team can guide the next step.", href: "/appointment", label: "Book Appointment" },
  },
  services: {
    eyebrow: "Services",
    title: "Hospital Services",
    description: "Consultation, inpatient care, Panchakarma, pharmacy, therapy, and wellness services.",
    breadcrumbs: [
      { label: "Home", href: "/" },
      { label: "Services", href: "/services" },
    ],
    intro: "Services are grouped around practical patient needs, from first consultation to long-stay treatment and recovery support.",
    highlights: [
      { title: "OP Consultation", text: "Doctor-led diagnosis and care planning for new and returning patients." },
      { title: "Inpatient Care", text: "Structured treatment stays with therapy schedules and physician monitoring." },
      { title: "Panchakarma Therapy", text: "Classical therapy programmes conducted in dedicated treatment spaces." },
      { title: "Wellness Programmes", text: "Preventive and rejuvenation plans for long-term health." },
    ],
    sections: [
      { title: "Service journey", text: "Patients can move from service discovery to branch selection and appointment booking without losing context.", items: ["Discover service", "Review details", "Select doctor or branch", "Book appointment"] },
    ],
    cta: { title: "Start with a service enquiry", text: "Send your requirement and preferred timing to receive guidance.", href: "/contact-us", label: "Contact Us" },
  },
  facilities: {
    eyebrow: "Facilities",
    title: "Hospital Facilities",
    description: "Treatment rooms, inpatient spaces, yoga, physiotherapy, pharmacy, and patient amenities.",
    breadcrumbs: [
      { label: "Home", href: "/" },
      { label: "Facilities", href: "/facilities" },
    ],
    intro: "Facilities pages help patients understand the care environment before they book a consultation or inpatient programme.",
    highlights: [
      { title: "Panchakarma Rooms", text: "Dedicated therapy spaces for classical treatments." },
      { title: "Inpatient Rooms", text: "Comfortable rooms for monitored treatment stays." },
      { title: "Physiotherapy Unit", text: "Supportive recovery and mobility care." },
      { title: "Yoga Hall", text: "Guided movement, breathing, and wellness sessions." },
    ],
    sections: [
      { title: "Facilities content structure", text: "Each facility can include photos, patient guidance, available services, branch information, and enquiry actions.", items: ["Images", "Amenities", "Related treatments", "Branch details"] },
    ],
    cta: { title: "Ask about facilities", text: "The team can help with room availability, treatment duration, and branch options.", href: "/contact-us", label: "Contact Us" },
  },
  patientCare: {
    eyebrow: "Patient Care",
    title: "Patient Care",
    description: "Guidance for appointments, treatment preparation, inpatient stays, follow-ups, and support.",
    breadcrumbs: [
      { label: "Home", href: "/" },
      { label: "Patient Care", href: "/patient-care" },
    ],
    intro: "Patient care content reduces friction by explaining what to expect before, during, and after treatment.",
    highlights: [
      { title: "Before Consultation", text: "Bring reports, medicine details, symptoms, and treatment expectations." },
      { title: "During Treatment", text: "Follow therapy schedules, diet guidance, rest, and doctor review instructions." },
      { title: "After Treatment", text: "Continue follow-up care, lifestyle recommendations, and medicines as advised." },
    ],
    sections: [
      { title: "Patient links", text: "The patient-care hub connects practical workflows across the site.", items: ["Book appointment", "Contact branch", "FAQ", "Facilities", "Feedback"] },
    ],
    cta: { title: "Speak to patient care", text: "For appointment support, admission guidance, and treatment queries.", href: "/contact-us", label: "Contact Us" },
  },
  testimonials: {
    eyebrow: "Testimonials",
    title: "Patient Stories",
    description: "Patient experiences and trust signals presented in the approved visual language.",
    breadcrumbs: [
      { label: "Home", href: "/" },
      { label: "Testimonials", href: "/testimonials" },
    ],
    intro: "Testimonials should be organized by condition, treatment category, and care setting once final client-approved content is available.",
    highlights: [
      { title: "Panchakarma Experience", text: "A structured story format for patient goals, care experience, and recovery notes." },
      { title: "Pain Management", text: "Stories for spine, joint, mobility, and rehabilitation support." },
      { title: "Wellness Care", text: "Preventive and rejuvenation experiences for long-term wellbeing." },
    ],
    sections: [
      { title: "Content safeguards", text: "Testimonials should include consent, avoid unsupported medical claims, and keep patient privacy intact.", items: ["Consent", "No exaggerated claims", "Treatment context", "Privacy"] },
    ],
    cta: { title: "Begin your story", text: "A consultation is the first step toward a care plan that fits your concern.", href: "/appointment", label: "Book Appointment" },
  },
  gallery: {
    eyebrow: "Gallery",
    title: "Gallery",
    description: "Hospital, treatments, facilities, doctors, branch, and video gallery architecture.",
    breadcrumbs: [
      { label: "Home", href: "/" },
      { label: "Gallery", href: "/gallery" },
    ],
    intro: "The gallery should show real facilities and care environments clearly, using approved assets and consistent card treatments.",
    highlights: [
      { title: "Hospital Images", text: "Exterior, reception, waiting, and care spaces." },
      { title: "Treatment Spaces", text: "Panchakarma rooms, therapy setup, and clinical environment." },
      { title: "Videos", text: "Doctor explainers, facility walkthroughs, and patient education." },
    ],
    sections: [
      { title: "Gallery filters", text: "Gallery content can be filtered by branch, facility, treatment, and media type.", items: ["Images", "Videos", "Branches", "Treatments"] },
    ],
    cta: { title: "Want to visit the hospital?", text: "Book a consultation or contact the branch team for guidance.", href: "/appointment", label: "Book Appointment" },
  },
  blogs: {
    eyebrow: "Blog",
    title: "Ayurveda Journal",
    description: "Educational articles, patient guides, treatment explainers, and wellness content.",
    breadcrumbs: [
      { label: "Home", href: "/" },
      { label: "Blogs", href: "/blogs" },
    ],
    intro: "The blog architecture supports categories, detail pages, related articles, and SEO-led patient education.",
    highlights: blogPosts.map((item) => ({ title: item.title, text: item.text, meta: item.meta, href: `/blogs/${item.slug}` })),
    sections: [
      { title: "Blog functionality", text: "Each blog detail page should include category, author, reading time, related blogs, and treatment links.", items: ["Categories", "Related blogs", "Treatment CTA", "Schema-ready detail"] },
    ],
    cta: { title: "Have a care question?", text: "Articles can guide you, but a consultation gives condition-specific advice.", href: "/appointment", label: "Book Appointment" },
  },
  faq: {
    eyebrow: "FAQ",
    title: "Frequently Asked Questions",
    description: "Answers for appointments, Panchakarma, inpatient care, payments, and follow-ups.",
    breadcrumbs: [
      { label: "Home", href: "/" },
      { label: "FAQ", href: "/faq" },
    ],
    intro: "FAQs are organized around practical questions that help patients decide their next step.",
    highlights: [
      { title: "How do I book?", text: "Use the appointment page, call the hospital, or start a WhatsApp chat." },
      { title: "Is Panchakarma for everyone?", text: "A physician decides the right therapies after consultation and assessment." },
      { title: "Can I choose a doctor?", text: "Yes, patients can choose a doctor or request guidance by treatment concern." },
      { title: "Are inpatient rooms available?", text: "Availability and duration should be confirmed with the patient-care team." },
    ],
    sections: [
      { title: "FAQ schema plan", text: "Final FAQs should be rendered with FAQPage schema for SEO and answer clarity.", items: ["Appointment", "Treatments", "Facilities", "Follow-up"] },
    ],
    cta: { title: "Still have questions?", text: "Contact the hospital team for appointment and treatment guidance.", href: "/contact-us", label: "Contact Us" },
  },
  contact: {
    eyebrow: "Contact",
    title: "Contact Susrutha",
    description: "Contact form, branch information, WhatsApp, call, email, and map section.",
    breadcrumbs: [
      { label: "Home", href: "/" },
      { label: "Contact", href: "/contact-us" },
    ],
    intro: "The contact page gives patients multiple routes to enquire, call, message, locate a branch, or book a consultation.",
    highlights: [
      { title: "Call", text: "Direct phone actions for appointment and branch queries.", href: "tel:+919447003191" },
      { title: "WhatsApp", text: "Quick chat entry for appointment support.", href: "https://wa.me/919447003191" },
      { title: "Email", text: "Formal enquiries and document sharing.", href: "mailto:info@susruthaayurveda.com" },
    ],
    sections: [
      { title: "Contact form fields", text: "The form captures enough detail for routing without feeling heavy.", items: ["Name", "Phone", "Concern", "Preferred branch", "Message"] },
      { title: "Map and branches", text: "Embed Google Maps and list branch timings, addresses, and phone numbers.", items: ["Kattakada", "Kowdiar", "Ayurveda Village"] },
    ],
    cta: { title: "Ready to book?", text: "Use the appointment flow for date, doctor, department, and confirmation details.", href: "/appointment", label: "Book Appointment" },
  },
  appointment: {
    eyebrow: "Appointment",
    title: "Book an Appointment",
    description: "Appointment booking flow with doctor, department, date, time slot, and confirmation.",
    breadcrumbs: [
      { label: "Home", href: "/" },
      { label: "Book Appointment", href: "/appointment" },
    ],
    intro: "The appointment flow captures the essentials and can later connect to CRM, email, WhatsApp, or hospital desk workflows.",
    highlights: [
      { title: "Choose Department", text: "Route patients by treatment concern or specialty." },
      { title: "Select Doctor", text: "Allow direct doctor choice or assisted routing." },
      { title: "Pick Date and Slot", text: "Date picker and available time slots for confirmation." },
      { title: "Confirmation", text: "Success state with appointment summary and next steps." },
    ],
    sections: [
      { title: "Functional requirements", text: "The production flow should validate fields, prevent duplicate submissions, and confirm through the selected communication channel.", items: ["Department selection", "Doctor selection", "Date picker", "Time slot", "Confirmation"] },
    ],
    cta: { title: "Prefer direct help?", text: "Call or WhatsApp the hospital team for appointment support.", href: "/contact-us", label: "Contact Us" },
  },
  privacy: {
    eyebrow: "Privacy",
    title: "Privacy Policy",
    description: "Privacy, data collection, enquiry handling, and patient communication policy.",
    breadcrumbs: [
      { label: "Home", href: "/" },
      { label: "Privacy Policy", href: "/privacy-policy" },
    ],
    intro: "This page provides the policy structure for patient data, enquiry forms, appointment communication, and analytics.",
    highlights: [
      { title: "Data Collected", text: "Name, contact details, appointment preferences, and enquiry message." },
      { title: "Purpose", text: "Appointment coordination, patient support, and hospital communication." },
      { title: "Protection", text: "Access controls, limited sharing, and responsible handling of patient information." },
    ],
    sections: [
      { title: "Policy sections", text: "Final legal copy should be reviewed before launch.", items: ["Information collection", "Use of information", "Sharing", "Retention", "Contact"] },
    ],
  },
  terms: {
    eyebrow: "Terms",
    title: "Terms & Conditions",
    description: "Website usage, appointment requests, medical disclaimer, and content terms.",
    breadcrumbs: [
      { label: "Home", href: "/" },
      { label: "Terms & Conditions", href: "/terms" },
    ],
    intro: "Terms clarify that website information is educational and appointments require physician consultation and confirmation.",
    highlights: [
      { title: "Website Use", text: "Content is provided for general information and patient education." },
      { title: "Appointments", text: "Requests are confirmed by hospital staff based on availability." },
      { title: "Medical Advice", text: "Diagnosis and treatment decisions happen only through qualified consultation." },
    ],
    sections: [
      { title: "Terms sections", text: "Final legal copy should be approved before production launch.", items: ["Use of site", "Appointments", "Payments", "Medical disclaimer", "Contact"] },
    ],
  },
};
