export const branchHighlights = [
  {
    icon: "shield",
    title: "Trusted Care",
    text: "Since 1986",
  },
  {
    icon: "basket",
    title: "Authentic Ayurveda",
    text: "Expert Doctors",
  },
  {
    icon: "building",
    title: "Modern Facilities",
    text: "Holistic Healing",
  },
] as const;

export const branches = [
  {
    id: "kattakada",
    label: "Main Hospital",
    icon: "building",
    title: "Kattakada Hospital",
    location: "Kattakada, Thiruvananthapuram, Kerala, India",
    description:
      "Our flagship 40-bed Panchakarma hospital and research institute - full inpatient care, operation theatre, physiotherapy, yoga hall, and dedicated therapy suites.",
    image: "/images/ayurveda-hospital-garden.webp",
    details: ["40-bed inpatient hospital", "Panchakarma rooms (M/F)", "Operation Theatre", "Physiotherapy Unit", "Yoga Hall", "Pharmacy & diagnostics access"],
    doctors: "6 doctors listed with this branch",
    hours: "Mon - Sat, 8:00 AM - 6:00 PM",
    phone: "+91 9645 555 888",
    mapsHref: "https://www.google.com/maps/search/?api=1&query=Susrutha+Ayurveda+Kattakada+Thiruvananthapuram",
  },
  {
    id: "kowdiar",
    label: "OP Outlet",
    icon: "basket",
    title: "Kowdiar Centre",
    location: "Kowdiar, Thiruvananthapuram, Kerala, India",
    description:
      "Satellite outpatient centre in Trivandrum city, open since June 2022 - convenient consultations with visiting senior physicians and specialist clinics.",
    image: "/images/doctors-ayurveda-mortar-hero.webp",
    details: ["Outpatient consultations", "Senior physician clinics", "Specialist OP days", "City-centre access"],
    doctors: "5 doctors listed with this branch",
    hours: "Mon - Sat, 9:30 AM - 5:30 PM",
    phone: "+91 9645 555 888",
    mapsHref: "https://www.google.com/maps/search/?api=1&query=Susrutha+Ayurveda+Kowdiar+Thiruvananthapuram",
  },
] as const;

export const trustPoints = [
  "Experienced & compassionate doctors",
  "Traditional Ayurveda with modern standards",
  "Personalized care for every individual",
  "Clean, safe & serene environment",
] as const;

export const branchStats = [
  { value: "35K+", label: "Happy Patients" },
  { value: "37+", label: "Years of Excellence" },
] as const;
