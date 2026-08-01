export type MediaItem = {
  title: string;
  kicker: string;
  date: string;
  image: string;
  type: "Video" | "Photo" | "Press" | "Event" | "Award" | "News" | "Brand Story";
  duration?: string;
};

export const mediaCategories = ["All", "Videos", "Photos", "Press", "Events", "Awards", "News", "Brand Stories"];

export const mediaItems: MediaItem[] = [
  { title: "Inside the Panchakarma care suites", kicker: "Hospital story", date: "Aug 01, 2026", image: "/images/treatment-panchakarma.webp", type: "Video", duration: "03:42" },
  { title: "A morning at the Ayurveda village", kicker: "Brand experience", date: "Jul 24, 2026", image: "/images/ayurveda-village-path.webp", type: "Brand Story" },
  { title: "Physician-led therapy rituals", kicker: "Photo essay", date: "Jul 12, 2026", image: "/images/treatment-sirodhara.webp", type: "Photo" },
  { title: "Kerala lineage, modern hospital discipline", kicker: "Press note", date: "Jun 28, 2026", image: "/images/ayurveda-hospital-garden.webp", type: "Press" },
  { title: "Research roundtable on restorative care", kicker: "Event", date: "Jun 14, 2026", image: "/images/doctors-ayurveda-mortar-hero.webp", type: "Event" },
  { title: "Recognition for inpatient Ayurveda excellence", kicker: "Awards", date: "May 30, 2026", image: "/images/legacy-verandah.webp", type: "Award" },
];

export const videos = mediaItems.filter((item) => item.type === "Video").concat([
  { title: "The calm science of oil therapies", kicker: "Treatment film", date: "Jul 18, 2026", image: "/images/treatment-kati-vasti.webp", type: "Video", duration: "02:58" },
  { title: "Doctors explain seasonal wellness", kicker: "Expert cut", date: "Jun 09, 2026", image: "/images/doctor-portrait.webp", type: "Video", duration: "04:16" },
]);

export const pressItems = [
  "Featured in wellness travel editorials",
  "Hospital care model recognised by regional media",
  "Research-led Ayurveda programmes highlighted",
];

export const awards = ["Clinical Excellence", "Trusted Ayurveda Centre", "Patient Experience", "Legacy Practice"];

export const events = [
  { date: "01 Aug", title: "Wellness media walkthrough", location: "Kattakada", image: "/images/about-story-lotus-courtyard.webp" },
  { date: "18 Jul", title: "Physician insight evening", location: "Kowdiar OP", image: "/images/about-purpose-mission-bowl.webp" },
  { date: "29 Jun", title: "Monsoon care experience", location: "Ayur Village", image: "/images/testimonial-lamp-flowers.webp" },
];
