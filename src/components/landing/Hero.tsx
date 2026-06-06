import { motion } from "framer-motion";
import { ArrowRight, Star } from "lucide-react";
import type { ReactNode, RefObject } from "react";
import { DecorativeLayer, DoodleCircle, Drift, PaperAirplane, Sparkle, Squiggle, ZigZag } from "@/components/landing/decor";
import { MouseParallax, RevealText, ScrollFloat, useMagnetic } from "@/components/landing/motion";

function MagneticLink({ href, children, className }: { href: string; children: ReactNode; className: string }) {
  const ref = useMagnetic();

  return (
    <a href={href} ref={ref as RefObject<HTMLAnchorElement>} className={className}>
      {children}
    </a>
  );
}

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden px-6 pt-32 pb-24 lg:px-10">
      <DecorativeLayer>
        <ScrollFloat className="absolute left-[4%] top-28 h-36 w-36 opacity-45" yRange={[-18, 30]}>
          <DoodleCircle className="h-full w-full" />
        </ScrollFloat>
        <ScrollFloat className="absolute right-[7%] top-24 h-24 w-24 opacity-80" yRange={[16, -26]}>
          <Sparkle className="h-full w-full" />
        </ScrollFloat>
        <MouseParallax className="absolute right-[9%] top-44 h-28 w-28 opacity-75" strength={12}>
          <PaperAirplane className="h-full w-full" />
        </MouseParallax>
        <Drift className="absolute left-[12%] bottom-10 h-10 w-44 opacity-60" delay={0.3}>
          <Squiggle className="h-full w-full" tone="pink" />
        </Drift>
        <ScrollFloat className="absolute right-[24%] bottom-8 h-10 w-36 opacity-70" yRange={[-10, 18]}>
          <ZigZag className="h-full w-full" tone="sun" />
        </ScrollFloat>
      </DecorativeLayer>

      <div className="max-w-7xl mx-auto grid lg:grid-cols-[1.1fr_1fr] gap-12 items-center relative">
        <div>
          <motion.p
            initial={{ opacity: 0, y: 18, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="inline-flex items-center gap-2 rounded-full border border-ink/10 bg-white/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-ink/65 backdrop-blur-sm"
          >
            <span className="h-2 w-2 rounded-full bg-hot-pink" /> Mobile products that move markets
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="mt-6 font-display font-extrabold text-ink text-5xl md:text-6xl lg:text-7xl leading-[0.95] tracking-tight text-balance"
          >
            powerful{" "}
            <span className="font-script text-hot-pink italic font-normal text-6xl md:text-7xl lg:text-8xl align-baseline">
              friendly
            </span>
            <br />
            <RevealText className="inline-block">tech products</RevealText>
            <br />
            start-to-end
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="mt-8 text-lg text-ink/70 max-w-xl leading-relaxed"
          >
            We engineer high-performance iOS and Android apps with a more cinematic, strategic, and conversion-focused product journey from idea to launch.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.6 }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <MagneticLink
              href="#contact"
              className="group inline-flex items-center gap-2 rounded-full bg-hot-pink text-white px-7 py-4 font-semibold shadow-[0_18px_50px_-18px_color-mix(in_oklab,var(--color-hot-pink)_70%,transparent)] transition-transform duration-300"
            >
              Get in Touch
              <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
            </MagneticLink>
            <MagneticLink
              href="#work"
              className="rounded-full border-2 border-ink text-ink px-7 py-4 font-semibold bg-white/70 backdrop-blur-sm transition-colors hover:bg-ink hover:text-cream"
            >
              See Our Work
            </MagneticLink>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="mt-10 flex flex-wrap items-center gap-6 text-sm text-ink/60"
          >
            <span className="inline-flex items-center gap-1.5">
              <Star className="size-4 fill-sun text-sun" /> Clutch 4.9
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Star className="size-4 fill-sun text-sun" /> Trustpilot 4.8
            </span>
            <span>✓ 150+ Apps Delivered</span>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="relative aspect-square max-w-lg ml-auto"
        >
          <div className="absolute inset-6 rounded-[2rem] border border-ink/10 bg-white/70 backdrop-blur-sm shadow-[0_30px_90px_-40px_color-mix(in_oklab,var(--color-ink)_35%,transparent)]" />
          <svg viewBox="0 0 400 400" className="relative w-full h-full text-ink" fill="none" stroke="currentColor" strokeWidth="0.8">
            <polygon points="200,40 340,120 320,280 200,360 80,280 60,120" />
            <polygon points="200,40 200,360" />
            <polygon points="60,120 340,120" />
            <polygon points="80,280 320,280" />
            <polygon points="200,40 80,280" />
            <polygon points="200,40 320,280" />
            <polygon points="60,120 200,360" />
            <polygon points="340,120 200,360" />
            <circle cx="200" cy="200" r="40" />
            <circle cx="200" cy="200" r="80" strokeDasharray="2 4" />
            <circle cx="120" cy="180" r="3" fill="currentColor" />
            <circle cx="280" cy="220" r="3" fill="currentColor" />
            <circle cx="200" cy="100" r="2" fill="currentColor" />
            <path d="M200 200 L 340 120" />
            <path d="M200 200 L 60 120" strokeDasharray="3 3" />
            <path d="M200 200 L 200 360" strokeDasharray="3 3" />
          </svg>
          <div className="absolute -bottom-4 -left-4 size-20 rounded-full bg-sun/60 blur-2xl" />
          <div className="absolute -top-4 -right-4 size-24 rounded-full bg-hot-pink/30 blur-2xl" />
        </motion.div>
      </div>
    </section>
  );
}
