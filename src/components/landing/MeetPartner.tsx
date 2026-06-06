import { motion } from "framer-motion";

export function MeetPartner() {
  return (
    <section className="px-6 lg:px-10 py-28 bg-ink text-cream relative overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7 }}
        className="max-w-4xl mx-auto text-center relative"
      >
        <h2 className="font-display font-extrabold text-4xl md:text-6xl leading-tight">
          Meet your new{" "}
          <span className="font-script text-hot-pink italic font-normal">tech partner</span>
        </h2>
        <p className="mt-8 text-xl md:text-2xl text-cream/70 leading-relaxed">
          <span className="text-cream font-semibold">With us,</span> you'll discover a strategic
          partner equipped with the expertise, skill, and dedication to bring your vision to life.
          We don't just deliver code — we deliver confidence.
        </p>
        <div className="mt-16 pt-12 border-t border-cream/10">
          <p className="text-lg italic text-cream/80 max-w-2xl mx-auto">
            "They didn't just build the app — they became our technical co-founders. Invaluable."
          </p>
          <p className="mt-4 text-sm text-cream/50">— Sarah Chen, CTO of NeoBank</p>
        </div>
      </motion.div>
    </section>
  );
}