import Image from "next/image";
import Link from "next/link";

function LotusIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 72 72" aria-hidden="true" focusable="false">
      <path d="M36 7c7 10 7 18 0 29-7-11-7-19 0-29Z" />
      <path d="M36 36C25 30 21 21 23 9c10 6 14 15 13 27Z" />
      <path d="M36 36C47 30 51 21 49 9c-10 6-14 15-13 27Z" />
      <path d="M36 39C24 39 16 33 10 22c12 0 20 6 26 17Z" />
      <path d="M36 39c12 0 20-6 26-17-12 0-20 6-26 17Z" />
      <path d="M36 42c-11 7-21 7-31 0 11-7 21-7 31 0Z" />
      <path d="M36 42c11 7 21 7 31 0-11-7-21-7-31 0Z" />
      <path d="M36 36v27" />
      <path d="M21 54h30" />
    </svg>
  );
}

function ContactIcon({ type }: { type: "user" | "mail" | "phone" | "pen" | "pin" | "leaf" | "clock" | "shield" | "globe" | "send" | "arrow" }) {
  if (type === "user") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="12" cy="7.5" r="3.5" />
        <path d="M5.5 21a6.5 6.5 0 0 1 13 0" />
      </svg>
    );
  }

  if (type === "mail") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M4 6h16v12H4z" />
        <path d="m4 7 8 6 8-6" />
      </svg>
    );
  }

  if (type === "phone") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M8 4 5.5 6.5c-.8.8-.4 4.8 3.6 8.8s8 4.4 8.8 3.6L20 16l-4-3-2 2c-1.4-.7-3.3-2.5-4-4l2-2-4-5Z" />
      </svg>
    );
  }

  if (type === "pen") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="m4 17-.5 3.5L7 20l11-11-3-3L4 17Z" />
        <path d="m13.5 7.5 3 3" />
      </svg>
    );
  }

  if (type === "pin") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 21s7-6.2 7-12a7 7 0 0 0-14 0c0 5.8 7 12 7 12Z" />
        <circle cx="12" cy="9" r="2.5" />
      </svg>
    );
  }

  if (type === "leaf") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M20 4C11 4 6 9 6 17c8 0 13-5 14-13Z" />
        <path d="M6 17c3-4 6-6 10-8" />
      </svg>
    );
  }

  if (type === "clock") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="12" cy="12" r="8" />
        <path d="M12 7v5l3 2" />
      </svg>
    );
  }

  if (type === "shield") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 3 19 6v5c0 5-3 8-7 10-4-2-7-5-7-10V6l7-3Z" />
        <path d="m9 12 2 2 4-5" />
      </svg>
    );
  }

  if (type === "globe") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="12" cy="12" r="8" />
        <path d="M4 12h16" />
        <path d="M12 4c2 2.2 3 4.9 3 8s-1 5.8-3 8c-2-2.2-3-4.9-3-8s1-5.8 3-8Z" />
      </svg>
    );
  }

  if (type === "send") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="m21 4-8 16-3-7-7-3 18-6Z" />
        <path d="m10 13 5-4" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 12h14" />
      <path d="m13 6 6 6-6 6" />
    </svg>
  );
}

const supportItems = [
  { icon: "leaf" as const, title: "Personalized", text: "Support" },
  { icon: "clock" as const, title: "Timely", text: "Response" },
  { icon: "shield" as const, title: "Confidential &", text: "Secure" },
];

const contactCards = [
  {
    icon: "pin" as const,
    title: "Our Address",
    lines: ["Susrutha Ayurveda Hospital", "Panchakarma & Wellness Center", "Door No. 47/881:1, Kanjikuzhi,", "Kottayam, Kerala - 686004, India"],
  },
  {
    icon: "phone" as const,
    title: "Call Us",
    lines: ["+91 481 350 1000", "+91 9387 510 100", "Mon - Sat: 8:00 AM - 7:00 PM", "Sunday: 9:00 AM - 1:00 PM"],
  },
  {
    icon: "mail" as const,
    title: "Email Us",
    lines: ["info@susruthaayurveda.com", "care@susruthaayurveda.com", "We aim to respond within", "24 hours."],
  },
  {
    icon: "globe" as const,
    title: "Website",
    lines: ["www.susruthaayurveda.com", "Explore treatments, programs", "and expert insights."],
  },
];

export function ContactReferencePage() {
  return (
    <div className="contact-reference-page">
      <div className="contact-reference-main">
        <section className="contact-reference-hero" aria-labelledby="contact-reference-title">
          <div className="contact-reference-leaves" aria-hidden="true" />
          <div className="contact-reference-aura" aria-hidden="true" />
          <div className="contact-reference-copy">
            <nav className="contact-reference-breadcrumb" aria-label="Breadcrumb">
              <Link href="/">Home</Link>
              <span aria-hidden="true">&rsaquo;</span>
              <span>Contact</span>
            </nav>
            <h1 id="contact-reference-title">
              We&rsquo;re Here
              <span>to Help You</span>
            </h1>
            <div className="contact-reference-title-rule" aria-hidden="true">
              <span />
              <LotusIcon />
            </div>
            <p>Have questions or need guidance? Our team is here for you. Reach out to us and experience compassionate care, every step of the way.</p>
            <div className="contact-reference-support">
              {supportItems.map((item) => (
                <article key={`${item.title}-${item.text}`}>
                  <span>
                    <ContactIcon type={item.icon} />
                  </span>
                  <p>
                    <strong>{item.title}</strong>
                    {item.text}
                  </p>
                </article>
              ))}
            </div>
          </div>

          <form className="contact-reference-form" aria-label="Send us a message">
            <div className="contact-reference-form-mark" aria-hidden="true">
              <LotusIcon />
            </div>
            <h2>Send Us a Message</h2>
            <span className="contact-reference-form-rule" aria-hidden="true" />
            <div className="contact-reference-form-grid">
              <label>
                <ContactIcon type="user" />
                <input name="name" placeholder="Full Name" />
              </label>
              <label>
                <ContactIcon type="mail" />
                <input name="email" type="email" placeholder="Email Address" />
              </label>
              <label className="wide">
                <ContactIcon type="phone" />
                <input name="phone" placeholder="Phone Number" />
              </label>
              <label className="wide">
                <select name="subject" defaultValue="">
                  <option value="" disabled>
                    Subject
                  </option>
                  <option>Book a consultation</option>
                  <option>Treatment enquiry</option>
                  <option>Patient support</option>
                </select>
              </label>
              <label className="wide message">
                <ContactIcon type="pen" />
                <textarea name="message" placeholder="Your Message" />
              </label>
            </div>
            <button type="button">
              Send Message
              <ContactIcon type="send" />
            </button>
          </form>
        </section>

        <section className="contact-reference-info" aria-labelledby="contact-info-title">
          <div className="contact-reference-info-glow" aria-hidden="true" />
          <h2 id="contact-info-title">Get in Touch</h2>
          <span className="contact-reference-small-rule" aria-hidden="true" />
          <div className="contact-reference-info-grid">
            {contactCards.map((card) => (
              <article key={card.title}>
                <span className="contact-reference-info-icon">
                  <ContactIcon type={card.icon} />
                </span>
                <h3>{card.title}</h3>
                {card.lines.map((line) => (
                  <p key={line}>{line}</p>
                ))}
              </article>
            ))}
          </div>
        </section>

        <section className="contact-reference-visit" aria-label="Visit Susrutha Ayurveda">
          <div className="contact-reference-still">
            <Image src="/images/faq-ayurveda-still-life.webp" alt="Ayurvedic herbs, brass vessel, and flowers" fill sizes="(max-width: 900px) 100vw, 50vw" />
            <div className="contact-reference-quote">
              <strong>&ldquo;</strong>
              <p>Rooted in Ayurveda. Dedicated to Your Well-being.</p>
              <LotusIcon />
            </div>
          </div>

          <div className="contact-reference-map">
            <div className="contact-reference-map-compass" aria-hidden="true">
              <LotusIcon />
            </div>
            <div className="contact-reference-map-lines" aria-hidden="true" />
            <span className="contact-reference-pin" aria-hidden="true">
              <LotusIcon />
            </span>
            <article className="contact-reference-visit-card">
              <h2>Visit Us</h2>
              <span className="contact-reference-small-rule" aria-hidden="true" />
              <p>We welcome you to experience holistic healing in a serene and nurturing environment.</p>
              <Link href="/contact-us">
                Get Directions
                <ContactIcon type="arrow" />
              </Link>
            </article>
          </div>
        </section>
      </div>
    </div>
  );
}
