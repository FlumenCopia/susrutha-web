import React from "react";
import { Activity, Database } from "lucide-react";

type DataLayerRibbonProps = {
  type?: "backend" | "static";
  label?: string;
  className?: string;
  position?: "top-right" | "top-left" | "inline" | "header";
};

export function DataLayerRibbon({
  type = "backend",
  label,
  className = "",
  position = "top-right",
}: DataLayerRibbonProps) {
  // Hide data layer testing ribbons by default in production
  const showRibbons = process.env.NEXT_PUBLIC_SHOW_DATA_RIBBONS === "true";
  if (!showRibbons) return null;

  const isBackend = type === "backend";
  const displayLabel = label || (isBackend ? "LIVE BACKEND DATA" : "STATIC UI CONTENT");

  const baseStyle: React.CSSProperties = {
    fontSize: "10px",
    fontWeight: 700,
    letterSpacing: "0.5px",
    textTransform: "uppercase",
    padding: "3px 8px",
    borderRadius: "4px",
    boxShadow: "0 2px 6px rgba(0,0,0,0.18)",
    zIndex: 10,
    display: "inline-flex",
    alignItems: "center",
    gap: "4px",
    border: "1px solid rgba(255, 255, 255, 0.3)",
    lineHeight: "1.2",
    fontFamily: "system-ui, -apple-system, sans-serif",
    whiteSpace: "nowrap",
  };

  const themeStyle: React.CSSProperties = isBackend
    ? {
        backgroundColor: "#10b981",
        color: "#ffffff",
      }
    : {
        backgroundColor: "#d97706",
        color: "#ffffff",
      };

  const positionStyle: React.CSSProperties =
    position === "top-right"
      ? { position: "absolute", top: "8px", right: "8px" }
      : position === "top-left"
      ? { position: "absolute", top: "8px", left: "8px" }
      : position === "header"
      ? { margin: "4px 0 8px 0", alignSelf: "flex-start" }
      : { display: "inline-flex" };

  return (
    <span
      className={`data-layer-ribbon data-layer-ribbon-${type} ${className}`}
      style={{ ...baseStyle, ...themeStyle, ...positionStyle }}
    >
      {isBackend ? <Activity size={10} style={{ display: "inline-block" }} /> : <Database size={10} style={{ display: "inline-block" }} />}
      <span>{displayLabel}</span>
    </span>
  );
}
