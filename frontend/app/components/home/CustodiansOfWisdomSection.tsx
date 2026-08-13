"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";

export function CustodiansOfWisdomSection() {
  const doctors = [
    {
      name: "Dr. Krishnakumar",
      role: "CHIEF MEDICAL OFFICER",
      image: "/images/dr_krishnakumar.webp",
      href: "/doctors/dr-krishnakumar",
    },
    {
      name: "Dr. Kaveri",
      role: "RITUAL DESIGNER & SURGEON",
      image: "/images/dr_kaveri.webp",
      href: "/doctors/dr-kaveri",
    },
    {
      name: "Dr. Dipu Sukumar",
      role: "HERBAL SCIENCE LEAD",
      image: "/images/dr_dipu_sukumar.webp",
      href: "/doctors/dr-dipu-sukumar",
    },
    {
      name: "Dr. Anjali Nair",
      role: "WELLNESS CONSULTANT",
      image: "/images/doctor-anjali-nair.webp",
      href: "/doctors/dr-anjali-nair",
    },
  ];

  return (
    <section className="custodians-section" aria-labelledby="custodians-heading">
      <div className="custodians-container">
        <div className="custodians-header">
          <h2 id="custodians-heading">The Custodians of Wisdom</h2>
          <p>Meet the world-renowned practitioners dedicated to your holistic well-being.</p>
        </div>

        <div className="custodians-grid">
          {doctors.map((doc) => (
            <article className="custodians-card" key={doc.name}>
              <Link href={doc.href}>
                <div className="custodians-image-wrap">
                  <Image
                    src={doc.image}
                    alt={doc.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 25vw"
                    style={{ objectFit: "cover" }}
                  />
                </div>
                <h3>{doc.name}</h3>
                <span className="custodians-role">{doc.role}</span>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
