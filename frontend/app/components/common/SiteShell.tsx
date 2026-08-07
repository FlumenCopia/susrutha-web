import { Footer } from "../footer/Footer";
import { Navbar } from "../navbar/Navbar";
import { FloatingActionButtons } from "./FloatingActionButtons";

type SiteShellProps = {
  children: React.ReactNode;
};

export function SiteShell({ children }: SiteShellProps) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
      <FloatingActionButtons />
    </>
  );
}

