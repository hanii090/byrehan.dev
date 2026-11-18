import { openGraphConfig } from "@/config/opengraph";
import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import path from "node:path";

export const runtime = "nodejs";
export const alt = "Imagined by a human. Built with A.I.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const SERIF = "Instrument Serif";
const SANS = "Geist";
const { colors } = openGraphConfig;
const [font, locationFont, lockup] = await Promise.all([
  readFile(path.join(process.cwd(), "lib/fonts/InstrumentSerif-Regular.ttf")),
  readFile(path.join(process.cwd(), "lib/fonts/Geist-Regular.ttf")),
  readFile(path.join(process.cwd(), "public/images/og-lockup.jpg"), "base64"),
]);

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          position: "relative",
          width: "100%",
          height: "100%",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
          backgroundColor: colors.background,
          color: colors.foreground,
          fontFamily: SERIF,
        }}
      >
        <img
          src={`data:image/jpeg;base64,${lockup}`}
          alt=""
          width={size.width}
          height={size.height}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: SERIF, data: font, style: "normal", weight: 400 },
        { name: SANS, data: locationFont, style: "normal", weight: 400 },
      ],
    },
  );
}
