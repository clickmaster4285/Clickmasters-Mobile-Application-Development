"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Plus } from "lucide-react";

/** CMS faq items, styled exactly like the site's FAQ (components/landing/FAQ). */
export function CmsFaq({
  faqs,
}: {
  faqs: { question: string; answer: string }[];
}) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="space-y-3">
      {faqs.map((f, i) => {
        const isOpen = open === i;
        return (
          <motion.div
            key={`${i}-${f.question}`}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.04 }}
            className="overflow-hidden rounded-2xl border-2 border-[var(--cms-border)] bg-[var(--cms-card)]"
          >
            <button
              type="button"
              aria-expanded={isOpen}
              onClick={() => setOpen(isOpen ? null : i)}
              className="flex w-full items-center justify-between p-6 text-left transition-colors hover:bg-ink/[0.02]"
            >
              <span className="pr-4 font-display text-lg font-bold text-[var(--cms-fg)]">
                {f.question}
              </span>
              <Plus
                className={`size-5 shrink-0 text-hot-pink transition-transform duration-300 ${
                  isOpen ? "rotate-45" : ""
                }`}
              />
            </button>
            <div
              className={`grid transition-all duration-300 ease-out ${
                isOpen
                  ? "grid-rows-[1fr] opacity-100"
                  : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="overflow-hidden">
                <p className="whitespace-pre-line px-6 pb-6 leading-relaxed text-[var(--cms-fg-muted)]">
                  {f.answer}
                </p>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
