"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import type { ReactNode, RefObject } from "react";
import { useMagnetic } from "@/components/landing/motion";

const digitalCity = "/assets/marketing/digital-city.webp";

function MagneticLink({
  href,
  children,
  className,
}: {
  href: string;
  children: ReactNode;
  className: string;
}) {
  const ref = useMagnetic();
  return (
    <a
      href={href}
      ref={ref as RefObject<HTMLAnchorElement>}
      className={className}
    >
      {children}
    </a>
  );
}

function PhoneMockup() {
  return (
    <motion.div
      animate={{ y: [0, -10, 0], rotate: [-6, -4, -6] }}
      transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      className="absolute inset-0"
    >
      <div className="relative mx-auto h-full w-[68%] rounded-[2.6rem] bg-ink p-2.5 shadow-[0_40px_80px_-30px_rgba(0,0,0,0.5)] border-[6px] border-ink">
        <div className="absolute top-2.5 left-1/2 -translate-x-1/2 h-5 w-24 rounded-b-2xl bg-ink z-10" />
        <div className="h-full w-full rounded-[2rem] bg-gradient-to-br from-electric via-hot-pink to-sun overflow-hidden relative">
          <div className="absolute inset-0 bg-ink/10" />
          <div className="relative p-5 pt-8 text-white h-full flex flex-col">
            <p className="text-[10px] uppercase tracking-widest opacity-80">
              Today
            </p>
            <p className="font-display font-extrabold text-2xl leading-tight mt-1">
              Good morning, Alex
            </p>
            <div className="mt-5 rounded-2xl bg-white/15 backdrop-blur-sm border border-white/20 p-3">
                <p className="text-[10px] opacity-80 uppercase tracking-wider">
                Status
              </p>
              <p className="font-display font-extrabold text-3xl">Draft</p>
              <div className="mt-2 h-1.5 rounded-full bg-white/20 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "82%" }}
                  transition={{ delay: 1, duration: 1.4 }}
                  className="h-full bg-white"
                />
              </div>
            </div>
            <div className="mt-3 grid grid-cols-2 gap-2">
              <div className="rounded-xl bg-white/15 backdrop-blur-sm p-2.5 border border-white/20">
                <p className="text-[9px] opacity-80 uppercase tracking-wider">
                  Sprint
                </p>
                <p className="font-display font-bold text-lg">Build</p>
              </div>
              <div className="rounded-xl bg-white/15 backdrop-blur-sm p-2.5 border border-white/20">
                <p className="text-[9px] opacity-80 uppercase tracking-wider">
                  Queue
                </p>
                <p className="font-display font-bold text-lg">3 items</p>
              </div>
            </div>
            <div className="mt-auto rounded-2xl bg-white text-ink p-3">
              <p className="font-semibold text-xs">Ship v2.1 to TestFlight</p>
              <p className="text-[10px] text-ink/60 mt-0.5">Tap to deploy →</p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function PhoneMockupBack() {
  return (
    <motion.div
      animate={{ y: [0, 8, 0], rotate: [6, 8, 6] }}
      transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      className="absolute inset-0"
    >
      <div className="relative ml-auto mr-[6%] h-[88%] mt-[6%] w-[55%] rounded-[2.2rem] bg-ink/90 p-2 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.4)] border-[5px] border-ink/80">
        <div className="h-full w-full rounded-[1.8rem] bg-gradient-to-br from-ink via-electric/60 to-ink overflow-hidden p-4 text-white">
          <p className="text-[9px] uppercase tracking-widest opacity-60">
            Analytics
          </p>
          <p className="font-display font-bold text-base mt-1">Notes</p>
          <p className="text-[9px] opacity-60">open questions</p>
          <svg
            viewBox="0 0 100 50"
            className="mt-4 w-full text-sun"
            fill="none"
          >
            <path
              d="M0 40 L20 32 L35 36 L55 18 L75 22 L100 6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M0 40 L20 32 L35 36 L55 18 L75 22 L100 6 L100 50 L0 50 Z"
              fill="url(#g1)"
              opacity="0.35"
            />
            <defs>
              <linearGradient id="g1" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0" stopColor="currentColor" />
                <stop offset="1" stopColor="currentColor" stopOpacity="0" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>
    </motion.div>
  );
}

export function Hero() {
  return (
    <section
      id="top"
      className="relative overflow-hidden px-6 pt-36 pb-24 lg:px-10"
    >
      <div className="max-w-[85vw] mx-auto grid lg:grid-cols-[1.1fr_1fr] gap-12 items-center relative">
        <div>
          <motion.p
            initial={{ opacity: 0, y: 18, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="inline-flex items-center gap-2 rounded-full border border-ink/10 bg-white/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-ink/65 backdrop-blur-sm"
          >
            <span className="h-2 w-2 rounded-full bg-hot-pink" /> Mobile
            products that move markets
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
            tech products
            <br />
            start-to-end
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="mt-8 text-lg text-ink/70 max-w-xl leading-relaxed"
          >
            We engineer high-performance iOS and Android apps with a more
            cinematic, strategic, and conversion-focused product journey from
            idea to launch.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.6 }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <MagneticLink
              href="/contact"
              className="group inline-flex items-center gap-2 rounded-full bg-hot-pink text-white px-7 py-4 font-semibold shadow-[0_18px_50px_-18px_color-mix(in_oklab,var(--color-hot-pink)_70%,transparent)] transition-transform duration-300"
            >
              Get in Touch
              <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
            </MagneticLink>
            <MagneticLink
              href="/services"
              className="rounded-full border-2 border-ink text-ink px-7 py-4 font-semibold bg-white/70 backdrop-blur-sm transition-colors hover:bg-ink hover:text-cream"
            >
              Read the guides
            </MagneticLink>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="relative aspect-[4/5] max-w-lg mx-auto w-full"
        >
          <div className="absolute inset-0 rounded-[2.5rem] bg-gradient-to-br from-electric/20 via-hot-pink/15 to-sun/30 blur-2xl" />

          {/* Digital city visualization */}
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-2 left-0 right-0 mx-auto w-[92%] aspect-[16/10] rounded-3xl overflow-hidden border-2 border-ink/10 shadow-[0_30px_60px_-25px_rgba(0,0,0,0.45)] rotate-[-3deg]"
          >
            <Image
              src={digitalCity}
              alt="Abstract city skyline used as a visual for connected mobile products"
              width={1400}
              height={875}
              priority
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/40 via-transparent to-transparent" />
            <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-white">
              <p className="text-[10px] uppercase tracking-[0.25em] opacity-90">
                Connected ecosystem
              </p>
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-white/15 backdrop-blur">
                LIVE
              </span>
            </div>
          </motion.div>

          <div className="absolute bottom-0 right-0 w-[58%] aspect-[3/5]">
            <PhoneMockup />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
