export type AyurVillageIconName = "home" | "bed" | "pin" | "leaf" | "flight" | "lotus" | "globe" | "people" | "calendar" | "arrow" | "play";

type AyurVillageIconProps = {
  name: AyurVillageIconName;
};

export function AyurVillageIcon({ name }: AyurVillageIconProps) {
  const paths = {
    home: (
      <>
        <path d="M4 11.2 12 4l8 7.2" />
        <path d="M6.5 10.2V20h11V10.2" />
        <path d="M10 20v-5h4v5" />
      </>
    ),
    bed: (
      <>
        <path d="M4 19V7" />
        <path d="M20 19v-5.5a3 3 0 0 0-3-3H4V19" />
        <path d="M7 10.5V8h4a2 2 0 0 1 2 2v.5" />
        <path d="M4 15h16" />
      </>
    ),
    pin: (
      <>
        <path d="M19 10c0 5-7 10.5-7 10.5S5 15 5 10a7 7 0 1 1 14 0Z" />
        <path d="M12 12.3a2.3 2.3 0 1 0 0-4.6 2.3 2.3 0 0 0 0 4.6Z" />
      </>
    ),
    leaf: (
      <>
        <path d="M20 4c-7.4.4-12.6 3.7-14 9.6C12.8 14.2 18 10.9 20 4Z" />
        <path d="M6 20c.6-4.8 3.8-8.2 9.5-10.2" />
      </>
    ),
    flight: (
      <>
        <path d="M3.5 13.5 20 5l-5.5 15-3.2-6.8-7.8.3Z" />
        <path d="m11.3 13.2 4.5-4.7" />
      </>
    ),
    lotus: (
      <>
        <path d="M12 19c-5-4-5.5-9 0-16 5.5 7 5 12 0 16Z" />
        <path d="M11.5 19C6 18 3.2 14.3 3.2 8.5c5.6 1 8.6 4.8 8.3 10.5Z" />
        <path d="M12.5 19c5.5-1 8.3-4.7 8.3-10.5-5.6 1-8.6 4.8-8.3 10.5Z" />
      </>
    ),
    globe: (
      <>
        <path d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z" />
        <path d="M3 12h18" />
        <path d="M12 3c2.3 2.4 3.5 5.4 3.5 9S14.3 18.6 12 21c-2.3-2.4-3.5-5.4-3.5-9S9.7 5.4 12 3Z" />
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
    calendar: (
      <>
        <path d="M7 4v3M17 4v3M5 9h14" />
        <path d="M6 6h12c.6 0 1 .4 1 1v11c0 .6-.4 1-1 1H6c-.6 0-1-.4-1-1V7c0-.6.4-1 1-1Z" />
      </>
    ),
    arrow: <path d="M5 12h13M13 6l6 6-6 6" />,
    play: <path d="M9 7.5v9l7-4.5-7-4.5Z" />,
  };

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.7">
        {paths[name]}
      </g>
    </svg>
  );
}
