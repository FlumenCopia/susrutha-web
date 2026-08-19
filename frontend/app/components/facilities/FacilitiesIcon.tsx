import React from "react";
import {
  ArrowRight,
  Hospital,
  Calendar,
  Car,
  Clock,
  Leaf,
  Flower2,
  Mail,
  Activity,
  Phone,
  UserCheck,
  Bed,
  ShieldCheck,
  Sparkles,
  Circle,
  LucideIcon,
} from "lucide-react";

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
  size?: number;
  strokeWidth?: number;
};

const iconComponentMap: Record<FacilitiesIconName, LucideIcon> = {
  arrow: ArrowRight,
  building: Hospital,
  calendar: Calendar,
  car: Car,
  clock: Clock,
  leaf: Leaf,
  lotus: Flower2,
  mail: Mail,
  operation: Activity,
  phone: Phone,
  physio: UserCheck,
  room: Bed,
  shield: ShieldCheck,
  yoga: Sparkles,
};

export function FacilitiesIcon({
  name,
  className = "",
  style,
  size = 20,
  strokeWidth = 1.75,
}: FacilitiesIconProps) {
  const IconComponent = iconComponentMap[name] || Circle;
  return (
    <IconComponent
      className={className}
      style={style}
      size={size}
      strokeWidth={strokeWidth}
      aria-hidden="true"
    />
  );
}
