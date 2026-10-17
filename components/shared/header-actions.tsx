"use client";

import { Button } from "@/components/ui/button";
import { Kbd } from "@/components/ui/kbd";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import dynamic from "next/dynamic";
import { siteConfig } from "@/config/site";
import { trackEvent } from "@/lib/analytics";
import { Moon, Search, Sun } from "@/components/shared/site-icons";
import { useTheme } from "next-themes";
import { useCallback, useEffect, useRef, useState } from "react";

const SiteCommandPalette = dynamic(
  () =>
    import("@/components/shared/site-command-palette").then(
      (mod) => mod.SiteCommandPalette,
    ),
  { ssr: false },
);

export function HeaderActions() {
  const { setTheme, resolvedTheme } = useTheme();
  const themeAudioRef = useRef<HTMLAudioElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [paletteMounted, setPaletteMounted] = useState(false);

  const playThemeAudio = () => {
    if (themeAudioRef.current) {
      themeAudioRef.current.currentTime = 0;
      themeAudioRef.current.play().catch(() => {});
    }
  };

  const toggleTheme = useCallback((method: "button" | "shortcut_key" = "button") => {
    playThemeAudio();
    const nextTheme = resolvedTheme === "dark" ? "light" : "dark";
    trackEvent("theme_toggled", {
      theme: nextTheme,
      method,
    });
    setTheme(nextTheme);
  }, [resolvedTheme, setTheme]);

  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement ||
        (e.target as HTMLElement).isContentEditable
      ) {
        return;
      }

      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setPaletteMounted(true);
        setPaletteOpen((prev) => !prev);
        return;
      }

      if (
        e.key.toLowerCase() === siteConfig.banner.themeShortcut.toLowerCase()
      ) {
        e.preventDefault();
        toggleTheme("shortcut_key");
      }
    };

    window.addEventListener("keydown", handleGlobalKeyDown);
    return () => window.removeEventListener("keydown", handleGlobalKeyDown);
  }, [toggleTheme]);

  useEffect(() => {
    const themeAudio = themeAudioRef.current;
    return () => {
      themeAudio?.pause();
    };
  }, []);

  return (
    <>
      <div className="pointer-events-auto flex items-center overflow-hidden rounded-md border border-border/60 bg-background/60 backdrop-blur-md divide-x divide-border/60 shadow-xs transition-colors hover:border-border">
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              type="button"
              aria-label="Open command palette"
              onClick={() => {
                setPaletteMounted(true);
                setPaletteOpen(true);
              }}
              className="hidden h-8 items-center justify-center gap-1.5 px-2.5 text-muted-foreground transition-colors hover:bg-muted/50 hover:text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring sm:flex"
            >
              <Search className="h-4 w-4" />
              <span className="max-sm:hidden flex items-center gap-1">
                <Kbd>⌘</Kbd>
                <Kbd>K</Kbd>
              </span>
            </button>
          </TooltipTrigger>
          <TooltipContent>
            <p className="flex items-center gap-1">
              command palette <Kbd>⌘</Kbd> <Kbd>K</Kbd>
            </p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              ref={buttonRef}
              variant="ghost"
              size="icon"
              className="h-8 w-8 cursor-pointer rounded-none border-0 text-muted-foreground transition-colors hover:text-foreground hover:bg-muted/50 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              onClick={() => toggleTheme("button")}
            >
              <Sun className="h-4 w-4 rotate-0 fill-yellow-400 scale-100 transition-transform duration-300 dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-4 w-4 rotate-90 fill-gray-400 scale-0 transition-transform duration-300 dark:rotate-0 dark:scale-100" />
              <span className="sr-only">
                {siteConfig.banner.themeToggleLabel}
              </span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>
              {siteConfig.banner.themeTooltip}{" "}
              <Kbd>{siteConfig.banner.themeShortcut}</Kbd>
            </p>
          </TooltipContent>
        </Tooltip>
      </div>

      <audio
        ref={themeAudioRef}
        src={siteConfig.banner.switchAudioSrc}
        preload="none"
      />

      {paletteMounted && (
        <SiteCommandPalette open={paletteOpen} onOpenChange={setPaletteOpen} />
      )}
    </>
  );
}
