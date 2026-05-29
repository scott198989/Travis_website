import { ImageResponse } from "next/og";
import { site } from "@/lib/site-config";

export const alt = `${site.name} — ${site.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "linear-gradient(135deg, #0b2942 0%, #1b6fb3 70%, #3da5d9 100%)",
          color: "white",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16, opacity: 0.85 }}>
          <div style={{ width: 44, height: 44, borderRadius: 12, background: "#dceef8", display: "flex" }} />
          <div style={{ display: "flex", fontSize: 26, letterSpacing: 4, textTransform: "uppercase", color: "#7fc1e6" }}>
            {`${site.address.locality}, ${site.address.region}`}
          </div>
        </div>
        <div style={{ fontSize: 84, fontWeight: 600, lineHeight: 1.05, marginTop: 28, maxWidth: 900 }}>
          {site.name}
        </div>
        <div style={{ fontSize: 40, color: "#fce2b0", marginTop: 20 }}>{site.tagline}</div>
        <div style={{ display: "flex", gap: 28, marginTop: 40, fontSize: 26, color: "rgba(255,255,255,0.8)" }}>
          <span>Residential &amp; Commercial</span>
          <span>•</span>
          <span>Licensed &amp; Insured</span>
          <span>•</span>
          <span>Free Estimates</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
