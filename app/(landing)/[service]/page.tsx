import type { Metadata } from "next";
import { permanentRedirect, notFound } from "next/navigation";
import { GuideArticle } from "@/components/guides/GuideArticle";
import { getGuide, guides } from "@/content/guides";
import { decidePath } from "@/lib/library";
import { capDescription } from "@/lib/site";

export function generateStaticParams() {
  return guides
    .filter((guide) => guide.kind === "hub")
    .map((guide) => ({ service: guide.path.slice(1) }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ service: string }>;
}): Promise<Metadata> {
  const { service } = await params;
  const decision = decidePath(`/${service}`);
  if (decision.type !== "guide") {
    return { title: "Page removed", robots: { index: false, follow: false } };
  }
  const guide = getGuide(decision.path)!;
  const description = capDescription(guide.description);
  return {
    title: guide.title,
    description,
    alternates: { canonical: guide.path },
    robots: { index: true, follow: true },
    openGraph: { title: guide.title, description, type: "article" },
  };
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ service: string }>;
}) {
  const { service } = await params;
  const decision = decidePath(`/${service}`);

  if (decision.type === "redirect") permanentRedirect(decision.to);
  if (decision.type !== "guide") notFound();

  const guide = getGuide(decision.path);
  if (!guide || guide.kind !== "hub") notFound();
  return <GuideArticle guide={guide} />;
}
