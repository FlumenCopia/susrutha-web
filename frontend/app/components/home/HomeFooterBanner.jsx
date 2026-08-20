"use client";

import React from "react";
import Link from "next/link";

export function HomeFooterBanner() {
  return (
    <div style={{ backgroundColor: "#ffffff", width: "100%", padding: "10px 0" }}>
      <section
        className="home-footer-calm-banner"
        style={{ backgroundColor: "#ffffff" }}
        aria-labelledby="home-calm-title"
      >
        <div
          className="home-footer-calm-bg"
          style={{ backgroundImage: `url('/images/banner_calm_retreat.jpg')` }}
        />
        <div className="home-footer-calm-overlay" />

        <div className="home-footer-calm-content">
          <h2 id="home-calm-title" className="home-footer-calm-heading">
            A MOMENT OF CALM BEGINS HERE
          </h2>
          <Link href="/appointment" className="home-footer-calm-btn">
            BOOK APPOINTMENT
          </Link>
        </div>
      </section>
    </div>
  );
}
