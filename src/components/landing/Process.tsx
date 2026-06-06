import { motion } from "framer-motion";
import { RevealText, ScrollFloat } from "./motion";
import { DoodleCircle, PaperAirplane, RocketSketch, Sparkle, Squiggle, ZigZag, Drift } from "./decor";

const cols = [
  {
    name: "Understand",
    color: "text-hot-pink",
    items: ["Discovery", "Stakeholder interviews", "User personas", "Requirements"],
    icon: <DoodleCircle tone="pink" className="size-full" />,
  },
  {
    name: "Analyze",
    color: "text-electric",
    items: ["Market research", "Competitive analysis", "Data architecture", "Risk assessment"],
    icon: <ZigZag tone="electric" className="size-full" />,
  },
  {
    name: "Define",
    color: "text-ink",
    items: ["Product roadmap", "Technical specs", "Sprint planning", "MVP scope"],
    icon: <PaperAirplane tone="ink" className="size-full" />,
  },
  {
    name: "Design",
    color: "text-whatsapp",
    items: ["UI/UX design", "Prototyping", "User testing", "Visual design"],
    icon: <RocketSketch tone="sun" className="size-full" />,
  },
];

export function Process() {
  return (
    <section id="process" className="relative px-6 lg:px-10 py-32 border-t border-border overflow-hidden">
      <Drift className="absolute top-16 right-10 size-32 opacity-30 pointer-events-none">
        <Sparkle className="size-full" />
      </Drift>
      <Drift delay={1.5} className="absolute bottom-20 left-10 size-40 opacity-25 pointer-events-none">
        <PaperAirplane className="size-full" tone="electric" />
      </Drift>

      <div className="max-w-7xl mx-auto relative">
        <div className="mb-20 max-w-2xl">
          <div className="flex items-center gap-3">
            <p className="font-script text-3xl text-hot-pink -rotate-3">a</p>
            <Squiggle className="w-24 text-electric" tone="electric" />
          </div>
          <RevealText className="font-display font-extrabold text-5xl md:text-7xl text-ink leading-none">
            powerful process
          </RevealText>
          <p className="mt-6 text-ink/70 text-lg">
            A proven, transparent workflow that turns ambitious ideas into shipped products — on
            time, in scope, and built to scale.
          </p>
        </div>

        <ScrollFloat yRange={[20, -20]} className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-0 relative">
          <svg className="hidden lg:block absolute top-12 left-0 right-0 mx-auto w-full text-ink/15" viewBox="0 0 1100 40" fill="none" aria-hidden>
            <path d="M20 20 C 200 -10, 380 50, 560 20 S 920 -10, 1080 25" stroke="currentColor" strokeWidth="2" strokeDasharray="6 8" strokeLinecap="round" />
          </svg>
          {cols.map((c, i) => (
            <motion.div
              key={c.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: i * 0.12 }}
              className={`relative lg:px-8 group ${i < cols.length - 1 ? "lg:border-r lg:border-dashed lg:border-ink/15" : ""}`}
            >
              <div className="size-14 mb-6 relative">
                <div className="absolute inset-0 transition-transform duration-500 group-hover:rotate-12 group-hover:scale-110">
                  {c.icon}
                </div>
              </div>
              <div className="flex items-baseline gap-3">
                <span className="font-script text-xl text-ink/30">0{i + 1}</span>
                <h3 className={`font-display font-extrabold text-3xl md:text-4xl ${c.color}`}>
                  {c.name}
                </h3>
              </div>
              <ul className="mt-6 space-y-3 text-sm text-ink/70">
                {c.items.map((it, j) => (
                  <motion.li
                    key={it}
                    initial={{ opacity: 0, x: -8 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.12 + j * 0.06 }}
                    className="flex items-start gap-3"
                  >
                    <span className="mt-1.5 size-2 rounded-full bg-hot-pink flex-shrink-0 shadow-[0_0_0_3px_rgba(255,71,127,0.15)]" />
                    {it}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </ScrollFloat>
      </div>
    </section>
  );
}
