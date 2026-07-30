import { ImageResponse } from "next/og";

export const alt = "Buka FIT";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          padding: 72,
          background:
            "linear-gradient(145deg, #1A1816 0%, #2A2622 55%, #1F2A2E 100%)",
          color: "#E8E4DF",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 28,
            letterSpacing: 6,
            textTransform: "uppercase",
            color: "#C4A46A",
            marginBottom: 16,
          }}
        >
          24/7 · Tashkent
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 88,
            fontWeight: 700,
            letterSpacing: -2,
            textTransform: "uppercase",
            lineHeight: 1,
          }}
        >
          Buka FIT
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 24,
            fontSize: 32,
            color: "#A39E97",
            maxWidth: 800,
          }}
        >
          2000 m² · pool · sauna & hammam
        </div>
      </div>
    ),
    { ...size },
  );
}
