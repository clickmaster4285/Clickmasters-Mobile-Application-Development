"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";
import Link from "next/link";
import { getChildren, getHubs } from "@/content/guides";
import { useCmsNav } from "@/components/cms/CmsNavContext";

const logo = "/assets/logo_white.webp";

const links = [
  { label: "Solutions", href: "/solutions" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const hubs = getHubs();
  // ERP header items are additive: appended after the site's own links,
  // skipping any whose URL the site already links to.
  const cmsLinks = useCmsNav().header.filter(
    (g) => g.href !== "/services" && !links.some((l) => l.href === g.href),
  );

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
        className={`flex items-center gap-2 md:gap-6 rounded-full border transition-all duration-500 md:min-w-[85vw] ${
          scrolled
            ? "bg-ink/90 border-white/10 backdrop-blur-xl shadow-[0_18px_60px_-20px_rgba(0,0,0,0.6)]"
            : "bg-ink/55 border-white/10 backdrop-blur-md"
        } px-3 py-2 md:pl-6 md:pr-3 md:py-3`}
      >
        <Link href="/" className="flex items-center pl-1 pr-2 md:pr-4">
          <img src={logo} alt="ClickMasters" className="h-4 md:h-5 w-auto" />
        </Link>

        <ul className="hidden md:flex items-center justify-center flex-1 gap-5 text-sm font-medium text-cream/80">
          <li
            className="relative"
            onMouseEnter={() => setServicesOpen(true)}
            onMouseLeave={() => setServicesOpen(false)}
          >
            <Link
              href="/services"
              className="relative px-3 py-1.5 rounded-full hover:text-cream inline-flex items-center gap-1"
            >
              Services
              <ChevronDown
                className={`size-3 transition-transform ${servicesOpen ? "rotate-180" : ""}`}
              />
            </Link>
            <AnimatePresence>
              {servicesOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  className="absolute left-0 top-full z-50 mt-3 w-[420px] rounded-3xl border border-white/10 bg-[#0a0a0a] p-4 shadow-2xl"
                >
                  <div className="grid gap-1">
                    {hubs.map((hub) => (
                      <Link
                        key={hub.path}
                        href={hub.path}
                        className="rounded-2xl px-3 py-2 hover:bg-white/5"
                      >
                        <p className="text-sm font-semibold text-cream">
                          {hub.h1}
                        </p>
                        <p className="text-xs text-cream/50">
                          {getChildren(hub.path).length} guides
                        </p>
                      </Link>
                    ))}
                    <Link
                      href="/solutions"
                      className="rounded-2xl px-3 py-2 hover:bg-white/5"
                    >
                      <p className="text-sm font-semibold text-cream">
                        Industry apps
                      </p>
                      <p className="text-xs text-cream/50">
                        Healthcare, banking, delivery
                      </p>
                    </Link>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </li>
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="px-3 py-1.5 rounded-full hover:text-cream"
              >
                {link.label}
              </Link>
            </li>
          ))}

          {/* ERP CMS header navigation (empty unless set in the ERP) */}
          {cmsLinks.map((g) => (
            <li key={`cms-${g.href}-${g.label}`} className="relative group/cms">
              <a
                href={g.href}
                {...(g.target
                  ? { target: g.target, rel: "noopener noreferrer" }
                  : {})}
                className="relative px-3 py-1.5 rounded-full transition-colors hover:text-cream flex items-center gap-1.5"
              >
                <span className="relative z-10">{g.label}</span>
                {g.items.length > 0 && <ChevronDown className="size-3.5" />}
              </a>
              {g.items.length > 0 && (
                <div className="invisible absolute left-0 top-full pt-3 opacity-0 transition-opacity group-hover/cms:visible group-hover/cms:opacity-100">
                  <div className="min-w-[220px] rounded-2xl border border-white/10 bg-[#0a0a0a] p-2 shadow-2xl">
                    {g.items.map((c) => (
                      <a
                        key={`${c.href}-${c.label}`}
                        href={c.href}
                        {...(c.target
                          ? { target: c.target, rel: "noopener noreferrer" }
                          : {})}
                        className="block rounded-xl px-4 py-2 text-sm text-cream/80 hover:bg-white/5 hover:text-white"
                      >
                        {c.label}
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>

        <Link
          href="/contact"
          className="hidden md:inline-flex rounded-full bg-hot-pink px-5 py-2 text-sm font-semibold text-white"
        >
          Get in touch
        </Link>

        <button
          type="button"
          className="ml-auto md:hidden text-cream p-2"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="absolute top-16 inset-x-4 rounded-3xl border border-white/10 bg-[#0a0a0a] p-4 md:hidden"
          >
            <div className="grid gap-1">
              <Link
                href="/services"
                onClick={() => setOpen(false)}
                className="rounded-2xl px-3 py-3 text-cream"
              >
                All services
              </Link>
              {hubs.map((hub) => (
                <Link
                  key={hub.path}
                  href={hub.path}
                  onClick={() => setOpen(false)}
                  className="rounded-2xl px-3 py-3 text-cream/80"
                >
                  {hub.h1}
                </Link>
              ))}
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="rounded-2xl px-3 py-3 text-cream"
                >
                  {link.label}
                </Link>
              ))}
              {cmsLinks
                .flatMap((g) => [g, ...g.items])
                .map((l) => (
                  <a
                    key={`cms-m-${l.href}-${l.label}`}
                    href={l.href}
                    {...(l.target
                      ? { target: l.target, rel: "noopener noreferrer" }
                      : {})}
                    onClick={() => setOpen(false)}
                    className="rounded-2xl px-3 py-3 text-cream"
                  >
                    {l.label}
                  </a>
                ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
