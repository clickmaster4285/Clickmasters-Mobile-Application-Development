import fs from "fs";
import path from "path";
import sharp from "sharp";

const root = "public/assets";

function walk(dir, acc = []) {
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, ent.name);
    if (ent.isDirectory()) walk(full, acc);
    else if (/\.(png|jpe?g|webp)$/i.test(ent.name)) acc.push(full);
  }
  return acc;
}

async function writeUnder(input, output, { maxBytes, width }) {
  let best = null;
  const widths = [width, Math.round(width * 0.8), Math.round(width * 0.6), 800, 480];
  for (const w of widths) {
    for (const quality of [68, 56, 44, 34, 24]) {
      const buf = await sharp(input)
        .rotate()
        .resize({ width: w, withoutEnlargement: true })
        .webp({ quality })
        .toBuffer();
      best = buf;
      if (buf.length <= maxBytes) {
        fs.mkdirSync(path.dirname(output), { recursive: true });
        fs.writeFileSync(output, buf);
        return buf.length;
      }
    }
  }
  fs.writeFileSync(output, best);
  return best.length;
}

const named = [
  ["public/assets/marketing/digital_city.jpeg", "public/assets/marketing/digital-city.webp", 200_000, 1400],
  ["public/assets/marketing/agency_reel.jpeg", "public/assets/marketing/agency-reel.webp", 200_000, 1600],
  ["public/assets/marketing/growth_Engine.jpeg", "public/assets/marketing/growth-engine.webp", 200_000, 1600],
];

for (const [input, output, maxBytes, width] of named) {
  const size = await writeUnder(input, output, { maxBytes, width });
  console.log(output, size);
}

const team = walk("public/assets/team");
for (const file of team) {
  const output = file.replace(/\.(png|jpe?g)$/i, ".webp");
  const size = await writeUnder(file, output, { maxBytes: 80_000, width: 480 });
  console.log("team", output, size);
  if (file !== output) fs.unlinkSync(file);
}

for (const file of walk(root)) {
  const stat = fs.statSync(file);
  if (stat.size <= 300_000) continue;
  if (file.endsWith(".webp") && stat.size <= 300_000) continue;
  const output = file.replace(/\.(png|jpe?g)$/i, ".webp");
  if (output === file) {
    const size = await writeUnder(file, file + ".tmp.webp", { maxBytes: 280_000, width: 1400 });
    fs.renameSync(file + ".tmp.webp", file);
    console.log("recompressed", file, size);
    continue;
  }
  const size = await writeUnder(file, output, { maxBytes: 280_000, width: 1400 });
  fs.unlinkSync(file);
  console.log("converted", output, size);
}

const overs = walk(root).filter((file) => fs.statSync(file).size > 300_000);
console.log("over 300kb", overs);
