"use client";

import { books, booksConfig, type Book } from "@/config/books";
import { useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";

const SPINES = [
  "#3a312b",
  "#6a4634",
  "#c46a3a",
  "#8a5a3c",
  "#2a241f",
  "#a89078",
  "#e08a55",
  "#4a3b34",
  "#7a4e38",
  "#d49262",
];

const FIRST_YEAR = Math.min(...books.map((book) => book.year));
const LAST_YEAR = Math.max(...books.map((book) => book.year));

function smooth(value: number) {
  const t = Math.min(1, Math.max(0, value));
  return t * t * (3 - 2 * t);
}

export function BookShelf() {
  const reduceMotion = useReducedMotion();
  const target = useRef(4);
  const drag = useRef<{ x: number; start: number; moved: boolean } | null>(null);
  const [position, setPosition] = useState(4);
  const [open, setOpen] = useState<Book | null>(null);

  useEffect(() => {
    let raf = 0;
    let last = performance.now();
    let current = 4;
    const tick = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      const blend = reduceMotion ? 1 : 1 - Math.exp(-6 * dt);
      current += (target.current - current) * blend;
      setPosition(current);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [reduceMotion]);

  const go = (next: number) => {
    target.current = Math.max(0, Math.min(books.length - 1, next));
  };

  const active = books[Math.round(position)] ?? books[0];

  return (
    <section
      className="border-t border-dashed pt-6"
      onKeyDown={(event) => {
        if (event.key === "ArrowRight") go(Math.round(target.current) + 1);
        if (event.key === "ArrowLeft") go(Math.round(target.current) - 1);
        if (event.key === "Enter") setOpen(active);
        if (event.key === "Escape") setOpen(null);
      }}
    >
      <h2 className="section-heading">{booksConfig.title}</h2>
      <div
        className="relative mx-auto h-72 overflow-hidden outline-none"
        tabIndex={0}
        style={{ perspective: "1400px" }}
        onPointerDown={(event) => {
          drag.current = { x: event.clientX, start: target.current, moved: false };
          event.currentTarget.setPointerCapture(event.pointerId);
        }}
        onPointerMove={(event) => {
          if (!drag.current) return;
          const dx = event.clientX - drag.current.x;
          if (Math.abs(dx) > 6) drag.current.moved = true;
          target.current = drag.current.start - dx / 70;
        }}
        onPointerUp={() => {
          if (!drag.current?.moved) return;
          target.current = Math.round(target.current);
          drag.current = null;
        }}
      >
        {books.map((book, index) => {
          const rel = index - position;
          const scale = 1 / (1 + Math.abs(rel) / 3.2) ** 1.15;
          const x = rel * 86 * (0.55 + scale * 0.45);
          const y = (1 - scale) * 28;
          const facing = smooth(1 - Math.abs(rel));
          const turn = Math.sign(rel || 1) * Math.min(1, Math.abs(rel) / 3) * 24 * (1 - facing) - 78 * facing;
          const color = SPINES[index % SPINES.length];
          return (
            <button
              key={book.id}
              type="button"
              aria-label={book.title}
              className="absolute left-1/2 top-8 h-52 w-16 origin-bottom"
              style={{
                transform: `translate3d(${x}px, ${y}px, 0) rotateY(${turn}deg)`,
                zIndex: Math.round(100 - Math.abs(rel) * 10),
                transformStyle: "preserve-3d",
              }}
              onClick={() => {
                if (Math.abs(rel) < 0.5) setOpen(book);
                else go(index);
              }}
            >
              <span
                className="absolute inset-0 flex items-center justify-center rounded-sm px-1 text-[11px] font-medium text-[#f4efe6] [writing-mode:vertical-rl]"
                style={{ background: color }}
              >
                {book.title}
              </span>
              <span
                className="absolute inset-0 flex flex-col justify-end rounded-sm bg-[#fbf7f1] p-2 text-left text-[#2a241f] shadow-md"
                style={{ transform: "rotateY(90deg) translateZ(32px)", backfaceVisibility: "hidden" }}
              >
                <span className="text-[10px] uppercase tracking-wide text-[#c46a3a]">{book.year}</span>
                <span className="text-xs font-semibold leading-tight">{book.title}</span>
              </span>
            </button>
          );
        })}
      </div>
      <div className="flex items-center justify-center gap-4 px-6 pb-2">
        <button type="button" aria-label="Previous book" className="text-primary" onClick={() => go(Math.round(target.current) - 1)}>
          ←
        </button>
        <div className="min-w-0 text-center">
          <p className="font-serif text-2xl text-primary">{active.title}</p>
          <p className="text-xs tracking-wide text-muted-foreground">
            {active.author} · {active.year}
          </p>
        </div>
        <button type="button" aria-label="Next book" className="text-primary" onClick={() => go(Math.round(target.current) + 1)}>
          →
        </button>
      </div>
      <div className="relative mx-8 mb-6 h-8">
        <div className="absolute top-2 right-0 left-0 h-px bg-primary/70" />
        <button
          type="button"
          aria-label={`${active.year}`}
          className="absolute top-0 size-2.5 -translate-x-1/2 rounded-full bg-primary"
          style={{ left: `${((active.year - FIRST_YEAR) / (LAST_YEAR - FIRST_YEAR)) * 100}%` }}
        />
        <span className="absolute top-4 left-0 text-[10px] text-primary">{FIRST_YEAR}</span>
        <span className="absolute top-4 right-0 text-[10px] text-primary">{LAST_YEAR}</span>
      </div>
      {open ? (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-[#2a241f]/40 p-4 sm:items-center">
          <div className="w-full max-w-md rounded-lg bg-[#fbf7f1] p-6 text-[#2a241f] shadow-xl">
            <p className="text-xs uppercase tracking-widest text-[#c46a3a]">{open.year}</p>
            <h3 className="mt-2 font-serif text-3xl">{open.title}</h3>
            <p className="mt-1 text-sm text-[#6e645c]">{open.author}</p>
            <p className="mt-4 text-sm leading-relaxed">{open.note}</p>
            <button type="button" className="mt-6 text-sm text-[#c46a3a]" onClick={() => setOpen(null)}>
              Close
            </button>
          </div>
        </div>
      ) : null}
    </section>
  );
}
