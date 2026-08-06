export const facilityCards = [
  {
    icon: "room",
    title: "Inpatient Rooms",
    text: "Comfortable rooms for monitored treatment stays with calm patient amenities.",
    image: "/images/ayurveda-hospital-garden.webp",
    featured: false,
  },
  {
    icon: "lotus",
    title: "Panchakarma Rooms",
    text: "Dedicated therapy spaces for classical treatments and physician-guided care.",
    image: "/images/treatment-panchakarma.webp",
    featured: false,
  },
  {
    icon: "operation",
    title: "Treatment Rooms",
    text: "Prepared spaces for Ayurveda procedures, consultation support, and care routines.",
    image: "/images/treatment-kati-vasti.webp",
    featured: true,
  },
  {
    icon: "physio",
    title: "Physiotherapy Unit",
    text: "Supportive recovery, mobility care, and guided rehabilitation assistance.",
    image: "/images/treatment-njavarakizhi.webp",
    featured: false,
  },
  {
    icon: "yoga",
    title: "Yoga Hall",
    text: "Guided movement, breathing, and wellness sessions in a quiet practice space.",
    image: "/images/ayurveda-hero.webp",
    featured: false,
  },
  {
    icon: "leaf",
    title: "Patient Amenities",
    text: "Hospital conveniences that make inpatient programmes clearer and easier.",
    image: "/images/about-susrutha-wellness.webp",
    featured: false,
  },
] as const;

export const facilityHeroStats = [
  { icon: "building", value: "40", label: "Bed inpatient care" },
  { icon: "clock", value: "24x7", label: "Hospital support" },
  { icon: "leaf", value: "4", label: "Care environments" },
] as const;

export const facilityPrograms = [
  { icon: "lotus", title: "Treatment rooms", text: "Classical Ayurveda rooms for therapy-led care.", image: "/images/treatment-herbal-medicine.webp" },
  { icon: "calendar", title: "Inpatient stays", text: "Structured stay support for longer care plans.", image: "/images/about-purpose-mission-bowl.webp" },
  { icon: "physio", title: "Recovery support", text: "Mobility-focused care with rehabilitation guidance.", image: "/images/treatment-njavarakizhi.webp" },
  { icon: "yoga", title: "Wellness practice", text: "Yoga, breathing, and supportive daily routines.", image: "/images/ayurveda-hero.webp" },
] as const;

export const facilityFaqs = [
  "Are inpatient rooms available?",
  "Can I view facilities before admission?",
  "Are therapy rooms separate for patients?",
  "Is physiotherapy available with Ayurveda care?",
  "Can the team guide room availability and duration?",
] as const;

export const facilityEnquirySupport = [
  { icon: "mail", title: "Room availability guidance" },
  { icon: "car", title: "Branch and admission support" },
  { icon: "calendar", title: "Treatment duration planning" },
  { icon: "clock", title: "24x7 patient coordination" },
] as const;
