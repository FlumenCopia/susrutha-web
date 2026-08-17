"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { getPublicDoctors, getImageDisplayUrl } from "@/app/services/api";
import { DataLayerRibbon } from "../common/DataLayerRibbon";

const values = [
  ["lotus", "Ancient Wisdom", "Rooted in tradition, guided by science."],
  ["leaf", "Personalized Care", "Tailored treatments for every individual."],
];

export function DoctorsExpertSection() {
  const [featuredDoctor, setFeaturedDoctor] = useState<any>(null);
  const [doctorList, setDoctorList] = useState<any[]>([]);

  useEffect(() => {
    async function loadBackendDoctors() {
      try {
        const raw = await getPublicDoctors();
        if (Array.isArray(raw) && raw.length > 0) {
          const chief = raw.find((d: any) => d.isDirector || d.isFounder) || raw[0];
          setFeaturedDoctor({
            name: chief.name,
            designation: chief.designation || chief.title || "Chief Medical Officer",
            qualification: chief.qualifications || chief.qualification || "BAMS, MD (Ayurveda)",
            experienceYears: chief.experienceYears || 15,
            specialty: chief.specialties?.[0] || "Panchakarma & Bio-Purification",
            bio: chief.bio || chief.quote || "Dedicated to authentic Kerala Ayurvedic healing.",
            image: getImageDisplayUrl(chief.photo || chief.photoUrl || chief.image),
            slug: chief.slug,
          });

          const others = raw
            .filter((d: any) => d._id !== chief._id && d.slug !== chief.slug)
            .slice(0, 3)
            .map((d: any) => ({
              name: d.name,
              degree: d.qualifications || d.qualification || "BAMS",
              focus: d.designation || (d.specialties ? `Specialist in ${d.specialties[0]}` : "Ayurvedic Specialist"),
              image: getImageDisplayUrl(d.photo || d.photoUrl || d.image),
              slug: d.slug,
              icons: ["leaf", "shield", "bowl"],
            }));

          setDoctorList(others);
        }
      } catch (err) {
        console.error("Failed to load homepage expert doctors:", err);
      }
    }
    loadBackendDoctors();
  }, []);

  return (
    <section className="doctors-expert-section" aria-labelledby="doctors-expert-title">
      <div className="doctors-expert-inner">
        <div className="doctors-expert-intro">
          <span className="doctors-expert-eyebrow">
            <i aria-hidden="true" />
            Our Doctors
          </span>
          <h2 id="doctors-expert-title">
            Meet Our <em>Ayurvedic</em> Experts
          </h2>
          <span className="doctors-expert-divider" aria-hidden="true" />
          <p>
            Our team of experienced Ayurvedic doctors combines ancient wisdom with modern
            expertise to deliver personalized care and lasting wellness.
          </p>

          <div className="doctors-expert-values">
            {values.map(([icon, title, copy]) => (
              <div className="doctors-expert-value" data-icon={icon} key={title}>
                <span aria-hidden="true" />
                <div>
                  <strong>{title}</strong>
                  <p>{copy}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {featuredDoctor && (
          <div className="doctors-expert-feature">
            <div className="doctors-expert-portrait">
              <Image
                src={featuredDoctor.image}
                alt={featuredDoctor.name}
                fill
                sizes="(max-width: 900px) 70vw, 390px"
                priority={false}
              />
            </div>
            <div className="doctors-expert-badge">
              <strong>{featuredDoctor.experienceYears}+</strong>
              <span>Years of Experience</span>
              <i aria-hidden="true" />
            </div>
            <div className="doctors-expert-profile">
              <span>{featuredDoctor.designation}</span>
              <h3>{featuredDoctor.name}</h3>
              <p>{featuredDoctor.qualification}</p>
              <div className="doctors-expert-pill">
                <i aria-hidden="true" />
                Specialist in {featuredDoctor.specialty}
              </div>
              <p>{featuredDoctor.bio}</p>
              <div className="doctors-expert-actions">
                <Link href={`/doctors/${featuredDoctor.slug}`}>View Profile</Link>
                <Link href="/appointment">Book Consultation</Link>
              </div>
            </div>
          </div>
        )}

        <div className="doctors-expert-list">
          {doctorList.map((doctor) => (
            <article className="doctors-expert-card" key={doctor.name} style={{ position: "relative" }}>
              <DataLayerRibbon type="backend" />
              <div className="doctors-expert-card-photo">
                <Image
                  src={doctor.image}
                  alt={doctor.name}
                  fill
                  sizes="(max-width: 900px) 120px, 155px"
                  style={{ objectFit: "cover" }}
                />
              </div>
              <div className="doctors-expert-card-copy">
                <h3>{doctor.name}</h3>
                <span>{doctor.degree}</span>
                <i aria-hidden="true" />
                <p>{doctor.focus}</p>
                <div className="doctors-expert-card-icons">
                  {doctor.icons.map((icon: string) => (
                    <b data-icon={icon} key={icon} aria-hidden="true" />
                  ))}
                </div>
              </div>
              <Link href={`/doctors/${doctor.slug}`} aria-label={`View profile for ${doctor.name}`}>
                &rarr;
              </Link>
            </article>
          ))}
        </div>

        <div className="doctors-expert-still doctors-expert-still-left" aria-hidden="true">
          <Image src="/images/home-hero-reference.webp" alt="" fill sizes="330px" />
        </div>

        <div className="doctors-expert-still doctors-expert-still-right" aria-hidden="true">
          <Image src="/images/testimonial-lamp-flowers.webp" alt="" fill sizes="260px" />
        </div>
      </div>
    </section>
  );
}
