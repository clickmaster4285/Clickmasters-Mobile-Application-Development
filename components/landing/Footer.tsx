const logo = "/assets/logo_white.webp";

const cols = [
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
      <div className="max-w-[85vw] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-[1.4fr_1fr_1fr_1.2fr] gap-10">
          <div>
            <img src={logo} alt="ClickMasters" className="h-8 w-auto mb-5" />
            <p className="text-sm text-cream/60 max-w-xs leading-relaxed">
              Premium mobile development agency engineering native iOS, Android, and cross-platform
              apps for ambitious teams.
            </p>
            <p className="mt-4 text-xs text-cream/40">Austin, TX · Since 2015</p>
          </div>
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
          <p>© 2025 ClickMasters. Built with care by the ClickMasters pack.</p>
          <p>clickmastersmobiledevelopmentcompany.com</p>
        </div>
      </div>
    </footer>
  );
}
