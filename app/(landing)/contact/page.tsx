"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  MessageCircle,
  Send,
  MapPin,
  Loader2,
  AlertCircle,
} from "lucide-react";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { useLenisScroll } from "@/components/landing/motion";

const channels = [
  {
    icon: Mail,
    label: "Email",
    value: "sale@clickmastersmobiledevelopmentcompany.com",
    href: "mailto:sale@clickmastersmobiledevelopmentcompany.com",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+1 (555) 012-3456",
    href: "tel:+15550123456",
  },
  {
    icon: MessageCircle,
    label: "WhatsApp",
    value: "Chat with us",
    href: "https://wa.me/15550123456",
  },
  {
    icon: MapPin,
    label: "Studio",
    value: "Remote-first · Worldwide",
    href: undefined,
  },
];

type Status = "idle" | "submitting" | "success" | "error";

export default function ContactPage() {
  useLenisScroll();
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "submitting") return;
    setStatus("submitting");
    setErrorMsg("");

    const form = e.currentTarget;
    const data = new FormData(form);
    const payload = {
      name: String(data.get("name") ?? "").trim(),
      email: String(data.get("email") ?? "").trim(),
      project: String(data.get("project") ?? "").trim(),
      budget: String(data.get("budget") ?? "").trim(),
      message: String(data.get("message") ?? "").trim(),
    };

    if (!payload.name || !payload.email || !payload.message) {
      setStatus("error");
      setErrorMsg("Please fill in your name, email, and message.");
      return;
    }

    form.reset();
    setStatus("success");
  }

  return (
    <div className="relative min-h-screen bg-cream overflow-x-hidden">
      <Navbar />
      <main>
        <section className="relative px-6 lg:px-10 pt-36 pb-20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-electric/5 via-cream to-hot-pink/5" />
          <div className="max-w-6xl mx-auto relative grid lg:grid-cols-2 gap-12">
            {/* Left */}
            <div>
              <p className="font-script text-3xl text-hot-pink">say hello</p>
              <h1 className="mt-2 font-display font-extrabold text-5xl md:text-6xl text-ink leading-[0.95] tracking-tight">
                Let&apos;s build something great.
              </h1>
              <p className="mt-6 text-lg text-ink/70 max-w-md leading-relaxed">
                Tell us about your project and we&apos;ll get back within one
                business day with next steps and a free consultation.
              </p>

              <div className="mt-10 space-y-4">
                {channels.map((c) => {
                  const Inner = (
                    <div className="flex items-center gap-4 rounded-2xl border border-ink/10 bg-white p-4">
                      <div className="size-11 rounded-xl bg-ink/5 grid place-items-center text-ink">
                        <c.icon className="size-5" />
                      </div>
                      <div>
                        <p className="text-xs uppercase tracking-[0.2em] text-ink/45">
                          {c.label}
                        </p>
                        <p className="font-semibold text-ink break-all">
                          {c.value}
                        </p>
                      </div>
                    </div>
                  );
                  return c.href ? (
                    <a
                      key={c.label}
                      href={c.href}
                      className="block hover:-translate-y-0.5 transition-transform"
                    >
                      {Inner}
                    </a>
                  ) : (
                    <div key={c.label}>{Inner}</div>
                  );
                })}
              </div>
            </div>

            {/* Form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-3xl border border-ink/10 bg-white p-8 shadow-[0_30px_80px_-40px_rgba(0,0,0,0.3)]"
            >
              {status === "success" ? (
                <div className="h-full grid place-items-center text-center py-16">
                  <div>
                    <div className="mx-auto size-14 rounded-full bg-hot-pink text-white grid place-items-center">
                      <Send className="size-6" />
                    </div>
                    <h2 className="mt-4 font-display font-extrabold text-2xl text-ink">
                      Message sent!
                    </h2>
                    <p className="mt-2 text-ink/60">
                      Thanks for reaching out — we&apos;ve received your enquiry
                      and will reply within one business day.
                    </p>
                    <button
                      type="button"
                      onClick={() => setStatus("idle")}
                      className="mt-6 inline-flex items-center gap-2 rounded-full border-2 border-ink text-ink px-6 py-3 font-semibold hover:bg-ink hover:text-cream transition-colors"
                    >
                      Send another message
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                  {status === "error" && (
                    <div className="flex items-start gap-3 rounded-2xl border border-red-300 bg-red-50 p-4 text-red-700">
                      <AlertCircle className="size-5 flex-shrink-0 mt-0.5" />
                      <p className="text-sm font-medium">{errorMsg}</p>
                    </div>
                  )}
                  <div className="grid sm:grid-cols-2 gap-5">
                    <Field
                      label="Name"
                      name="name"
                      placeholder="Jane Doe"
                      required
                    />
                    <Field
                      label="Email"
                      name="email"
                      type="email"
                      placeholder="jane@company.com"
                      required
                    />
                  </div>
                  <Field
                    label="Project type"
                    name="project"
                    placeholder="Mobile app, redesign…"
                  />
                  <Field
                    label="Budget"
                    name="budget"
                    placeholder="$10k – $50k"
                  />
                  <div>
                    <label className="block text-sm font-semibold text-ink mb-1.5">
                      Message
                    </label>
                    <textarea
                      name="message"
                      rows={4}
                      required
                      maxLength={2000}
                      placeholder="Tell us about your idea…"
                      className="w-full rounded-2xl border border-ink/15 bg-cream px-4 py-3 text-ink placeholder:text-ink/40 focus:outline-none focus:ring-2 focus:ring-hot-pink/40"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={status === "submitting"}
                    className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-hot-pink text-white px-6 py-4 font-semibold shadow-[0_18px_50px_-18px_rgba(255,71,127,0.7)] disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {status === "submitting" ? (
                      <>
                        Sending…
                        <Loader2 className="size-4 animate-spin" />
                      </>
                    ) : (
                      <>
                        Send message
                        <Send className="size-4" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

function Field({
  label,
  name,
  type = "text",
  placeholder,
  required,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="block text-sm font-semibold text-ink mb-1.5">
        {label}
      </label>
      <input
        type={type}
        name={name}
        required={required}
        placeholder={placeholder}
        maxLength={255}
        className="w-full rounded-2xl border border-ink/15 bg-cream px-4 py-3 text-ink placeholder:text-ink/40 focus:outline-none focus:ring-2 focus:ring-hot-pink/40"
      />
    </div>
  );
}
