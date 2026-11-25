import type { Metadata } from "next";
import "./globals.css";

import "../public/css/base.css";
import "../public/css/components.css"; 
import "../public/css/pages.css"; 
import "../public/css/responsive.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://susruthaayurveda.com"),
  title: {
    default: "Susrutha Ayurveda | Best Ayurvedic Hospital & Panchakarma Clinic in Trivandrum & Kowdiar",
    template: "%s | Susrutha Ayurveda",
  },
  description:
    "Authentic Kerala Ayurveda Hospital & Panchakarma Centre in Thiruvananthapuram (Kowdiar & Kattakada). Specialized care for spine, disc bulge, stroke rehabilitation, and arthritis by MD doctors.",
  keywords: [
    "best ayurvedic hospital in trivandrum",
    "ayurvedic clinic in kowdiar",
    "ayurvedic doctor in thiruvananthapuram",
    "panchakarma treatment kerala",
    "susrutha ayurveda",
    "spine and disc bulge treatment trivandrum",
    "stroke rehabilitation ayurveda kerala",
    "ayurvedic doctor kowdiar",
    "ayurveda hospital in kerala"
  ],
  authors: [{ name: "Susrutha Institute of Ayurvedic Sciences" }],
  creator: "Susrutha Ayurveda",
  publisher: "Susrutha Ayurveda",
  formatDetection: {
    email: false,
    address: true,
    telephone: true,
  },
  alternates: {
    canonical: "https://susruthaayurveda.com",
  },
  icons: {
    icon: "/images/favicon.webp",
    shortcut: "/images/favicon.webp",
    apple: "/images/favicon.webp",
  },
  openGraph: {
    title: "Susrutha Ayurveda | Best Ayurvedic Hospital & Panchakarma Clinic in Trivandrum & Kowdiar",
    description:
      "Authentic Kerala Ayurveda Hospital & Panchakarma Clinic in Thiruvananthapuram (Kowdiar & Kattakada). 40+ years of clinical excellence in Panchakarma, spine care, and stroke rehabilitation.",
    url: "https://susruthaayurveda.com",
    siteName: "Susrutha Ayurveda",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/images/hero-courtyard-ayurveda-v2.webp",
        width: 1200,
        height: 630,
        alt: "Susrutha Ayurveda Hospital & Clinic Thiruvananthapuram",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Susrutha Ayurveda | Ayurvedic Hospital in Trivandrum & Kowdiar",
    description:
      "Authentic Panchakarma, spine & joint care, and stroke rehabilitation in Thiruvananthapuram, Kerala.",
    images: ["/images/hero-courtyard-ayurveda-v2.webp"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/webp" href="/images/favicon.webp" />
        <link rel="shortcut icon" href="/images/favicon.webp" />
        <link rel="apple-touch-icon" href="/images/favicon.webp" />

        {/* Local Geo-Targeting Metadata (Kowdiar & Thiruvananthapuram, Kerala) */}
        <meta name="geo.region" content="IN-KL" />
        <meta name="geo.placename" content="Thiruvananthapuram, Kowdiar" />
        <meta name="geo.position" content="8.5241;76.9632" />
        <meta name="ICBM" content="8.5241, 76.9632" />

        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
          integrity="sha512-DTOQO9RWCH3ppGqcWaEA1BIZOC6xxalwEsw9c2QQeAIftl+Vegovlnee1c9QX4TctnWMn13TZye+giMm8e2LwA=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,300;1,400;1,500;1,600;1,700&display=swap"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
