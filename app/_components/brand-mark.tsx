export function BrandMark({ size = 28 }: { size?: number }) {
  // Stylised shield-in-circle with a small inset square — feels like the same family
  // as Tribunal's geometric mark, but unmistakably its own.
  return (
    <svg
      className="mark"
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      aria-label="AgentGuard"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="16" cy="16" r="14" stroke="var(--teal)" strokeWidth="1.6" />
      <path
        d="M16 5.6 L24.4 9.2 V16.6 C24.4 21.7 20.6 25.4 16 26.8 C11.4 25.4 7.6 21.7 7.6 16.6 V9.2 Z"
        stroke="var(--teal)"
        strokeWidth="1.6"
        strokeLinejoin="round"
        fill="var(--teal-soft)"
      />
      <rect x="13" y="13" width="6" height="6" stroke="var(--amber)" strokeWidth="1.6" fill="none" />
    </svg>
  );
}
