import { InteractiveSticker } from "@/components/landing/profile-banner";

/* Sits in the dotted gutter, the same way the lightsaber does, with the
   arrow aimed back at the UmmahSignal row. The badge itself clicks like
   the coffee sticker: the same spring, tilt, and cup sound. */
export function NvidiaInceptionMark() {
  return (
    <div className="absolute right-[calc(3.5rem+(100%-100vw)/2)] top-[6.5rem] z-10 hidden items-center gap-1 text-muted-foreground xl:flex">
      <svg
        aria-hidden="true"
        focusable="false"
        viewBox="0 0 72 52"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-12 w-16 shrink-0"
      >
        <path d="M60 4C64 22 48 41 13 38M22 30C19 34 15 37 11 38C15 40 19 42 23 46" />
      </svg>
      <div className="relative h-16 w-[9.25rem] [perspective:650px]">
        <InteractiveSticker
          src="/nvidia-inception.jpg"
          alt="NVIDIA Inception Program"
          label="NVIDIA Inception Program"
          tilt={7}
          sizes="148px"
          soundSrc="/coffee-cup.mp3"
          preload
        />
      </div>
    </div>
  );
}
