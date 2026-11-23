import Image from "next/image";
import Link from "next/link";
import "./about-purpose.css";

export function AboutPurposeSection() {
  return (
    <section className="ap-section">
      <div className="ap-container">
        {/* Left Column: Our Mission & Actions */}
        <div className="ap-left">
          <div className="ap-mission-card">
            <div className="ap-mission-img-wrap">
              <Image
                src="/images/about-purpose-still-life.webp"
                alt="Our Mission"
                width={600}
                height={350}
                className="ap-mission-img"
              />
            </div>
            <div className="ap-mission-content">
              <div className="ap-mission-header">
                <h2 className="ap-title">Our Mission</h2>
              </div>
              <p className="ap-desc ap-desc-ml" lang="ml">
                ആയുർവേദത്തിന്റെ മഹാനായ ആചാര്യൻ സുശ്രുതന്റെ നാമത്തിൽ നമ്മുടെ സ്ഥാപനത്തെ ഒരു ആഗോള ആയുർവേദ ബ്രാൻഡായി വളർത്തുകയും, ഭാരതത്തിന്റെ പ്രാചീന ആരോഗ്യപരിപാലന രീതികളെ ലോകമെമ്പാടും പ്രചരിപ്പിക്കുകയും ചെയ്യുന്നതാണ്.
              </p>
              <p className="ap-desc ap-desc-en">
                Our Mission, in the name of Susrutha, the great Ayurveda exponent, is to change our institution into a global Ayurvedic brand and spread the ancient Indian health practices around the globe.
              </p>
            </div>
          </div>

          <div className="ap-actions">
            <Link href="/contact-us" className="ap-btn ap-btn-dark">
              Book a Consultation
            </Link>
            <Link href="/contact-us" className="ap-btn ap-btn-outline">
              Contact Us
            </Link>
          </div>
        </div>

        {/* Right Column: Main Image, Floating Badges & Our Vision */}
        <div className="ap-right">
          <div className="ap-main-img-wrap">
            <Image
              src="/images/about-susrutha-wellness.webp"
              alt="Ayurveda Care Facility"
              width={800}
              height={500}
              className="ap-main-img"
              priority
            />

            {/* Floating Badge 1 (Bottom Left) */}
            <div className="ap-badge ap-badge-facilities">
              <div className="ap-badge-icon">
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3z" />
                  <path d="M7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" />
                </svg>
              </div>
              <div className="ap-badge-info">
                <span className="ap-badge-num">100+</span>
                <span className="ap-badge-text">Advance Facilities</span>
              </div>
            </div>

            {/* Floating Badge 2 (Bottom Right) */}
            {/* <div className="ap-badge ap-badge-award">
              <div className="ap-badge-icon">
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
                  <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
                  <path d="M4 22h16" />
                  <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
                  <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
                  <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
                </svg>
              </div>
              <p className="ap-award-desc">Recognized for excellence in maternity care.</p>
              <span className="ap-award-num">50+</span>
            </div> */}
          </div>

          {/* Our Vision Block */}
          <div className="ap-vision-block">
            <div className="ap-vision-header">
              <h2 className="ap-title">Our Vision</h2>
            </div>
            <p className="ap-desc ap-desc-ml" lang="ml">
              ഉയർന്ന നിലവാരമുള്ള ഔഷധങ്ങളും എല്ലാവർക്കും കൈവശപ്പെടുന്ന ചെലവിൽ ചികിത്സകളും നൽകിക്കൊണ്ട്, ആരോഗ്യപൂർണ്ണമായ ഒരു നാളെയെന്ന സ്വപ്നം സാക്ഷാത്കരിക്കുകയാണ് നമ്മുടെ ദർശനം
            </p>
            <p className="ap-desc ap-desc-en">
              Our Vision is to deliver high quality medicines and affordable treatments for every one and realizing the dream of a healthy tomorrow
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
