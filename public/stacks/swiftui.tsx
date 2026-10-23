import { SiSwift } from "react-icons/si";

type SwiftUiProps = {
  size: string;
};

/* Pixel sizes only. A percentage, or a unitless CSS length, lets the Swift
   plate grow to the width of the page and blows the stack row open. */
const SwiftUi = ({ size }: SwiftUiProps) => {
  const parsed = Number.parseFloat(size);
  const frame = Number.isFinite(parsed) ? parsed : 18;
  const mark = Math.max(10, Math.round(frame * 0.68));

  return (
    <span
      aria-hidden="true"
      style={{
        width: frame,
        height: frame,
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
        lineHeight: 0,
        boxSizing: "border-box",
        border: "1.25px solid currentColor",
        borderRadius: 4,
      }}
    >
      <SiSwift size={mark} />
    </span>
  );
};

export default SwiftUi;
