import { z } from "zod";

/**
 * Single source of truth for quote validation — imported by BOTH the client
 * form (resolver) and the server route (re-validation) for defense in depth.
 * No "use client"/"use server" so it's safe to import anywhere.
 */
export const quoteSchema = z.object({
  name: z.string().min(2, "Please enter your name"),
  phone: z.string().min(7, "Enter a valid phone number").max(25),
  email: z.email("Enter a valid email address"),
  address: z.string().min(3, "A street or neighborhood helps us quote accurately"),
  propertyType: z.enum(["residential", "commercial"]),
  stories: z.string().min(1, "Select the number of stories"),
  windows: z.string().min(1, "Roughly how many windows?"),
  services: z.array(z.string()).min(1, "Please select at least one service"),
  contactMethod: z.enum(["phone", "text", "email"]),
  message: z.string().max(2000, "That's a bit long — keep it under 2000 characters").optional(),

  // --- anti-spam (hidden from real users) ---
  /**
   * Honeypot: real users never see or fill this. We DON'T validate it to an
   * empty string here — instead the API route silently accepts (and discards)
   * any submission where it's filled, so bots don't learn they were caught.
   */
  company: z.string().optional(),
  /** Timestamp set when the form mounts; server rejects sub-2s submissions. */
  startedAt: z.number().optional(),
});

export type QuoteInput = z.infer<typeof quoteSchema>;
