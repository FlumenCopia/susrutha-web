"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { getPublicGalleryAlbums, getImageDisplayUrl } from "@/app/services/api";
import { DataLayerRibbon } from "../common/DataLayerRibbon";

export function SocialMediaWall() {
  const [items, setItems] = useState<any[]>([]);

  useEffect(() => {
    async function loadBackendSocialWall() {
      try {
        const albums = await getPublicGalleryAlbums();
        if (Array.isArray(albums) && albums.length > 0) {
          const mapped = albums.slice(0, 4).map((a: any) => ({
            title: a.title || "Gallery Item",
            image: getImageDisplayUrl(a.coverImage || (a.mediaItems && a.mediaItems[0]?.url)),
            isBackendData: true,
          }));
          setItems(mapped);
        }
      } catch (err) {
        console.error("Failed to load social wall items:", err);
      }
    }
    loadBackendSocialWall();
  }, []);

  return (
    <section className="media-social" aria-labelledby="social-title">
      <div className="media-section-head">
        <span>Social Wall</span>
        <h2 id="social-title">Fragments from the living world of Susrutha.</h2>
      </div>
      <div>
        {items.map((item, index) => (
          <article key={`${item.title}-social`}>
            <Image src={item.image} alt={item.title} fill sizes="(max-width: 760px) 50vw, 18vw" />
            <span>{index % 2 === 0 ? "IG" : "YT"}</span>
          </article>
        ))}
      </div>
    </section>
  );
}
