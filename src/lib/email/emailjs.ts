import type { QuoteData } from "./types";
import { formatLead } from "./format";

/**
 * EmailJS is designed to run in the BROWSER (it uses NEXT_PUBLIC_* keys and a
 * client SDK). If you choose EmailJS, the cleanest approach is to send directly
 * from the client form and keep this server route for resend/formspree.
 *
 * This server-side stub just logs the lead so nothing breaks if EMAIL_PROVIDER
 * is set to "emailjs". See README for the client-side EmailJS pattern.
 */
export async function send(data: QuoteData): Promise<void> {
  console.warn(
    `[quote] EMAIL_PROVIDER=emailjs is browser-oriented — sending from the server is not supported. Logging lead instead:\n${
      formatLead(data).text
    }`
  );
}
