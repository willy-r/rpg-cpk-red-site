import { ImageResponse } from "next/og";

export const dynamic = "force-static";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "CPK:RED — Guia de Referência Completo para Cyberpunk Red";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#0a0a0f",
          position: "relative",
        }}
      >
        {/* Inner border */}
        <div
          style={{
            position: "absolute",
            top: 28,
            left: 28,
            right: 28,
            bottom: 28,
            border: "1px solid rgba(0,245,255,0.15)",
            display: "flex",
          }}
        />

        {/* Corner accents — top-left */}
        <div style={{ position: "absolute", top: 28, left: 28, width: 56, height: 56, borderTop: "2px solid #00f5ff", borderLeft: "2px solid #00f5ff", display: "flex" }} />
        {/* top-right */}
        <div style={{ position: "absolute", top: 28, right: 28, width: 56, height: 56, borderTop: "2px solid #00f5ff", borderRight: "2px solid #00f5ff", display: "flex" }} />
        {/* bottom-left */}
        <div style={{ position: "absolute", bottom: 28, left: 28, width: 56, height: 56, borderBottom: "2px solid #00f5ff", borderLeft: "2px solid #00f5ff", display: "flex" }} />
        {/* bottom-right */}
        <div style={{ position: "absolute", bottom: 28, right: 28, width: 56, height: 56, borderBottom: "2px solid #00f5ff", borderRight: "2px solid #00f5ff", display: "flex" }} />

        {/* Badge */}
        <div
          style={{
            color: "#ff003c",
            fontSize: 18,
            fontFamily: "monospace",
            letterSpacing: 8,
            marginBottom: 32,
            display: "flex",
          }}
        >
          CYBERPUNK RED
        </div>

        {/* Main title */}
        <div
          style={{
            color: "#00f5ff",
            fontSize: 128,
            fontWeight: 900,
            fontFamily: "monospace",
            letterSpacing: -4,
            lineHeight: 1,
            display: "flex",
          }}
        >
          CPK:RED
        </div>

        {/* Divider */}
        <div
          style={{
            width: 520,
            height: 1,
            backgroundColor: "rgba(0,245,255,0.25)",
            margin: "28px 0",
            display: "flex",
          }}
        />

        {/* Subtitle */}
        <div
          style={{
            color: "#555555",
            fontSize: 24,
            fontFamily: "monospace",
            letterSpacing: 4,
            display: "flex",
          }}
        >
          GUIA DE REFERÊNCIA COMPLETO
        </div>
      </div>
    ),
    { ...size }
  );
}
