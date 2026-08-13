import type { Metadata } from "next";
import "./globals.css";

import "../public/css/base.css";
import "../public/css/components.css"; 
import "../public/css/pages.css"; 
import "../public/css/responsive.css";

export const metadata: Metadata = {
  title: "Susrutha Ayurveda | Panchakarma Hospital in Thiruvananthapuram",
  description:
    "Premium Ayurveda hospital care, Panchakarma treatments, specialist doctors, and wellness services in Kattakada and Kowdiar.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
          integrity="sha512-DTOQO9RWCH3ppGqcWaEA1BIZOC6xxalwEsw9c2QQeAIftl+Vegovlnee1c9QX4TctnWMn13TZye+giMm8e2LwA=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
