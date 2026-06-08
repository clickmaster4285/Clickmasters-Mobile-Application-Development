import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Target, Heart, Zap, Users } from "lucide-react";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { Team } from "@/components/landing/Team";
import { useLenisScroll } from "@/components/landing/motion";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About ClickMasters — Mobile App Studio" },
      {
        name: "description",
        content:
          "Meet ClickMasters — a studio of designers and engineers shipping high-performance mobile apps since 2015. Our mission, values, and team.",
      },
      { property: "og:title", content: "About ClickMasters — Mobile App Studio" },
      {
        property: "og:description",
        content: "Our mission, values, and the team behind 250+ shipped mobile products.",
      },
    ],
  }),
  component: AboutPage,
});

const values = [
  { icon: Target, title: "Outcome-driven", desc: "We measure success by the impact your app has on real users and revenue." },
  { icon: Heart, title: "Crafted with care", desc: "Every pixel and interaction is considered. We sweat the details so users feel it." },
  { icon: Zap, title: "Fast & focused", desc: "Lean teams, tight loops, and rapid iteration get you to market sooner." },
  { icon: Users, title: "True partners", desc: "We work as an extension of your team — transparent, honest, and invested." },
];

function AboutPage() {
  useLenisScroll();

  return (
    <div className="relative min-h-screen bg-cream overflow-x-hidden">
      <Navbar />
      <main>
        {/* Hero */}
        <section className="relative px-6 lg:px-10 pt-36 pb-20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-electric/5 via-cream to-hot-pink/5" />
          <div className="max-w-5xl mx-auto relative">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-script text-3xl text-hot-pink"
            >
              who we are
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mt-2 font-display font-extrabold text-5xl md:text-7xl text-ink leading-[0.95] tracking-tight"
            >
              We turn bold ideas into apps people love.
            </motion.h1>
            <p className="mt-6 text-lg text-ink/70 max-w-2xl leading-relaxed">
              Since 2015, ClickMasters has been a tight-knit studio of designers, engineers, and
              strategists. We've shipped 250+ mobile products for startups and enterprises — each
              one built to scale, delight, and perform.
            </p>
          </div>
        </section>

        {/* Mission */}
        <section className="px-6 lg:px-10 py-20 bg-ink text-cream">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="font-display font-extrabold text-3xl md:text-5xl">Our mission</h2>
            <p className="mt-6 text-lg md:text-xl text-cream/75 leading-relaxed">
              To be the most trusted partner for ambitious teams building on mobile — combining
              world-class craft with relentless focus on outcomes, so every app we ship moves the
              business forward.
            </p>
          </div>
        </section>

        {/* Values */}
        <section className="px-6 lg:px-10 py-20">
          <div className="max-w-6xl mx-auto">
            <h2 className="font-display font-extrabold text-3xl md:text-4xl text-ink">
              What we stand for
            </h2>
            <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((v, idx) => (
                <motion.div
                  key={v.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.08 }}
                  className="rounded-3xl border border-ink/10 bg-white p-6"
                >
                  <div className="size-12 rounded-xl bg-gradient-to-br from-electric to-hot-pink grid place-items-center text-white">
                    <v.icon className="size-6" />
                  </div>
                  <h3 className="mt-4 font-display font-bold text-lg text-ink">{v.title}</h3>
                  <p className="mt-2 text-sm text-ink/65 leading-relaxed">{v.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Team (reused) */}
        <Team />
      </main>
      <Footer />
    </div>
  );
}
