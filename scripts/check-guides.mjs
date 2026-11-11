import fs from "fs";
import path from "path";

function walk(dir, acc = []) {
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, ent.name);
    if (ent.isDirectory()) walk(p, acc);
    else if (ent.name.endsWith(".ts") && ent.name !== "index.ts" && ent.name !== "types.ts")
      acc.push(p);
  }
  return acc;
}

const banned =
  /we tested|our testing|original data|examples from shipped apps|working mobile engineers/i;
const problems = [];

for (const file of walk("content/guides")) {
  const text = fs.readFileSync(file, "utf8");
  const hub = (text.match(/const hub = "([^"]+)"/) || [])[1];
  const chunks = text.split(/kind:\s*"/).slice(1);
  for (const chunk of chunks) {
    const title = (chunk.match(/title:\s*"([^"]+)"/) || [])[1] || "";
    const description = (chunk.match(/description:\s*\n?\s*"([^"]+)"/) || [])[1] || "";
    let guidePath = (chunk.match(/path:\s*"([^"]+)"/) || [])[1];
    const templated = chunk.match(/path:\s*`\$\{hub\}([^`]*)`/);
    if (!guidePath && templated && hub) guidePath = `${hub}${templated[1]}`;
    if (!guidePath && /path:\s*hub\b/.test(chunk) && hub) guidePath = hub;
    const bodyBlock = (chunk.split("body: [")[1] || "").split(/\n\s*\],/)[0];
    const words = bodyBlock
      .replace(/"/g, " ")
      .split(/\s+/)
      .filter((word) => word.length > 1).length;
    if (!guidePath) continue;
    if (words < 500 || description.length > 155 || description.length < 40 || banned.test(chunk)) {
      problems.push({
        guidePath,
        words,
        description: description.length,
        title: title.length,
        banned: banned.test(chunk),
      });
    }
  }
}

console.log(problems.length ? problems : "all guides pass");
