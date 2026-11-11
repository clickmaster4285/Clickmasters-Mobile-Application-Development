import fs from "fs";
import path from "path";

function walk(dir, acc = []) {
  if (!fs.existsSync(dir)) return acc;
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, ent.name);
    if (ent.isDirectory()) walk(p, acc);
    else if (ent.name.endsWith(".ts") && ent.name !== "index.ts" && ent.name !== "types.ts")
      acc.push(p);
  }
  return acc;
}

const guideSource = walk("content/guides")
  .map((file) => fs.readFileSync(file, "utf8"))
  .join("\n");

const retained = new Set(
  [...guideSource.matchAll(/path:\s*(?:hub|`\$\{hub\}|"[^"]+"|`[^`]+`)/g)].flatMap(
    () => [],
  ),
);

for (const match of guideSource.matchAll(/path:\s*"([^"]+)"/g)) {
  retained.add(match[1]);
}
for (const match of guideSource.matchAll(/path:\s*`\$\{hub\}([^`]*)`/g)) {
  // resolved below from hub constants in each file
}

const hubByFile = new Map();
for (const file of walk("content/guides")) {
  const text = fs.readFileSync(file, "utf8");
  const hub = (text.match(/const hub = "([^"]+)"/) || [])[1];
  if (!hub) continue;
  hubByFile.set(file, hub);
  for (const match of text.matchAll(/path:\s*`\$\{hub\}([^`]*)`/g)) {
    retained.add(`${hub}${match[1]}`);
  }
  for (const match of text.matchAll(/path:\s*hub\b/g)) {
    retained.add(hub);
  }
}

const coreKeep = new Set([
  "/",
  "/about",
  "/contact",
  "/solutions",
  "/services",
  ...retained,
]);

function slugsIn(file) {
  const text = fs.readFileSync(file, "utf8");
  return [...text.matchAll(/slug:\s*"([^"]+)"/g)].map((match) => match[1]);
}

const retired = new Set();
const knownSlugs = new Map();

for (const file of walk("content/directUrls")) {
  const cat = path.basename(file, ".ts");
  for (const slug of slugsIn(file)) {
    knownSlugs.set(slug, cat);
    const flat = `/${slug}`;
    if (!coreKeep.has(flat)) retired.add(flat);
  }
}

for (const file of walk("content/servicesDetail")) {
  const cat = path.basename(file, ".ts");
  const categoryPath = `/${cat}`;
  if (!coreKeep.has(categoryPath)) retired.add(categoryPath);
  for (const slug of slugsIn(file)) {
    if (!knownSlugs.has(slug)) knownSlugs.set(slug, cat);
    const nested = `/${cat}/${slug}`;
    if (!coreKeep.has(nested)) retired.add(nested);
  }
}

const serviceText = fs.readFileSync("content/services/servicesContent.tsx", "utf8");
for (const match of serviceText.matchAll(/services:\s*"([^"]+)"/g)) {
  const categoryPath = `/${match[1]}`;
  if (!coreKeep.has(categoryPath)) retired.add(categoryPath);
}

for (const file of ["content/blogs.ts", "content/ebooks.ts", "content/case-study.ts"]) {
  for (const slug of slugsIn(file)) {
    if (file.includes("blog")) retired.add(`/blogs/${slug}`);
    if (file.includes("ebook")) retired.add(`/ebooks/${slug}`);
    if (file.includes("case-study")) retired.add(`/case-studies/${slug}`);
  }
}

retired.add("/blog");
retired.add("/blogs");
retired.add("/ebooks");
retired.add("/case-studies");

const redirects = {};
for (const [slug, cat] of knownSlugs) {
  const flat = `/${slug}`;
  const nested = `/${cat}/${slug}`;
  if (coreKeep.has(nested) && !coreKeep.has(flat)) redirects[flat] = nested;
  if (coreKeep.has(flat) && retired.has(flat)) retired.delete(flat);
}

for (const kept of coreKeep) {
  retired.delete(kept);
  delete redirects[kept];
}

fs.mkdirSync("data", { recursive: true });
fs.writeFileSync(
  "data/retired-paths.json",
  JSON.stringify([...retired].sort(), null, 2) + "\n",
);
fs.writeFileSync(
  "data/redirects.json",
  JSON.stringify(redirects, null, 2) + "\n",
);

console.log(
  JSON.stringify(
    {
      retained: [...coreKeep].sort(),
      retired: retired.size,
      redirects: Object.keys(redirects).length,
    },
    null,
    2,
  ),
);
