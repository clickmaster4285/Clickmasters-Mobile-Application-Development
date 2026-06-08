import { motion } from "framer-motion";
import { RevealText, ScrollFloat } from "./motion";
import { Search, Layers, Smartphone, Globe, ShieldCheck, GitBranch, type LucideIcon } from "lucide-react";
import agencyReel from "@/assets/marketing/agency-reel.jpeg.asset.json";

const cols: { name: string; color: string; items: { label: string; icon: LucideIcon }[] }[] = [
  {
    name: "Understand",
    color: "text-hot-pink",
    items: [
      { label: "UX Research & Strategy", icon: Search },
      { label: "Product Architecture", icon: Layers },
      { label: "Stakeholder alignment", icon: ShieldCheck },
    ],
  },
  {
    name: "Analyze",
    color: "text-electric",
    items: [
      { label: "Market & competitive research", icon: Search },
      { label: "Data architecture", icon: Layers },
      { label: "Risk assessment", icon: ShieldCheck },
    ],
  },
  {
    name: "Build",
    color: "text-ink",
    items: [
      { label: "Native iOS & Android", icon: Smartphone },
      { label: "Cross-Platform Development", icon: Globe },
      { label: "DevOps & CI/CD", icon: GitBranch },
    ],
  },
  {
    name: "Ship",
    color: "text-whatsapp",
    items: [
      { label: "QA & Automated Testing", icon: ShieldCheck },
      { label: "Release management", icon: GitBranch },
      { label: "Post-launch support", icon: Smartphone },
    ],
  },
];

export function Process() {
  return (
    <section id="process" className="relative px-6 lg:px-10 py-24 border-t border-border overflow-hidden">
      <div className="max-w-7xl mx-auto relative">
        <div className="mb-16 max-w-2xl">
          <p className="font-script text-3xl text-hot-pink">our studio path</p>
          <RevealText className="font-display font-extrabold text-5xl md:text-7xl text-ink leading-none mt-2">
            powerful process
          </RevealText>
          <p className="mt-6 text-ink/70 text-lg">
            A proven, transparent workflow that turns ambitious ideas into shipped products — on
            time, in scope, and built to scale.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="mb-16 relative rounded-3xl overflow-hidden border border-ink/10 shadow-[0_24px_60px_-25px_rgba(0,0,0,0.35)]"
        >
          <img
            src={agencyReel.url}
            alt="Design. Code. Collaborate. Launch. Analyze. Optimize."
            className="w-full h-auto block"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-ink/35 via-transparent to-ink/20" />
        </motion.div>


        <ScrollFloat yRange={[20, -20]} className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-0 relative">
          {cols.map((c, i) => (
            <motion.div
              key={c.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: i * 0.1 }}
              className={`relative lg:px-8 ${i < cols.length - 1 ? "lg:border-r lg:border-dashed lg:border-ink/15" : ""}`}
            >
              <div className="flex items-baseline gap-3">
                <span className="font-script text-xl text-ink/30">0{i + 1}</span>
                <h3 className={`font-display font-extrabold text-3xl md:text-4xl ${c.color}`}>
                  {c.name}
                </h3>
              </div>
              <ul className="mt-6 space-y-3 text-sm text-ink/75">
                {c.items.map((it) => (
                  <li key={it.label} className="flex items-start gap-3">
                    <span className="mt-0.5 size-7 rounded-lg bg-electric/10 text-electric grid place-items-center flex-shrink-0">
                      <it.icon className="size-3.5" />
                    </span>
                    <span className="leading-6">{it.label}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </ScrollFloat>
      </div>
    </section>
  );
}
