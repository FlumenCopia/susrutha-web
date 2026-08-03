export type InternationalPatientsIconName =
  | "arrow"
  | "bowl"
  | "calendar"
  | "chat"
  | "comfort"
  | "flower"
  | "globe"
  | "heart"
  | "home"
  | "kerala"
  | "leaf"
  | "lotus"
  | "mail"
  | "people"
  | "phone"
  | "plane"
  | "shield"
  | "spark"
  | "therapy";

type InternationalPatientsIconProps = {
  name: InternationalPatientsIconName;
};

export function InternationalPatientsIcon({ name }: InternationalPatientsIconProps) {
  const paths = {
    arrow: <path d="M5 12h13M13 6l6 6-6 6" />,
    bowl: (
      <>
        <path d="M5 11h14c-.5 5.2-3 8-7 8s-6.5-2.8-7-8Z" />
        <path d="M8 8c.8-1.4 2-2.2 4-2.2S15.2 6.6 16 8" />
      </>
    ),
    calendar: (
      <>
        <path d="M7 3v3M17 3v3M4 8h16M5 5h14v15H5z" />
        <path d="M9 13h6" />
      </>
    ),
    chat: (
      <>
        <path d="M5 6.5h14v9.5H9l-4 3v-12.5Z" />
        <path d="M8.5 10h7M8.5 13h4" />
      </>
    ),
    comfort: (
      <>
        <path d="M6 13c1.6-3.2 3.6-4.8 6-4.8s4.4 1.6 6 4.8" />
        <path d="M7 13h10v5H7z" />
        <path d="M8 8a4 4 0 0 1 8 0" />
      </>
    ),
    flower: (
      <>
        <path d="M12 12c-3.3-1.8-4.3-4-3-6.5 2.5.4 4 2.5 3 6.5Z" />
        <path d="M12 12c1.8-3.3 4-4.3 6.5-3-0.4 2.5-2.5 4-6.5 3Z" />
        <path d="M12 12c3.3 1.8 4.3 4 3 6.5-2.5-.4-4-2.5-3-6.5Z" />
        <path d="M12 12c-1.8 3.3-4 4.3-6.5 3 .4-2.5 2.5-4 6.5-3Z" />
      </>
    ),
    globe: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M3 12h18M12 3c2.2 2.3 3.3 5.3 3.3 9S14.2 18.7 12 21c-2.2-2.3-3.3-5.3-3.3-9S9.8 5.3 12 3Z" />
      </>
    ),
    heart: <path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.7A4 4 0 0 1 19 10c0 5.6-7 10-7 10Z" />,
    home: (
      <>
        <path d="M4 11.2 12 4l8 7.2" />
        <path d="M6.5 10.2V20h11V10.2" />
        <path d="M10 20v-5h4v5" />
      </>
    ),
    kerala: (
      <>
        <path d="M6 20V9l6-5 6 5v11" />
        <path d="M4 10h16M9 20v-6h6v6" />
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
    people: (
      <>
        <circle cx="9" cy="9" r="3" />
        <circle cx="16.5" cy="10" r="2.5" />
        <path d="M3.8 19c.7-4 2.6-6 5.2-6s4.5 2 5.2 6" />
        <path d="M13.7 14.2c2.8.2 4.7 1.8 5.5 4.8" />
      </>
    ),
    phone: (
      <>
        <path d="M8.5 5 6.2 7.3c.7 5.1 5.4 9.8 10.5 10.5l2.3-2.3-3.1-3.1-1.9 1.2c-1.6-.8-2.9-2.1-3.6-3.6l1.2-1.9L8.5 5Z" />
      </>
    ),
    plane: (
      <>
        <path d="M3 12 21 5l-5.5 15-3.2-6.1L6 10.8Z" />
        <path d="M21 5 12.3 14" />
      </>
    ),
    shield: (
      <>
        <path d="M12 3 5.5 5.7v5.2c0 4.3 2.7 7.9 6.5 9.1 3.8-1.2 6.5-4.8 6.5-9.1V5.7L12 3Z" />
        <path d="m9.4 12 1.8 1.8 3.7-4" />
      </>
    ),
    spark: (
      <>
        <path d="M12 3v5M12 16v5M3 12h5M16 12h5" />
        <path d="m7 7 3 3M14 14l3 3M17 7l-3 3M10 14l-3 3" />
      </>
    ),
    therapy: (
      <>
        <path d="M6 11h12c-.4 4.8-2.4 7.2-6 7.2S6.4 15.8 6 11Z" />
        <path d="M9 8c.7-1.4 1.7-2.1 3-2.1S14.3 6.6 15 8" />
        <path d="M8 20h8" />
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
