"use client";

import { motion } from "framer-motion";
import {
  Landmark,
  HeartPulse,
  Users,
  ShoppingBag,
  Truck,
  Building2,
} from "lucide-react";

const industries = [
  { name: "Fintech & Banking", icon: Landmark, color: "bg-hot-pink text-cream" },
  { name: "HealthTech & Wellness", icon: HeartPulse, color: "bg-electric text-cream" },
  { name: "Social & Entertainment", icon: Users, color: "bg-sun text-ink" },
  { name: "E-commerce & Retail", icon: ShoppingBag, color: "bg-ink text-cream" },
  { name: "Logistics & Supply Chain", icon: Truck, color: "bg-cream text-ink border-2 border-ink" },
  { name: "Real Estate & PropTech", icon: Building2, color: "bg-hot-pink/10 text-ink border-2 border-hot-pink" },
];

export function Industries() {
  return (
    <section id="industries" className="px-6 lg:px-10 py-24 bg-cream">
      <div className="max-w-7xl mx-auto">
        <div className="mb-14 max-w-2xl">
          <p className="font-script text-3xl text-hot-pink">industries</p>
          <h2 className="font-display font-extrabold text-4xl md:text-5xl text-ink">
            we serve
          </h2>
          <p className="mt-4 text-ink/70">
            Deep domain experience means we ship faster, ask sharper questions, and avoid the
            traps generalists fall into.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {industries.map((it, i) => (
            <motion.div
              key={it.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              className={`${it.color} rounded-2xl p-8 hover:-translate-y-1 transition-transform cursor-default`}
            >
              <it.icon className="size-8" />
              <h3 className="mt-6 font-display font-extrabold text-2xl">{it.name}</h3>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
