import { getLivePageEdits } from "@/lib/cms/client";

// Same-origin proxy for B2 so the browser never talks to the ERP directly
// (keeps the site's CSP intact). Always 200: { edits: null } means "leave the
// page untouched".
//
// Never cached — not by Next, a CDN or the browser — so an edit published in
// the ERP appears on the very next page load. (Only the ERP's own response
// caching, PUBLIC_CACHE_SECONDS, can still delay it.)

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const HEADERS = {
  "Cache-Control": "no-store, max-age=0",
  "CDN-Cache-Control": "no-store",
};

export async function GET(request: Request) {
  const path = new URL(request.url).searchParams.get("path") ?? "/";
  if (path.length > 512)
    return Response.json({ edits: null }, { headers: HEADERS });

  try {
    const edits = await getLivePageEdits(path);
    return Response.json(
      {
        edits:
          edits && edits.instructions.length > 0
            ? {
                version: edits.version ?? null,
                instructions: edits.instructions,
              }
            : null,
      },
      { headers: HEADERS },
    );
  } catch {
    return Response.json({ edits: null }, { headers: HEADERS });
  }
}
