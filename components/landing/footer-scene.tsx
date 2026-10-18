"use client";

import Image from "next/image";
import type { ReactNode } from "react";
import { motion, type Variants } from "motion/react";
import { ContactStatus } from "@/components/landing/contact-status";
import { footerConfig } from "@/config/site";
import { MOTION_EASE } from "@/lib/motion";

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: MOTION_EASE },
  },
};
const gardenVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1.1, ease: MOTION_EASE },
  },
};
const wordVariants: Variants = {
  hidden: { opacity: 0, y: 6, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.65, ease: MOTION_EASE },
  },
};
const staggerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 },
  },
};
const quoteStaggerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.075 },
  },
};

export function FooterScene({ children }: { children: ReactNode }) {
  return (
    <footer
      data-footer-reveal=""
      className="relative w-full overflow-hidden bg-background"
    >
      <noscript>
        <style>{`[data-footer-reveal] [data-reveal] { opacity: 1 !important; transform: none !important; filter: none !important; }`}</style>
      </noscript>
      {/* Displacement map behind the visitor pill's liquid glass. Zero-sized
          and inert; only the filter definition is referenced, by the
          .liquid-glass rule in app/globals.css. */}
      <svg aria-hidden="true" className="absolute size-0">
        <defs>
          <filter
            id="glass-refraction"
            x="-20%"
            y="-20%"
            width="140%"
            height="140%"
            colorInterpolationFilters="sRGB"
          >
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.01 0.01"
              numOctaves="2"
              seed="4"
              result="noise"
            />
            <feGaussianBlur in="noise" stdDeviation="2" result="softNoise" />
            <feDisplacementMap
              in="SourceGraphic"
              in2="softNoise"
              scale="40"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>
      </svg>
      <motion.div
        className="relative z-10 mx-auto flex max-w-[var(--frame-max-w)] flex-col items-center gap-7 px-6 pt-14 sm:gap-8 sm:pt-16"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.35 }}
        variants={staggerVariants}
      >
        <figure className="max-w-lg text-center">
          <blockquote>
            <motion.p
              aria-label={footerConfig.quote}
              variants={quoteStaggerVariants}
              className="text-balance font-serif text-[1.75rem] italic leading-snug text-foreground sm:text-[2rem]"
            >
              {footerConfig.quote.split(" ").map((word, index) => (
                <motion.span
                  key={`${word}-${index}`}
                  data-reveal=""
                  aria-hidden="true"
                  className="inline-block"
                  style={index > 0 ? { marginLeft: "0.3em" } : undefined}
                  variants={wordVariants}
                >
                  {word}
                </motion.span>
              ))}
            </motion.p>
          </blockquote>
          {footerConfig.attribution ? (
            <motion.figcaption
              data-reveal=""
              variants={itemVariants}
              className="mt-3 font-mono text-[10px] tracking-[0.12em] text-muted-foreground"
            >
              {footerConfig.attribution}
            </motion.figcaption>
          ) : null}
        </figure>

        <motion.div
          data-reveal=""
          variants={itemVariants}
          className="w-full max-w-sm"
        >
          <ContactStatus />
        </motion.div>

        <motion.div data-reveal="" variants={itemVariants}>
          <p className="text-center font-mono text-[11px] leading-relaxed tracking-[0.06em] text-muted-foreground">
            {footerConfig.credit}
          </p>
        </motion.div>
      </motion.div>

      <motion.div
        aria-hidden="true"
        data-reveal=""
        variants={gardenVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.35 }}
        className="relative mt-6 w-full select-none sm:mt-8"
      >
        <div className="pointer-events-none absolute inset-x-0 top-0 z-[1] h-16 bg-linear-to-b from-background to-transparent" />
        <Image
          src={footerConfig.artwork.src}
          alt=""
          width={footerConfig.artwork.width}
          height={footerConfig.artwork.height}
          sizes="100vw"
          className="block h-auto w-full max-w-none"
          draggable={false}
          priority={false}
        />

        {/* The visitor count floats centered over the panorama as a glass
            pill. Inset wrapper sizes the pill against the full stage. */}
        <div className="absolute inset-x-4 bottom-8 z-10 flex justify-center sm:bottom-10">
          {children}
        </div>
      </motion.div>
    </footer>
  );
}
