import { site } from "@/lib/site-config";
import type { QuoteData } from "./types";

/** Turn a quote submission into a subject + plain-text + branded HTML email. */
export function formatLead(d: QuoteData) {
  const subject = `New quote request — ${d.name} (${d.propertyType})`;

  const rows: [string, string][] = [
    ["Name", d.name],
    ["Phone", d.phone],
    ["Email", d.email],
    ["Address", d.address],
    ["Property", d.propertyType],
    ["Stories", d.stories],
    ["Windows", d.windows],
    ["Services", d.services.join(", ")],
    ["Preferred contact", d.contactMethod],
    ["Message", d.message?.trim() || "(none)"],
  ];

  const text = [`New quote request for ${site.name}`, "", ...rows.map(([k, v]) => `${k}: ${v}`)].join("\n");

  const html = `
  <div style="font-family:Arial,Helvetica,sans-serif;max-width:560px;margin:auto;color:#21384c">
    <div style="background:#0b2942;color:#fff;padding:20px 24px;border-radius:14px 14px 0 0">
      <h1 style="margin:0;font-size:18px">New quote request</h1>
      <p style="margin:4px 0 0;color:#7fc1e6;font-size:13px">${site.name}</p>
    </div>
    <table style="width:100%;border-collapse:collapse;background:#f7fafc;border-radius:0 0 14px 14px;overflow:hidden">
      ${rows
        .map(
          ([k, v]) =>
            `<tr><td style="padding:10px 24px;font-weight:600;color:#48637a;width:150px;vertical-align:top;border-bottom:1px solid #e6eef2">${k}</td><td style="padding:10px 24px;border-bottom:1px solid #e6eef2">${escapeHtml(
              v
            )}</td></tr>`
        )
        .join("")}
    </table>
  </div>`;

  return { subject, text, html };
}

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
