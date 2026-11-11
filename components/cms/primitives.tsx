import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { CSSProperties, ReactNode } from "react";
import { CmsMotion } from "./CmsMotion";
import {
  isExternalUrl,
  safeImageUrl,
  safeUrl,
  sanitizeHtml,
  text,
} from "@/lib/cms/sanitize";
import type { CmsSectionSettings } from "@/lib/cms/types";

/* ------------------------------------------------------------------ */
/* Look & feel = this website's own design system (app/styles.css and   */
/* components/landing/*): cream page, ink text, hot-pink accents,       */
/* Montserrat display headings, Caveat script eyebrows, rounded-3xl     */
/* cards with the hover lift, pink pill + ink outline buttons.          */
/*                                                                      */
/* A few CSS vars switch per section background so the same classes   */
/* work on cream, white, muted and dark (ink) bands.                    */
/* ------------------------------------------------------------------ */

const LIGHT_TONE: CSSProperties = {
  ["--cms-bg" as string]: "var(--cream)",
  ["--cms-fg" as string]: "var(--ink)",
  ["--cms-fg-muted" as string]:
    "color-mix(in oklab, var(--ink) 70%, transparent)",
  ["--cms-border" as string]:
    "color-mix(in oklab, var(--ink) 10%, transparent)",
  ["--cms-card" as string]: "#ffffff",
};

const DARK_TONE: CSSProperties = {
  ["--cms-bg" as string]: "var(--ink)",
  ["--cms-fg" as string]: "var(--cream)",
  ["--cms-fg-muted" as string]:
    "color-mix(in oklab, var(--cream) 70%, transparent)",
  ["--cms-border" as string]:
    "color-mix(in oklab, var(--cream) 10%, transparent)",
  ["--cms-card" as string]: "color-mix(in oklab, var(--cream) 4%, transparent)",
};

/** Default tone for a CMS page (set on <main> by CmsPage). */
export const PAGE_TONE = LIGHT_TONE;

const BACKGROUND_STYLE: Record<string, CSSProperties> = {
  light: {
    ...LIGHT_TONE,
    ["--cms-bg" as string]: "#ffffff",
    ["--cms-card" as string]: "var(--cream)",
    background: "#ffffff",
  },
  muted: {
    ...LIGHT_TONE,
    ["--cms-bg" as string]: "var(--muted)",
    background: "var(--muted)",
  },
  dark: { ...DARK_TONE, background: "var(--ink)" },
  primary: {
    ...DARK_TONE,
    ["--cms-bg" as string]: "var(--hot-pink)",
    ["--cms-fg" as string]: "#ffffff",
    ["--cms-fg-muted" as string]: "rgba(255,255,255,0.85)",
    ["--cms-border" as string]: "rgba(255,255,255,0.25)",
    ["--cms-card" as string]: "rgba(255,255,255,0.12)",
    background: "var(--gradient-brand)",
  },
};

const WIDTH_CLASS: Record<string, string> = {
  narrow: "max-w-4xl",
  wide: "max-w-[85vw]",
  full: "max-w-none",
};

function clampPx(value: unknown, fallback: number): number {
  const n = Number(value);
  if (!Number.isFinite(n)) return fallback;
  return Math.max(0, Math.min(400, Math.round(n)));
}

/** Honors settings.width / paddingY / background / motion. */
export function SectionShell({
  type,
  id,
  settings,
  children,
  defaultPadding = [96, 96],
  defaultWidth = "wide",
}: {
  type: string;
  id?: string;
  settings?: CmsSectionSettings;
  children: ReactNode;
  defaultPadding?: [number, number];
  defaultWidth?: "narrow" | "wide" | "full";
}) {
  const s = settings ?? {};
  const padding = Array.isArray(s.paddingY) ? s.paddingY : [];
  const top = clampPx(padding[0], defaultPadding[0]);
  const bottom = clampPx(padding[1] ?? padding[0], defaultPadding[1]);
  const width =
    WIDTH_CLASS[String(s.width ?? defaultWidth)] ?? WIDTH_CLASS[defaultWidth];
  const bg = BACKGROUND_STYLE[String(s.background ?? "")] ?? {};
  const motion =
    typeof s.motion === "string" && s.motion !== "none" && s.motion !== "";

  const inner = <div className={`mx-auto w-full ${width}`}>{children}</div>;

  return (
    <section
      id={id ? `cms-${id.replace(/[^A-Za-z0-9_-]/g, "")}` : undefined}
      data-cms-section={type}
      className="relative overflow-hidden px-6 text-[var(--cms-fg)] lg:px-10"
      style={{
        paddingTop: `clamp(${Math.round(top * 0.6)}px, ${(top / 14.4).toFixed(2)}vw, ${top}px)`,
        paddingBottom: `clamp(${Math.round(bottom * 0.6)}px, ${(bottom / 14.4).toFixed(2)}vw, ${bottom}px)`,
        ...bg,
      }}
    >
      {motion ? (
        <CmsMotion motion={String(s.motion)}>{inner}</CmsMotion>
      ) : (
        inner
      )}
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Grid columns (settings.columns, literal classes for Tailwind)        */
/* ------------------------------------------------------------------ */

const COLUMN_CLASS: Record<number, string> = {
  1: "grid-cols-1",
  2: "grid-cols-1 sm:grid-cols-2",
  3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
  4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
  5: "grid-cols-2 md:grid-cols-3 lg:grid-cols-5",
  6: "grid-cols-2 md:grid-cols-3 lg:grid-cols-6",
};

export function gridClass(columns: unknown, fallback = 3): string {
  const n = Math.round(Number(columns));
  return COLUMN_CLASS[n >= 1 && n <= 6 ? n : fallback];
}

/* ------------------------------------------------------------------ */
/* Section heading: script eyebrow + display heading + lead (site style) */
/* ------------------------------------------------------------------ */

export function SectionIntro({
  eyebrow,
  heading,
  description,
  center = false,
  as: Heading = "h2",
}: {
  eyebrow?: unknown;
  heading?: unknown;
  description?: unknown;
  center?: boolean;
  as?: "h1" | "h2";
}) {
  const e = text(eyebrow);
  const h = text(heading);
  const d = text(description);
  if (!e && !h && !d) return null;

  return (
    <div
      className={`mb-12 ${center ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}`}
    >
      {e && <p className="font-script text-3xl text-hot-pink">{e}</p>}
      {h && (
        <Heading
          className={`mt-1 font-display font-extrabold leading-tight tracking-tight text-[var(--cms-fg)] ${
            Heading === "h1"
              ? "text-5xl md:text-6xl lg:text-7xl"
              : "text-4xl md:text-5xl"
          }`}
        >
          {h}
        </Heading>
      )}
      {d && (
        <p
          className={`mt-4 text-lg leading-8 text-[var(--cms-fg-muted)] ${center ? "mx-auto max-w-2xl" : ""}`}
        >
          {d}
        </p>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Links & buttons                                                      */
/* ------------------------------------------------------------------ */

/** Link that only renders when the URL passes the A6 allow-list. */
export function CmsLink({
  url,
  newTab,
  className,
  children,
}: {
  url: unknown;
  newTab?: boolean;
  className?: string;
  children: ReactNode;
}) {
  const href = safeUrl(url);
  if (!href) return <span className={className}>{children}</span>;

  const blank = newTab === true;
  const extra = blank ? { target: "_blank", rel: "noopener noreferrer" } : {};
  if (isExternalUrl(href) || /^(mailto|tel):/i.test(href)) {
    return (
      <a href={href} className={className} {...extra}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={className} {...extra}>
      {children}
    </Link>
  );
}

// Same as the Hero's "pink pill" and "ink outline" buttons.
const BUTTON_PRIMARY =
  "group inline-flex items-center gap-2 rounded-full bg-hot-pink px-7 py-4 font-semibold text-white shadow-[0_18px_50px_-18px_color-mix(in_oklab,var(--color-hot-pink)_70%,transparent)] transition-transform duration-300 hover:-translate-y-0.5";
const BUTTON_SECONDARY =
  "inline-flex items-center gap-2 rounded-full border-2 border-[var(--cms-fg)] px-7 py-4 font-semibold text-[var(--cms-fg)] transition-colors hover:bg-[var(--cms-fg)] hover:text-[var(--cms-bg)]";

export function CmsButton({
  label,
  url,
  variant = "primary",
}: {
  label: unknown;
  url: unknown;
  variant?: "primary" | "secondary";
}) {
  const l = text(label);
  if (!l || !safeUrl(url)) return null;
  return (
    <CmsLink
      url={url}
      className={variant === "primary" ? BUTTON_PRIMARY : BUTTON_SECONDARY}
    >
      {l}
      {variant === "primary" && (
        <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
      )}
    </CmsLink>
  );
}

export function ButtonRow({
  primaryLabel,
  primaryUrl,
  secondaryLabel,
  secondaryUrl,
  buttonStyle,
  center = false,
}: {
  primaryLabel?: unknown;
  primaryUrl?: unknown;
  secondaryLabel?: unknown;
  secondaryUrl?: unknown;
  buttonStyle?: unknown;
  center?: boolean;
}) {
  const hasPrimary = text(primaryLabel) && safeUrl(primaryUrl);
  const hasSecondary = text(secondaryLabel) && safeUrl(secondaryUrl);
  if (!hasPrimary && !hasSecondary) return null;
  const outline = buttonStyle === "outline" || buttonStyle === "ghost";
  return (
    <div
      className={`mt-10 flex flex-wrap items-center gap-4 ${center ? "justify-center" : ""}`}
    >
      <CmsButton
        label={primaryLabel}
        url={primaryUrl}
        variant={outline ? "secondary" : "primary"}
      />
      <CmsButton
        label={secondaryLabel}
        url={secondaryUrl}
        variant="secondary"
      />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Images, rich text, cards, icons                                      */
/* ------------------------------------------------------------------ */

export function CmsImage({
  src,
  alt,
  className,
}: {
  src: unknown;
  alt?: unknown;
  className?: string;
}) {
  const url = safeImageUrl(src);
  if (!url) return null;
  // Plain <img>: CMS images come from arbitrary hosts.
  return (
    <img
      src={url}
      alt={text(alt)}
      loading="lazy"
      decoding="async"
      className={className}
    />
  );
}

// Typography of the site's service articles (ArticleRenderer).
const PROSE =
  "text-base leading-8 text-[var(--cms-fg-muted)] md:text-[1.05rem] " +
  "[&_a]:font-semibold [&_a]:text-brand-pink [&_a:hover]:underline [&_strong]:font-bold [&_strong]:text-[var(--cms-fg)] " +
  "[&_h1]:mt-12 [&_h1]:mb-4 [&_h1]:font-display [&_h1]:text-4xl [&_h1]:font-extrabold [&_h1]:text-[var(--cms-fg)] " +
  "[&_h2]:mt-12 [&_h2]:mb-4 [&_h2]:font-display [&_h2]:text-3xl [&_h2]:font-extrabold [&_h2]:text-[var(--cms-fg)] " +
  "[&_h3]:mt-8 [&_h3]:mb-3 [&_h3]:font-display [&_h3]:text-2xl [&_h3]:font-bold [&_h3]:text-[var(--cms-fg)] " +
  "[&_h4]:mt-6 [&_h4]:mb-2 [&_h4]:font-display [&_h4]:text-xl [&_h4]:font-bold [&_h4]:text-[var(--cms-fg)] " +
  "[&_p]:mb-5 [&_ul]:mb-5 [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:mb-5 [&_ol]:list-decimal [&_ol]:pl-6 [&_li]:mb-2 [&_li]:marker:text-hot-pink " +
  "[&_blockquote]:my-6 [&_blockquote]:rounded-3xl [&_blockquote]:border [&_blockquote]:border-[var(--cms-border)] [&_blockquote]:bg-[var(--cms-card)] [&_blockquote]:p-6 [&_blockquote]:font-script [&_blockquote]:text-2xl [&_blockquote]:text-brand-pink " +
  "[&_img]:my-8 [&_img]:rounded-3xl [&_code]:rounded [&_code]:bg-secondary [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:font-mono [&_code]:text-[0.85em] " +
  "[&_pre]:overflow-x-auto [&_pre]:rounded-3xl [&_pre]:bg-zinc-950 [&_pre]:p-6 [&_pre]:text-white " +
  "[&_table]:my-6 [&_table]:w-full [&_table]:overflow-hidden [&_table]:rounded-3xl [&_th]:bg-secondary/60 [&_th]:p-3 [&_th]:text-left [&_th]:font-display [&_th]:text-[var(--cms-fg)] [&_td]:border-t [&_td]:border-[var(--cms-border)] [&_td]:p-3";

/** The ONLY place CMS HTML reaches the DOM — always through the A6 sanitizer. */
export function SafeHtml({
  html,
  className = "",
}: {
  html: unknown;
  className?: string;
}) {
  const clean = sanitizeHtml(html);
  if (!clean) return null;
  return (
    <div
      className={`${PROSE} ${className}`}
      dangerouslySetInnerHTML={{ __html: clean }}
    />
  );
}

// The site's card: rounded-3xl, hairline border, lift + pink border on hover.
export const CARD =
  "group relative rounded-3xl border border-[var(--cms-border)] bg-[var(--cms-card)] transition-all duration-300 hover:-translate-y-1 hover:border-hot-pink/40 hover:shadow-xl";

export function Card({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={`${CARD} p-7 ${className}`}>{children}</div>;
}

/** Card title that turns pink on card hover, as across the site. */
export const CARD_TITLE =
  "font-display text-xl font-bold text-[var(--cms-fg)] transition-colors group-hover:text-hot-pink";

export const CARD_BODY = "mt-3 text-sm leading-7 text-[var(--cms-fg-muted)]";

export function CmsIcon({ icon }: { icon: unknown }) {
  const value = text(icon).trim();
  if (!value) return null;
  if (safeImageUrl(value) && /[/.]/.test(value)) {
    return (
      <CmsImage src={value} alt="" className="mb-6 size-14 object-contain" />
    );
  }
  // Emoji / short glyphs render as text; longer icon names get a monogram.
  const glyph = [...value].length <= 3 ? value : value.charAt(0).toUpperCase();
  return (
    <div className="mb-6 grid size-14 place-items-center rounded-2xl bg-gradient-to-br from-electric/10 to-hot-pink/10 font-display text-xl font-bold text-[var(--cms-fg)] transition-all duration-500 group-hover:from-electric group-hover:to-hot-pink group-hover:text-white">
      {glyph}
    </div>
  );
}

export function asItems(value: unknown): Record<string, unknown>[] {
  return Array.isArray(value)
    ? value.filter(
        (v): v is Record<string, unknown> => !!v && typeof v === "object",
      )
    : [];
}
