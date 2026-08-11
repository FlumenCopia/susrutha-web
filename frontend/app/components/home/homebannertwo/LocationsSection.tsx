"use client";

import React, { useState } from "react";

export interface LocationInfo {
  id: string;
  title: string;
  address: string;
  image: string;
}

export const locations: LocationInfo[] = [
  {
    id: "himalayan",
    title: "Himalayan Retreat",
    address: "Rishikesh, Uttarakhand, India",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBVE_bI5Z_LTlNP8jtP2CorUDcZ2FNWxYCm5BXknVjMUbg4_lZgfAds3n7E5D7iPDSRSjZPekaV2Gm2MplT11vvcJKAeyZ6HBiGTzuE-WGvXVS2yzaIPWw0PpK8mZanOxmfqRoTVRSKDRycgdEWngEOSyYYgLT2lSlJ7kLgt81F5E32qqdQOb8gN-f2z9Ujevt4UqlAyOM3-ccuiQN6JaIB8inNIZByAmo1H01FuZcZXgCNkXjhGm75q66Ee76IxT3qDKTOoohaDeFi",
  },
  {
    id: "kerala",
    title: "Kerala Waterfront",
    address: "Alleppey Backwaters, Kerala, India",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuB4H9r2fYNsz6xIn54aeeG9XzpzO3ThZWd1VDSv-U6YUlw9mKhOPgq5AsBfwp7eYflbW1S2F6BLjA0ghq63BtNJ9DQKkfR3pnmYOi0dNiVjADZ4cxKcGkcEWhaXYve6tNDxpUV1eBXWXBapQreSLAcVUWO8ghe_oiGqIiydsHc-BEzCNEOmUr7bLTqVut7BOsQ85dvyDTh0_SwM_vLSveIgSrBu8zaNmloaU661CrFdFuBSbQIUjNI4sWAXlZq_AtcAnJCir-kKJ_e-",
  },
  {
    id: "urban",
    title: "Urban Oasis",
    address: "New Delhi, NCR, India",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAI8LVoaxSDbPGCljdyi2UpRyIkg-0862ktNI6Y2SdqNsw4Sgvi1AJq8ujtcgj2egMs-Zs-TBqpjg2TvwM6huvkciV7wbhqKQ3qmP525wcTHWf68BSuAZLzWSPky9k1auH_nkk8LlIjquAznsvHR0uVoFBA2amOUIFNhZFTXE8tYFMhFtP8v5H6AxKnaZy6XEqmMQD5V_Au1ILVIFlJALfa9lXcz4yj2RBQ8qfrvznRRnvwFPF1OwYtdPKMeyx16424BhNrTM4FDgH5",
  },
];

interface LocationsSectionProps {
  onBookLocation?: (location: LocationInfo) => void;
}

export function LocationsSection({ onBookLocation }: LocationsSectionProps) {
  const [selectedLocation, setSelectedLocation] = useState<LocationInfo>(locations[0]);

  return (
    <section className="py-40 bg-surface">
      <div className="container-max mx-auto px-margin-mobile md:px-margin-desktop">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter items-center">
          <div className="md:col-span-5 reveal-up">
            <h2 className="font-display-lg text-headline-lg text-primary mb-12">Visit Our Sanctuaries</h2>
            <div className="space-y-6">
              {locations.map((loc) => {
                const isSelected = selectedLocation.id === loc.id;
                return (
                  <div
                    key={loc.id}
                    onClick={() => setSelectedLocation(loc)}
                    className={`p-8 rounded-3xl transition-all cursor-pointer group border active:scale-[0.98] ${
                      isSelected
                        ? "bg-surface-container-high border-primary/30 shadow-md"
                        : "bg-surface-container hover:bg-surface-container-high border-outline/5"
                    }`}
                  >
                    <h4 className="font-display-lg text-headline-md text-primary mb-2">{loc.title}</h4>
                    <p className="text-body-md text-secondary mb-4">{loc.address}</p>
                    <span
                      className={`material-symbols-outlined text-primary transition-transform ${
                        isSelected ? "translate-x-2 font-bold" : "group-hover:translate-x-2"
                      }`}
                    >
                      arrow_right_alt
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="md:col-span-6 md:col-start-7 reveal-up delay-200">
            <div className="aspect-square rounded-[40px] overflow-hidden border border-outline/10 shadow-glows relative">
              <img
                className="w-full h-full object-cover transition-all duration-700"
                alt={selectedLocation.title}
                src={selectedLocation.image}
              />
              <div className="absolute bottom-6 left-6 right-6 bg-surface/90 backdrop-blur-md p-4 rounded-2xl border border-outline/20 flex justify-between items-center">
                <div>
                  <h5 className="font-display-lg text-body-lg text-primary font-semibold">
                    {selectedLocation.title}
                  </h5>
                  <p className="text-xs text-secondary">{selectedLocation.address}</p>
                </div>
                <button
                  onClick={() => onBookLocation && onBookLocation(selectedLocation)}
                  className="bg-primary text-on-primary text-xs px-4 py-2 rounded-full font-label-sm tracking-wider cursor-pointer"
                >
                  BOOK
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
