"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Github, Linkedin, Sparkles } from "lucide-react";
import { DecorativeLayer, DoodleCircle, Drift, DottedTrail, PaperAirplane, Sparkle, Squiggle, ZigZag } from "@/components/landing/decor";
import { MouseParallax, RevealText, ScrollFloat } from "@/components/landing/motion";

const team = [
  {
    name: "Alex Morgan",
    role: "Lead iOS Engineer",
    bio: "Builds elegant iOS experiences with fast, scalable architecture and ruthless polish.",
    photo: "/assets/team/alex-morgan.png",
    accent: "bg-sun",
    doodle: "electric" as const,
  },
  {
    name: "Priya Patel",
    role: "Head of Design",
    bio: "Turns complex flows into memorable interfaces that feel premium from the first tap.",
    photo: "/assets/team/priya-patel.png",
    accent: "bg-hot-pink",
    doodle: "pink" as const,
  },
  {
    name: "Mia Tanaka",
    role: "Product Strategist",
    bio: "Connects market insight, roadmap clarity, and launch momentum for ambitious teams.",
    photo: "/assets/team/mia-tanaka.jpeg",
    accent: "bg-electric",
    doodle: "sun" as const,
  },
  {
    name: "Jonas Lind",
    role: "Engineering Director",
    bio: "Leads delivery with calm systems thinking, technical rigor, and enterprise-grade execution.",
    photo: "/assets/team/jonas-lind.jpeg",
    accent: "bg-whatsapp",
    doodle: "electric" as const,
  },
];

export function Team() {
  return (
    <section id="team" className="relative overflow-hidden px-6 lg:px-10 py-24 bg-cream border-t border-border">
      <DecorativeLayer>
        <ScrollFloat className="absolute -top-6 left-[6%] h-32 w-32 text-electric/35" yRange={[-18, 30]}>
          <DoodleCircle className="h-full w-full" />
        </ScrollFloat>
        <ScrollFloat className="absolute top-20 right-[10%] h-28 w-28 text-hot-pink/40" yRange={[18, -28]}>
          <DoodleCircle className="h-full w-full" tone="pink" />
        </ScrollFloat>
        <MouseParallax className="absolute left-[8%] top-44 h-20 w-20 opacity-70" strength={10}>
          <Sparkle className="h-full w-full" />
        </MouseParallax>
        <ScrollFloat className="absolute right-[8%] bottom-12 h-36 w-36 opacity-60" yRange={[-12, 22]}>
          <PaperAirplane className="h-full w-full" />
        </ScrollFloat>
        <Drift className="absolute left-1/2 top-10 h-12 w-40 -translate-x-1/2 opacity-50" delay={0.4}>
          <Squiggle className="h-full w-full" />
        </Drift>
      </DecorativeLayer>

      <div className="relative max-w-7xl mx-auto">
        <div className="max-w-3xl">
          <p className="font-script text-4xl text-hot-pink">Meet the</p>
          <RevealText className="mt-2 font-display font-extrabold text-4xl md:text-6xl leading-[0.95]">
            wolves behind the wins
          </RevealText>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink/70">
            The ClickMasters core team blends product strategy, brand-sensitive design, and senior mobile execution so every milestone feels lighter, faster, and sharper.
          </p>
        </div>

        <div className="relative mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-[repeat(4,minmax(0,1fr))_1.1fr]">
          {team.map((member, index) => (
            <motion.article
              key={member.name}
              initial={{ opacity: 0, y: 36, filter: "blur(10px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.55, delay: index * 0.08 }}
              className="group relative min-h-[34rem] overflow-hidden rounded-[30px] border border-ink/10 bg-white shadow-[0_24px_80px_-40px_color-mix(in_oklab,var(--color-ink)_30%,transparent)]"
            >
              <div className="relative aspect-[4/4.8] overflow-hidden bg-muted">
                <img
                  src={member.photo}
                  alt={`${member.name}, ${member.role}`}
                  loading="lazy"
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.05]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/28 via-transparent to-transparent" />
                <div className="absolute -left-3 -top-3 h-28 w-28 opacity-75">
                  <DoodleCircle className="h-full w-full" tone={member.doodle} />
                </div>
                <div className="absolute bottom-4 right-4 h-12 w-28 opacity-70">
                  <ZigZag className="h-full w-full" tone={member.doodle} />
                </div>
              </div>

              <div className="flex flex-1 flex-col p-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-display text-2xl font-extrabold text-ink">{member.name}</h3>
                    <p className="mt-1 text-sm font-medium text-ink/55">{member.role}</p>
                  </div>
                  <span className={`${member.accent} mt-1 inline-flex h-10 w-10 items-center justify-center rounded-full text-cream shadow-sm`}>
                    <Sparkles className="size-4" />
                  </span>
                </div>

                <p className="mt-4 text-sm leading-6 text-ink/70">{member.bio}</p>

                <div className="mt-5 flex items-center gap-2 text-ink/70">
                  <a href="#contact" aria-label={`View ${member.name} on LinkedIn`} className="rounded-full border border-ink/10 p-2 transition hover:border-hot-pink hover:text-hot-pink">
                    <Linkedin className="size-4" />
                  </a>
                  <a href="#contact" aria-label={`View ${member.name} on GitHub`} className="rounded-full border border-ink/10 p-2 transition hover:border-electric hover:text-electric">
                    <Github className="size-4" />
                  </a>
                </div>

                <a href="#contact" className="mt-auto inline-flex items-center gap-2 pt-6 text-sm font-semibold text-ink story-link">
                  Book a strategy session <ArrowUpRight className="size-4" />
                </a>
              </div>
            </motion.article>
          ))}

          <motion.a
            href="#contact"
            initial={{ opacity: 0, y: 36, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.55, delay: team.length * 0.08 }}
            className="group relative flex min-h-[34rem] flex-col justify-between overflow-hidden rounded-[30px] border border-ink/10 bg-sun p-7 text-ink shadow-[0_24px_80px_-40px_color-mix(in_oklab,var(--color-sun)_70%,transparent)]"
          >
            <DecorativeLayer>
              <Drift className="absolute -right-6 top-4 h-28 w-28 opacity-60" delay={0.2}>
                <DoodleCircle className="h-full w-full" tone="ink" />
              </Drift>
              <ScrollFloat className="absolute left-4 top-28 h-12 w-28 opacity-65" yRange={[-10, 18]}>
                <DottedTrail className="h-full w-full" tone="ink" />
              </ScrollFloat>
              <ScrollFloat className="absolute bottom-8 right-6 h-20 w-20 opacity-80" yRange={[12, -10]}>
                <Sparkle className="h-full w-full" tone="pink" />
              </ScrollFloat>
            </DecorativeLayer>

            <div className="relative">
              <span className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-ink text-cream shadow-lg">
                <ArrowUpRight className="size-6" />
              </span>
              <h3 className="mt-6 font-display text-4xl font-extrabold leading-none">Hire us</h3>
              <p className="mt-4 max-w-xs text-base leading-7 text-ink/75">
                Let&apos;s build something exceptional together with a team that moves like product partners, not vendors.
              </p>
            </div>

            <div className="relative space-y-6">
              <div className="rounded-[24px] border border-ink/12 bg-white/75 p-5 backdrop-blur-sm">
                <p className="text-sm leading-6 text-ink/75">
                  “The best team we&apos;ve worked with — fast, collaborative, and deeply invested in the outcome.”
                </p>
                <p className="mt-3 text-sm font-semibold text-ink">— NeoBank leadership</p>
              </div>
              <div className="inline-flex items-center gap-2 rounded-full bg-ink px-5 py-3 text-sm font-semibold text-cream transition-transform duration-300 group-hover:translate-x-1">
                Start a project <ArrowUpRight className="size-4" />
              </div>
            </div>
          </motion.a>
        </div>
      </div>
    </section>
  );
}
