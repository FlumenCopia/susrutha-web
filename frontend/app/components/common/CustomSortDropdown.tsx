"use client";

import React, { useState, useRef, useEffect } from "react";

export type SortOption = {
  value: string;
  label: string;
  icon: string;
};

interface CustomSortDropdownProps {
  value: string;
  onChange: (value: string) => void;
  options: SortOption[];
}

export function CustomSortDropdown({ value, onChange, options }: CustomSortDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((opt) => opt.value === value) || options[0];

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        position: "relative",
        display: "inline-block",
        zIndex: 1000,
      }}
    >
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "10px",
          background: "linear-gradient(135deg, #ffffff 0%, #fdfbf7 100%)",
          border: "1.5px solid rgba(200, 137, 34, 0.45)",
          borderRadius: "30px",
          padding: "8px 18px",
          boxShadow: isOpen
            ? "0 6px 20px rgba(184, 134, 11, 0.25)"
            : "0 4px 14px rgba(184, 134, 11, 0.08)",
          cursor: "pointer",
          transition: "all 0.25s ease",
          outline: "none",
        }}
      >
        <span
          style={{
            fontSize: "12px",
            fontWeight: 800,
            color: "#8c6218",
            letterSpacing: "0.6px",
            textTransform: "uppercase",
            display: "inline-flex",
            alignItems: "center",
            gap: "5px",
          }}
        >
          <span className="material-symbols-outlined" style={{ fontSize: "16px", color: "#c88922" }}>
            swap_vert
          </span>
          SORT BY:
        </span>

        <span
          style={{
            fontSize: "13px",
            fontWeight: 700,
            color: "#1b3d27",
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
          }}
        >
          {selectedOption.label}
        </span>

        <span
          className="material-symbols-outlined"
          style={{
            fontSize: "18px",
            color: "#8c6218",
            transition: "transform 0.25s ease",
            transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
          }}
        >
          expand_more
        </span>
      </button>

      {/* Floating Menu Modal */}
      {isOpen && (
        <div
          style={{
            position: "absolute",
            top: "calc(100% + 8px)",
            right: 0,
            minWidth: "200px",
            background: "rgba(255, 255, 255, 0.98)",
            backdropFilter: "blur(12px)",
            border: "1.5px solid rgba(200, 137, 34, 0.35)",
            borderRadius: "16px",
            padding: "8px",
            boxShadow: "0 12px 32px rgba(27, 61, 39, 0.15)",
            zIndex: 1001,
            animation: "fadeInUp 0.2s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          {options.map((opt) => {
            const isSelected = opt.value === value;
            return (
              <button
                key={opt.value}
                type="button"
                onClick={() => {
                  onChange(opt.value);
                  setIsOpen(false);
                }}
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "10px 14px",
                  borderRadius: "10px",
                  border: "none",
                  background: isSelected
                    ? "linear-gradient(135deg, rgba(200, 137, 34, 0.12) 0%, rgba(27, 61, 39, 0.06) 100%)"
                    : "transparent",
                  color: isSelected ? "#8c6218" : "#1b3d27",
                  fontSize: "13px",
                  fontWeight: isSelected ? 800 : 600,
                  cursor: "pointer",
                  transition: "all 0.18s ease",
                  textAlign: "left",
                }}
                onMouseEnter={(e) => {
                  if (!isSelected) {
                    e.currentTarget.style.background = "rgba(200, 137, 34, 0.06)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isSelected) {
                    e.currentTarget.style.background = "transparent";
                  }
                }}
              >
                <span style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}>
                  <span className="material-symbols-outlined" style={{ fontSize: "16px", color: isSelected ? "#c88922" : "#64748b" }}>
                    {opt.icon}
                  </span>
                  {opt.label}
                </span>

                {isSelected && (
                  <span className="material-symbols-outlined" style={{ fontSize: "16px", color: "#c88922" }}>
                    check
                  </span>
                )}
              </button>
            );
          })}
        </div>
      )}

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(-8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
