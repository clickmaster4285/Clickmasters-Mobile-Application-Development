const cols = [
  {
    title: "ClickMasters",
    items: ["Premium mobile dev agency", "© 2025 ClickMasters", "Austin, TX"],
  },
  {
    title: "Services",
    items: ["Native Apps", "Cross-platform", "UI/UX Design", "Tech Consulting"],
  },
  {
    title: "Resources",
    items: ["Case Studies", "Blog", "Process", "FAQ"],
  },
  {
    title: "Contact",
    items: [
      "sale@clickmastersmobiledevelopmentcompany.com",
      "+1 325 202 4074",
      "WhatsApp: +1 325 202 4074",
    ],
  },
];

export function Footer() {
  return (
    <footer className="px-6 lg:px-10 py-16 bg-ink text-cream">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
          {cols.map((c) => (
            <div key={c.title}>
              <h3 className="font-display font-bold text-cream mb-4">{c.title}</h3>
              <ul className="space-y-2 text-sm text-cream/60">
                {c.items.map((i) => (
                  <li key={i} className="break-words hover:text-hot-pink transition-colors">
                    {i}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 pt-8 border-t border-cream/10 flex flex-wrap justify-between items-center gap-4 text-xs text-cream/40">
          <p>Built with care by the ClickMasters pack.</p>
          <p>clickmastersmobiledevelopmentcompany.com</p>
        </div>
      </div>
    </footer>
  );
}