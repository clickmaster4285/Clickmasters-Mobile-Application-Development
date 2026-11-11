import type { ReactNode } from "react";
import { ArrowRight, Check, Mail, MapPin, Phone, Quote } from "lucide-react";
import { safeUrl, text } from "@/lib/cms/sanitize";
import type { CmsPost, CmsSection } from "@/lib/cms/types";
import { CmsFaq } from "./CmsFaq";
import {
  ButtonRow,
  CARD,
  CARD_BODY,
  CARD_TITLE,
  Card,
  CmsButton,
  CmsIcon,
  CmsImage,
  CmsLink,
  SafeHtml,
  SectionIntro,
  SectionShell,
  asItems,
  gridClass,
} from "./primitives";

// Every A4 section type, rendered with this website's own visual language
// (see primitives.tsx). Unknown types never reach here (CmsSectionRenderer).

export type SectionProps = {
  section: CmsSection;
  posts: CmsPost[];
  isFirst: boolean;
};

type C = Record<string, unknown>;

function shell(
  props: SectionProps,
  children: ReactNode,
  opts: Partial<Parameters<typeof SectionShell>[0]> = {},
) {
  return (
    <SectionShell
      type={props.section.type ?? ""}
      id={props.section.id}
      settings={props.section.settings}
      {...opts}
    >
      {children}
    </SectionShell>
  );
}

const layoutOf = (p: SectionProps) => String(p.section.settings?.layout ?? "");
const contentOf = (p: SectionProps): C => p.section.content ?? {};

const SHADOW = "shadow-[0_30px_70px_-30px_rgba(0,0,0,0.3)]";
const ARROW_LINK =
  "mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-hot-pink";

/* ---------------------------- chrome ---------------------------- */

function HeaderSection(p: SectionProps) {
  const c = contentOf(p);
  const items = asItems(c.navItems);
  return shell(
    p,
    <div className="flex flex-wrap items-center justify-between gap-5 rounded-full bg-ink px-6 py-3 text-cream">
      <CmsLink
        url="/"
        className="flex items-center gap-3 font-display font-bold"
      >
        {c.showLogo !== false && c.logoImage ? (
          <CmsImage src={c.logoImage} alt={c.logoText} className="h-5 w-auto" />
        ) : null}
        {text(c.logoText)}
      </CmsLink>
      {items.length > 0 && (
        <nav className="flex flex-wrap gap-6 text-sm font-medium text-cream/80">
          {items.map((item, i) => (
            <CmsLink
              key={i}
              url={item.url}
              newTab={item.newTab === true}
              className="transition-colors hover:text-cream"
            >
              {text(item.label)}
            </CmsLink>
          ))}
        </nav>
      )}
      <CmsButton label={c.ctaLabel} url={c.ctaUrl} />
    </div>,
    { defaultPadding: [24, 24] },
  );
}

function FooterSection(p: SectionProps) {
  const c = contentOf(p);
  return shell(
    p,
    <div className="flex flex-col gap-3 border-t border-[var(--cms-border)] pt-8 text-sm text-[var(--cms-fg-muted)] md:flex-row md:items-center md:justify-between">
      <div>
        {text(c.logoText) && (
          <div className="font-display font-bold text-[var(--cms-fg)]">
            {text(c.logoText)}
          </div>
        )}
        {text(c.tagline) && <div className="mt-1">{text(c.tagline)}</div>}
      </div>
      {text(c.copyright) && <div className="text-xs">{text(c.copyright)}</div>}
    </div>,
    { defaultPadding: [48, 48] },
  );
}

/* ----------------------------- hero ----------------------------- */

function HeroSection(p: SectionProps) {
  const c = contentOf(p);
  const split = layoutOf(p) === "split" && !!c.image;
  const center = !split && layoutOf(p) !== "left";
  const Heading = p.isFirst ? "h1" : "h2";

  const copy = (
    <div className={center ? "mx-auto max-w-4xl text-center" : ""}>
      {/* Same pill as the home Hero */}
      {text(c.eyebrow) && (
        <div className="inline-flex items-center gap-2 rounded-full border border-[var(--cms-border)] bg-[var(--cms-card)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-[var(--cms-fg-muted)] backdrop-blur-sm">
          <span className="h-2 w-2 rounded-full bg-hot-pink" />
          {text(c.eyebrow)}
        </div>
      )}
      {text(c.heading) && (
        <Heading className="mt-6 text-balance font-display text-5xl font-extrabold leading-[0.95] tracking-tight text-[var(--cms-fg)] md:text-6xl lg:text-7xl">
          {text(c.heading)}
        </Heading>
      )}
      {text(c.description) && (
        <p
          className={`mt-8 max-w-xl text-lg leading-relaxed text-[var(--cms-fg-muted)] ${center ? "mx-auto" : ""}`}
        >
          {text(c.description)}
        </p>
      )}
      <ButtonRow {...c} center={center} />
      {text(c.meta) && (
        <div className="mt-8 text-xs uppercase tracking-[0.3em] text-[var(--cms-fg-muted)]">
          {text(c.meta)}
        </div>
      )}
    </div>
  );

  const imageClass = `w-full rounded-3xl border border-[var(--cms-border)] object-cover ${SHADOW}`;

  return shell(
    p,
    split ? (
      <div className="grid items-center gap-12 lg:grid-cols-2">
        {copy}
        <CmsImage src={c.image} alt={c.heading} className={imageClass} />
      </div>
    ) : (
      <>
        {copy}
        {c.image ? (
          <CmsImage
            src={c.image}
            alt={c.heading}
            className={`mx-auto mt-16 ${imageClass}`}
          />
        ) : null}
      </>
    ),
    // A first hero clears the fixed Navbar like the site's pages (pt-36).
    { defaultPadding: p.isFirst ? [144, 96] : [96, 96] },
  );
}

/* ----------------------------- text ----------------------------- */

function TextSection(p: SectionProps) {
  const c = contentOf(p);
  return shell(
    p,
    <>
      <SectionIntro heading={c.heading} />
      {text(c.body) && (
        <div className="whitespace-pre-line text-lg leading-8 text-[var(--cms-fg-muted)]">
          {text(c.body)}
        </div>
      )}
    </>,
    { defaultWidth: "narrow" },
  );
}

function RichTextSection(p: SectionProps) {
  const c = contentOf(p);
  return shell(
    p,
    <>
      <SectionIntro heading={c.heading} />
      <SafeHtml html={c.bodyHtml} />
    </>,
    { defaultWidth: "narrow" },
  );
}

function CustomContentSection(p: SectionProps) {
  return RichTextSection(p);
}

function HtmlSection(p: SectionProps) {
  const c = contentOf(p);
  return shell(p, <SafeHtml html={c.code} />);
}

function ImageSection(p: SectionProps) {
  const c = contentOf(p);
  return shell(
    p,
    <figure>
      <CmsImage
        src={c.image}
        alt={c.alt ?? c.caption}
        className={`w-full rounded-3xl border border-[var(--cms-border)] object-cover ${SHADOW}`}
      />
      {text(c.caption) && (
        <figcaption className="mt-4 text-center font-script text-2xl text-brand-pink">
          {text(c.caption)}
        </figcaption>
      )}
    </figure>,
  );
}

function ImageTextSection(p: SectionProps) {
  const c = contentOf(p);
  const reverse = /left|reverse/i.test(layoutOf(p));
  return shell(
    p,
    <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
      <div className={reverse ? "lg:order-2" : ""}>
        <SectionIntro eyebrow={c.eyebrow} heading={c.heading} />
        <SafeHtml html={c.bodyHtml} />
        <ButtonRow primaryLabel={c.primaryLabel} primaryUrl={c.primaryUrl} />
      </div>
      <div className={reverse ? "lg:order-1" : ""}>
        <CmsImage
          src={c.image}
          alt={c.alt ?? c.heading}
          className={`w-full rounded-3xl border border-[var(--cms-border)] object-cover ${SHADOW}`}
        />
      </div>
    </div>,
  );
}

function videoEmbed(
  url: string,
): { kind: "iframe" | "video"; src: string } | null {
  try {
    const u = new URL(url);
    const host = u.hostname.replace(/^www\./, "");
    if (host === "youtu.be")
      return {
        kind: "iframe",
        src: `https://www.youtube-nocookie.com/embed/${encodeURIComponent(u.pathname.slice(1))}`,
      };
    if (host.endsWith("youtube.com")) {
      const id =
        u.searchParams.get("v") ?? u.pathname.split("/").filter(Boolean).pop();
      if (id)
        return {
          kind: "iframe",
          src: `https://www.youtube-nocookie.com/embed/${encodeURIComponent(id)}`,
        };
    }
    if (host === "vimeo.com" || host === "player.vimeo.com") {
      const id = u.pathname.split("/").filter(Boolean).pop();
      if (id && /^\d+$/.test(id))
        return { kind: "iframe", src: `https://player.vimeo.com/video/${id}` };
    }
    if (/\.(mp4|webm|ogg)$/i.test(u.pathname))
      return { kind: "video", src: u.toString() };
  } catch {
    // Relative video file.
    if (url.startsWith("/") && /\.(mp4|webm|ogg)$/i.test(url))
      return { kind: "video", src: url };
  }
  return null;
}

function VideoSection(p: SectionProps) {
  const c = contentOf(p);
  const url = safeUrl(c.videoUrl);
  const embed = url ? videoEmbed(url) : null;
  return shell(
    p,
    <>
      <SectionIntro heading={c.heading} description={c.description} center />
      {embed && (
        <div
          className={`aspect-video overflow-hidden rounded-3xl border border-[var(--cms-border)] bg-ink ${SHADOW}`}
        >
          {embed.kind === "iframe" ? (
            <iframe
              src={embed.src}
              title={text(c.heading) || "Video"}
              className="h-full w-full"
              loading="lazy"
              allow="accelerometer; encrypted-media; gyroscope; picture-in-picture; fullscreen"
              referrerPolicy="strict-origin-when-cross-origin"
            />
          ) : (
            <video
              src={embed.src}
              controls
              preload="metadata"
              className="h-full w-full"
            />
          )}
        </div>
      )}
    </>,
  );
}

/* ------------------------- list sections ------------------------- */

function CardsSection(p: SectionProps) {
  const c = contentOf(p);
  return shell(
    p,
    <>
      <SectionIntro heading={c.heading} description={c.description} />
      <div
        className={`grid gap-6 ${gridClass(p.section.settings?.columns, 3)}`}
      >
        {asItems(c.items).map((item, i) => {
          const body = (
            <div className={`${CARD} flex h-full flex-col overflow-hidden`}>
              {item.image ? (
                <div className="aspect-[4/3] w-full overflow-hidden">
                  <CmsImage
                    src={item.image}
                    alt={item.title}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
              ) : null}
              <div className="flex flex-1 flex-col p-7">
                <h3 className={CARD_TITLE}>{text(item.title)}</h3>
                {text(item.description) && (
                  <p className={`${CARD_BODY} flex-1`}>
                    {text(item.description)}
                  </p>
                )}
                {text(item.linkLabel) && safeUrl(item.url) && (
                  <div className={ARROW_LINK}>
                    {text(item.linkLabel)}
                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                  </div>
                )}
              </div>
            </div>
          );
          return safeUrl(item.url) ? (
            <CmsLink key={i} url={item.url} className="block">
              {body}
            </CmsLink>
          ) : (
            <div key={i}>{body}</div>
          );
        })}
      </div>
    </>,
  );
}

function FeaturesSection(p: SectionProps) {
  const c = contentOf(p);
  return shell(
    p,
    <>
      <SectionIntro heading={c.heading} description={c.description} />
      <div
        className={`grid gap-6 ${gridClass(p.section.settings?.columns, 3)}`}
      >
        {asItems(c.items).map((item, i) => (
          <Card key={i} className="h-full">
            <CmsIcon icon={item.icon} />
            <CmsImage
              src={item.image}
              alt={item.title}
              className="mb-6 w-full rounded-2xl object-cover"
            />
            <h3 className={CARD_TITLE}>{text(item.title)}</h3>
            {text(item.description) && (
              <p className={CARD_BODY}>{text(item.description)}</p>
            )}
          </Card>
        ))}
      </div>
    </>,
  );
}

function ServicesSection(p: SectionProps) {
  const c = contentOf(p);
  return shell(
    p,
    <>
      <SectionIntro heading={c.heading} description={c.description} />
      <div
        className={`grid gap-6 ${gridClass(p.section.settings?.columns, 3)}`}
      >
        {asItems(c.items).map((item, i) => {
          const linked = !!safeUrl(item.url);
          const body = (
            <Card className="h-full">
              <CmsIcon icon={item.icon} />
              <h3 className={CARD_TITLE}>{text(item.title)}</h3>
              {text(item.description) && (
                <p className={CARD_BODY}>{text(item.description)}</p>
              )}
              {linked && (
                <div className={ARROW_LINK}>
                  Learn more
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                </div>
              )}
            </Card>
          );
          return linked ? (
            <CmsLink key={i} url={item.url} className="block">
              {body}
            </CmsLink>
          ) : (
            <div key={i}>{body}</div>
          );
        })}
      </div>
    </>,
  );
}

function BenefitsSection(p: SectionProps) {
  const c = contentOf(p);
  return shell(
    p,
    <>
      <SectionIntro heading={c.heading} description={c.description} />
      <ul className={`grid gap-4 ${gridClass(p.section.settings?.columns, 2)}`}>
        {asItems(c.items).map((item, i) => (
          <li
            key={i}
            className="flex items-start gap-4 rounded-3xl border border-[var(--cms-border)] bg-[var(--cms-card)] p-6"
          >
            <span className="mt-1 grid size-6 shrink-0 place-items-center rounded-full bg-brand-pink/10 text-brand-pink">
              <Check className="size-3.5" strokeWidth={3} />
            </span>
            <div>
              <h3 className="font-display text-lg font-bold text-[var(--cms-fg)]">
                {text(item.title)}
              </h3>
              {text(item.description) && (
                <p className="mt-1 text-sm leading-7 text-[var(--cms-fg-muted)]">
                  {text(item.description)}
                </p>
              )}
            </div>
          </li>
        ))}
      </ul>
    </>,
  );
}

function ProcessSection(p: SectionProps) {
  const c = contentOf(p);
  return shell(
    p,
    <>
      <SectionIntro heading={c.heading} description={c.description} />
      <ol className={`grid gap-6 ${gridClass(p.section.settings?.columns, 4)}`}>
        {asItems(c.items).map((item, i) => (
          <li key={i}>
            <Card className="h-full">
              <div className="font-script text-4xl text-hot-pink">
                {String(i + 1).padStart(2, "0")}
              </div>
              <h3 className={`mt-3 ${CARD_TITLE}`}>{text(item.title)}</h3>
              {text(item.description) && (
                <p className={CARD_BODY}>{text(item.description)}</p>
              )}
            </Card>
          </li>
        ))}
      </ol>
    </>,
  );
}

function TimelineSection(p: SectionProps) {
  const c = contentOf(p);
  return shell(
    p,
    <>
      <SectionIntro heading={c.heading} description={c.description} />
      <ol className="relative space-y-10 border-l-2 border-[var(--cms-border)] pl-8">
        {asItems(c.items).map((item, i) => (
          <li key={i} className="relative">
            <span
              aria-hidden
              className="absolute -left-[41px] top-1 size-4 rounded-full bg-gradient-to-br from-hot-pink to-electric ring-4 ring-[var(--cms-bg)]"
            />
            {text(item.date) && (
              <div className="font-script text-2xl text-brand-pink">
                {text(item.date)}
              </div>
            )}
            <h3 className="mt-1 font-display text-xl font-bold text-[var(--cms-fg)]">
              {text(item.title)}
            </h3>
            {text(item.description) && (
              <p className="mt-2 leading-7 text-[var(--cms-fg-muted)]">
                {text(item.description)}
              </p>
            )}
          </li>
        ))}
      </ol>
    </>,
    { defaultWidth: "narrow" },
  );
}

function TestimonialsSection(p: SectionProps) {
  const c = contentOf(p);
  return shell(
    p,
    <>
      <SectionIntro heading={c.heading} center />
      <div
        className={`grid gap-6 ${gridClass(p.section.settings?.columns, 3)}`}
      >
        {asItems(c.items).map((item, i) => (
          <Card key={i} className="flex h-full flex-col">
            <Quote className="size-8 text-hot-pink" />
            <blockquote className="mt-4 flex-1 leading-relaxed text-[var(--cms-fg-muted)]">
              “{text(item.quote)}”
            </blockquote>
            <figcaption className="mt-6 flex items-center gap-3 border-t border-[var(--cms-border)] pt-5">
              {item.image ? (
                <CmsImage
                  src={item.image}
                  alt={item.name}
                  className="size-11 rounded-full object-cover"
                />
              ) : (
                <span className="size-10 rounded-full bg-gradient-to-br from-hot-pink to-electric" />
              )}
              <div>
                <div className="font-display font-bold text-[var(--cms-fg)]">
                  {text(item.name)}
                </div>
                {text(item.role) && (
                  <div className="text-xs text-[var(--cms-fg-muted)]">
                    {text(item.role)}
                  </div>
                )}
              </div>
            </figcaption>
          </Card>
        ))}
      </div>
    </>,
  );
}

function TeamSection(p: SectionProps) {
  const c = contentOf(p);
  return shell(
    p,
    <>
      <SectionIntro heading={c.heading} description={c.description} />
      <div
        className={`grid gap-6 ${gridClass(p.section.settings?.columns, 4)}`}
      >
        {asItems(c.items).map((item, i) => (
          <div key={i} className={`${CARD} overflow-hidden`}>
            <div className="aspect-square w-full overflow-hidden">
              <CmsImage
                src={item.image}
                alt={item.name}
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <div className="p-6">
              <h3 className={CARD_TITLE}>{text(item.name)}</h3>
              {text(item.role) && (
                <div className="mt-1 font-script text-xl text-brand-pink">
                  {text(item.role)}
                </div>
              )}
              {text(item.bio) && <p className={CARD_BODY}>{text(item.bio)}</p>}
            </div>
          </div>
        ))}
      </div>
    </>,
  );
}

function featureList(value: unknown): string[] {
  if (Array.isArray(value))
    return value
      .map((v) =>
        text(
          typeof v === "object" && v ? ((v as C).label ?? (v as C).title) : v,
        ),
      )
      .filter(Boolean);
  return text(value)
    .split(/\r?\n|,/)
    .map((s) => s.trim())
    .filter(Boolean);
}

function PricingSection(p: SectionProps) {
  const c = contentOf(p);
  return shell(
    p,
    <>
      <SectionIntro heading={c.heading} description={c.description} center />
      <div
        className={`grid gap-6 ${gridClass(p.section.settings?.columns, 3)}`}
      >
        {asItems(c.items).map((item, i) => {
          const featured = item.featured === true;
          return (
            <div
              key={i}
              className={`${CARD} flex flex-col p-8 ${
                featured
                  ? "border-hot-pink/60 shadow-[0_20px_50px_-20px_rgba(255,71,127,0.5)]"
                  : ""
              }`}
            >
              {featured && (
                <span className="absolute right-6 top-6 rounded-full bg-hot-pink px-3 py-1 text-xs font-bold text-white">
                  Popular
                </span>
              )}
              <h3 className="font-display text-xl font-bold text-[var(--cms-fg)]">
                {text(item.name)}
              </h3>
              <div className="mt-4 flex items-baseline gap-1">
                <span className="font-display text-5xl font-extrabold tracking-tight text-[var(--cms-fg)]">
                  {text(item.price)}
                </span>
                {text(item.period) && (
                  <span className="text-sm text-[var(--cms-fg-muted)]">
                    /{text(item.period)}
                  </span>
                )}
              </div>
              {text(item.description) && (
                <p className={CARD_BODY}>{text(item.description)}</p>
              )}
              <ul className="mt-6 flex-1 space-y-3 text-sm text-[var(--cms-fg-muted)]">
                {featureList(item.features).map((f, j) => (
                  <li key={j} className="flex items-start gap-3">
                    <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-brand-pink/10 text-brand-pink">
                      <Check className="size-3" strokeWidth={3} />
                    </span>
                    {f}
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <CmsButton
                  label={item.buttonLabel}
                  url={item.buttonUrl}
                  variant={featured ? "primary" : "secondary"}
                />
              </div>
            </div>
          );
        })}
      </div>
    </>,
  );
}

function FaqSection(p: SectionProps) {
  const c = contentOf(p);
  const faqs = asItems(c.items)
    .map((item) => ({
      question: text(item.question),
      answer: text(item.answer),
    }))
    .filter((f) => f.question);
  return shell(
    p,
    <>
      <SectionIntro heading={c.heading} description={c.description} center />
      {faqs.length > 0 && <CmsFaq faqs={faqs} />}
    </>,
    { defaultWidth: "narrow" },
  );
}

function GallerySection(p: SectionProps) {
  const c = contentOf(p);
  return shell(
    p,
    <>
      <SectionIntro heading={c.heading} description={c.description} />
      <div
        className={`grid gap-5 ${gridClass(p.section.settings?.columns, 3)}`}
      >
        {asItems(c.items).map((item, i) => (
          <figure key={i} className="group">
            <div className="overflow-hidden rounded-3xl border border-[var(--cms-border)]">
              <CmsImage
                src={item.image}
                alt={item.caption}
                className="aspect-[4/3] w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            {text(item.caption) && (
              <figcaption className="mt-3 text-sm text-[var(--cms-fg-muted)]">
                {text(item.caption)}
              </figcaption>
            )}
          </figure>
        ))}
      </div>
    </>,
  );
}

// Same stat style as the ebooks / blog hero ("40+  Free Ebooks").
function StatsSection(p: SectionProps) {
  const c = contentOf(p);
  return shell(
    p,
    <>
      <SectionIntro heading={c.heading} description={c.description} center />
      <dl className="flex flex-wrap justify-center gap-10 text-center md:gap-16">
        {asItems(c.items).map((item, i) => (
          <div key={i} className="flex flex-col">
            <dt className="order-2 text-sm text-[var(--cms-fg-muted)]">
              {text(item.label)}
            </dt>
            <dd className="font-display text-4xl font-bold text-brand-pink md:text-5xl">
              {text(item.value)}
            </dd>
          </div>
        ))}
      </dl>
    </>,
  );
}

function LogosSection(p: SectionProps) {
  const c = contentOf(p);
  return shell(
    p,
    <>
      {text(c.heading) && (
        <p className="mb-10 text-center text-xs font-semibold uppercase tracking-[0.3em] text-[var(--cms-fg-muted)]">
          {text(c.heading)}
        </p>
      )}
      <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-8">
        {asItems(c.items).map((item, i) => {
          const logo = (
            <CmsImage
              src={item.image}
              alt={item.name}
              className="h-10 w-auto max-w-[160px] object-contain opacity-60 grayscale transition-all hover:opacity-100 hover:grayscale-0"
            />
          );
          return safeUrl(item.url) ? (
            <CmsLink key={i} url={item.url} newTab>
              {logo}
            </CmsLink>
          ) : (
            <div key={i}>{logo}</div>
          );
        })}
      </div>
    </>,
    { defaultPadding: [64, 64] },
  );
}

/* ---------------------------- actions ---------------------------- */

// Same dark "let's talk" band as the service pages' CTASection.
function CtaSection(p: SectionProps) {
  const c = contentOf(p);
  return shell(
    p,
    <div className="overflow-hidden rounded-3xl bg-[#0a0a0a] p-10 text-center text-white sm:p-14 md:p-16">
      <div className="mx-auto max-w-2xl">
        <p className="font-script text-4xl tracking-tight text-primary md:text-5xl">
          let&apos;s talk
        </p>
        {text(c.heading) && (
          <h2 className="mt-4 font-display text-4xl font-black leading-tight sm:text-5xl md:text-6xl">
            {text(c.heading)}
          </h2>
        )}
        {text(c.description) && (
          <p className="mx-auto mt-6 max-w-md text-lg text-white/70">
            {text(c.description)}
          </p>
        )}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          {text(c.primaryLabel) && safeUrl(c.primaryUrl) && (
            <CmsLink
              url={c.primaryUrl}
              className="inline-flex items-center gap-2 rounded-full bg-primary px-8 py-4 text-base font-semibold text-white shadow-lg shadow-pink-500/30 transition-all hover:scale-105 hover:bg-[#ff4da8] active:scale-95"
            >
              {text(c.primaryLabel)}
              <span className="text-xl leading-none">→</span>
            </CmsLink>
          )}
          {text(c.secondaryLabel) && safeUrl(c.secondaryUrl) && (
            <CmsLink
              url={c.secondaryUrl}
              className="inline-flex items-center gap-2 rounded-full border-2 border-white/80 px-8 py-4 text-base font-semibold text-white transition-colors hover:bg-white hover:text-ink"
            >
              {text(c.secondaryLabel)}
            </CmsLink>
          )}
        </div>
      </div>
    </div>,
    { defaultPadding: [56, 56] },
  );
}

const INPUT =
  "h-12 w-full rounded-2xl border-2 border-[var(--cms-border)] bg-[var(--cms-card)] px-4 text-sm text-[var(--cms-fg)] placeholder:text-[var(--cms-fg-muted)] transition-colors focus:border-hot-pink focus:outline-none";

const SUBMIT =
  "inline-flex h-12 shrink-0 items-center justify-center gap-2 rounded-full bg-hot-pink px-7 font-semibold text-white shadow-[0_18px_50px_-18px_color-mix(in_oklab,var(--color-hot-pink)_70%,transparent)] transition-transform duration-300 hover:-translate-y-0.5";

const TILE =
  "flex items-start gap-4 rounded-3xl border border-[var(--cms-border)] bg-[var(--cms-card)] p-5";
const TILE_ICON =
  "grid size-10 shrink-0 place-items-center rounded-2xl bg-brand-pink/10 text-brand-pink";
const TILE_LABEL =
  "block text-xs uppercase tracking-[0.3em] text-[var(--cms-fg-muted)]";
const TILE_VALUE = "mt-1 block font-semibold text-[var(--cms-fg)]";

function ContactSection(p: SectionProps) {
  const c = contentOf(p);
  const action = safeUrl(c.formAction);
  const email = text(c.email);
  const phone = text(c.phone);
  const address = text(c.address);
  return shell(
    p,
    <div className="grid gap-12 lg:grid-cols-2">
      <div>
        <SectionIntro heading={c.heading} description={c.description} />
        <div className="space-y-3">
          {email && (
            <CmsLink url={`mailto:${email}`} className={TILE}>
              <span className={TILE_ICON}>
                <Mail className="size-5" />
              </span>
              <span>
                <span className={TILE_LABEL}>Email</span>
                <span className={`${TILE_VALUE} break-all`}>{email}</span>
              </span>
            </CmsLink>
          )}
          {phone && (
            <CmsLink
              url={`tel:${phone.replace(/[^\d+]/g, "")}`}
              className={TILE}
            >
              <span className={TILE_ICON}>
                <Phone className="size-5" />
              </span>
              <span>
                <span className={TILE_LABEL}>Phone</span>
                <span className={TILE_VALUE}>{phone}</span>
              </span>
            </CmsLink>
          )}
          {address && (
            <div className={TILE}>
              <span className={TILE_ICON}>
                <MapPin className="size-5" />
              </span>
              <span>
                <span className={TILE_LABEL}>Address</span>
                <span className={`${TILE_VALUE} whitespace-pre-line`}>
                  {address}
                </span>
              </span>
            </div>
          )}
        </div>
        <CmsImage
          src={c.image}
          alt={c.heading}
          className="mt-8 w-full rounded-3xl object-cover"
        />
      </div>
      {action ? (
        <form
          action={action}
          method="post"
          className="space-y-4 rounded-3xl border border-[var(--cms-border)] bg-[var(--cms-card)] p-7 md:p-8"
        >
          <input
            name="name"
            required
            placeholder="Name"
            className={INPUT}
            autoComplete="name"
          />
          <input
            name="email"
            type="email"
            required
            placeholder="Email"
            className={INPUT}
            autoComplete="email"
          />
          <input
            name="phone"
            type="tel"
            placeholder="Phone"
            className={INPUT}
            autoComplete="tel"
          />
          <textarea
            name="message"
            required
            rows={5}
            placeholder="Tell us about your app"
            className={`${INPUT} h-auto py-3`}
          />
          <button type="submit" className={SUBMIT}>
            {text(c.buttonLabel) || "Send message"}
            <ArrowRight className="size-4" />
          </button>
        </form>
      ) : (
        <div className="flex items-start">
          <CmsButton
            label={text(c.buttonLabel) || "Book a Call"}
            url="/contact"
          />
        </div>
      )}
    </div>,
  );
}

function NewsletterSection(p: SectionProps) {
  const c = contentOf(p);
  const action = safeUrl(c.formAction);
  return shell(
    p,
    <div className="mx-auto max-w-2xl text-center">
      <SectionIntro heading={c.heading} description={c.description} center />
      {action && (
        <form
          action={action}
          method="post"
          className="mx-auto flex max-w-md flex-col gap-3 sm:flex-row"
        >
          <input
            name="email"
            type="email"
            required
            placeholder="you@company.com"
            className={`${INPUT} rounded-full`}
            autoComplete="email"
          />
          <button type="submit" className={SUBMIT}>
            {text(c.buttonLabel) || "Subscribe"}
          </button>
        </form>
      )}
    </div>,
    { defaultWidth: "narrow" },
  );
}

/* ----------------------------- posts ----------------------------- */

type PostCard = {
  title: string;
  description: string;
  image?: unknown;
  url?: unknown;
  meta?: string;
};

function resolvePosts(c: C, posts: CmsPost[]): PostCard[] {
  const limit = Math.max(1, Math.min(48, Math.round(Number(c.limit)) || 6));
  if (c.mode === "manual") {
    return asItems(c.items)
      .slice(0, limit)
      .map((i) => ({
        title: text(i.title),
        description: text(i.description),
        image: i.image,
        url: i.url,
      }));
  }
  const type = text(c.pageType);
  return posts
    .filter((post) => !type || !post.pageType || post.pageType === type)
    .slice(0, limit)
    .map((post) => ({
      title: text(post.title),
      description: text(post.excerpt),
      image: post.image,
      url: post.url,
      meta: post.pageType,
    }));
}

// Same card as the site's blog / ebook listings.
function PostsGrid({
  items,
  columns,
}: {
  items: PostCard[];
  columns: unknown;
}) {
  if (items.length === 0) return null;
  return (
    <div className={`grid gap-6 ${gridClass(columns, 3)}`}>
      {items.map((post, i) => (
        <CmsLink key={i} url={post.url} className="block">
          <div className={`${CARD} h-full overflow-hidden`}>
            {post.image ? (
              <div className="aspect-[4/3] w-full overflow-hidden">
                <CmsImage
                  src={post.image}
                  alt={post.title}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
            ) : null}
            <div className="p-6">
              {post.meta && (
                <span className="rounded-full bg-brand-pink/10 px-3 py-1 text-xs font-medium capitalize text-brand-pink">
                  {post.meta}
                </span>
              )}
              <h3 className={`mt-3 line-clamp-2 ${CARD_TITLE}`}>
                {post.title}
              </h3>
              {post.description && (
                <p className="mt-2 line-clamp-3 text-sm text-[var(--cms-fg-muted)]">
                  {post.description}
                </p>
              )}
              <div className="mt-5 flex items-center justify-between border-t border-[var(--cms-border)] pt-4">
                <span className="text-sm font-semibold text-brand-pink">
                  Read more
                </span>
                <ArrowRight className="size-5 text-brand-pink transition-transform group-hover:translate-x-1" />
              </div>
            </div>
          </div>
        </CmsLink>
      ))}
    </div>
  );
}

function BlogPostsSection(p: SectionProps) {
  const c = contentOf(p);
  return shell(
    p,
    <>
      <SectionIntro heading={c.heading} description={c.description} />
      <PostsGrid
        items={resolvePosts(c, p.posts)}
        columns={p.section.settings?.columns}
      />
    </>,
  );
}

function RelatedPostsSection(p: SectionProps) {
  const c = contentOf(p);
  return shell(
    p,
    <>
      <SectionIntro heading={c.heading} center />
      <PostsGrid
        items={resolvePosts(c, p.posts)}
        columns={p.section.settings?.columns}
      />
    </>,
  );
}

function AuthorSection(p: SectionProps) {
  const c = contentOf(p);
  return shell(
    p,
    <>
      <SectionIntro heading={c.heading} />
      <div className="flex flex-col gap-6 rounded-3xl border border-[var(--cms-border)] bg-[var(--cms-card)] p-7 sm:flex-row md:p-8">
        {c.image ? (
          <CmsImage
            src={c.image}
            alt={c.name}
            className="size-24 shrink-0 rounded-full object-cover"
          />
        ) : (
          <span className="size-20 shrink-0 rounded-full bg-gradient-to-br from-hot-pink to-electric" />
        )}
        <div>
          <div className="font-display text-xl font-bold text-[var(--cms-fg)]">
            {text(c.name)}
          </div>
          {text(c.role) && (
            <div className="font-script text-2xl text-brand-pink">
              {text(c.role)}
            </div>
          )}
          <SafeHtml html={c.bioHtml} className="mt-3 text-sm" />
        </div>
      </div>
    </>,
    { defaultWidth: "narrow" },
  );
}

/* ---------------------------- registry ---------------------------- */

export const SECTION_COMPONENTS: Record<
  string,
  (props: SectionProps) => ReactNode
> = {
  header: HeaderSection,
  hero: HeroSection,
  text: TextSection,
  richText: RichTextSection,
  image: ImageSection,
  imageText: ImageTextSection,
  video: VideoSection,
  cards: CardsSection,
  features: FeaturesSection,
  services: ServicesSection,
  benefits: BenefitsSection,
  process: ProcessSection,
  timeline: TimelineSection,
  testimonials: TestimonialsSection,
  team: TeamSection,
  pricing: PricingSection,
  faq: FaqSection,
  gallery: GallerySection,
  stats: StatsSection,
  logos: LogosSection,
  cta: CtaSection,
  contact: ContactSection,
  newsletter: NewsletterSection,
  blogPosts: BlogPostsSection,
  relatedPosts: RelatedPostsSection,
  author: AuthorSection,
  customContent: CustomContentSection,
  footer: FooterSection,
  html: HtmlSection,
};
