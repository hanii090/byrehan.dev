import type { SVGProps } from "react";

export interface LogoProps extends SVGProps<SVGSVGElement> {
  size?: number | string;
}

export function Logo({ size = 20, className, ...props }: LogoProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 32 32"
      width={size}
      height={size}
      fill="none"
      className={className}
      {...props}
    >
      <rect
        width="32"
        height="32"
        rx="10"
        className="fill-foreground transition-colors"
      />
      <path
        d="M11 24 V8 H17.2 C20.1 8 22 9.7 22 12.2 C22 14.1 20.9 15.5 19.1 16.1 L22.4 24 H19.1 L16 16.5 H13.5 V24 H11 Z M13.5 14.2 H16.9 C18.5 14.2 19.4 13.4 19.4 12.2 C19.4 11 18.5 10.2 16.9 10.2 H13.5 V14.2 Z"
        className="fill-background transition-colors"
      />
    </svg>
  );
}

export default Logo;
