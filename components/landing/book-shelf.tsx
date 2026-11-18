"use client";

import { books, booksConfig, type Book } from "@/config/books";
import { useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";

const COPIES = 3;
const TOTAL = books.length * COPIES;
const START = books.length;

function smoothstep(value: number) {
  const t = Math.min(1, Math.max(0, value));
  return t * t * (3 - 2 * t);
}

function wrap(value: number) {
  let next = value % TOTAL;
  if (next > TOTAL / 2) next -= TOTAL;
  if (next < -TOTAL / 2) next += TOTAL;
  return next;
}

function bias(relative: number) {
  if (Math.abs(relative) < 1) {
    return (relative + Math.sin(Math.PI * relative) / Math.PI) / 2;
  }
  return Math.sign(relative) * 0.5;
}

export function BookShelf() {
  const reduceMotion = useReducedMotion();
  const target = useRef(START);
  const drag = useRef<{ x: number; start: number; moved: boolean } | null>(null);
  const [position, setPosition] = useState(START);
  const [hovered, setHovered] = useState<number | null>(null);
  const [open, setOpen] = useState<Book | null>(null);
  const activeIndex = ((Math.round(position) % books.length) + books.length) % books.length;
  const active = books[activeIndex] ?? books[0];

  useEffect(() => {
    let raf = 0;
    let last = performance.now();
    let current = START;
    const tick = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      const rate = reduceMotion ? 40 : drag.current?.moved ? 18 : 5.2;
      current += (target.current - current) * (1 - Math.exp(-rate * dt));
      setPosition(current);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [reduceMotion]);

  const go = (next: number) => {
    target.current = next;
  };

  return (
    <section
      className="relative overflow-hidden border-t border-dashed bg-[#f4efe6] pt-6 text-[#2a241f]"
      aria-label="Book shelf"
      onKeyDown={(event) => {
        if (event.key === "ArrowRight") go(Math.round(target.current) + 1);
        if (event.key === "ArrowLeft") go(Math.round(target.current) - 1);
        if (event.key === "Enter") setOpen(active);
        if (event.key === "Escape") setOpen(null);
      }}
    >
      <h2 className="section-heading">{booksConfig.title}</h2>
      <div
        tabIndex={0}
        className="relative mx-auto h-[26rem] touch-pan-y outline-none"
        style={{ perspective: "2200px" }}
        onPointerDown={(event) => {
          drag.current = { x: event.clientX, start: target.current, moved: false };
          event.currentTarget.setPointerCapture(event.pointerId);
        }}
        onPointerMove={(event) => {
          if (!drag.current) return;
          const dx = event.clientX - drag.current.x;
          if (Math.abs(dx) > 5) drag.current.moved = true;
          if (drag.current.moved) target.current = drag.current.start - dx / 78;
        }}
        onPointerUp={() => {
          if (drag.current?.moved) target.current = Math.round(target.current);
          drag.current = null;
        }}
        onWheel={(event) => {
          if (open) return;
          target.current += (Math.abs(event.deltaX) > Math.abs(event.deltaY) ? event.deltaX : event.deltaY) / 160;
        }}
      >
        <div className="absolute top-1/2 left-1/2" style={{ transformStyle: "preserve-3d" }}>
          {Array.from({ length: TOTAL }, (_, virtual) => {
            const book = books[virtual % books.length] as Book;
            const relative = wrap(virtual - position);
            const openness = smoothstep(Math.max(0, 1 - Math.abs(relative)));
            const spineWidth = 46;
            const coverWidth = 150;
            const gap = 10;
            const along =
              relative * (spineWidth + gap) +
              (coverWidth - spineWidth + 1.6 * gap) * bias(relative);
            if (Math.abs(along) > 760) return null;
            const lifted = hovered === virtual && Math.abs(relative) > 0.5 ? -18 : 0;
            const turn = -90 * openness;
            return (
              <button
                key={virtual}
                type="button"
                aria-label={book.title}
                className="absolute top-0 left-0 h-0 w-0"
                style={{
                  transform: `translate3d(${along}px, ${-openness * 10 + lifted}px, ${openness * 80}px) rotateZ(${-4.5 * openness}deg) rotateY(${turn}deg)`,
                  transformStyle: "preserve-3d",
                  zIndex: Math.round(200 + openness * 40 - Math.abs(relative)),
                }}
                onClick={() => {
                  if (drag.current?.moved) return;
                  if (Math.abs(relative) < 0.5) setOpen(book);
                  else go(Math.round(target.current + relative));
                }}
                onPointerEnter={() => setHovered(virtual)}
                onPointerLeave={() => setHovered((current) => (current === virtual ? null : current))}
              >
                <span
                  className="absolute overflow-hidden rounded-[2px] shadow-[0_18px_30px_-18px_rgba(20,16,10,.55)]"
                  style={{
                    width: spineWidth,
                    height: 230,
                    left: -spineWidth / 2,
                    top: -115,
                    backgroundImage: `url(${book.cover})`,
                    backgroundSize: "cover",
                    backgroundPosition: "left center",
                    transform: `translateZ(${coverWidth / 2}px)`,
                  }}
                />
                <span
                  className="absolute overflow-hidden rounded-[2px] shadow-[0_30px_60px_-28px_rgba(20,16,10,.55)]"
                  style={{
                    width: coverWidth,
                    height: 230,
                    left: -coverWidth / 2,
                    top: -115,
                    backgroundImage: `url(${book.cover})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    transform: `rotateY(90deg) translateZ(${spineWidth / 2}px)`,
                    backfaceVisibility: "hidden",
                  }}
                />
              </button>
            );
          })}
        </div>
      </div>
      <div aria-live="polite" className="px-6 text-center">
        <p className="font-serif text-3xl text-[#c46a3a]">{active.title}</p>
        <p className="mt-1 text-xs tracking-[0.16em] text-[#6e645c] uppercase">
          {active.author || "The Quran"}
        </p>
      </div>
      <div className="mt-2 flex justify-between px-4 pb-6">
        <button type="button" aria-label="Previous book" className="size-11 text-[#c46a3a]" onClick={() => go(Math.round(target.current) - 1)}>
          ←
        </button>
        <button type="button" aria-label="Open book" className="text-xs tracking-[0.14em] text-[#c46a3a] uppercase" onClick={() => setOpen(active)}>
          Open
        </button>
        <button type="button" aria-label="Next book" className="size-11 text-[#c46a3a]" onClick={() => go(Math.round(target.current) + 1)}>
          →
        </button>
      </div>
      {open ? (
        <div role="dialog" aria-modal="true" aria-label={open.title} className="fixed inset-0 z-50 flex items-center justify-center bg-[#2a241f]/50 p-4">
          <div className="grid w-full max-w-3xl gap-6 bg-[#f4efe6] p-6 text-[#2a241f] shadow-2xl sm:grid-cols-[220px_1fr]">
            <img src={open.cover} alt="" className="h-80 w-full object-cover" />
            <div>
              <button type="button" className="text-xs tracking-[0.14em] uppercase" onClick={() => setOpen(null)}>
                Close
              </button>
              <h3 className="mt-4 font-serif text-4xl text-[#c46a3a]">{open.title}</h3>
              <p className="mt-2 text-sm text-[#6e645c]">{open.author || "The Quran"}</p>
              <p className="mt-4 text-sm leading-relaxed">{open.note}</p>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}
