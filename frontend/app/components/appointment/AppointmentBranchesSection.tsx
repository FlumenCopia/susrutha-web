import Image from "next/image";
import Link from "next/link";
import { branchLocations } from "./appointmentData";

export function AppointmentBranchesSection() {
  return (
    <section className="apt-branches-luxury">
      <div className="apt-branches-container-luxury">
        <div className="apt-section-header text-center">
          <span className="apt-eyebrow-badge-gold">OUR CENTERS & HOSPITALS</span>
          <h2 className="apt-section-title-luxury">Consult at Your Preferred Susrutha Center</h2>
          <p className="apt-section-subhead-luxury">State-of-the-art diagnostic suites, Panchakarma treatment rooms, and inpatient suites</p>
        </div>

        <div className="apt-branches-grid-deluxe">
          {branchLocations.map((branch) => (
            <article key={branch.id} className="apt-branch-card-deluxe">
              <div className="branch-card-media-deluxe">
                <Image src={branch.image} alt={branch.name} fill sizes="(max-width: 768px) 100vw, 33vw" className="branch-media-img" />
                <div className="branch-media-gradient" />
                <span className="branch-type-pill">{branch.type}</span>
              </div>

              <div className="branch-card-body-deluxe">
                <h3>{branch.name}</h3>
                <p className="branch-addr-text">📍 {branch.address}</p>
                <p className="branch-timing-text">⏱️ {branch.timing}</p>

                <div className="branch-features-wrap">
                  {branch.features.map((feat) => (
                    <span key={feat} className="branch-feat-chip">
                      ✓ {feat}
                    </span>
                  ))}
                </div>

                <div className="branch-card-actions-row">
                  <a href={`tel:${branch.phone.replaceAll(" ", "")}`} className="branch-call-btn">
                    📞 {branch.phone}
                  </a>
                  <Link href="/branches" className="branch-explore-link">
                    Explore Facility &rarr;
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
