import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight, type LucideIcon } from "lucide-react";
import * as Icons from "lucide-react";
import { services } from "@/data/services";
import { RevealText } from "./motion";

function getIcon(name: string): LucideIcon {
  const lib = Icons as unknown as Record<string, LucideIcon>;
  return lib[name] ?? Icons.Code;
}

export function ServicesSection() {
  return (
    <section id="services" className="relative px-6 lg:px-10 py-28 bg-cream">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="font-script text-3xl text-hot-pink -rotate-2">what we build</p>
          <RevealText className="mt-3 font-display font-extrabold text-4xl md:text-5xl text-ink leading-tight">
            Services that drive digital growth
          </RevealText>
          <p className="mt-5 text-ink/65 leading-relaxed">
            End-to-end mobile development expertise — from concept to launch and beyond.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => {
            const Icon = getIcon(service.icon);
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.55, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
              >
                <Link
                  to="/services/$slug"
                  params={{ slug: service.slug }}
                  className="group relative block h-full rounded-3xl border border-ink/10 bg-white p-7 transition-all duration-500 hover:-translate-y-1 hover:border-ink/20 hover:shadow-[0_30px_70px_-30px_rgba(0,0,0,0.35)] overflow-hidden"
                >
                  <div className="absolute inset-x-0 -top-px h-1 bg-gradient-to-r from-electric via-hot-pink to-sun opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="size-14 rounded-2xl bg-gradient-to-br from-electric/10 to-hot-pink/10 grid place-items-center text-ink group-hover:from-electric group-hover:to-hot-pink group-hover:text-white transition-all duration-500">
                    <Icon className="size-7" />
                  </div>
                  <h3 className="mt-5 font-display font-bold text-xl text-ink">{service.title}</h3>
                  <p className="mt-2 text-sm text-ink/65 leading-relaxed">{service.shortDescription}</p>

                  <div className="mt-5 flex flex-wrap gap-1.5">
                    {service.technologies.slice(0, 3).map((t) => (
                      <span
                        key={t}
                        className="text-[11px] font-semibold uppercase tracking-wider rounded-full bg-ink/5 text-ink/70 px-2.5 py-1"
                      >
                        {t}
                      </span>
                    ))}
                    {service.technologies.length > 3 && (
                      <span className="text-[11px] font-semibold uppercase tracking-wider rounded-full bg-ink/5 text-ink/50 px-2.5 py-1">
                        +{service.technologies.length - 3}
                      </span>
                    )}
                  </div>

                  <div className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-hot-pink">
                    Learn more
                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-14 text-center">
          <Link
            to="/services"
            className="inline-flex items-center gap-2 rounded-full bg-ink text-cream px-7 py-4 font-semibold transition-transform hover:-translate-y-0.5"
          >
            View all services
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
