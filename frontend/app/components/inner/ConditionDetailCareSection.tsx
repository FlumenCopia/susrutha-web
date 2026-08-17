"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { ConditionDetail } from "./ConditionDetailBanner";
import { getPublicDoctors, getPublicPackages, getImageDisplayUrl } from "@/app/services/api";

type ConditionDetailCareSectionProps = {
  condition: ConditionDetail;
};

function CareIcon({ name }: { name: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      {name === "person" ? (
        <>
          <path d="M12 11a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z" />
          <path d="M5 20a7 7 0 0 1 14 0" />
        </>
      ) : name === "stethoscope" ? (
        <>
          <path d="M6 3v6a6 6 0 0 0 12 0V3" />
          <path d="M12 15v3a3 3 0 0 0 3 3h2" />
          <circle cx="18" cy="21" r="1" />
        </>
      ) : name === "home" ? (
        <path d="M3 10.5 12 3l9 7.5V20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-9.5Z" />
      ) : name === "shield" ? (
        <>
          <path d="M12 3 19 6v5c0 4.5-2.8 8-7 10-4.2-2-7-5.5-7-10V6l7-3Z" />
          <path d="m9 12 2 2 4-5" />
        </>
      ) : name === "lotus" ? (
        <>
          <path d="M12 19c-4-3.5-4.5-8.2 0-14 4.5 5.8 4 10.5 0 14Z" />
          <path d="M12 19c-5 .2-8.5-2.3-10-7 5.5-.8 9 1.5 10 7Z" />
          <path d="M12 19c5 .2 8.5-2.3 10-7-5.5-.8-9 1.5-10 7Z" />
        </>
      ) : (
        <>
          <path d="M12 21C7 17 6 11 12 3c6 8 5 14 0 18Z" />
          <path d="M12 21c-5 0-8-3-10-8 6-1 10 2 10 8Z" />
          <path d="M12 21c5 0 8-3 10-8-6-1-10 2-10 8Z" />
        </>
      )}
    </svg>
  );
}

export function ConditionDetailCareSection({ condition }: ConditionDetailCareSectionProps) {
  const [doctors, setDoctors] = useState<any[]>([]);
  const [packages, setPackages] = useState<any[]>([]);

  useEffect(() => {
    async function loadBackendData() {
      try {
        const [rawDocs, rawPkgs] = await Promise.all([
          getPublicDoctors(),
          getPublicPackages(),
        ]);

        if (Array.isArray(rawDocs) && rawDocs.length > 0) {
          const mappedDocs = rawDocs.slice(0, 2).map((d: any) => ({
            name: d.name,
            credential: d.qualifications || d.qualification || "BAMS, MD (Ayurveda)",
            image: getImageDisplayUrl(d.photo || d.photoUrl || d.image),
            slug: d.slug,
          }));
          setDoctors(mappedDocs);
        }

        if (Array.isArray(rawPkgs) && rawPkgs.length > 0) {
          const mappedPkgs = rawPkgs.slice(0, 4).map((p: any) => p.title || p.name);
          setPackages(mappedPkgs);
        }
      } catch (err) {
        console.error("Failed to load condition care details:", err);
      }
    }
    loadBackendData();
  }, []);

  const symptomsList = Array.isArray(condition.symptoms) && condition.symptoms.length > 0
    ? condition.symptoms
    : [];

  const rootCauseText = (condition as any).ayurvedicRootCause || (condition as any).ayurvedicUnderstanding;

  return (
    <section className="condition-care-section" aria-labelledby="condition-care-title">
      <div className="condition-care-top-grid">
        <article className="condition-care-mini-card condition-care-glance-card">
          <CareIcon name="leaf" />
          <h2>Clinical Summary</h2>
          <p>{condition.shortDescription || condition.overview}</p>
          {condition.reviewer && (
            <p style={{ marginTop: "12px", fontSize: "13px", color: "#6b5a3e" }}>
              Medically reviewed by <em>{condition.reviewer}</em>
            </p>
          )}
        </article>

        {doctors.length > 0 && (
          <article className="condition-care-mini-card condition-care-doctor-card">
            <CareIcon name="stethoscope" />
            <h2>Specialist Physicians</h2>
            {doctors.map((doctor) => (
              <Link href={`/doctors/${doctor.slug}`} className="condition-care-doctor" key={doctor.name}>
                <Image src={doctor.image} alt={doctor.name} width={52} height={52} style={{ borderRadius: "50%", objectFit: "cover" }} />
                <div>
                  <strong>{doctor.name}</strong>
                  <span>{doctor.credential}</span>
                </div>
              </Link>
            ))}
          </article>
        )}

        {packages.length > 0 && (
          <article className="condition-care-mini-card">
            <CareIcon name="home" />
            <h2>Care Packages</h2>
            <ul className="condition-package-list">
              {packages.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        )}

        <article className="condition-care-consult-card">
          <span>Need help getting started?</span>
          <p>Our care team is here to understand and guide you on the right path.</p>
          <Link href="/appointment" className="condition-care-consult-btn">
            <span>Request Consultation</span>
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ flexShrink: 0 }}>
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </Link>
        </article>
      </div>

      <div className="condition-care-main-grid">
        <div className="condition-care-copy">
          <article className="condition-care-block">
            <div className="condition-care-heading">
              <CareIcon name="leaf" />
              <h2 id="condition-care-title">Overview & Clinical Protocol</h2>
            </div>
            <p style={{ whiteSpace: "pre-line" }}>
              {condition.fullDescription || condition.overview || condition.shortDescription}
            </p>
          </article>

          {rootCauseText && (
            <article className="condition-care-block">
              <div className="condition-care-heading">
                <CareIcon name="leaf" />
                <h2>Ayurvedic Understanding</h2>
              </div>
              <p style={{ whiteSpace: "pre-line" }}>
                {rootCauseText}
              </p>
            </article>
          )}

          {symptomsList.length > 0 && (
            <article className="condition-care-block">
              <div className="condition-care-heading">
                <CareIcon name="leaf" />
                <h2>Symptoms Addressed</h2>
              </div>
              <div className="condition-symptom-list">
                {symptomsList.map((symptom: string) => (
                  <span key={symptom}>
                    <CareIcon name="leaf" />
                    {symptom}
                  </span>
                ))}
              </div>
            </article>
          )}
        </div>
      </div>
    </section>
  );
}
