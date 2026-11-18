import Image from "next/image";

export function Logo({
  size = 20,
  className,
}: {
  size?: number | string;
  className?: string;
}) {
  const pixels = typeof size === "number" ? size : 20;
  return (
    <Image
      src="/mark-r.png"
      alt=""
      width={pixels}
      height={pixels}
      className={className}
      style={{ width: pixels, height: pixels }}
    />
  );
}

export default Logo;
