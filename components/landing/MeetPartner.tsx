"use client";

import { motion } from "framer-motion";
import { Lightbulb, Pencil, Code2, Rocket, ArrowRight } from "lucide-react";

const flow = [
  { label: "Strategy", icon: Lightbulb, color: "text-sun" },
  { label: "Design", icon: Pencil, color: "text-hot-pink" },
  { label: "Code", icon: Code2, color: "text-electric" },
  { label: "Launch", icon: Rocket, color: "text-whatsapp" },
];

export function MeetPartner() {
  return (
    <section className="px-6 lg:px-10 py-24 bg-ink text-cream relative overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "radial-gradient(circle, white 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7 }}
        className="max-w-4xl mx-auto text-center relative"
      >
        <h2 className="font-display font-extrabold text-4xl md:text-6xl leading-tight">
          Meet your new{" "}
          <span className="font-script text-hot-pink italic font-normal">
            tech partner
          </span>
        </h2>
        <p className="mt-8 text-lg md:text-xl text-cream/70 leading-relaxed max-w-3xl mx-auto">
          With us, you&apos;ll discover a strategic partner equipped with the
          expertise, skill, and dedication to bring your vision to life. We
          don&apos;t just deliver code — we deliver confidence.
        </p>

        <div className="mt-14 flex flex-wrap justify-center items-center gap-3 md:gap-5">
          {flow.map((step, i) => (
            <div key={step.label} className="flex items-center gap-3 md:gap-5">
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12, duration: 0.5 }}
                className="flex flex-col items-center gap-2"
              >
                <div
                  className={`size-14 rounded-2xl bg-white/5 border border-white/10 grid place-items-center ${step.color}`}
                >
                  <step.icon className="size-6" />
                </div>
                <span className="text-xs font-semibold uppercase tracking-widest text-cream/70">
                  {step.label}
                </span>
              </motion.div>
              {i < flow.length - 1 && (
                <ArrowRight className="size-4 text-cream/30" />
              )}
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
