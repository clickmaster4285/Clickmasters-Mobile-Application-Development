"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { RevealText, ScrollFloat, useMagnetic } from "./motion";
import {
  DoodleCircle,
  PaperAirplane,
  Sparkle,
  Squiggle,
  DottedTrail,
  Drift,
} from "./decor";

const projects = [
  {
    name: "Corrib Oil",
    tag: "Loyalty / Fintech",
    desc: "Fuel loyalty app with 50k+ active users. Reduced churn by 38% with real-time rewards.",
    bg: "bg-sun",
    text: "text-ink",
    btn: "bg-ink text-cream",
    flip: false,
    video: "/assets/Corrib_Oil_loyalty_app_users.mp4",
    rotate: "-rotate-6",
  },
  {
    name: "3D2Cut",
    tag: "Manufacturing SaaS",
    desc: "Workflow app that helped pruners cut training time from weeks to hours.",
    bg: "bg-hot-pink",
    text: "text-cream",
    btn: "bg-cream text-ink",
    flip: true,
    video: "/assets/3D2Cut_workflow_app_pruners.mp4",
    rotate: "rotate-3",
  },
  {
    name: "NeoBank",
    tag: "Digital Banking",
    desc: "Digital banking platform with 3M+ downloads. Onboarding under 90 seconds.",
    bg: "bg-electric",
    text: "text-cream",
    btn: "bg-cream text-ink",
    flip: false,
    video: "/assets/Digital_banking_platform_NeoBank.mp4",
    rotate: "-rotate-3",
  },
];

function PhoneVideo({ src, rotate }: { src: string; rotate: string }) {
  return (
    <ScrollFloat
      yRange={[40, -40]}
      className="relative aspect-[4/3] w-full grid place-items-center"
    >
      <Drift className="absolute -top-2 -left-2 size-16 opacity-70">
        <DoodleCircle tone="ink" className="size-full" />
      </Drift>
      <Sparkle className="absolute top-6 right-8 size-5 animate-pulse" />
      <div
        className={`relative w-56 h-[460px] rounded-[2.75rem] bg-ink p-2 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.45)] ${rotate} transition-transform duration-700 hover:rotate-0`}
      >
        <video
          src={src}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          className="w-full h-full rounded-[2.25rem] object-cover"
        />
        <div className="absolute top-3 left-1/2 -translate-x-1/2 w-20 h-5 rounded-full bg-ink" />
      </div>
      <DottedTrail className="absolute -bottom-2 left-4 w-32 opacity-60" />
    </ScrollFloat>
  );
}

function CaseButton({
  className,
  children,
}: {
  className: string;
  children: React.ReactNode;
}) {
  const ref = useMagnetic(0.3);
  return (
    <button
      ref={ref as React.RefObject<HTMLButtonElement>}
      className={`mt-8 inline-flex items-center gap-2 rounded-full px-6 py-3 font-semibold will-change-transform shadow-[0_12px_30px_-12px_rgba(0,0,0,0.35)] ${className}`}
    >
      {children}
    </button>
  );
}

export function Portfolio() {
  return (
    <section id="work" className="relative px-6 lg:px-10 py-32 overflow-hidden">
      <Drift className="absolute top-20 right-10 size-40 opacity-30 pointer-events-none">
        <PaperAirplane className="size-full" tone="electric" />
      </Drift>
      <Drift
        delay={2}
        className="absolute bottom-32 left-6 size-28 opacity-40 pointer-events-none"
      >
        <DoodleCircle tone="pink" className="size-full" />
      </Drift>

      <div className="max-w-[85vw] mx-auto relative">
        <div className="mb-20 max-w-3xl">
          <div className="flex items-center gap-3">
            <p className="font-script text-3xl text-hot-pink -rotate-3">our</p>
            <Squiggle className="w-24 text-electric" tone="electric" />
          </div>
          <RevealText className="font-display font-extrabold text-5xl md:text-7xl text-ink leading-none">
            work
          </RevealText>
          <p className="mt-6 text-ink/70 text-lg max-w-2xl">
            We specialize in premium mobile and web development across fintech,
            health, commerce, and social — products real people use every day.
          </p>
        </div>
        <div className="space-y-12">
          {projects.map((p, i) => (
            <motion.article
              key={p.name}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-120px" }}
              transition={{
                duration: 0.8,
                ease: [0.22, 1, 0.36, 1],
                delay: i * 0.05,
              }}
              className={`${p.bg} ${p.text} relative rounded-[2.5rem] overflow-hidden grid md:grid-cols-2 items-center shadow-[0_30px_80px_-30px_rgba(0,0,0,0.35)]`}
            >
              <Sparkle className="absolute top-6 left-6 size-4 opacity-60" />
              <div className={`p-10 md:p-16 ${p.flip ? "md:order-2" : ""}`}>
                <p className="text-xs uppercase tracking-[0.3em] opacity-70">
                  {p.tag}
                </p>
                <h3 className="mt-3 font-display font-extrabold text-5xl md:text-6xl leading-[0.95]">
                  {p.name}
                </h3>
                <p className="mt-5 opacity-90 max-w-md text-lg leading-relaxed">
                  {p.desc}
                </p>
                <CaseButton className={p.btn}>
                  View Case Study <ArrowRight className="size-4" />
                </CaseButton>
              </div>
              <div className={`p-6 md:p-10 ${p.flip ? "md:order-1" : ""}`}>
                <PhoneVideo src={p.video} rotate={p.rotate} />
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
