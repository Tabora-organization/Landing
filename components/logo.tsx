export function Logo({ size = 32 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
      <rect width="100" height="100" rx="22" fill="url(#tlogo-grad)" />
      {/* T - horizontal bar */}
      <rect x="27" y="17" width="46" height="10" rx="5" fill="white" />
      {/* T - vertical stem */}
      <rect x="45" y="17" width="10" height="25" rx="4" fill="white" />
      {/* Bezier arch curve */}
      <path
        d="M24 64 Q50 36 76 64"
        stroke="white"
        strokeWidth="5.5"
        strokeLinecap="round"
        fill="none"
      />
      {/* Endpoint dots */}
      <circle cx="24" cy="64" r="4" fill="white" />
      <circle cx="76" cy="64" r="4" fill="white" />
      {/* Bottom lines */}
      <rect x="30" y="74" width="40" height="3" rx="1.5" fill="white" opacity="0.5" />
      <rect x="34" y="80" width="32" height="3" rx="1.5" fill="white" opacity="0.4" />
      <rect x="38" y="86" width="24" height="3" rx="1.5" fill="white" opacity="0.3" />
      <defs>
        <linearGradient id="tlogo-grad" x1="0" y1="0" x2="100" y2="100">
          <stop stopColor="#4A7CF7" />
          <stop offset="1" stopColor="#2563EB" />
        </linearGradient>
      </defs>
    </svg>
  );
}
