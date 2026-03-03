import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #1a5276, #2ecc71)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "60px",
        }}
      >
        <h1 style={{ color: "white", fontSize: 64, fontWeight: 800 }}>
          {"Heaven's Dew Montessori"}
        </h1>
        <p style={{ color: "white", fontSize: 32, opacity: 0.9 }}>
          Faith, Diligence and Excellence
        </p>
        <p style={{ color: "white", fontSize: 24, opacity: 0.7 }}>
          Koforidua, Ghana • hdm.edu.gh
        </p>
      </div>
    ),
    size
  );
}