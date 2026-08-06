export type ConsultationMode = "in-person" | "video";

export type DoctorDepartment = {
  id: string;
  name: string;
  shortName: string;
  icon: string;
  description: string;
  doctorCount: number;
};

export type DoctorBranch = {
  id: string;
  name: string;
  shortName: string;
};

export type DoctorItem = {
  id: string;
  slug: string;
  name: string;
  title: string;
  designation: string;
  qualification: string;
  departmentId: string;
  departmentName: string;
  experienceYears: number;
  experienceText: string;
  patientsCount: string;
  rating: number;
  reviewsCount: number;
  image: string;
  location: string;
  branchIds: string[];
  availableDays: string[];
  languages: string[];
  consultationModes: ConsultationMode[];
  focusAreas: string[];
  credentials: string[];
  quote: string;
  bio: string;
  isFounder?: boolean;
  isPopular?: boolean;
  isAvailableToday?: boolean;
};

export const doctorDepartments: DoctorDepartment[] = [
  {
    id: "all",
    name: "All Departments",
    shortName: "All",
    icon: "🩺",
    description: "Browse all specialist Vaidyas across all Ayurveda clinical disciplines.",
    doctorCount: 8,
  },
  {
    id: "panchakarma",
    name: "Panchakarma & Detox",
    shortName: "Panchakarma",
    icon: "🫗",
    description: "Classical bio-purification, body detoxification, and rejuvenation therapies.",
    doctorCount: 3,
  },
  {
    id: "spine-joints",
    name: "Spine, Joint & Pain Care",
    shortName: "Spine & Pain",
    icon: "🦴",
    description: "Ayurvedic management of disc proflapse, sciatica, arthritis, and chronic joint pain.",
    doctorCount: 2,
  },
  {
    id: "womens-health",
    name: "Women's Health & Fertility",
    shortName: "Women's Care",
    icon: "🌸",
    description: "Holistic care for PCOS, hormonal balance, prenatal & postnatal wellness.",
    doctorCount: 2,
  },
  {
    id: "lifestyle-detox",
    name: "Metabolic & Lifestyle Care",
    shortName: "Lifestyle & Metabolic",
    icon: "🌱",
    description: "Root-cause management of diabetes, fatty liver, hypertension, and stress.",
    doctorCount: 2,
  },
  {
    id: "skin-hair",
    name: "Skin, Hair & Cosmetic Care",
    shortName: "Skin & Hair",
    icon: "✨",
    description: "Natural Ayurvedic therapies for psoriasis, eczema, hair loss, and radiant skin.",
    doctorCount: 1,
  },
];

export const doctorBranches: DoctorBranch[] = [
  { id: "all", name: "All Locations", shortName: "All Locations" },
  { id: "kattakada", name: "Kattakada Main Hospital", shortName: "Kattakada" },
  { id: "kowdiar", name: "Kowdiar City OP Outlet", shortName: "Kowdiar" },
  { id: "village", name: "Susrutha Ayurveda Village", shortName: "Ayurveda Village" },
  { id: "video", name: "Tele-Ayurveda Video Consult", shortName: "Online Video" },
];

export const doctorsData: DoctorItem[] = [
  {
    id: "dr-nikhil-sharma",
    slug: "dr-nikhil-sharma",
    name: "Dr. Nikhil Sharma",
    title: "Dr. Nikhil Sharma",
    designation: "Founder & Chief Physician",
    qualification: "BAMS, MD (Ayurveda)",
    departmentId: "panchakarma",
    departmentName: "Panchakarma & Detox",
    experienceYears: 18,
    experienceText: "18+ Years",
    patientsCount: "12,000+",
    rating: 4.9,
    reviewsCount: 142,
    image: "/images/founder-nikhil-sharma.webp",
    location: "Kattakada & Kowdiar",
    branchIds: ["kattakada", "kowdiar", "video"],
    availableDays: ["Monday", "Wednesday", "Friday"],
    languages: ["English", "Malayalam", "Hindi"],
    consultationModes: ["in-person", "video"],
    focusAreas: ["Panchakarma Detox", "Chronic Wellness", "Digestive Balance", "Rejuvenation Care"],
    credentials: ["Founder & Chief Physician", "Panchakarma Planning Specialist", "Holistic Chronic Care Lead"],
    quote: "Healing works best when classical Ayurveda is personalized with clarity, patience, and trust.",
    bio: "Founder physician guiding Panchakarma, detoxification, rejuvenation, and holistic Ayurveda care with a patient-first approach.",
    isFounder: true,
    isPopular: true,
    isAvailableToday: true,
  },
  {
    id: "dr-meera-iyer",
    slug: "dr-meera-iyer",
    name: "Dr. Meera Iyer",
    title: "Dr. Meera Iyer",
    designation: "Founder & Wellness Director",
    qualification: "BAMS, MS (Ayurveda)",
    departmentId: "womens-health",
    departmentName: "Women's Health & Fertility",
    experienceYears: 15,
    experienceText: "15+ Years",
    patientsCount: "9,000+",
    rating: 4.9,
    reviewsCount: 118,
    image: "/images/founder-meera-iyer.webp",
    location: "Kowdiar City OP Outlet",
    branchIds: ["kowdiar", "video"],
    availableDays: ["Tuesday", "Thursday", "Saturday"],
    languages: ["English", "Malayalam", "Tamil"],
    consultationModes: ["in-person", "video"],
    focusAreas: ["Women's Wellness", "Preventive Care", "Nutrition Planning", "Lifestyle Balance"],
    credentials: ["Founder & Wellness Director", "Women's Health Guidance", "Nutrition & Preventive Ayurveda"],
    quote: "A balanced life is built through small daily choices, supported by compassionate clinical care.",
    bio: "Wellness director focused on women's health, nutrition, preventive Ayurveda, and balanced lifestyle planning.",
    isFounder: true,
    isPopular: true,
    isAvailableToday: false,
  },
  {
    id: "dr-arjun-das",
    slug: "dr-arjun-das",
    name: "Dr. Arjun Das",
    title: "Dr. Arjun Das",
    designation: "Founder & Research Director",
    qualification: "BAMS, Fellow in Sports Rehab",
    departmentId: "spine-joints",
    departmentName: "Spine, Joint & Pain Care",
    experienceYears: 12,
    experienceText: "12+ Years",
    patientsCount: "7,500+",
    rating: 4.8,
    reviewsCount: 94,
    image: "/images/doctor-arjun.webp",
    location: "Kattakada Main Hospital",
    branchIds: ["kattakada", "village", "video"],
    availableDays: ["Monday", "Thursday", "Saturday"],
    languages: ["English", "Malayalam", "Hindi"],
    consultationModes: ["in-person", "video"],
    focusAreas: ["Spine Rehabilitation", "Neuromuscular Pain", "Joint Mobility", "Sports Injuries"],
    credentials: ["Founder & Research Director", "Evidence-Based Ayurveda", "Spine & Pain Rehab Specialist"],
    quote: "Modern Ayurvedic care should be measurable, thoughtful, and deeply rooted in classical wisdom.",
    bio: "Research director supporting evidence-based Ayurvedic protocols, clinical quality, and patient education.",
    isFounder: true,
    isPopular: false,
    isAvailableToday: true,
  },
  {
    id: "dr-krishnakumar-k",
    slug: "dr-krishnakumar-k",
    name: "Dr. Krishnakumar K.",
    title: "Dr. Krishnakumar K.",
    designation: "Senior Chief Vaidya",
    qualification: "BAMS, MD (Ayurveda)",
    departmentId: "panchakarma",
    departmentName: "Panchakarma & Detox",
    experienceYears: 35,
    experienceText: "35+ Years",
    patientsCount: "15,000+",
    rating: 4.95,
    reviewsCount: 230,
    image: "/images/doctor-krishnakumar.webp",
    location: "Kattakada & Kowdiar",
    branchIds: ["kattakada", "kowdiar", "video"],
    availableDays: ["Monday", "Wednesday", "Friday", "Saturday"],
    languages: ["English", "Malayalam"],
    consultationModes: ["in-person", "video"],
    focusAreas: ["Chronic Disease Management", "Panchakarma Planning", "Severe Pain Care", "Geriatric Ayurveda"],
    credentials: ["MD (Ayurveda)", "Senior Chief Physician", "National Ayurveda Lifetime Achievement Awardee"],
    quote: "A careful diagnosis helps every treatment become more precise and meaningful.",
    bio: "Consultation for chronic conditions, Panchakarma planning, and long-term Ayurveda care journeys with over 35 years of clinical wisdom.",
    isFounder: false,
    isPopular: true,
    isAvailableToday: true,
  },
  {
    id: "dr-sreeja-krishna-s",
    slug: "dr-sreeja-krishna-s",
    name: "Dr. Sreeja Krishna S.",
    title: "Dr. Sreeja Krishna S.",
    designation: "Senior Physician & Care Coordinator",
    qualification: "BAMS, MBA Hospital Management",
    departmentId: "lifestyle-detox",
    departmentName: "Metabolic & Lifestyle Care",
    experienceYears: 18,
    experienceText: "18+ Years",
    patientsCount: "8,500+",
    rating: 4.9,
    reviewsCount: 112,
    image: "/images/doctor-sreeja.webp",
    location: "Kattakada Main Hospital",
    branchIds: ["kattakada", "video"],
    availableDays: ["Tuesday", "Thursday", "Saturday"],
    languages: ["English", "Malayalam"],
    consultationModes: ["in-person", "video"],
    focusAreas: ["Metabolic Disorders", "Thyroid & Diabetes Care", "Branch Care Coordination", "Follow-up Planning"],
    credentials: ["BAMS", "MBA Hospital Management", "Patient Care & Clinical Governance Lead"],
    quote: "Good care feels organized, understandable, and available when patients need support.",
    bio: "Patient-centred consultations with focus on branch care coordination, metabolic health, and follow-up planning.",
    isFounder: false,
    isPopular: true,
    isAvailableToday: false,
  },
  {
    id: "dr-priyanka-r",
    slug: "dr-priyanka-r",
    name: "Dr. Priyanka R.",
    title: "Dr. Priyanka R.",
    designation: "Specialist Gynaecologist & Obstetrician",
    qualification: "BAMS, MS (Ayurveda)",
    departmentId: "womens-health",
    departmentName: "Women's Health & Fertility",
    experienceYears: 14,
    experienceText: "14+ Years",
    patientsCount: "6,800+",
    rating: 4.85,
    reviewsCount: 88,
    image: "/images/doctor-priyanka.webp",
    location: "Kowdiar & Kattakada",
    branchIds: ["kowdiar", "kattakada", "video"],
    availableDays: ["Sunday", "Monday", "Wednesday", "Friday"],
    languages: ["English", "Malayalam"],
    consultationModes: ["in-person", "video"],
    focusAreas: ["Ayurvedic Gynaecology", "Fertility Support", "Antenatal Wellness", "Postnatal Recovery"],
    credentials: ["BAMS", "MS (Ayurveda - Prasuti & Stri Roga)", "Ayurvedic Gynaecology Specialist"],
    quote: "Women's healthcare needs trust, patience, and care that respects every stage of life.",
    bio: "Specialist support for women's health, fertility, antenatal wellness, and postnatal care with gentle classical therapies.",
    isFounder: false,
    isPopular: true,
    isAvailableToday: true,
  },
  {
    id: "dr-rajesh-r",
    slug: "dr-rajesh-r",
    name: "Dr. Rajesh R.",
    title: "Dr. Rajesh R.",
    designation: "Senior Panchakarma Specialist",
    qualification: "BAMS, MD (Ayurveda)",
    departmentId: "panchakarma",
    departmentName: "Panchakarma & Detox",
    experienceYears: 14,
    experienceText: "14+ Years",
    patientsCount: "10,000+",
    rating: 4.9,
    reviewsCount: 135,
    image: "/images/doctor-portrait.webp",
    location: "Susrutha Village & Kattakada",
    branchIds: ["village", "kattakada", "video"],
    availableDays: ["Monday", "Tuesday", "Thursday", "Friday"],
    languages: ["English", "Malayalam", "Hindi"],
    consultationModes: ["in-person", "video"],
    focusAreas: ["Panchakarma Therapy", "Pain Care Protocols", "Rejuvenation Rasayana", "Chronic Detox"],
    credentials: ["BAMS", "MD (Ayurveda - Panchakarma)", "Master of Classical Detox Protocols"],
    quote: "Classical Panchakarma needs careful timing, preparation, and physician supervision.",
    bio: "Focused consultation for Panchakarma planning, pain management, rejuvenation care, and residential wellness programmes.",
    isFounder: false,
    isPopular: false,
    isAvailableToday: true,
  },
  {
    id: "dr-anju-s",
    slug: "dr-anju-s",
    name: "Dr. Anju S.",
    title: "Dr. Anju S.",
    designation: "Consultant - Lifestyle & Skin Ayurveda",
    qualification: "BAMS",
    departmentId: "skin-hair",
    departmentName: "Skin, Hair & Cosmetic Care",
    experienceYears: 8,
    experienceText: "8+ Years",
    patientsCount: "5,200+",
    rating: 4.75,
    reviewsCount: 71,
    image: "/images/doctor-portrait.webp",
    location: "Kowdiar City OP Outlet",
    branchIds: ["kowdiar", "video"],
    availableDays: ["Monday", "Wednesday", "Friday"],
    languages: ["English", "Malayalam"],
    consultationModes: ["in-person", "video"],
    focusAreas: ["Psoriasis & Eczema", "Cosmetic Ayurveda", "Diet Correction", "Stress Balance"],
    credentials: ["BAMS", "Ayurvedic Cosmetology Certification", "Preventive Wellness Care Lead"],
    quote: "Prevention becomes possible when health routines feel realistic and sustainable.",
    bio: "Patient guidance for skin allergies, hair loss, lifestyle disorders, diet correction, and preventive wellness routines.",
    isFounder: false,
    isPopular: false,
    isAvailableToday: true,
  },
];

export const quickSearchTags = [
  "Panchakarma",
  "Spine & Disc Care",
  "PCOS & Women's Health",
  "Senior Physicians",
  "Available Today",
  "Online Video Consult",
  "Psoriasis & Skin",
  "Kowdiar Branch",
];
