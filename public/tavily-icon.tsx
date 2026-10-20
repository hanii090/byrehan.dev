import { SVGProps } from "react";

interface TavilyIconProps extends SVGProps<SVGSVGElement> {
  size?: number | string;
}

const TavilyIcon = ({ size = 24, ...props }: TavilyIconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    aria-hidden="true"
    {...props}
  >
    <rect
      x="3"
      y="3"
      width="18"
      height="18"
      rx="4"
      stroke="currentColor"
      strokeWidth="1.6"
    />
    <path
      d="M12 16.5V8.5M12 8.5l-2.2 2.2M12 8.5l2.2 2.2M8.2 13.2l2.4 2.4 5.2-5.2"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default TavilyIcon;
