import fs from "fs";
import path from "path";

function walk(dir, acc = []) {
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, ent.name);
    if (ent.isDirectory()) walk(p, acc);
    else if (ent.name.endsWith(".ts") && ent.name !== "index.ts") acc.push(p);
  }
  return acc;
}

const files = [...walk("content/directUrls"), ...walk("content/servicesDetail")];

const rows = [];
for (const file of files) {
  const text = fs.readFileSync(file, "utf8");
  const re = /slug:\s*["']([^"']+)["']/g;
  const cat = path.basename(file, ".ts");
  const tree = file.includes("servicesDetail") ? "detail" : "direct";
  let m;
  while ((m = re.exec(text))) {
    const slug = m[1];
    const window = text.slice(m.index, m.index + 800);
    const title = (window.match(/title_tag:\s*["']([^"']+)/) || [])[1] || "";
    const kw = (window.match(/primary_keyword:\s*["']([^"']+)/) || [])[1] || "";
    rows.push({ tree, cat, slug, title, kw });
  }
}

const reject =
  /\b(seo|sem|erp|crm|servicenow|service-now|marketing|clutch|firebase-pric|job|jobs|salary|career|hiring|recruit|venture|capital|course|bootcamp|certif|forex|trading|stock|emr|medical-record|data-scientist|nft|crypto|hr-|human-resource|web-development|website)\b/i;

function hubOf(blob) {
  const s = blob.toLowerCase();
  if (/(flutter|react-native|react native|cross-platform|kotlin multiplatform)/.test(s))
    return "cross-platform";
  if (/(iphone|ipad|\bios\b|swiftui|\bswift\b|app-store|app store|testflight)/.test(s))
    return "ios";
  if (/(android|kotlin|google-play|google play|play-store)/.test(s)) return "android";
  if (/(cost|pricing|price|budget|estimate)/.test(s) && /(app|mobile|ios|android|flutter)/.test(s))
    return "cost";
  if (/(aso|app-store-optim|play-store-optim|store listing)/.test(s)) return "store";
  if (/(healthcare|health-app|telehealth|fintech|bank|ecommerce|e-commerce|retail|logistics|education|fitness|food-delivery|on-demand)/.test(s) &&
      /(app|mobile)/.test(s))
    return "industries";
  if (/(how-to-build|build-an-app|build-a-mobile|create-an-app|make-an-app|mobile-app|app-development|develop-an-app)/.test(s))
    return "build";
  return null;
}

const kept = [];
const retired = [];
for (const row of rows) {
  const blob = `${row.slug} ${row.title} ${row.kw}`;
  const hub = reject.test(blob) ? null : hubOf(blob);
  if (hub) kept.push({ ...row, hub });
  else retired.push(row);
}

function clusterKey(slug) {
  return slug
    .toLowerCase()
    .replace(/optimisation/g, "optimization")
    .replace(/iphone|ipad/g, "ios")
    .replace(/pricing|price|costing/g, "cost")
    .replace(/development|developing|developer|developers/g, "dev")
    .replace(/building|creation|create/g, "build")
    .replace(/-/g, " ")
    .replace(/\b(complete|guide|2026|the|a|an|for|to|of|and|in|app|apps|mobile)\b/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .split(" ")
    .filter(Boolean)
    .sort()
    .join("-");
}

const clusters = new Map();
for (const row of kept) {
  const key = `${row.hub}:${clusterKey(row.slug)}`;
  if (!clusters.has(key)) clusters.set(key, []);
  clusters.get(key).push(row);
}

const representatives = [];
for (const [key, group] of clusters) {
  group.sort((a, b) => {
    if (a.tree !== b.tree) return a.tree === "detail" ? -1 : 1;
    return a.slug.length - b.slug.length;
  });
  representatives.push({ key, keep: group[0], dupes: group.slice(1).length });
}

console.log(
  JSON.stringify(
    {
      total: rows.length,
      topical: kept.length,
      retired: retired.length,
      clusters: clusters.size,
    },
    null,
    2,
  ),
);
const byHub = {};
for (const rep of representatives) {
  byHub[rep.keep.hub] = (byHub[rep.keep.hub] || 0) + 1;
}
console.log("representatives by hub", byHub);
console.log("--- representatives ---");
for (const rep of representatives.sort((a, b) => a.keep.hub.localeCompare(b.keep.hub) || a.keep.slug.localeCompare(b.keep.slug))) {
  console.log(`${rep.keep.hub}\t${rep.keep.tree}\t${rep.keep.cat}\t${rep.keep.slug}\tdupes=${rep.dupes}`);
}
