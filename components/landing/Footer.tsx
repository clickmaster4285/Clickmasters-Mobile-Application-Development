import Link from "next/link";
import { getHubs } from "@/content/guides";
import { site } from "@/lib/site";

const logo = "/assets/logo_white.webp";

export function Footer() {
  const hubs = getHubs();

  return (
    <footer className="px-6 lg:px-10 py-16 bg-ink text-cream">
      <div className="max-w-[85vw] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-[1.4fr_1fr_1fr_1.2fr] gap-10">
          <div>
            <img src={logo} alt="ClickMasters" className="h-8 w-auto mb-5" />
            <p className="text-sm text-cream/60 max-w-xs leading-relaxed">
              ClickMasters builds iOS, Android, Flutter, and React Native apps.
              The guides on this site explain the work. They are not client
              scorecards.
            </p>
          </div>
          <div>
            <h3 className="font-display font-bold text-cream mb-4">Guides</h3>
            <ul className="space-y-2 text-sm text-cream/60">
              {hubs.map((hub) => (
                <li key={hub.path}>
                  <Link href={hub.path} className="hover:text-hot-pink">
                    {hub.h1}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-display font-bold text-cream mb-4">Company</h3>
            <ul className="space-y-2 text-sm text-cream/60">
              <li>
                <Link href="/solutions" className="hover:text-hot-pink">
                  Solutions
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-hot-pink">
                  All services
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-hot-pink">
                  About
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-hot-pink">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-display font-bold text-cream mb-4">Contact</h3>
            <ul className="space-y-2 text-sm text-cream/60">
              <li>
                <a href={`mailto:${site.email}`} className="hover:text-hot-pink break-all">
                  {site.email}
                </a>
              </li>
              <li>
                <a href={`tel:${site.phoneTel}`} className="hover:text-hot-pink">
                  {site.phoneDisplay}
                </a>
              </li>
              <li>
                <a
                  href={site.whatsapp}
                  rel={site.whatsappRel}
                  className="hover:text-hot-pink"
                >
                  WhatsApp
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-cream/10 flex flex-wrap justify-between items-center gap-4 text-xs text-cream/40">
          <p>© {new Date().getFullYear()} ClickMasters.</p>
          <p>clickmastersmobiledevelopmentcompany.com</p>
        </div>
      </div>
    </footer>
  );
}
