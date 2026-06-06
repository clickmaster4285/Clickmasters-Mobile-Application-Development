import { useState } from "react";
import { MessageCircle, Phone, Mail, X, MessageSquare } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function FloatingContact() {
  const [open, setOpen] = useState(false);
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="flex flex-col gap-2 bg-white rounded-2xl shadow-2xl border-2 border-ink/10 p-3 w-64"
          >
            <p className="text-xs uppercase tracking-widest text-ink/60 px-2 pt-1">
              Talk to us
            </p>
            <a
              href="https://wa.me/13252024074"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-3 p-3 rounded-xl bg-whatsapp text-white hover:scale-[1.02] transition-transform"
            >
              <MessageCircle className="size-5" />
              <span className="font-semibold text-sm">Chat on WhatsApp</span>
            </a>
            <a
              href="tel:+13252024074"
              className="flex items-center gap-3 p-3 rounded-xl bg-ink text-cream hover:scale-[1.02] transition-transform"
            >
              <Phone className="size-5" />
              <span className="font-semibold text-sm">Request a call back</span>
            </a>
            <a
              href="mailto:sale@clickmastersmobiledevelopmentcompany.com"
              className="flex items-center gap-3 p-3 rounded-xl bg-hot-pink text-cream hover:scale-[1.02] transition-transform"
            >
              <Mail className="size-5" />
              <span className="font-semibold text-sm">Send an email</span>
            </a>
          </motion.div>
        )}
      </AnimatePresence>
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? "Close contact menu" : "Open contact menu"}
        className="size-14 rounded-full bg-hot-pink text-cream shadow-2xl grid place-items-center hover:scale-110 transition-transform"
      >
        {open ? <X className="size-6" /> : <MessageSquare className="size-6" />}
      </button>
    </div>
  );
}
