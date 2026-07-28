"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Calendar, ChevronDown, BookOpen, Briefcase, FileText, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useMagnetic } from "./motion";
import { allData, getCategoryForSlug } from "@/content/servicesDetail/index";
import { caseStudies } from "@/content/case-study";
import { blogs } from "@/content/blogs";
import { ebooks } from "@/content/ebooks";

const logo = "/assets/logo_white.webp";

type NavLink = { label: string; href: string };

const links: NavLink[] = [
  { label: "Solutions", href: "/solutions" },
  { label: "Services", href: "/services" },
  { label: "Case Studies", href: "/case-studies" },
  { label: "Blog", href: "/blog" },
  { label: "Ebooks", href: "/ebooks" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

// Define types for dropdown items
interface DropdownItem {
  id: string | number;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
}

interface DropdownContentProps {
  items: DropdownItem[];
  basePath: string;
  viewAllLink: string;
  icon?: React.ElementType;
}

function getCategoryLabel(key: string) {
  const names: Record<string, string> = {
    "ai-in-app-development": "AI Development",
    "android-development": "Android Development",
    "careers-salaries": "Careers & Salaries",
    "cost-pricing": "Cost & Pricing",
    "cross-platform-flutter-rn": "Cross-Platform (Flutter/RN)",
    "general-mobile-app-development": "Mobile Development",
    "hiring-agencies-money-pages": "Hiring & Agencies",
    "how-to-build-an-app": "How to Build an App",
    "industry-ecommerce": "E-Commerce",
    "industry-fintech": "FinTech",
    "industry-healthcare": "Healthcare",
    "ios-development": "iOS Development",
    "learning-courses": "Learning & Courses",
    "no-code-app-builders": "No-Code App Builders",
    "testing-qa-maintenance": "Testing & QA",
    "tools-frameworks-software": "Tools & Frameworks",
    "ui-ux-design": "UI/UX Design",
    "web-pwa-development": "Web & PWA Development",
  };

  return (
    names[key] ||
    key.replace(/[_-]/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())
  );
}

function formatTitle(title: string) {
  return title.replace(/ Complete 2026 Guide$/, "").replace(/:\s*/, ": ");
}

// Define types for service items
interface ServiceItem {
  slug: string;
  title: string;
  description: string;
  category: string;
}

interface CategoryItem {
  key: string;
  fileName: string;
  label: string;
  items: ServiceItem[];
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [caseStudiesDropdownOpen, setCaseStudiesDropdownOpen] = useState(false);
  const [blogDropdownOpen, setBlogDropdownOpen] = useState(false);
  const [ebooksDropdownOpen, setEbooksDropdownOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string>("");
  const ctaRef = useMagnetic(0.3);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const servicesButtonRef = useRef<HTMLDivElement>(null);
  const caseStudiesButtonRef = useRef<HTMLDivElement>(null);
  const blogButtonRef = useRef<HTMLDivElement>(null);
  const ebooksButtonRef = useRef<HTMLDivElement>(null);

  // Get categories with their items for dropdown
  const categories = useRef<CategoryItem[]>(
    Object.entries(allData).map(([key, items]) => ({
      key,
      fileName: key.replace(/_/g, "-"),
      label: getCategoryLabel(key),
      items: (items as { slug: string; metadata: any }[]).map((item) => ({
        slug: item.slug,
        title: formatTitle(item.metadata.title_tag || item.slug),
        description: item.metadata.meta_description || "",
        category: getCategoryForSlug(item.slug),
      })),
    })),
  ).current;

  // Get featured case studies for dropdown
  const featuredCaseStudies = caseStudies.filter(cs => cs.featured).slice(0, 4);
  const recentBlogs = blogs.slice(0, 4);
  const featuredEbooks = ebooks.filter(eb => eb.featured).slice(0, 4);

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

  // Close dropdowns when clicking outside
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

  // Determine dropdown background based on scroll state (solid, not transparent)
  const dropdownBg = scrolled ? "bg-[#0a0a0a]" : "bg-[#0a0a0a]";

  // Generic dropdown component with proper typing
  const DropdownContent = ({ 
    items, 
    basePath, 
    viewAllLink,
    icon: Icon 
  }: DropdownContentProps) => (
    <div className={`w-[380px] max-w-[92vw] ${dropdownBg} border border-white/10 rounded-3xl shadow-2xl overflow-hidden`}>
      <div className="p-4">
        <div className="flex items-center justify-between px-2 pb-3 border-b border-white/10">
          <p className="text-sm font-semibold text-cream">Featured</p>
        </div>
        <div className="mt-2 space-y-1 max-h-[340px] overflow-y-auto custom-scrollbar">
          {items.map((item) => (
            <Link
              key={item.id || item.slug}
              href={`${basePath}/${item.slug}`}
              className="block group rounded-2xl px-4 py-3 hover:bg-white/5 border border-transparent hover:border-white/10 transition-all duration-200"
            >
              <div className="flex items-start gap-3">
                {Icon && (
                  <div className="mt-0.5 p-1.5 rounded-lg bg-hot-pink/10 text-hot-pink group-hover:bg-hot-pink group-hover:text-white transition-colors">
                    <Icon className="size-4" />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-cream/90 group-hover:text-white transition-colors line-clamp-1">
                    {item.title}
                  </p>
                  {item.excerpt && (
                    <p className="mt-1 text-xs text-cream/50 line-clamp-2 leading-snug">
                      {item.excerpt}
                    </p>
                  )}
                  {item.category && (
                    <span className="mt-1.5 inline-block px-2 py-0.5 rounded-full bg-white/5 text-[10px] text-cream/40">
                      {item.category}
                    </span>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );

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
          <img src={logo} alt="ClickMasters" className="h-4 md:h-5 w-auto" />
        </Link>

        <ul className="hidden md:flex items-center justify-center flex-1 gap-6 text-md font-medium text-cream/80">
          {links.map((l) => {
            // Skip rendering links that have dropdowns
            if (l.label === "Services" || l.label === "Case Studies" || l.label === "Blog" || l.label === "Ebooks") return null;
            
            return (
              <li key={l.label}>
                <Link
                  href={l.href}
                  className="relative px-3 py-1.5 rounded-full transition-colors hover:text-cream group flex items-center gap-1.5"
                >
                  <span className="relative z-10">{l.label}</span>
                  <span className="absolute inset-0 rounded-full bg-white/0 group-hover:bg-white/10 transition-colors" />
                </Link>
              </li>
            );
          })}
          
          {/* Services Dropdown */}
          <li>
            <div
              ref={servicesButtonRef}
              className="relative"
              onMouseEnter={() => setServicesDropdownOpen(true)}
              onMouseLeave={() => {
                setTimeout(() => {
                  if (!dropdownRef.current?.matches(":hover")) {
                    setServicesDropdownOpen(false);
                    setActiveCategory("");
                  }
                }, 100);
              }}
            >
              <button
                onClick={() => setServicesDropdownOpen(!servicesDropdownOpen)}
                className="relative px-3 py-1.5 rounded-full transition-colors hover:text-cream group flex items-center gap-1"
              >
                <span className="relative z-10">Services</span>
                <ChevronDown
                  className={`size-3 transition-transform duration-200 ${
                    servicesDropdownOpen ? "rotate-180" : ""
                  }`}
                />
                <span className="absolute inset-0 rounded-full bg-white/0 group-hover:bg-white/10 transition-colors" />
              </button>

              <AnimatePresence>
                {servicesDropdownOpen && categories.length > 0 && (
                  <motion.div
                    ref={dropdownRef}
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className={`absolute left-1/2 -translate-x-1/2 top-full mt-3 
                     w-[720px] max-w-[92vw] h-[520px] 
                     ${dropdownBg} border border-white/10 
                     rounded-3xl shadow-2xl overflow-hidden z-50`}
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
                              <Link
                                key={category.key}
                                href={`/${category.key}`}
                                onMouseEnter={() =>
                                  setActiveCategory(category.key)
                                }
                                onClick={() => setActiveCategory(category.key)}
                                className={`block w-full rounded-2xl border px-4 py-3 text-left transition-all duration-200 ${
                                  isActive
                                    ? "border-hot-pink/40 bg-hot-pink/10 text-cream shadow-sm"
                                    : "border-transparent text-cream/70 hover:border-white/10 hover:bg-white/5 hover:text-cream"
                                }`}
                              >
                                <div className="text-sm font-medium">
                                  {category.label}
                                </div>
                                <div className="mt-0.5 text-[10px] text-cream/40">
                                  {category.items.length} guides
                                </div>
                              </Link>
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
                              href={`/${item.category}/${item.slug}`}
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
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </li>

          {/* Case Studies Dropdown */}
          <li>
            <div
              ref={caseStudiesButtonRef}
              className="relative"
              onMouseEnter={() => setCaseStudiesDropdownOpen(true)}
              onMouseLeave={() => {
                setTimeout(() => {
                  if (!caseStudiesButtonRef.current?.matches(":hover")) {
                    setCaseStudiesDropdownOpen(false);
                  }
                }, 100);
              }}
            >
              <Link
                href="/case-studies"
                className="relative px-3 py-1.5 rounded-full transition-colors hover:text-cream group flex items-center gap-1.5"
              >
                <span className="relative z-10">Case Studies</span>
                <ChevronDown
                  className={`size-3 transition-transform duration-200 ${
                    caseStudiesDropdownOpen ? "rotate-180" : ""
                  }`}
                />
                <span className="absolute inset-0 rounded-full bg-white/0 group-hover:bg-white/10 transition-colors" />
              </Link>

              <AnimatePresence>
                {caseStudiesDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className="absolute left-1/2 -translate-x-1/2 top-full mt-3 z-50"
                    onMouseEnter={() => setCaseStudiesDropdownOpen(true)}
                    onMouseLeave={() => setCaseStudiesDropdownOpen(false)}
                  >
                    <DropdownContent
                      items={featuredCaseStudies.map((cs): DropdownItem => ({
                        id: cs.id,
                        slug: cs.slug,
                        title: cs.title,
                        excerpt: cs.industry || "Case Study",
                        category: cs.industry
                      }))}
                      basePath="/case-studies"
                      viewAllLink="/case-studies"
                      icon={Briefcase}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </li>

          {/* Blog Dropdown */}
          <li>
            <div
              ref={blogButtonRef}
              className="relative"
              onMouseEnter={() => setBlogDropdownOpen(true)}
              onMouseLeave={() => {
                setTimeout(() => {
                  if (!blogButtonRef.current?.matches(":hover")) {
                    setBlogDropdownOpen(false);
                  }
                }, 100);
              }}
            >
              <Link
                href="/blog"
                className="relative px-3 py-1.5 rounded-full transition-colors hover:text-cream group flex items-center gap-1.5"
              >
                <span className="relative z-10">Blog</span>
                <ChevronDown
                  className={`size-3 transition-transform duration-200 ${
                    blogDropdownOpen ? "rotate-180" : ""
                  }`}
                />
                <span className="absolute inset-0 rounded-full bg-white/0 group-hover:bg-white/10 transition-colors" />
              </Link>

              <AnimatePresence>
                {blogDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className="absolute left-1/2 -translate-x-1/2 top-full mt-3 z-50"
                    onMouseEnter={() => setBlogDropdownOpen(true)}
                    onMouseLeave={() => setBlogDropdownOpen(false)}
                  >
                    <DropdownContent
                      items={recentBlogs.map((blog): DropdownItem => ({
                        id: blog.id,
                        slug: blog.slug,
                        title: blog.title,
                        excerpt: blog.category || "Blog Post",
                        category: blog.category || "Blog"
                      }))}
                      basePath="/blog"
                      viewAllLink="/blog"
                      icon={BookOpen}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </li>

          {/* Ebooks Dropdown */}
          <li>
            <div
              ref={ebooksButtonRef}
              className="relative"
              onMouseEnter={() => setEbooksDropdownOpen(true)}
              onMouseLeave={() => {
                setTimeout(() => {
                  if (!ebooksButtonRef.current?.matches(":hover")) {
                    setEbooksDropdownOpen(false);
                  }
                }, 100);
              }}
            >
              <Link
                href="/ebooks"
                className="relative px-3 py-1.5 rounded-full transition-colors hover:text-cream group flex items-center gap-1.5"
              >
                <span className="relative z-10">Ebooks</span>
                <ChevronDown
                  className={`size-3 transition-transform duration-200 ${
                    ebooksDropdownOpen ? "rotate-180" : ""
                  }`}
                />
                <span className="absolute inset-0 rounded-full bg-white/0 group-hover:bg-white/10 transition-colors" />
              </Link>

              <AnimatePresence>
                {ebooksDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className="absolute left-1/2 -translate-x-1/2 top-full mt-3 z-50"
                    onMouseEnter={() => setEbooksDropdownOpen(true)}
                    onMouseLeave={() => setEbooksDropdownOpen(false)}
                  >
                    <DropdownContent
                      items={featuredEbooks.map((ebook): DropdownItem => ({
                        id: ebook.id,
                        slug: ebook.slug,
                        title: ebook.title,
                        excerpt: ebook.category || "Ebook",
                        category: ebook.category
                      }))}
                      basePath="/ebooks"
                      viewAllLink="/ebooks"
                      icon={FileText}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </li>
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