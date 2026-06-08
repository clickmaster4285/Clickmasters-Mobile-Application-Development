"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Calendar } from "lucide-react";
import Link from "next/link";
import { useMagnetic } from "./motion";

const logo = "/assets/logo_white.webp";

type NavLink = { label: string; href: string };

const links: NavLink[] = [
  { label: "Solutions", href: "/solutions" },
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const ctaRef = useMagnetic(0.3);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
      className="fixed top-4 inset-x-0 z-50 flex justify-center px-4"
    >
      <nav
        className={`flex items-center gap-2 md:gap-8 rounded-full border transition-all duration-500 md:min-w-[560px] ${
          scrolled
            ? "bg-ink/90 border-white/10 backdrop-blur-xl shadow-[0_18px_60px_-20px_rgba(0,0,0,0.6)]"
            : "bg-ink/55 border-white/10 backdrop-blur-md"
        } px-3 py-2 md:pl-6 md:pr-3 md:py-3`}
      >
        <Link href="/" className="flex items-center pl-1 pr-2 md:pr-4">
          <img src={logo} alt="ClickMasters" className="h-6 md:h-7 w-auto" />
        </Link>

        <ul className="hidden md:flex items-center gap-1 text-sm font-medium text-cream/80 md:ml-auto">
          {links.map((l) => (
            <li key={l.label}>
              <Link
                href={l.href}
                className="relative px-3 py-1.5 rounded-full transition-colors hover:text-cream group"
              >
                <span className="relative z-10">{l.label}</span>
                <span className="absolute inset-0 rounded-full bg-white/0 group-hover:bg-white/10 transition-colors" />
              </Link>
            </li>
          ))}
        </ul>

        <Link
          ref={ctaRef as React.RefObject<HTMLAnchorElement>}
          href="/contact"
          className="hidden md:inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-electric to-hot-pink text-white px-4 py-2 text-sm font-semibold shadow-[0_10px_30px_-12px_rgba(255,71,127,0.55)] will-change-transform"
        >
          <Calendar className="size-4" />
          Book a Call
        </Link>

        <button
          aria-label="Menu"
          className="md:hidden text-cream p-2 ml-auto"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden absolute top-full mt-3 inset-x-4 bg-ink/95 backdrop-blur-xl border border-white/10 rounded-2xl px-6 py-6 space-y-3 shadow-2xl"
          >
            {links.map((l, i) => (
              <motion.div
                key={l.label}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.06 }}
              >
                <Link
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block text-base font-semibold text-cream"
                >
                  {l.label}
                </Link>
              </motion.div>
            ))}
            <Link
              href="/contact"
              onClick={() => setOpen(false)}
              className="block rounded-full bg-gradient-to-r from-electric to-hot-pink text-white px-5 py-3 text-center font-semibold"
            >
              Book a Call
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
