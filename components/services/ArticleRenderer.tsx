import { Fragment, type ReactNode } from "react";
import {
  ArrowRight,
  Check,
  Lightbulb,
  DollarSign,
  HelpCircle,
  Briefcase,
  BookOpen,
  Cpu,
  ShieldCheck,
  Rocket,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { RevealText } from "../landing/motion";

gsap.registerPlugin(ScrollTrigger);
const sectionIcons = [Briefcase, Lightbulb, Cpu, ShieldCheck, Rocket, BookOpen];
/* -------------------------------------------------------------------------- */
/*  Inline text renderer — **bold**, *italic*, `code`, and [text → `/path/`]  */
/* -------------------------------------------------------------------------- */

function renderInline(text: string, keyPrefix = "i"): ReactNode[] {
  // Custom link syntax: [label → `/path/`]
  const linkRe = /\[([^\]]+?)\s*→\s*`([^`]+)`\]/g;
  const parts: ReactNode[] = [];
  let last = 0;
  let m: RegExpExecArray | null;
  let k = 0;
  while ((m = linkRe.exec(text)) !== null) {
    if (m.index > last) parts.push(text.slice(last, m.index));
    parts.push(
      <a
        key={`${keyPrefix}-l-${k++}`}
        href={m[2]}
        className="inline-flex items-center gap-1 rounded-full   px-2.5 py-0.5 text-[0.85em] font-semibold text-brand-pink hover:bg-brand-pink/10"
      >
        {m[1]}
        <ArrowRight className="h-3 w-3" />
      </a>,
    );
    last = m.index + m[0].length;
  }
  if (last < text.length) parts.push(text.slice(last));

  // Now apply bold/italic/code to each string segment
  return parts.flatMap((p, i) => {
    if (typeof p !== "string") return [p];
    return formatEmphasis(p, `${keyPrefix}-${i}`);
  });
}

function formatEmphasis(text: string, keyPrefix: string): ReactNode[] {
  const re = /(\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`)/g;
  const out: ReactNode[] = [];
  let last = 0;
  let m: RegExpExecArray | null;
  let k = 0;
  while ((m = re.exec(text)) !== null) {
    if (m.index > last) out.push(text.slice(last, m.index));
    const seg = m[0];
    if (seg.startsWith("**")) {
      out.push(
        <strong
          key={`${keyPrefix}-b-${k++}`}
          className="font-bold text-primary"
        >
          {seg.slice(2, -2)}
        </strong>,
      );
    } else if (seg.startsWith("`")) {
      out.push(
        <code
          key={`${keyPrefix}-c-${k++}`}
          className="rounded bg-secondary px-1.5 py-0.5 font-mono text-[0.85em]"
        >
          {seg.slice(1, -1)}
        </code>,
      );
    } else {
      out.push(
        <em key={`${keyPrefix}-i-${k++}`} className="italic">
          {seg.slice(1, -1)}
        </em>,
      );
    }
    last = m.index + seg.length;
  }
  if (last < text.length) out.push(text.slice(last));
  return out;
}

/* -------------------------------------------------------------------------- */
/*  Parser — turn markdown into typed blocks                                  */
/* -------------------------------------------------------------------------- */

type Block =
  | { kind: "byline"; text: string }
  | { kind: "notice"; text: string }
  | { kind: "quickAnswer"; text: string }
  | { kind: "takeaways"; items: string[] }
  | {
      kind: "section";
      title: string;
      paragraphs: string[];
      callouts: Callout[];
    }
  | { kind: "table"; headers: string[]; rows: string[][] }
  | { kind: "faqs"; items: { q: string; a: string }[] }
  | { kind: "related"; links: { label: string; href: string }[] }
  | { kind: "finalCta"; text: string }
  | { kind: "sources"; text: string };

type Callout = {
  variant: "insight" | "pricing" | "cta";
  text: string;
};

function classifyCallout(text: string): Callout {
  if (/💡|key insight/i.test(text)) return { variant: "insight", text };
  if (/💰|pricing:/i.test(text)) return { variant: "pricing", text };
  return { variant: "cta", text };
}

function parseArticle(md: string): Block[] {
  // Normalize + strip leading H1 + trailing horizontal-rule + sources footnote
  const raw = md.replace(/\r\n/g, "\n").trim();
  const lines = raw.split("\n");
  // Split into blocks by blank line, but keep table lines together
  const blocks: string[] = [];
  let buf: string[] = [];
  const flush = () => {
    if (buf.length) {
      blocks.push(buf.join("\n").trim());
      buf = [];
    }
  };
  for (const l of lines) {
    if (l.trim() === "") flush();
    else buf.push(l);
  }
  flush();

  const out: Block[] = [];
  let sawH1 = false;
  let inFaqs = false;
  let faqItems: { q: string; a: string }[] = [];
  let currentSection: Extract<Block, { kind: "section" }> | null = null;

  const commitSection = () => {
    if (currentSection) {
      out.push(currentSection);
      currentSection = null;
    }
  };
  const commitFaqs = () => {
    if (inFaqs) {
      out.push({ kind: "faqs", items: faqItems });
      faqItems = [];
      inFaqs = false;
    }
  };

  for (let bi = 0; bi < blocks.length; bi++) {
    const b = blocks[bi];

    // Skip H1
    if (b.startsWith("# ") && !sawH1) {
      sawH1 = true;
      continue;
    }
    // Horizontal rule → close open groups
    if (/^-{3,}$/.test(b)) {
      commitSection();
      commitFaqs();
      continue;
    }

    // H2 heading
    if (b.startsWith("## ")) {
      commitSection();
      commitFaqs();
      const title = b.slice(3).trim();
      if (/^faqs?$/i.test(title)) {
        inFaqs = true;
        continue;
      }
      currentSection = { kind: "section", title, paragraphs: [], callouts: [] };
      continue;
    }

    // Table
    if (b.startsWith("|") && b.includes("\n")) {
      commitSection();
      commitFaqs();
      const rows = b.split("\n").filter((r) => r.trim().startsWith("|"));
      if (rows.length >= 2) {
        const parseRow = (r: string) =>
          r
            .trim()
            .replace(/^\|/, "")
            .replace(/\|$/, "")
            .split("|")
            .map((c) => c.trim());
        const headers = parseRow(rows[0]);
        const body = rows
          .slice(2) // skip alignment row
          .map(parseRow);
        out.push({ kind: "table", headers, rows: body });
        continue;
      }
    }

    // Blockquote
    if (b.startsWith(">")) {
      const text = b
        .split("\n")
        .map((l) => l.replace(/^>\s?/, ""))
        .join(" ")
        .trim();
      // Quick answer at top
      if (/^\*?\*?quick answer/i.test(text) && !currentSection && !inFaqs) {
        out.push({ kind: "quickAnswer", text });
        continue;
      }
      // "Get a detailed estimate" → final CTA
      if (/get a detailed estimate/i.test(text)) {
        commitSection();
        commitFaqs();
        out.push({ kind: "finalCta", text });
        continue;
      }
      const c = classifyCallout(text);
      if (currentSection) currentSection.callouts.push(c);
      else
        out.push({ kind: "section", title: "", paragraphs: [], callouts: [c] });
      continue;
    }

    // Related reading
    if (/^\*\*Related reading:\*\*/i.test(b)) {
      commitSection();
      commitFaqs();
      const links: { label: string; href: string }[] = [];
      const re = /\[([^\]]+?)\s*→\s*`([^`]+)`\]/g;
      let m: RegExpExecArray | null;
      while ((m = re.exec(b)) !== null) {
        links.push({ label: m[1], href: m[2] });
      }
      out.push({ kind: "related", links });
      continue;
    }

    // Sources italic paragraph
    if (b.startsWith("*Sources:") || b.startsWith("*sources:")) {
      commitSection();
      commitFaqs();
      out.push({ kind: "sources", text: b.replace(/^\*|\*$/g, "") });
      continue;
    }

    // Italic-only single line (byline / notice)
    if (/^\*[^*]+\*$/.test(b) && !currentSection && !inFaqs) {
      const text = b.slice(1, -1);
      if (out.some((o) => o.kind === "byline"))
        out.push({ kind: "notice", text });
      else out.push({ kind: "byline", text });
      continue;
    }

    // Key takeaways
    if (/^\*\*Key takeaways\*\*/i.test(b)) {
      // Next block should be the list
      const next = blocks[bi + 1] ?? "";
      if (next.startsWith("- ")) {
        const items = next
          .split("\n")
          .filter((l) => l.startsWith("- "))
          .map((l) => l.slice(2).trim());
        out.push({ kind: "takeaways", items });
        bi++;
        continue;
      }
    }

    // FAQ Q/A: block starting with **Q?**
    if (inFaqs && b.startsWith("**") && b.includes("?**")) {
      // Format: **Question?**\nAnswer text...
      const nl = b.indexOf("\n");
      let q: string;
      let a: string;
      if (nl === -1) {
        q = b.replace(/^\*\*|\*\*$/g, "");
        a = "";
      } else {
        q = b.slice(0, nl).replace(/^\*\*/, "").replace(/\*\*$/, "");
        a = b.slice(nl + 1).trim();
      }
      faqItems.push({ q, a });
      continue;
    }

    // Plain paragraph → add to current section (or top-level)
    if (currentSection) {
      currentSection.paragraphs.push(b);
    } else if (!inFaqs) {
      // Orphan paragraph — treat as its own untitled section
      out.push({ kind: "section", title: "", paragraphs: [b], callouts: [] });
    }
  }

  commitSection();
  commitFaqs();
  return out;
}

/* -------------------------------------------------------------------------- */
/*  UI atoms                                                                  */
/* -------------------------------------------------------------------------- */
function CalloutCard({ callout }: { callout: Callout }) {
  const map = {
    insight: {
      Icon: Lightbulb,
      label: "KEY INSIGHT",
      bg: "bg-amber-50 border-amber-200",
      text: "text-amber-800",
      iconBg: "bg-amber-100",
      iconColor: "text-amber-600",
    },
    pricing: {
      Icon: DollarSign,
      label: "PRICING",
      bg: "bg-emerald-50 border-emerald-200",
      text: "text-emerald-800",
      iconBg: "bg-emerald-100",
      iconColor: "text-emerald-600",
    },
    cta: {
      Icon: Briefcase,
      label: "NEXT STEP",
      bg: "bg-pink-50 border-pink-200",
      text: "text-pink-700",
      iconBg: "bg-pink-100",
      iconColor: "text-pink-600",
    },
  } as const;

  const s = map[callout.variant];

  const cleaned = callout.text
    .replace(/^(?:💡|💰|📌|✨)\s*/, "")
    .replace(/^\*\*[^:]+:\*\*\s*/, "");

  return (
    <div
      className={`group h-full rounded-3xl border p-8 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${s.bg}`}
    >
      <div className="mb-6 flex items-center gap-4">
        <div
          className={`flex h-14 w-14 items-center justify-center rounded-2xl ${s.iconBg}`}
        >
          <s.Icon className={`h-7 w-7 ${s.iconColor}`} />
        </div>

        <span
          className={`text-sm font-bold uppercase tracking-[0.25em] ${s.text}`}
        >
          {s.label}
        </span>
      </div>

      <p className="text-lg leading-8 text-foreground/80">
        {renderInline(cleaned, "co")}
      </p>
    </div>
  );
}

function SectionBlock({
  block,
  index,
}: {
  block: Extract<Block, { kind: "section" }>;
  index: number;
}) {
  const hasTitle = !!block.title?.trim();
  const hasParagraphs = block.paragraphs.length > 0;

  if (!hasTitle || !hasParagraphs) return null;

  const Icon = sectionIcons[index % sectionIcons.length];

  return (
    <>
      <div
        className="
        group
        relative
        h-full
        overflow-hidden
        rounded-3xl
        border
        border-ink/10
        bg-white
        p-8
        transition-all
        duration-500
        hover:-translate-y-1
        hover:border-ink/20
        hover:shadow-[0_30px_70px_-30px_rgba(0,0,0,0.35)]
      "
      >
        {/* Icon */}
        <div className="size-14 rounded-2xl bg-gradient-to-br from-electric/10 to-hot-pink/10 grid place-items-center text-ink transition-all duration-500 group-hover:from-electric group-hover:to-hot-pink group-hover:text-white">
          <Icon className="size-7" />
        </div>

        {/* Title */}
        <h2 className="mt-6 font-display text-2xl font-bold text-ink">
          {block.title}
        </h2>

        {/* Divider */}
        <div className="mt-4 h-px w-full bg-ink/10" />

        {/* Content */}
        <div className="mt-6 space-y-5">
          {block.paragraphs.map((p, i) => (
            <p key={i} className="text-base leading-8 text-ink/70">
              {renderInline(p, `s${index}p${i}`)}
            </p>
          ))}
        </div>

        {/* Bottom Accent */}
        {/* <div className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-hot-pink">
          <span>Section {String(index + 1).padStart(2, "0")}</span>
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
        </div> */}

        {/* Hover Glow */}
        <div className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-transparent transition-all duration-500 group-hover:ring-hot-pink/10" />
      </div>
    </>
  );
}

function QuickAnswerCard({ text }: { text: string }) {
  const cleaned = text.replace(/^\*?\*?quick answer:?\*?\*?\s*/i, "");

  return (
    <div className="rounded-3xl bg-zinc-950 p-6 sm:p-8 text-white">
      {/* Heading */}
      <div className="font-script text-2xl text-brand-pink">Quick Answer</div>

      {/* Content */}
      <div className="mt-4">
        <p className="text-foreground/95 text-[1.03rem] leading-[1.85] text-white/90">
          {renderInline(cleaned, "qa")}
        </p>
      </div>
    </div>
  );
}

function TakeawaysCard({ items }: { items: string[] }) {
  return (
    <div className="rounded-3xl border border-border bg-card p-6 sm:p-8">
      <div className="flex items-center gap-2 font-script text-2xl text-brand-pink">
        key takeaways
      </div>
      <ul className="mt-4 grid gap-3 sm:grid-cols-1">
        {items.map((it, i) => (
          <li key={i} className="flex items-start gap-3">
            <span className="mt-1 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-brand-pink/10 text-brand-pink">
              <Check className="h-3 w-3" strokeWidth={3} />
            </span>
            <span className="text-foreground/85">
              {renderInline(it, `tk${i}`)}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function ComparisonTable({
  headers,
  rows,
}: {
  headers: string[];
  rows: string[][];
}) {
  return (
    <section className="mx-auto w-full max-w-7xl py-12">
      {/* Header */}
      <div className="mx-auto mb-12 max-w-3xl text-center">
        <p className="font-script text-3xl text-brand-pink">at a glance</p>

        <RevealText className="mt-3 font-display font-extrabold text-4xl md:text-5xl text-ink leading-tight">
          Compare Your Options
        </RevealText>

        <p className="mt-4 text-lg leading-8 text-muted-foreground">
          Review the key differences side by side so you can make the best
          decision with confidence.
        </p>
      </div>

      {/* Desktop Table */}
      <div className="hidden overflow-hidden rounded-3xl border border-border bg-card shadow-xl md:block">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-secondary/60">
              {headers.map((h, i) => (
                <th
                  key={i}
                  className="px-8 py-6 text-left font-display text-sm font-bold uppercase tracking-[0.18em] text-muted-foreground"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {rows.map((r, i) => (
              <tr
                key={i}
                className="border-t border-border transition-colors hover:bg-secondary/30"
              >
                {r.map((cell, j) => (
                  <td
                    key={j}
                    className={`px-8 py-7 align-top text-base leading-7 ${
                      j === 0
                        ? "w-72 font-display text-lg font-bold text-foreground"
                        : "text-foreground/80"
                    }`}
                  >
                    {renderInline(cell, `t${i}${j}`)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="grid gap-6 md:hidden">
        {rows.map((r, i) => (
          <div
            key={i}
            className="overflow-hidden rounded-3xl border border-border bg-card shadow-lg"
          >
            {/* Card Header */}
            <div className="border-b border-border bg-secondary/50 px-6 py-5">
              <h4 className="font-display text-xl font-black text-foreground">
                {r[0]}
              </h4>
            </div>

            {/* Card Content */}
            <div className="space-y-5 p-6">
              {headers.slice(1).map((h, j) => (
                <div
                  key={j}
                  className="border-b border-border/60 pb-5 last:border-0 last:pb-0"
                >
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-pink">
                    {h}
                  </p>

                  <p className="mt-2 text-base leading-7 text-foreground/80">
                    {renderInline(r[j + 1] ?? "", `mt${i}${j}`)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
function FaqBlock({ items }: { items: { q: string; a: string }[] }) {
  return (
    <section className="mx-auto w-full max-w-7xl ">
      {/* Header */}
      <div className="mx-auto mb-14 max-w-3xl text-center">
        <p className="font-script text-4xl text-brand-pink">Questions?</p>

        <RevealText className="mt-3 font-display font-extrabold text-4xl md:text-5xl text-ink leading-tight">
          We Have Answers
        </RevealText>

        <p className="mt-5 text-lg leading-8 text-muted-foreground">
          Everything you need to know before getting started.
        </p>
      </div>

      {/* FAQ Container */}
      <div className="rounded-3xl border border-border bg-card p-6 shadow-xl md:p-10">
        <Accordion
          type="single"
          collapsible
          className="mx-auto w-full max-w-6xl space-y-5"
        >
          {items.map((it, i) => (
            <AccordionItem
              key={i}
              value={`faq-${i}`}
              className="overflow-hidden rounded-2xl border border-border bg-background transition-all duration-300 hover:border-brand-pink/40 data-[state=open]:border-brand-pink/50 data-[state=open]:shadow-md"
            >
              <AccordionTrigger className="px-8 py-7 text-left font-display text-xl font-bold leading-relaxed hover:no-underline">
                {it.q}
              </AccordionTrigger>

              <AccordionContent className="px-8 pb-8 pt-0 text-lg leading-8 text-foreground/75">
                {renderInline(it.a, `fa${i}`)}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
function RelatedBlock({ links }: { links: { label: string; href: string }[] }) {
  if (!links.length) return null;

  return (
    <section className="mx-auto max-w-6xl py-16">
      {/* Header */}
      <div className="mx-auto mb-12 max-w-3xl text-center">
        <p className="font-script text-3xl text-brand-pink">Related Reading</p>

        <RevealText className="mt-3 font-display font-extrabold text-4xl md:text-5xl text-ink leading-tight">
          Continue Exploring
        </RevealText>

        <p className="mt-4 text-lg leading-8 text-muted-foreground">
          Discover more helpful guides and deepen your understanding with these
          related articles.
        </p>
      </div>

      {/* Cards */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {links.map((l, i) => (
          <a
            key={i}
            href={l.href}
            className="group rounded-3xl border border-border bg-card p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:border-brand-pink hover:shadow-xl"
          >
            <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-pink/10 text-brand-pink transition-colors group-hover:bg-brand-pink group-hover:text-white">
              <BookOpen className="h-6 w-6" />
            </div>

            <h3 className="font-display text-lg font-bold text-foreground transition-colors group-hover:text-brand-pink">
              {l.label}
            </h3>

            <div className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-brand-pink">
              Read Guide
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
/* -------------------------------------------------------------------------- */
/*  Main renderer                                                             */
/* -------------------------------------------------------------------------- */

export function ArticleRenderer({ markdown }: { markdown: string }) {
  const blocks = parseArticle(markdown);

  const introKinds = new Set(["byline", "notice", "quickAnswer", "takeaways"]);
  const intro = blocks.filter((b) => introKinds.has(b.kind));
  const body = blocks.filter((b) => !introKinds.has(b.kind));

  // Separate content types
  const simpleSections = body.filter((b) => b.kind === "section");
  const allCallouts: Callout[] = body.flatMap((b) =>
    b.kind === "section" ? b.callouts : [],
  );

  // Separate final CTA and other blocks
  const finalCtaBlock = body.find((b) => b.kind === "finalCta");
  const otherBlocks = body.filter(
    (b) => b.kind !== "finalCta" && b.kind !== "section",
  );

  let sectionIndex = 0;

  return (
    <div className="space-y-16">
      {/* Intro: Quick Answer + Takeaways */}
      {intro.length > 0 && (
        <div className="rounded-3xl border border-border bg-zinc-950 p-6 sm:p-8 shadow-lg">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {intro.map((b, i) => {
              if (b.kind === "quickAnswer")
                return <QuickAnswerCard key={i} text={b.text} />;
              if (b.kind === "takeaways")
                return <TakeawaysCard key={i} items={b.items} />;
              return null;
            })}
          </div>
        </div>
      )}

      {simpleSections.length > 0 && (
        <section className="space-y-12">
          {/* Header */}
          <div className="mx-auto  pt-12 max-w-3xl text-center">
            <p className="font-script text-3xl text-brand-pink">Explore</p>

            <RevealText className="mt-3 font-display font-extrabold text-4xl md:text-5xl text-ink leading-tight">
              Everything You Need to Know
            </RevealText>

            <p className="mt-5 text-lg leading-8 text-muted-foreground">
              Discover each important aspect in detail. These sections explain
              the key information, benefits, process, pricing, and everything
              else you should know before making a decision.
            </p>
          </div>

          {/* Cards */}
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {simpleSections.map((b, i) => {
              const idx = sectionIndex++;
              return <SectionBlock key={i} block={b} index={idx} />;
            })}
          </div>
        </section>
      )}

      {/* 2. Badge Cards Group (Callouts) */}
      {allCallouts.length > 0 && (
        <section className="space-y-12">
          {/* Header */}
          <div className="mx-auto pt-12 max-w-3xl text-center">
            <p className="font-script text-3xl text-brand-pink">
              Key Highlights
            </p>

            <RevealText className="mt-3 font-display font-extrabold text-4xl md:text-5xl text-ink leading-tight">
              Important Insights at a Glance
            </RevealText>

            <p className="mt-5 text-lg leading-8 text-muted-foreground">
              Here's a quick summary of the most important information, expert
              insights, pricing notes, and recommendations to help you
              understand the topic without reading every detail.
            </p>
          </div>

          {/* Cards */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {allCallouts.map((c, i) => (
              <CalloutCard key={i} callout={c} />
            ))}
          </div>
        </section>
      )}

      {/* Final CTA - Rendered BEFORE other blocks */}
      {finalCtaBlock && (
        <Fragment key="final-cta">
          <div className="rounded-3xl bg-zinc-950 p-10 sm:p-14 md:p-16 text-white overflow-hidden relative">
            <div className="absolute inset-0 bg-[radial-gradient(at_20%_30%,rgba(236,72,153,0.08),transparent)]" />
            <div className="relative max-w-2xl mx-auto text-center">
              <p className="font-script text-4xl md:text-5xl text-pink-400">
                let's talk
              </p>
              <p className="mt-5 font-display text-3xl sm:text-4xl md:text-5xl font-black leading-tight">
                {renderInline(
                  finalCtaBlock.text
                    .replace(/^\*?\*?[^*]+\*?\*?\s*/, "")
                    .split(".")[0] + ".",
                  `cta-final`,
                )}
              </p>
              <div className="mt-10">
                <a
                  href="/#contact"
                  className="group inline-flex h-14 items-center justify-center gap-3 rounded-2xl bg-white px-10 text-base font-semibold text-zinc-950 transition-all hover:scale-105 active:scale-95 shadow-xl"
                >
                  Request a quote
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </a>
              </div>
            </div>
          </div>
        </Fragment>
      )}

      {/* Remaining Blocks (Table, FAQ, Related, Sources) - WITHOUT finalCta */}
      {otherBlocks.map((b, i) => {
        switch (b.kind) {
          case "table":
            return (
              <ComparisonTable key={i} headers={b.headers} rows={b.rows} />
            );
          case "faqs":
            return <FaqBlock key={i} items={b.items} />;
          case "related":
            return <RelatedBlock key={i} links={b.links} />;
          case "sources":
            return (
              <p
                key={i}
                className="border-t border-border pt-6 text-xs italic text-muted-foreground"
              >
                {renderInline(b.text, `sr${i}`)}
              </p>
            );
          default:
            return null;
        }
      })}
    </div>
  );
}
export default ArticleRenderer;
