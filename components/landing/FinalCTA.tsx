"use client";

import { motion } from "framer-motion";
import { Mail, Phone, MessageCircle } from "lucide-react";
import { RevealText, useMagnetic, MouseParallax } from "./motion";
import { DoodleCircle, PaperAirplane, RocketSketch, Sparkle, Squiggle, Drift, DottedTrail } from "./decor";
const growthEngine = "/assets/marketing/growth_Engine.jpeg";

function MagneticCard({
  href,
  className,
  children,
}: {
  href: string;
  className: string;
  children: React.ReactNode;
}) {
  const ref = useMagnetic(0.18);
  return (
    <a
      ref={ref as React.RefObject<HTMLAnchorElement>}
      href={href}
      className={`group relative rounded-3xl p-7 will-change-transform overflow-hidden ${className}`}
    >
      {children}
    </a>
  );
}

export function FinalCTA() {
  return (
    <section
      id="contact"
      className="relative px-6 lg:px-10 py-32 bg-cream overflow-hidden"
    >
      <MouseParallax strength={12} className="absolute inset-0 pointer-events-none">
        <Drift className="absolute top-16 left-10 size-36 opacity-40">
          <DoodleCircle tone="pink" className="size-full" />
        </Drift>
        <Drift delay={1} className="absolute top-24 right-16 size-40 opacity-50">
          <PaperAirplane tone="electric" className="size-full" />
        </Drift>
        <Drift delay={2} className="absolute bottom-32 left-1/4 size-24 opacity-60">
          <RocketSketch tone="sun" className="size-full" />
        </Drift>
        <Sparkle className="absolute top-32 left-1/3 size-6 opacity-70" />
        <Sparkle className="absolute bottom-44 right-1/3 size-4 opacity-70" />
      </MouseParallax>

      <svg
        aria-hidden
        viewBox="0 0 1200 200"
        className="absolute bottom-0 inset-x-0 w-full text-ink/5"
        fill="currentColor"
      >
        <path d="M0 200 L100 120 L180 180 L260 80 L340 160 L420 90 L500 170 L580 100 L660 180 L740 110 L820 170 L900 90 L980 160 L1060 100 L1140 180 L1200 130 L1200 200 Z" />
      </svg>

      <div className="max-w-4xl mx-auto text-center relative">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative inline-block"
        >
          <p className="font-script text-5xl md:text-7xl text-ink -rotate-2">grow your app idea</p>
          <Squiggle className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-48 text-hot-pink" tone="pink" />
        </motion.div>

        <RevealText className="mt-6 font-display font-extrabold text-5xl md:text-8xl tracking-tight leading-[0.95]">
          LET'S WORK TOGETHER
        </RevealText>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-6 text-ink/70 text-lg max-w-xl mx-auto"
        >
          Tell us your idea. We'll come back within 24 hours with a clear plan, timeline, and pricing.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="mt-16 relative rounded-3xl overflow-hidden border border-ink/10 shadow-[0_30px_70px_-30px_rgba(0,0,0,0.3)]"
        >
          <img
            src={growthEngine}
            alt="Digital growth engine: Strategy → Design → Development → Marketing → Growth"
            className="w-full h-auto block"
            loading="lazy"
          />
          <div className="absolute top-4 left-4 rounded-full bg-ink/85 text-cream text-[10px] font-semibold uppercase tracking-[0.25em] px-3 py-1.5">
            Your end-to-end tech partner
          </div>
        </motion.div>

        <div className="mt-16 grid sm:grid-cols-3 gap-5 max-w-3xl mx-auto">
          <MagneticCard
            href="mailto:sale@clickmastersmobiledevelopmentcompany.com"
            className="bg-hot-pink text-cream shadow-[0_20px_50px_-20px_rgba(255,71,127,0.7)]"
          >
            <Mail className="size-6 mb-3 mx-auto transition-transform duration-500 group-hover:-translate-y-1 group-hover:rotate-[-8deg]" />
            <p className="text-xs uppercase tracking-[0.3em] opacity-80">Email</p>
            <p className="mt-1 font-semibold text-sm break-all">sale@clickmasters…</p>
            <DottedTrail className="absolute -bottom-1 left-4 w-24 text-cream/40" />
          </MagneticCard>
          <MagneticCard
            href="tel:+13252024074"
            className="border-2 border-ink text-ink bg-cream hover:bg-ink hover:text-cream transition-colors duration-500"
          >
            <Phone className="size-6 mb-3 mx-auto transition-transform duration-500 group-hover:-translate-y-1 group-hover:rotate-[8deg]" />
            <p className="text-xs uppercase tracking-[0.3em] opacity-70">Call</p>
            <p className="mt-1 font-semibold">+1 325 202 4074</p>
          </MagneticCard>
          <MagneticCard
            href="https://wa.me/13252024074"
            className="bg-whatsapp text-white shadow-[0_20px_50px_-20px_rgba(37,211,102,0.7)]"
          >
            <MessageCircle className="size-6 mb-3 mx-auto transition-transform duration-500 group-hover:-translate-y-1 group-hover:rotate-[-8deg]" />
            <p className="text-xs uppercase tracking-[0.3em] opacity-80">WhatsApp</p>
            <p className="mt-1 font-semibold">+1 325 202 4074</p>
          </MagneticCard>
        </div>
      </div>
    </section>
  );
}
