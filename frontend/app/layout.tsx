import type { Metadata } from "next";
import "./globals.css";
import "../public/css/main.css";

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
      <body>{children}</body>
    </html>
  );
}
