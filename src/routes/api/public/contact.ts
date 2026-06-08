import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { supabaseAdmin } from "@/integrations/supabase/client.server";

const LEAD_RECIPIENT = "sale@clickmastersmobiledevelopmentcompany.com";

const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Invalid email").max(255),
  project: z.string().trim().max(200).optional().default(""),
  budget: z.string().trim().max(100).optional().default(""),
  message: z.string().trim().min(1, "Message is required").max(2000),
});

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

async function sendLeadEmail(lead: {
  name: string;
  email: string;
  project: string;
  budget: string;
  message: string;
}): Promise<boolean> {
  const RESEND_API_KEY = process.env.RESEND_API_KEY;
  if (!RESEND_API_KEY) return false;

  const html = `
    <h2>New project enquiry</h2>
    <p><strong>Name:</strong> ${escapeHtml(lead.name)}</p>
    <p><strong>Email:</strong> ${escapeHtml(lead.email)}</p>
    <p><strong>Project type:</strong> ${escapeHtml(lead.project) || "—"}</p>
    <p><strong>Budget:</strong> ${escapeHtml(lead.budget) || "—"}</p>
    <p><strong>Message:</strong></p>
    <p>${escapeHtml(lead.message).replace(/\n/g, "<br>")}</p>
  `;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${RESEND_API_KEY}`,
    },
    body: JSON.stringify({
      from: "ClickMasters Leads <onboarding@resend.dev>",
      to: [LEAD_RECIPIENT],
      reply_to: lead.email,
      subject: `New lead: ${lead.name}`,
      html,
    }),
  });

  return res.ok;
}

export const Route = createFileRoute("/api/public/contact")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        let json: unknown;
        try {
          json = await request.json();
        } catch {
          return Response.json({ error: "Invalid request body" }, { status: 400 });
        }

        const parsed = contactSchema.safeParse(json);
        if (!parsed.success) {
          return Response.json(
            { error: parsed.error.errors[0]?.message ?? "Invalid input" },
            { status: 400 },
          );
        }

        const lead = parsed.data;

        const { data: inserted, error } = await supabaseAdmin
          .from("leads")
          .insert({
            name: lead.name,
            email: lead.email,
            project_type: lead.project || null,
            budget: lead.budget || null,
            message: lead.message,
          })
          .select("id")
          .single();

        if (error) {
          console.error("[contact] insert failed:", error.message);
          return Response.json(
            { error: "We couldn't save your message. Please try again." },
            { status: 500 },
          );
        }

        let emailed = false;
        try {
          emailed = await sendLeadEmail(lead);
          if (emailed && inserted?.id) {
            await supabaseAdmin.from("leads").update({ emailed: true }).eq("id", inserted.id);
          }
        } catch (e) {
          console.error("[contact] email send failed:", e);
        }

        return Response.json({ success: true, emailed });
      },
    },
  },
});
