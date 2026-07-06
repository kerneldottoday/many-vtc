type ServiceIconProps = {
  id: string;
  className?: string;
};

const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export default function ServiceIcon({ id, className = "h-6 w-6" }: ServiceIconProps) {
  switch (id) {
    case "local":
      return (
        <svg viewBox="0 0 24 24" className={className} aria-hidden>
          <path {...stroke} d="M5 17h14M5 17l1.5-5.5h11L19 17M7 17v2M17 17v2M8 12h8" />
          <circle {...stroke} cx="7.5" cy="12" r="1" />
          <circle {...stroke} cx="16.5" cy="12" r="1" />
        </svg>
      );
    case "airport":
      return (
        <svg viewBox="0 0 24 24" className={className} aria-hidden>
          <path {...stroke} d="M2 12h20M12 2l4 10-4 3-4-3 4-10z" />
        </svg>
      );
    case "station":
      return (
        <svg viewBox="0 0 24 24" className={className} aria-hidden>
          <path {...stroke} d="M4 19V5h16v14M8 19V9M12 19V9M16 19V9M4 9h16" />
        </svg>
      );
    case "business":
      return (
        <svg viewBox="0 0 24 24" className={className} aria-hidden>
          <path {...stroke} d="M3 21h18M5 21V7l7-4 7 4v14M9 21v-6h6v6M9 9h.01M15 9h.01" />
        </svg>
      );
    case "events":
      return (
        <svg viewBox="0 0 24 24" className={className} aria-hidden>
          <path {...stroke} d="M8 22h8M12 15v7M7 3h10v6a5 5 0 01-10 0V3zM9 3V2M15 3V2" />
        </svg>
      );
    case "tour":
      return (
        <svg viewBox="0 0 24 24" className={className} aria-hidden>
          <path {...stroke} d="M3 6h18M6 6v12M18 6v12M6 18h12M9 10h6M9 14h4" />
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 24 24" className={className} aria-hidden>
          <circle {...stroke} cx="12" cy="12" r="9" />
        </svg>
      );
  }
}
