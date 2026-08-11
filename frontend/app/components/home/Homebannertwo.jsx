"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";

interface LocationInfo {
  id: string;
  title: string;
  address: string;
  image: string;
}

const locations: LocationInfo[] = [
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

export function Homebannertwo() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<LocationInfo>(locations[0]);
  const [searchOpen, setSearchOpen] = useState(false);
  const [reserveOpen, setReserveOpen] = useState(false);
  const [emailInput, setEmailInput] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Scroll reveal observer
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    };

    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
        }
      });
    }, observerOptions);

    document.querySelectorAll(".reveal-up").forEach((el) => {
      revealObserver.observe(el);
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      revealObserver.disconnect();
    };
  }, []);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (emailInput.trim()) {
      setSubscribed(true);
      setEmailInput("");
      setTimeout(() => setSubscribed(false), 4000);
    }
  };

  return (
    <div className="bg-background text-on-background font-body-md selection:bg-primary-fixed selection:text-primary min-h-screen">
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
            onClick={() => setReserveOpen(true)}
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
              setReserveOpen(true);
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

      <main>
        {/* Section 1: Cinematic Hero */}
        <section className="relative h-screen flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/10 to-background"></div>
          </div>
          <div className="relative z-10 text-center max-w-4xl px-margin-mobile md:px-margin-desktop">
            <span className="inline-block font-label-sm text-label-sm text-on-tertiary-fixed-variant tracking-[0.3em] mb-6 reveal-up">
              ESTABLISHED 1970
            </span>
            <h1 className="font-display-lg text-display-lg-mobile md:text-display-lg text-primary mb-8 leading-[1.05] reveal-up delay-100">
              Ancient Wisdom.
              <br />
              <span className="italic font-light">Modern Healing.</span>
            </h1>
            <p className="font-body-lg text-body-lg text-secondary mb-12 max-w-2xl mx-auto reveal-up delay-200">
              Susrutha embodies the intersection of ancient Ayurvedic wisdom and modern ultra-luxury hospitality,
              offering curated journeys for the soul.
            </p>
            <div className="flex flex-col md:flex-row items-center justify-center gap-6 reveal-up delay-300">
              <button
                onClick={() => setReserveOpen(true)}
                className="group flex items-center gap-3 bg-primary text-on-primary px-10 py-5 rounded-full transition-all hover:pr-12 active:scale-95 cursor-pointer"
              >
                <span className="font-label-sm text-label-sm tracking-widest">START YOUR JOURNEY</span>
                <span className="material-symbols-outlined text-lg transition-transform group-hover:translate-x-1">
                  arrow_forward
                </span>
              </button>
              <button
                onClick={() => alert("Playing Susrutha Sanctuary Documentary")}
                className="flex items-center gap-2 text-primary border-b border-primary/20 pb-1 hover:border-primary transition-all cursor-pointer"
              >
                <span className="material-symbols-outlined">play_circle</span>
                <span className="font-label-sm text-label-sm tracking-widest">WATCH THE FILM</span>
              </button>
            </div>
          </div>

          {/* Hero Bottom Decorative Scroll */}
          <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
            <span className="text-[10px] tracking-[0.4em] font-bold opacity-30">SCROLL</span>
            <div className="w-[1px] h-12 bg-primary/20"></div>
          </div>
        </section>

        {/* Section 2: Legacy */}
        <section className="py-40 bg-surface-container-low overflow-hidden">
          <div className="container-max mx-auto px-margin-mobile md:px-margin-desktop">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter items-center">
              <div className="md:col-span-5 reveal-up">
                <span className="font-label-sm text-label-sm text-on-tertiary-fixed-variant tracking-widest uppercase mb-4 block">
                  Our Heritage
                </span>
                <h2 className="font-display-lg text-headline-lg text-primary mb-8">
                  Fifty-Five Years of Timeless Tradition
                </h2>
                <p className="font-body-lg text-body-lg text-secondary mb-10 leading-relaxed">
                  Founded in 1970 by Dr. Ananda Varma, Susrutha has evolved into a global sanctuary for those seeking
                  profound tranquility. Our lineage is built on the rigorous application of clinical excellence and
                  multi-generational trust.
                </p>
                <div className="grid grid-cols-2 gap-8 mb-10">
                  <div>
                    <div className="text-headline-md font-display-lg text-primary mb-1">1970</div>
                    <div className="font-label-sm text-label-sm text-on-secondary-container">FOUNDING YEAR</div>
                  </div>
                  <div>
                    <div className="text-headline-md font-display-lg text-primary mb-1">120K+</div>
                    <div className="font-label-sm text-label-sm text-on-secondary-container">HEALED SOULS</div>
                  </div>
                </div>
                <Link className="inline-flex items-center gap-2 font-label-sm text-label-sm text-primary group" href="/about-us">
                  LEARN MORE ABOUT OUR ROOTS
                  <span className="w-12 h-px bg-primary/30 group-hover:w-16 transition-all"></span>
                </Link>
              </div>

              <div className="md:col-span-6 md:col-start-7 reveal-up delay-200">
                <div className="relative group">
                  <div className="aspect-[4/5] overflow-hidden rounded-[40px]">
                    <img
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                      alt="Ayurvedic master herb sorting photograph"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuAI8LVoaxSDbPGCljdyi2UpRyIkg-0862ktNI6Y2SdqNsw4Sgvi1AJq8ujtcgj2egMs-Zs-TBqpjg2TvwM6huvkciV7wbhqKQ3qmP525wcTHWf68BSuAZLzWSPky9k1auH_nkk8LlIjquAznsvHR0uVoFBA2amOUIFNhZFTXE8tYFMhFtP8v5H6AxKnaZy6XEqmMQD5V_Au1ILVIFlJALfa9lXcz4yj2RBQ8qfrvznRRnvwFPF1OwYtdPKMeyx16424BhNrTM4FDgH5"
                    />
                  </div>
                  <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-surface rounded-3xl p-8 shadow-glows hidden md:block border border-outline/10">
                    <p className="font-display-lg text-headline-md italic text-primary leading-tight">
                      &quot;Health is not just absence of disease, but presence of vitality.&quot;
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Healing Journey (Horizontal Timeline) */}
        <section className="py-40 bg-surface">
          <div className="container-max mx-auto px-margin-mobile md:px-margin-desktop text-center mb-24">
            <h2 className="font-display-lg text-headline-lg text-primary reveal-up">The Path to Wholeness</h2>
            <div className="w-20 h-px bg-on-tertiary-fixed-variant/40 mx-auto mt-6 reveal-up delay-100"></div>
          </div>
          <div className="relative overflow-x-auto pb-20 px-margin-desktop scrollbar-hide">
            <div className="flex min-w-[1000px] gap-gutter justify-between items-start relative">
              <div className="absolute top-10 left-0 right-0 h-px bg-outline-variant/30 z-0"></div>

              {/* Step 1 */}
              <div className="relative z-10 flex flex-col items-center max-w-[240px] text-center group cursor-pointer">
                <div className="w-20 h-20 rounded-full bg-surface-container-high flex items-center justify-center mb-8 border border-outline/20 group-hover:bg-primary group-hover:text-on-primary transition-all duration-500 shadow-glows">
                  <span className="material-symbols-outlined text-3xl">spa</span>
                </div>
                <span className="font-label-sm text-label-sm text-on-tertiary-fixed-variant mb-4">STEP 01</span>
                <h3 className="font-display-lg text-headline-md mb-4 text-primary">Consultation</h3>
                <p className="text-body-md text-secondary">
                  A deep diagnostic exploration of your Prakriti (constitution) and current imbalances.
                </p>
              </div>

              {/* Step 2 */}
              <div className="relative z-10 flex flex-col items-center max-w-[240px] text-center group cursor-pointer">
                <div className="w-20 h-20 rounded-full bg-surface-container-high flex items-center justify-center mb-8 border border-outline/20 group-hover:bg-primary group-hover:text-on-primary transition-all duration-500 shadow-glows">
                  <span className="material-symbols-outlined text-3xl">psychology</span>
                </div>
                <span className="font-label-sm text-label-sm text-on-tertiary-fixed-variant mb-4">STEP 02</span>
                <h3 className="font-display-lg text-headline-md mb-4 text-primary">Diagnosis</h3>
                <p className="text-body-md text-secondary">
                  Scientific pulse-reading and observation to map out your personalized healing roadmap.
                </p>
              </div>

              {/* Step 3 */}
              <div className="relative z-10 flex flex-col items-center max-w-[240px] text-center group cursor-pointer">
                <div className="w-20 h-20 rounded-full bg-surface-container-high flex items-center justify-center mb-8 border border-outline/20 group-hover:bg-primary group-hover:text-on-primary transition-all duration-500 shadow-glows">
                  <span className="material-symbols-outlined text-3xl">fluid_med</span>
                </div>
                <span className="font-label-sm text-label-sm text-on-tertiary-fixed-variant mb-4">STEP 03</span>
                <h3 className="font-display-lg text-headline-md mb-4 text-primary">Treatment</h3>
                <p className="text-body-md text-secondary">
                  A series of synchronized therapies including Shirodhara, Abhyanga, and herbal purification.
                </p>
              </div>

              {/* Step 4 */}
              <div className="relative z-10 flex flex-col items-center max-w-[240px] text-center group cursor-pointer">
                <div className="w-20 h-20 rounded-full bg-surface-container-high flex items-center justify-center mb-8 border border-outline/20 group-hover:bg-primary group-hover:text-on-primary transition-all duration-500 shadow-glows">
                  <span className="material-symbols-outlined text-3xl">self_improvement</span>
                </div>
                <span className="font-label-sm text-label-sm text-on-tertiary-fixed-variant mb-4">STEP 04</span>
                <h3 className="font-display-lg text-headline-md mb-4 text-primary">Recovery</h3>
                <p className="text-body-md text-secondary">
                  Sustainable lifestyle and dietary integration for lifelong vitality and harmony.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 4: Signature Treatments */}
        <section className="py-40 bg-surface-container-lowest">
          <div className="container-max mx-auto px-margin-mobile md:px-margin-desktop">
            <div className="flex justify-between items-end mb-20 reveal-up">
              <div className="max-w-xl">
                <span className="font-label-sm text-label-sm text-on-tertiary-fixed-variant tracking-widest uppercase mb-4 block">
                  The Experience
                </span>
                <h2 className="font-display-lg text-headline-lg text-primary">Signature Healing Rituals</h2>
              </div>
              <Link
                href="/treatments"
                className="hidden md:inline-block font-label-sm text-label-sm text-primary tracking-widest border border-primary/20 px-8 py-4 rounded-full hover:bg-primary hover:text-on-primary transition-all"
              >
                VIEW ALL TREATMENTS
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {/* Treatment 1 */}
              <div className="group cursor-pointer reveal-up">
                <div className="relative overflow-hidden rounded-[40px] aspect-[3/4] mb-8 shadow-glows">
                  <img
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    alt="Shirodhara oil ritual"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCh_jFoSomUy_aHqk-jQ_n-gBpstLn0TpaQJ5KlB-dkjNXjLIHUtgSfLZytuyEFolonm1MZcHwoNyYjSK9w1S9k6UjqolJs0grH5MVxy4U--MdtKGoWzDOaKYrgaYYZFSlrRY44-JTj3mTITR2p8Yh2WAljD6Fzdl-pSYn-yru5phn3QKJjt8JUdeQLAM8saUeynMZDchXwN0edo6LG9H1Fs3HxwOaOeIeGmaKEIPvzUsa9KZ4Pg6d9gFfIW02HW3T7QrI8-iB9HCr0"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-10">
                    <span className="text-on-primary font-label-sm text-label-sm tracking-widest">DISCOVER RITUAL</span>
                  </div>
                </div>
                <h3 className="font-display-lg text-headline-md text-primary mb-2">Shirodhara Bliss</h3>
                <p className="text-body-md text-secondary line-clamp-2">
                  A rhythmic pouring of herbal oils onto the forehead to calm the nervous system.
                </p>
                <div className="mt-4 flex items-center gap-2 text-on-tertiary-fixed-variant font-label-sm text-label-sm">
                  <span className="material-symbols-outlined text-sm">schedule</span> 90 MINS
                  <span className="mx-2">•</span>
                  <span className="material-symbols-outlined text-sm">payments</span> $240
                </div>
              </div>

              {/* Treatment 2 */}
              <div className="group cursor-pointer reveal-up delay-100">
                <div className="relative overflow-hidden rounded-[40px] aspect-[3/4] mb-8 shadow-glows">
                  <img
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    alt="Panchakarma detox herbs"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAHfNtwrN5wxUXWI9frodzlFxqBB-IVoASS4GSz_Pt2XucxO8ct-J-PoT96MeZX7_ZzvdYJJfZ6uSNoqZI_kLkIqCNqbXjOCoKyPsH7EJVzydy2_D4FgRFplj2GQgSdxhfRSsAstSRlp4qbVBssEqDcvG-gBQyzp3I4YkQcgEV9Q-4Mrk3rp-LIQ3fiTmDB6YHIStlVUnuwIsO3G9QyukqP_B0ioUJiGYcsKNU9GumjIHpr5OgQfvVYMlHmHMCzMboiGqRvSKphfHBA"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-10">
                    <span className="text-on-primary font-label-sm text-label-sm tracking-widest">DISCOVER RITUAL</span>
                  </div>
                </div>
                <h3 className="font-display-lg text-headline-md text-primary mb-2">Panchakarma Detox</h3>
                <p className="text-body-md text-secondary line-clamp-2">
                  Five-fold purification therapy designed to deeply cleanse and rejuvenate the body.
                </p>
                <div className="mt-4 flex items-center gap-2 text-on-tertiary-fixed-variant font-label-sm text-label-sm">
                  <span className="material-symbols-outlined text-sm">schedule</span> 7 DAYS
                  <span className="mx-2">•</span>
                  <span className="material-symbols-outlined text-sm">payments</span> FROM $3,500
                </div>
              </div>

              {/* Treatment 3 */}
              <div className="group cursor-pointer reveal-up delay-200">
                <div className="relative overflow-hidden rounded-[40px] aspect-[3/4] mb-8 shadow-glows">
                  <img
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    alt="Abhyanga herbal massage"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBWabfcdX-_Ff3I5rhOLAsAr0N473rCVLDXezEr8BTlyLrroJWYEphjWj9ujW8siW2hO4nGCht4PALzIFXM6lkcS0aT_IY3_QSDmuygf9ZAn5rjkiC5JUOk2UnXcsCJ-hB1IB5mDDZCigVenvT4ontphHzYZlgC86Xu9Y0dBMHtRgiM07el8wByK7VaTrGdrghpBgn8O4oaRUBncwcewnJV9k2AzFCP6ZtzVWl9xun95CMG8Jfl0eT-7gVVSx-Zsq3TOgdMHnnRUQhi"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-10">
                    <span className="text-on-primary font-label-sm text-label-sm tracking-widest">DISCOVER RITUAL</span>
                  </div>
                </div>
                <h3 className="font-display-lg text-headline-md text-primary mb-2">Abhyanga Massage</h3>
                <p className="text-body-md text-secondary line-clamp-2">
                  Full body warm oil massage that improves circulation and boosts the immune system.
                </p>
                <div className="mt-4 flex items-center gap-2 text-on-tertiary-fixed-variant font-label-sm text-label-sm">
                  <span className="material-symbols-outlined text-sm">schedule</span> 60 MINS
                  <span className="mx-2">•</span>
                  <span className="material-symbols-outlined text-sm">payments</span> $180
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 5: Why Choose Us (Bento Grid) */}
        <section className="py-40 bg-surface">
          <div className="container-max mx-auto px-margin-mobile md:px-margin-desktop">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter">
              <div className="md:col-span-4 flex flex-col justify-center reveal-up">
                <span className="font-label-sm text-label-sm text-on-tertiary-fixed-variant tracking-widest uppercase mb-4 block">
                  The Susrutha Way
                </span>
                <h2 className="font-display-lg text-headline-lg text-primary mb-8 leading-tight">
                  Crafting an Ecosystem of Total Wellness
                </h2>
                <p className="font-body-lg text-body-lg text-secondary mb-10">
                  We prioritize vast whitespace to provide breathing room for your mind, reflecting the mental clarity
                  associated with Ayurvedic healing.
                </p>
              </div>

              <div className="md:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-surface-container-low p-10 rounded-[32px] border border-outline/10 hover:border-on-tertiary-fixed-variant/30 transition-all reveal-up">
                  <div className="w-12 h-12 rounded-full bg-primary/5 flex items-center justify-center text-primary mb-6">
                    <span className="material-symbols-outlined">clinical_notes</span>
                  </div>
                  <h4 className="font-display-lg text-headline-md text-primary mb-4">Evidence-Based</h4>
                  <p className="text-body-md text-secondary">
                    Blending ancient protocols with contemporary medical insights for measurable results.
                  </p>
                </div>

                <div className="bg-surface-container-low p-10 rounded-[32px] border border-outline/10 hover:border-on-tertiary-fixed-variant/30 transition-all reveal-up delay-100">
                  <div className="w-12 h-12 rounded-full bg-primary/5 flex items-center justify-center text-primary mb-6">
                    <span className="material-symbols-outlined">eco</span>
                  </div>
                  <h4 className="font-display-lg text-headline-md text-primary mb-4">Pure Sourcing</h4>
                  <p className="text-body-md text-secondary">
                    All oils and herbs are ethically harvested from our private botanical gardens.
                  </p>
                </div>

                <div className="bg-surface-container-low p-10 rounded-[32px] border border-outline/10 hover:border-on-tertiary-fixed-variant/30 transition-all reveal-up delay-200">
                  <div className="w-12 h-12 rounded-full bg-primary/5 flex items-center justify-center text-primary mb-6">
                    <span className="material-symbols-outlined">king_bed</span>
                  </div>
                  <h4 className="font-display-lg text-headline-md text-primary mb-4">Ultra-Luxury</h4>
                  <p className="text-body-md text-secondary">
                    Immersive retreats that offer world-class hospitality and profound tranquility.
                  </p>
                </div>

                <div className="bg-surface-container-low p-10 rounded-[32px] border border-outline/10 hover:border-on-tertiary-fixed-variant/30 transition-all reveal-up delay-300">
                  <div className="w-12 h-12 rounded-full bg-primary/5 flex items-center justify-center text-primary mb-6">
                    <span className="material-symbols-outlined">verified_user</span>
                  </div>
                  <h4 className="font-display-lg text-headline-md text-primary mb-4">Master Lineage</h4>
                  <p className="text-body-md text-secondary">
                    Over 50 years of accumulated wisdom passed through three generations of healers.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 6: Meet Our Doctors */}
        <section className="py-40 bg-surface-container-highest/30">
          <div className="container-max mx-auto px-margin-mobile md:px-margin-desktop">
            <div className="text-center mb-24 reveal-up">
              <h2 className="font-display-lg text-headline-lg text-primary">The Custodians of Wisdom</h2>
              <p className="text-body-lg text-secondary mt-4 max-w-2xl mx-auto">
                Meet the world-renowned practitioners dedicated to your holistic well-being.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {/* Doctor 1 */}
              <div className="reveal-up">
                <div className="aspect-[2/3] rounded-[40px] overflow-hidden mb-6 group">
                  <img
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                    alt="Dr. Vikram Varma portrait"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDVFfDEjsIentiG1FCz6G5Aqh9aGswZK2lht4TNC7O6LSWllsk6L2-FGUsvtXwigJCleI3vRUhaY785YVuLjNawv7BCelN2zETixLJixvym7S4LljfcxaDLdGK2tbu66inEo-rvIOyEkGGRkiGBS6whEi6_qbaVYAtVCiXd0N9tk8v1Do4swzxfHVKytZkuuDYKMk6B9Yidj5y3f2BwBoZjCf_BEcNbXlks-1yr2PN9N0QnVA1ga-WpnQFgSFTH6UhBW2n0q5LQk-ho"
                  />
                </div>
                <h4 className="font-display-lg text-headline-md text-primary">Dr. Vikram Varma</h4>
                <span className="font-label-sm text-label-sm text-on-tertiary-fixed-variant tracking-widest block mt-2">
                  CHIEF MEDICAL OFFICER
                </span>
              </div>

              {/* Doctor 2 */}
              <div className="reveal-up delay-100">
                <div className="aspect-[2/3] rounded-[40px] overflow-hidden mb-6 group">
                  <img
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                    alt="Dr. Maya Nair portrait"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuC2ZYtLGoY5M5BPbJjI6pkZD_tnoS95tHHaKrag_Z8QHjY8L6PvaG22WgADQj4NZ5Q-ZNVMUn64cMhxLzUROEbBnJrsEgNvAhqzk0niUZPHTfdIO3bu6CKQKkdL4NfK9R2SS9g0_T7OS0FeHjD8isC2ZZqn6Xf4vmbIg2XOvPHwjU-55zuXSulprFveQr2oZR0uZ4guqiX_zI5r3csxIeXuIwzfy2NZXLdjA0wTB-auRDLyMoZOxrHU3tYT1q99sUsCcb7XcrFA2dDp"
                  />
                </div>
                <h4 className="font-display-lg text-headline-md text-primary">Dr. Maya Nair</h4>
                <span className="font-label-sm text-label-sm text-on-tertiary-fixed-variant tracking-widest block mt-2">
                  RITUAL DESIGNER
                </span>
              </div>

              {/* Doctor 3 */}
              <div className="reveal-up delay-200">
                <div className="aspect-[2/3] rounded-[40px] overflow-hidden mb-6 group">
                  <img
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                    alt="Dr. Aryan Gupta portrait"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDwElIm23mDa8_PISbaNeVOwqEWeNRUi0-MNjQZKJm3gwY2blzbtUF-0Qvw4kwbS6GqkD-JXNaE1wrMeBnRHba8LViMbIAO7jc8a810QSKGMTiEb0_9vE5ePpPjmPWySFoG_ca2vHRrgV5VfCu2VW1_se07mAb4Cd65rK_2BTA6ulgO2pFEmBhzm4gwMuSS0MCS8tcs9PBKO7OzII395iwYJtzxFgTwhLkBbulkg1lPCfQ0xOtrG1atOxHU622komcGm_uj8C24wSEA"
                  />
                </div>
                <h4 className="font-display-lg text-headline-md text-primary">Dr. Aryan Gupta</h4>
                <span className="font-label-sm text-label-sm text-on-tertiary-fixed-variant tracking-widest block mt-2">
                  HERBAL SCIENCE LEAD
                </span>
              </div>

              {/* Doctor 4 */}
              <div className="reveal-up delay-300">
                <div className="aspect-[2/3] rounded-[40px] overflow-hidden mb-6 group">
                  <img
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                    alt="Dr. Lakshmi Rao portrait"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCX_Wyq1lVJxYt0Y5OJ7C5Olb0GwMSGIW-yTzCuBPA-wZKpdne49wyyM3S3iAhb7oVKkZkVJIi65vT0Ikv8-yv0VzxQdMfwsTyp1tl_EC_P-MTefJyx3N872KmmITrqiJwN-bVdhAn6UcLQcn38Kv2TTAd_4_saRBQIfyjvC07HzbRzxtvldTaOpG9NbJnVkU_6mh--9S7O5g4lcQYsEIlVfP5aSkXQyIchheyJznOSUATl2lduYtR4i8ARe8JCMqC-v3pHAfC0f7rE"
                  />
                </div>
                <h4 className="font-display-lg text-headline-md text-primary">Dr. Lakshmi Rao</h4>
                <span className="font-label-sm text-label-sm text-on-tertiary-fixed-variant tracking-widest block mt-2">
                  WELLNESS CONSULTANT
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Section 7: Healing Environment (Immersive Fullscreen) */}
        <section className="h-[819px] relative overflow-hidden flex items-center justify-center">
          <div className="absolute inset-0 bg-primary/20 z-10"></div>
          <div className="absolute inset-0 z-0">
            <img
              className="w-full h-full object-cover parallax-bg"
              alt="Susrutha luxury retreat villa overview"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuB4H9r2fYNsz6xIn54aeeG9XzpzO3ThZWd1VDSv-U6YUlw9mKhOPgq5AsBfwp7eYflbW1S2F6BLjA0ghq63BtNJ9DQKkfR3pnmYOi0dNiVjADZ4cxKcGkcEWhaXYve6tNDxpUV1eBXWXBapQreSLAcVUWO8ghe_oiGqIiydsHc-BEzCNEOmUr7bLTqVut7BOsQ85dvyDTh0_SwM_vLSveIgSrBu8zaNmloaU661CrFdFuBSbQIUjNI4sWAXlZq_AtcAnJCir-kKJ_e-"
            />
          </div>
          <div className="relative z-20 text-center text-on-primary max-w-3xl px-6 reveal-up">
            <h2 className="font-display-lg text-display-lg mb-8">Sanctuaries of Stillness</h2>
            <p className="font-body-lg text-body-lg mb-10 opacity-90">
              Designed as an architectural ode to tranquility, our facilities provide the perfect canvas for your
              transformation.
            </p>
            <Link
              href="/facilities"
              className="inline-block bg-surface text-primary px-10 py-5 rounded-full font-label-sm text-label-sm tracking-widest hover:bg-on-tertiary-fixed transition-all"
            >
              EXPLORE THE FACILITIES
            </Link>
          </div>
        </section>

        {/* Section 10: Locations & Interactive Map */}
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
                      onClick={() => setReserveOpen(true)}
                      className="bg-primary text-on-primary text-xs px-4 py-2 rounded-full font-label-sm tracking-wider"
                    >
                      BOOK
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Luxury Footer */}
      <footer className="w-full rounded-t-[40px] mt-40 bg-primary px-margin-desktop py-20 flex flex-col md:flex-row justify-between items-start gap-gutter">
        <div className="md:w-1/3">
          <h2 className="font-display-lg text-headline-lg text-surface-bright mb-8">SUSRUTHA</h2>
          <p className="text-on-primary-container font-body-md mb-8 max-w-sm">
            Crafting multi-generational legacies of health and harmony through the timeless art of Ayurveda.
          </p>
          <div className="flex gap-4">
            <Link
              className="w-10 h-10 rounded-full border border-on-primary-container/30 flex items-center justify-center text-on-primary-container hover:bg-surface-bright hover:text-primary transition-all duration-300"
              href="#"
            >
              <span className="material-symbols-outlined text-sm">public</span>
            </Link>
            <Link
              className="w-10 h-10 rounded-full border border-on-primary-container/30 flex items-center justify-center text-on-primary-container hover:bg-surface-bright hover:text-primary transition-all duration-300"
              href="#"
            >
              <span className="material-symbols-outlined text-sm">mail</span>
            </Link>
            <Link
              className="w-10 h-10 rounded-full border border-on-primary-container/30 flex items-center justify-center text-on-primary-container hover:bg-surface-bright hover:text-primary transition-all duration-300"
              href="#"
            >
              <span className="material-symbols-outlined text-sm">call</span>
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-12 md:w-2/3">
          <div>
            <h5 className="text-tertiary-fixed-dim font-label-sm text-label-sm mb-6 uppercase tracking-widest">
              Navigation
            </h5>
            <ul className="space-y-4">
              <li>
                <Link className="text-outline-variant/60 font-label-sm text-label-sm hover:text-tertiary-fixed transition-all" href="/about-us">
                  Legacy
                </Link>
              </li>
              <li>
                <Link className="text-outline-variant/60 font-label-sm text-label-sm hover:text-tertiary-fixed transition-all" href="/treatments">
                  Treatments
                </Link>
              </li>
              <li>
                <Link className="text-outline-variant/60 font-label-sm text-label-sm hover:text-tertiary-fixed transition-all" href="/doctors">
                  Doctors
                </Link>
              </li>
              <li>
                <Link className="text-outline-variant/60 font-label-sm text-label-sm hover:text-tertiary-fixed transition-all" href="/ayurveda-village">
                  Retreats
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h5 className="text-tertiary-fixed-dim font-label-sm text-label-sm mb-6 uppercase tracking-widest">
              Privacy
            </h5>
            <ul className="space-y-4">
              <li>
                <Link className="text-outline-variant/60 font-label-sm text-label-sm hover:text-tertiary-fixed transition-all" href="/privacy-policy">
                  Cookies Policy
                </Link>
              </li>
              <li>
                <Link className="text-outline-variant/60 font-label-sm text-label-sm hover:text-tertiary-fixed transition-all" href="/privacy-policy">
                  Data Protection
                </Link>
              </li>
              <li>
                <Link className="text-outline-variant/60 font-label-sm text-label-sm hover:text-tertiary-fixed transition-all" href="/terms">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          <div className="col-span-2 md:col-span-1">
            <h5 className="text-tertiary-fixed-dim font-label-sm text-label-sm mb-6 uppercase tracking-widest">
              Journal
            </h5>
            <p className="text-outline-variant/60 text-body-md mb-6">Receive wisdom and updates twice a month.</p>
            {subscribed ? (
              <p className="text-tertiary-fixed text-sm font-semibold">Thank you for subscribing!</p>
            ) : (
              <form onSubmit={handleSubscribe} className="flex border-b border-outline-variant/30 pb-2">
                <input
                  className="bg-transparent border-none text-on-primary-container focus:ring-0 outline-none placeholder:text-outline-variant/30 flex-grow text-sm"
                  placeholder="Your Email"
                  type="email"
                  required
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                />
                <button type="submit" aria-label="Submit Email" className="material-symbols-outlined text-tertiary-fixed-dim cursor-pointer">
                  arrow_forward
                </button>
              </form>
            )}
          </div>
        </div>

        <div className="w-full pt-12 mt-12 border-t border-on-primary-container/10 flex flex-col md:flex-row justify-between items-center gap-6">
          <span className="text-outline-variant/40 text-label-sm font-label-sm">
            © 1970-{new Date().getFullYear()} Susrutha Ayurvedic Excellence. All Rights Reserved.
          </span>
          <div className="flex gap-8">
            <Link className="text-outline-variant/40 text-label-sm font-label-sm hover:text-surface-bright" href="#">
              INSTAGRAM
            </Link>
            <Link className="text-outline-variant/40 text-label-sm font-label-sm hover:text-surface-bright" href="#">
              LINKEDIN
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
