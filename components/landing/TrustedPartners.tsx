"use client";

import { motion } from "framer-motion";

// Stylized SVG wordmarks for well-known brands. Single-color (currentColor) so
// they render cleanly grayscale and pick up brand-neutral styling.
function Wordmark({ name }: { name: string }) {
  return (
    <span className="font-display font-bold tracking-tight text-2xl text-ink/80 whitespace-nowrap select-none">
      {name}
    </span>
  );
}

const rowA = [
  "Stripe",
  "Spotify",
  "Uber",
  "Airbnb",
  "Netflix",
  "Shopify",
  "Slack",
  "Notion",
];
const rowB = [
  "Microsoft",
  "Google",
  "Amazon",
  "Meta",
  "Salesforce",
  "Adobe",
  "Linear",
  "Figma",
];

function Marquee({
  items,
  reverse = false,
  duration = 32,
}: {
  items: string[];
  reverse?: boolean;
  duration?: number;
}) {
  return (
    <div className="group relative overflow-hidden">
      <div
        className="flex gap-12 md:gap-16 whitespace-nowrap will-change-transform"
        style={{
          animation: `${reverse ? "marquee-reverse" : "marquee"} ${duration}s linear infinite`,
        }}
      >
        {[...items, ...items, ...items].map((name, i) => (
          <div
            key={`${name}-${i}`}
            className="grayscale opacity-50 hover:opacity-100 hover:grayscale-0 transition duration-300"
          >
            <Wordmark name={name} />
          </div>
        ))}
      </div>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-cream to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-cream to-transparent" />
    </div>
  );
}

export function TrustedPartners() {
  return (
    <section className="px-6 lg:px-10 py-20 bg-cream border-t border-border">
      <div className="max-w-[85vw] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="text-xs uppercase tracking-[0.3em] font-semibold text-ink/60">
            Trusted by industry leaders
          </p>
          <h2 className="mt-3 font-display font-extrabold text-2xl md:text-3xl text-ink">
            Teams that ship with us
          </h2>
        </motion.div>

        <div className="space-y-8">
          <Marquee items={rowA} duration={34} />
          <Marquee items={rowB} reverse duration={40} />
        </div>
      </div>
    </section>
  );
}
