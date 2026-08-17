import React from "react";

export type FacilitiesIconName =
  | "arrow"
  | "building"
  | "calendar"
  | "car"
  | "clock"
  | "leaf"
  | "lotus"
  | "mail"
  | "operation"
  | "phone"
  | "physio"
  | "room"
  | "shield"
  | "yoga";

type FacilitiesIconProps = {
  name: FacilitiesIconName;
  className?: string;
  style?: React.CSSProperties;
};

const iconMap: Record<FacilitiesIconName, string> = {
  arrow: "fa-solid fa-arrow-right",
  building: "fa-solid fa-hospital",
  calendar: "fa-solid fa-calendar-days",
  car: "fa-solid fa-car",
  clock: "fa-solid fa-clock",
  leaf: "fa-solid fa-leaf",
  lotus: "fa-solid fa-spa",
  mail: "fa-solid fa-envelope",
  operation: "fa-solid fa-notes-medical",
  phone: "fa-solid fa-phone",
  physio: "fa-solid fa-user-doctor",
  room: "fa-solid fa-bed",
  shield: "fa-solid fa-shield-halved",
  yoga: "fa-solid fa-spa",
};

export function FacilitiesIcon({ name, className = "", style }: FacilitiesIconProps) {
  const iconClass = iconMap[name] || "fa-solid fa-circle";
  return <i className={`${iconClass} ${className}`.trim()} style={style} aria-hidden="true" />;
}
