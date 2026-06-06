import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, Menu, X } from "lucide-react";
import { useMagnetic } from "./motion";
import { Sparkle } from "./decor";

const links = [
  { label: "Work", href: "#work" },
  { label: "Services", href: "#process" },
  { label: "Team", href: "#team" },
  { label: "Contact", href: "#contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const ctaRef = useMagnetic(0.35);
  const waRef = useMagnetic(0.4);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-cream/85 backdrop-blur-xl border-b border-ink/10 shadow-[0_8px_30px_-12px_rgba(0,0,0,0.12)]"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 lg:px-10 h-16 flex items-center justify-between">
        <a href="#top" className="relative font-display font-extrabold tracking-tight text-ink text-xl group">
          <Sparkle className="absolute -top-3 -right-5 size-3 opacity-0 group-hover:opacity-100 transition-opacity" />
          CLICK<span className="text-hot-pink">MASTERS</span>
        </a>

        <ul className="hidden md:flex items-center gap-1 text-sm font-medium text-ink/80">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="relative px-4 py-2 rounded-full transition-colors hover:text-ink group"
              >
                <span className="relative z-10">{l.label}</span>
                <span className="absolute inset-0 rounded-full bg-sun/0 group-hover:bg-sun/70 transition-colors duration-300" />
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden md:flex items-center gap-3">
          <a
            ref={waRef as React.RefObject<HTMLAnchorElement>}
            href="https://wa.me/13252024074"
            aria-label="WhatsApp"
            className="size-10 grid place-items-center rounded-full bg-whatsapp text-white shadow-[0_8px_20px_-6px_rgba(37,211,102,0.55)] will-change-transform"
          >
            <MessageCircle className="size-5" />
          </a>
          <a
            ref={ctaRef as React.RefObject<HTMLAnchorElement>}
            href="#contact"
            className="relative rounded-full bg-ink text-cream px-5 py-2.5 text-sm font-semibold overflow-hidden group will-change-transform shadow-[0_10px_30px_-12px_rgba(0,0,0,0.5)]"
          >
            <span className="relative z-10">Book a Call</span>
            <span className="absolute inset-0 bg-hot-pink translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
          </a>
        </div>

        <button
          aria-label="Menu"
          className="md:hidden text-ink"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X /> : <Menu />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden bg-cream border-t border-border px-6 py-6 space-y-4"
          >
            {links.map((l, i) => (
              <motion.a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.06 }}
                className="block text-lg font-semibold text-ink"
              >
                {l.label}
              </motion.a>
            ))}
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="block rounded-full bg-hot-pink text-white px-5 py-3 text-center font-semibold"
            >
              Book a Call
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
