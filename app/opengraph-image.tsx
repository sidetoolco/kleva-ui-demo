import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Kleva - AI Collections Platform";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "100%",
        backgroundColor: "#111827",
        fontFamily: "system-ui",
      }}>
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: "20px",
          marginBottom: "40px",
        }}>
          <div style={{
            width: "64px",
            height: "64px",
            backgroundColor: "white",
            borderRadius: "16px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "32px",
            fontWeight: "bold",
            color: "#111827",
          }}>K</div>
          <div style={{
            fontSize: "56px",
            fontWeight: "bold",
            color: "white",
          }}>kleva</div>
        </div>
        <div style={{
          fontSize: "28px",
          color: "#9CA3AF",
          marginBottom: "20px",
        }}>AI-Powered Collections Infrastructure</div>
        <div style={{
          display: "flex",
          gap: "16px",
          marginTop: "20px",
        }}>
          {["Voice Agents", "WhatsApp", "SMS", "Email"].map(label => (
            <div key={label} style={{
              padding: "8px 20px",
              borderRadius: "999px",
              backgroundColor: "#1F2937",
              color: "#D1D5DB",
              fontSize: "16px",
              border: "1px solid #374151",
            }}>{label}</div>
          ))}
        </div>
      </div>
    ),
    { ...size }
  );
}
