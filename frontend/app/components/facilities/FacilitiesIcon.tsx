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
};

export function FacilitiesIcon({ name }: FacilitiesIconProps) {
  const paths = {
    arrow: <path d="M5 12h13M13 6l6 6-6 6" />,
    building: (
      <>
        <path d="M5 21V5.8c0-.6.4-1 1-1h8c.6 0 1 .4 1 1V21" />
        <path d="M15 9.5h3c.6 0 1 .4 1 1V21" />
        <path d="M8 8h3M8 12h3M8 16h3M3.5 21h17" />
      </>
    ),
    calendar: (
      <>
        <path d="M7 3v3M17 3v3M4 8h16M5 5h14v15H5z" />
        <path d="M9 13h6" />
      </>
    ),
    car: (
      <>
        <path d="M5 16h14l-1.5-5.2A2.5 2.5 0 0 0 15.1 9H8.9a2.5 2.5 0 0 0-2.4 1.8L5 16Z" />
        <path d="M6 16v3M18 16v3M7.5 19h1M15.5 19h1M4 13h16" />
      </>
    ),
    clock: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3.5 2" />
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
        <path d="M12 19c-4.5-2.7-6.3-6.2-5.4-10.5C10.3 10 12.1 13.5 12 19Z" />
        <path d="M12 19c-.1-5.5 1.7-9 5.4-10.5.9 4.3-.9 7.8-5.4 10.5Z" />
        <path d="M12 19c-3.5-.2-6.2-1.6-8-4.2 2.3-1.2 5-.7 8 4.2Z" />
        <path d="M12 19c3.5-.2 6.2-1.6 8-4.2-2.3-1.2-5-.7-8 4.2Z" />
      </>
    ),
    mail: (
      <>
        <path d="M4 6h16v12H4z" />
        <path d="m4 7 8 6 8-6" />
      </>
    ),
    operation: (
      <>
        <path d="M12 3v18M7 8h10M7 16h10" />
        <path d="M5 5h14v14H5z" />
      </>
    ),
    phone: <path d="M8.5 5 6.2 7.3c.7 5.1 5.4 9.8 10.5 10.5l2.3-2.3-3.1-3.1-1.9 1.2c-1.6-.8-2.9-2.1-3.6-3.6l1.2-1.9L8.5 5Z" />,
    physio: (
      <>
        <circle cx="12" cy="5" r="2" />
        <path d="M8 21c.6-4.8 2-8 4-9.5 2 1.5 3.4 4.7 4 9.5" />
        <path d="M5 12c3.3-2.2 5.7-3.3 7-3.3S15.7 9.8 19 12" />
      </>
    ),
    room: (
      <>
        <path d="M4 18V8h5.8c2.2 0 3.2 1.1 3.2 3.2V18" />
        <path d="M13 12h7v6M4 18h16M7 11h3" />
      </>
    ),
    shield: (
      <>
        <path d="M12 3 5.5 5.7v5.2c0 4.3 2.7 7.9 6.5 9.1 3.8-1.2 6.5-4.8 6.5-9.1V5.7L12 3Z" />
        <path d="m9.4 12 1.8 1.8 3.7-4" />
      </>
    ),
    yoga: (
      <>
        <circle cx="12" cy="5" r="2" />
        <path d="M12 8v5M5 18c2.8-3.4 5.2-5 7-5s4.2 1.6 7 5" />
        <path d="M8 21h8" />
      </>
    ),
  };

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.7">
        {paths[name]}
      </g>
    </svg>
  );
}
