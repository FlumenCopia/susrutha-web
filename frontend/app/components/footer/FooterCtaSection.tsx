import Image from "next/image";
import Link from "next/link";

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 28 28" aria-hidden="true" focusable="false">
      <path d="M7.2 22.1 8.4 18A8.3 8.3 0 1 1 11 20.6l-3.8 1.5Z" />
      <path d="M11.7 9.8c-.2-.5-.4-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.4-1.1 1.1-1.1 2.6s1.1 3 1.3 3.2c.2.2 2.2 3.5 5.4 4.7 2.7 1 3.2.8 3.8.8.6-.1 1.8-.8 2.1-1.5.3-.7.3-1.3.2-1.5-.1-.2-.3-.3-.7-.5l-2.1-1c-.3-.1-.6-.2-.8.2-.2.3-.8 1-1 1.2-.2.2-.4.2-.8.1-.4-.2-1.5-.6-2.8-1.8-1-1-1.7-2.1-1.9-2.5-.2-.4 0-.6.2-.8l.5-.6c.2-.2.2-.4.3-.6.1-.2.1-.5 0-.7l-.9-2.2Z" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg viewBox="0 0 28 28" aria-hidden="true" focusable="false">
      <path d="M9.2 5.5 6.7 8c-.8.8-.9 2-.3 3 2.2 4.2 5.4 7.4 9.6 9.6 1 .5 2.2.4 3-.4l2.5-2.5-4.1-4.1-2 2c-1.9-1.1-3.7-2.8-4.8-4.8l2-2-3.4-3.3Z" />
    </svg>
  );
}

export function FooterCtaSection() {
  return (
    <section className="footer-cta-section" aria-label="Book your consultation">
      {/* <div className="footer-cta-image" aria-hidden="true">
        <Image
          src="/images/faq-ayurveda-still-life.png"
          alt=""
          width={560}
          height={360}
          sizes="(max-width: 900px) 100vw, 330px"
        />
      </div> */}

      {/* <div className="footer-cta-copy">
        <span>Ready to start your healing journey?</span>
        <h2>Book Your Consultation Today</h2>
        <p>Take the first step towards a healthier, happier you.</p>
      </div> */}

      {/* <div className="footer-cta-actions">
        <Link className="footer-cta-button footer-cta-button-primary" href="/appointment">
          Book Appointment
        </Link>
        <a className="footer-cta-button" href="https://wa.me/919447003191">
          <WhatsAppIcon />
          Chat on WhatsApp
        </a>
        <a className="footer-cta-phone" href="tel:+919447003191">
          <PhoneIcon />
          <span>
            Call us directly
            <strong>+91 94470 03191</strong>
          </span>
        </a>
      </div> */}
    </section>
  );
}
