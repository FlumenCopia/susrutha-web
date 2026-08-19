import Image from "next/image";
import Link from "next/link";
import { MapPin, Clock, Check, Phone, ArrowRight } from "lucide-react";

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
                <p className="branch-addr-text">
                  <MapPin size={15} strokeWidth={1.5} className="inline-icon" style={{ display: "inline-block", verticalAlign: "-2px", marginRight: "6px", color: "var(--gold, #d97706)" }} />
                  {branch.address}
                </p>
                <p className="branch-timing-text">
                  <Clock size={15} strokeWidth={1.5} className="inline-icon" style={{ display: "inline-block", verticalAlign: "-2px", marginRight: "6px", color: "var(--gold, #d97706)" }} />
                  {branch.timing}
                </p>

                <div className="branch-features-wrap">
                  {branch.features.map((feat) => (
                    <span key={feat} className="branch-feat-chip">
                      <Check size={12} strokeWidth={1.75} style={{ display: "inline-block", verticalAlign: "-1px", marginRight: "4px" }} />
                      {feat}
                    </span>
                  ))}
                </div>

                <div className="branch-card-actions-row">
                  <a href={`tel:${branch.phone.replaceAll(" ", "")}`} className="branch-call-btn">
                    <Phone size={14} strokeWidth={1.5} style={{ display: "inline-block", verticalAlign: "-2px", marginRight: "6px" }} />
                    {branch.phone}
                  </a>
                  <Link href="/branches" className="branch-explore-link">
                    Explore Facility <ArrowRight size={13} strokeWidth={1.5} style={{ display: "inline-block", verticalAlign: "-1px", marginLeft: "4px" }} />
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
