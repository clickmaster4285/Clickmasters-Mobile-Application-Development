import { motion } from "framer-motion";
import { useState } from "react";
import { Plus } from "lucide-react";

const faqs = [
  {
    q: "How long does it take to build an app?",
    a: "Most projects ship in 8–20 weeks. An MVP runs 8–12 weeks; full-featured products 12–20. We share a precise timeline after a 30-minute discovery call.",
  },
  {
    q: "Do you only build mobile apps?",
    a: "Mobile is our specialty, but we routinely ship web dashboards, admin panels, and APIs that power them. One team, one stack, zero handoff friction.",
  },
  {
    q: "What does your design process look like?",
    a: "Discovery → wireframes → hi-fi UI → interactive prototype → engineering. You're in the loop at every gate with async Loom walkthroughs.",
  },
  {
    q: "Do you offer post-launch support?",
    a: "Yes. Every launch includes 30 days of free hypercare. After that, choose a monthly maintenance plan with guaranteed response times.",
  },
  {
    q: "What technologies do you use?",
    a: "Native Swift & Kotlin when performance matters. Flutter or React Native when speed-to-market wins. Backend: Node, Go, Postgres, Supabase.",
  },
  {
    q: "Can you sign an NDA?",
    a: "Absolutely — it's standard practice before we see anything sensitive. We can sign yours or send ours.",
  },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="px-6 lg:px-10 py-24 bg-cream">
      <div className="max-w-4xl mx-auto">
        <div className="mb-14 text-center">
          <p className="font-script text-3xl text-hot-pink">questions?</p>
          <h2 className="font-display font-extrabold text-4xl md:text-5xl text-ink">
            we have answers
          </h2>
        </div>
        <div className="space-y-3">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <motion.div
                key={f.q}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.04 }}
                className="rounded-2xl border-2 border-ink/10 bg-white overflow-hidden"
              >
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-ink/[0.02] transition-colors"
                >
                  <span className="font-display font-bold text-lg text-ink pr-4">{f.q}</span>
                  <Plus
                    className={`size-5 text-hot-pink shrink-0 transition-transform duration-300 ${
                      isOpen ? "rotate-45" : ""
                    }`}
                  />
                </button>
                <div
                  className={`grid transition-all duration-300 ease-out ${
                    isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="px-6 pb-6 text-ink/70 leading-relaxed">{f.a}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
