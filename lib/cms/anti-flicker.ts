// Anti-flicker for edited pages: <main> is hidden (opacity 0) while edits
// load, for at most ERP_MAX_HIDE_MS, and always revealed afterwards.

export const ERP_PENDING_ATTR = "data-erp-pending";
export const ERP_MAX_HIDE_MS = 1500;

export const erpAntiFlickerCss = `html[${ERP_PENDING_ATTR}] main{opacity:0!important}`;

// Runs in the browser as an inline <head> script. Kept as String.raw so the
// regexes reach the page unescaped; mirrors normalizeSlug() in ./slug.ts.
const SCRIPT_BODY = String.raw`var p=location.pathname;try{p=decodeURIComponent(p)}catch(e){}p=p.toLowerCase().replace(/\/{2,}/g,"/").replace(/^\/+|\/+$/g,"")||"/";if(s.indexOf(p)<0)return;var d=document.documentElement;d.setAttribute(a,"");setTimeout(function(){d.removeAttribute(a)},t);`;

/** Inline <head> script: hide <main> on hard loads of edited paths. */
export function erpAntiFlickerScript(editedSlugs: string[]): string {
  // Escape "<" so no slug can close the <script> element.
  const list = JSON.stringify(editedSlugs).replace(/</g, "\\u003c");
  return `(function(){try{var s=${list},a=${JSON.stringify(ERP_PENDING_ATTR)},t=${ERP_MAX_HIDE_MS};${SCRIPT_BODY}}catch(e){}})();`;
}
