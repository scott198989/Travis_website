import { Resend } from "resend";
import type { QuoteData } from "./types";
import { formatLead } from "./format";

/**
 * Resend provider (recommended). Requires RESEND_API_KEY + QUOTE_TO_EMAIL.
 * If keys aren't set yet, it logs the lead instead of throwing so the form
 * still "works" during local demos — see README.
 */
export async function send(data: QuoteData): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.QUOTE_TO_EMAIL;
  const from = process.env.QUOTE_FROM_EMAIL ?? "onboarding@resend.dev";
  const { subject, text, html } = formatLead(data);

  if (!apiKey || !to) {
    console.warn(
      `[quote] RESEND_API_KEY / QUOTE_TO_EMAIL not configured — logging lead instead of emailing:\n${text}`
    );
    return;
  }

  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    from,
    to,
    replyTo: data.email,
    subject,
    text,
    html,
  });

  if (error) {
    throw new Error(typeof error === "string" ? error : error.message);
  }
}
