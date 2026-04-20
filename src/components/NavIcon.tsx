'use client';

interface NavIconProps {
  name: string;
  className?: string;
}

export default function NavIcon({ name, className = 'w-5 h-5' }: NavIconProps) {
  const props = {
    className,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.5,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    'aria-hidden': true as const,
  };

  switch (name) {
    case 'home':
      return (
        <svg {...props}>
          <path d="M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H4a1 1 0 01-1-1V9.5z" />
          <path d="M9 21V12h6v9" />
        </svg>
      );
    case 'credit-card':
      return (
        <svg {...props}>
          <rect x="2" y="5" width="20" height="14" rx="2" />
          <path d="M2 10h20" />
        </svg>
      );
    case 'piggy-bank':
      return (
        <svg {...props}>
          <path d="M19 5c-1.5 0-2.8 1.4-3 2-3.5-1.3-11-.5-11 5 0 4.3 2.7 7 7 8v2h4v-2c1 0 2-.5 3-1l2 1V14l-1-1c.7-2 .2-4-1-5z" />
          <path d="M2 9v1c0 1.1.9 2 2 2h1" />
          <path d="M16 11h.01" />
        </svg>
      );
    case 'wallet':
      return (
        <svg {...props}>
          <path d="M20 12V8H6a2 2 0 01-2-2c0-1.1.9-2 2-2h12v4" />
          <path d="M4 6v12a2 2 0 002 2h14v-4" />
          <path d="M18 12a2 2 0 000 4h4v-4h-4z" />
        </svg>
      );
    case 'sparkles':
      return (
        <svg {...props}>
          <path d="M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5L12 3z" />
          <path d="M18 15l.75 2.25L21 18l-2.25.75L18 21l-.75-2.25L15 18l2.25-.75L18 15z" />
        </svg>
      );
    case 'building':
      return (
        <svg {...props}>
          <path d="M6 22V4a2 2 0 012-2h8a2 2 0 012 2v18z" />
          <path d="M6 12H4a2 2 0 00-2 2v6a2 2 0 002 2h2" />
          <path d="M18 9h2a2 2 0 012 2v9a2 2 0 01-2 2h-2" />
          <path d="M10 6h4M10 10h4M10 14h4M10 18h4" />
        </svg>
      );
    case 'list':
      return (
        <svg {...props}>
          <path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01" />
        </svg>
      );
    case 'refresh':
      return (
        <svg {...props}>
          <path d="M23 4v6h-6" />
          <path d="M1 20v-6h6" />
          <path d="M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15" />
        </svg>
      );
    case 'calendar':
      return (
        <svg {...props}>
          <rect x="3" y="4" width="18" height="18" rx="2" />
          <path d="M16 2v4M8 2v4M3 10h18" />
        </svg>
      );
    case 'dollar':
      return (
        <svg {...props}>
          <path d="M12 1v22M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" />
        </svg>
      );
    case 'search':
      return (
        <svg {...props}>
          <circle cx="11" cy="11" r="8" />
          <path d="M21 21l-4.35-4.35" />
        </svg>
      );
    case 'award':
      return (
        <svg {...props}>
          <circle cx="12" cy="8" r="7" />
          <path d="M8.21 13.89L7 23l5-3 5 3-1.21-9.12" />
        </svg>
      );
    case 'shield':
      return (
        <svg {...props}>
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          <path d="M9 12l2 2 4-4" />
        </svg>
      );
    case 'trending-up':
      return (
        <svg {...props}>
          <path d="M23 6l-9.5 9.5-5-5L1 18" />
          <path d="M17 6h6v6" />
        </svg>
      );
    case 'trending-down':
      return (
        <svg {...props}>
          <path d="M23 18l-9.5-9.5-5 5L1 6" />
          <path d="M17 18h6v-6" />
        </svg>
      );
    case 'percent':
      return (
        <svg {...props}>
          <path d="M19 5L5 19" />
          <circle cx="6.5" cy="6.5" r="2.5" />
          <circle cx="17.5" cy="17.5" r="2.5" />
        </svg>
      );
    case 'target':
      return (
        <svg {...props}>
          <circle cx="12" cy="12" r="10" />
          <circle cx="12" cy="12" r="6" />
          <circle cx="12" cy="12" r="2" />
        </svg>
      );
    case 'umbrella':
      return (
        <svg {...props}>
          <path d="M23 12a11.05 11.05 0 00-22 0" />
          <path d="M12 12v9a3 3 0 006 0" />
          <path d="M12 2v2" />
        </svg>
      );
    case 'file-text':
      return (
        <svg {...props}>
          <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
          <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" />
        </svg>
      );
    case 'message-circle':
      return (
        <svg {...props}>
          <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" />
        </svg>
      );
    case 'users':
      return (
        <svg {...props}>
          <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
        </svg>
      );
    case 'heart':
      return (
        <svg {...props}>
          <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
        </svg>
      );
    case 'bell':
      return (
        <svg {...props}>
          <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" />
          <path d="M13.73 21a2 2 0 01-3.46 0" />
        </svg>
      );
    case 'settings':
      return (
        <svg {...props}>
          <circle cx="12" cy="12" r="3" />
          <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 01-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09a1.65 1.65 0 00-1.08-1.51 1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09a1.65 1.65 0 001.51-1.08 1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9c.26.604.852.997 1.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" />
        </svg>
      );
    case 'download':
      return (
        <svg {...props}>
          <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
          <polyline points="7 10 12 15 17 10" />
          <line x1="12" y1="15" x2="12" y2="3" />
        </svg>
      );
    case 'message-square':
      return (
        <svg {...props}>
          <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
        </svg>
      );
    case 'menu':
      return (
        <svg {...props}>
          <path d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      );
    case 'sun':
      return (
        <svg {...props}>
          <circle cx="12" cy="12" r="5" />
          <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
        </svg>
      );
    case 'moon':
      return (
        <svg {...props}>
          <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
        </svg>
      );
    case 'brain':
      return (
        <svg {...props}>
          <path d="M12 2a7 7 0 00-4.6 12.3c.3.2.6.5.7.9l.9 3.8h6l.9-3.8c.1-.4.4-.7.7-.9A7 7 0 0012 2z" />
          <path d="M10 19h4M10 22h4M12 2v4" />
        </svg>
      );
    case 'timeline':
      return (
        <svg {...props}>
          <path d="M12 2v20M5 6h4M15 10h4M7 14h4M15 18h4" />
          <circle cx="12" cy="6" r="2" />
          <circle cx="12" cy="10" r="2" />
          <circle cx="12" cy="14" r="2" />
          <circle cx="12" cy="18" r="2" />
        </svg>
      );
    case 'ghost':
      return (
        <svg {...props}>
          <path d="M9 10h.01M15 10h.01M12 2a8 8 0 00-8 8v12l3-3 2.5 2.5L12 19l2.5 2.5L17 19l3 3V10a8 8 0 00-8-8z" />
        </svg>
      );
    case 'gauge':
      return (
        <svg {...props}>
          <path d="M12 22c5.52 0 10-4.48 10-10S17.52 2 12 2 2 6.48 2 12s4.48 10 10 10z" />
          <path d="M12 6v6l4 2" />
          <path d="M16.24 7.76l-4.24 4.24" />
        </svg>
      );
    case 'hearts':
      return (
        <svg {...props}>
          <path d="M16.5 3c-1.74 0-3.41.81-4.5 2.09C10.91 3.81 9.24 3 7.5 3 4.42 3 2 5.42 2 8.5c0 3.78 3.4 6.86 8.55 11.54L12 21.35l1.45-1.32C18.6 15.36 22 12.28 22 8.5 22 5.42 19.58 3 16.5 3z" />
        </svg>
      );
    case 'map':
      return (
        <svg {...props}>
          <path d="M1 6v16l7-4 8 4 7-4V2l-7 4-8-4-7 4z" />
          <path d="M8 2v16M16 6v16" />
        </svg>
      );
    case 'zap':
      return (
        <svg {...props}>
          <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
        </svg>
      );
    case 'printer':
      return (
        <svg {...props}>
          <path d="M6 9V2h12v7" />
          <path d="M6 18H4a2 2 0 01-2-2v-5a2 2 0 012-2h16a2 2 0 012 2v5a2 2 0 01-2 2h-2" />
          <rect x="6" y="14" width="12" height="8" />
        </svg>
      );
    case 'clock':
      return (
        <svg {...props}>
          <circle cx="12" cy="12" r="10" />
          <path d="M12 6v6l4 2" />
        </svg>
      );
    case 'split':
      return (
        <svg {...props}>
          <path d="M16 3h5v5M4 20L21 3M21 16v5h-5M15 15l6 6M4 4l5 5" />
        </svg>
      );
    case 'lightbulb':
      return (
        <svg {...props}>
          <path d="M9 18h6M10 22h4" />
          <path d="M12 2a7 7 0 00-4 12.7V17h8v-2.3A7 7 0 0012 2z" />
        </svg>
      );
    case 'shield-plus':
      return (
        <svg {...props}>
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          <path d="M12 9v6M9 12h6" />
        </svg>
      );
    case 'swords':
      return (
        <svg {...props}>
          <path d="M14.5 17.5L3 6V3h3l11.5 11.5M13 7l4-4 4 4-4 4" />
          <path d="M9.5 17.5L21 6V3h-3L6.5 14.5M11 7L7 3 3 7l4 4" />
        </svg>
      );
    case 'radar':
      return (
        <svg {...props}>
          <circle cx="12" cy="12" r="10" />
          <circle cx="12" cy="12" r="6" />
          <circle cx="12" cy="12" r="2" />
          <path d="M12 2v4M12 18v4" />
        </svg>
      );
    case 'landmark':
      return (
        <svg {...props}>
          <path d="M3 22h18M6 18v-4M10 18v-4M14 18v-4M18 18v-4M2 10l10-8 10 8" />
          <rect x="2" y="18" width="20" height="4" rx="1" />
        </svg>
      );
    case 'activity':
      return (
        <svg {...props}>
          <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
        </svg>
      );
    case 'book':
      return (
        <svg {...props}>
          <path d="M4 19.5A2.5 2.5 0 016.5 17H20" />
          <path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" />
        </svg>
      );
    default:
      return (
        <svg {...props}>
          <circle cx="12" cy="12" r="10" />
        </svg>
      );
  }
}
