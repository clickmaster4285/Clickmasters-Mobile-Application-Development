"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Zap } from "lucide-react";

function ParticleSystem() {
  const particles = Array.from({ length: 80 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 1,
    color: Math.random() > 0.7 ? "#FF007F" : "#00E5FF",
    duration: Math.random() * 2 + 1,
    delay: Math.random() * 1.5,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <motion.span
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            background: p.color,
            boxShadow: `0 0 ${p.size * 4}px ${p.color}`,
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0, 1.4, 0],
            x: [0, (p.x - 50) * 2],
            y: [0, (p.y - 50) * 2],
          }}
          transition={{
            duration: p.duration + 1.5,
            delay: p.delay,
            ease: "easeOut",
          }}
        />
      ))}
    </div>
  );
}

function GlowRings() {
  const rings = [0, 1, 2, 3];
  return (
    <div className="absolute inset-0 grid place-items-center pointer-events-none">
      {rings.map((i) => (
        <motion.span
          key={i}
          className="absolute rounded-full border"
          style={{
            borderColor: i % 2 === 0 ? "#00E5FF" : "#FF007F",
          }}
          initial={{ width: 0, height: 0, opacity: 0.8 }}
          animate={{ width: 1400, height: 1400, opacity: 0 }}
          transition={{ duration: 3, delay: 0.4 + i * 0.4, ease: "easeOut" }}
        />
      ))}
    </div>
  );
}

export function CinematicEntry({ onComplete }: { onComplete?: () => void }) {
  const [show, setShow] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(true);
    const seen = sessionStorage.getItem("clickmasters_entry_seen");
    const reduce = window.matchMedia?.(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (seen || reduce) {
      onComplete?.();
      return;
    }
    sessionStorage.setItem("clickmasters_entry_seen", "true");
    setShow(true);
    document.body.style.overflow = "hidden";
    const t = setTimeout(() => {
      setShow(false);
      document.body.style.overflow = "";
      onComplete?.();
    }, 4000);
    return () => {
      clearTimeout(t);
      document.body.style.overflow = "";
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!ready) return null;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="cinematic"
          className="fixed inset-0 z-[100] grid place-items-center overflow-hidden"
          style={{
            background:
              "radial-gradient(ellipse at center, #0A0A0F 0%, #000000 70%)",
          }}
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            transition: { duration: 0.5, ease: "easeInOut" },
          }}
        >
          <ParticleSystem />
          <GlowRings />

          {/* Light sweep */}
          <motion.div
            aria-hidden
            className="absolute inset-y-0 -left-1/3 w-1/3 pointer-events-none"
            style={{
              background:
                "linear-gradient(120deg, transparent 0%, rgba(0,229,255,0.18) 50%, transparent 100%)",
              filter: "blur(20px)",
            }}
            initial={{ x: 0, opacity: 0 }}
            animate={{ x: "400%", opacity: [0, 1, 0] }}
            transition={{ duration: 1.4, delay: 2.0, ease: "easeInOut" }}
          />

          {/* Corner logo */}
          <motion.div
            className="absolute top-6 left-6 flex items-center gap-2 text-white"
            initial={{ opacity: 0, scale: 0, rotate: -180 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.7, delay: 0.8, ease: "easeOut" }}
          >
            <Zap className="size-5 text-[#00E5FF]" fill="#00E5FF" />
            <span className="font-display font-bold tracking-tight text-sm">
              CLICKMASTERS
            </span>
          </motion.div>

          {/* Content */}
          <div className="relative z-10 text-center px-6">
            <motion.p
              className="text-white/80 uppercase"
              style={{
                letterSpacing: "0.25em",
                fontSize: "clamp(14px, 2vw, 24px)",
              }}
              initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
              animate={{ opacity: 0.8, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              WELCOME TO
            </motion.p>

            <motion.h1
              className="relative font-display font-extrabold text-white mt-4"
              style={{
                fontSize: "clamp(44px, 8vw, 72px)",
                letterSpacing: "-0.02em",
                lineHeight: 1,
              }}
              initial={{ opacity: 0, scale: 0.9, filter: "blur(8px)" }}
              animate={{
                opacity: 1,
                scale: 1,
                filter: "blur(0px)",
                textShadow: [
                  "0 0 0px #00E5FF",
                  "0 0 40px #00E5FF",
                  "0 0 12px #00E5FF",
                ],
              }}
              transition={{
                duration: 0.9,
                delay: 1.0,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
            >
              CLICKMASTERS
            </motion.h1>

            <motion.div
              className="mt-6 inline-block relative"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 1.8 }}
            >
              <p
                className="text-[#A0A0B0] uppercase"
                style={{
                  letterSpacing: "0.18em",
                  fontSize: "clamp(13px, 1.5vw, 20px)",
                }}
              >
                WHERE YOUR JOURNEY BEGINS
              </p>
              <motion.span
                className="block h-px bg-[#00E5FF] mt-2 mx-auto"
                style={{ boxShadow: "0 0 12px #00E5FF" }}
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 0.7, delay: 2.2, ease: "easeInOut" }}
              />
            </motion.div>

            <motion.p
              className="mt-6 italic"
              style={{
                color: "#00E5FF",
                fontSize: "clamp(13px, 1.2vw, 16px)",
              }}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: [0, 1, 0.85], scale: [0.95, 1.02, 1] }}
              transition={{ duration: 1.0, delay: 2.5, ease: "easeOut" }}
            >
              BEYOND THE CODE — BEYOND THE ORDINARY
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
