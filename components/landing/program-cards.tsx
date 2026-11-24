import Image from "next/image";

const programs = [
  {
    name: "NVIDIA Inception",
    caption: "Programme member",
    href: "https://www.nvidia.com/en-us/startups/",
    src: "/nvidia-inception.jpg",
  },
  {
    name: "MongoDB for Startups",
    caption: "for Startups",
    href: "https://www.mongodb.com/solutions/startups",
    src: "/mongodb-startups.png",
  },
  {
    name: "Amplitude",
    caption: "Startup Program",
    href: "https://amplitude.com/startups",
    src: "/amplitude-startups.png",
  },
  {
    name: "AWS Startups",
    caption: "Accepted",
    href: "https://aws.amazon.com/startups",
    src: "/aws-startups.png",
  },
] as const;

export function ProgramCards() {
  return (
    <div className="border-b border-dashed px-6 py-5">
      <h2 className="font-serif text-2xl italic leading-tight">Programs</h2>
      <p className="mt-1 text-sm text-muted-foreground">
        Nabyu is in these startup programs.
      </p>
      <ul className="mt-4 grid gap-3 sm:grid-cols-2">
        {programs.map((program) => (
          <li key={program.name}>
            <a
              href={program.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3 rounded-lg border border-dashed bg-card px-3 py-3 outline-none transition-transform hover:-translate-y-0.5 focus-visible:ring-1 focus-visible:ring-foreground/40"
            >
              <span className="flex h-12 w-28 shrink-0 items-center justify-center rounded-md bg-white px-1.5">
                <Image
                  src={program.src}
                  alt=""
                  width={160}
                  height={64}
                  className="max-h-10 w-full object-contain"
                />
              </span>
              <span className="min-w-0">
                <span className="block truncate text-sm font-medium">
                  {program.name}
                </span>
                <span className="block text-xs text-muted-foreground">
                  {program.caption}
                </span>
              </span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
