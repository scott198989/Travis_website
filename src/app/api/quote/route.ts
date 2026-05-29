import { NextResponse } from "next/server";

import { quoteSchema } from "@/lib/schemas/quote";
import { sendQuoteEmail } from "@/lib/email/provider";

// The email SDKs need the Node.js runtime.
export const runtime = "nodejs";

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  // Re-validate on the server with the SAME schema as the client.
  const parsed = quoteSchema.safeParse(body);
  if (!parsed.success) {
    const fieldErrors: Record<string, string[]> = {};
    for (const issue of parsed.error.issues) {
      const key = String(issue.path[0] ?? "form");
      (fieldErrors[key] ??= []).push(issue.message);
    }
    return NextResponse.json({ ok: false, errors: { fieldErrors } }, { status: 400 });
  }

  const data = parsed.data;

  // Honeypot: a real user never fills `company`. Pretend success so bots don't
  // learn they were caught.
  if (data.company) {
    return NextResponse.json({ ok: true });
  }

  // Timing check: submissions faster than 2s are almost certainly bots.
  if (data.startedAt && Date.now() - data.startedAt < 2000) {
    return NextResponse.json({ ok: false, error: "too_fast" }, { status: 400 });
  }

  try {
    await sendQuoteEmail(data);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[quote] send failed:", err);
    return NextResponse.json({ ok: false, error: "send_failed" }, { status: 500 });
  }
}
