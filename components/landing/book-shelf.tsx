"use client";

import { books, booksConfig, type Book } from "@/config/books";
import { useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";

const COUNT = books.length;
const COPIES = 3;
const TOTAL = COUNT * COPIES;
const START = COUNT;

function smoothstep(value: number) {
  const t = Math.min(1, Math.max(0, value));
  return t * t * (3 - 2 * t);
}

function wrap(value: number) {
  let next = ((value % TOTAL) + TOTAL) % TOTAL;
  if (next > TOTAL / 2) next -= TOTAL;
  return next;
}

function bias(relative: number) {
  if (Math.abs(relative) < 1) {
    return (relative + Math.sin(Math.PI * relative) / Math.PI) / 2;
  }
  return Math.sign(relative) * 0.5;
}

const SPINE = 42;
const COVER = 168;
const GAP = 8;

function placeTape(virtual: number, scroll: number, hover: number | null) {
  const relative = wrap(virtual - scroll);
  const openness = smoothstep(Math.max(0, 1 - Math.abs(relative)));
  const x = relative * (SPINE + GAP) + (COVER - SPINE + GAP) * bias(relative);
  const lifted = hover === virtual && Math.abs(relative) > 0.45 ? -16 : 0;
  return {
    relative,
    hidden: Math.abs(x) > 820,
    transform: `translate3d(${x}px, ${-openness * 14 + lifted}px, ${openness * 90}px) rotateZ(${-4.5 * openness}deg) rotateY(${-90 * openness}deg)`,
    zIndex: String(Math.round(160 - Math.abs(relative) * 6 + openness * 40)),
  };
}

export function BookShelf() {
  const reduceMotion = useReducedMotion();
  const target = useRef(START);
  const scroll = useRef(START);
  const drag = useRef<{ x: number; origin: number; moved: boolean } | null>(null);
  const hover = useRef<number | null>(null);
  const tapeRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const sheetRef = useRef<HTMLDivElement>(null);
  const pump = useRef<() => void>(() => {});
  const [activeIndex, setActiveIndex] = useState(START % COUNT);
  const [open, setOpen] = useState<Book | null>(null);
  const active = books[activeIndex] ?? books[0];

  useEffect(() => {
    let frame = 0;
    let last = performance.now();
    let current = scroll.current;
    let shown = ((Math.round(current) % COUNT) + COUNT) % COUNT;
    const paint = (value: number) => {
      const lifted = hover.current;
      for (let virtual = 0; virtual < TOTAL; virtual += 1) {
        const node = tapeRefs.current[virtual];
        if (!node) continue;
        const placed = placeTape(virtual, value, lifted);
        node.style.visibility = placed.hidden ? "hidden" : "visible";
        node.style.zIndex = placed.zIndex;
        node.style.transform = placed.transform;
      }
    };
    const tick = (now: number) => {
      frame = 0;
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      const delta = target.current - current;
      const moving = Math.abs(delta) > 0.0008 || Boolean(drag.current?.moved);
      if (moving) {
        const rate = reduceMotion ? 80 : drag.current?.moved ? 18 : 5.2;
        current += delta * (1 - Math.exp(-rate * dt));
        if (Math.abs(target.current - current) < 0.0008 && !drag.current?.moved) {
          current = target.current;
        }
        scroll.current = current;
        const next = ((Math.round(current) % COUNT) + COUNT) % COUNT;
        if (next !== shown) {
          shown = next;
          setActiveIndex(next);
        }
      }
      paint(current);
      if (moving) frame = requestAnimationFrame(tick);
    };
    pump.current = () => {
      if (frame) return;
      last = performance.now();
      frame = requestAnimationFrame(tick);
    };
    paint(current);
    pump.current();
    return () => {
      if (frame) cancelAnimationFrame(frame);
      pump.current = () => {};
    };
  }, [reduceMotion]);

  const go = (next: number) => {
    target.current = next;
    pump.current();
  };

  const openActive = () => {
    const book = books[((Math.round(target.current) % COUNT) + COUNT) % COUNT];
    if (!book) return;
    setOpen(book);
  };

  useEffect(() => {
    if (!open || reduceMotion) return;
    const activeVirtual = ((Math.round(scroll.current) % TOTAL) + TOTAL) % TOTAL;
    const face = tapeRefs.current[activeVirtual]?.querySelector("[data-cover]");
    const sheet = sheetRef.current;
    if (!face || !sheet) return;
    const from = face.getBoundingClientRect();
    sheet.animate(
      [
        {
          clipPath: `inset(${from.top}px ${window.innerWidth - from.right}px ${window.innerHeight - from.bottom}px ${from.left}px round 3px)`,
          transform: "rotate(-4.5deg)",
        },
        { clipPath: "inset(0px round 0px)", transform: "rotate(0deg)" },
      ],
      { duration: 1050, easing: "cubic-bezier(.76,0,.18,1)", fill: "both" },
    );
  }, [open, reduceMotion]);

  return (
    <section
      className="relative overflow-hidden border-t border-dashed bg-background pt-6 text-foreground"
      aria-label="Book shelf"
      onKeyDown={(event) => {
        if (event.key === "ArrowRight") go(Math.round(target.current) + 1);
        if (event.key === "ArrowLeft") go(Math.round(target.current) - 1);
        if (event.key === "Enter") openActive();
        if (event.key === "Escape") setOpen(null);
      }}
    >
      <h2 className="section-heading">{booksConfig.title}</h2>
      <div
        tabIndex={0}
        className="relative mx-auto h-[28rem] touch-pan-y outline-none"
        style={{ perspective: "1800px" }}
        onPointerDown={(event) => {
          drag.current = { x: event.clientX, origin: target.current, moved: false };
          event.currentTarget.setPointerCapture(event.pointerId);
        }}
        onPointerMove={(event) => {
          const current = drag.current;
          if (!current) return;
          const dx = event.clientX - current.x;
          if (Math.abs(dx) > 5) current.moved = true;
          if (current.moved) {
            target.current = current.origin - dx / 90;
            pump.current();
          }
        }}
        onPointerUp={() => {
          if (drag.current?.moved) target.current = Math.round(target.current);
          drag.current = null;
        }}
        onWheel={(event) => {
          if (open) return;
          const delta = Math.abs(event.deltaX) > Math.abs(event.deltaY) ? event.deltaX : event.deltaY;
          target.current += delta / 180;
          pump.current();
        }}
      >
        <div className="absolute top-[46%] left-1/2 h-0 w-0" style={{ transformStyle: "preserve-3d" }}>
          {Array.from({ length: TOTAL }, (_, virtual) => {
            const book = books[virtual % COUNT] as Book;
            const placed = placeTape(virtual, START, null);
            return (
              <button
                key={virtual}
                ref={(node) => {
                  tapeRefs.current[virtual] = node;
                }}
                type="button"
                aria-label={book.title}
                className="absolute top-0 left-0 h-0 w-0 border-0 bg-transparent p-0"
                style={{
                  transform: placed.transform,
                  transformStyle: "preserve-3d",
                  zIndex: Number(placed.zIndex),
                  visibility: placed.hidden ? "hidden" : "visible",
                }}
                onClick={() => {
                  if (drag.current?.moved) return;
                  const relative = wrap(virtual - scroll.current);
                  if (Math.abs(relative) < 0.5) openActive();
                  else go(Math.round(target.current + relative));
                }}
                onPointerEnter={() => {
                  hover.current = virtual;
                  pump.current();
                }}
                onPointerLeave={() => {
                  if (hover.current === virtual) hover.current = null;
                  pump.current();
                }}
              >
                <span
                  aria-hidden
                  className="absolute block overflow-hidden rounded-[2px]"
                  style={{
                    width: SPINE,
                    height: 240,
                    left: -SPINE / 2,
                    top: -120,
                    backgroundImage: `linear-gradient(90deg, rgba(0,0,0,.28), transparent 30%), url(${book.cover})`,
                    backgroundSize: "auto 100%",
                    backgroundPosition: "left center",
                    transform: `translateZ(${COVER / 2}px)`,
                    boxShadow: "0 16px 28px -20px rgba(20,16,10,.6)",
                  }}
                />
                <span
                  data-cover=""
                  aria-hidden
                  className="absolute block overflow-hidden rounded-[2px]"
                  style={{
                    width: COVER,
                    height: 240,
                    left: -COVER / 2,
                    top: -120,
                    backgroundImage: `url(${book.cover})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    transform: `rotateY(90deg) translateZ(${SPINE / 2}px)`,
                    backfaceVisibility: "hidden",
                    boxShadow: "0 30px 60px -28px rgba(20,16,10,.55)",
                  }}
                />
              </button>
            );
          })}
        </div>
      </div>
      <div aria-live="polite" className="px-6 pb-2 text-center">
        <p className="font-serif text-3xl text-primary">{active.title}</p>
        <p className="mt-1 text-[11px] tracking-[0.16em] text-muted-foreground uppercase">
          {active.author}
        </p>
      </div>
      <div className="flex items-center justify-between px-5 pb-6">
        <button type="button" aria-label="Previous book" className="size-11 text-2xl text-primary" onClick={() => go(Math.round(target.current) - 1)}>
          ←
        </button>
        <button type="button" aria-label="Open book" className="rounded-full border border-primary px-4 py-2 text-[10px] tracking-[0.16em] text-primary uppercase" onClick={openActive}>
          Open
        </button>
        <button type="button" aria-label="Next book" className="size-11 text-2xl text-primary" onClick={() => go(Math.round(target.current) + 1)}>
          →
        </button>
      </div>
      {open ? (
        <div
          ref={sheetRef}
          role="dialog"
          aria-modal="true"
          aria-label={open.title}
          className="fixed inset-0 z-[80] cursor-pointer overflow-y-auto bg-background text-foreground"
          onClick={() => setOpen(null)}
        >
          <div className="mx-auto grid min-h-full max-w-5xl items-center gap-8 px-6 py-16 md:grid-cols-[280px_1fr] md:px-12">
            <img src={open.cover} alt="" className="mx-auto block h-auto max-h-[72vh] w-auto max-w-full self-center shadow-[0_30px_60px_-28px_rgba(20,16,10,.55)]" />
            <div>
              <button type="button" className="border border-foreground px-3 py-1 text-[10px] tracking-[0.14em] uppercase" onClick={() => setOpen(null)}>
                Close
              </button>
              <h3 className="mt-6 font-serif text-5xl text-primary">{open.title}</h3>
              <p className="mt-3 text-sm tracking-wide text-muted-foreground">{open.author}</p>
              <p className="mt-6 max-w-md text-base leading-relaxed">{open.note}</p>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}
