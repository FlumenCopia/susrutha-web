export type VideoChapter = {
  timestamp: string;
  title: string;
};

export type DoctorSpeaker = {
  name: string;
  role: string;
  avatar: string;
  verified?: boolean;
};

export type VideoItem = {
  id: string;
  title: string;
  description: string;
  category: string;
  duration: string;
  thumbnail: string;
  youtubeId: string;
  views: string;
  rating: string;
  level: "Beginner" | "Intermediate" | "Clinical Guide" | "Masterclass";
  speaker: DoctorSpeaker;
  chapters?: VideoChapter[];
  transcript?: string;
  featured?: boolean;
};

export type ContinueWatchingItem = {
  id: string;
  title: string;
  category: string;
  currentTimestamp: string;
  totalDuration: string;
  timeLeft: string;
  progressPercent: number;
  thumbnail: string;
  youtubeId: string;
  speaker: DoctorSpeaker;
};

export type VideoPlaylist = {
  id: string;
  title: string;
  description: string;
  category: string;
  videoCount: number;
  totalDuration: string;
  thumbnail: string;
  speaker: DoctorSpeaker;
};

export type VideoPodcast = {
  id: string;
  episodeNumber: string;
  title: string;
  summary: string;
  duration: string;
  date: string;
  thumbnail: string;
  youtubeId: string;
  host: DoctorSpeaker;
  guest: DoctorSpeaker;
};

export type PatientStory = {
  id: string;
  patientName: string;
  age: string;
  condition: string;
  treatmentDuration: string;
  quote: string;
  thumbnail: string;
  youtubeId: string;
  rating: string;
  verified: boolean;
};

export const videoCategories = [
  "All",
  "Panchakarma",
  "Abhyanga",
  "Shirodhara",
  "Yoga & Wellness",
  "Herbal Therapies",
  "Diet & Nutrition",
  "Lifestyle",
] as const;

export type VideoCategory = (typeof videoCategories)[number];

export const doctorSpeakers: Record<string, DoctorSpeaker> = {
  krishnakumar: {
    name: "Dr. Krishnakumar K.",
    role: "Senior Physician, MD (Ayur)",
    avatar: "/images/doctor-portrait.webp",
    verified: true,
  },
  sreeja: {
    name: "Dr. Sreeja Krishna S.",
    role: "BAMS, Chief Consultation Officer",
    avatar: "/images/doctor-sreeja.webp",
    verified: true,
  },
  priyanka: {
    name: "Dr. Priyanka R.",
    role: "Gynaecology & Obstetrics Specialist",
    avatar: "/images/doctor-priyanka.webp",
    verified: true,
  },
  rajesh: {
    name: "Dr. Rajesh R.",
    role: "Panchakarma Specialist, MD (Ayur)",
    avatar: "/images/doctor-rajesh.webp",
    verified: true,
  },
  anju: {
    name: "Dr. Anju S.",
    role: "Lifestyle & Preventive Medicine Expert",
    avatar: "/images/doctor-anju.webp",
    verified: true,
  },
};

export const featuredVideosData: VideoItem[] = [
  {
    id: "v1",
    title: "Introduction to Panchakarma",
    description: "Detoxify, rejuvenate and restore balance the Ayurvedic way through classical 5-stage purification.",
    category: "Panchakarma",
    duration: "12:45",
    thumbnail: "/images/treatment-panchakarma.webp",
    youtubeId: "dQw4w9WgXcQ",
    views: "14.2K views",
    rating: "4.9 ★",
    level: "Masterclass",
    speaker: doctorSpeakers.krishnakumar,
    featured: true,
    chapters: [
      { timestamp: "00:00", title: "Understanding Dosha Imbalance & Toxins (Ama)" },
      { timestamp: "02:30", title: "The 5 Classical Panchakarma Purification Therapies" },
      { timestamp: "06:15", title: "Purva Karma: Preparation, Oleation (Snehana) & Steam" },
      { timestamp: "09:40", title: "Paschat Karma: Rejuvenating Diet & Routine" },
    ],
    transcript:
      "Welcome to Susrutha Ayurveda. Panchakarma is not merely a relaxation therapy, but a deep physiological cleansing protocol designed to root out metabolic waste (Ama) accumulated in deeper tissues. Under physician supervision, Panchakarma follows three systematic stages: Purva Karma (preparation), Pradhana Karma (main cleansing therapies), and Paschat Karma (post-treatment rasayana nourishment). In this masterclass, Senior Physician Dr. Krishnakumar K. breaks down each step of the journey.",
  },
  {
    id: "v2",
    title: "Abhyanga Therapy Benefits & Technique",
    description: "The art of warm Ayurvedic oil massage for body-mind harmony, joint mobility, and skin vitality.",
    category: "Abhyanga",
    duration: "14:30",
    thumbnail: "/images/treatment-sirodhara.webp",
    youtubeId: "dQw4w9WgXcQ",
    views: "9.8K views",
    rating: "4.8 ★",
    level: "Clinical Guide",
    speaker: doctorSpeakers.rajesh,
    featured: true,
    chapters: [
      { timestamp: "00:00", title: "Choosing Medicated Oil Formulations for Doshas" },
      { timestamp: "03:20", title: "Rhythmic Stroke Dynamics along Energy Channels" },
      { timestamp: "08:10", title: "Marma Point Stimulation & Pressure" },
      { timestamp: "11:45", title: "Post-Massaged Warm Swedana Herbal Steam" },
    ],
    transcript:
      "Abhyanga is classical warm oil massage administered in rhythmic strokes matching the arterial and lymphatic flow of the body. Formulated with herbal medicated oils selected according to your Prakriti, Abhyanga lubricates joints, nourishes nervous tissue, improves sleep quality, and tones muscles.",
  },
  {
    id: "v3",
    title: "Shirodhara for Stress Relief & Better Sleep",
    description: "Calm your mind and restore deep nervous system balance with continuous warm oil pouring.",
    category: "Shirodhara",
    duration: "11:20",
    thumbnail: "/images/treatment-sirodhara.webp",
    youtubeId: "dQw4w9WgXcQ",
    views: "18.5K views",
    rating: "5.0 ★",
    level: "Clinical Guide",
    speaker: doctorSpeakers.krishnakumar,
    featured: true,
    chapters: [
      { timestamp: "00:00", title: "Neurological & Mental Health Benefits" },
      { timestamp: "02:45", title: "Selecting Taila vs. Takra Shirodhara" },
      { timestamp: "07:10", title: "Physiology of the Third Eye Marma Point" },
    ],
    transcript:
      "Shirodhara involves the gentle, continuous pouring of warm medicated herbal oil over the forehead. This clinical procedure calms the central nervous system, regulates serotonin and melatonin levels, reduces anxiety, and alleviates chronic insomnia.",
  },
  {
    id: "v4",
    title: "Yoga for Daily Balance",
    description: "Simple restorative asanas and pranayama breathing practices for daily energy and clarity.",
    category: "Yoga & Wellness",
    duration: "10:15",
    thumbnail: "/images/ayurveda-hero.webp",
    youtubeId: "dQw4w9WgXcQ",
    views: "8.1K views",
    rating: "4.9 ★",
    level: "Beginner",
    speaker: doctorSpeakers.anju,
    featured: true,
    chapters: [
      { timestamp: "00:00", title: "Gentle Morning Warm-up Asanas" },
      { timestamp: "04:10", title: "Spine Mobility Flow & Alignment" },
      { timestamp: "07:30", title: "Nadi Shodhana Alternate Nostril Breathing" },
    ],
    transcript:
      "Integrating daily movement with breath awareness grounds the mind and prevents stagnation of Prana. Dr. Anju S. guides a gentle 10-minute routine suitable for all ages.",
  },
  {
    id: "v5",
    title: "Power of Ayurvedic Herbs",
    description: "Discover Ashwagandha, Brahmi, Amalaki and ancient herbs for vitality and immunity.",
    category: "Herbal Therapies",
    duration: "13:05",
    thumbnail: "/images/treatment-herbal-medicine.webp",
    youtubeId: "dQw4w9WgXcQ",
    views: "11.6K views",
    rating: "4.8 ★",
    level: "Intermediate",
    speaker: doctorSpeakers.sreeja,
    featured: true,
    chapters: [
      { timestamp: "00:00", title: "Rasa, Virya & Vipaka Concepts in Herbal Science" },
      { timestamp: "04:50", title: "Adaptogens for Daily Resilience & Vitality" },
      { timestamp: "09:20", title: "Brewing Fresh Herbal Decoctions (Kashayam)" },
    ],
    transcript:
      "Ayurvedic herbs work synergistically rather than isolated chemical extractions. Learn how classical rasayana herbs like Ashwagandha, Brahmi, and Guduchi balance cellular immunity.",
  },
  {
    id: "v6",
    title: "Ayurvedic Diet for Every Season",
    description: "Ritucharya diet guide to eat with the changing seasons and maintain Agni (digestive fire).",
    category: "Diet & Nutrition",
    duration: "09:40",
    thumbnail: "/images/faq-ayurveda-still-life.webp",
    youtubeId: "dQw4w9WgXcQ",
    views: "15.3K views",
    rating: "4.9 ★",
    level: "Beginner",
    speaker: doctorSpeakers.priyanka,
    featured: true,
    chapters: [
      { timestamp: "00:00", title: "Agni and Digestive Health Basics" },
      { timestamp: "03:15", title: "Summer vs. Monsoon Seasonal Food Choices" },
      { timestamp: "06:40", title: "The 6 Tastes (Shad Rasa) for Satisfying Meals" },
    ],
    transcript:
      "Food is medicine when consumed according to seasonal transitions (Ritucharya) and individual Agni strength. Dr. Priyanka R. presents practical meal guidelines for everyday vitality.",
  },
  {
    id: "v7",
    title: "Njavarakizhi Nourishing Poultice Therapy",
    description: "Deep muscle nourishment, nerve strength, and joint rejuvenation with medicated rice boluses.",
    category: "Panchakarma",
    duration: "15:10",
    thumbnail: "/images/treatment-njavarakizhi.webp",
    youtubeId: "dQw4w9WgXcQ",
    views: "7.4K views",
    rating: "4.9 ★",
    level: "Clinical Guide",
    speaker: doctorSpeakers.rajesh,
    chapters: [
      { timestamp: "00:00", title: "Njavara Rice Preparation in Herbal Milk" },
      { timestamp: "05:10", title: "Therapeutic Application for Neuromuscular Care" },
    ],
    transcript:
      "Njavarakizhi is a classical Kerala therapy using warm boluses filled with special Njavara rice cooked in herbal decoctions and milk. It restores muscle tone and relieves nerve weakness.",
  },
  {
    id: "v8",
    title: "Kati Basti - Spine & Lower Back Care",
    description: "Localized warm herbal oil pooling for chronic lumbar pain and vertebral comfort.",
    category: "Abhyanga",
    duration: "08:50",
    thumbnail: "/images/treatment-kati-vasti.webp",
    youtubeId: "dQw4w9WgXcQ",
    views: "12.1K views",
    rating: "4.9 ★",
    level: "Clinical Guide",
    speaker: doctorSpeakers.krishnakumar,
    chapters: [
      { timestamp: "00:00", title: "Dough Reservoir Construction over Lumbar Spine" },
      { timestamp: "03:30", title: "Warm Oil Temperature & Circulation Management" },
    ],
    transcript:
      "Kati Basti creates a sealed dam of dough over the lower back, filling it with warm medicated herbal oil to penetrate deep into lumbar vertebrae and spinal nerves.",
  },
];

export const continueWatchingData: ContinueWatchingItem[] = [
  {
    id: "cw1",
    title: "Panchakarma Step by Step",
    category: "Panchakarma",
    currentTimestamp: "08:12",
    totalDuration: "15:30",
    timeLeft: "7 mins left",
    progressPercent: 54,
    thumbnail: "/images/treatment-panchakarma.webp",
    youtubeId: "dQw4w9WgXcQ",
    speaker: doctorSpeakers.krishnakumar,
  },
  {
    id: "cw2",
    title: "Dinacharya – Daily Routine in Ayurveda",
    category: "Lifestyle",
    currentTimestamp: "06:45",
    totalDuration: "12:20",
    timeLeft: "5 mins left",
    progressPercent: 55,
    thumbnail: "/images/about-susrutha-wellness.webp",
    youtubeId: "dQw4w9WgXcQ",
    speaker: doctorSpeakers.anju,
  },
  {
    id: "cw3",
    title: "Pranayama for Beginners",
    category: "Yoga & Wellness",
    currentTimestamp: "04:10",
    totalDuration: "09:30",
    timeLeft: "5 mins left",
    progressPercent: 44,
    thumbnail: "/images/ayurveda-hero.webp",
    youtubeId: "dQw4w9WgXcQ",
    speaker: doctorSpeakers.anju,
  },
  {
    id: "cw4",
    title: "Immunity Boosting Ayurvedic Foods",
    category: "Diet & Nutrition",
    currentTimestamp: "07:05",
    totalDuration: "11:15",
    timeLeft: "4 mins left",
    progressPercent: 63,
    thumbnail: "/images/faq-ayurveda-still-life.webp",
    youtubeId: "dQw4w9WgXcQ",
    speaker: doctorSpeakers.priyanka,
  },
];

export const playlistsData: VideoPlaylist[] = [
  {
    id: "pl1",
    title: "Panchakarma Detox Masterclass",
    description: "Complete 4-part series explaining preparation, therapies, diet and post-treatment rasayana.",
    category: "Panchakarma",
    videoCount: 4,
    totalDuration: "52 mins",
    thumbnail: "/images/treatment-panchakarma.webp",
    speaker: doctorSpeakers.krishnakumar,
  },
  {
    id: "pl2",
    title: "Spine & Joint Health Protocols",
    description: "Ayurvedic care strategies for lower back pain, neck stiffness, and osteo-care.",
    category: "Abhyanga",
    videoCount: 3,
    totalDuration: "38 mins",
    thumbnail: "/images/treatment-kati-vasti.webp",
    speaker: doctorSpeakers.rajesh,
  },
  {
    id: "pl3",
    title: "Women's Health & Hormonal Balance",
    description: "Physician-guided episodes on fertility, prenatal care, menstrual harmony, and postnatal recovery.",
    category: "Diet & Nutrition",
    videoCount: 5,
    totalDuration: "64 mins",
    thumbnail: "/images/ayurveda-hero.webp",
    speaker: doctorSpeakers.priyanka,
  },
];

export const podcastEpisodesData: VideoPodcast[] = [
  {
    id: "pod1",
    episodeNumber: "EPISODE 04",
    title: "The Clinical Science of Panchakarma Detox & Metabolic Reset",
    summary: "Senior Physician Dr. Krishnakumar K. & Dr. Sreeja Krishna discuss root-cause healing, cellular cleansing, and seasonal monsoon Panchakarma protocols.",
    duration: "28:40",
    date: "AUG 2026",
    thumbnail: "/images/doctors-ayurveda-mortar-hero.webp",
    youtubeId: "dQw4w9WgXcQ",
    host: doctorSpeakers.krishnakumar,
    guest: doctorSpeakers.sreeja,
  },
  {
    id: "pod2",
    episodeNumber: "EPISODE 03",
    title: "Managing Modern Stress & Burnout with Shirodhara and Meditation",
    summary: "An in-depth physician roundtable exploring nervous system regulation, vagus nerve stimulation, and Ayurvedic sleep medicine.",
    duration: "24:15",
    date: "JUL 2026",
    thumbnail: "/images/treatment-sirodhara.webp",
    youtubeId: "dQw4w9WgXcQ",
    host: doctorSpeakers.rajesh,
    guest: doctorSpeakers.anju,
  },
];

export const patientStoriesData: PatientStory[] = [
  {
    id: "ps1",
    patientName: "Rajesh Nair",
    age: "48 Yrs",
    condition: "Chronic Back Pain & Sciatica",
    treatmentDuration: "14-Day Inpatient Panchakarma",
    quote: "Kati Basti and Panchakarma at Susrutha restored my spinal mobility without surgical intervention.",
    thumbnail: "/images/treatment-kati-vasti.webp",
    youtubeId: "dQw4w9WgXcQ",
    rating: "5.0 ★",
    verified: true,
  },
  {
    id: "ps2",
    patientName: "Lakshmi Menon",
    age: "42 Yrs",
    condition: "Insomnia & High Anxiety",
    treatmentDuration: "7-Day Shirodhara Programme",
    quote: "After months of poor sleep, Shirodhara brought a deep sense of peace and natural sleep rhythm back.",
    thumbnail: "/images/treatment-sirodhara.webp",
    youtubeId: "dQw4w9WgXcQ",
    rating: "5.0 ★",
    verified: true,
  },
  {
    id: "ps3",
    patientName: "David Miller",
    age: "54 Yrs",
    condition: "Psoriasis & Skin Sensitivity",
    treatmentDuration: "21-Day Rejuvenation Stay",
    quote: "The personalized diet and herbal oil therapies cleared my skin inflammation completely.",
    thumbnail: "/images/treatment-panchakarma.webp",
    youtubeId: "dQw4w9WgXcQ",
    rating: "4.9 ★",
    verified: true,
  },
];
