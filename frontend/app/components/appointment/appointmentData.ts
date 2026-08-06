export type ConsultationMode = "in-person" | "video";

export type BranchLocation = {
  id: string;
  name: string;
  type: string;
  address: string;
  phone: string;
  timing: string;
  image: string;
  features: string[];
};

export type DoctorOption = {
  id: string;
  name: string;
  slug: string;
  qualification: string;
  specialty: string;
  experience: string;
  avatar: string;
  availableDays: string[];
  location: string;
  rating: number;
};

export type SpecialtyOption = {
  id: string;
  title: string;
  icon: string;
  description: string;
};

export const branchLocations: BranchLocation[] = [
  {
    id: "kattakada",
    name: "Kattakada Main Hospital",
    type: "Full IP & OP Super Specialty Hospital",
    address: "Opp. Christian College, Kattakada, Thiruvananthapuram",
    phone: "+91 94470 03191",
    timing: "24/7 Hospital & IP Care • OP 08:00 AM - 08:00 PM",
    image: "/images/kattakada-branch-hero.webp",
    features: ["Inpatient AC Suites", "Panchakarma Treatment Units", "Physiotherapy & Yoga"],
  },
  {
    id: "kowdiar",
    name: "Kowdiar City OP Outlet",
    type: "Premium Consultation & Wellness Center",
    address: "Kowdiar Main Avenue, Thiruvananthapuram",
    phone: "+91 96455 55888",
    timing: "Mon - Sat: 09:00 AM - 07:00 PM",
    image: "/images/kowdiar-branch-hero.webp",
    features: ["Doctor Consultations", "Ayurvedic Pharmacy", "Outpatient Therapies"],
  },
  {
    id: "village",
    name: "Susrutha Ayurveda Village",
    type: "Heritage Eco-Resort & Wellness Retreat",
    address: "Kottoor Eco-Reserve Road, Near Kattakada",
    phone: "+91 94470 03191",
    timing: "Residential Wellness & Detox Residencies",
    image: "/images/ayurveda-village-hero.webp",
    features: ["Organic Herbal Gardens", "Sattvic Dining", "Long-term Detox Stays"],
  },
];

export const specialtyOptions: SpecialtyOption[] = [
  { id: "all", title: "All Specialties", icon: "🩺", description: "View all Ayurvedic specialists at this branch" },
  { id: "panchakarma", title: "Panchakarma & Detox", icon: "🫗", description: "Deep tissue purification & Ama elimination" },
  { id: "spine-joints", title: "Spine, Joint & Pain Care", icon: "🦴", description: "Arthritis, sciatica & spondylosis relief" },
  { id: "neuro-rehab", title: "Neurological & Stroke Rehab", icon: "🧠", description: "Post-stroke & paralytic recovery" },
  { id: "womens-health", title: "Women's Health & Fertility", icon: "🌸", description: "PCOS, hormonal balance & prenatal care" },
  { id: "lifestyle-detox", title: "Metabolic & Lifestyle Care", icon: "🌱", description: "Diabetes, fatty liver & weight management" },
  { id: "skin-hair", title: "Skin, Hair & Cosmetic Care", icon: "✨", description: "Psoriasis, eczema & natural skin rejuvenation" },
];

export const doctorOptions: DoctorOption[] = [
  {
    id: "dr-krishnakumar",
    name: "Dr. Krishnakumar K.",
    slug: "dr-krishnakumar-k",
    qualification: "MD (Ayurveda)",
    specialty: "Managing Director & Chief Physician",
    experience: "28+ Years Practice",
    avatar: "/uploads/dr_krishnakumar.webp",
    availableDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    location: "Kattakada Main Hospital",
    rating: 4.98,
  },
  {
    id: "dr-sreeja",
    name: "Dr. Sreeja Krishna S.",
    slug: "dr-sreeja-krishna-s",
    qualification: "BAMS, MBA Hospital Management",
    specialty: "Director & Senior Consultant Physician",
    experience: "22+ Years Practice",
    avatar: "/uploads/dr_sreeja_krishna.webp",
    availableDays: ["Tuesday", "Wednesday", "Thursday", "Saturday"],
    location: "Kattakada & Kowdiar",
    rating: 4.96,
  },
  {
    id: "dr-priyanka",
    name: "Dr. Priyanka R.",
    slug: "dr-priyanka-r",
    qualification: "BAMS, MS (Ayurveda)",
    specialty: "Ayurvedic Gynaecologist & Obstetrician",
    experience: "15+ Years Practice",
    avatar: "/uploads/dr_priyanka.webp",
    availableDays: ["Sunday", "Monday", "Tuesday", "Wednesday", "Friday"],
    location: "Kattakada & Kowdiar",
    rating: 4.95,
  },
  {
    id: "dr-sasidharan",
    name: "Dr. M. K. Sasidharan",
    slug: "dr-m-k-sasidharan",
    qualification: "BAMS, MD (Ayurveda)",
    specialty: "Visiting Senior Professor & Panchakarma Consultant",
    experience: "42+ Years Practice",
    avatar: "/uploads/dr_sasidharan.webp",
    availableDays: ["Saturday"],
    location: "Kowdiar City OP Outlet",
    rating: 4.99,
  },
  {
    id: "dr-vinaya",
    name: "Dr. Vinaya Babu B.",
    slug: "dr-vinaya-babu-b",
    qualification: "BSc, BAMS (CMO Rtd Govt. of Kerala)",
    specialty: "Senior Consultant Physician • Kayachikitsa",
    experience: "38+ Years Practice",
    avatar: "/uploads/dr_vinaya_babu.webp",
    availableDays: ["Monday", "Thursday"],
    location: "Kowdiar City OP Outlet",
    rating: 4.97,
  },
  {
    id: "dr-dipu",
    name: "Dr. Dipu Sukumar",
    slug: "dr-dipu-sukumar",
    qualification: "BAMS, MS (Ayurveda Shalya)",
    specialty: "Ayurveda Proctologist & Kshara Sutra Specialist",
    experience: "14+ Years Practice",
    avatar: "/uploads/dr_sasidharan.webp",
    availableDays: ["Monday", "Wednesday", "Friday"],
    location: "Kattakada Main Hospital",
    rating: 4.93,
  },
  {
    id: "dr-nithya",
    name: "Dr. Nithya P.",
    slug: "dr-nithya-p",
    qualification: "BAMS",
    specialty: "Consultant Ayurvedic Physician",
    experience: "9+ Years Practice",
    avatar: "/uploads/dr_nithya.webp",
    availableDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    location: "Kowdiar City OP Outlet",
    rating: 4.91,
  },
  {
    id: "dr-arjun",
    name: "Dr. Arjun Das",
    slug: "dr-arjun-das",
    qualification: "BAMS, Fellow in Sports Rehab",
    specialty: "Spine & Neuromuscular Specialist",
    experience: "12+ Years Practice",
    avatar: "/uploads/slider_1.webp",
    availableDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    location: "Kattakada Main Hospital",
    rating: 4.88,
  },
];

export const timeSlots = [
  { id: "slot-m1", label: "09:30 AM - 10:30 AM", period: "Morning" },
  { id: "slot-m2", label: "11:00 AM - 12:00 PM", period: "Morning" },
  { id: "slot-a1", label: "02:30 PM - 03:30 PM", period: "Afternoon" },
  { id: "slot-a2", label: "04:00 PM - 05:00 PM", period: "Afternoon" },
  { id: "slot-e1", label: "05:30 PM - 06:30 PM", period: "Evening" },
  { id: "slot-e2", label: "07:00 PM - 08:00 PM", period: "Evening" },
];

export const bookingFaqs = [
  {
    question: "What should I bring for my first consultation?",
    answer: "Please bring any recent medical reports, blood work, prescriptions, or imaging files (MRI/X-Ray) related to your current health concern. This helps our Vaidyas formulate a precise diagnosis.",
  },
  {
    question: "Can I choose between online video consultation and hospital visit?",
    answer: "Yes! We offer both in-person consultations at our Kattakada/Kowdiar branches and tele-ayurveda video consultations for outstation and international patients.",
  },
  {
    question: "How far in advance should I book my Panchakarma package?",
    answer: "For residential Panchakarma detox stays, we recommend booking 1-2 weeks in advance to ensure preferred room suite availability and initial diet preparation.",
  },
  {
    question: "Is there any registration fee or cancellation charge?",
    answer: "No pre-booking fee is required for OP consultations. Cancellations or reschedules can be done free of charge up to 4 hours before your scheduled time slot.",
  },
];
