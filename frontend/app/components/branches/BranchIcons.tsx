type BranchIconProps = {
  name: "shield" | "basket" | "building" | "pin" | "clock" | "phone" | "calendar" | "arrow" | "leaf" | "check";
  className?: string;
};

export function BranchIcon({ name, className = "" }: BranchIconProps) {
  const commonProps = {
    className,
    viewBox: "0 0 24 24",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    "aria-hidden": true,
  };

  const paths = {
    shield: (
      <>
        <path d="M12 3 5.5 5.7v5.2c0 4.3 2.7 7.9 6.5 9.1 3.8-1.2 6.5-4.8 6.5-9.1V5.7L12 3Z" />
        <path d="m9.4 12 1.8 1.8 3.7-4" />
      </>
    ),
    basket: (
      <>
        <path d="M6.8 10.2h10.4l-1.1 7.1a2 2 0 0 1-2 1.7H9.9a2 2 0 0 1-2-1.7l-1.1-7.1Z" />
        <path d="m9.3 10 2.7-4 2.7 4" />
        <path d="M9.6 14h4.8" />
      </>
    ),
    building: (
      <>
        <path d="M5 21V5.8c0-.6.4-1 1-1h8c.6 0 1 .4 1 1V21" />
        <path d="M15 9.5h3c.6 0 1 .4 1 1V21" />
        <path d="M8 8h3M8 12h3M8 16h3" />
        <path d="M3.5 21h17" />
      </>
    ),
    pin: (
      <>
        <path d="M19 10c0 5-7 10.5-7 10.5S5 15 5 10a7 7 0 1 1 14 0Z" />
        <path d="M12 12.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" />
      </>
    ),
    clock: (
      <>
        <path d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z" />
        <path d="M12 7.5V12l3 1.8" />
      </>
    ),
    phone: (
      <path d="M8 5.2 6 6.6c-.7.5-.9 1.4-.5 2.1 2.1 4.1 5.4 7.4 9.5 9.5.7.4 1.6.2 2.1-.5l1.4-2c.4-.6.3-1.4-.3-1.8l-2.2-1.5c-.5-.3-1.1-.3-1.6.1l-.9.7a12 12 0 0 1-4.7-4.7l.7-.9c.4-.5.4-1.1.1-1.6L9.9 5.5c-.5-.6-1.3-.7-1.9-.3Z" />
    ),
    calendar: (
      <>
        <path d="M7 4v3M17 4v3M5 9h14" />
        <path d="M6 6h12c.6 0 1 .4 1 1v11c0 .6-.4 1-1 1H6c-.6 0-1-.4-1-1V7c0-.6.4-1 1-1Z" />
        <path d="M8 13h2M14 13h2M8 16h2M14 16h2" />
      </>
    ),
    arrow: <path d="M5 12h13M13 6l6 6-6 6" />,
    leaf: (
      <>
        <path d="M20 4c-7.5.4-12.7 3.7-14 9.6C12.8 14.2 18 10.9 20 4Z" />
        <path d="M6 20c.6-4.8 3.8-8.2 9.5-10.2" />
      </>
    ),
    check: <path d="m5.5 12 4 4L18.8 7" />,
  };

  return (
    <svg {...commonProps}>
      <g stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.7">
        {paths[name]}
      </g>
    </svg>
  );
}
