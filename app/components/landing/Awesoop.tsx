"use client";

import { motion } from "framer-motion";

const logos = ["stripe", "spotify", "uber", "airbnb", "netflix", "shopify"];

export function Awesoop() {
  return (
    <section className="px-6 lg:px-10 py-24 border-t border-border">
      <div className="max-w-[85vw] mx-auto grid lg:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <p className="font-script text-4xl text-hot-pink mb-4">Awesoop!</p>
          <h2 className="font-display font-extrabold text-4xl md:text-5xl text-ink leading-tight">
            An award-winning team of designers, engineers &amp; product thinkers.
          </h2>
          <p className="mt-6 text-ink/70 leading-relaxed max-w-lg">
            We don't just write code. We build partnerships. With ClickMasters, you'll discover a
            strategic partner equipped with the expertise, skill, and dedication to bring your
            vision to life.
          </p>
          <div className="mt-10 inline-flex items-baseline gap-3 rounded-2xl border-2 border-ink px-6 py-4">
            <span className="font-display font-extrabold text-5xl text-ink">250+</span>
            <span className="text-sm text-ink/70">web &amp; mobile apps developed</span>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-3 gap-6"
        >
          {logos.map((l) => (
            <div
              key={l}
              className="aspect-[3/2] grid place-items-center rounded-xl border border-border bg-white grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all"
            >
              <span className="font-display font-bold text-ink text-lg capitalize">{l}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}