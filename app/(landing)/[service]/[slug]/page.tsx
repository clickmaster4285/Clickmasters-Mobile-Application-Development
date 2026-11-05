import type { Metadata } from "next";
import { permanentRedirect, notFound } from "next/navigation";
import { GuideArticle } from "@/components/guides/GuideArticle";
import { getGuide, guides } from "@/content/guides";
import { decidePath } from "@/lib/library";
import { capDescription } from "@/lib/site";

export function generateStaticParams() {
  return guides
    .filter((guide) => guide.kind === "article")
    .map((guide) => {
      const [, service, slug] = guide.path.split("/");
      return { service, slug };
    });
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ service: string; slug: string }>;
}): Promise<Metadata> {
  const { service, slug } = await params;
  const decision = decidePath(`/${service}/${slug}`);
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

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ service: string; slug: string }>;
}) {
  const { service, slug } = await params;
  const decision = decidePath(`/${service}/${slug}`);

  if (decision.type === "redirect") permanentRedirect(decision.to);
  if (decision.type !== "guide") notFound();

  const guide = getGuide(decision.path);
  if (!guide) notFound();
  return <GuideArticle guide={guide} />;
}
