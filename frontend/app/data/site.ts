export const siteConfig = {
  name: "Susrutha Ayurveda",
  tagline: "Institute of Ayurvedic Sciences and Panchakarma Hospital",
  phone: "+91 9656656736",
  registrationPhone: "0471-2291027",
  email: "info@susruthaayurveda.com",
  address: "Opposite Christian College, Kattakada, Thiruvananthapuram",
};

export const navigation = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about-us" },
  {
    label: "Treatments",
    href: "/treatments",
    children: [
      { label: "Panchakarma", href: "/treatments/panchakarma" },
      { label: "Back, Neck & Joint Care", href: "/treatments/back-neck-joint-care" },
      { label: "Stroke Rehabilitation", href: "/treatments/stroke-rehabilitation" },
      { label: "Women's Health", href: "/treatments/womens-health" },
    ],
  },
  { label: "Doctors", href: "/doctors" },
  {
    label: "Facilities",
    href: "/facilities",
    children: [
      { label: "Panchakarma Rooms", href: "/facilities/panchakarma-treatment-rooms" },
      { label: "Inpatient Rooms", href: "/facilities/rooms" },
      { label: "Physiotherapy Unit", href: "/facilities/physiotherapy" },
      { label: "Yoga Hall", href: "/facilities/yoga-hall" },
    ],
  },
  {
    label: "Branches",
    href: "/branches",
    children: [
      { label: "Kattakada Hospital", href: "/branches/kattakada" },
      { label: "Kowdiar OP Outlet", href: "/branches/kowdiar" },
      { label: "Ayurveda Village", href: "/branches/ayurveda-village" },
    ],
  },
  { label: "Contact", href: "/contact-us" },
];

export const specialities = [
  "Panchakarma",
  "Back, Neck & Joint Care",
  "Rheumatology",
  "Stroke Rehabilitation",
  "Women's Health & Fertility",
  "Preventive Medicine",
];

export const doctors = [
  {
    name: "Dr. Krishnakumar K.",
    role: "MD (Ayur)",
    availability: "On appointment",
  },
  {
    name: "Dr. Sreeja Krishna S.",
    role: "BAMS, MBA Hospital Management",
    availability: "Tue, Thu, Sat",
  },
  {
    name: "Dr. Priyanka R.",
    role: "BAMS, MS (Ayur), Ayurvedic Gynaecologist & Obstetrician",
    availability: "Sun, Mon, Wed, Fri",
  },
];

export const footerLinks = [
  {
    title: "Hospital",
    links: [
      { label: "About Susrutha", href: "/about-us" },
      { label: "Doctors", href: "/doctors" },
      { label: "Facilities", href: "/facilities" },
      { label: "Gallery", href: "/gallery" },
    ],
  },
  {
    title: "Patient Care",
    links: [
      { label: "Book Appointment", href: "/appointment" },
      { label: "Package Enquiry", href: "/packages" },
      { label: "FAQ", href: "/faq" },
      { label: "Feedback", href: "/feedback" },
    ],
  },
  {
    title: "Branches",
    links: [
      { label: "Kattakada", href: "/branches/kattakada" },
      { label: "Kowdiar", href: "/branches/kowdiar" },
      { label: "Ayurveda Village", href: "/branches/ayurveda-village" },
    ],
  },
];
