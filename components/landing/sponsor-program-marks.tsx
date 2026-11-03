import { InteractiveSticker } from "@/components/landing/profile-banner";

function GutterSticker({
  side,
  src,
  label,
  tilt,
  soundSrc,
}: {
  side: "left" | "right";
  src: string;
  label: string;
  tilt: number;
  soundSrc: string;
}) {
  const place =
    side === "right"
      ? "right-[calc(3.5rem+(100%-100vw)/2)]"
      : "left-[calc(3.5rem+(100%-100vw)/2)]";

  return (
    <div
      className={`absolute top-2 z-10 hidden xl:block ${place}`}
      style={{ transform: `rotate(${tilt}deg)` }}
    >
      <div className="relative h-14 w-[13.5rem] [perspective:650px]">
        <InteractiveSticker
          src={src}
          alt={label}
          label={label}
          tilt={tilt}
          sizes="216px"
          soundSrc={soundSrc}
        />
      </div>
    </div>
  );
}

/* One mark in each dotted gutter beside Sponsors. They rest at a slight
   tilt and still click like the desk stickers. */
export function SponsorProgramMarks() {
  return (
    <>
      <GutterSticker
        side="left"
        src="/mongodb-startups.png"
        label="MongoDB for Startups"
        tilt={-8}
        soundSrc="/keyboard-click.mp3"
      />
      <GutterSticker
        side="right"
        src="/amplitude-startups.png"
        label="Amplitude Startup Program"
        tilt={8}
        soundSrc="/notebook-page-turn.mp3"
      />
    </>
  );
}
