import type { QuoteData } from "./types";
import { formatLead } from "./format";

/**
 * Formspree provider. Set EMAIL_PROVIDER=formspree and FORMSPREE_FORM_ID.
 * No SDK needed — a plain server-side POST keeps it secret-light.
 */
export async function send(data: QuoteData): Promise<void> {
  const id = process.env.FORMSPREE_FORM_ID;
  const { subject, text } = formatLead(data);

  if (!id) {
    console.warn(`[quote] FORMSPREE_FORM_ID not configured — logging lead instead:\n${text}`);
    return;
  }

  const res = await fetch(`https://formspree.io/f/${id}`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({ ...data, _subject: subject }),
  });

  if (!res.ok) {
    throw new Error(`Formspree submission failed (${res.status})`);
  }
}
