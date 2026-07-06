"use client";

import { motion } from "framer-motion";
import { Trophy, Award, Medal, Star, Crown, Sparkles } from "lucide-react";

const awards = [
  {
    name: "Awwwards Nominee",
    year: "2024",
    icon: Trophy,
    color: "text-hot-pink",
    rot: -1.5,
  },
  {
    name: "Clutch Global Top 10",
    year: "Mobile Dev",
    icon: Award,
    color: "text-electric",
    rot: 1,
  },
  {
    name: "Fastest Growing Dev Firm",
    year: "2023",
    icon: Medal,
    color: "text-sun",
    rot: -1,
  },
  {
    name: "Webby Honoree",
    year: "2024",
    icon: Star,
    color: "text-whatsapp",
    rot: 1.5,
  },
  {
    name: "Inc. 5000 Nominee",
    year: "2023",
    icon: Crown,
    color: "text-hot-pink",
    rot: -1,
  },
  {
    name: "Deloitte Tech Fast 50",
    year: "2022",
    icon: Sparkles,
    color: "text-electric",
    rot: 1,
  },
];

export function Awards() {
  return (
    <section className="px-6 lg:px-10 py-24 bg-cream border-t border-border">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <p className="font-script text-3xl text-hot-pink">a little</p>
          <h2 className="font-display font-extrabold text-4xl md:text-5xl text-ink">
            recognition
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {awards.map((a, i) => (
            <motion.div
              key={a.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0, rotate: a.rot }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              whileHover={{ rotate: 0, scale: 1.03, y: -4 }}
              className="flex items-center gap-4 rounded-2xl bg-white border-2 border-ink/10 px-5 py-5 shadow-[6px_6px_0_0_var(--color-ink)]"
            >
              <div
                className={`size-12 rounded-xl bg-ink/5 grid place-items-center ${a.color} flex-shrink-0`}
              >
                <a.icon className="size-6" />
              </div>
              <div className="text-left">
                <p className="font-display font-bold text-ink text-base leading-tight">
                  {a.name}
                </p>
                <p className="text-xs text-ink/60 mt-1">{a.year}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
