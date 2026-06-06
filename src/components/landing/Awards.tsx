import { motion } from "framer-motion";
import { Trophy } from "lucide-react";

const awards = [
  { name: "Awwwards Nominee", year: "2024", rot: -2 },
  { name: "Clutch Global Top 10", year: "Mobile Dev", rot: 1.5 },
  { name: "Fastest Growing Dev Firm", year: "2023", rot: -1 },
  { name: "Webby Honoree", year: "2024", rot: 2 },
  { name: "Inc. 5000 Nominee", year: "2023", rot: -1.5 },
  { name: "Deloitte Tech Fast 50", year: "2022", rot: 1 },
];

export function Awards() {
  return (
    <section className="px-6 lg:px-10 py-24 bg-cream border-t border-border">
      <div className="max-w-6xl mx-auto text-center">
        <p className="font-script text-3xl text-hot-pink">a little</p>
        <h2 className="font-display font-extrabold text-4xl md:text-5xl text-ink">recognition</h2>
        <div className="mt-14 flex flex-wrap justify-center gap-4">
          {awards.map((a, i) => (
            <motion.div
              key={a.name}
              initial={{ opacity: 0, y: 20, rotate: 0 }}
              whileInView={{ opacity: 1, y: 0, rotate: a.rot }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: i * 0.06, type: "spring" }}
              whileHover={{ rotate: 0, scale: 1.05 }}
              className="inline-flex items-center gap-3 rounded-2xl bg-white border-2 border-ink px-5 py-3 shadow-[4px_4px_0_0_oklch(0.65_0.28_0)]"
            >
              <Trophy className="size-5 text-hot-pink" />
              <div className="text-left">
                <p className="font-semibold text-ink text-sm">{a.name}</p>
                <p className="text-xs text-ink/60">{a.year}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}