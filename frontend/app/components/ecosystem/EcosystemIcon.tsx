export type EcosystemIconName =
  | "leaf"
  | "people"
  | "shield"
  | "globe"
  | "flask"
  | "heart"
  | "test"
  | "school"
  | "building"
  | "home"
  | "integrated"
  | "arrow"
  | "headset";

type EcosystemIconProps = {
  name: EcosystemIconName;
};

export function EcosystemIcon({ name }: EcosystemIconProps) {
  const paths = {
    leaf: (
      <>
        <path d="M20 4c-7.4.4-12.6 3.7-14 9.6C12.8 14.2 18 10.9 20 4Z" />
        <path d="M6 20c.6-4.8 3.8-8.2 9.5-10.2" />
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
    shield: (
      <>
        <path d="M12 3 5.5 5.7v5.2c0 4.3 2.7 7.9 6.5 9.1 3.8-1.2 6.5-4.8 6.5-9.1V5.7L12 3Z" />
        <path d="m9.4 12 1.8 1.8 3.7-4" />
      </>
    ),
    globe: (
      <>
        <path d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z" />
        <path d="M3 12h18" />
        <path d="M12 3c2.3 2.4 3.5 5.4 3.5 9S14.3 18.6 12 21c-2.3-2.4-3.5-5.4-3.5-9S9.7 5.4 12 3Z" />
      </>
    ),
    flask: (
      <>
        <path d="M9 3h6M10 3v5.5L5.8 17a3 3 0 0 0 2.7 4h7a3 3 0 0 0 2.7-4L14 8.5V3" />
        <path d="M7.4 16h9.2" />
      </>
    ),
    heart: <path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.7A4 4 0 0 1 19 10c0 5.6-7 10-7 10Z" />,
    test: (
      <>
        <path d="M10 3h4M11 3v12.5a3 3 0 1 0 2 0V3" />
        <path d="M9 14h6" />
      </>
    ),
    school: (
      <>
        <path d="m3 9 9-5 9 5-9 5-9-5Z" />
        <path d="M7 11.3v4.2c2.8 2 7.2 2 10 0v-4.2" />
        <path d="M21 9v6" />
      </>
    ),
    building: (
      <>
        <path d="M5 21V5.8c0-.6.4-1 1-1h8c.6 0 1 .4 1 1V21" />
        <path d="M15 9.5h3c.6 0 1 .4 1 1V21" />
        <path d="M8 8h3M8 12h3M8 16h3M3.5 21h17" />
      </>
    ),
    home: (
      <>
        <path d="M4 11.2 12 4l8 7.2" />
        <path d="M6.5 10.2V20h11V10.2" />
        <path d="M10 20v-5h4v5" />
      </>
    ),
    integrated: (
      <>
        <circle cx="12" cy="12" r="3" />
        <path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M18.4 5.6l-2.1 2.1M7.7 16.3l-2.1 2.1" />
      </>
    ),
    arrow: <path d="M5 12h13M13 6l6 6-6 6" />,
    headset: (
      <>
        <path d="M5 13v-1a7 7 0 0 1 14 0v1" />
        <path d="M5 13h3v5H5v-5ZM16 13h3v5h-3v-5Z" />
        <path d="M16 18c-.6 1.6-1.9 2.4-4 2.4" />
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
