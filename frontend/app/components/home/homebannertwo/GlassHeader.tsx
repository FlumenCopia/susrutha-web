"use client";

import React, { useState } from "react";
import Link from "next/link";

interface GlassHeaderProps {
  scrolled: boolean;
  onOpenReserve?: () => void;
}

export function GlassHeader({ scrolled, onOpenReserve }: GlassHeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [reserveOpen, setReserveOpen] = useState(false);

  const handleReserveClick = () => {
    if (onOpenReserve) {
      onOpenReserve();
    } else {
      setReserveOpen(true);
    }
  };

  return (
    <>
      {/* Top Floating Glass Header */}
      <header
        className={`fixed left-1/2 -translate-x-1/2 rounded-full bg-surface/70 backdrop-blur-3xl border border-outline/30 z-50 flex justify-between items-center px-8 shadow-glows transition-all duration-500 ${
          scrolled ? "top-2 py-2 w-[88%]" : "top-4 py-4 w-[92%]"
        }`}
      >
        <div className="flex items-center gap-8">
          <Link href="/" className="font-display-lg text-headline-md tracking-widest text-primary font-semibold">
            SUSRUTHA
          </Link>
          <nav className="hidden md:flex gap-6 items-center">
            <Link
              className="text-on-tertiary-fixed-variant font-bold border-b border-on-tertiary-fixed-variant transition-colors duration-500 font-label-sm text-label-sm"
              href="#"
            >
              HOME
            </Link>
            <Link
              className="text-secondary font-label-sm text-label-sm hover:text-primary transition-colors duration-500"
              href="/treatments"
            >
              TREATMENTS
            </Link>
            <Link
              className="text-secondary font-label-sm text-label-sm hover:text-primary transition-colors duration-500"
              href="/ayurveda-village"
            >
              RETREATS
            </Link>
            <Link
              className="text-secondary font-label-sm text-label-sm hover:text-primary transition-colors duration-500"
              href="/about-us"
            >
              HERITAGE
            </Link>
          </nav>
        </div>

        

        <div className="flex items-center gap-4">
          <button
            onClick={() => setSearchOpen(!searchOpen)}
            className="material-symbols-outlined text-primary scale-110 active:scale-95 transition-transform p-1 rounded-full hover:bg-surface-container"
            aria-label="Search"
          >
            search
          </button>
          <button
            onClick={handleReserveClick}
            className="bg-primary text-on-primary px-6 py-2.5 rounded-full font-label-sm text-label-sm hover:bg-on-primary-fixed-variant transition-all active:scale-95 cursor-pointer"
          >
            RESERVE
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="material-symbols-outlined md:hidden text-primary p-1"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? "close" : "menu"}
          </button>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-surface/95 backdrop-blur-2xl z-40 flex flex-col justify-center items-center gap-8 md:hidden text-center px-6">
          <Link
            onClick={() => setMobileMenuOpen(false)}
            className="font-display-lg text-headline-lg text-primary"
            href="#"
          >
            HOME
          </Link>
          <Link
            onClick={() => setMobileMenuOpen(false)}
            className="font-display-lg text-headline-lg text-secondary hover:text-primary"
            href="/treatments"
          >
            TREATMENTS
          </Link>
          <Link
            onClick={() => setMobileMenuOpen(false)}
            className="font-display-lg text-headline-lg text-secondary hover:text-primary"
            href="/ayurveda-village"
          >
            RETREATS
          </Link>
          <Link
            onClick={() => setMobileMenuOpen(false)}
            className="font-display-lg text-headline-lg text-secondary hover:text-primary"
            href="/about-us"
          >
            HERITAGE
          </Link>
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              handleReserveClick();
            }}
            className="mt-6 bg-primary text-on-primary px-10 py-4 rounded-full font-label-sm text-label-sm"
          >
            RESERVE NOW
          </button>
        </div>
      )}

      {/* Search Bar Popup Modal */}
      {searchOpen && (
        <div className="fixed inset-0 bg-primary/40 backdrop-blur-md z-50 flex items-start justify-center pt-24 px-4">
          <div className="bg-surface p-6 rounded-3xl w-full max-w-xl shadow-2xl border border-outline/20">
            <div className="flex justify-between items-center mb-4">
              <span className="font-label-sm text-label-sm text-on-tertiary-fixed-variant tracking-widest">
                SEARCH SUSRUTHA
              </span>
              <button
                onClick={() => setSearchOpen(false)}
                className="material-symbols-outlined text-secondary hover:text-primary"
              >
                close
              </button>
            </div>
            <div className="flex items-center gap-3 border-b border-outline/30 pb-3">
              <span className="material-symbols-outlined text-secondary">search</span>
              <input
                type="text"
                placeholder="Search treatments, doctors, retreats..."
                className="bg-transparent border-none outline-none w-full text-primary font-body-lg placeholder:text-secondary/50"
                autoFocus
              />
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              <span className="text-xs text-secondary mr-2">Quick links:</span>
              {["Panchakarma", "Shirodhara", "Doctors", "Retreats"].map((item) => (
                <button
                  key={item}
                  className="text-xs bg-surface-container px-3 py-1 rounded-full text-primary hover:bg-primary hover:text-on-primary transition-all"
                  onClick={() => setSearchOpen(false)}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Reservation Dialog Modal */}
      {reserveOpen && (
        <div className="fixed inset-0 bg-primary/60 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-surface p-8 md:p-10 rounded-[36px] w-full max-w-lg shadow-2xl border border-outline/20 relative">
            <button
              onClick={() => setReserveOpen(false)}
              className="absolute top-6 right-6 material-symbols-outlined text-secondary hover:text-primary"
            >
              close
            </button>
            <span className="font-label-sm text-label-sm text-on-tertiary-fixed-variant tracking-widest uppercase block mb-2">
              Susrutha Reserve
            </span>
            <h3 className="font-display-lg text-headline-md text-primary mb-6">
              Begin Your Healing Journey
            </h3>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                alert("Thank you! Our wellness concierge will contact you shortly.");
                setReserveOpen(false);
              }}
              className="space-y-4"
            >
              <div>
                <label className="block text-xs font-semibold text-secondary mb-1">FULL NAME</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Eleanor Vance"
                  className="w-full bg-surface-container px-4 py-3 rounded-2xl border border-outline/10 text-primary focus:outline-none focus:border-primary/40"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-secondary mb-1">PHONE / WHATSAPP</label>
                <input
                  type="tel"
                  required
                  placeholder="+91 98765 43210"
                  className="w-full bg-surface-container px-4 py-3 rounded-2xl border border-outline/10 text-primary focus:outline-none focus:border-primary/40"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-secondary mb-1">PREFERRED LOCATION</label>
                <select className="w-full bg-surface-container px-4 py-3 rounded-2xl border border-outline/10 text-primary focus:outline-none focus:border-primary/40">
                  <option value="Rishikesh">Himalayan Retreat (Rishikesh)</option>
                  <option value="Kerala">Kerala Waterfront (Alleppey)</option>
                  <option value="Delhi">Urban Oasis (New Delhi)</option>
                </select>
              </div>
              <button
                type="submit"
                className="w-full mt-4 bg-primary text-on-primary py-4 rounded-full font-label-sm text-label-sm tracking-widest hover:bg-on-primary-fixed-variant transition-all cursor-pointer"
              >
                REQUEST CONSULTATION
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
