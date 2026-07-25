import Image from "next/image";

export function AboutLegacySection() {
  return (
    <section className="about-premium-legacy" id="legacy">
      <div className="about-premium-legacy-image">
        <Image src="/images/legacy-verandah.png" alt="Kerala heritage Ayurveda building" width={1120} height={760} />
        <strong aria-hidden="true">1987</strong>
      </div>
      <div className="about-premium-legacy-copy">
        <span>Our Legacy</span>
        <h2>A heritage of Ayurveda care carried with discipline and grace.</h2>
        <ol>
          <li><b>1987</b><i />Foundation</li>
          <li><b>1995</b><i />Research Excellence</li>
          <li><b>2005</b><i />Thousands of Patients</li>
          <li><b>2025</b><i />Global Recognition</li>
        </ol>
      </div>
    </section>
  );
}
