"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Calendar, ChevronDown } from "lucide-react";
import Link from "next/link";
import { useMagnetic } from "./motion";
import { allData } from "@/content/servicesDetail/index";

const logo = "/assets/logo_white.webp";

type NavLink = { label: string; href: string };

const links: NavLink[] = [
  { label: "Solutions", href: "/solutions" },
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

function getCategoryLabel(key: string) {
  const names: Record<string, string> = {
    ai_in_app_development: "AI Development",
    android_development: "Android Development",
    careers_salaries: "Careers & Salaries",
    cost_pricing: "Cost & Pricing",
    cross_platform_flutter_rn: "Cross-Platform (Flutter/RN)",
    general_mobile_app_development: "Mobile Development",
    hiring_agencies_money_pages: "Hiring & Agencies",
    how_to_build_an_app: "How to Build an App",
    industry_ecommerce: "E-Commerce",
    industry_fintech: "FinTech",
    industry_healthcare: "Healthcare",
    ios_development: "iOS Development",
    learning_courses: "Learning & Courses",
    no_code_app_builders: "No-Code App Builders",
    testing_qa_maintenance: "Testing & QA",
    tools_frameworks_software: "Tools & Frameworks",
    ui_ux_design: "UI/UX Design",
    web_pwa_development: "Web & PWA Development",
  };

  return (
    names[key] ||
    key.replace(/_/g, "-").replace(/\b\w/g, (l) => l.toUpperCase())
  );
}

function formatTitle(title: string) {
  return title.replace(/ Complete 2026 Guide$/, "").replace(/:\s*/, ": ");
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string>("");
  const ctaRef = useMagnetic(0.3);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const servicesButtonRef = useRef<HTMLDivElement>(null);

  // Get categories with their items for dropdown
  const categories = useRef(
    Object.entries(allData).map(([key, items]) => ({
      key,
      fileName: key.replace(/_/g, "-"),
      label: getCategoryLabel(key),
      items: (items as { slug: string; metadata: any }[]).map((item) => ({
        slug: item.slug,
        title: formatTitle(item.metadata.title_tag || item.slug),
        description: item.metadata.meta_description || "",
      })),
    })),
  ).current;

  // Set first category as active when dropdown opens
  useEffect(() => {
    if (servicesDropdownOpen && categories.length > 0 && !activeCategory) {
      setActiveCategory(categories[0].key);
    }
  }, [servicesDropdownOpen, categories, activeCategory]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        servicesButtonRef.current &&
        !servicesButtonRef.current.contains(event.target as Node)
      ) {
        setServicesDropdownOpen(false);
        setActiveCategory("");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedCategory =
    categories.find((category) => category.key === activeCategory) ||
    categories[0];

  return (
    <motion.header
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
      className="fixed top-4 inset-x-0 z-50 flex justify-center px-4"
    >
      <nav
        className={`flex items-center gap-2 md:gap-8 rounded-full border transition-all duration-500 md:min-w-[85vw] ${
          scrolled
            ? "bg-ink/90 border-white/10 backdrop-blur-xl shadow-[0_18px_60px_-20px_rgba(0,0,0,0.6)]"
            : "bg-ink/55 border-white/10 backdrop-blur-md"
        } px-3 py-2 md:pl-6 md:pr-3 md:py-3`}
      >
        <Link href="/" className="flex items-center pl-1 pr-2 md:pr-4">
          <img src={logo} alt="ClickMasters" className="h-6 md:h-7 w-auto" />
        </Link>

        <ul className="hidden md:flex items-center gap-12 ext-sm font-medium text-cream/80 md:ml-auto">
          {links.map((l) => (
            <li key={l.label}>
              {l.label === "Services" ? (
                <div
                  ref={servicesButtonRef}
                  className="relative"
                  onMouseEnter={() => setServicesDropdownOpen(true)}
                  onMouseLeave={() => {
                    // Small delay to allow mouse to enter dropdown
                    setTimeout(() => {
                      if (!dropdownRef.current?.matches(":hover")) {
                        setServicesDropdownOpen(false);
                        setActiveCategory("");
                      }
                    }, 100);
                  }}
                >
                  <button
                    onClick={() =>
                      setServicesDropdownOpen(!servicesDropdownOpen)
                    }
                    className="relative px-3 py-1.5 rounded-full transition-colors hover:text-cream group flex items-center gap-1"
                  >
                    <span className="relative z-10">{l.label}</span>
                    <ChevronDown
                      className={`size-3 transition-transform duration-200 ${
                        servicesDropdownOpen ? "rotate-180" : ""
                      }`}
                    />
                    <span className="absolute inset-0 rounded-full bg-white/0 group-hover:bg-white/10 transition-colors" />
                  </button>

                  {/* Inside the Services button div */}
                  <AnimatePresence>
                    {servicesDropdownOpen && categories.length > 0 && (
                      <motion.div
                        ref={dropdownRef}
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.15 }}
                        className="absolute left-1/2 -translate-x-1/2 top-full mt-3 
                 w-[720px] max-w-[92vw] h-[520px] 
                 bg-ink/95 backdrop-blur-xl border border-white/10 
                 rounded-3xl shadow-2xl overflow-hidden z-50"
                        onMouseEnter={() => setServicesDropdownOpen(true)}
                        onMouseLeave={() => {
                          setServicesDropdownOpen(false);
                          setActiveCategory("");
                        }}
                      >
                        <div className="grid h-full grid-cols-[minmax(220px,260px)_1fr] gap-4 p-5">
                          {/* Categories Sidebar */}
                          <aside className="rounded-2xl border border-white/10 bg-white/5 p-3 overflow-y-auto custom-scrollbar">
                            <p className="text-[10px] font-semibold uppercase tracking-[0.5px] text-cream/40 px-2 pb-3">
                              CATEGORIES
                            </p>
                            <div className="space-y-1 pr-2">
                              {categories.map((category) => {
                                const isActive =
                                  category.key === selectedCategory?.key;
                                return (
                                  <button
                                    key={category.key}
                                    type="button"
                                    onClick={() =>
                                      setActiveCategory(category.key)
                                    }
                                    onMouseEnter={() =>
                                      setActiveCategory(category.key)
                                    }
                                    className={`w-full rounded-2xl border px-4 py-3 text-left transition-all duration-200 ${
                                      isActive
                                        ? "border-hot-pink/40 bg-hot-pink/10 text-cream shadow-sm"
                                        : "border-transparent text-cream/70 hover:border-white/10 hover:bg-white/5 hover:text-cream"
                                    }`}
                                  >
                                    <div className="text-sm font-medium">
                                      {category.label}
                                    </div>
                                    <div className="text-[10px] text-cream/40 mt-0.5">
                                      {category.items.length} guides
                                    </div>
                                  </button>
                                );
                              })}
                            </div>
                          </aside>

                          {/* Guides List */}
                          <div className="flex flex-col rounded-2xl border border-white/10 bg-white/5 overflow-hidden">
                            <div className="flex items-center justify-between px-4 pt-4 pb-3 border-b border-white/10">
                              <p className="text-sm font-semibold text-cream">
                                {selectedCategory?.label || "Guides"}
                              </p>
                              <p className="text-xs text-cream/40">
                                {selectedCategory?.items.length || 0} articles
                              </p>
                            </div>

                            <div className="flex-1 overflow-y-auto custom-scrollbar p-3 space-y-1">
                              {selectedCategory?.items.map((item) => (
                                <Link
                                  key={item.slug}
                                  href={`/services/${item.slug}`}
                                  onClick={() => {
                                    setServicesDropdownOpen(false);
                                    setActiveCategory("");
                                  }}
                                  className="block group rounded-2xl px-4 py-3.5 hover:bg-white/5 border border-transparent hover:border-white/10 transition-all duration-200"
                                >
                                  <p className="text-sm font-medium text-cream/90 group-hover:text-white transition-colors">
                                    {item.title}
                                  </p>
                                  {item.description && (
                                    <p className="mt-1.5 text-xs text-cream/50 line-clamp-2 leading-snug">
                                      {item.description}
                                    </p>
                                  )}
                                </Link>
                              ))}

                              {selectedCategory?.items.length === 0 && (
                                <div className="p-8 text-center text-cream/40">
                                  No guides available in this category
                                </div>
                              )}
                            </div>

                            <div className="p-4 border-t border-white/10">
                              <Link
                                href="/services"
                                onClick={() => {
                                  setServicesDropdownOpen(false);
                                  setActiveCategory("");
                                }}
                                className="block text-center text-sm py-2.5 text-cream/60 hover:text-cream transition-colors hover:bg-white/5 rounded-2xl"
                              >
                                View All Services →
                              </Link>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <Link
                  href={l.href}
                  className="relative px-3 py-1.5 rounded-full transition-colors hover:text-cream group"
                >
                  <span className="relative z-10">{l.label}</span>
                  <span className="absolute inset-0 rounded-full bg-white/0 group-hover:bg-white/10 transition-colors" />
                </Link>
              )}
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

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 5px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.25);
          border-radius: 20px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.4);
        }
      `}</style>
    </motion.header>
  );
}
