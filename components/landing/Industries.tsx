"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Landmark,
  HeartPulse,
  Users,
  ShoppingBag,
  Truck,
  Building2,
} from "lucide-react";

const industries = [
  {
    name: "Banking apps",
    href: "/industry-fintech/mobile-banking-apps",
    icon: Landmark,
    color: "bg-hot-pink text-cream",
  },
  {
    name: "Medical apps",
    href: "/industry-healthcare/medical-mobile-app-development",
    icon: HeartPulse,
    color: "bg-electric text-cream",
  },
  {
    name: "How to build",
    href: "/how-to-build-an-app",
    icon: Users,
    color: "bg-sun text-ink",
  },
  {
    name: "Grocery delivery",
    href: "/industry-ecommerce/grocery-delivery-app",
    icon: ShoppingBag,
    color: "bg-ink text-cream",
  },
  {
    name: "Local delivery",
    href: "/industry-ecommerce/delivery-app",
    icon: Truck,
    color: "bg-cream text-ink border-2 border-ink",
  },
  {
    name: "All solutions",
    href: "/solutions",
    icon: Building2,
    color: "bg-hot-pink/10 text-ink border-2 border-hot-pink",
  },
];

export function Industries() {
  return (
    <section id="industries" className="px-6 lg:px-10 py-24 bg-cream">
      <div className="max-w-[85vw] mx-auto">
        <div className="mb-14 max-w-2xl">
          <p className="font-script text-3xl text-hot-pink">industries</p>
          <h3 className="font-display font-extrabold text-4xl md:text-5xl text-ink">
            we serve
          </h3>
          <p className="mt-4 text-ink/70">
            These links go to mobile-app guides. They describe the product
            decisions for that industry. They are not case studies.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {industries.map((it, i) => (
            <motion.div
              key={it.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
            >
              <Link
                href={it.href}
                className={`${it.color} block rounded-2xl p-8 hover:-translate-y-1 transition-transform`}
              >
                <it.icon className="size-8" />
                <h3 className="mt-6 font-display font-extrabold text-2xl">
                  {it.name}
                </h3>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
