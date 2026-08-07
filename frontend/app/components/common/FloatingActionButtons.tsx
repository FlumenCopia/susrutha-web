"use client";

import React, { useState, useEffect } from "react";

export function FloatingActionButtons() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    // Check initial scroll position
    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="floating-buttons-container" aria-label="Floating Actions">
      {/* Scroll to Top Button */}
      <button
        type="button"
        onClick={scrollToTop}
        className={`floating-btn scroll-top-btn ${showScrollTop ? "visible" : ""}`}
        aria-label="Scroll to top"
        title="Scroll to top"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M18 15l-6-6-6 6" />
        </svg>
        <span className="floating-tooltip">Scroll to Top</span>
      </button>

      {/* WhatsApp Button */}
      <a
        href="https://wa.me/919447003191?text=Hello%20Susrutha%20Ayurveda,%20I%20would%20like%20to%20inquire%20about%20your%20services."
        target="_blank"
        rel="noopener noreferrer"
        className="floating-btn whatsapp-btn"
        aria-label="Chat on WhatsApp"
        title="Chat on WhatsApp"
      >
        <svg
          width="26"
          height="26"
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M12.012 2c-5.506 0-9.989 4.478-9.99 9.984a9.944 9.944 0 0 0 1.34 5.011L2 22l5.127-1.342a9.946 9.946 0 0 0 4.885 1.326h.004c5.507 0 9.99-4.478 9.99-9.985 0-2.668-1.039-5.176-2.926-7.063A9.923 9.923 0 0 0 12.012 2zm.004 18.315h-.003a8.283 8.283 0 0 1-4.223-1.162l-.303-.18-3.137.822.837-3.056-.197-.314a8.272 8.272 0 0 1-1.272-4.44c.002-4.562 3.714-8.272 8.278-8.272 2.212 0 4.29.86 5.852 2.424a8.223 8.223 0 0 1 2.422 5.852c0 4.563-3.712 8.274-8.272 8.274zm4.538-6.2c-.248-.124-1.468-.724-1.696-.807-.228-.083-.394-.124-.56.124-.165.248-.641.807-.786.973-.145.165-.29.186-.538.062a6.782 6.782 0 0 1-2.001-1.233 7.487 7.487 0 0 1-1.385-1.724c-.145-.248-.016-.382.108-.506.112-.112.248-.29.373-.435.124-.145.165-.248.248-.414.083-.166.042-.311-.02-.435-.063-.124-.56-1.35-.767-1.847-.2-.484-.404-.418-.56-.426l-.476-.008c-.166 0-.435.062-.663.311-.228.248-.87.849-.87 2.071 0 1.222.89 2.402 1.014 2.568.124.165 1.752 2.675 4.244 3.75.593.256 1.056.409 1.417.524.595.189 1.137.162 1.565.098.477-.071 1.468-.6 1.674-1.18.207-.58.207-1.076.145-1.18-.062-.104-.228-.166-.476-.29z" />
        </svg>
        <span className="floating-tooltip">Chat on WhatsApp</span>
      </a>
    </div>
  );
}
