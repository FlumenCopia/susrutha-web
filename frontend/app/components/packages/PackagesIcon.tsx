import type { ReactNode } from "react";

export type PackagesIconName =
  | "flower"
  | "person"
  | "people"
  | "leaf"
  | "lotus"
  | "sprout"
  | "nasal"
  | "spine"
  | "neck"
  | "calendar3"
  | "calendar5"
  | "calendar7"
  | "calendar16"
  | "skin"
  | "work"
  | "guide"
  | "chat"
  | "clarity"
  | "arrow";

type PackagesIconProps = {
  name: PackagesIconName | string;
};

export function PackagesIcon({ name }: PackagesIconProps) {
  const calendarNumber = name.startsWith("calendar") ? name.replace("calendar", "") : "";

  if (calendarNumber) {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.7">
          <path d="M7 4v3M17 4v3M5 9h14" />
          <path d="M6 6h12c.6 0 1 .4 1 1v11c0 .6-.4 1-1 1H6c-.6 0-1-.4-1-1V7c0-.6.4-1 1-1Z" />
        </g>
        <text x="12" y="16.6" textAnchor="middle" fill="currentColor" fontSize="6.8" fontWeight="800">
          {calendarNumber}
        </text>
      </svg>
    );
  }

  const paths: Partial<Record<PackagesIconName, ReactNode>> = {
    flower: (
      <>
        <path d="M12 20c-2.8-3-2.8-6 0-9 2.8 3 2.8 6 0 9Z" />
        <path d="M12 20c-4-.7-6.2-3-6.6-7 4 .6 6.2 3 6.6 7Z" />
        <path d="M12 20c4-.7 6.2-3 6.6-7-4 .6-6.2 3-6.6 7Z" />
        <path d="M12 11c-2.4-2.8-2.4-5.4 0-8 2.4 2.6 2.4 5.2 0 8Z" />
      </>
    ),
    person: (
      <>
        <circle cx="12" cy="8" r="3.2" />
        <path d="M5.5 20c.9-5 3-7.5 6.5-7.5s5.6 2.5 6.5 7.5" />
      </>
    ),
    people: (
      <>
        <circle cx="9" cy="9" r="3" />
        <circle cx="16.5" cy="10" r="2.5" />
        <path d="M3.8 19c.7-4 2.6-6 5.2-6s4.5 2 5.2 6" />
        <path d="M13.7 14.2c2.8.2 4.7 1.8 5.5 4.8" />
      </>
    ),
    leaf: (
      <>
        <path d="M20 4c-7.4.4-12.6 3.7-14 9.6C12.8 14.2 18 10.9 20 4Z" />
        <path d="M6 20c.6-4.8 3.8-8.2 9.5-10.2" />
      </>
    ),
    lotus: (
      <>
        <path d="M12 19c-5-4-5.5-9 0-16 5.5 7 5 12 0 16Z" />
        <path d="M11.5 19C6 18 3.2 14.3 3.2 8.5c5.6 1 8.6 4.8 8.3 10.5Z" />
        <path d="M12.5 19c5.5-1 8.3-4.7 8.3-10.5-5.6 1-8.6 4.8-8.3 10.5Z" />
      </>
    ),
    sprout: (
      <>
        <path d="M12 20V9" />
        <path d="M12 12c-4.2 0-6.7-2.2-7.5-6.5C8.7 5.6 11.2 7.8 12 12Z" />
        <path d="M12 14c4.2 0 6.7-2.2 7.5-6.5C15.3 7.6 12.8 9.8 12 14Z" />
      </>
    ),
    nasal: <path d="M13 4c-1.8 2.6-2.4 5.5-1.7 8.7.3 1.5-.3 2.8-1.5 3.5 1.7 2 4.6 2.4 6.8.7 1.7-1.3 2.2-3.6 1.2-5.5L13 4Z" />,
    spine: <path d="M12 3v18M9.5 5.5h5M9 9h6M9 12.5h6M9.5 16h5M7 7l-2 2m12-2 2 2M7 17l-2-2m12 2 2-2" />,
    neck: <path d="M8 4v6c0 2.3 1.7 4 4 4s4-1.7 4-4V4M6.5 20c.9-3 2.8-4.5 5.5-4.5s4.6 1.5 5.5 4.5M10 8h4" />,
    skin: (
      <>
        <path d="M12 3c4 4.5 6 8 6 10.5a6 6 0 0 1-12 0C6 11 8 7.5 12 3Z" />
        <path d="M9.3 14.2c1.5 1.3 3.5 1.3 5 0" />
      </>
    ),
    work: (
      <>
        <path d="M5 19V8h14v11" />
        <path d="M9 8V6h6v2" />
        <path d="M3.5 19h17M8 12h8M12 12v4" />
      </>
    ),
    guide: <path d="M12 3a5 5 0 0 1 5 5c0 4-5 6-5 10 0-4-5-6-5-10a5 5 0 0 1 5-5Z" />,
    chat: <path d="M5 6.5h14v9H9l-4 3v-12Z" />,
    clarity: <path d="M12 3 5 6v5c0 4.2 2.8 7.4 7 9 4.2-1.6 7-4.8 7-9V6l-7-3Z" />,
    arrow: <path d="M5 12h13M13 6l6 6-6 6" />,
  };

  const iconKey = (name in paths ? name : "lotus") as PackagesIconName;

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.7">
        {paths[iconKey] || paths.lotus}
      </g>
    </svg>
  );
}
