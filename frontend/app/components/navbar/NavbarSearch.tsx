"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { TrendingUp, Activity, X, ArrowRight, UserCheck, Leaf, ClipboardList, Search } from "lucide-react";
import { desktopNavigation } from "../../data/architecture";
import { getPublicDoctors, getPublicTreatments, getPublicConditions, getImageDisplayUrl } from "../../services/api";

type SearchResultItem = {
  id: string;
  type: "doctor" | "treatment" | "condition";
  title: string;
  subtitle: string;
  href: string;
  image?: string;
  badge?: string;
};

const POPULAR_SEARCHES = [
  { label: "Panchakarma", href: "/treatments/panchakarma" },
  { label: "Shirodhara", href: "/treatments/shirodhara" },
  { label: "Dr. Krishnakumar K.", href: "/doctors/dr-krishnakumar-k" },
  { label: "Spine & Joints Care", href: "/conditions/spine-joints" },
  { label: "Women's Health", href: "/treatments/womens-health" },
  { label: "Abhyangam Massage", href: "/treatments/abhyangam" },
];

export function NavbarSearch() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);

  // Live data fetched from API
  const [liveDoctors, setLiveDoctors] = useState<{ slug: string; name: string; designation: string; image: string }[]>([]);
  const [liveTreatments, setLiveTreatments] = useState<{ slug: string; title: string; description: string }[]>([]);
  const [liveConditions, setLiveConditions] = useState<{ slug: string; title: string; description: string }[]>([]);

  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const mobileInputRef = useRef<HTMLInputElement>(null);

  // Fetch live doctors + treatments + conditions once on mount
  useEffect(() => {
    async function loadSearchData() {
      try {
        const [docs, treats, conds] = await Promise.all([
          getPublicDoctors(),
          getPublicTreatments(),
          getPublicConditions(),
        ]);
        if (Array.isArray(docs)) {
          setLiveDoctors(docs.map((d: any) => ({
            slug: d.slug || `dr-${(d.name || "").toLowerCase().replace(/\s+/g, "-")}`,
            name: d.name || "Doctor",
            designation: d.designation || d.title || "Ayurveda Specialist",
            image: getImageDisplayUrl(d.photo || d.photoUrl),
          })));
        }
        if (Array.isArray(treats)) {
          setLiveTreatments(treats.map((t: any) => ({
            slug: t.slug || "",
            title: t.title || t.name || "",
            description: t.shortDescription || t.description || t.meta || "",
          })));
        }
        if (Array.isArray(conds)) {
          setLiveConditions(conds.map((c: any) => ({
            slug: c.slug || "",
            title: c.name || c.title || "",
            description: c.description || c.summary || c.text || "",
          })));
        }
      } catch {}
    }
    loadSearchData();
  }, []);

  // Extract Conditions list from desktopNavigation
  const conditions = useMemo(() => {
    const conditionsGroup = desktopNavigation.find((n) => n.label === "Conditions");
    return (conditionsGroup?.children || []).map((child) => ({
      title: child.label,
      href: child.href,
    }));
  }, []);

  // Compute search results matching query
  const results = useMemo(() => {
    const trimmed = query.trim().toLowerCase();
    if (!trimmed) {
      return { doctors: [], treatments: [], conditions: [], all: [] };
    }

    const matchedDoctors: SearchResultItem[] = liveDoctors
      .filter((doc) => {
        const text = `${doc.name} ${doc.designation}`.toLowerCase();
        return text.includes(trimmed);
      })
      .slice(0, 4)
      .map((doc) => ({
        id: `doc-${doc.slug}`,
        type: "doctor",
        title: doc.name,
        subtitle: doc.designation,
        href: `/doctors/${doc.slug}`,
        image: doc.image || "/images/doctor-portrait.webp",
        badge: "Specialist",
      }));

    const matchedTreatments: SearchResultItem[] = liveTreatments
      .filter((t) => {
        const text = `${t.title} ${t.description}`.toLowerCase();
        return text.includes(trimmed);
      })
      .slice(0, 5)
      .map((t) => ({
        id: `trt-${t.slug}`,
        type: "treatment",
        title: t.title,
        subtitle: t.description || "Ayurvedic Therapy",
        href: `/treatments/${t.slug}`,
        image: "/images/treatment-panchakarma.webp",
        badge: "Therapy",
      }));

    const condSource = liveConditions.length > 0
      ? liveConditions.map((c) => ({ title: c.title, href: `/conditions/${c.slug}` }))
      : conditions;

    const matchedConditions: SearchResultItem[] = condSource
      .filter((c) => c.title.toLowerCase().includes(trimmed))
      .slice(0, 3)
      .map((c) => ({
        id: `cnd-${c.href}`,
        type: "condition",
        title: c.title,
        subtitle: "Clinical Condition & Care",
        href: c.href,
        badge: "Condition",
      }));

    const all = [...matchedDoctors, ...matchedTreatments, ...matchedConditions];

    return {
      doctors: matchedDoctors,
      treatments: matchedTreatments,
      conditions: matchedConditions,
      all,
    };
  }, [query, conditions, liveDoctors, liveTreatments, liveConditions]);

  // Click outside listener
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Keyboard navigation listener
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!isOpen) {
      if (e.key === "ArrowDown" || e.key === "ArrowUp") {
        setIsOpen(true);
      }
      return;
    }

    const total = results.all.length;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (total > 0 ? (prev + 1) % total : -1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (total > 0 ? (prev - 1 + total) % total : -1));
    } else if (e.key === "Enter") {
      if (selectedIndex >= 0 && selectedIndex < total) {
        e.preventDefault();
        const selected = results.all[selectedIndex];
        router.push(selected.href);
        setIsOpen(false);
        setIsMobileSearchOpen(false);
      } else if (total > 0) {
        e.preventDefault();
        router.push(results.all[0].href);
        setIsOpen(false);
        setIsMobileSearchOpen(false);
      }
    } else if (e.key === "Escape") {
      setIsOpen(false);
      setIsMobileSearchOpen(false);
    }
  };

  const handleSelectResult = (href: string) => {
    setQuery("");
    setIsOpen(false);
    setIsMobileSearchOpen(false);
    router.push(href);
  };

  const clearQuery = () => {
    setQuery("");
    inputRef.current?.focus();
    mobileInputRef.current?.focus();
  };

  const highlightMatch = (text: string, q: string) => {
    if (!q.trim()) return text;
    const parts = text.split(new RegExp(`(${q.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "gi"));
    return (
      <>
        {parts.map((part, i) =>
          part.toLowerCase() === q.toLowerCase() ? (
            <mark key={i} className="search-highlight">
              {part}
            </mark>
          ) : (
            part
          )
        )}
      </>
    );
  };

  return (
    <div className="nav-search-container" ref={containerRef}>
      {/* Search Input Control */}
      <div className="nav-search-box">
        <svg
          className="nav-search-icon"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          aria-hidden="true"
        >
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>

        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
            setSelectedIndex(-1);
          }}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder="Search treatments, doctors..."
          aria-label="Search treatments and doctors"
          className="nav-search-input"
          autoComplete="off"
        />

        {query ? (
          <button
            type="button"
            className="nav-search-clear-btn"
            onClick={clearQuery}
            aria-label="Clear search query"
          >
            <X size={14} />
          </button>
        ) : null}

        <button
          type="button"
          className="mobile-search-trigger"
          onClick={() => {
            setIsMobileSearchOpen(true);
            setTimeout(() => mobileInputRef.current?.focus(), 100);
          }}
          aria-label="Open search screen"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        </button>
      </div>

      {/* Desktop Search Dropdown Overlay */}
      {isOpen && (
        <div className="nav-search-dropdown" role="listbox" id="nav-search-results">
          {/* Case 1: Empty query - Popular Searches */}
          {!query.trim() && (
            <div className="search-popular-section">
              <div className="search-group-title" style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <TrendingUp size={15} style={{ color: "#d97706" }} />
                <span>Popular Searches</span>
              </div>
              <div className="search-popular-tags">
                {POPULAR_SEARCHES.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={() => handleSelectResult(item.href)}
                    className="search-popular-tag"
                  >
                    <span>{item.label}</span>
                    <span className="tag-arrow">&rarr;</span>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Case 2: Query entered with matches */}
          {query.trim() && results.all.length > 0 && (
            <div className="search-results-list">
              {/* Doctors Match Group */}
              {results.doctors.length > 0 && (
                <div className="search-result-group">
                  <div className="search-group-title">
                    <span style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}><UserCheck size={14} strokeWidth={1.75} /> Doctors ({results.doctors.length})</span>
                  </div>
                  {results.doctors.map((item) => {
                    const globalIdx = results.all.findIndex((r) => r.id === item.id);
                    const isSelected = selectedIndex === globalIdx;

                    return (
                      <div
                        key={item.id}
                        role="option"
                        aria-selected={isSelected}
                        className={`search-result-item ${isSelected ? "is-selected" : ""}`}
                        onClick={() => handleSelectResult(item.href)}
                      >
                        <div className="search-item-avatar">
                          <Image src={item.image || "/images/doctor-portrait.webp"} alt={item.title} width={40} height={40} />
                        </div>
                        <div className="search-item-info">
                          <div className="search-item-title">
                            {highlightMatch(item.title, query)}
                          </div>
                          <div className="search-item-subtitle">{item.subtitle}</div>
                        </div>
                        <span className="search-item-badge badge-doctor">{item.badge}</span>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Treatments Match Group */}
              {results.treatments.length > 0 && (
                <div className="search-result-group">
                  <div className="search-group-title">
                    <span style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}><Leaf size={14} strokeWidth={1.75} /> Treatments ({results.treatments.length})</span>
                  </div>
                  {results.treatments.map((item) => {
                    const globalIdx = results.all.findIndex((r) => r.id === item.id);
                    const isSelected = selectedIndex === globalIdx;

                    return (
                      <div
                        key={item.id}
                        role="option"
                        aria-selected={isSelected}
                        className={`search-result-item ${isSelected ? "is-selected" : ""}`}
                        onClick={() => handleSelectResult(item.href)}
                      >
                        <div className="search-item-thumb">
                          <Image src={item.image || "/images/treatment-panchakarma.webp"} alt={item.title} width={40} height={40} />
                        </div>
                        <div className="search-item-info">
                          <div className="search-item-title">
                            {highlightMatch(item.title, query)}
                          </div>
                          <div className="search-item-subtitle">{item.subtitle}</div>
                        </div>
                        <span className="search-item-badge badge-treatment">{item.badge}</span>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Conditions Match Group */}
              {results.conditions.length > 0 && (
                <div className="search-result-group">
                  <div className="search-group-title" style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                    <Activity size={15} style={{ color: "#d97706" }} />
                    <span>Conditions & Care ({results.conditions.length})</span>
                  </div>
                  {results.conditions.map((item) => {
                    const globalIdx = results.all.findIndex((r) => r.id === item.id);
                    const isSelected = selectedIndex === globalIdx;

                    return (
                      <div
                        key={item.id}
                        role="option"
                        aria-selected={isSelected}
                        className={`search-result-item ${isSelected ? "is-selected" : ""}`}
                        onClick={() => handleSelectResult(item.href)}
                      >
                        <div className="search-item-icon-box" style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                          <Activity size={15} />
                        </div>
                        <div className="search-item-info">
                          <div className="search-item-title">
                            {highlightMatch(item.title, query)}
                          </div>
                          <div className="search-item-subtitle">{item.subtitle}</div>
                        </div>
                        <span className="search-item-badge badge-condition">{item.badge}</span>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* Case 3: Query entered but no matches */}
          {query.trim() && results.all.length === 0 && (
            <div className="search-no-results">
              <div className="no-results-icon"><Search size={28} strokeWidth={1.5} /></div>
              <div className="no-results-title">No matching results for &quot;{query}&quot;</div>
              <p className="no-results-desc">
                Try searching for Panchakarma, Shirodhara, Back Pain, or Dr. Krishnakumar.
              </p>
            </div>
          )}
        </div>
      )}

      {/* Mobile Full Screen Search Modal Overlay */}
      {isMobileSearchOpen && (
        <div className="mobile-search-modal" role="dialog" aria-modal="true" aria-label="Search site">
          <div className="mobile-search-header">
            <div className="mobile-search-input-box">
              <svg className="nav-search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <input
                ref={mobileInputRef}
                type="text"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setSelectedIndex(-1);
                }}
                onKeyDown={handleKeyDown}
                placeholder="Search treatments, doctors..."
                className="mobile-search-input"
              />
              {query ? (
                <button type="button" className="nav-search-clear-btn" onClick={clearQuery}>
                  <X size={14} />
                </button>
              ) : null}
            </div>

            <button
              type="button"
              className="mobile-search-cancel-btn"
              onClick={() => setIsMobileSearchOpen(false)}
            >
              Cancel
            </button>
          </div>

          <div className="mobile-search-body">
            {!query.trim() && (
              <div className="search-popular-section">
                <div className="search-group-title">
                  <span>Popular Searches</span>
                </div>
                <div className="search-popular-tags">
                  {POPULAR_SEARCHES.map((item) => (
                    <Link
                      key={item.label}
                      href={item.href}
                      onClick={() => handleSelectResult(item.href)}
                      className="search-popular-tag"
                    >
                      <span>{item.label}</span>
                      <span className="tag-arrow">&rarr;</span>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {query.trim() && results.all.length > 0 && (
              <div className="search-results-list">
                {results.doctors.map((item) => (
                  <div
                    key={item.id}
                    className="search-result-item"
                    onClick={() => handleSelectResult(item.href)}
                  >
                    <div className="search-item-avatar">
                      <Image src={item.image || "/images/doctor-portrait.webp"} alt={item.title} width={40} height={40} />
                    </div>
                    <div className="search-item-info">
                      <div className="search-item-title">{highlightMatch(item.title, query)}</div>
                      <div className="search-item-subtitle">{item.subtitle}</div>
                    </div>
                    <span className="search-item-badge badge-doctor">{item.badge}</span>
                  </div>
                ))}

                {results.treatments.map((item) => (
                  <div
                    key={item.id}
                    className="search-result-item"
                    onClick={() => handleSelectResult(item.href)}
                  >
                    <div className="search-item-thumb">
                      <Image src={item.image || "/images/treatment-panchakarma.webp"} alt={item.title} width={40} height={40} />
                    </div>
                    <div className="search-item-info">
                      <div className="search-item-title">{highlightMatch(item.title, query)}</div>
                      <div className="search-item-subtitle">{item.subtitle}</div>
                    </div>
                    <span className="search-item-badge badge-treatment">{item.badge}</span>
                  </div>
                ))}

                {results.conditions.map((item) => (
                  <div
                    key={item.id}
                    className="search-result-item"
                    onClick={() => handleSelectResult(item.href)}
                  >
                    <div className="search-item-icon-box"><ClipboardList size={16} strokeWidth={1.75} /></div>
                    <div className="search-item-info">
                      <div className="search-item-title">{highlightMatch(item.title, query)}</div>
                      <div className="search-item-subtitle">{item.subtitle}</div>
                    </div>
                    <span className="search-item-badge badge-condition">{item.badge}</span>
                  </div>
                ))}
              </div>
            )}

            {query.trim() && results.all.length === 0 && (
              <div className="search-no-results">
                <div className="no-results-icon"><Search size={28} strokeWidth={1.5} /></div>
                <div className="no-results-title">No matching results</div>
                <p className="no-results-desc">
                  Try searching for Panchakarma, Shirodhara, or Dr. Krishnakumar.
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
