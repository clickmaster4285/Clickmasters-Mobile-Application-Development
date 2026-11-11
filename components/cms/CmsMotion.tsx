"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";

// settings.motion for CMS sections, using the site's easing curve.
const EASE = [0.22, 1, 0.36, 1] as const;

const VARIANTS: Record<string, Variants> = {
  "fade-up": { hidden: { opacity: 0, y: 32 }, visible: { opacity: 1, y: 0 } },
  "fade-down": {
    hidden: { opacity: 0, y: -32 },
    visible: { opacity: 1, y: 0 },
  },
  "fade-left": { hidden: { opacity: 0, x: 40 }, visible: { opacity: 1, x: 0 } },
  "fade-right": {
    hidden: { opacity: 0, x: -40 },
    visible: { opacity: 1, x: 0 },
  },
  fade: { hidden: { opacity: 0 }, visible: { opacity: 1 } },
  zoom: {
    hidden: { opacity: 0, scale: 0.94 },
    visible: { opacity: 1, scale: 1 },
  },
};

export function CmsMotion({
  motion: kind,
  children,
}: {
  motion: string;
  children: ReactNode;
}) {
  const reduce = useReducedMotion();
  if (reduce) return <>{children}</>;

  return (
    <motion.div
      variants={VARIANTS[kind] ?? VARIANTS["fade-up"]}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}
