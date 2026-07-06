"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";
const dashboard = "/assets/marketing/growth_dashboard.jpeg";

const items = [
  {
    name: "Sarah Chen",
    role: "CTO, NeoBank",
    quote:
      "ClickMasters delivered a banking app that scaled to 3M users. Their engineering discipline is world-class.",
  },
  {
    name: "Marcus Rodriguez",
    role: "Founder, HealthTrack",
    quote:
      "They didn't just build the app — they became our technical co-founders. Invaluable.",
  },
  {
    name: "Jessica Wu",
    role: "Product Lead, SocialWave",
    quote:
      "The UI/UX work increased our retention by 40%. Best agency we've ever worked with.",
  },
];

export function Testimonials() {
  return (
    <section className="px-6 lg:px-10 py-24 bg-ink text-cream">
      <div className="max-w-[85vw] mx-auto">
        <p className="font-script text-3xl text-hot-pink">what</p>
        <h2 className="font-display font-extrabold text-4xl md:text-5xl">
          our partners say
        </h2>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="mt-12 relative rounded-3xl overflow-hidden border border-cream/10"
        >
          <img
            src={dashboard}
            alt="Growth dashboard: 1M+ impressions, 500+ projects, +245% growth"
            className="w-full h-auto block"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-transparent" />
          <div className="absolute bottom-6 left-6 right-6 flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-cream/60">
                Results in numbers
              </p>
              <p className="font-display font-extrabold text-2xl md:text-3xl mt-1">
                Real metrics from real clients
              </p>
            </div>
            <div className="flex gap-6 text-sm">
              <div>
                <p className="font-display font-bold text-xl">1M+</p>
                <p className="text-cream/60 text-xs">Impressions</p>
              </div>
              <div>
                <p className="font-display font-bold text-xl">500+</p>
                <p className="text-cream/60 text-xs">Projects</p>
              </div>
              <div>
                <p className="font-display font-bold text-xl">+245%</p>
                <p className="text-cream/60 text-xs">Growth</p>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="mt-14 grid md:grid-cols-3 gap-6">
          {items.map((t, i) => (
            <motion.figure
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="rounded-2xl border border-cream/10 bg-cream/[0.03] p-8 backdrop-blur"
            >
              <div className="flex gap-1">
                {[0, 1, 2, 3, 4].map((s) => (
                  <Star key={s} className="size-4 fill-sun text-sun" />
                ))}
              </div>
              <blockquote className="mt-5 text-cream/90 leading-relaxed">
                "{t.quote}"
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-3">
                <div className="size-10 rounded-full bg-gradient-to-br from-hot-pink to-electric" />
                <div>
                  <p className="font-semibold">{t.name}</p>
                  <p className="text-xs text-cream/60">{t.role}</p>
                </div>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
