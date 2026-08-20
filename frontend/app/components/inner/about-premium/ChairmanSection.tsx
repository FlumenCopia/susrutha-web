import Image from "next/image";
import Link from "next/link";
import "./chairman.css";

export function ChairmanSection() {
  return (
    <section className="cm-section">
      <div className="cm-container">
        {/* Left Column: Chairman Details */}
        <div className="cm-left">
          <span className="cm-eyebrow">CHAIRMAN'S LEGACY</span>
          <h2 className="cm-title">Dr. Krishnankutty Nair</h2>
          <p className="cm-role">Former Chairman &amp; Managing Director</p>
          <p className="cm-desc">
            Dr. Krishnankutty Nair was the Former Chairman &amp; Managing Director of Susrutha Institute of Ayurvedic
            Sciences and Panchakarma Hospital. A clinician, professor, and healthcare visionary with over 40 years of
            experience in Ayurveda, he was a recipient of the Pride of India Award, Indira Gandhi Sadbhavana Award, and
            Rashtreeya Rattan Award. Retiring as Superintendent &amp; HoD of Panchakarma at Govt. Ayurveda College,
            Trivandrum, his wisdom continues to guide our hospital.
          </p>

        </div>

        {/* Right Column: Chairman Image Card */}
        <div className="cm-right">
          <div className="cm-img-wrap">
            <Image
            src="/ch.png"
              alt="Dr. Krishnankutty Nair"
              width={800}
              height={500}
              className="cm-img"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
