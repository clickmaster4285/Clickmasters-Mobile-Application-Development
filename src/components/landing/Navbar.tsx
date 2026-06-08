import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Calendar } from "lucide-react";
import { useMagnetic } from "./motion";
import logo from "@/assets/logo-white.webp.asset.json";

const links = [
  { label: "Work", href: "#work" },
  { label: "Services", href: "#process" },
  { label: "Team", href: "#team" },
  { label: "Contact", href: "#contact" },
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
        className={`flex items-center gap-2 md:gap-6 rounded-full border transition-all duration-500 ${
          scrolled
            ? "bg-ink/90 border-white/10 backdrop-blur-xl shadow-[0_18px_60px_-20px_rgba(0,0,0,0.6)]"
            : "bg-ink/55 border-white/10 backdrop-blur-md"
        } px-3 py-2 md:pl-4 md:pr-2`}
      >
        <a href="#top" className="flex items-center pl-1 pr-2 md:pr-4">
          <img src={logo.url} alt="ClickMasters" className="h-6 md:h-7 w-auto" />
        </a>

        <ul className="hidden md:flex items-center gap-1 text-sm font-medium text-cream/80">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="relative px-3 py-1.5 rounded-full transition-colors hover:text-cream group"
              >
                <span className="relative z-10">{l.label}</span>
                <span className="absolute inset-0 rounded-full bg-white/0 group-hover:bg-white/10 transition-colors" />
              </a>
            </li>
          ))}
        </ul>

        <a
          ref={ctaRef as React.RefObject<HTMLAnchorElement>}
          href="#contact"
          className="hidden md:inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-electric to-hot-pink text-white px-4 py-2 text-sm font-semibold shadow-[0_10px_30px_-12px_rgba(255,71,127,0.55)] will-change-transform"
        >
          <Calendar className="size-4" />
          Book a Call
        </a>

        <button
          aria-label="Menu"
          className="md:hidden text-cream p-2"
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
              <motion.a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.06 }}
                className="block text-base font-semibold text-cream"
              >
                {l.label}
              </motion.a>
            ))}
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="block rounded-full bg-gradient-to-r from-electric to-hot-pink text-white px-5 py-3 text-center font-semibold"
            >
              Book a Call
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
