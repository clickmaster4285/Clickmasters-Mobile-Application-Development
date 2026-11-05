import { androidGuides } from "./android";
import { buildGuides } from "./build";
import { costGuides } from "./cost";
import { crossPlatformGuides } from "./cross-platform";
import { industryGuides } from "./industries";
import { extras } from "./extra";
import { iosGuides } from "./ios";
import type { Guide } from "./types";

export type { Guide } from "./types";

export const guides: Guide[] = [
  ...iosGuides,
  ...androidGuides,
  ...crossPlatformGuides,
  ...costGuides,
  ...buildGuides,
  ...industryGuides,
].map((guide) =>
  extras[guide.path]
    ? { ...guide, body: [...guide.body, extras[guide.path]] }
    : guide,
);

const byPath = new Map(guides.map((guide) => [guide.path, guide]));

export function getGuide(path: string) {
  return byPath.get(normalizePath(path));
}

export function getHubs() {
  return guides.filter((guide) => guide.kind === "hub");
}

export function getChildren(hubPath: string) {
  return guides.filter(
    (guide) => guide.kind === "article" && guide.hubPath === hubPath,
  );
}

export function normalizePath(path: string) {
  if (!path.startsWith("/")) path = `/${path}`;
  if (path.length > 1 && path.endsWith("/")) path = path.slice(0, -1);
  return path;
}

export function guideWordCount(guide: Guide) {
  return guide.body.join(" ").split(/\s+/).filter(Boolean).length;
}
