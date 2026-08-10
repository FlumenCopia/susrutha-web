import Link from "next/link";
import { SiteShell } from "./components/common/SiteShell";

export default function NotFound() {
  return (
    <SiteShell>
      <section className="inner-hero">
        <span className="eyebrow">404</span>
        <h1>Page Not Found</h1>
        <p>The page you are looking for is unavailable or may have moved.</p>
        <div className="hero-actions">
          <Link className="btn btn-primary" href="/">Back to Home</Link>
          <Link className="btn btn-secondary" href="/contact-us">Contact Us</Link>
        </div>
      </section>
      
    </SiteShell>
  );
}
