import { Footer } from "../footer/Footer";
import { FooterCtaSection } from "../footer/FooterCtaSection";
import { Navbar } from "../navbar/Navbar";

type SiteShellProps = {
  children: React.ReactNode;
};

export function SiteShell({ children }: SiteShellProps) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <FooterCtaSection />
      <Footer />
    </>
  );
}
