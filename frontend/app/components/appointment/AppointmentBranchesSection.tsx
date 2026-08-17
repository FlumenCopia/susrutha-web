import Image from "next/image";
import Link from "next/link";

const branchLocations = [
  {
    id: "kattakada",
    name: "Susrutha Kattakada Centre",
    type: "Flagship Specialty Hospital",
    address: "Kattakada Town, Thiruvananthapuram, Kerala 695572",
    timing: "OPD: Mon - Sat (8:00 AM - 7:00 PM)",
    phone: "+91 9645 555 888",
    image: "/images/kattakada-hero-landscape.webp",
    features: ["Inpatient Beds", "Panchakarma Suites", "Pharmacy"],
  },
  {
    id: "kowdiar",
    name: "Susrutha Kowdiar Clinic",
    type: "Premium Outpatient Clinic",
    address: "Kowdiar Main Avenue, Thiruvananthapuram, Kerala 695003",
    timing: "OPD: Mon - Sun (9:00 AM - 8:00 PM)",
    phone: "+91 9645 555 888",
    image: "/images/kowdiar-streetview.webp",
    features: ["Specialist OPD", "Nadi Pariksha", "Wellness Care"],
  },
];

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
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      style={{ display: "inline-block", verticalAlign: "-2px", marginRight: "6px" }}
                    >
                      <path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                    </svg>
                    {branch.phone}
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
