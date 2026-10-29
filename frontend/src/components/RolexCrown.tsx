import React from "react";

export default function RolexCrown({ className = "w-7 h-7" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 80"
      fill="currentColor"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* 5 pearls on top of crown */}
      <circle cx="10" cy="22" r="5" />
      <circle cx="28" cy="14" r="5.5" />
      <circle cx="50" cy="8" r="6" />
      <circle cx="72" cy="14" r="5.5" />
      <circle cx="90" cy="22" r="5" />

      {/* 5 coronet spikes radiating downwards to the base */}
      <path
        d="M10 26 L26 62 L32 20 L48 62 L50 14 L52 62 L68 20 L74 62 L90 26 L82 66 C75 72 25 72 18 66 Z"
        fillRule="evenodd"
      />

      {/* Crown oval base band */}
      <ellipse cx="50" cy="72" rx="34" ry="5.5" />
      <ellipse cx="50" cy="71" rx="30" ry="3.5" fill="#000000" fillOpacity="0.15" />
    </svg>
  );
}
