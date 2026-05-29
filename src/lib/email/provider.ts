import type { QuoteData } from "./types";

/**
 * Provider-agnostic dispatcher. Set EMAIL_PROVIDER in the environment to swap
 * how quote emails are delivered WITHOUT touching the form or the API route.
 * Senders are dynamically imported so only the chosen one is bundled.
 */
const provider = (process.env.EMAIL_PROVIDER ?? "resend").toLowerCase();

export async function sendQuoteEmail(data: QuoteData): Promise<void> {
  switch (provider) {
    case "resend":
      return (await import("./resend")).send(data);
    case "formspree":
      return (await import("./formspree")).send(data);
    case "emailjs":
      return (await import("./emailjs")).send(data);
    default:
      throw new Error(`Unknown EMAIL_PROVIDER "${provider}". Use "resend", "formspree", or "emailjs".`);
  }
}
