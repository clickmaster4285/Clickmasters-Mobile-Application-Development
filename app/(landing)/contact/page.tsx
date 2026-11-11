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
import { site } from "@/lib/site";

const channels = [
  {
    icon: Mail,
    label: "Email",
    value: site.email,
    href: `mailto:${site.email}`,
  },
  {
    icon: Phone,
    label: "Phone",
    value: site.phoneDisplay,
    href: `tel:${site.phoneTel}`,
  },
  {
    icon: MessageCircle,
    label: "WhatsApp",
    value: site.phoneDisplay,
    href: site.whatsapp,
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

    const body = [
      `Name: ${payload.name}`,
      `Email: ${payload.email}`,
      `Project: ${payload.project || "n/a"}`,
      `Budget: ${payload.budget || "n/a"}`,
      "",
      payload.message,
    ].join("\n");
    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent("App project")}&body=${encodeURIComponent(body)}`;
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
                      rel={
                        c.href.startsWith("https://") ? site.whatsappRel : undefined
                      }
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
                      Your email app should be open with the message addressed
                      to {site.email}. Send it there so it actually reaches us.
                      The form on this page does not store the message itself.
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
                  <h2 className="font-display font-extrabold text-2xl text-ink">
                    Send a message
                  </h2>
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

        <section className="px-6 lg:px-10 pb-24">
          <div className="max-w-3xl mx-auto space-y-5 text-ink/75 leading-8">
            <h2 className="font-display font-extrabold text-3xl text-ink">
              What to send
            </h2>
            <p>
              A useful note names the person who will use the app, the one job
              the first release must finish, and the platforms. iOS only,
              Android only, or both. If both, say whether you already prefer
              Swift and Kotlin, Flutter, or React Native. If you do not have a
              preference, say that. The stack guides exist so you can read the
              tradeoff before the call, not so you have to arrive with a
              decision.
            </p>
            <p>
              List the systems the app must call. A booking tool, a till, a
              bank core, a clinical sandbox, or nothing yet. &quot;Nothing
              yet&quot; is a valid answer and it changes the estimate, because
              the app then needs somewhere to keep accounts and records. Also
              say which countries you will ship to. Store rules and tax on
              digital goods are not the same everywhere.
            </p>
            <p>
              Separate what is in the first release from what can wait. A
              customer flow and a staff console are often two releases. Payments,
              offline use, and chat are line items, not adjectives. If you have
              a deadline, say what the deadline is for: a TestFlight build, a
              closed Play test, or a public listing. Those are different dates.
            </p>
            <p>
              You can reach the studio at {site.email} or {site.phoneDisplay}.
              WhatsApp uses the same phone number as the call button. We reply
              with questions when the note is missing a platform or a job, and
              with a scoped plan when the note has both. We do not send a price
              from a slogan, and we do not attach review scores or awards to
              the reply.
            </p>
            <p>
              If you are still choosing a topic, start with the{" "}
              <a href="/services" className="font-semibold text-hot-pink">
                services index
              </a>
              , the{" "}
              <a href="/cost-pricing" className="font-semibold text-hot-pink">
                cost guide
              </a>
              , or{" "}
              <a href="/solutions" className="font-semibold text-hot-pink">
                solutions
              </a>
              . Those pages are the ones this site still publishes. Removed
              keyword pages should not be used as a brief. If you found one in
              an old search result, it now explains that it has been removed.
            </p>
            <p>
              Include your name, a return email, and whether you need a
              discovery conversation or a build. If a vendor already holds the
              store accounts, say who can invite a developer. If the app handles
              health or financial data, say who owns the policy. You do not
              need a visual design. You do need the job the first version must
              complete. We would rather delay a quote by a day than price a
              product nobody has described. The phone number and the WhatsApp
              link are the same line, {site.phoneDisplay}.
            </p>
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
