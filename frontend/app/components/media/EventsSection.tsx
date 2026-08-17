"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { getPublicMedia, getImageDisplayUrl } from "@/app/services/api";
import { DataLayerRibbon } from "../common/DataLayerRibbon";

export function EventsSection() {
  const [eventList, setEventList] = useState<any[]>([]);

  useEffect(() => {
    async function loadBackendEvents() {
      try {
        const raw = await getPublicMedia();
        if (Array.isArray(raw) && raw.length > 0) {
          const mapped = raw.map((item: any) => ({
            title: item.title || item.name || "Ayurveda Event",
            date: item.publishedAt ? new Date(item.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : "Upcoming",
            location: item.location || "Susrutha Research Center",
            description: item.summary || item.excerpt || item.description || "Interactive session on Ayurvedic wellness.",
            image: getImageDisplayUrl(item.coverImage || item.image),
            isBackendData: true,
          }));
          setEventList(mapped);
        }
      } catch (err) {
        console.error("Failed to load backend events:", err);
      }
    }
    loadBackendEvents();
  }, []);

  return (
    <section className="media-events-luxury" id="media-events" aria-labelledby="events-title">
      <div className="media-events-header">
        <h2 id="events-title" className="media-events-title">
          Moments designed for learning, presence and connection.
        </h2>
        <p className="media-events-subtitle">
          Join our senior Ayurvedic physicians for exclusive clinical walkthroughs, seasonal wellness roundtables, and authentic healing workshops.
        </p>
      </div>

      <div className="media-events-grid">
        {eventList.map((event, idx) => (
          <article className="media-event-card-deluxe" key={`${event.title}-${idx}`}>
            <div className="media-event-image-wrapper">
              <Image
                src={event.image}
                alt={event.title}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="media-event-img"
              />
              <div className="media-event-img-overlay" />
              <div className="media-event-date-badge">
                <span className="media-event-day">{event.date.split(" ")[0]}</span>
                <span className="media-event-month">{event.date.split(" ")[1]}</span>
              </div>
              <span className="media-event-location-tag">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                {event.location}
              </span>
            </div>

            <div className="media-event-card-body">
              <h3 className="media-event-card-title">{event.title}</h3>
              <p className="media-event-card-desc">
                An interactive session detailing classical Ayurvedic therapies, physician consultations, and holistic living practices.
              </p>
              <div className="media-event-card-footer">
                <a href="#contact" className="media-event-cta-link">
                  <span>Register Interest</span>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </a>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
