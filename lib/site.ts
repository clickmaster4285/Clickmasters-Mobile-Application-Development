export const site = {
  name: "ClickMasters",
  url: "https://clickmastersmobiledevelopmentcompany.com",
  email: "sales@clickmastersmobiledevelopmentcompany.com",
  phoneDisplay: "+1 325 202 4074",
  phoneTel: "+13252024074",
  phoneSchema: "+1-325-202-4074",
  whatsapp: "https://wa.me/13252024074",
  description:
    "ClickMasters builds iOS, Android, Flutter, and React Native apps and publishes practical guides on cost, store listings, and industry apps.",
};

export function capDescription(text: string, max = 155) {
  const clean = text.replace(/\s+/g, " ").trim();
  if (clean.length <= max) return clean;
  const cut = clean.slice(0, max - 1);
  const lastSpace = cut.lastIndexOf(" ");
  const base = cut.slice(0, lastSpace > 80 ? lastSpace : max - 1).trim();
  return `${base}.`;
}
