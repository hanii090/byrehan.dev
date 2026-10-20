import { SiSwift } from "react-icons/si";

type SwiftUiProps = {
  size: string;
};

/* SwiftUI shares the Swift bird. The rounded frame is the app-icon shape,
   so the chip reads as the UI framework rather than a second language logo. */
const SwiftUi = ({ size }: SwiftUiProps) => (
  <span
    aria-hidden="true"
    style={{
      width: size,
      height: size,
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      border: "1.4px solid currentColor",
      borderRadius: 5,
      flexShrink: 0,
    }}
  >
    <SiSwift size="68%" />
  </span>
);

export default SwiftUi;
