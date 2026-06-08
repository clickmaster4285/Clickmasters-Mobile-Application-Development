import { motion } from "framer-motion";
import { ArrowRight, Star } from "lucide-react";
import type { ReactNode, RefObject } from "react";
import { useMagnetic } from "@/components/landing/motion";
import digitalCity from "@/assets/marketing/digital-city.jpeg.asset.json";

function MagneticLink({ href, children, className }: { href: string; children: ReactNode; className: string }) {
  const ref = useMagnetic();
  return (
    <a href={href} ref={ref as RefObject<HTMLAnchorElement>} className={className}>
      {children}
    </a>
  );
}

function ReviewBadge({
  rating,
  source,
  count,
  logo,
}: {
  rating: string;
  source: string;
  count: string;
  logo: ReactNode;
}) {
  return (
    <div className="flex items-center gap-3 rounded-2xl bg-white/80 backdrop-blur-sm border border-ink/10 px-4 py-3 shadow-sm">
      <div className="size-9 rounded-lg bg-ink/5 grid place-items-center flex-shrink-0">
        {logo}
      </div>
      <div className="leading-tight">
        <div className="flex items-center gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className="size-3 fill-sun text-sun" />
          ))}
          <span className="ml-1 text-xs font-bold text-ink">{rating}</span>
        </div>
        <p className="text-[11px] text-ink/60 mt-0.5">
          <span className="font-semibold text-ink/80">{source}</span> · {count}
        </p>
      </div>
    </div>
  );
}

function GoogleG() {
  return (
    <svg viewBox="0 0 24 24" className="size-5" aria-hidden>
      <path fill="#4285F4" d="M22.5 12.27c0-.79-.07-1.54-.2-2.27H12v4.51h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.75h3.57c2.08-1.92 3.22-4.74 3.22-8.3z" />
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.75c-.99.66-2.25 1.06-3.71 1.06-2.86 0-5.29-1.93-6.15-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
      <path fill="#FBBC05" d="M5.85 14.12A6.6 6.6 0 015.5 12c0-.74.13-1.46.35-2.12V7.04H2.18A11 11 0 001 12c0 1.78.43 3.46 1.18 4.96l3.67-2.84z" />
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.04l3.67 2.84C6.71 7.31 9.14 5.38 12 5.38z" />
    </svg>
  );
}

function ClutchC() {
  return (
    <span className="font-display font-extrabold text-base text-[#FF3D2E]">C</span>
  );
}

function TrustpilotStar() {
  return (
    <svg viewBox="0 0 24 24" className="size-5" aria-hidden>
      <path fill="#00B67A" d="M12 2l2.9 6.9 7.1.6-5.4 4.7 1.6 7.3L12 17.8 5.8 21.5l1.6-7.3L2 9.5l7.1-.6L12 2z" />
    </svg>
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
            <p className="text-[10px] uppercase tracking-widest opacity-80">Today</p>
            <h3 className="font-display font-extrabold text-2xl leading-tight mt-1">
              Good morning, Alex
            </h3>
            <div className="mt-5 rounded-2xl bg-white/15 backdrop-blur-sm border border-white/20 p-3">
              <p className="text-[10px] opacity-80 uppercase tracking-wider">Active users</p>
              <p className="font-display font-extrabold text-3xl">3.2M</p>
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
                <p className="text-[9px] opacity-80 uppercase tracking-wider">Rating</p>
                <p className="font-display font-bold text-lg">4.9★</p>
              </div>
              <div className="rounded-xl bg-white/15 backdrop-blur-sm p-2.5 border border-white/20">
                <p className="text-[9px] opacity-80 uppercase tracking-wider">Uptime</p>
                <p className="font-display font-bold text-lg">99.9%</p>
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
          <p className="text-[9px] uppercase tracking-widest opacity-60">Analytics</p>
          <p className="font-display font-bold text-base mt-1">+248%</p>
          <p className="text-[9px] opacity-60">retention vs. baseline</p>
          <svg viewBox="0 0 100 50" className="mt-4 w-full text-sun" fill="none">
            <path d="M0 40 L20 32 L35 36 L55 18 L75 22 L100 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <path d="M0 40 L20 32 L35 36 L55 18 L75 22 L100 6 L100 50 L0 50 Z" fill="url(#g1)" opacity="0.35" />
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
    <section id="top" className="relative overflow-hidden px-6 pt-36 pb-24 lg:px-10">
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
            We engineer high-performance iOS and Android apps with a more cinematic, strategic, and
            conversion-focused product journey from idea to launch.
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
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 0.6 }}
            className="mt-10 flex flex-wrap items-center gap-3"
          >
            <ReviewBadge rating="4.9" source="Google" count="1,247 reviews" logo={<GoogleG />} />
            <ReviewBadge rating="4.8" source="Clutch" count="89 reviews" logo={<ClutchC />} />
            <ReviewBadge rating="4.9" source="Trustpilot" count="342 reviews" logo={<TrustpilotStar />} />
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
            <img
              src={digitalCity.url}
              alt="Connected digital ecosystem: apps, websites, AI, marketing and analytics"
              className="w-full h-full object-cover"
              loading="eager"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/40 via-transparent to-transparent" />
            <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-white">
              <p className="text-[10px] uppercase tracking-[0.25em] opacity-90">Connected ecosystem</p>
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-white/15 backdrop-blur">LIVE</span>
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
