import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle } from "lucide-react";

export function FloatingContact() {
  const [hover, setHover] = useState(false);
  return (
    <a
      href="https://wa.me/13252024074?text=Hi%20ClickMasters%2C%20I%27d%20like%20to%20talk%20about%20a%20project"
      target="_blank"
      rel="noreferrer"
      aria-label="Chat on WhatsApp"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-full bg-whatsapp text-white pl-4 pr-4 py-3 shadow-[0_18px_40px_-12px_rgba(37,211,102,0.6)] hover:scale-105 transition-transform"
    >
      <MessageCircle className="size-5" />
      <AnimatePresence>
        {hover && (
          <motion.span
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: "auto" }}
            exit={{ opacity: 0, width: 0 }}
            className="text-sm font-semibold overflow-hidden whitespace-nowrap"
          >
            Chat with us
          </motion.span>
        )}
      </AnimatePresence>
    </a>
  );
}
