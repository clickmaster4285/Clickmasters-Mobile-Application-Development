"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

function strokeColor(tone: "electric" | "pink" | "sun" | "ink" = "electric") {
  if (tone === "pink") return "var(--color-hot-pink)";
  if (tone === "sun") return "var(--color-sun)";
  if (tone === "ink") return "var(--color-ink)";
  return "var(--color-electric)";
}

export function DoodleCircle({ className = "", tone = "electric" as const }: { className?: string; tone?: "electric" | "pink" | "sun" | "ink" }) {
  return (
    <svg viewBox="0 0 120 120" className={className} fill="none" aria-hidden>
      <path
        d="M60 10 C86 8, 108 32, 110 60 C112 92, 92 111, 60 110 C29 109, 7 91, 10 57 C13 28, 34 12, 60 10Z"
        stroke={strokeColor(tone)}
        strokeWidth="2.5"
        strokeDasharray="6 7"
        strokeLinecap="round"
      />
      <path
        d="M59 18 C80 18, 102 35, 102 61 C102 85, 83 103, 59 103 C37 103, 18 87, 18 62 C18 37, 34 19, 59 18Z"
        stroke={strokeColor(tone)}
        strokeWidth="1.2"
        opacity="0.45"
      />
    </svg>
  );
}

export function PaperAirplane({ className = "", tone = "pink" as const }: { className?: string; tone?: "electric" | "pink" | "sun" | "ink" }) {
  return (
    <svg viewBox="0 0 120 120" className={className} fill="none" aria-hidden>
      <path
        d="M14 62 C25 48, 42 38, 59 27 C75 18, 92 12, 108 9 C95 27, 87 46, 81 64 C73 86, 64 99, 50 109 C48 91, 46 79, 41 67 C32 68, 22 65, 14 62Z"
        stroke={strokeColor(tone)}
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      <path d="M41 67 L81 64" stroke="var(--color-sun)" strokeWidth="2" strokeDasharray="5 6" />
      <path d="M8 89 C22 95, 38 95, 51 87" stroke={strokeColor(tone)} strokeWidth="2" strokeDasharray="2 7" strokeLinecap="round" />
    </svg>
  );
}

export function Squiggle({ className = "", tone = "electric" as const }: { className?: string; tone?: "electric" | "pink" | "sun" | "ink" }) {
  return (
    <svg viewBox="0 0 220 40" className={className} fill="none" aria-hidden>
      <path
        d="M0 20 C18 8, 36 8, 54 20 C72 32, 90 32, 108 20 C126 8, 144 8, 162 20 C180 32, 198 32, 220 18"
        stroke={strokeColor(tone)}
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function Sparkle({ className = "", tone = "sun" as const }: { className?: string; tone?: "electric" | "pink" | "sun" | "ink" }) {
  return (
    <svg viewBox="0 0 40 40" className={className} fill="none" aria-hidden>
      <path d="M20 2 L24 16 L38 20 L24 24 L20 38 L16 24 L2 20 L16 16 Z" fill={strokeColor(tone)} />
    </svg>
  );
}

export function ZigZag({ className = "", tone = "pink" as const }: { className?: string; tone?: "electric" | "pink" | "sun" | "ink" }) {
  return (
    <svg viewBox="0 0 160 32" className={className} fill="none" aria-hidden>
      <path
        d="M4 24 L24 6 L42 24 L60 8 L78 24 L96 8 L114 24 L132 8 L152 24"
        stroke={strokeColor(tone)}
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function RocketSketch({ className = "", tone = "electric" as const }: { className?: string; tone?: "electric" | "pink" | "sun" | "ink" }) {
  return (
    <svg viewBox="0 0 72 72" className={className} fill="none" aria-hidden>
      <path d="M37 8 C49 16, 57 28, 60 42 L45 39 L29 54 L26 69 C18 60, 12 48, 12 35 C12 20, 22 11, 37 8Z" stroke={strokeColor(tone)} strokeWidth="2.5" strokeLinejoin="round" />
      <circle cx="40" cy="31" r="6.5" stroke="var(--color-sun)" strokeWidth="2" />
      <path d="M22 44 L12 53" stroke={strokeColor(tone)} strokeWidth="2.5" strokeLinecap="round" />
      <path d="M28 50 L19 60" stroke={strokeColor(tone)} strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

export function DottedTrail({ className = "", tone = "electric" as const }: { className?: string; tone?: "electric" | "pink" | "sun" | "ink" }) {
  return (
    <svg viewBox="0 0 140 24" className={className} fill="none" aria-hidden>
      {Array.from({ length: 8 }).map((_, index) => (
        <circle key={index} cx={12 + index * 16} cy={12 + (index % 2 === 0 ? 0 : 2)} r="3" fill={strokeColor(tone)} opacity={1 - index * 0.08} />
      ))}
    </svg>
  );
}

export function DecorativeLayer({ children }: { children: ReactNode }) {
  return <div className="pointer-events-none absolute inset-0 overflow-hidden">{children}</div>;
}

export function Drift({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  return (
    <motion.div
      className={className}
      animate={{ y: [0, -12, 0], rotate: [0, 2, -2, 0] }}
      transition={{ duration: 8, repeat: Infinity, repeatType: "mirror", ease: "easeInOut", delay }}
    >
      {children}
    </motion.div>
  );
}
