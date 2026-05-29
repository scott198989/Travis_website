import type { QuoteInput } from "@/lib/schemas/quote";

/** The validated quote payload passed to whichever email provider is active. */
export type QuoteData = QuoteInput;

export type EmailSender = (data: QuoteData) => Promise<void>;
