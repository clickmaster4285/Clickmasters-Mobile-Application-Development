"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";

const caps = [
  "UX Research & Strategy",
  "Product Architecture",
  "Native iOS & Android Engineering",
  "Cross-Platform Development",
  "QA & Automated Testing",
  "DevOps & CI/CD",
];

const stack = [
  "Swift",
  "Kotlin",
  "React Native",
  "Flutter",
  "Node.js",
  "Python",
  "PostgreSQL",
  "Firebase",
  "AWS",
  "Figma",
  "Xcode",
  "Android Studio",
];

export function TechStack() {
  return (
    <section className="px-6 lg:px-10 py-24 border-t border-border">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
        >
          <p className="font-script text-3xl text-hot-pink">our</p>
          <h2 className="font-display font-extrabold text-4xl md:text-5xl text-ink">studio path</h2>
          <ul className="mt-8 space-y-4">
            {caps.map((c) => (
              <li
                key={c}
                className="flex items-center gap-3 text-ink hover:translate-x-1 transition-transform"
              >
                <span className="grid place-items-center size-7 rounded-full bg-hot-pink/10 text-hot-pink">
                  <Check className="size-4" />
                </span>
                <span className="font-medium">{c}</span>
              </li>
            ))}
          </ul>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-3 md:grid-cols-4 gap-3"
        >
          {stack.map((s) => (
            <div
              key={s}
              className="aspect-square rounded-2xl border border-border bg-white grid place-items-center text-center p-3 text-sm font-medium text-ink/70 hover:bg-ink hover:text-cream hover:border-ink transition-all"
            >
              {s}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}